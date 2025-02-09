# Logging

Pumpkin allows you to customize what you want in your logs.

## `enabled`

Whether logging is enabled or not.

:::code-group
```toml [features.toml]
[logging]
enabled = true # Boolean
```
:::

## `level`

What should be logged.

:::code-group
```toml [features.toml]
[logging]
level = "Info" # Enum (Off, Error, Warn, Info, Debug, Trace)
```
:::

## `env`

Whether to allow choosing the log level by setting the `RUST_LOG` environment variable or not.

:::code-group
```toml [features.toml]
[logging]
env = false # Boolean
```
:::

## `threads`

Whether to print threads in the logging message or not.

:::code-group
```toml [features.toml]
[logging]
threads = true # Boolean
```
:::

## `color`

Whether to print with color to the console or not.

:::code-group
```toml [features.toml]
[logging]
color = true # Boolean
```
:::

## `timestamp`

Whether to print the timestamp in the meessage or not.

:::code-group
```toml [features.toml]
[logging]
timestamp = true # Boolean
```
:::
