# 代理轉發概述

在多伺服器 Minecraft 網絡中，玩家透過面向玩家的反向代理（例如 Velocity、BungeeCord 或 Vine）連線，由代理在大廳和子伺服器之間路由連線，無需玩家重新連線。

由於後端伺服器接收到的 TCP 連線直接來自代理機器而非玩家，因此必須將玩家真實的 **IP 位址**、**UUID**、**用戶名稱**和**皮膚屬性**告知伺服器。

Pumpkin 在 [`crates/pumpkin/src/net/proxy/`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/net/proxy) 中原生支援全部三種主要代理轉發協定。

---

## 代理轉發問題

如果沒有安全的代理轉發：
1. **IP 丟失**：每個已連線玩家顯示的都會是代理的迴環或內部 IP（導致 IP 封禁和地理位置功能失效）。
2. **UUID 欺騙與繞過**：惡意用戶可以使用任意偽造的用戶名稱或管理員身份，直接連線到後端伺服器端口。

為防止繞過代理，Pumpkin 會驗證代理傳送的加密金鑰、令牌或數字簽名。

---

## 支援的協定對比

| 協定 | 協定傳輸方式 | 安全性 / 加密技術 | 重放保護 | Crate 模組 |
| :--- | :--- | :--- | :--- | :--- |
| **[BungeeCord](/zh_hk/developer/networking/proxy/bungeecord)** | `SHandshake` 伺服器位址字符串 | 檔案屬性中的可選令牌（`bungeeguard-token`） | 無 | `pumpkin::net::proxy::bungeecord` |
| **[Velocity](/zh_hk/developer/networking/proxy/velocity)** | 登入插件訊息（`velocity:player_info`） | 對稱 HMAC-SHA256 簽名 | 無 | `pumpkin::net::proxy::velocity` |
| **[Vine](/zh_hk/developer/networking/proxy/vine)** | 登入插件訊息（`vine:player_info`） | 非對稱 **Ed25519** 數字簽名 | 16 位元組隨機數挑戰 + 30 秒時間戳窗口 | `pumpkin::net::proxy::vine` |

---

## 生命週期架構

1. **玩家身份驗證**：玩家連線到代理（BungeeCord、Velocity 或 Vine），並透過 Mojang 的會話伺服器進行身份驗證。
2. **後端連線**：代理透過 TCP 連線到 Pumpkin，並發送 `SHandshake`。
3. **資料轉發**：
   - **BungeeCord 模式**：代理將玩家的遠端 IP、UUID 和屬性直接注入 `SHandshake` 主機名字符串（以空位元組 `\0` 分隔）。
   - **現代模式（Velocity / Vine）**：Pumpkin 在專用通道（`velocity:player_info` 或 `vine:player_info`）上傳送 `CLoginPluginRequest`。代理使用 HMAC-SHA256（Velocity）或 Ed25519（Vine）為玩家檔案簽名，並以 `SLoginPluginResponse` 回覆。
4. **驗證與會話初始化**：Pumpkin 驗證簽名，將真實 IP 和 GameProfile 綁定到 `JavaClient`，並發送 `CLoginSuccess`。

---

## 代理文件

- **[BungeeCord](/zh_hk/developer/networking/proxy/bungeecord)**：舊版主機字符串注入和可選的 BungeeGuard 令牌驗證。
- **[Velocity 現代轉發](/zh_hk/developer/networking/proxy/velocity)**：在登入狀態下使用 HMAC-SHA256 簽名的玩家資訊。
- **[Vine 現代轉發](/zh_hk/developer/networking/proxy/vine)**：採用 Ed25519 簽名和重放攻擊防護的下一代代理轉發。
