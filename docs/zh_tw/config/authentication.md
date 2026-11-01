# 身分驗證

Pumpkin 透過 Mojang 的會話伺服器驗證帳號，以確保玩家使用合法帳號。身分驗證設定位於 `pumpkin.toml` 的 `[networking.java.authentication]` 和 `[networking.bedrock.authentication]` 下。

## Java 版身分驗證

:::code-group

```toml [pumpkin.toml]
[networking.java.authentication]
enabled = true
fallbacks = []
profile_by_name_fallbacks = []
profile_by_uuid_fallbacks = []
connect_timeout = 5000
read_timeout = 5000
prevent_proxy_connections = false

[networking.java.authentication.player_profile]
allow_banned_players = false
allowed_actions = ["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]

[networking.java.authentication.textures]
enabled = true
allowed_url_schemes = ["http", "https"]
allowed_url_domains = [".minecraft.net", ".mojang.com"]

[networking.java.authentication.textures.types]
skin = true
cape = true
elytra = true
```

:::

### 設定選項

- **`enabled`**：為 Java 版用戶端啟用線上身分驗證（預設：`true`）。
- **`url`**：（可選）用於驗證加入請求的自訂身分驗證 URL（例如 Drasl 等自訂身分驗證伺服器）。支援 `{username}` 和 `{server_hash}` 引數。
- **`fallbacks`**：主要/官方會話伺服器無法存取時要聯絡的備用身分驗證 URL 列表。
- **`profile_by_name_url`**：（可選）用於透過使用者名稱獲取玩家檔案的自訂 URL 模板（`{username}`）。
- **`profile_by_name_fallbacks`**：透過使用者名稱查詢玩家檔案時使用的備用 URL。
- **`profile_by_uuid_url`**：（可選）用於透過 UUID 獲取玩家檔案的自訂 URL 模板（`{uuid}`）。
- **`profile_by_uuid_fallbacks`**：透過 UUID 查詢玩家檔案時使用的備用 URL。
- **`connect_timeout`**：聯絡身分驗證伺服器時的連線超時時間，單位為毫秒（預設：`5000`）。
- **`read_timeout`**：聯絡身分驗證伺服器時的讀取超時時間，單位為毫秒（預設：`5000`）。
- **`prevent_proxy_connections`**：在 Mojang 身分驗證期間，是否阻止來自代理或 VPN 的連線（預設：`false`）。
- **`prevent_proxy_connection_auth_url`**：（可選）啟用代理連線阻止時專門使用的自訂身分驗證端點。
- **`services_url`**：（可選）Minecraft 公共服務 URL（用於玩家證書和金鑰）。

### 玩家檔案設定

- **`allow_banned_players`**：是否允許被 Mojang 標記或封禁的玩家連線（預設：`false`）。
- **`allowed_actions`**：被標記的玩家連線時允許的檔案操作（例如 `["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]`）。

### 紋理設定

- **`enabled`**：啟用玩家皮膚、披風和鞘翅紋理的獲取與驗證（預設：`true`）。
- **`allowed_url_schemes`**：下載紋理時允許的 URL 方案（預設：`["http", "https"]`）。
- **`allowed_url_domains`**：下載紋理時允許的域名（預設：`[".minecraft.net", ".mojang.com"]`）。
- **`types.skin`**：啟用自訂玩家皮膚（預設：`true`）。
- **`types.cape`**：啟用玩家披風（預設：`true`）。
- **`types.elytra`**：啟用玩家鞘翅紋理（預設：`true`）。

## 基岩版身分驗證

:::code-group

```toml [pumpkin.toml]
[networking.bedrock.authentication]
enabled = true
connect_timeout = 5000
read_timeout = 5000
```

:::

### 設定選項

- **`enabled`**：基岩版用戶端是否必須進行 Xbox Live 身分驗證（預設：`true`）。
- **`url`**：（可選）自訂身分驗證或發現端點 URL。
- **`connect_timeout`**：連線超時時間，單位為毫秒（預設：`5000`）。
- **`read_timeout`**：讀取超時時間，單位為毫秒（預設：`5000`）。
