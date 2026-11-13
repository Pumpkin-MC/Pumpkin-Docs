# Java 版身份验证

身份验证会验证连接到 Pumpkin 的玩家身份，以防止用户名欺骗和账户冒充。

Pumpkin 在 [`pumpkin-auth`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-auth) crate 中处理身份验证，并在 `crates/pumpkin/src/net/java/login/` 中的 `Login` 状态期间协调该过程。

---

## 身份验证为何重要

离线（未经验证的）账户严格根据其离线用户名字符串生成玩家 UUID（`UUID::new_v3(...)`）。如果不进行验证，任何用户都可以使用管理员或操作员的用户名加入，并获得特权访问权限。

在在线模式下（`pumpkin.toml` 中的 `online_mode = true`），Pumpkin 会通过 Mojang 的会话服务器进行加密验证，确认连接的客户端拥有其请求的账户。

---

## Yggdrasil 身份验证的工作原理

客户端、Pumpkin 和 Mojang 的 Yggdrasil 服务器之间的身份验证交换遵循以下步骤：

1. **发起**：客户端发送 `SLoginStart`，声明其希望使用的用户名和可选的离线 UUID。
2. **密钥交换**：Pumpkin 以 `CEncryptionBegin` 回复，提供随机的 4 字节验证令牌、服务器 ID 字符串和 Pumpkin 的 1024 位 RSA 公钥。
3. **加入会话**：客户端生成随机的 16 字节共享密钥（`AES-128`），计算 SHA-1 服务器哈希，并使用其经过身份验证的 Microsoft 访问令牌调用 Mojang 的会话服务器（`POST /session/minecraft/join`）。
4. **验证**：客户端发送 `SEncryptionResponse`，其中包含经 RSA 加密的共享密钥和加密后的验证令牌。Pumpkin 使用其 RSA 私钥解密令牌，重新计算 SHA-1 摘要，并查询 Mojang（`GET /session/minecraft/hasJoined`）。
5. **获取档案**：Mojang 验证客户端和服务器哈希是否匹配，然后返回经过身份验证的玩家 UUID、用户名以及带签名的皮肤/披风纹理属性（`GameProfile`）。
6. **激活加密**：Pumpkin 激活全流对称加密（`AES-128/CFB8`），并通过发送 `CLoginSuccess` 完成登录序列。

---

## 游戏档案结构

当 Mojang 的 `hasJoined` 端点验证会话后，会返回一个 `GameProfile`，其中包含玩家经过身份验证的 UUID、用户名和带签名的纹理属性：

```rust
pub struct GameProfile {
    pub id: Uuid,
    pub name: String,
    pub properties: Vec<Property>,
    pub profile_actions: Option<Vec<ProfileAction>>,
}

pub struct Property {
    pub name: String,
    pub value: String, // Base64 编码的纹理数据
    pub signature: Option<String>, // 用于验证真实性的加密签名
}
```

Pumpkin 会验证皮肤和披风签名是否使用 Mojang 的公钥进行了加密签名，以防止客户端注入恶意负载或未经授权的纹理。

---

## 自定义身份验证端点

对于运行自定义 Yggdrasil 兼容身份验证服务器的私有网络或企业环境，可以在 `pumpkin.toml` 中自定义端点：

```toml
[networking.java.authentication]
enabled = true
fallbacks = []
connect_timeout = 5000
read_timeout = 5000
prevent_proxy_connections = false

[networking.java.authentication.player_profile]
allow_banned_players = false
allowed_actions = ["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]

[networking.java.authentication.textures]
enabled = true
allowed_url_schemes = ["http", "https"]
allowed_url_domains = [".minecraft.net", ".mojang.com"]
```

---

## 代理身份验证转发

当 Pumpkin 在代理后运行时，客户端连接会终止于代理。Pumpkin 支持三种主要的代理转发标准：

- **Velocity 现代转发**：验证通过 HMAC-SHA256 密钥令牌转发的玩家数据（`[networking.proxy.velocity]`）。
- **BungeeGuard**：针对 BungeeCord 配置的基于令牌的身份验证标头验证。
- **旧版 BungeeCord**：通过握手转发，将 IP、UUID 和属性附加到服务器主机字符串中。
