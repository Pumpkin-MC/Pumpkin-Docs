# Commands

Pumpkin supports Vanilla commands and allows you to configure where they can be ran from.

## Configuring Commands

#### `use_console`: Boolean

Whether commands from the console are accepted or not.

:::code-group

```toml [pumpkin.toml] {2}
[commands]
use_console = false
```

:::

#### `use_tty`: Boolean

Whether to use TTY for the console or not.

:::code-group

```toml [pumpkin.toml] {2}
[commands]
use_tty = true
```

:::

#### `log_console`: Boolean

Whether commands from players should be logged in the console or not.

:::code-group

```toml [pumpkin.toml] {2}
[commands]
log_console = false
```

:::

#### `broadcast_console_to_ops`: Boolean

Whether console output should be broadcast to operators or not.

:::code-group

```toml [pumpkin.toml] {2}
[commands]
broadcast_console_to_ops = true
```

:::

#### `default_op_level`: Integer

The default permission level for all players.

:::code-group

```toml [pumpkin.toml] {2}
[commands]
default_op_level = 0
```

:::

## Default Config

By default, Pumpkin will allow commands from console and log all commands run by players.

:::code-group

```toml [pumpkin.toml]
[commands]
use_console = true
use_tty = true
log_console = true
broadcast_console_to_ops = true
default_op_level = 0
```

:::
