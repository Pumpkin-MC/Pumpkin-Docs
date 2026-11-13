# Velocity 现代转发

[Velocity](https://papermc.io/software/velocity) 是 PaperMC 创建的高性能代理。它在 `Login` 状态期间使用现代插件消息，通过 **HMAC-SHA256** 消息身份验证码安全地传输玩家数据。

Pumpkin 在 [`crates/pumpkin/src/net/proxy/velocity.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/proxy/velocity.rs) 中实现了 Velocity 现代转发。

---

## Velocity 转发的工作方式

与将未经验证的数据注入握手字符串的 BungeeCord 不同，Velocity 在**登录**状态期间通过专用插件通道工作：

1. **握手与登录**：玩家通过 Velocity 进行身份验证。Velocity 发起与 Pumpkin 的标准 TCP 连接，并传输 `SHandshake` 和 `SLoginStart`。
2. **通道查询**：识别到 Velocity 现代转发已启用后，Pumpkin 暂停登录序列，并在 `velocity:player_info` 通道上分发 `CLoginPluginRequest`。
3. **生成负载**：Velocity 打包玩家的远程地址、UUID、用户名和皮肤纹理，并使用共享密钥计算此负载的 32 字节 HMAC-SHA256 签名。
4. **签名验证**：Velocity 发送 `SLoginPluginResponse`。Pumpkin 根据配置的密钥验证 HMAC-SHA256 摘要。如果有效，Pumpkin 会覆盖连接的网络地址和 GameProfile，并转换到 `Config` / `Play`。

---

## 线路负载结构

`SLoginPluginResponse` 中的负载结构如下：

```text
┌─────────────────────────────────────────────────────────────┐
│ 32 字节 HMAC-SHA256 签名                                    │
├─────────────────────────────────────────────────────────────┤
│ 转发协议版本（VarInt：1 - 4）                               │
├─────────────────────────────────────────────────────────────┤
│ 客户端远程 IP 地址（String / IPv4 / IPv6）                  │
├─────────────────────────────────────────────────────────────┤
│ 玩家 UUID（128 位 / UUID）                                  │
├─────────────────────────────────────────────────────────────┤
│ 玩家用户名（String）                                        │
├─────────────────────────────────────────────────────────────┤
│ 档案属性数量（VarInt）                                      │
│  ├─ 属性名称（String）                                      │
│  ├─ 属性值（String）                                        │
│  └─ 可选签名（String）                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Pumpkin 中的加密验证

位于 `crates/pumpkin/src/net/proxy/velocity.rs`：

```rust
use hmac::{Hmac, KeyInit, Mac};
use sha2::Sha256;

type HmacSha256 = Hmac<Sha256>;

// 提取签名和负载
let (signature, data_to_verify) = data.split_at(32);

// 使用 pumpkin.toml 中的密钥初始化 HMAC
let mut mac = HmacSha256::new_from_slice(secret.as_bytes())
    .map_err(|_| VelocityError::FailedVerifyIntegrity)?;

mac.update(data_to_verify);

// 常数时间验证可防止计时攻击
mac.verify_slice(signature)
    .map_err(|_| VelocityError::FailedVerifyIntegrity)?;
```

如果签名不匹配（例如攻击者不知道密钥并试图直接连接后端），Pumpkin 会立即断开连接。

---

## 在 `pumpkin.toml` 中配置

1. 打开 Velocity 代理上的 `velocity.toml` 并设置：
   ```toml
   player-info-forwarding-mode = "modern"
   forwarding-secret-file = "forwarding.secret"
   ```
2. 将 `forwarding.secret` 中生成的密钥字符串复制到 `pumpkin.toml`：
   ```toml
   [networking.proxy]
   enabled = true

   [networking.proxy.velocity]
   enabled = true
   secret = "YOUR_VELOCITY_FORWARDING_SECRET_HERE"
   ```
