# LAN Broadcast

Pumpkin can broadcast server announcements on the local network so LAN clients can easily discover and join the server.

## Configuration

:::code-group

```toml [pumpkin.toml]
[networking.lan_broadcast]
enabled = false
```

:::

### Configuration Options

- **`enabled`**: Enables or disables broadcasting to local network clients.
