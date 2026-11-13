# 日誌

Pumpkin 在 `pumpkin.toml` 中提供可自訂的日誌選項。

## 設定

:::code-group

```toml [pumpkin.toml]
[logging]
enabled = true
level = "info"
threads = false
thread_ids = false
target = false
color = true
timestamp = true
timestamp_format = "[hour]:[minute]:[second]"
file = "latest.log"
```

:::

### 設定選項

- **`enabled`**：啟用或停用伺服器日誌的總開關（預設：`true`）。
- **`level`**：控制台和檔案輸出的最低日誌級別。可用級別為 `"trace"`、`"debug"`、`"info"`、`"warn"`、`"error"` 和 `"off"`（預設：`"info"`）。也可透過 `RUST_LOG` 環境變量覆蓋。
- **`threads`**：是否在日誌訊息中包含線程名稱（預設：`false`）。
- **`thread_ids`**：是否在日誌訊息中包含數字線程 ID（預設：`false`）。
- **`target`**：是否在日誌條目中包含模組和元件目標（預設：`false`）。
- **`color`**：是否在控制台中啟用 ANSI 彩色日誌輸出（預設：`true`）。
- **`timestamp`**：是否在日誌條目中包含時間戳（預設：`true`）。
- **`timestamp_format`**：使用 `time` 格式描述語法的時間戳格式字符串（預設：`"[hour]:[minute]:[second]"`）。
- **`file`**：寫入日誌輸出的檔案路徑（預設：`"latest.log"`）。
