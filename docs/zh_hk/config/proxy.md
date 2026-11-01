# 代理

Pumpkin 支援用於伺服器網絡部署的代理協定。Velocity 和 BungeeCord 支援在 `pumpkin.toml` 的 `[networking.proxy]` 下設定。

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
```

:::

### 設定選項

- **`[networking.proxy].enabled`**：啟用代理支援的總開關。
- **`[networking.proxy.velocity].enabled`**：啟用 Velocity 現代轉發協定。
- **`[networking.proxy.velocity].secret`**：與 Velocity 代理設定相匹配的轉發金鑰。
- **`[networking.proxy.bungeecord].enabled`**：啟用 BungeeCord 玩家資訊轉發協定。
- **`[networking.proxy.bungeecord].secret`**：透過 BungeeGuard（`bungeeguard-token`）驗證來自 BungeeCord 代理連線的可選共享金鑰。設定後，傳入連線必須提供此令牌，從而防止玩家繞過代理直接連線。
