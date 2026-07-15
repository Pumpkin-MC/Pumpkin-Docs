# Compression

Compression is used to reduce the size of packets. This is beneficial to reduce bandwidth server side and also to help players on slower internet connections.

## Configuring compression

> [!NOTE]
> Compression settings are now per-protocol. Java and Bedrock have separate compression configurations.

### Java

#### `enabled`: Boolean

Whether packet compression is enabled for Java clients or not.

> [!TIP]
> It might be beneficial to disable compression if the server is behind a proxy.

:::code-group

```toml [pumpkin.toml] {2}
[networking.java.compression]
enabled = true
```

:::

#### `threshold`: Integer (0-1024)

The minimum packet size before the server attempts to compress the packet.

> [!CAUTION]
> Increasing this value can hurt players on slower connections.

:::code-group

```toml [pumpkin.toml] {3}
[networking.java.compression]
enabled = true
threshold = 256
```

:::

#### `level`: Integer (0-9)

A value between 0 to 9: 0 to disable compression, 1 being the fastest compression (at the cost of size), and 9 being maximum compression (at the cost of speed).

:::code-group

```toml [pumpkin.toml] {3}
[networking.java.compression]
enabled = true
level = 4
```

:::

### Bedrock

#### `enabled`: Boolean

Whether packet compression is enabled for Bedrock clients or not.

:::code-group

```toml [pumpkin.toml] {2}
[networking.bedrock.compression]
enabled = true
```

:::

#### `threshold`: Integer (0-1024)

The minimum packet size before the server attempts to compress the packet.

:::code-group

```toml [pumpkin.toml] {3}
[networking.bedrock.compression]
enabled = true
threshold = 256
```

:::

#### `level`: Integer (0-9)

A value between 0 to 9: 0 to disable compression, 1 being the fastest compression (at the cost of size), and 9 being maximum compression (at the cost of speed).

:::code-group

```toml [pumpkin.toml] {3}
[networking.bedrock.compression]
enabled = true
level = 4
```

:::

## Default Config

By default, compression is enabled.

:::code-group

```toml [pumpkin.toml]
[networking.java.compression]
enabled = true
threshold = 256
level = 4

[networking.bedrock.compression]
enabled = true
threshold = 256
level = 4
```

:::
