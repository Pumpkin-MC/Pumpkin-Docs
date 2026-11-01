# 引數型別與建議

Pumpkin 透過 `pumpkin-command` 和主 `pumpkin` 伺服器 crate 提供了一套完整的型別安全指令引數。引數會把原始標記流反序列化為結構化的 Rust 型別、驗證範圍，並為用戶端提供 Tab 自動完成建議。

---

## 標準引數型別

引數解析器實現 [`ArgumentType<S>`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-command/src/argument_types/argument_type.rs) trait。指令建構器可使用以下內建型別：

### 1. 原始與標量型別

| 引數型別 | 匯入路徑 | 反序列化型別 | 說明 |
| :--- | :--- | :--- | :--- |
| **`IntegerArgumentType`** | `...::core::integer` | `i32` | 支援可選 `[min, max]` 範圍的標準 32 位整數。 |
| **`FloatArgumentType`** | `...::core::float` | `f32` | 支援範圍的 32 位浮點數。 |
| **`DoubleArgumentType`** | `...::core::double` | `f64` | 支援範圍的 64 位浮點數。 |
| **`LongArgumentType`** | `...::core::long` | `i64` | 支援範圍的 64 位整數。 |
| **`BoolArgumentType`** | `...::core::bool` | `bool` | 布林值（`true` 或 `false`）。 |
| **`StringArgumentType`** | `...::core::string` | `String` | 基於引號規則的字串標記。 |

#### 字串引數行為

- **`StringArgumentType::Word`**：解析不包含空白的單個單詞。
- **`StringArgumentType::Quotable`**：解析單個單詞或帶引號的短語（`"hello world"`）。
- **`StringArgumentType::Greedy`**：消耗輸入流中的所有剩餘字元（適合 `/say`、`/me` 等聊天/廣播指令）。

---

## 座標引數型別

Minecraft 座標支援絕對位置、相對偏移（`~`）和區域性插入符方向（`^`）：

```rust
use crate::command::argument_builder::argument;
use crate::command::argument_types::coordinates::block_pos::BlockPosArgumentType;
use crate::command::argument_types::coordinates::vec3::Vec3ArgumentType;

// 方塊位置（整數 BlockPos）
argument("pos", BlockPosArgumentType)

// 精確實體座標（f64 Vector3）
argument("location", Vec3ArgumentType)
```

### 獲取解析後的座標

在執行器中，座標引數會基於傳送者在 [`CommandSource`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/command/context/command_source.rs) 中的目前位置和朝向解析相對偏移：

```rust
// 提取居中的 f64 座標（處理相對於傳送者的 ~ 和 ^）
let pos: Vector3<f64> = Vec3ArgumentType::get_coordinates(context, "location")?;

// 提取整數方塊位置
let block_pos: BlockPos = BlockPosArgumentType::get_block_pos(context, "pos")?;
```

---

## 實體選擇器（`EntityArgumentType`）

實體選擇器允許玩家和指令方塊透過玩家名稱、UUID 或原版目標選擇器（`@p`、`@r`、`@a`、`@e`、`@s`）選擇實體。

在 Pumpkin 中，實體選擇器透過 [`EntityArgumentType`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/command/argument_types/entity.rs) 使用：

```rust
pub enum EntityArgumentType {
    /// 精確匹配一名玩家
    Player,
    /// 匹配零名或多名玩家
    Players,
    /// 精確匹配一個實體
    Entity,
    /// 匹配零個或多個實體
    Entities,
}
```

### 在執行器中解析

```rust
// 1. 選擇單個玩家
let player: Arc<Player> = EntityArgumentType::get_player(context, "target")?;

// 2. 選擇多個玩家
let players: Vec<Arc<Player>> = EntityArgumentType::get_players(context, "targets")?;

// 3. 選擇單個生物實體或生物
let entity: Arc<dyn EntityBase> = EntityArgumentType::get_entity(context, "target")?;

// 4. 選擇多個實體
let entities: Vec<Arc<dyn EntityBase>> = EntityArgumentType::get_entities(context, "targets")?;
```

### 支援的選擇器語法

Pumpkin 的實體選擇器解析器（`crates/pumpkin/src/command/argument_types/entity_selector/`）會解析並驗證：

- `@p`：相對於執行座標的最近玩家。
- `@r`：隨機玩家。
- `@a`：所有線上玩家。
- `@e`：已載入世界區塊中的所有實體。
- `@s`：執行實體（`context.source.entity`）。
- **方括號引數**：例如 `@e[type=zombie,distance=..10,limit=5,sort=nearest]` 的過濾查詢。

---

## 註冊表與遊戲機制型別

Pumpkin 為 Minecraft 資料型別提供專用引數解析器：

- **`GameModeArgumentType`**：解析 `survival`、`creative`、`adventure`、`spectator` 或數字 ID `0`–`3`。
- **`BlockArgumentType`**：解析方塊識別符號和方塊狀態（例如 `minecraft:chest[facing=north]`）。
- **`ItemArgumentType`**：解析物品識別符號和可選資料元件（例如 `minecraft:diamond_sword`）。
- **`NbtArgumentType`**：將 SNBT（字串化 NBT）標籤解析為 Pumpkin 的 NBT 表示。
- **`TimeArgumentType`**：解析帶字尾的持續時間（例如 `10s`、`20t`、`1d`）。

---

## 建議提供器與 Tab 自動完成

引數可以透過 [`SuggestionProvider`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-command/src/suggestion/mod.rs) trait 向已連線玩家提供動態 Tab 自動完成候選：

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
        // 獲取已輸入的標記字首
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

### 為引數附加建議

在 `RequiredArgumentBuilder` 上使用 `.suggests(...)` 方法：

```rust
argument("code", StringArgumentType::Word)
    .suggests(CustomSuggestionProvider)
    .executes(MyExecutor)
```

### 用戶端自動完成協定

- **Java 版**：玩家按下 `Tab` 時，用戶端會發送 `ServerboundCommandSuggestion` 封包。Pumpkin 會在 `CommandDispatcher` 中匹配游標位置，執行目標節點的 `SuggestionProvider`，並透過 `ClientboundCommandSuggestions` 返回自動完成範圍和提示資訊。
- **基岩版**：常值和列舉的建議選項會提前作為動態列舉值表序列化到 `CAvailableCommands` 封包中。
