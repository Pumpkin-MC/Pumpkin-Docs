# 代理

Pumpkin 支持用于服务器网络部署的代理协议。Velocity、BungeeCord 和 Vine 支持在 `pumpkin.toml` 的 `[networking.proxy]` 下配置。

## 配置

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

### 配置选项

- **`[networking.proxy].enabled`**：启用代理支持的总开关。
- **`[networking.proxy.velocity].enabled`**：启用 Velocity 现代转发协议。
- **`[networking.proxy.velocity].secret`**：与 Velocity 代理配置相匹配的转发密钥。
- **`[networking.proxy.bungeecord].enabled`**：启用 BungeeCord 玩家信息转发协议。
- **`[networking.proxy.bungeecord].secret`**：通过 BungeeGuard（`bungeeguard-token`）验证来自 BungeeCord 代理连接的可选共享密钥。设置后，传入连接必须提供此令牌，从而防止玩家绕过代理直接连接。
- **`[networking.proxy.vine].enabled`**：启用带有 Ed25519 身份验证和重放保护的 Vine 现代代理集成。
- **`[networking.proxy.vine].public_key`**：用于验证转发玩家身份的 Vine 代理 Ed25519 公钥（64 个十六进制字符）。
- **`[networking.proxy.vine].secret`**：可选共享密钥字符串。如果提供了此项且 `public_key` 为空，公钥将自动根据此密钥派生。
