# 身分驗證

## 為什麼需要身分驗證

離線帳號是指不聯絡授權或身分驗證伺服器、直接根據玩家使用者名稱生成的帳號，其暱稱可以任意選擇。在沒有額外插件的情況下，這意味著玩家可以冒充其他玩家，包括擁有管理員權限的玩家。

## 離線伺服器

預設情況下，設定中會啟用 `online_mode`（`[networking.java.online_mode]` / `[networking.bedrock.online_mode]`）。這會啟用身分驗證並停用離線帳號。如果希望允許離線帳號，可以在 `pumpkin.toml` 中停用 `online_mode`。

## Yggdrasil 身分驗證的工作原理

1. 用戶端從啟動器獲取身分驗證令牌和 UUID。
2. 用戶端在載入過程中，使用身分驗證令牌從授權/身分驗證伺服器獲取資料，例如各種簽名金鑰和被封禁伺服器的列表。
3. 用戶端加入伺服器時，會向授權/身分驗證伺服器傳送加入請求。如果帳號已被封禁，Mojang 伺服器可以拒絕此請求。
4. 用戶端透過封包向伺服器傳送其身分標識。
5. 伺服器根據此身分標識，向授權/身分驗證伺服器傳送 `hasJoined` 請求。請求成功後，伺服器會獲取玩家資訊，例如皮膚。

## 自訂身分驗證伺服器

Pumpkin 支援自訂身分驗證伺服器和回退伺服器，可在 `pumpkin.toml` 的 `[networking.java.authentication]` 下設定。

### Pumpkin 身分驗證的工作原理

1. **GET 請求：** Pumpkin 向指定的身分驗證 URL 傳送 GET 請求。
2. **狀態碼 200：** 如果身分驗證成功，伺服器會返回狀態碼 200。
3. **解析 JSON 遊戲檔案：** Pumpkin 解析回應中返回的 JSON 遊戲檔案。

### 遊戲檔案

```rust
struct GameProfile {
    id: UUID,
    name: String,
    properties: Vec<Property>,
    profile_actions: Option<Vec<ProfileAction>>, // 可選，僅在應用了操作時存在
}
```

#### 屬性

```rust
struct Property {
    name: String,
    value: String, // Base64 編碼
    signature: Option<String>, // 可選，Base64 編碼
}
```

#### 檔案操作

```rust
enum ProfileAction {
    FORCED_NAME_CHANGE,
    USING_BANNED_SKIN,
}
```
