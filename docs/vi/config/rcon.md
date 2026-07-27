# RCON

RCON cho phép quản trị từ xa máy chủ Pumpkin của bạn thông qua kết nối mạng. Trong `pumpkin.toml`, các cài đặt được đặt tại `[networking.rcon]`.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[networking.rcon]
enabled = false
address = "0.0.0.0:25575"
password = ""
max_connections = 10

[networking.rcon.logging]
logged_successfully = true
wrong_password = true
commands = true
quit = true
```

:::

### Cài đặt RCON

- **`enabled`**: Công tắc chính để bật dịch vụ RCON.
- **`address`**: Địa chỉ IP và cổng để máy chủ RCON liên kết (bind) vào.
- **`password`**: Mật khẩu bắt buộc để xác thực các client RCON.
- **`max_connections`**: Số lượng kết nối client RCON đồng thời tối đa được phép.

### Cài đặt nhật ký (Logging) RCON

- **`logged_successfully`**: Ghi nhật ký các sự kiện client xác thực thành công.
- **`wrong_password`**: Ghi nhật ký các nỗ lực xác thực thất bại (sai mật khẩu).
- **`commands`**: Ghi nhật ký các lệnh được thực thi thông qua RCON.
- **`quit`**: Ghi nhật ký các sự kiện client ngắt kết nối.