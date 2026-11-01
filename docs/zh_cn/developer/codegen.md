# 代码生成（`pumpkin-codegen`）

Minecraft 是一款庞大的游戏，包含数千种方块状态、物品、数据包 ID、声音事件、配方和生物群系参数。这些注册表在 Minecraft 更新时经常发生变化。

为了在无需手动维护数万个易错常量的情况下保持 100% 的保真度，Pumpkin 使用了自动代码生成工具：[`tools/pumpkin-codegen`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/tools/pumpkin-codegen)。

---

## 用途与工作流

`pumpkin-codegen` 解析官方 Minecraft 服务器数据生成器报告、资源文件和版本规范，并将零成本、强类型的 Rust 文件直接输出到 [`crates/pumpkin-data`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-data)。

该管线分为三个不同的阶段：
1. **读取**：从 `assets/` 和 `assets/datapacks/` 读取原始 JSON 资源和原版服务器报告。
2. **转换**：规范化状态、计算位集、处理 ViaVersion 重映射并优化查找表。
3. **输出**：将编译后的 Rust 常量和结构体输出到 [`crates/pumpkin-data/src/generated`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-data/src/generated)。

---

## 生成的数据集

`pumpkin-codegen` 在 `pumpkin-data` 中生成以下组件：

| 类别 | 说明 | 生成的源文件 |
| :--- | :--- | :--- |
| **数据包** | 所支持的 Minecraft 版本中，所有协议状态的服务端接收和客户端接收数据包 ID。 | `packet.rs` |
| **方块** | 方块定义、默认状态、状态属性（朝向、充能、含水等）和方块碰撞箱。 | `block.rs` |
| **物品** | 物品定义、堆叠数量、耐久度、数据组件、食物属性和装备槽位。 | `item.rs` |
| **注册表** | 生物群系、维度、聊天类型、伤害类型、锻造模板材料和旗帜图案的动态注册表。 | `registry.rs` |
| **生物群系与噪声** | 气候参数、噪声路由器配置、3D 噪声设置和表面规则。 | `biome.rs`、`noise_router.rs` |
| **实体** | 实体类型、默认边界框、属性和受追踪的实体元数据模式。 | `entity_type.rs`、`tracked_data.rs` |
| **配方与合成** | 有序、无序、熔炼、高炉、烟熏和切石配方。 | `recipes.rs` |
| **标签** | 方块标签、物品标签、流体标签和实体类型标签（例如 `#minecraft:mineable/pickaxe`）。 | `tag.rs` |
| **附魔与药水** | 附魔定义、药水效果和酿造台配方。 | `enchantments.rs`、`potion.rs` |
| **翻译** | 用于聊天消息和物品名称的官方本地化键。 | `translations.rs` |
| **插件 WIT** | 定义插件接口的 WebAssembly 组件模型 WIT 文件。 | `wit/` |

---

## 运行代码生成

要在本地运行代码生成器：

```bash
# 进入工作区根目录
cd Pumpkin

# 运行代码生成工具
cargo run -p pumpkin-codegen
```

### 何时应运行代码生成？

- **升级到新的 Minecraft 版本**：将 Pumpkin 移植到新的 Minecraft 次要或主要版本时。
- **添加协议映射**：添加对较旧或较新客户端协议版本的支持时。
- **更新 WIT 定义**：向 WebAssembly 插件 API 添加新函数或类型时。

---

## 数据来源

`pumpkin-codegen` 从以下几个主要来源读取数据：

1. **Minecraft 数据生成器报告**：通过运行 `java -DbundlerMainClass=net.minecraft.data.Main -jar server.jar --reports` 生成。
2. **Minecraft 客户端资源**：从客户端 `.jar` 文件中提取，用于翻译键、模型形状和声音映射。
3. **Minecraft 协议 Wiki**：与协议规范交叉核对数据包 ID。
