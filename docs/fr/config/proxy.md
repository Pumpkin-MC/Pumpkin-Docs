# Proxy

Pumpkin supports proxy protocols for network server setups. Support for Velocity and BungeeCord is configured under `[networking.proxy]` in `pumpkin.toml`.

## Configuration

:::code-group

```toml [pumpkin.toml]
[networking.proxy]
enabled = false

[networking.proxy.velocity]
enabled = false
secret = ""

[networking.proxy.bungeecord]
enabled = false
```

:::

### Configuration Options

- **`[networking.proxy].enabled`**: Master switch to enable proxy support.
- **`[networking.proxy.velocity].enabled`**: Enables Velocity forwarding protocol.
- **`[networking.proxy.velocity].secret`**: Forwarding secret matching Velocity proxy configuration.
- **`[networking.proxy.bungeecord].enabled`**: Enables BungeeCord forwarding protocol.
