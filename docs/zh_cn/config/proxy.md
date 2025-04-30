# 代理
许多服务器使用代理来管理连接并在服务器之间分配玩家。Pumpkin 支持以下代理协议：

- [Velocity](https://papermc.io/software/velocity)
- [BungeeCord](https://www.spigotmc.org/wiki/bungeecord-installation/)

> [!TIP]
> 对于大多数服务器网络，建议使用 Velocity。与 BungeeCord 相比，Velocity 更现代且性能更好。

## 配置代理

#### `enabled`: 布尔值

启用对代理的支持。

:::code-group
```toml [features.toml]{2}
[proxy]
enabled = true
```
:::

### Velocity 代理配置

#### `enabled`: 布尔值

是否启用 Velocity 支持。

:::code-group
```toml [features.toml]{2}
[proxy.velocity]
enabled = true
```
:::

#### `secret`: 字符串 

在 Velocity 中配置的密钥。

:::code-group
```toml [features.toml]{3}
[proxy.velocity]
enabled = true
secret = "[代理密钥]"
```
:::

### BungeeCord 代理配置

#### `enabled`: 布尔值
是否启用 BungeeCord 支持。

:::code-group
```toml [features.toml]{2}
[proxy.bungeecord]
enabled = true
```
:::

> [!CAUTION]
> BungeeCord 无法验证玩家信息是来自你的代理还是冒充者。确保服务器的防火墙配置正确。

## 默认配置
默认情况下，代理支持是禁用的。以下是默认配置：

:::code-group
```toml [features.toml]
[proxy]
enabled = false

[proxy.velocity]
enabled = false
secret = ""

[proxy.bungeecord]
enabled = false
```
::: 