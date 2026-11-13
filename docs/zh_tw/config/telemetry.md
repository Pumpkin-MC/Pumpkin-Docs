# 遙測

Pumpkin 包含選用的匿名遙測功能以及可選擇加入的公開伺服器目錄。遙測相關設定項位於 `pumpkin.toml` 的 `[telemetry]` 下。

## 設定

:::code-group

```toml [pumpkin.toml]
[telemetry]
enabled = true
endpoint = "https://market.pumpkinmc.org/api/v1/rest/telemetry/heartbeat"
interval_secs = 300
public = false
# server_name = "My Pumpkin Server"
```

:::

### 設定選項

- **`enabled`**: 是否啟用匿名遙測（預設值：`true`）。
- **`endpoint`**: 遙測後端資料接收端點 URL（預設值：`"https://market.pumpkinmc.org/api/v1/rest/telemetry/heartbeat"`）。
- **`interval_secs`**: 活動訊號傳送時間間隔（秒）（預設值：`300` 秒 / 5 分鐘，最小值：`60` 秒）。
- **`public`**: 是否選擇加入並在社群公開伺服器目錄中展示此伺服器（預設值：`false`）。
- **`server_name`**: （選填）當 `public` 為 `true` 時在分析儀表板上顯示的公開伺服器名稱。
