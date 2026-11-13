# 原版数据提取器

[Pumpkin Extractor](https://github.com/Pumpkin-MC/Extractor) 是一个使用 Kotlin 编写的专用 Fabric 模组，它会检查正在运行的原版 Minecraft 服务器或客户端，并将权威的游戏注册表和运行时元数据转储为结构化 JSON 文件。

[`pumpkin-codegen`](/zh_cn/developer/codegen) 会读取这些 JSON 转储，在 `pumpkin-data` 和 `pumpkin-world` 中生成强类型 Rust 代码。

---

## 数据包与提取器：我们的数据理念

在创建新的提取器之前，必须先了解 Pumpkin 的数据层级：

> [!IMPORTANT]
> **只要条件允许，我们就优先使用原版数据包。**
> 如果原版 Minecraft 已经通过官方数据包 JSON 文件公开了某个注册表或系统，我们就直接使用该数据包，而不是编写自定义提取器代码。

### 何时使用数据包，何时使用提取器

| 来源 | 使用时机 | 示例 |
| :--- | :--- | :--- |
| **原版数据包** *（首选）* | Mojang 在 `data/minecraft/` 中正式序列化为 JSON 的任何数据。 | 配方、标签（`blocks`、`items`、`fluids`）、生物群系、维度类型、伤害类型、锻造模板材料、世界生成噪声参数。 |
| **Fabric 提取器** *（仅在必要时使用）* | **硬编码在 Java 字节码中**、无法从原始数据包文件导出的游戏数据。 | 方块碰撞形状、AABB 边界框、方块硬度、数据包 ID 到状态的映射、实体追踪数据 ID、燃料燃烧时长、堆肥桶概率和花盆转换表。 |

---

## 提取器模组架构

提取器基于 Fabric 加载器运行，并使用官方 Fabric Yarn 映射：

- **模组入口点（`src/main/kotlin/de/snowii/extractor/Extractor.kt`）**：注册到 Fabric 的 `ServerLifecycleEvents.SERVER_STARTED` 事件。无界面服务器完成启动后，它会调用所有已注册的提取器，并将文件转储到 `run/pumpkin_extractor_output/`。
- **提取器接口**：每个数据提取器都实现 `Extractor.Extractor` 接口：
  ```kotlin
  interface Extractor {
      fun fileName(): String

      @Throws(Exception::class)
      fun extract(server: MinecraftServer): JsonElement

      // 如果输出应放在 tests/ 而非根输出目录，则返回 true
      fun isTest(): Boolean = false
  }
  ```
- **输出目录**：JSON 文件以 UTF-8 编码保存到 `pumpkin_extractor_output/`，不进行 HTML 转义。

---

## 如何添加新的提取器

需要提取新的硬编码原版机制时，请按照以下步骤操作：

### 第 1 步：确认无法从数据包获取数据
检查官方 Minecraft 客户端/服务器 JAR 或 Mojang 的数据报告：
- 检查 `data/minecraft/` 中是否已有相应的注册表、标签或 JSON 定义。
- 如果数据包中已有该数据，请直接将其添加到 `Pumpkin/assets/datapacks/`，不要编写提取器。

### 第 2 步：创建提取器类
如果数据硬编码在 Java 方法中，请在以下位置创建新的 Kotlin 类：
```text
src/main/kotlin/de/snowii/extractor/extractors/<ExtractorName>.kt
```

实现 `Extractor.Extractor` 接口：

```kotlin
package de.snowii.extractor.extractors

import com.google.gson.JsonElement
import com.google.gson.JsonObject
import com.google.gson.JsonPrimitive
import de.snowii.extractor.Extractor
import net.minecraft.core.registries.BuiltInRegistries
import net.minecraft.server.MinecraftServer
import net.minecraft.world.item.Item
import net.minecraft.world.item.ItemStack

class Fuels : Extractor.Extractor {
    override fun fileName(): String {
        return "fuels.json"
    }

    override fun extract(server: MinecraftServer): JsonElement {
        val fuelsJson = JsonObject()

        // 查询原版运行时方法
        server.fuelValues().fuelItems().forEach { fuel ->
            val itemId = BuiltInRegistries.ITEM.getKey(fuel).toString()
            val burnDuration = server.fuelValues().burnDuration(ItemStack(fuel))
            fuelsJson.add(itemId, JsonPrimitive(burnDuration))
        }

        return fuelsJson
    }
}
```

### 第 3 步：注册提取器
打开 `src/main/kotlin/de/snowii/extractor/Extractor.kt`，将你的类实例添加到 `extractors` 数组中：

```kotlin
val extractors = arrayOf(
    // ... 现有提取器 ...
    Blocks(),
    Items(),
    Entities(),
    Fuels(), // [!code ++]
)
```

### 第 4 步：运行提取器
在 Extractor 仓库中执行无界面服务器任务：

```bash
./gradlew runServer
```

提取完成后，在以下位置找到新生成的 JSON 文件：
```text
run/pumpkin_extractor_output/<your_file>.json
```

### 第 5 步：与 `pumpkin-codegen` 集成
1. 将生成的 JSON 文件移入 Pumpkin：
   ```bash
   cp run/pumpkin_extractor_output/fuels.json ../Pumpkin/assets/
   ```
2. 在 `Pumpkin` 仓库中打开 `tools/pumpkin-codegen`：
   - 为 `<your_file>.json` 创建解析器。
   - 编写代码生成模板，在 `crates/pumpkin-data` 中生成相应的 Rust 结构体或静态查找表。
3. 运行代码生成：
   ```bash
   cargo run -p pumpkin-codegen
   ```
4. 验证 `pumpkin-data` 能够编译并通过所有单元测试：
   ```bash
   cargo test -p pumpkin-data
   ```

---

## 提取器贡献最佳实践

- **确定性地排序键**：生成 JSON 对象或列表时，按注册表数字 ID 或标识符字母顺序（`minecraft:stone`、`minecraft:dirt`）对条目排序。这样可避免跨更新重新运行提取时产生无关的 git diff。
- **优先使用标准类型**：尽可能使用原版标识符（`net.minecraft.resources.Identifier`）作为字符串键，而不是任意整数。
- **访问扩展器**：如果需要访问原版的私有字段或方法，请在 `src/main/resources/extractor.accesswidener` 中声明访问扩展器，而不要使用脆弱的运行时反射。
