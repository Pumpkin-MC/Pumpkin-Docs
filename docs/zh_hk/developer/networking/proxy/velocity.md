# Velocity 現代轉發

[Velocity](https://papermc.io/software/velocity) 是 PaperMC 建立的高效能代理。它在 `Login` 狀態期間使用現代插件訊息，透過 **HMAC-SHA256** 訊息身份驗證碼安全地傳輸玩家資料。

Pumpkin 在 [`crates/pumpkin/src/net/proxy/velocity.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/proxy/velocity.rs) 中實現了 Velocity 現代轉發。

---

## Velocity 轉發的工作方式

與將未經驗證的資料注入握手字符串的 BungeeCord 不同，Velocity 在**登入**狀態期間透過專用插件通道工作：

1. **握手與登入**：玩家透過 Velocity 進行身份驗證。Velocity 發起與 Pumpkin 的標準 TCP 連線，並傳輸 `SHandshake` 和 `SLoginStart`。
2. **通道查詢**：識別到 Velocity 現代轉發已啟用後，Pumpkin 暫停登入序列，並在 `velocity:player_info` 通道上分發 `CLoginPluginRequest`。
3. **生成負載**：Velocity 打包玩家的遠端位址、UUID、用戶名稱和皮膚紋理，並使用共享金鑰計算此負載的 32 位元組 HMAC-SHA256 簽名。
4. **簽名驗證**：Velocity 傳送 `SLoginPluginResponse`。Pumpkin 根據設定的金鑰驗證 HMAC-SHA256 摘要。如果有效，Pumpkin 會覆蓋連線的網絡位址和 GameProfile，並轉換到 `Config` / `Play`。

---

## 線路負載結構

`SLoginPluginResponse` 中的負載結構如下：

```text
┌─────────────────────────────────────────────────────────────┐
│ 32 位元組 HMAC-SHA256 簽名                                    │
├─────────────────────────────────────────────────────────────┤
│ 轉發協定版本（VarInt：1 - 4）                               │
├─────────────────────────────────────────────────────────────┤
│ 用戶端遠端 IP 位址（String / IPv4 / IPv6）                  │
├─────────────────────────────────────────────────────────────┤
│ 玩家 UUID（128 位 / UUID）                                  │
├─────────────────────────────────────────────────────────────┤
│ 玩家使用者名稱（String）                                        │
├─────────────────────────────────────────────────────────────┤
│ 檔案屬性數量（VarInt）                                      │
│  ├─ 屬性名稱（String）                                      │
│  ├─ 屬性值（String）                                        │
│  └─ 可選簽名（String）                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Pumpkin 中的加密驗證

位於 `crates/pumpkin/src/net/proxy/velocity.rs`：

```rust
use hmac::{Hmac, KeyInit, Mac};
use sha2::Sha256;

type HmacSha256 = Hmac<Sha256>;

// 提取簽名和負載
let (signature, data_to_verify) = data.split_at(32);

// 使用 pumpkin.toml 中的金鑰初始化 HMAC
let mut mac = HmacSha256::new_from_slice(secret.as_bytes())
    .map_err(|_| VelocityError::FailedVerifyIntegrity)?;

mac.update(data_to_verify);

// 常數時間驗證可防止計時攻擊
mac.verify_slice(signature)
    .map_err(|_| VelocityError::FailedVerifyIntegrity)?;
```

如果簽名不匹配（例如攻擊者不知道金鑰並試圖直接連線後端），Pumpkin 會立即斷開連線。

---

## 在 `pumpkin.toml` 中設定

1. 開啟 Velocity 代理上的 `velocity.toml` 並設定：
   ```toml
   player-info-forwarding-mode = "modern"
   forwarding-secret-file = "forwarding.secret"
   ```
2. 將 `forwarding.secret` 中生成的金鑰字符串複製到 `pumpkin.toml`：
   ```toml
   [networking.proxy]
   enabled = true

   [networking.proxy.velocity]
   enabled = true
   secret = "YOUR_VELOCITY_FORWARDING_SECRET_HERE"
   ```
