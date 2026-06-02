# Logging

Pumpkin allows you to customize what you want in your logs.

## Configuring Logging

#### `enabled`: Boolean

Whether logging is enabled or not.

:::code-group

```toml [pumpkin.toml] {2}
[logging]
enabled = true
```

:::

#### `threads`: Boolean

Whether to print threads in the logging message or not.

:::code-group

```toml [pumpkin.toml] {2}
[logging]
threads = true
```

:::

#### `color`: Boolean

Whether to print to the console with color or not.

:::code-group

```toml [pumpkin.toml] {2}
[logging]
color = true
```

:::

#### `timestamp`: Boolean

Whether to print the timestamp in the message or not.

:::code-group

```toml [pumpkin.toml] {2}
[logging]
timestamp = true
```

:::

#### `file`: String

The log output file name.

:::code-group

```toml [pumpkin.toml] {2}
[logging]
file = "latest.log"
```

:::

## Default Config

By default, logging is enabled and will print with color, threads, and timestamps.

:::code-group

```toml [pumpkin.toml]
[logging]
enabled = true
threads = true
color = true
timestamp = true
file = "latest.log"
```

:::
