# 新增指令

本指南說明如何在 Pumpkin 伺服器程式碼庫中實現並註冊新指令。

Pumpkin 中的指令在 `crates/pumpkin/src/command/commands/` 目錄中實現，並在伺服器初始化期間註冊到中央 [`CommandDispatcher`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-command/src/node/dispatcher.rs)。

---

## Pumpkin 指令的組成

一個典型的指令檔案包含：

1. **元資料常量**：指令描述、權限節點識別符號和參數名稱。
2. **權限註冊**：在伺服器的 [`PermissionRegistry`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-util/src/permission.rs) 中宣告預設 OP 要求。
3. **指令執行器**：為每個終端節點或子指令實現 [`CommandExecutor`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-command/src/node/mod.rs) trait 的結構。
4. **註冊函數**：使用流式構建器（`command`、`literal`、`argument`）構造參數樹。

---

## 分步實現：建立 `/heal`

下面實現一個完整的 `/heal` 指令，它可以治療執行者自身或一組目標玩家：

```
/heal                 -> 治療執行指令的傳送者
/heal <targets>       -> 治療目標玩家
/heal <targets> <amount> -> 按指定數值治療目標玩家
```

### 1. 建立檔案

建立 `crates/pumpkin/src/command/commands/heal.rs`：

```rust
use std::sync::Arc;

use crate::command::argument_builder::{ArgumentBuilder, argument, command};
use crate::command::argument_types::core::float::FloatArgumentType;
use crate::command::argument_types::entity::EntityArgumentType;
use crate::command::context::command_context::CommandContext;
use crate::command::errors::error_types::CommandErrorType;
use crate::command::node::dispatcher::CommandDispatcher;
use crate::command::node::{CommandExecutor, CommandExecutorResult};
use crate::entity::EntityBase;
use pumpkin_data::translation;
use pumpkin_util::PermissionLvl;
use pumpkin_util::permission::{Permission, PermissionDefault, PermissionRegistry};
use pumpkin_util::text::TextComponent;

const DESCRIPTION: &str = "Restores health to target entities.";
const PERMISSION: &str = "pumpkin:command.heal";

const ARG_TARGETS: &str = "targets";
const ARG_AMOUNT: &str = "amount";

const ERROR_NOT_PLAYER: CommandErrorType<0> = CommandErrorType::new(
    translation::java::PERMISSIONS_REQUIRES_PLAYER,
    translation::java::PERMISSIONS_REQUIRES_PLAYER,
);
```

### 2. 實現執行器

指令執行邏輯封裝在實現 [`CommandExecutor`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-command/src/node/mod.rs) 的結構中：

```rust
/// 將執行指令的玩家治療到滿生命值。
struct SelfHealExecutor;

impl CommandExecutor for SelfHealExecutor {
    fn execute(&self, context: &CommandContext) -> CommandExecutorResult {
        let player = context
            .source
            .output
            .as_player()
            .ok_or_else(|| ERROR_NOT_PLAYER.create_without_context())?;

        // 恢復玩家生命值
        player.living_entity.set_health(20.0);

        context.source.send_feedback(
            TextComponent::text("Fully restored your health!"),
            true, // 如果已設定，則廣播給管理員
        );

        // 返回受影響的實體數量
        Ok(1)
    }
}

/// 治療指定的目標玩家。
struct TargetsHealExecutor {
    has_amount: bool,
}

impl CommandExecutor for TargetsHealExecutor {
    fn execute(&self, context: &CommandContext) -> CommandExecutorResult {
        let targets = EntityArgumentType::get_players(context, ARG_TARGETS)?;

        let amount = if self.has_amount {
            FloatArgumentType::get(context, ARG_AMOUNT)?
        } else {
            20.0
        };

        let count = targets.len();
        for target in &targets {
            let current = target.living_entity.health.load();
            target.living_entity.set_health((current + amount).min(20.0));
        }

        let msg = if count == 1 {
            TextComponent::text(format!("Healed {} by {} HP", targets[0].gameprofile.name, amount))
        } else {
            TextComponent::text(format!("Healed {} players by {} HP", count, amount))
        };

        context.source.send_feedback(msg, true);

        Ok(count as i32)
    }
}
```

### 3. 構建指令樹

使用流式構建函數 `command`、`literal` 和 `argument` 組裝語法樹並註冊權限：

```rust
pub fn register(dispatcher: &mut CommandDispatcher, registry: &PermissionRegistry) {
    // 1. 註冊權限節點及其預設要求（OP 2 級）
    registry.register_permission_or_panic(Permission::new(
        PERMISSION,
        DESCRIPTION,
        PermissionDefault::Op(PermissionLvl::Two),
    ));

    // 2. 組裝指令樹
    dispatcher.register(
        command("heal", DESCRIPTION)
            .requires(PERMISSION)
            .executes(SelfHealExecutor)
            .then(
                argument(ARG_TARGETS, EntityArgumentType::Players)
                    .executes(TargetsHealExecutor { has_amount: false })
                    .then(
                        argument(ARG_AMOUNT, FloatArgumentType::new(1.0, 100.0))
                            .executes(TargetsHealExecutor { has_amount: true }),
                    ),
            ),
    );
}
```

---

## 指令結構模式

### 新增子指令常值

使用 `literal("subcommand_name")` 建立關鍵字分支：

```rust
use crate::command::argument_builder::{argument, command, literal};

dispatcher.register(
    command("weather", "Set the world weather")
        .requires("minecraft:command.weather")
        .then(literal("clear").executes(ClearWeatherExecutor))
        .then(literal("rain").executes(RainWeatherExecutor))
        .then(literal("thunder").executes(ThunderWeatherExecutor))
);
```

### 跨平臺翻譯反饋

Pumpkin 伺服器同時服務 Java 版和基岩版玩家。只要可行，就應透過 `TextComponent::translate_cross` 使用原版翻譯鍵，讓訊息在客戶端本地化顯示：

```rust
use pumpkin_data::translation;
use pumpkin_util::text::TextComponent;

let msg = TextComponent::translate_cross(
    translation::java::COMMANDS_KILL_SUCCESS_SINGLE,
    translation::bedrock::COMMANDS_KILL_SUCCESSFUL,
    [target.get_display_name()],
);

context.source.send_feedback(msg, true);
```

### 執行器中的錯誤處理

執行器必須返回 `CommandExecutorResult`，即 `Result<i32, CommandSyntaxError>`。驗證失敗時應乾淨地返回錯誤，不要 panic：

```rust
use crate::command::errors::error_types::CommandErrorType;

const ERROR_INVALID_VALUE: CommandErrorType<0> = CommandErrorType::new(
    "Amount must be greater than zero.",
    "Amount must be greater than zero.",
);

if amount <= 0.0 {
    return Err(ERROR_INVALID_VALUE.create_without_context());
}
```

---

## 在 `default_dispatcher` 中註冊

實現指令後，在 `crates/pumpkin/src/command/commands/mod.rs` 中註冊它：

1. **宣告模組**：

   ```rust
   // 在 crates/pumpkin/src/command/commands/mod.rs 中
   mod heal;
   ```

2. **在 `default_dispatcher` 中調用 `register`**：

   ```rust
   pub fn default_dispatcher(
       permission_manager: &PermissionManager,
       commands_config: &CommandsConfig,
   ) -> CommandDispatcher {
       let registry = &permission_manager.registry;
       let mut dispatcher = CommandDispatcher::new();

       // ... 現有註冊 ...
       heal::register(&mut dispatcher, registry);

       dispatcher
   }
   ```

---

## 最佳實踐清單

- [ ] **不 panic、不 unwrap**：參數無效時使用 `?` 或返回描述性的 `CommandSyntaxError`。
- [ ] **權限節點**：為權限字符串新增合適的名稱空間字首（原版指令使用 `minecraft:command.<name>`，伺服器專用指令使用 `pumpkin:command.<name>`）。
- [ ] **返回成功計數**：返回的 `i32` 表示指令退出碼或受影響物件數量，可供紅石指令方塊和 `/execute store result` 使用。
- [ ] **遵守遊戲規則**：通知傳送者以外的玩家時，檢查是否啟用 `send_command_feedback`：

  ```rust
  let server = context.source.server();
  if server.level_info.load().game_rules.send_command_feedback {
      target.send_system_message(&feedback);
  }
  ```
