# 基岩版與 NetherNet

Pumpkin 原生支援 Minecraft 基岩版用戶端，包括 NetherNet WebRTC/ICE 傳輸層以及使用者名稱自訂。

## 設定

:::code-group

```toml [pumpkin.toml]
[networking.bedrock]
enabled = true
online_mode = true
max_players = 1000
view_distance = 16
simulation_distance = 10
motd = "A blazingly fast Pumpkin server!"
username_prefix = ""
replace_username_spaces = true
chunk_caching = true

[networking.bedrock.nethernet]
enabled = true
address = "0.0.0.0:19132"
identity_key = "nethernet-key.der"
stun_servers = []
```

:::

### 基岩版選項

- **`enabled`**：是否接受來自基岩版用戶端的連線（預設：`true`）。
- **`online_mode`**：是否對基岩版玩家強制執行 Xbox Live 身分驗證（預設：`true`）。
- **`max_players`**：基岩版最大併發玩家數量（設定為 `0` 表示不限制，預設：`1000`）。
- **`view_distance`**：傳送給基岩版用戶端的最大區塊視距（預設：`16`）。
- **`simulation_distance`**：基岩版玩家的最大 tick 模擬距離（預設：`10`）。
- **`motd`**：在基岩版伺服器列表中顯示的每日訊息（MOTD）。
- **`username_prefix`**：新增到基岩版玩家代號（Gamertag）前面的可選字首（例如 `"."` 或 `"*"`），防止在跨平臺連線伺服器中與 Java 版帳號發生名稱衝突（預設：`""`）。
- **`replace_username_spaces`**：是否自動將基岩版玩家代號中的空格替換為下劃線 `_`，以確保在 Minecraft 斜槓指令中可以正常引用玩家名稱（預設：`true`）。
- **`chunk_caching`**：是否啟用用戶端區塊 Blob 快取以節省網路頻寬（預設：`true`）。

### NetherNet 傳輸設定

NetherNet 是 Minecraft 基岩版的現代 WebRTC/ICE 網路傳輸協定：

- **`enabled`**：是否允許用戶端使用 NetherNet 連線（預設：`true`）。
- **`address`**：用於 TCP 信令和 UDP ICE 多路複用的網路通訊端位址（預設：`"0.0.0.0:19132"`）。
- **`external_ip`**：當伺服器託管在 NAT 之後時對外通告的可選公網 IP 位址。
- **`identity_key`**：PKCS#8 P-384 身分私鑰檔案的路徑，在重啟時保留該檔案以實現用戶端的首次信任（TOFU）驗證（預設：`"nethernet-key.der"`）。
- **`stun_servers`**：用於 ICE NAT 穿透的 STUN 伺服器 URL 可選列表。
