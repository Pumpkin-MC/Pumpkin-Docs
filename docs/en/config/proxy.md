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
- **`[networking.proxy.velocity].secret`**: Forwarding secret matching Velocity proxy configuration. Prefix the value with `@` to read it from a file instead, see [Keeping the secret out of the config](#keeping-the-secret-out-of-the-config).
- **`[networking.proxy.bungeecord].enabled`**: Enables BungeeCord forwarding protocol.

### Keeping the secret out of the config

`pumpkin.toml` is commonly committed to version control, baked into an image, or pasted into a support thread, which makes it a poor place to keep the forwarding secret. A `secret` value beginning with `@` is read from the file at that path instead of being used literally:

:::code-group

```toml [pumpkin.toml]
[networking.proxy.velocity]
enabled = true
secret = "@forwarding.secret"
```

:::

Pumpkin then reads the secret from `forwarding.secret`, resolved relative to the server's working directory, the same place `pumpkin.toml` is read from. Absolute paths work too, which lets you point straight at a Docker or Kubernetes secret:

```toml
secret = "@/run/secrets/velocity_forwarding_secret"
```

Surrounding whitespace is trimmed, so a trailing newline in the file is harmless. If the referenced file is missing or empty, the server stops during startup with an error rather than starting up and rejecting every player.

On Windows, use a literal string (single quotes) for absolute paths. TOML treats backslashes in a normal double-quoted string as escape characters, so `"@C:\secrets\velocity.txt"` fails to parse:

```toml
secret = '@C:\secrets\velocity.txt'
```

If your secret genuinely begins with `@`, double it to escape: `secret = "@@literal"` resolves to the literal value `@literal`.
