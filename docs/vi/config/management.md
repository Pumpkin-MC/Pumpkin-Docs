# Máy chủ quản lý (MSMP)

Pumpkin triển khai [Giao thức quản lý máy chủ Minecraft (MSMP)](https://minecraft.wiki/w/Minecraft_Server_Management_Protocol) qua WebSockets, thay thế RCON cũ cho quản lý từ xa, giám sát trạng thái và lệnh JSON-RPC. Cài đặt được cấu hình trong `[networking.management]` trong `pumpkin.toml`.

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

### Tùy chọn cấu hình

- **`enabled`**: Công tắc chính để bật dịch vụ WebSocket Giao thức quản lý máy chủ Minecraft (MSMP) (mặc định: `false`).
- **`address`**: Địa chỉ IP và cổng nơi máy chủ quản lý lắng nghe kết nối WebSocket (mặc định: `"127.0.0.1:25585"`).
- **`secret`**: Mã bí mật chữ và số 40 ký tự cần để xác thực khách hàng quản lý. Nếu để trống (`""`) khi khởi động, một mã bí mật ngẫu nhiên 40 ký tự sẽ được tạo tự động.
- **`allowed_origins`**: Danh sách các nguồn gốc được phép cho kết nối trình duyệt web được xác thực qua tiêu đề HTTP `Origin` (mặc định: `[]`).
- **`status_heartbeat_interval`**: Khoảng thời gian tính bằng giây giữa các lần phát sóng heartbeat trạng thái máy chủ tự động (`0` tắt heartbeat, mặc định: `0`).
