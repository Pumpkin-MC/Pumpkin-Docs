# 局域网广播
Pumpkin 可以在网络中广播服务器，使本地玩家更容易连接到服务器。

## 配置局域网广播

#### `enabled`: 布尔值
是否启用局域网广播。

:::code-group
```toml [features.toml] {2}
[lan_broadcast]
enabled = true
```
:::

#### `motd`: 字符串 (可选)
广播给客户端的 MOTD；默认使用服务器的 MOTD。

> [!CAUTION]
> 局域网广播 MOTD 不支持多行、RGB 颜色或渐变。Pumpkin 在广播前不会验证 MOTD。如果服务器 MOTD 使用了这些组件，请考虑定义此字段，以便客户端能看到正确的 MOTD。

:::code-group
```toml [features.toml] {3}
[lan_broadcast]
enabled = true
motd = "[你的 MOTD 在这里]"
```
:::

#### `port`: 整数 (0-65535) (可选)
绑定的端口。如果未指定，将绑定到端口 0（系统上任何可用端口）。

> [!IMPORTANT]
> 协议定义了要广播到哪个端口。此选项仅用于指定要在主机上绑定的端口。此选项纯粹是为了使端口可预测。

:::code-group
```toml [features.toml] {3}
[lan_broadcast]
enabled = true
port = 46733
```
:::

## 默认配置
默认情况下，局域网广播是禁用的。

:::code-group
```toml [features.toml]
[lan_broadcast]
enabled = false
motd = "[服务器 MOTD 在这里]"
port = 0
```
::: 