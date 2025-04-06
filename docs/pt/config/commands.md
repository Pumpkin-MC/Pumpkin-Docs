# Commands
Pumpkin supports Vanilla commands and allows you to configure where they can be ran from. 

## Configuring Commands
#### `use_console`: Boolean
Whether commands from the console are accepted or not.

:::code-group
```toml [features.toml] {2}
[commands]
use_console = false
```
:::

#### `log_console`: Boolean
Whether commands from players should be logged in the console or not.

:::code-group
```toml [features.toml] {2}
[commands]
log_console = false
```
:::

## Operation permission level

The default permission level for all players.

:::code-group
```toml [configuration.toml] {2}
default_op_level = 0
```
:::


## Default Config
By default, Pumpkin will allow commands from console and log all commands run by players.

:::code-group
```toml [features.toml]
[commands]
use_console = true
log_console = true
default_op_level = 0
```
:::
