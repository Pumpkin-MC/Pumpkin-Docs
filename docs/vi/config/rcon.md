# Máy chủ Quản lý (MSMP) / RCON

> [!WARNING]
> RCON cũ (`[networking.rcon]`) đã được thay thế bởi [Giao thức Quản lý Máy chủ Minecraft (MSMP)](./management) trong `[networking.management]`.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[networking.management]
enabled = false
address = "127.0.0.1:25585"
secret = ""
allowed_origins = []
status_heartbeat_interval = 0
```

:::

### Cài đặt Máy chủ Quản lý

- **`enabled`**: Công tắc chính để bật dịch vụ WebSocket Giao thức Quản lý Máy chủ Minecraft (MSMP) (mặc định: `false`).
- **`address`**: Địa chỉ IP và cổng nơi máy chủ quản lý lắng nghe kết nối WebSocket (mặc định: `"127.0.0.1:25585"`).
- **`secret`**: Bí mật alphanumeric 40 ký tự cần thiết để xác thực client quản lý. Nếu để trống (`""`) khi khởi động, một bí mật 40 ký tự ngẫu nhiên sẽ được tự động tạo.
- **`allowed_origins`**: Danh sách các nguồn gốc được phép cho kết nối trình duyệt web được xác thực qua tiêu đề HTTP `Origin` (mặc định: `[]`).
- **`status_heartbeat_interval`**: Khoảng thời gian tính bằng giây giữa các lần phát sóng nhịp tim trạng thái máy chủ tự động (`0` tắt nhịp tim, mặc định: `0`).
