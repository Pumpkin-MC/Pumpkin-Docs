# RCON

RCON allows remote administration of your Pumpkin server over a network connection. In `pumpkin.toml`, settings are placed under `[networking.rcon]`.

## Configuration

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

### RCON Settings

- **`enabled`**: Master switch to enable RCON service.
- **`address`**: IP address and port to bind RCON server to.
- **`password`**: Password required for authenticating RCON clients.
- **`max_connections`**: Maximum concurrent RCON client connections allowed.

### RCON Logging Settings

- **`logged_successfully`**: Log successful client authentication events.
- **`wrong_password`**: Log failed authentication attempts (wrong password).
- **`commands`**: Log commands executed through RCON.
- **`quit`**: Log client disconnection events.
