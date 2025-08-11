## 身份验证

### 为什么需要身份验证

离线账户，即从玩家用户名生成而不联系授权或身份验证服务器的账户，可以选择任何昵称。在没有额外插件的情况下，这意味着玩家可以冒充其他玩家，包括那些拥有操作员权限的玩家。

### 离线服务器

默认情况下，配置中启用了 `online_mode`。这启用了身份验证，禁用离线账户。如果您想允许离线账户，可以在 `configuration.toml` 中禁用 `online_mode`。

### Yggdrasil 身份验证的工作原理

1. 客户端从启动器获取身份验证令牌和 UUID。
2. 客户端在加载过程中，使用身份验证令牌从授权/身份验证服务器获取数据，如各种签名密钥和被阻止服务器的列表。
3. 客户端在加入服务器时，向授权/身份验证服务器发送加入请求。如果账户被封禁，Mojang 服务器可以拒绝此请求。
4. 客户端在数据包中向服务器发送其身份标识。
5. 服务器根据此身份标识，向授权/身份验证服务器发送 `hasJoined` 请求。如果成功，它将获取玩家信息，如皮肤。

### 自定义身份验证服务器

Pumpkin 支持自定义身份验证服务器。您可以在 `features.toml` 中替换身份验证 URL。

#### Pumpkin 身份验证的工作原理

1. **GET 请求：** Pumpkin 向指定的身份验证 URL 发送 GET 请求。
2. **状态码 200：** 如果身份验证成功，服务器会响应状态码 200。
3. **解析 JSON 游戏配置文件：** Pumpkin 解析响应中返回的 JSON 游戏配置文件。

#### 游戏配置文件

```rust
struct GameProfile {
    id: UUID,
    name: String,
    properties: Vec<Property>,
    profile_actions: Option<Vec<ProfileAction>>, // 可选，仅当应用操作时存在
}
```

##### 属性

```rust
struct Property {
    name: String,
    value: String, // Base64 编码
    signature: Option<String>, // 可选，Base64 编码
}
```

##### 配置文件操作

```rust
enum ProfileAction {
    FORCED_NAME_CHANGE,
    USING_BANNED_SKIN,
}
```
