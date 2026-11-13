# 代理

Pumpkin 支援用於伺服器網絡部署的代理協定。Velocity、BungeeCord 和 Vine 支援在 `pumpkin.toml` 的 `[networking.proxy]` 下設定。

## 設定

:::code-group

```toml [pumpkin.toml]
[networking.proxy]
enabled = false

[networking.proxy.velocity]
enabled = false
secret = ""

[networking.proxy.bungeecord]
enabled = false
secret = ""

[networking.proxy.vine]
enabled = false
public_key = ""
secret = ""
```

:::

### 設定選項

- **`[networking.proxy].enabled`**：啟用代理支援的總開關。
- **`[networking.proxy.velocity].enabled`**：啟用 Velocity 現代轉發協定。
- **`[networking.proxy.velocity].secret`**：與 Velocity 代理設定相匹配的轉發金鑰。
- **`[networking.proxy.bungeecord].enabled`**：啟用 BungeeCord 玩家資訊轉發協定。
- **`[networking.proxy.bungeecord].secret`**：透過 BungeeGuard（`bungeeguard-token`）驗證來自 BungeeCord 代理連線的可選共享金鑰。設定後，傳入連線必須提供此權杖，從而防止玩家繞過代理直接連線。
- **`[networking.proxy.vine].enabled`**：啟用帶有 Ed25519 身份驗證與重播保護的 Vine 現代代理整合。
- **`[networking.proxy.vine].public_key`**：用於驗證轉發玩家身份的 Vine 代理 Ed25519 公鑰（64 個十六進制字符）。
- **`[networking.proxy.vine].secret`**：可選的共享密鑰字符串。若提供此項且 `public_key` 為空，公鑰將自動由此密鑰衍生。
