# 代理

许多服务器使用代理来管理连接并在服务器之间分配玩家。Pumpkin 支持以下代理协议：

- [Velocity](https://papermc.io/software/velocity)
- [BungeeCord](https://www.spigotmc.org/wiki/bungeecord-installation/)

> [!TIP]提示
> 对于大多数服务器网络，建议使用 Velocity。与 BungeeCord 相比，Velocity 更现代且性能更好。

## 配置代理

#### `enabled`: 布尔值

启用对代理的支持。

:::code-group

```toml [pumpkin.toml]{2}
[networking.proxy]
enabled = false
```

:::

### Velocity

#### `enabled`: 布尔值

是否启用 Velocity 支持。

:::code-group

```toml [pumpkin.toml]{2}
[networking.proxy.velocity]
enabled = false
```

:::

#### `secret`: 字符串 

在 Velocity 中配置的密钥。

:::code-group

```toml [pumpkin.toml]{3}
[networking.proxy.velocity]
secret = "[代理密钥]"
```

:::

### BungeeCord

#### `enabled`: 布尔值

是否启用 BungeeCord 支持。

:::code-group

```toml [pumpkin.toml]{2}
[networking.proxy.bungeecord]
enabled = false
```

:::

> [!CAUTION]警告
> BungeeCord 无法验证玩家信息是来自你的代理还是冒充者。请确保服务器的防火墙配置正确。

## 默认配置

默认情况下，代理支持是禁用的。以下是默认配置：

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
