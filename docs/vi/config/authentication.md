# Xác thực

Server xác thực với Mojang's session servers để đảm bảo client đang chơi trên tài khoản hợp lệ. Pumpkin cho phép bạn cấu hình xác thực.

## Cấu hình xác thực

> [!WARNING] CẢNH BÁO
> Hầu hết các server không nên thay đổi cấu hình xác thực mặc định. Làm như vậy có thể gây ra hậu quả không mong muốn. **Chỉ thay đổi các cài đặt này nếu bạn biết mình đang làm gì!**

#### `enabled`: Boolean

Bật và tắt xác thực.

:::code-group

```toml [features.toml] {2}
[authentication]
enabled = false
```

:::

#### `prevent_proxy_connections`: Boolean

Chặn kết nối proxy.

:::code-group

```toml [features.toml] {3}
[authentication]
enabled = true
prevent_proxy_connections = true
```

:::

#### `auth_url`: String (tùy chọn)

URL để xác thực. Sử dụng Mojang's session servers để xác thực nếu không được chỉ định.

##### Placeholders

| Placeholder     | Description        |
| --------------- | ------------------ |
| `{username}`    | Tên người chơi    |
| `{server_hash}` | Hash của server |

:::code-group

```toml [features.toml] {2}
[authentication]
auth_url = "[custom auth server ở đây]"
```

:::

#### `prevent_proxy_connection_auth_url`: String (tùy chọn)

URL để xác thực nếu `prevent_proxy_connections` được bật. Sử dụng Mojang's session servers để xác thực nếu không được chỉ định.

##### Placeholders

| Placeholder     | Description              |
| --------------- | ------------------------ |
| `{username}`    | Tên người chơi          |
| `{server_hash}` | Hash của server       |
| `{ip}`          | IP của người chơi |

:::code-group

```toml [features.toml] {2}
[authentication]
prevent_proxy_connection_auth_url = "[custom auth server ở đây]"
```

:::

### Hồ sơ người chơi

#### `allow_banned_players`: Boolean

Cho phép người chơi đã bị ban bởi Mojang.

:::code-group

```toml [features.toml] {2}
[authentication.player_profile]
allow_banned_players = true
```

:::

#### `allowed_actions`: String Array

Các hành động được cho phép nếu `allow_banned_players` được bật.

:::code-group

```toml [features.toml] {3}
[authentication.player_profile]
allow_banned_players = true
allowed_actions = ["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]
```

:::

### Textures

#### `enabled`: Boolean

Bật và tắt textures (vd: skins/capes). 

:::code-group

```toml [features.toml] {2}
[authentication.textures]
enabled = true
```

:::

#### `allowed_url_schemes`: String Array

URL schemes được cho phép cho textures.

:::code-group

```toml [features.toml] {3}
[authentication.textures]
enabled = true
allowed_url_schemes = ["http", "https"]
```

:::

#### `allowed_url_domains`: String Array

URL domains được cho phép cho textures.

:::code-group

```toml [features.toml] {3}
[authentication.textures]
enabled = true
allowed_url_domains = [".minecraft.net", ".mojang.com"]
```

:::

### Texture Types

#### `skin`: Boolean

Bật và tắt skins.

:::code-group

```toml [features.toml] {3}
[authentication.textures.types]
skin = true
```

:::

#### `cape`: Boolean

Bật và tắt capes.

:::code-group

```toml [features.toml] {3}
[authentication.textures.types]
cape = true
```

:::

#### `elytra`: Boolean

Bật và tắt elytras.

:::code-group

```toml [features.toml] {3}
[authentication.textures.types]
elytra = true
```

:::

## Cấu hình mặc định

Theo mặc định, xác thực được bật và sử dụng Mojang's servers. Đây là cấu hình mặc định:
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
