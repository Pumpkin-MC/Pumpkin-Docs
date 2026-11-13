# Ghi nhật ký

Pumpkin cung cấp các tùy chọn ghi nhật ký có thể tùy chỉnh trong `pumpkin.toml`.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[logging]
enabled = true
level = "info"
threads = false
thread_ids = false
target = false
color = true
timestamp = true
timestamp_format = "[hour]:[minute]:[second]"
file = "latest.log"
```

:::

### Các Tùy chọn Cấu hình

- **`enabled`**: Công tắc chính để bật hoặc tắt ghi nhật ký máy chủ (mặc định: `true`).
- **`level`**: Cấp nhật ký tối thiểu cho đầu ra console và tệp. Các cấp có sẵn là `"trace"`, `"debug"`, `"info"`, `"warn"`, `"error"`, và `"off"` (mặc định: `"info"`). Cũng có thể bị ghi đè bằng biến môi trường `RUST_LOG`.
- **`threads`**: Có bao gồm tên luồng trong tin nhắn nhật ký hay không (mặc định: `false`).
- **`thread_ids`**: Có bao gồm ID luồng số trong tin nhắn nhật ký hay không (mặc định: `false`).
- **`target`**: Có bao gồm mục tiêu mô-đun và thành phần trong các mục nhật ký hay không (mặc định: `false`).
- **`color`**: Có bật đầu ra nhật ký màu ANSI trong console hay không (mặc định: `true`).
- **`timestamp`**: Có bao gồm dấu thời gian trong các mục nhật ký hay không (mặc định: `true`).
- **`timestamp_format`**: Chuỗi định dạng dấu thời gian sử dụng cú pháp mô tả định dạng `time` (mặc định: `"[hour]:[minute]:[second]"`).
- **`file`**: Đường dẫn tệp để ghi đầu ra nhật ký (mặc định: `"latest.log"`).
