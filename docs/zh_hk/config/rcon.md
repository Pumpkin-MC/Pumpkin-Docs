# 管理伺服器 (MSMP) / RCON

> [!WARNING]
> 傳統的 RCON（`[networking.rcon]`）已被 `[networking.management]` 下的 [Minecraft 伺服器管理通訊協定 (MSMP)](./management) 所取代。

## 設定

:::code-group

```toml [pumpkin.toml]
[networking.management]
enabled = false
address = "127.0.0.1:25585"
secret = ""
allowed_origins = []
status_heartbeat_interval = 0
```

:::

### 管理伺服器設定

- **`enabled`**：啟用 Minecraft 伺服器管理通訊協定 (MSMP) WebSocket 服務的總開關（預設：`false`）。
- **`address`**：管理伺服器接聽 WebSocket 連線的 IP 地址和連接埠（預設：`"127.0.0.1:25585"`）。
- **`secret`**：用於驗證管理客戶端身份的 40 字符英數字元密鑰。若在啟動時留空（`""`），系統將自動生成隨機的 40 字符密鑰。
- **`allowed_origins`**：允許透過網頁瀏覽器連線的來源清單，透過 `Origin` HTTP 標頭進行驗證（預設：`[]`）。
- **`status_heartbeat_interval`**：自動廣播伺服器狀態心跳的時間間隔（秒）（`0` 表示停用心跳廣播，預設：`0`）。
