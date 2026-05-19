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

Should the tty console be used under Linux

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

## Operation permission level

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
default_op_level = 0
```

:::
