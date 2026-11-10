# Lệnh

Pumpkin hỗ trợ các lệnh Minecraft và cho phép cấu hình console, TTY và hành vi quyền trong `pumpkin.toml`.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[commands]
use_console = true
use_tty = true
log_console = true
broadcast_console_to_ops = true
default_op_level = 0

# Ghi đè tùy chọn cho từng lệnh
[commands.overrides.gamemode]
permission_level = 4

[commands.overrides.tp]
enabled = false
```

:::

### Các Tùy chọn Cấu hình

- **`use_console`**: Có chấp nhận lệnh từ console hay không.
- **`use_tty`**: Có bật hỗ trợ TTY (rustyline) cho đầu vào console tương tác hay không.
- **`log_console`**: Có ghi nhật ký các lệnh được thực thi bởi người chơi vào console hay không.
- **`broadcast_console_to_ops`**: Có phát đầu ra lệnh console đến người điều hành trực tuyến hay không (khớp với `broadcast-console-to-ops` gốc).
- **`default_op_level`**: Cấp quyền OP được gán cho người không phải điều hành (0 đến 4, mặc định: `0`).

## Ghi đè Lệnh

Bạn có thể tùy chỉnh quyền hoặc hoàn toàn vô hiệu hóa các lệnh riêng lẻ bằng `[commands.overrides.<command>]`. Khóa được đặt tên theo lệnh mà không có dấu gạch chéo ở đầu (ví dụ: `gamemode`, `tp`).

### Các Tùy chọn Ghi đè

- **`enabled`**: Có bật lệnh hay không (mặc định: `true`). Khi đặt thành `false`, lệnh hoàn toàn bị ẩn: nó sẽ không chạy, sẽ không xuất hiện trong `/help`, và sẽ không hiển thị trong tab completion. Người chơi cố gắng chạy nó sẽ nhận được thông báo lệnh không xác định.
- **`permission_level`**: Cấp quyền tối thiểu cần để chạy lệnh:
  - `0`: Mọi người đều có thể sử dụng.
  - `2`: Người điều hành bình thường (lệnh cheat điển hình như `/gamemode`).
  - `3`: Quản trị viên (lệnh điều hành như `/kick`, `/ban`).
  - `4`: Chủ sở hữu máy chủ (quản lý máy chủ đầy đủ như `/stop`, `/op`).

Để trống `permission_level` để giữ cấp quyền mặc định của lệnh.
