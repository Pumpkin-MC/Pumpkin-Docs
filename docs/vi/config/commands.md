# Lệnh

Pumpkin hỗ trợ lệnh Vanilla và cho phép bạn cấu hình nơi chúng có thể được chạy từ đó.

## Cấu hình lệnh

#### `use_console`: Boolean

Cho phép lệnh từ console.

:::code-group

```toml [features.toml] {2}
[commands]
use_console = false
```

:::

#### `log_console`: Boolean

Lệnh từ người chơi có được ghi vào console hay không.

:::code-group

```toml [features.toml] {2}
[commands]
log_console = false
```

:::

## Cấp độ quyền

Cấp độ quyền mặc định cho tất cả người chơi.

:::code-group

```toml [configuration.toml] {2}
default_op_level = 0
```

:::

## Cấu hình mặc định

Theo mặc định, Pumpkin sẽ cho phép lệnh từ console và ghi lại tất cả các lệnh được chạy bởi người chơi.

:::code-group

```toml [features.toml]
[commands]
use_console = true
log_console = true
default_op_level = 0
```

:::
