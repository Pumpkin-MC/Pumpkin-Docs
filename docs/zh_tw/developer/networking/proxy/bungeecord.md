# BungeeCord 轉發

Pumpkin 原生支援 BungeeCord 和 Waterfall 代理網路，包括 **BungeeGuard** 身分驗證令牌驗證。

實現位於 [`crates/pumpkin/src/net/proxy/bungeecord.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/proxy/bungeecord.rs)。

---

## BungeeCord 轉發的工作方式

與使用自訂登入通道的現代協定不同，BungeeCord 透過將用戶端元資料直接編碼到初始 `SHandshake` 封包的 `server_address` 欄位中來工作。

該字串使用空字元（`\0`）作為分隔符：

```text
[original_host]\0[player_ip:port]\0[player_uuid]\0[properties_json]
```

1. **`original_host`**：玩家最初在用戶端中輸入的域名。
2. **`player_ip:port`**：用戶端真實的 IP 位址和臨時源埠。
3. **`player_uuid`**：玩家的 Mojang UUID（不帶連字元的 32 個十六進位制字元，或帶連字元的 36 個字元）。
4. **`properties_json`**：包含皮膚紋理、披風紋理和 Mojang 加密簽名的 JSON 陣列。

---

## 安全風險：繞過代理

由於 BungeeCord 的握手字串是未經驗證的明文，攻擊者可以直接連線到暴露的後端埠，注入任意 UUID 和管理員使用者名稱，從而完全控制伺服器。

傳統上，這需要嚴格的 Linux 防火牆規則（`iptables` / `ufw`），將埠存取權限僅限制給代理 IP。

---

## BungeeGuard 防護

為了在不完全依賴網路防火牆的情況下杜絕繞過代理，Pumpkin 集成了 **BungeeGuard** 令牌驗證：

1. BungeeCord 代理以 `bungeeguard-token` 為鍵，將共享金鑰注入玩家的檔案屬性中。
2. 當 Pumpkin 在 `bungeecord_login` 中處理握手時：
   - 檢查 `pumpkin.toml` 中是否設定了 `secret`。
   - 檢查轉發的屬性中是否存在 `bungeeguard-token`。
   - 如果令牌匹配，Pumpkin 會從玩家檔案中**移除該金鑰屬性**（使其他插件無法讀取它），然後完成登入。
   - 如果令牌缺失或不正確，Pumpkin 會以 `BungeeCordError::MissingToken` 或 `BungeeCordError::InvalidToken` 拒絕連線。

```rust
// 位於 crates/pumpkin/src/net/proxy/bungeecord.rs
if !secret.is_empty() {
    let Some(token_index) = properties.iter().position(|p| p.name == BUNGEEGUARD_TOKEN_PROPERTY) else {
        return Err(BungeeCordError::MissingToken);
    };

    if properties[token_index].value != secret {
        return Err(BungeeCordError::InvalidToken);
    }
    properties.remove(token_index);
}
```

---

## 在 `pumpkin.toml` 中設定

啟用帶 BungeeGuard 的 BungeeCord 轉發：

```toml
[networking.proxy]
enabled = true

[networking.proxy.bungeecord]
enabled = true
# 可選：設定 BungeeGuard 共享金鑰以阻止直接連線
secret = "YOUR_BUNGEEGUARD_SECRET_HERE"
```
