# 参数类型与建议

Pumpkin 通过 `pumpkin-command` 和主 `pumpkin` 服务器 crate 提供了一套完整的类型安全命令参数。参数会把原始标记流反序列化为结构化的 Rust 类型、验证范围，并为客户端提供 Tab 补全建议。

---

## 标准参数类型

参数解析器实现 [`ArgumentType<S>`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-command/src/argument_types/argument_type.rs) trait。命令构建器可使用以下内置类型：

### 1. 原始与标量类型

| 参数类型 | 导入路径 | 反序列化类型 | 说明 |
| :--- | :--- | :--- | :--- |
| **`IntegerArgumentType`** | `...::core::integer` | `i32` | 支持可选 `[min, max]` 范围的标准 32 位整数。 |
| **`FloatArgumentType`** | `...::core::float` | `f32` | 支持范围的 32 位浮点数。 |
| **`DoubleArgumentType`** | `...::core::double` | `f64` | 支持范围的 64 位浮点数。 |
| **`LongArgumentType`** | `...::core::long` | `i64` | 支持范围的 64 位整数。 |
| **`BoolArgumentType`** | `...::core::bool` | `bool` | 布尔值（`true` 或 `false`）。 |
| **`StringArgumentType`** | `...::core::string` | `String` | 基于引号规则的字符串标记。 |

#### 字符串参数行为
- **`StringArgumentType::Word`**：解析不包含空白的单个单词。
- **`StringArgumentType::Quotable`**：解析单个单词或带引号的短语（`"hello world"`）。
- **`StringArgumentType::Greedy`**：消耗输入流中的所有剩余字符（适合 `/say`、`/me` 等聊天/广播命令）。

---

## 坐标参数类型

Minecraft 坐标支持绝对位置、相对偏移（`~`）和局部插入符方向（`^`）：

```rust
use crate::command::argument_builder::argument;
use crate::command::argument_types::coordinates::block_pos::BlockPosArgumentType;
use crate::command::argument_types::coordinates::vec3::Vec3ArgumentType;

// 方块位置（整数 BlockPos）
argument("pos", BlockPosArgumentType)

// 精确实体坐标（f64 Vector3）
argument("location", Vec3ArgumentType)
```

### 获取解析后的坐标
在执行器中，坐标参数会基于发送者在 [`CommandSource`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/command/context/command_source.rs) 中的当前位置和朝向解析相对偏移：

```rust
// 提取居中的 f64 坐标（处理相对于发送者的 ~ 和 ^）
let pos: Vector3<f64> = Vec3ArgumentType::get_coordinates(context, "location")?;

// 提取整数方块位置
let block_pos: BlockPos = BlockPosArgumentType::get_block_pos(context, "pos")?;
```

---

## 实体选择器（`EntityArgumentType`）

实体选择器允许玩家和命令方块通过玩家名称、UUID 或原版目标选择器（`@p`、`@r`、`@a`、`@e`、`@s`）选择实体。

在 Pumpkin 中，实体选择器通过 [`EntityArgumentType`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/command/argument_types/entity.rs) 使用：

```rust
pub enum EntityArgumentType {
    /// 精确匹配一名玩家
    Player,
    /// 匹配零名或多名玩家
    Players,
    /// 精确匹配一个实体
    Entity,
    /// 匹配零个或多个实体
    Entities,
}
```

### 在执行器中解析

```rust
// 1. 选择单个玩家
let player: Arc<Player> = EntityArgumentType::get_player(context, "target")?;

// 2. 选择多个玩家
let players: Vec<Arc<Player>> = EntityArgumentType::get_players(context, "targets")?;

// 3. 选择单个生物实体或生物
let entity: Arc<dyn EntityBase> = EntityArgumentType::get_entity(context, "target")?;

// 4. 选择多个实体
let entities: Vec<Arc<dyn EntityBase>> = EntityArgumentType::get_entities(context, "targets")?;
```

### 支持的选择器语法
Pumpkin 的实体选择器解析器（`crates/pumpkin/src/command/argument_types/entity_selector/`）会解析并验证：
- `@p`：相对于执行坐标的最近玩家。
- `@r`：随机玩家。
- `@a`：所有在线玩家。
- `@e`：已加载世界区块中的所有实体。
- `@s`：执行实体（`context.source.entity`）。
- **方括号参数**：例如 `@e[type=zombie,distance=..10,limit=5,sort=nearest]` 的过滤查询。

---

## 注册表与游戏机制类型

Pumpkin 为 Minecraft 数据类型提供专用参数解析器：

- **`GameModeArgumentType`**：解析 `survival`、`creative`、`adventure`、`spectator` 或数字 ID `0`–`3`。
- **`BlockArgumentType`**：解析方块标识符和方块状态（例如 `minecraft:chest[facing=north]`）。
- **`ItemArgumentType`**：解析物品标识符和可选数据组件（例如 `minecraft:diamond_sword`）。
- **`NbtArgumentType`**：将 SNBT（字符串化 NBT）标签解析为 Pumpkin 的 NBT 表示。
- **`TimeArgumentType`**：解析带后缀的持续时间（例如 `10s`、`20t`、`1d`）。

---

## 建议提供器与 Tab 补全

参数可以通过 [`SuggestionProvider`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-command/src/suggestion/mod.rs) trait 向已连接玩家提供动态 Tab 补全候选：

```rust
use crate::command::context::command_context::CommandContext;
use crate::command::suggestion::provider::SuggestionProvider;
use pumpkin_command::suggestion::suggestions::{Suggestions, SuggestionsBuilder};

struct CustomSuggestionProvider;

impl SuggestionProvider for CustomSuggestionProvider {
    fn suggest(
        &self,
        context: &CommandContext,
        mut builder: SuggestionsBuilder,
    ) -> Suggestions {
        // 获取已输入的标记前缀
        let remaining = builder.remaining();

        let candidates = ["alpha", "bravo", "charlie"];
        for candidate in candidates {
            if candidate.starts_with(remaining) {
                builder.suggest(candidate);
            }
        }

        builder.build()
    }
}
```

### 为参数附加建议
在 `RequiredArgumentBuilder` 上使用 `.suggests(...)` 方法：

```rust
argument("code", StringArgumentType::Word)
    .suggests(CustomSuggestionProvider)
    .executes(MyExecutor)
```

### 客户端补全协议
- **Java 版**：玩家按下 `Tab` 时，客户端会发送 `ServerboundCommandSuggestion` 数据包。Pumpkin 会在 `CommandDispatcher` 中匹配光标位置，执行目标节点的 `SuggestionProvider`，并通过 `ClientboundCommandSuggestions` 返回补全范围和提示信息。
- **基岩版**：字面量和枚举的建议选项会提前作为动态枚举值表序列化到 `CAvailableCommands` 数据包中。
