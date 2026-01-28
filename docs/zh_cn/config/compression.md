# 压缩

压缩用于减小数据包的大小。这有利于减少服务器端的带宽使用，并帮助网络连接较慢的玩家。

## 配置压缩

#### `enabled`: 布尔值

是否启用数据包压缩。

> [!TIP]提示
> 如果服务器位于代理后面，禁用压缩可能会更有利。

:::code-group

```toml [features.toml] {2}
[packet_compression]
enabled = true
```

:::

#### `threshold`: 整数 (0-1024)

服务器尝试压缩数据包前的最小数据包大小。

> [!CAUTION]警告
> 增加此值可能会对网络连接较慢的玩家造成不良影响。

:::code-group

```toml [features.toml] {2}
[packet_compression]
threshold = 256
```

:::

#### `level`: 整数 (0-9)

0 到 9 之间的值：0 表示禁用压缩，1 是最快的压缩（以大小为代价），9 是最大的压缩（以速度为代价）。

:::code-group

```toml [features.toml] {2}
[packet_compression]
level = 4
```

:::

## 默认配置

默认情况下，压缩是启用的。

:::code-group

```toml [features.toml]
[packet_compression]
enabled = true
threshold = 256
level = 4
```

:::
