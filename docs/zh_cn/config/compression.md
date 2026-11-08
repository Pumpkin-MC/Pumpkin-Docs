# 压缩

数据包压缩可减少 Java 版和基岩版客户端的带宽占用。在 `pumpkin.toml` 中，Java 版与基岩版的网络压缩以及世界区块压缩均可独立配置。

## 网络压缩

### Java 版

:::code-group

```toml [pumpkin.toml]
[networking.java.compression]
enabled = true
threshold = 256
level = 4
```

:::

### 基岩版

:::code-group

```toml [pumpkin.toml]
[networking.bedrock.compression]
enabled = true
threshold = 256
level = 4
```

:::

### 配置选项

- **`enabled`**：启用网络数据包压缩。
- **`threshold`**：触发压缩所需的最小数据包负载大小（字节）。
- **`level`**：压缩等级（0 到 9，数值越高，消耗的 CPU 时间越多，但数据包越小）。

## 世界区块压缩

当 `[world.chunk]` 配置为 `type = "anvil"` 时，区块压缩设置控制存储的世界区块数据在磁盘上的压缩方式（默认区块格式为 `"pump"`）。

:::code-group

```toml [pumpkin.toml]
[world.chunk]
type = "anvil"

[world.chunk.compression]
algorithm = "LZ4"
level = 6
```

:::

- **`algorithm`**：区块数据使用的压缩算法。支持 `"LZ4"`、`"ZLib"`、`"GZip"` 和 `"Custom"`（默认：`"LZ4"`）。
- **`level`**：区块数据的压缩等级（默认：`6`）。
