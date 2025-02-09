# RCON

RCON is a protocol that allows you to remotely manage the server from a different device. Pumpkin has full support for RCON.

## `enabled`

:::code-group
```toml [features.toml]
[rcon]
enabled = false # Boolean
```
:::

## `address`

The address and port that RCON should listen to.

:::code-group
```toml [features.toml]
[rcon]
address = "0.0.0.0:25575" # String
```
:::

## `password`

The password to use for RCON authentication.

:::code-group
```toml [features.toml]
[rcon]
password = "" # String
```
:::

## `max_connections`

The max number of RCON connections allowed at a single time. Set to 0 to disable a limit.

:::code-group
```toml [features.toml]
[rcon]
max_connections = 0 # Integer
```
:::

## `logging.log_logged_successfully`

Whether successful logins should be logged to console or not.

:::code-group
```toml [features.toml]
[rcon.logging]
log_logged_successfully = true # Boolean
```
:::

## `logging.log_wrong_password`

Whether wrong password attempts should be logged to console or not.

:::code-group
```toml [features.toml]
[rcon.logging]
log_logged_successfully = true # Boolean
```
:::

## `logging.log_commands`

Whether to log commands ran from RCON to console or not.

:::code-group
```toml [features.toml]
[rcon.logging]
log_commands = true # Boolean
```
:::

## `logging.log_quit`

Whether RCON client quit should be logged or not.

:::code-group
```toml [features.toml]
[rcon.logging]
log_quit = true # Boolean
```
:::
