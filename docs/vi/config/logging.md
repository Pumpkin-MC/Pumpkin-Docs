# Ghi log

Pumpkin cho phép bạn tùy chỉnh những gì bạn muốn trong log.

## Cấu hình ghi log

#### `enabled`: Boolean

Bật và tắt ghi log.

:::code-group

```toml [features.toml] {2}
[logging]
enabled = true
```

:::

#### `level`: Enum

Mức độ chi tiết của log. Các giá trị có thể là:

- Off
- Error
- Warn
- Info
- Debug
- Trace

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
level = "Debug"
```

:::

#### `env`: Boolean

Cho phép chọn mức độ chi tiết của log bằng cách đặt biến môi trường `RUST_LOG`.

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
env = true
```

:::

#### `threads`: Boolean

Bật và tắt thread chi tiết trong log.

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
threads = false
```

:::

#### `color`: Boolean

Bật và tắt màu trong log.

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
color = false
```

:::

#### `timestamp`: Boolean

Bật và tắt timestamp trong log.

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
timestamp = false
```

:::

## Cấu hình mặc định

Theo mặc định, ghi log được bật ở mức `Info` và sẽ in màu, thread và timestamp.

:::code-group

```toml [features.toml]
[logging]
enabled = true
level = "Info"
env = false
threads = true
color = true
timestamp = true
```

:::
