# 世界

Pumpkin 允許在 `pumpkin.toml` 的 `[world]` 設定項下微調世界儲存格式、自動儲存間隔以及光照模式。

## 設定

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

### 世界設定

- **`lighting`**：光照引擎傳播計算模式。
  - `"default"`：標準原版 Minecraft 光照傳播。
  - `"full"`：全圖最大天光，無陰影。
  - `"dark"`：全圖完全黑暗（零光照）。
- **`autosave_ticks`**：世界自動儲存之間的伺服器 tick 數量（預設：`6000`，在 20 TPS 下相當於 5 分鐘）。設定為 `0` 可停用世界自動儲存。

### 區塊儲存設定

- **`type`**：使用的區塊儲存格式：
  - `"anvil"`：標準 Minecraft Anvil 區域檔案格式（`.mca`）。
  - `"linear"`：Linear 區域儲存格式，採用快速壓縮演算法以減少磁碟佔用。
  - `"pump"`：Pumpkin 原生最佳化的世界格式。
- **`write_in_place`**：是否在現有區域檔案內就地重寫區塊，而不是重新分配空閒區塊（預設：`false`）。
- **`compression.algorithm`**：區塊資料使用的壓縮演算法（`"LZ4"`、`"ZLib"`、`"GZip"`、`"Custom"`）。
- **`compression.level`**：區塊儲存的壓縮等級（預設：`6`）。
