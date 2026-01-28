# 身份验证

服务器使用 Mojang 的会话服务器进行身份验证，以确保客户端正在使用合法的付费账号。Pumpkin 允许你自定义配置身份验证系统。

## 配置身份验证

> [!WARNING]警告
> 大多数服务器不应更改默认的身份验证配置。这样做可能会带来意想不到的后果。**仅在你知道自己在做什么的情况下才可以更改这些设置！**

#### `enabled`: 布尔值

是否启用身份验证。

:::code-group

```toml [features.toml] {2}
[authentication]
enabled = false
```

:::

#### `prevent_proxy_connections`: 布尔值

是否阻止代理连接。

:::code-group

```toml [features.toml] {3}
[authentication]
enabled = true
prevent_proxy_connections = true
```

:::

#### `auth_url`: 字符串 (可选)

用于身份验证的 URL。如果未指定，则使用 Mojang 的会话服务器进行身份验证。

##### 占位符

| 占位符          | 描述             |
| --------------- | ---------------- |
| `{username}`    | 玩家用户名       |
| `{server_hash}` | 服务器的哈希值   |

:::code-group

```toml [features.toml] {2}
[authentication]
auth_url = "[这里填写自定义身份验证服务器]"
```

:::

#### `prevent_proxy_connection_auth_url`: 字符串 (可选)

如果启用了 `prevent_proxy_connections`，则用于身份验证的 URL。如果未指定，则使用 Mojang 的会话服务器进行身份验证。

##### 占位符

| 占位符          | 描述             |
| --------------- | ---------------- |
| `{username}`    | 玩家用户名       |
| `{server_hash}` | 服务器的哈希值   |
| `{ip}`          | 玩家的 IP 地址   |

:::code-group

```toml [features.toml] {2}
[authentication]
prevent_proxy_connection_auth_url = "[这里填写自定义身份验证服务器]"
```

:::

### 玩家信息

#### `allow_banned_players`: 布尔值

允许被 Mojang 标记的玩家。

:::code-group

```toml [features.toml] {2}
[authentication.player_profile]
allow_banned_players = true
```

:::

#### `allowed_actions`: 字符串数组

如果启用了 `allow_banned_players`，允许的操作。

:::code-group

```toml [features.toml] {3}
[authentication.player_profile]
allow_banned_players = true
allowed_actions = ["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]
```

:::

### 材质

#### `enabled`: 布尔值

是否过滤/验证玩家材质（例如皮肤/披风）。

:::code-group

```toml [features.toml] {2}
[authentication.textures]
enabled = true
```

:::

#### `allowed_url_schemes`: 字符串数组

材质允许的 URL 方案。

:::code-group

```toml [features.toml] {3}
[authentication.textures]
enabled = true
allowed_url_schemes = ["http", "https"]
```

:::

#### `allowed_url_domains`: 字符串数组

材质允许的 URL 域名。

:::code-group

```toml [features.toml] {3}
[authentication.textures]
enabled = true
allowed_url_domains = [".minecraft.net", ".mojang.com"]
```

:::

### 材质类型

#### `skin`: 布尔值

是否使用玩家皮肤。

:::code-group

```toml [features.toml] {3}
[authentication.textures.types]
skin = true
```

:::

#### `cape`: 布尔值

是否使用玩家披风。

:::code-group

```toml [features.toml] {3}
[authentication.textures.types]
cape = true
```

:::

#### `elytra`: 布尔值

是否使用玩家鞘翅。

:::code-group

```toml [features.toml] {3}
[authentication.textures.types]
elytra = true
```

:::

## 默认配置

默认情况下，身份验证已启用并使用 Mojang 的服务器。以下是默认配置：
:::code-group

```toml [features.toml]
[authentication]
enabled = true
prevent_proxy_connections = false

[authentication.player_profile]
allow_banned_players = false
allowed_actions = ["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]

[authentication.textures]
enabled = true
allowed_url_schemes = ["http", "https"]
allowed_url_domains = [".minecraft.net", ".mojang.com"]

[authentication.textures.types]
skin = true
cape = true
elytra = true
```

:::
