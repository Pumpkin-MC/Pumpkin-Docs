# Proxy

Pumpkin supports proxy protocols for network server setups. Support for Velocity, BungeeCord, and Vine is configured under `[networking.proxy]` in `pumpkin.toml`.

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
secret = ""

[networking.proxy.vine]
enabled = false
public_key = ""
secret = ""
```

:::

### Configuration Options

- **`[networking.proxy].enabled`**: Master switch to enable proxy support.
- **`[networking.proxy.velocity].enabled`**: Enables Velocity modern forwarding protocol.
- **`[networking.proxy.velocity].secret`**: Forwarding secret matching the Velocity proxy configuration.
- **`[networking.proxy.bungeecord].enabled`**: Enables BungeeCord player info forwarding protocol.
- **`[networking.proxy.bungeecord].secret`**: Optional shared secret for authenticating connections from the BungeeCord proxy via BungeeGuard (`bungeeguard-token`). When set, incoming connections must provide this token, preventing players from bypassing the proxy to connect directly.
- **`[networking.proxy.vine].enabled`**: Enables Vine modern proxy integration with Ed25519 authentication and replay protection.
- **`[networking.proxy.vine].public_key`**: Ed25519 public key (64 hex characters) of the Vine proxy used to verify forwarded player identities.
- **`[networking.proxy.vine].secret`**: Optional shared secret string. If provided and `public_key` is empty, the public key is automatically derived from this secret.
