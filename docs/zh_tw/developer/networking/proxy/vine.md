# Vine 現代轉發

**Vine** 是使用 Rust 編寫的下一代高效能 Minecraft 代理。Vine 專為超低延遲、多執行緒和企業級安全而設計，引入了基於 **Ed25519 非對稱簽名**和**重放攻擊防護**的現代加密轉發。

Pumpkin 在 [`crates/pumpkin/src/net/proxy/vine.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/proxy/vine.rs) 中原生支援 Vine 轉發。

---

## 為什麼使用 Vine 轉發？

儘管 Velocity 的 HMAC-SHA256 轉發相比舊版 BungeeCord 有所改進，但它依賴於**對稱共享金鑰**。如果網路中的一臺後端伺服器遭到入侵，攻擊者就會獲得共享金鑰，並能在整個伺服器叢集中偽造經過身分驗證的玩家登入。

Vine 透過以下方式解決此問題：
1. **非對稱公鑰加密（Ed25519）**：代理使用其私鑰為玩家資料簽名。後端伺服器只儲存代理的**公鑰**（`public_key`）。即使一臺後端伺服器遭到入侵，攻擊者也無法向其他伺服器偽造身分。
2. **重放攻擊防護（16 位元組隨機數挑戰）**：Pumpkin 為每個連線生成一個加密安全的隨機 16 位元組 nonce。代理必須對此 nonce 簽名並將其返回，因此無法重放捕獲的登入封包。
3. **時間戳偏差視窗**：傳輸的 Unix 時間戳必須在後端系統時鐘的 ±30 秒範圍內（`MAX_TIMESTAMP_DRIFT_SECS = 30`）。

---

## 握手序列

1. **連線**：玩家連線 Vine 並進行身分驗證。Vine 開啟與 Pumpkin 的後端連線，併發送 `SHandshake` 和 `SLoginStart`。
2. **挑戰查詢**：Pumpkin 生成一個加密安全的隨機 16 位元組 nonce，並在 `vine:player_info` 通道上傳送 `CLoginPluginRequest`。
3. **非對稱簽名**：Vine 序列化版本、時間戳、返回的 16 位元組 nonce、用戶端 IP 位址和玩家 GameProfile，然後使用其 Ed25519 私鑰為此位元組流簽名。
4. **三重驗證**：Vine 以 `SLoginPluginResponse` 回覆。Pumpkin 驗證：
   - **時鐘偏差**：嵌入的時間戳在 UTC 時間的 ±30 秒範圍內。
   - **隨機數檢查**：簽名的 nonce 與第 2 步生成的 16 位元組挑戰完全匹配。
   - **Ed25519 簽名**：簽名根據設定的 `public_key` 透過加密驗證。
5. **會話成功**：如果三項檢查全部透過，Pumpkin 應用經過驗證的身分併發出 `CLoginSuccess`。

---

## 線路負載結構

`SLoginPluginResponse` 的資料佈局：

```text
┌─────────────────────────────────────────────────────────────┐
│ 64 位元組 Ed25519 數字簽名                                    │
├─────────────────────────────────────────────────────────────┤
│ 轉發協定版本（i32：1）                                      │
├─────────────────────────────────────────────────────────────┤
│ Unix 時間戳，單位為秒（i64）                                │
├─────────────────────────────────────────────────────────────┤
│ 16 位元組挑戰 nonce                                           │
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

## 在 Pumpkin 中驗證

位於 `crates/pumpkin/src/net/proxy/vine.rs`：

```rust
use ed25519_dalek::{Signature, Verifier, VerifyingKey};

// 1. 驗證負載長度（64 位元組簽名 + 至少 25 位元組標頭）
if data.len() < 89 {
    return Err(VineError::DataTooShort);
}

// 2. 提取簽名和已簽名負載
let (sig_bytes, signed_data) = data.split_at(64);
let signature = Signature::from_slice(sig_bytes)
    .map_err(|_| VineError::InvalidSignature)?;

// 3. 驗證時間戳偏差（最大允許偏差為 30 秒）
let skew = (server_now - timestamp).abs();
if skew > MAX_TIMESTAMP_DRIFT_SECS {
    return Err(VineError::TimestampExpired(skew, MAX_TIMESTAMP_DRIFT_SECS));
}

// 4. 驗證挑戰 nonce 是否與連線狀態匹配
if received_nonce != expected_nonce {
    return Err(VineError::ChallengeMismatch);
}

// 5. 使用代理的公鑰驗證 Ed25519 簽名
verifying_key.verify(signed_data, &signature)
    .map_err(|_| VineError::InvalidSignature)?;
```

---

## 在 `pumpkin.toml` 中設定

在 `pumpkin.toml` 中設定 Vine 轉發：

```toml
[networking.proxy]
enabled = true

[networking.proxy.vine]
enabled = true
# Vine 代理的 64 字元十六進位制編碼 Ed25519 公鑰
public_key = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"

# 或者，如果提供了 secret，則會自動派生公鑰
secret = ""
```
