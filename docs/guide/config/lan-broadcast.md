# LAN Broadcast

Pumpkin can broadcast the server across the network in order to make it easier for local players to connect to the server easier.

## `enabled`

Whether LAN Broadcast is enabled or not.

:::code-group
```toml [features.toml]
[lan_broadcast]
enabled = false # Boolean
```
:::

## `motd`

The MOTD to broadcast out to clients. Will use server's MOTD by default.

> [!WARNING]
> LAN broadcast MOTD does not support multiple lines, RGB colors, or gradients. Pumpkin does not verify the MOTD before broadcasted. If the server MOTD is using these components, consider defining this field so that clients see a proper MOTD.

:::code-group
```toml [features.toml]
[lan_broadcast]
motd = "" # String (optional)
```
:::

## `port`

What port to bind to. If not specified, will bind to port 0 (any available port on the system).

> [!IMPORTANT]
> The protocol defines what port to broadcast to. This option only exists to specify which port to bind to on the host. This option purely exists so that the port can be predictable.

:::code-group
```toml [features.toml]
[lan_broadcast]
port = 0 # Integer (0-65535)
```
:::
