# 身份验证

## 为什么需要身份验证

离线账户是指不联系授权或身份验证服务器、直接根据玩家用户名生成的账户，其昵称可以任意选择。在没有额外插件的情况下，这意味着玩家可以冒充其他玩家，包括拥有管理员权限的玩家。

## 离线服务器

默认情况下，配置中会启用 `online_mode`（`[networking.java.online_mode]` / `[networking.bedrock.online_mode]`）。这会启用身份验证并禁用离线账户。如果希望允许离线账户，可以在 `pumpkin.toml` 中禁用 `online_mode`。

## Yggdrasil 身份验证的工作原理

1. 客户端从启动器获取身份验证令牌和 UUID。
2. 客户端在加载过程中，使用身份验证令牌从授权/身份验证服务器获取数据，例如各种签名密钥和被封禁服务器的列表。
3. 客户端加入服务器时，会向授权/身份验证服务器发送加入请求。如果账户已被封禁，Mojang 服务器可以拒绝此请求。
4. 客户端通过数据包向服务器发送其身份标识。
5. 服务器根据此身份标识，向授权/身份验证服务器发送 `hasJoined` 请求。请求成功后，服务器会获取玩家信息，例如皮肤。

## 自定义身份验证服务器

Pumpkin 支持自定义身份验证服务器和回退服务器，可在 `pumpkin.toml` 的 `[networking.java.authentication]` 下配置。

### Pumpkin 身份验证的工作原理

1. **GET 请求：** Pumpkin 向指定的身份验证 URL 发送 GET 请求。
2. **状态码 200：** 如果身份验证成功，服务器会返回状态码 200。
3. **解析 JSON 游戏档案：** Pumpkin 解析响应中返回的 JSON 游戏档案。

### 游戏档案

```rust
struct GameProfile {
    id: UUID,
    name: String,
    properties: Vec<Property>,
    profile_actions: Option<Vec<ProfileAction>>, // 可选，仅在应用了操作时存在
}
```

#### 属性

```rust
struct Property {
    name: String,
    value: String, // Base64 编码
    signature: Option<String>, // 可选，Base64 编码
}
```

#### 档案操作

```rust
enum ProfileAction {
    FORCED_NAME_CHANGE,
    USING_BANNED_SKIN,
}
```
