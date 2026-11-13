# Java 版身分驗證

身分驗證會驗證連線到 Pumpkin 的玩家身分，以防止使用者名稱欺騙和帳號冒充。

Pumpkin 在 [`pumpkin-auth`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-auth) crate 中處理身分驗證，並在 `crates/pumpkin/src/net/java/login/` 中的 `Login` 狀態期間協調該過程。

---

## 身分驗證為何重要

離線（未經驗證的）帳號嚴格根據其離線使用者名稱字串生成玩家 UUID（`UUID::new_v3(...)`）。如果不進行驗證，任何使用者都可以使用管理員或操作員的使用者名稱加入，並獲得特權存取權限。

線上上模式下（`pumpkin.toml` 中的 `online_mode = true`），Pumpkin 會透過 Mojang 的會話伺服器進行加密驗證，確認連線的用戶端擁有其請求的帳號。

---

## Yggdrasil 身分驗證的工作原理

用戶端、Pumpkin 和 Mojang 的 Yggdrasil 伺服器之間的身分驗證交換遵循以下步驟：

1. **發起**：用戶端傳送 `SLoginStart`，宣告其希望使用的使用者名稱和可選的離線 UUID。
2. **金鑰交換**：Pumpkin 以 `CEncryptionBegin` 回覆，提供隨機的 4 位元組驗證令牌、伺服器 ID 字串和 Pumpkin 的 1024 位 RSA 公鑰。
3. **加入會話**：用戶端生成隨機的 16 位元組共享金鑰（`AES-128`），計算 SHA-1 伺服器雜湊，並使用其經過身分驗證的 Microsoft 存取令牌呼叫 Mojang 的會話伺服器（`POST /session/minecraft/join`）。
4. **驗證**：用戶端傳送 `SEncryptionResponse`，其中包含經 RSA 加密的共享金鑰和加密後的驗證令牌。Pumpkin 使用其 RSA 私鑰解密令牌，重新計算 SHA-1 摘要，並查詢 Mojang（`GET /session/minecraft/hasJoined`）。
5. **獲取檔案**：Mojang 驗證用戶端和伺服器雜湊是否匹配，然後返回經過身分驗證的玩家 UUID、使用者名稱以及帶簽名的皮膚/披風紋理屬性（`GameProfile`）。
6. **啟用加密**：Pumpkin 啟用全流對稱加密（`AES-128/CFB8`），並透過傳送 `CLoginSuccess` 完成登入序列。

---

## 遊戲檔案結構

當 Mojang 的 `hasJoined` 端點驗證會話後，會返回一個 `GameProfile`，其中包含玩家經過身分驗證的 UUID、使用者名稱和帶簽名的紋理屬性：

```rust
pub struct GameProfile {
    pub id: Uuid,
    pub name: String,
    pub properties: Vec<Property>,
    pub profile_actions: Option<Vec<ProfileAction>>,
}

pub struct Property {
    pub name: String,
    pub value: String, // Base64 編碼的紋理資料
    pub signature: Option<String>, // 用於驗證真實性的加密簽名
}
```

Pumpkin 會驗證皮膚和披風簽名是否使用 Mojang 的公鑰進行了加密簽名，以防止用戶端注入惡意負載或未經授權的紋理。

---

## 自訂身分驗證端點

對於執行自訂 Yggdrasil 相容身分驗證伺服器的私有網路或企業環境，可以在 `pumpkin.toml` 中自訂端點：

```toml
[networking.java.authentication]
enabled = true
fallbacks = []
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
```

---

## 代理身分驗證轉發

當 Pumpkin 在代理後執行時，用戶端連線會終止於代理。Pumpkin 支援三種主要的代理轉發標準：

- **Velocity 現代轉發**：驗證透過 HMAC-SHA256 金鑰令牌轉發的玩家資料（`[networking.proxy.velocity]`）。
- **BungeeGuard**：針對 BungeeCord 設定的基於令牌的身分驗證標頭驗證。
- **舊版 BungeeCord**：透過握手轉發，將 IP、UUID 和屬性附加到伺服器主機字串中。
