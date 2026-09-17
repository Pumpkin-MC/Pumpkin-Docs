# 世界

Pumpkin 允许在 `pumpkin.toml` 的 `[world]` 配置项下微调世界存储格式、自动保存间隔以及光照模式。

## 配置

:::code-group

```toml [pumpkin.toml]
[world]
lighting = "default"
autosave_ticks = 6000

[world.chunk]
type = "anvil"
write_in_place = false

[world.chunk.compression]
algorithm = "LZ4"
level = 6
```

:::

### 世界设置

- **`lighting`**：光照引擎传播计算模式。
  - `"default"`：标准原版 Minecraft 光照传播。
  - `"full"`：全图最大天光，无阴影。
  - `"dark"`：全图完全黑暗（零光照）。
- **`autosave_ticks`**：世界自动保存之间的服务器 Tick 数量（默认：`6000`，在 20 TPS 下相当于 5 分钟）。设置为 `0` 可禁用世界自动保存。

### 区块存储设置

- **`type`**：使用的区块存储格式：
  - `"anvil"`：标准 Minecraft Anvil 区域文件格式（`.mca`）。
  - `"linear"`：Linear 区域存储格式，采用快速压缩算法以减少磁盘占用。
  - `"pump"`：Pumpkin 原生优化的世界格式。
- **`write_in_place`**：是否在现有区域文件内就地重写区块，而不是重新分配空闲区块（默认：`false`）。
- **`compression.algorithm`**：区块数据使用的压缩算法（`"LZ4"`、`"ZLib"`、`"GZip"`、`"Custom"`）。
- **`compression.level`**：区块存储的压缩等级（默认：`6`）。
