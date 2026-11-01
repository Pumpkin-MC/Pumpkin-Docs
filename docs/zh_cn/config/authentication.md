# 身份验证

Pumpkin 通过 Mojang 的会话服务器验证账户，以确保玩家使用合法账户。身份验证设置位于 `pumpkin.toml` 的 `[networking.java.authentication]` 和 `[networking.bedrock.authentication]` 下。

## Java 版身份验证

:::code-group

```toml [pumpkin.toml]
[networking.java.authentication]
enabled = true
fallbacks = []
profile_by_name_fallbacks = []
profile_by_uuid_fallbacks = []
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

[networking.java.authentication.textures.types]
skin = true
cape = true
elytra = true
```

:::

### 配置选项

- **`enabled`**：为 Java 版客户端启用在线身份验证（默认：`true`）。
- **`url`**：（可选）用于验证加入请求的自定义身份验证 URL（例如 Drasl 等自定义身份验证服务器）。支持 `{username}` 和 `{server_hash}` 参数。
- **`fallbacks`**：主要/官方会话服务器无法访问时要联系的备用身份验证 URL 列表。
- **`profile_by_name_url`**：（可选）用于通过用户名获取玩家档案的自定义 URL 模板（`{username}`）。
- **`profile_by_name_fallbacks`**：通过用户名查询玩家档案时使用的备用 URL。
- **`profile_by_uuid_url`**：（可选）用于通过 UUID 获取玩家档案的自定义 URL 模板（`{uuid}`）。
- **`profile_by_uuid_fallbacks`**：通过 UUID 查询玩家档案时使用的备用 URL。
- **`connect_timeout`**：联系身份验证服务器时的连接超时时间，单位为毫秒（默认：`5000`）。
- **`read_timeout`**：联系身份验证服务器时的读取超时时间，单位为毫秒（默认：`5000`）。
- **`prevent_proxy_connections`**：在 Mojang 身份验证期间，是否阻止来自代理或 VPN 的连接（默认：`false`）。
- **`prevent_proxy_connection_auth_url`**：（可选）启用代理连接阻止时专门使用的自定义身份验证端点。
- **`services_url`**：（可选）Minecraft 公共服务 URL（用于玩家证书和密钥）。

### 玩家档案设置

- **`allow_banned_players`**：是否允许被 Mojang 标记或封禁的玩家连接（默认：`false`）。
- **`allowed_actions`**：被标记的玩家连接时允许的档案操作（例如 `["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]`）。

### 纹理设置

- **`enabled`**：启用玩家皮肤、披风和鞘翅纹理的获取与验证（默认：`true`）。
- **`allowed_url_schemes`**：下载纹理时允许的 URL 方案（默认：`["http", "https"]`）。
- **`allowed_url_domains`**：下载纹理时允许的域名（默认：`[".minecraft.net", ".mojang.com"]`）。
- **`types.skin`**：启用自定义玩家皮肤（默认：`true`）。
- **`types.cape`**：启用玩家披风（默认：`true`）。
- **`types.elytra`**：启用玩家鞘翅纹理（默认：`true`）。

## 基岩版身份验证

:::code-group

```toml [pumpkin.toml]
[networking.bedrock.authentication]
enabled = true
connect_timeout = 5000
read_timeout = 5000
```

:::

### 配置选项

- **`enabled`**：基岩版客户端是否必须进行 Xbox Live 身份验证（默认：`true`）。
- **`url`**：（可选）自定义身份验证或发现端点 URL。
- **`connect_timeout`**：连接超时时间，单位为毫秒（默认：`5000`）。
- **`read_timeout`**：读取超时时间，单位为毫秒（默认：`5000`）。
