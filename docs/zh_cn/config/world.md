# 世界

Pumpkin 允许在 `pumpkin.toml` 的 `[world]` 配置项下微调世界存储格式、自动保存间隔、光照模式以及并行实体 Tick 的安全边际。

## 配置

:::code-group

```toml [pumpkin.toml]
[world]
lighting = "default"
autosave_ticks = 6000

[world.chunk]
type = "pump"

[world.entity_islands]
unaudited_reach = 16.0
knockback_reach = 4.0
```

:::

使用标准 Anvil 格式（`type = "anvil"`）时，还可以配置区块压缩：

:::code-group

```toml [pumpkin.toml (Anvil)]
[world.chunk]
type = "anvil"

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

- **`type`**：使用的区块存储格式（默认：`"pump"`）：
  - `"pump"`：Pumpkin 原生优化的世界格式（`.pump`）。
  - `"anvil"`：标准 Minecraft Anvil 区域文件格式（`.mca`）。
  - `"linear"`：Linear 区域存储格式（`.linear`），采用快速压缩算法以减少磁盘占用。
- **`compression.algorithm`**：Anvil 区块数据使用的压缩算法（`"LZ4"`、`"ZLib"`、`"GZip"`、`"Custom"`，默认：`"LZ4"`）。
- **`compression.level`**：Anvil 区块存储的压缩等级（默认：`6`）。

### 实体孤岛设置

在 `[world.entity_islands]` 下配置并行孤岛中处理实体 Tick 的安全边际。较低的值允许更多实体并行执行 Tick，而较高的值则可在更广泛的相互作用中保持严格的 Tick 顺序：

- **`unaudited_reach`**：未经审计 Tick 的实体在其追踪范围之外可触及的方块距离（默认：`16.0`）。
- **`knockback_reach`**：来自未经审计实体的攻击在单个 Tick 内可击退被审计实体的方块距离。对于 TNT 大炮等机械装置，可调大此值（默认：`4.0`）。
