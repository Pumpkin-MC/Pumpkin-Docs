# Phát sóng LAN

Pumpkin có thể phát thông báo máy chủ trên mạng cục bộ để client LAN có thể dễ dàng phát hiện và tham gia máy chủ.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[networking.lan_broadcast]
enabled = false
# motd = "My Custom LAN Server"
# port = 25565
```

:::

### Các Tùy chọn Cấu hình

- **`enabled`**: Bật hoặc tắt phát sóng sự hiện diện của máy chủ trên mạng cục bộ (mặc định: `false`).
- **`motd`**: (Tùy chọn) Thông điệp của Ngày tùy chỉnh một dòng hiển thị trong khám phá client LAN. Nếu bỏ qua, mặc định là MOTD Java của máy chủ với dòng mới bị xóa.
- **`port`**: (Tùy chọn) Cổng được quảng cáo trong phát sóng LAN. Hữu ích cho chuyển tiếp cổng hoặc cổng dự đoán được trong các môi trường được chứa như Docker.
