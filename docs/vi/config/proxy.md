# Proxy

Pumpkin hỗ trợ các giao thức proxy cho thiết lập máy chủ mạng. Hỗ trợ cho Velocity, BungeeCord và Vine được cấu hình trong `[networking.proxy]` trong `pumpkin.toml`.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[networking.proxy]
enabled = false

[networking.proxy.velocity]
enabled = false
secret = ""

[networking.proxy.bungeecord]
enabled = false
secret = ""

[networking.proxy.vine]
enabled = false
public_key = ""
secret = ""
```

:::

### Tùy chọn cấu hình

- **`[networking.proxy].enabled`**: Công tắc chính để bật hỗ trợ proxy.
- **`[networking.proxy.velocity].enabled`**: Bật giao thức chuyển hướng Velocity hiện đại.
- **`[networking.proxy.velocity].secret`**: Mã bí mật chuyển hướng khớp với cấu hình proxy Velocity.
- **`[networking.proxy.bungeecord].enabled`**: Bật giao thức chuyển hướng thông tin người chơi BungeeCord.
- **`[networking.proxy.bungeecord].secret`**: Mã bí mật chia sẻ tùy chọn để xác thực kết nối từ proxy BungeeCord qua BungeeGuard (`bungeeguard-token`). Khi được đặt, kết nối đến phải cung cấp token này, ngăn người chơi vượt qua proxy để kết nối trực tiếp.
- **`[networking.proxy.vine].enabled`**: Bật tích hợp proxy Vine hiện đại với xác thực Ed25519 và bảo vệ phát lại.
- **`[networking.proxy.vine].public_key`**: Khóa công khai Ed25519 (64 ký tự hex) của proxy Vine được sử dụng để xác minh danh tính người chơi được chuyển hướng.
- **`[networking.proxy.vine].secret`**: Chuỗi bí mật chia sẻ tùy chọn. Nếu được cung cấp và `public_key` trống, khóa công khai được tự động lấy từ bí mật này.
