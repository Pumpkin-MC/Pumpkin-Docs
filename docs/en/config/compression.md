# Compression

Compression is used to reduce the size of packets. This is beneficial to reduce bandwidth server side and also to help players on slower internet connections.

Pumpkin supports separate compression settings for Java and Bedrock editions.

## Java Edition Compression

#### `enabled`: Boolean

Whether Java packet compression is enabled or not.

> [!TIP]
> It might be beneficial to disable compression if the server is behind a proxy.

:::code-group

```toml [pumpkin.toml] {2}
[networking.java_compression]
enabled = true
```

:::

#### `threshold`: Integer (0-1024)

The minimum packet size before the server attempts to compress the packet.

> [!CAUTION]
> Increasing this value can hurt players on slower connections.

:::code-group

```toml [pumpkin.toml] {2}
[networking.java_compression]
threshold = 256
```

:::

#### `level`: Integer (0-9)

A value between 0 to 9: 0 to disable compression, 1 being the fastest compression (at the cost of size), and 9 being maximum compression (at the cost of speed).

:::code-group

```toml [pumpkin.toml] {2}
[networking.java_compression]
level = 4
```

:::

## Bedrock Edition Compression

The same fields are available for Bedrock Edition under `[networking.bedrock_compression]`:

:::code-group

```toml [pumpkin.toml]
[networking.bedrock_compression]
enabled = true
threshold = 256
level = 4
```

:::

## Default Config

By default, compression is enabled for both editions.

:::code-group

```toml [pumpkin.toml]
[networking.java_compression]
enabled = true
threshold = 256
level = 4

[networking.bedrock_compression]
enabled = true
threshold = 256
level = 4
```

:::
