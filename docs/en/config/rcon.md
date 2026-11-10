# Management Server (MSMP) / RCON

> [!WARNING]
> Legacy RCON (`[networking.rcon]`) has been replaced by the [Minecraft Server Management Protocol (MSMP)](./management) under `[networking.management]`.

## Configuration

:::code-group

```toml [pumpkin.toml]
[networking.management]
enabled = false
address = "127.0.0.1:25585"
secret = ""
allowed_origins = []
status_heartbeat_interval = 0
```

:::

### Management Server Settings

- **`enabled`**: Master switch to enable the Minecraft Server Management Protocol (MSMP) WebSocket service (default: `false`).
- **`address`**: IP address and port where the management server listens for WebSocket connections (default: `"127.0.0.1:25585"`).
- **`secret`**: 40-character alphanumeric secret required for authenticating management clients. If left empty (`""`) on startup, a random 40-character secret is automatically generated.
- **`allowed_origins`**: List of allowed origins for web browser connections validated via the `Origin` HTTP header (default: `[]`).
- **`status_heartbeat_interval`**: Interval in seconds between automatic server status heartbeat broadcasts (`0` disables heartbeats, default: `0`).
