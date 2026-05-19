# Proxy

Many servers use proxies to manage connections and distribute players across servers. Pumpkin supports the following proxy protocols:

- [Velocity](https://papermc.io/software/velocity)
- [BungeeCord](https://www.spigotmc.org/wiki/bungeecord-installation/)

> [!TIP]
> Velocity is recommended for most server networks. Velocity is modern and more performant compared to BungeeCord.

## Configuring Proxy

#### `enabled`: Boolean

Enables support for proxies.

:::code-group

```toml [pumpkin.toml]{2}
[networking.proxy]
enabled = false
```

:::

### Velocity

#### `enabled`: Boolean

Whether Velocity support is enabled or not.

:::code-group

```toml [pumpkin.toml]{2}
[networking.proxy.velocity]
enabled = false
```

:::

#### `secret`: String

The secret as configured in Velocity.

:::code-group

```toml [pumpkin.toml]{3}
[networking.proxy.velocity]
secret = "[proxy secret here]"
```

:::

### BungeeCord

#### `enabled`: Boolean

Whether BungeeCord support is enabled or not.

:::code-group

```toml [pumpkin.toml]{2}
[networking.proxy.bungeecord]
enabled = false
```

:::

> [!CAUTION]
> BungeeCord can't verify if player info is from your proxy or an imposter. Ensure that the server's firewall is correctly configured.

## Default Config

By default, proxy support is disabled. Here is the default config:

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
