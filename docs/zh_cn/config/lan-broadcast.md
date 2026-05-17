# 局域网广播

Pumpkin 可以在网络中广播服务器，使本地玩家更容易连接到服务器。

## 配置局域网广播

#### `enabled`: 布尔值

是否启用局域网广播。

:::code-group

```toml [pumpkin.toml] {2}
[networking.lan_broadcast]
enabled = false
```

:::

## 默认配置

默认情况下，局域网广播是禁用的。

:::code-group

```toml [pumpkin.toml]
[networking.lan_broadcast]
enabled = false
```

:::
