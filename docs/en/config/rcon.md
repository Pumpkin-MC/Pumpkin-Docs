# RCON

RCON is a protocol that allows you to remotely manage the server from a different device. Pumpkin has full support for RCON.

## Configuring RCON

#### `enabled`: Boolean

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon]
enabled = false
```

:::

#### `address`: String

The address and port that RCON should listen to.

:::code-group

```toml [pumpkin.toml] {3}
[networking.rcon]
address = "0.0.0.0:25575"
```

:::

#### `password`: String

The password to use for RCON authentication.

:::code-group

```toml [pumpkin.toml] {3}
[networking.rcon]
password = "[your safe password here]"
```

:::

#### `max_connections`: Integer

The max number of RCON connections allowed at a single time. Set this to 0 to disable the limit.

:::code-group

```toml [pumpkin.toml] {3}
[networking.rcon]
max_connections = 10
```

:::

### Logging

#### `logged_successfully`: Boolean

Whether successful logins should be logged to console or not.

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
logged_successfully = true
```

:::

#### `wrong_password`: Boolean

Whether wrong password attempts should be logged to console or not.

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
wrong_password = true
```

:::

#### `commands`: Boolean

Whether to log commands ran from RCON to console or not.

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
commands = true
```

:::

#### `quit`: Boolean

Whether RCON client quit should be logged or not.

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
quit = true
```

:::

## Default Config

By default, RCON is disabled.

:::code-group

```toml [pumpkin.toml]
[networking.rcon]
enabled = false
address = "0.0.0.0:25575"
password = ""
max_connections = 10

[networking.rcon.logging]
logged_successfully = true
wrong_password = true
commands = true
quit = true
```

:::
