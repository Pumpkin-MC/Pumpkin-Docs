# 世界

Pumpkin 允許在 `pumpkin.toml` 的 `[world]` 設定項下微調世界儲存格式、自動儲存間隔、光照模式以及平行實體 Tick 的安全邊際。

## 設定

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

使用標準 Anvil 格式（`type = "anvil"`）時，還可以設定區塊壓縮：

:::code-group

```toml [pumpkin.toml (Anvil)]
[world.chunk]
type = "anvil"

[world.chunk.compression]
algorithm = "LZ4"
level = 6
```

:::

### 世界設定

- **`lighting`**：光照引擎傳播計算模式。
  - `"default"`：標準原版 Minecraft 光照傳播。
  - `"full"`：全圖最大日光，無陰影。
  - `"dark"`：全圖完全黑暗（零光照）。
- **`autosave_ticks`**：世界自動儲存之間的伺服器 tick 數量（預設：`6000`，在 20 TPS 下相當於 5 分鐘）。設定為 `0` 可停用世界自動儲存。

### 區塊儲存設定

- **`type`**：使用的區塊儲存格式（預設：`"pump"`）：
  - `"pump"`：Pumpkin 原生最佳化的世界格式（`.pump`）。
  - `"anvil"`：標準 Minecraft Anvil 區域檔案格式（`.mca`）。
  - `"linear"`：Linear 區域儲存格式（`.linear`），採用快速壓縮演算法以減少磁碟佔用。
- **`compression.algorithm`**：Anvil 區塊資料使用的壓縮演算法（`"LZ4"`、`"ZLib"`、`"GZip"`、`"Custom"`，預設：`"LZ4"`）。
- **`compression.level`**：Anvil 區塊儲存的壓縮等級（預設：`6`）。

### 實體孤島設定

在 `[world.entity_islands]` 下設定平行孤島中處理實體 Tick 的安全邊際。較低的值允許更多實體平行執行 Tick，而較高的值則可在更廣泛的相互作用中保持嚴格的 Tick 順序：

- **`unaudited_reach`**：未經審計 Tick 的實體在其追蹤範圍之外可觸及的方塊距離（預設：`16.0`）。
- **`knockback_reach`**：來自未經審計實體的攻擊在單一 Tick 內可擊退受審計實體的方塊距離。對於 TNT 大炮等機械裝置，可調大此值（預設：`4.0`）。
