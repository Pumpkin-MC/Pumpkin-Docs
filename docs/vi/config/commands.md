# Lệnh

Pumpkin hỗ trợ các lệnh Minecraft và cho phép cấu hình các hành vi của bảng điều khiển (console), TTY và quyền hạn trong tệp `pumpkin.toml`.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[commands]
use_console = true
use_tty = true
log_console = true
broadcast_console_to_ops = true
default_op_level = 0

```

:::

### Các Tùy chọn Cấu hình

* **`use_console`**: Có chấp nhận các lệnh được nhập thông qua bảng điều khiển hay không.
* **`use_tty`**: Bật/tắt hỗ trợ TTY cho bảng điều khiển tương tác.
* **`log_console`**: Có ghi nhật ký (log) các lệnh do người chơi thực thi vào bảng điều khiển hay không.
* **`broadcast_console_to_ops`**: Phát (broadcast) kết quả đầu ra của lệnh trên bảng điều khiển cho các quản trị viên máy chủ (operators).
* **`default_op_level`**: Cấp độ quản trị viên (OP) mặc định được gán (từ 0 đến 4).