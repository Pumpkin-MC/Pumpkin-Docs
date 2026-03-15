# RCON

RCON là một giao thức cho phép bạn quản lý server từ xa từ một thiết bị khác. Pumpkin hỗ trợ đầy đủ RCON.

## Cấu hình RCON

#### `enabled`: Boolean

:::code-group

```toml [features.toml] {2}
[rcon]
enabled = true
```

:::

#### `address`: String

Địa chỉ và port mà RCON sẽ lắng nghe.

:::code-group

```toml [features.toml] {3}
[rcon]
enabled = true
address = "0.0.0.0:25575"
```

:::

#### `password`: String

Mật khẩu để sử dụng cho xác thực RCON.

:::code-group

```toml [features.toml] {3}
[rcon]
enabled = true
password = "[mật khẩu ở đây]"
```

:::

#### `max_connections`: Integer

Số kết nối RCON tối đa được phép tại một thời điểm. Đặt thành 0 để tắt giới hạn.

:::code-group

```toml [features.toml] {3}
[rcon]
enabled = true
max_connections = 5
```

:::

### Logging

#### `log_logged_successfully`: Boolean

Bật và tắt log khi đăng nhập thành công.

:::code-group

```toml [features.toml] {2}
[rcon.logging]
log_logged_successfully = true
```

:::

#### `log_wrong_password`: Boolean

Bật và tắt log khi đăng nhập sai mật khẩu.

:::code-group

```toml [features.toml] {2}
[rcon.logging]
log_logged_successfully = true
```

:::

#### `log_commands`: Boolean

Bật và tắt log khi chạy lệnh từ RCON.

:::code-group

```toml [features.toml] {2}
[rcon.logging]
log_commands = true
```

:::

#### `log_quit`: Boolean

Bật và tắt log khi RCON client thoát.

:::code-group

```toml [features.toml] {2}
[rcon.logging]
log_quit = true
```

:::

## Cấu hình mặc định

Theo mặc định, RCON bị tắt.

:::code-group

```toml [features.toml]
[rcon]
enabled = false
address = "0.0.0.0:25575"
password = ""
max_connections = 0

[rcon.logging]
log_logged_successfully = true
log_wrong_password = true
log_commands = true
log_quit = true
```

:::
