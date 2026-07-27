# Proxy

Pumpkin hỗ trợ các giao thức proxy cho việc thiết lập hệ thống máy chủ mạng. Khả năng hỗ trợ Velocity và BungeeCord được cấu hình tại mục `[networking.proxy]` trong `pumpkin.toml`.

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
```

:::

### Tùy chọn cấu hình

- **`[networking.proxy].enabled`**: Công tắc chính để bật hỗ trợ proxy.
- **`[networking.proxy.velocity].enabled`**: Bật giao thức chuyển tiếp (forwarding) của Velocity.
- **`[networking.proxy.velocity].secret`**: Chuỗi bí mật chuyển tiếp khớp với cấu hình proxy Velocity.
- **`[networking.proxy.bungeecord].enabled`**: Bật giao thức chuyển tiếp (forwarding) của BungeeCord.