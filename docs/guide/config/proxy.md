# Proxy
Many servers use proxies to manage connections and distribute players across servers. Pumpkin supports the following proxy protocols:

- [Velocity](https://papermc.io/software/velocity)
- [BungeeCord](https://spigotmc.org/wiki/bungeecord-installation)

> [!TIP]
> Velocity is recommended for most server networks. Velocity is modern and more performant compared to BungeeCord

## `enabled`

Enables support for proxies.

:::code-group
```toml [features.toml]
[proxy]
enabled = false # Boolean
```
:::

## `velocity.enabled`

Whether Velocity support is enabled or not.

:::code-group
```toml [features.toml]
[proxy.velocity]
enabled = false # Boolean
```
:::

## `velocity.secret`

The secret as configured in Velocity.

:::code-group
```toml [features.toml]
[proxy.velocity]
secret = "" # String
```
:::

## `bungeecord.enabled`

Whether BungeeCord support is enabled or not

> [!CAUTION]
> Ensure that the server's firewall is correctly configured or you have BungeeGuard installed, as BungeeCord can't verify if player is coming from your proxy or directly trying accessing the server

:::code-group
```toml [features.toml]
[proxy.bungeecord]
enabled = false # Boolean
```
:::
