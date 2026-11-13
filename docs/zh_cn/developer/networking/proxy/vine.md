# Vine 现代转发

**Vine** 是使用 Rust 编写的下一代高性能 Minecraft 代理。Vine 专为超低延迟、多线程和企业级安全而设计，引入了基于 **Ed25519 非对称签名**和**重放攻击防护**的现代加密转发。

Pumpkin 在 [`crates/pumpkin/src/net/proxy/vine.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/proxy/vine.rs) 中原生支持 Vine 转发。

---

## 为什么使用 Vine 转发？

尽管 Velocity 的 HMAC-SHA256 转发相比旧版 BungeeCord 有所改进，但它依赖于**对称共享密钥**。如果网络中的一台后端服务器遭到入侵，攻击者就会获得共享密钥，并能在整个服务器集群中伪造经过身份验证的玩家登录。

Vine 通过以下方式解决此问题：
1. **非对称公钥加密（Ed25519）**：代理使用其私钥为玩家数据签名。后端服务器只存储代理的**公钥**（`public_key`）。即使一台后端服务器遭到入侵，攻击者也无法向其他服务器伪造身份。
2. **重放攻击防护（16 字节随机数挑战）**：Pumpkin 为每个连接生成一个加密安全的随机 16 字节 nonce。代理必须对此 nonce 签名并将其返回，因此无法重放捕获的登录数据包。
3. **时间戳偏差窗口**：传输的 Unix 时间戳必须在后端系统时钟的 ±30 秒范围内（`MAX_TIMESTAMP_DRIFT_SECS = 30`）。

---

## 握手序列

1. **连接**：玩家连接 Vine 并进行身份验证。Vine 打开与 Pumpkin 的后端连接，并发送 `SHandshake` 和 `SLoginStart`。
2. **挑战查询**：Pumpkin 生成一个加密安全的随机 16 字节 nonce，并在 `vine:player_info` 通道上发送 `CLoginPluginRequest`。
3. **非对称签名**：Vine 序列化版本、时间戳、返回的 16 字节 nonce、客户端 IP 地址和玩家 GameProfile，然后使用其 Ed25519 私钥为此字节流签名。
4. **三重验证**：Vine 以 `SLoginPluginResponse` 回复。Pumpkin 验证：
   - **时钟偏差**：嵌入的时间戳在 UTC 时间的 ±30 秒范围内。
   - **随机数检查**：签名的 nonce 与第 2 步生成的 16 字节挑战完全匹配。
   - **Ed25519 签名**：签名根据配置的 `public_key` 通过加密验证。
5. **会话成功**：如果三项检查全部通过，Pumpkin 应用经过验证的身份并发出 `CLoginSuccess`。

---

## 线路负载结构

`SLoginPluginResponse` 的数据布局：

```text
┌─────────────────────────────────────────────────────────────┐
│ 64 字节 Ed25519 数字签名                                    │
├─────────────────────────────────────────────────────────────┤
│ 转发协议版本（i32：1）                                      │
├─────────────────────────────────────────────────────────────┤
│ Unix 时间戳，单位为秒（i64）                                │
├─────────────────────────────────────────────────────────────┤
│ 16 字节挑战 nonce                                           │
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

## 在 Pumpkin 中验证

位于 `crates/pumpkin/src/net/proxy/vine.rs`：

```rust
use ed25519_dalek::{Signature, Verifier, VerifyingKey};

// 1. 验证负载长度（64 字节签名 + 至少 25 字节标头）
if data.len() < 89 {
    return Err(VineError::DataTooShort);
}

// 2. 提取签名和已签名负载
let (sig_bytes, signed_data) = data.split_at(64);
let signature = Signature::from_slice(sig_bytes)
    .map_err(|_| VineError::InvalidSignature)?;

// 3. 验证时间戳偏差（最大允许偏差为 30 秒）
let skew = (server_now - timestamp).abs();
if skew > MAX_TIMESTAMP_DRIFT_SECS {
    return Err(VineError::TimestampExpired(skew, MAX_TIMESTAMP_DRIFT_SECS));
}

// 4. 验证挑战 nonce 是否与连接状态匹配
if received_nonce != expected_nonce {
    return Err(VineError::ChallengeMismatch);
}

// 5. 使用代理的公钥验证 Ed25519 签名
verifying_key.verify(signed_data, &signature)
    .map_err(|_| VineError::InvalidSignature)?;
```

---

## 在 `pumpkin.toml` 中配置

在 `pumpkin.toml` 中配置 Vine 转发：

```toml
[networking.proxy]
enabled = true

[networking.proxy.vine]
enabled = true
# Vine 代理的 64 字符十六进制编码 Ed25519 公钥
public_key = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"

# 或者，如果提供了 secret，则会自动派生公钥
secret = ""
```
