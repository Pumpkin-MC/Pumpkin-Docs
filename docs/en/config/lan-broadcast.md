# LAN Broadcast

Pumpkin can advertise the server across the network in order to make it easier for local players to connect to the server.

## Configuring LAN Broadcast

#### `enabled`: Boolean

Whether LAN broadcast is enabled or not.

:::code-group

```toml [pumpkin.toml] {2}
[networking.lan_broadcast]
enabled = true
```

:::

## Default Config

By default, LAN broadcast is disabled.

:::code-group

```toml [pumpkin.toml]
[networking.lan_broadcast]
enabled = false
```

:::
