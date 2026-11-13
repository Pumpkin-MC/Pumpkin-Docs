# BungeeCord 转发

Pumpkin 原生支持 BungeeCord 和 Waterfall 代理网络，包括 **BungeeGuard** 身份验证令牌验证。

实现位于 [`crates/pumpkin/src/net/proxy/bungeecord.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/proxy/bungeecord.rs)。

---

## BungeeCord 转发的工作方式

与使用自定义登录通道的现代协议不同，BungeeCord 通过将客户端元数据直接编码到初始 `SHandshake` 数据包的 `server_address` 字段中来工作。

该字符串使用空字符（`\0`）作为分隔符：

```text
[original_host]\0[player_ip:port]\0[player_uuid]\0[properties_json]
```

1. **`original_host`**：玩家最初在客户端中输入的域名。
2. **`player_ip:port`**：客户端真实的 IP 地址和临时源端口。
3. **`player_uuid`**：玩家的 Mojang UUID（不带连字符的 32 个十六进制字符，或带连字符的 36 个字符）。
4. **`properties_json`**：包含皮肤纹理、披风纹理和 Mojang 加密签名的 JSON 数组。

---

## 安全风险：绕过代理

由于 BungeeCord 的握手字符串是未经验证的明文，攻击者可以直接连接到暴露的后端端口，注入任意 UUID 和管理员用户名，从而完全控制服务器。

传统上，这需要严格的 Linux 防火墙规则（`iptables` / `ufw`），将端口访问权限仅限制给代理 IP。

---

## BungeeGuard 防护

为了在不完全依赖网络防火墙的情况下杜绝绕过代理，Pumpkin 集成了 **BungeeGuard** 令牌验证：

1. BungeeCord 代理以 `bungeeguard-token` 为键，将共享密钥注入玩家的档案属性中。
2. 当 Pumpkin 在 `bungeecord_login` 中处理握手时：
   - 检查 `pumpkin.toml` 中是否配置了 `secret`。
   - 检查转发的属性中是否存在 `bungeeguard-token`。
   - 如果令牌匹配，Pumpkin 会从玩家档案中**移除该密钥属性**（使其他插件无法读取它），然后完成登录。
   - 如果令牌缺失或不正确，Pumpkin 会以 `BungeeCordError::MissingToken` 或 `BungeeCordError::InvalidToken` 拒绝连接。

```rust
// 位于 crates/pumpkin/src/net/proxy/bungeecord.rs
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

## 在 `pumpkin.toml` 中配置

启用带 BungeeGuard 的 BungeeCord 转发：

```toml
[networking.proxy]
enabled = true

[networking.proxy.bungeecord]
enabled = true
# 可选：配置 BungeeGuard 共享密钥以阻止直接连接
secret = "YOUR_BUNGEEGUARD_SECRET_HERE"
```
