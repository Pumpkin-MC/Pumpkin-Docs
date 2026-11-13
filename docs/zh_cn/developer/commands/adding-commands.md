# 添加命令

本指南说明如何在 Pumpkin 服务器代码库中实现并注册新命令。

Pumpkin 中的命令在 `crates/pumpkin/src/command/commands/` 目录中实现，并在服务器初始化期间注册到中央 [`CommandDispatcher`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-command/src/node/dispatcher.rs)。

---

## Pumpkin 命令的组成

一个典型的命令文件包含：

1. **元数据常量**：命令描述、权限节点标识符和参数名称。
2. **权限注册**：在服务器的 [`PermissionRegistry`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-util/src/permission.rs) 中声明默认 OP 要求。
3. **命令执行器**：为每个终端节点或子命令实现 [`CommandExecutor`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-command/src/node/mod.rs) trait 的结构体。
4. **注册函数**：使用流式构建器（`command`、`literal`、`argument`）构造参数树。

---

## 分步实现：创建 `/heal`

下面实现一个完整的 `/heal` 命令，它可以治疗执行者自身或一组目标玩家：

```
/heal                 -> 治疗执行命令的发送者
/heal <targets>       -> 治疗目标玩家
/heal <targets> <amount> -> 按指定数值治疗目标玩家
```

### 1. 创建文件

创建 `crates/pumpkin/src/command/commands/heal.rs`：

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

### 2. 实现执行器

命令执行逻辑封装在实现 [`CommandExecutor`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-command/src/node/mod.rs) 的结构体中：

```rust
/// 将执行命令的玩家治疗到满生命值。
struct SelfHealExecutor;

impl CommandExecutor for SelfHealExecutor {
    fn execute(&self, context: &CommandContext) -> CommandExecutorResult {
        let player = context
            .source
            .output
            .as_player()
            .ok_or_else(|| ERROR_NOT_PLAYER.create_without_context())?;

        // 恢复玩家生命值
        player.living_entity.set_health(20.0);

        context.source.send_feedback(
            TextComponent::text("Fully restored your health!"),
            true, // 如果已配置，则广播给管理员
        );

        // 返回受影响的实体数量
        Ok(1)
    }
}

/// 治疗指定的目标玩家。
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

### 3. 构建命令树

使用流式构建函数 `command`、`literal` 和 `argument` 组装语法树并注册权限：

```rust
pub fn register(dispatcher: &mut CommandDispatcher, registry: &PermissionRegistry) {
    // 1. 注册权限节点及其默认要求（OP 2 级）
    registry.register_permission_or_panic(Permission::new(
        PERMISSION,
        DESCRIPTION,
        PermissionDefault::Op(PermissionLvl::Two),
    ));

    // 2. 组装命令树
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

## 命令结构模式

### 添加子命令字面量

使用 `literal("subcommand_name")` 创建关键字分支：

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

### 跨平台翻译反馈

Pumpkin 服务器同时服务 Java 版和基岩版玩家。只要可行，就应通过 `TextComponent::translate_cross` 使用原版翻译键，让消息在客户端本地化显示：

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

### 执行器中的错误处理

执行器必须返回 `CommandExecutorResult`，即 `Result<i32, CommandSyntaxError>`。验证失败时应干净地返回错误，不要 panic：

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

## 在 `default_dispatcher` 中注册

实现命令后，在 `crates/pumpkin/src/command/commands/mod.rs` 中注册它：

1. **声明模块**：

   ```rust
   // 在 crates/pumpkin/src/command/commands/mod.rs 中
   mod heal;
   ```

2. **在 `default_dispatcher` 中调用 `register`**：

   ```rust
   pub fn default_dispatcher(
       permission_manager: &PermissionManager,
       commands_config: &CommandsConfig,
   ) -> CommandDispatcher {
       let registry = &permission_manager.registry;
       let mut dispatcher = CommandDispatcher::new();

       // ... 现有注册 ...
       heal::register(&mut dispatcher, registry);

       dispatcher
   }
   ```

---

## 最佳实践清单

- [ ] **不 panic、不 unwrap**：参数无效时使用 `?` 或返回描述性的 `CommandSyntaxError`。
- [ ] **权限节点**：为权限字符串添加合适的命名空间前缀（原版命令使用 `minecraft:command.<name>`，服务器专用命令使用 `pumpkin:command.<name>`）。
- [ ] **返回成功计数**：返回的 `i32` 表示命令退出码或受影响对象数量，可供红石命令方块和 `/execute store result` 使用。
- [ ] **遵守游戏规则**：通知发送者以外的玩家时，检查是否启用 `send_command_feedback`：
  ```rust
  let server = context.source.server();
  if server.level_info.load().game_rules.send_command_feedback {
      target.send_system_message(&feedback);
  }
  ```
