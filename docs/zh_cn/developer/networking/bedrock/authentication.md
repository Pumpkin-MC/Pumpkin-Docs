# 基岩版身份验证

Minecraft：基岩版实现了基于 JSON Web Token（JWT）的证书链身份验证协议，其加密信任锚为 Microsoft / Xbox Live 的根公钥。

身份验证由 [`pumpkin-auth`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-auth) crate 提供支持，并在 `crates/pumpkin/src/net/bedrock/login/` 中的基岩版登录握手期间处理。

---

## 握手流程

基岩版客户端发起连接时，会发送一个 `SLogin` 数据包，其中包含客户端协议版本、**身份链**和**客户端数据**：

1. **获取令牌**：基岩版客户端登录 Xbox Live，获取由 Microsoft CA 签名的链式 JSON Web Token（JWT）证书。
2. **传输登录信息**：客户端将此身份链和一个单独的 `ClientData` JWT 一起打包到 `SLogin` 中。
3. **链验证**：Pumpkin 遍历证书链，根据 Mojang 的根公钥验证每个令牌的签名，并提取玩家的 Xbox 用户 ID（XUID）、玩家代号和临时会话公钥。
4. **硬件验证**：Pumpkin 使用客户端的临时公钥验证 `ClientData` 负载，并提取几何模型、皮肤和设备操作系统遥测数据。
5. **会话授权**：验证完成后，Pumpkin 发出 `CPlayStatus`（登录成功），并进入资源包协商阶段。

---

## 令牌负载

### 1. 身份链（`Chain`）
一个 JWT 令牌数组，构成不间断的信任链：
- **根令牌**：由 Mojang 官方公共根证书颁发机构进行加密签名。
- **中间令牌**：由 Xbox Live 服务签发，用于验证玩家的 Xbox Live 用户 ID（**XUID**）和玩家代号，并为会话生成临时 ECDSA 公钥。
- **声明**：包含 `extraData`，其中有 `displayName`、`identity`（UUID）、`XUID` 和 `titleId`。

### 2. 客户端数据（`ClientData`）
一个单独的 JWT，使用客户端临时私钥签名，该私钥与身份链中的公钥相对应：
- **硬件与环境**：`DeviceOS`、`DeviceModel`、`CurrentInputMode`、`DefaultInputMode`、`ClientRandomId`。
- **游戏版本**：`GameVersion` 字符串。
- **玩家外观**：完整的皮肤纹理位图、披风数据、几何模型名称和 Persona 定义。

---

## 在 `pumpkin-auth` 中验证

Pumpkin 使用 **NIST P-384 ECDSA** 加密算法验证令牌签名：

```rust
// 位于 crates/pumpkin/src/net/bedrock/login/mod.rs
match AuthPayload::verify(&jwt_payload) {
    Ok(profile) => {
        // 已成功根据 Mojang 公钥完成验证
        info!("Authenticated Bedrock player: {} (XUID: {})", profile.name, profile.xuid);
    }
    Err(LoginError::ChainValidationFailed(err)) => {
        warn!("Bedrock JWT chain validation failed: {err}");
        self.try_kick(DisconnectReason::Kicked, "Authentication failed".into());
    }
    Err(LoginError::SelfSignedNotAllowed) => {
        warn!("Rejected unauthenticated self-signed Bedrock client");
        self.try_kick(DisconnectReason::Kicked, "Server enforces Xbox Live authentication".into());
    }
}
```

### 在线模式与离线模式
- **在线模式**（`pumpkin.toml` 中的 `online_mode = true`）：证书链必须成功通过 Mojang 公钥验证。自签名或未签名的令牌会立即被拒绝。
- **离线模式**（`online_mode = false`）：Pumpkin 接受自签名的客户端链，在提取装饰性皮肤和设备元数据的同时生成离线 UUID。
