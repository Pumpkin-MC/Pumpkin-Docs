# Adding a Command

This guide explains how to implement and register a new command in the Pumpkin server codebase.

Commands in Pumpkin are implemented in the `crates/pumpkin/src/command/commands/` directory and registered into the central [`CommandDispatcher`](file:///home/alex/Documents/Development/Rust/Pumpkin/crates/pumpkin-command/src/node/dispatcher.rs) during server initialization.

---

## Anatomy of a Pumpkin Command

A typical command file contains:
1. **Metadata Constants**: Command description, permission node identifier, and argument names.
2. **Permission Registration**: Declaring default OP requirements in the server's [`PermissionRegistry`](file:///home/alex/Documents/Development/Rust/Pumpkin/crates/pumpkin-util/src/permission.rs).
3. **Command Executors**: Structs implementing the [`CommandExecutor`](file:///home/alex/Documents/Development/Rust/Pumpkin/crates/pumpkin-command/src/node/mod.rs) trait for each terminal node or subcommand.
4. **Registration Function**: Constructing the argument tree using fluent builders (`command`, `literal`, `argument`).

---

## Step-by-Step Implementation: Creating `/heal`

Let's implement a complete `/heal` command that can heal either the executing player or a set of target players:

```
/heal                 -> Heals the executing sender
/heal <targets>       -> Heals target player(s)
/heal <targets> <amount> -> Heals target player(s) by a specified amount
```

### 1. Create the File

Create `crates/pumpkin/src/command/commands/heal.rs`:

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

### 2. Implement the Executors

Command execution logic is encapsulated in structs implementing [`CommandExecutor`](file:///home/alex/Documents/Development/Rust/Pumpkin/crates/pumpkin-command/src/node/mod.rs):

```rust
/// Heals the executing player to full health.
struct SelfHealExecutor;

impl CommandExecutor for SelfHealExecutor {
    fn execute(&self, context: &CommandContext) -> CommandExecutorResult {
        let player = context
            .source
            .output
            .as_player()
            .ok_or_else(|| ERROR_NOT_PLAYER.create_without_context())?;

        // Restore player health
        player.living_entity.set_health(20.0);

        context.source.send_feedback(
            TextComponent::text("Fully restored your health!"),
            true, // Broadcast to operators if configured
        );

        // Return number of affected entities
        Ok(1)
    }
}

/// Heals specified target players.
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

### 3. Build the Command Tree

Use the fluent builder functions `command`, `literal`, and `argument` to assemble the syntax tree and register the permission:

```rust
pub fn register(dispatcher: &mut CommandDispatcher, registry: &PermissionRegistry) {
    // 1. Register permission node with default requirement (OP level 2)
    registry.register_permission_or_panic(Permission::new(
        PERMISSION,
        DESCRIPTION,
        PermissionDefault::Op(PermissionLvl::Two),
    ));

    // 2. Assemble command tree
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

## Command Structure Patterns

### Adding Subcommand Literals
Use `literal("subcommand_name")` to create keyword branches:

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

### Cross-Platform Translation Feedback
Pumpkin servers serve both Java and Bedrock Edition players simultaneously. Whenever possible, use vanilla translation keys with `TextComponent::translate_cross` so messages render localized on the client:

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

### Error Handling in Executors
Executors must return `CommandExecutorResult`, which resolves to `Result<i32, CommandSyntaxError>`. If validation fails, return an error cleanly without panicking:

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

## Registering in `default_dispatcher`

Once your command is implemented, register it in `crates/pumpkin/src/command/commands/mod.rs`:

1. **Declare the Module**:
   ```rust
   // In crates/pumpkin/src/command/commands/mod.rs
   mod heal;
   ```

2. **Invoke `register` in `default_dispatcher`**:
   ```rust
   pub fn default_dispatcher(
       permission_manager: &PermissionManager,
       commands_config: &CommandsConfig,
   ) -> CommandDispatcher {
       let registry = &permission_manager.registry;
       let mut dispatcher = CommandDispatcher::new();

       // ... existing registrations ...
       heal::register(&mut dispatcher, registry);

       dispatcher
   }
   ```

---

## Best Practices Checklist

- [ ] **No Panics or Unwraps**: Use `?` or return descriptive `CommandSyntaxError`s when arguments are invalid.
- [ ] **Permission Nodes**: Prefix permission strings with appropriate namespaces (`minecraft:command.<name>` for vanilla commands, `pumpkin:command.<name>` for server-specific commands).
- [ ] **Return Success Counts**: The returned `i32` represents the command's exit code or number of affected objects for redstone command blocks and `/execute store result`.
- [ ] **Respect GameRules**: When notifying players other than the sender, check if `send_command_feedback` is enabled:
  ```rust
  let server = context.source.server();
  if server.level_info.load().game_rules.send_command_feedback {
      target.send_system_message(&feedback);
  }
  ```
