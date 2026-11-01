# 移植到更新的 Minecraft 版本

将 Pumpkin 升级以支持更新的 Minecraft 版本——无论是次要补丁（例如从 `1.21.4` 到 `1.21.5`）还是重大更新（例如从 `1.21` 到 `26.1`/`26.2`）——都是一个结构化、多步骤的过程。

> [!IMPORTANT]
> **必须首先移植 Extractor 模组！**
> Pumpkin 无法独立移植。Pumpkin 资源（`blocks.json`、`items.json`、`entities.json`、`packets.json`、`tracked_data.json`、`synced_registries.json` 等）的主要来源是我们专用的 Fabric 模组：[Pumpkin-MC/Extractor](https://github.com/Pumpkin-MC/Extractor)。在运行 `pumpkin-codegen` 或更新服务器 crate 之前，你**必须先在目标 Minecraft 版本上移植并运行 Extractor**。

### 移植生命周期一览

| 阶段 | 职责 | 主要 Crate/工具 |
| :--- | :--- | :--- |
| **1. 移植 Extractor** | 提取原版方块状态、实体、物品、数据包和注册表 | `Pumpkin-MC/Extractor`（Fabric 模组） |
| **2. 更新数据包** | 读取新的数据包、标签、配方和基岩版映射 | `assets/datapacks/<ver>`、`assets/bedrock` |
| **3. 版本声明** | 注册协议版本和 ViaVersion/ViaBackwards 重映射节点 | `pumpkin-util`、`tools/pumpkin-codegen` |
| **4. 代码生成** | 重新生成零成本 Rust 数据表和注册表 | `pumpkin-codegen` -> `pumpkin-data` |
| **5. 编译器修复** | 更新数据包布局、编解码器和数据组件 | `pumpkin-protocol`、`pumpkin-inventory` |
| **6. 游戏逻辑** | 实现新的方块行为、物品机制和生物 AI | `crates/pumpkin/src/block`、`item`、`entity` |
| **7. 多版本质量保障** | 验证向后兼容性、测试套件和客户端加入 | `cargo test`、`pumpkin-gametest` |

---

## 第 1 阶段：首先移植 Extractor 模组（`Pumpkin-MC/Extractor`）

[Extractor](https://github.com/Pumpkin-MC/Extractor) 是一个基于 Kotlin 的 Fabric 模组，它会启动真实的 Minecraft 客户端或服务器实例，检查实时游戏注册表，并将数据提取为 Pumpkin 所需的确切 JSON 格式。

### 1. 克隆或更新 Extractor 仓库
```bash
git clone https://github.com/Pumpkin-MC/Extractor
cd Extractor
```

### 2. 更新 `gradle.properties`
升级依赖版本，使其与目标 Minecraft 版本、Yarn 映射和 Fabric 生态相匹配：

```properties
minecraft_version=26.2
yarn_mappings=26.2+build.1:v2
loader_version=0.16.10
fabric_version=0.115.0+26.2
```

### 3. 解决 Extractor 编译错误
Minecraft 和 Fabric 的内部 API 经常随版本变化。检查并修复 `src/main/kotlin/de/snowii/extractor/extractors/` 中所有失效的提取器：
- **`Blocks.kt`**：提取方块状态、硬度、爆炸抗性、亮度和碰撞箱偏移。
- **`Items.kt`**：提取物品 ID、最大堆叠数量和默认组件。
- **`Entities.kt`**：提取实体 ID、尺寸（宽度、高度）和眼部高度。
- **`Packets.kt`**：提取握手、状态、登录、配置和游戏状态下的数据包 ID。
- **`SyncedRegistries.kt`**：提取同步到客户端的动态注册表。
- **`TrackedData.kt`**：提取实体追踪数据索引和序列化器。
- **`MultiNoise.kt` 与 `Biome.kt`**：提取世界生成生物群系树和噪声参数。

### 4. 运行 Extractor
执行服务器运行器（如需转储翻译/界面，则执行客户端运行器）：

```bash
./gradlew runServer
```

提取完成后，所有转储的 JSON 文件都将位于 `run/pumpkin_extractor_output/`。

### 5. 替换 Pumpkin 中的旧资源文件
从 `run/pumpkin_extractor_output/` 复制新生成的 JSON 文件，用它们**替换 Pumpkin 中的旧资源文件**：
- 替换 `Pumpkin/assets/` 中的核心游戏资源（`blocks.json`、`items.json`、`entities.json`、`packets.json`、`properties.json`、`synced_registries.json`、`tracked_data.json`、`en_us.json` 等）。
- 替换 `Pumpkin/crates/pumpkin-world/assets/` 中的世界生成测试文件。

---

## 第 2 阶段：更新资源与数据包

原始提取器资源就位后，更新 Pumpkin 中按版本划分的数据包和补充文件：

### 1. 添加按版本划分的数据包
从新的 Minecraft 服务器 JAR 中提取内置原版数据包，并将其放在 `assets/datapacks/<version>/` 下：

```
assets/datapacks/<version>/
└── data/
    ├── minecraft/
    │   ├── advancement/
    │   ├── chat_type/
    │   ├── damage_type/
    │   ├── dimension_type/
    │   ├── enchantment/
    │   ├── item_modifier/
    │   ├── loot_table/
    │   ├── recipe/
    │   ├── tags/
    │   └── worldgen/
    └── c/
        └── tags/（通用/常见标签）
```

### 2. 更新按版本划分的资源
更新或生成相应版本的元数据文件：
- `assets/registry/<version>_synced_registries.json`：在 `Configuration` 网络状态期间流式传输到客户端的动态注册表。
- `assets/tags/<version>_tags.json`：标签集合。
- `assets/tracked_data/<version>_tracked_data.json`：实体元数据索引。

### 3. 更新基岩版映射
如果同时移植基岩版支持，请使用 [GeyserMC](https://github.com/GeyserMC/Geyser) 和基岩版专用服务器（BDS）的最新映射更新 `assets/bedrock/` 中的文件。

### 4. 反编译源代码以进行逆向工程（可选但推荐）
对于复杂的更改——例如世界生成噪声路由器公式和自定义方块碰撞形状——请将匹配的原版 JAR 反编译到 `minecraft-sources-<version>/`（使用 Vineflower 或 Fabric Loom 以及官方 Mojang 映射）以供参考。

---

## 第 3 阶段：注册版本常量与 ViaVersion 映射

Pumpkin 通过 **ViaBackwards**/**ViaRewind** 映射表驱动的自动协议重映射来支持多版本客户端。

### 1. 在 `pumpkin-util` 中声明版本
打开 `crates/pumpkin-util/src/version.rs`，将新版本添加到 [`JavaMinecraftVersion`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-util/src/version.rs)：

```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum JavaMinecraftVersion {
    // ... 现有版本 ...
    V_1_21_4,
    V_1_21_11,
    V_26_2, // 新的目标版本
}

impl JavaMinecraftVersion {
    pub const fn protocol_version(&self) -> i32 {
        match self {
            // ...
            Self::V_26_2 => 770, // 协议版本号
        }
    }

    pub const fn version_name(&self) -> &'static str {
        match self {
            // ...
            Self::V_26_2 => "26.2",
        }
    }
}
```

### 2. 在 `pumpkin-codegen` 中声明版本
打开 `tools/pumpkin-codegen/src/version.rs`，将相同的枚举变体添加到代码生成 AST 中。

### 3. 添加 ViaVersion/ViaBackwards 映射
要让旧版本客户端能够连接到更新后的服务器（例如 `1.21.4` 客户端连接到 `26.2` 服务器）：
1. 从 [ViaBackwards 仓库](https://github.com/ViaVersion/ViaBackwards)获取 NBT 映射文件：
   `mappings-<new_version>to<previous_version>.nbt`
2. 将其保存到：
   `assets/viabackwards/data/mappings-<new_version>to<previous_version>.nbt`
3. 在 `tools/pumpkin-codegen/src/remap/mod.rs` 中，将新节点链接到 `remap_nodes!` 宏：

```rust
let node_26_2 = $crate::remap::MappingNode {
    version: $crate::version::JavaMinecraftVersion::V_26_2,
    value: "../../assets/viabackwards/data/mappings-26.2to26.1.nbt",
    child: Some(&node_26_1),
};
$remapper.process(&node_26_2)
```

4. 检查 `tools/pumpkin-codegen/src/remap/`，确保特定的重映射构建器（`block_state.rs`、`item_id.rs`、`entity_id.rs`、`sound_id.rs`、`argument_type.rs`）能够正确处理 ViaVersion 引入的任何新重映射结构。

---

## 第 4 阶段：运行代码生成（`pumpkin-codegen`）

所有提取器资源、数据包和映射节点就位后，从工作区根目录执行代码生成工具：

```bash
cargo run -p pumpkin-codegen
```

### 会重新生成哪些内容？
`pumpkin-codegen` 将零成本 Rust 数据表生成到 `crates/pumpkin-data/src/generated/`：
- **`block.rs`**：所有方块 ID、属性、状态掩码和碰撞形状。
- **`item.rs`**：物品、默认组件和工具等级。
- **`entity_type.rs` 与 `tracked_data.rs`**：实体类型 ID、默认边界框和元数据序列化器。
- **`packet.rs`**：跨协议状态的服务端接收和客户端接收数据包 ID 常量。
- **`recipes.rs`**：从新数据包解析出的所有合成、烧炼和切石配方。
- **`tag.rs`**：标签查找（`#minecraft:mineable/axe`、`#c:iron_ingots`）。
- **`remap/*.rs`**：状态重映射查找表（`block_state_remap.rs`、`item_id_remap.rs`、`entity_id_remap.rs`、`sound_id_remap.rs`）。

---

## 第 5 阶段：解决工作区编译错误

重新生成 `pumpkin-data` 后，Rust 编译器会标记整个工作区中的破坏性变更。运行：

```bash
cargo check --workspace
```

### 常见的编译故障与修复：

#### 1. 数据包 ID 与布局变更（`pumpkin-protocol`）
Mojang 经常添加、移动或修改数据包 ID 和载荷：
- 更新 `pumpkin-protocol/src/java/client/` 和 `pumpkin-protocol/src/java/server/`。
- 检查 `LoginSuccess`、`PlayLogin`、`Respawn` 和 `PlayerSpawnData` 等数据包是否新增了字段（例如新的游戏模式标志、维度属性或传送 ID）。
- 对于基岩版，检查 `pumpkin-protocol/src/bedrock/` 中的 `StartGame`、`NetworkItem` 和容器事务数据包。

#### 2. 数据组件变更
如果物品从旧的 NBT 结构切换到新的数据组件（或者组件被重命名/重构）：
- 更新 `crates/pumpkin-data/src/data_component.rs`。
- 更新 `pumpkin-inventory` 中的序列化和反序列化。

#### 3. 注册表同步
在 `Configuration` 阶段，服务器会向 Java 版客户端发送动态注册表内容。如果原版 Minecraft 添加了新的注册表（例如锻造模板材料、旗帜图案、乐器声音）：
- 验证 `crates/pumpkin-data/src/generated/registry.rs`。
- 确保 `pumpkin/src/net/java/config.rs` 将所有必需的注册表编解码器流式传输到客户端。

---

## 第 6 阶段：实现新方块、物品与实体的逻辑

服务器能够编译后，必须实现所有新增的游戏内容。

### 1. 新方块
1. 在 `pumpkin-data::Block` 中找到新的方块标识符。
2. 在 `crates/pumpkin/src/block/blocks/<block_name>.rs` 下创建实现 [`BlockBehaviour`](/zh_cn/developer/blocks/adding-blocks) 的行为模块：
   ```rust
   pub struct NewBlockBehaviour;

   impl BlockBehaviour for NewBlockBehaviour {
       fn on_use(&self, block: &Block, player: &Arc<Player>, location: BlockPos, world: &Arc<World>) {
           // 交互逻辑
       }
   }
   ```
3. 在 `crates/pumpkin/src/block/mod.rs` 的方块注册表中注册该行为。

### 2. 新物品
1. 在 `pumpkin-data::Item` 中找到新的物品标识符。
2. 如果物品具有独特的右键点击或使用行为（例如武器、弹射物、乐器），请在 `crates/pumpkin/src/item/items/<item_name>.rs` 中创建实现 [`ItemBehaviour`](/zh_cn/developer/items/adding-items) 的物品行为。
3. 如果物品会放置实体（例如刷怪蛋、船、矿车），请在 `pumpkin/src/item/items/spawn_egg.rs` 中配置实体生成逻辑。
4. 在 `crates/pumpkin/src/item/mod.rs` 中注册该行为。

### 3. 新实体
1. 检查 `pumpkin-data::entity_type::EntityType` 中是否有新的实体 ID。
2. 在 `crates/pumpkin/src/entity/mob/` 或 `living/` 中创建扩展 [`LivingEntity`](/zh_cn/developer/entities/) 的实体结构体。
3. 实现 `TrackedData` 字段，使其符合原版客户端的预期（例如姿势、动画、发光状态）。
4. 使用[生物 AI 与目标系统](/zh_cn/developer/entities/ai-and-mobs)分配 AI 目标和导航任务。
5. 在 `crates/pumpkin/src/entity/spawning.rs` 中添加生成数据包构造。

---

## 第 7 阶段：多版本与 ViaVersion 验证

确保旧版客户端仍可无缝连接：

1. **验证生成的重映射表**：
   检查 `crates/pumpkin-data/src/generated/block_state_remap.rs` 和 `item_id_remap.rs`。确保新增方块状态能够在旧版客户端上妥善回退到兼容的等效状态（例如将新的木材变种映射为橡木或云杉木）。
2. **数据包转换**：
   验证 `pumpkin-protocol` 中的数据包写入器在为连接序列化数据时会应用 `remap` 函数，前提是该连接协商得到的 `protocol_version` 低于服务器的原生版本。

---

## 第 8 阶段：测试与验证检查清单

在为版本移植创建拉取请求之前，请完成以下质量保障检查清单：

- [ ] **自动化测试**：
  ```bash
  cargo test --workspace
  ```
- [ ] **游戏测试套件**：
  ```bash
  cargo test -p pumpkin-gametest
  ```
- [ ] **严格的 Linter 规则**：
  ```bash
  cargo clippy --workspace --all-targets -- -D warnings
  ```
- [ ] **拼写检查**：
  ```bash
  typos
  ```
- [ ] **Java 版客户端游戏内测试**：
  - 使用原生新版 Minecraft 客户端连接。
  - 测试登录、世界加载、区块生成和玩家移动。
  - 放置并破坏新方块；验证碰撞箱和红石响应。
  - 使用并装备新物品；测试攻击速度、耐久度和动画。
  - 生成新实体并与其战斗；测试动画、受伤音效和掉落物。
- [ ] **旧版客户端游戏内测试**：
  - 使用受支持的旧版客户端（例如 1.21.x）连接。
  - 验证方块、物品和实体的转换不会导致客户端崩溃或不同步。
- [ ] **基岩版客户端游戏内测试**：
  - 验证基岩版客户端能够完成身份验证、加入游戏、加载世界区块并查看自定义物品。
