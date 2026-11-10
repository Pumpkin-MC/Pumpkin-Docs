# Bộ giới hạn Gói

Pumpkin có bộ giới hạn tốc độ gói tích hợp để bảo vệ máy chủ khỏi bị ngập gói, tấn công spam và khai thác phía client. Giới hạn tốc độ gói có thể được cấu hình độc lập cho client Java Edition và Bedrock Edition.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[networking.java.packet_limiter]
enabled = true
max_packet_rate = 500.0
burst_capacity = 500.0
kick_message = "Kicked for spamming packets"

[networking.bedrock.packet_limiter]
enabled = true
max_packet_rate = 500.0
burst_capacity = 500.0
kick_message = "Kicked for spamming packets"
```

:::

### Các Tùy chọn Cấu hình

- **`enabled`**: Có bật bộ giới hạn tốc độ gói cho phiên bản client này hay không (mặc định: `true`).
- **`max_packet_rate`**: Số gói đến tối đa được phép mỗi giây cho mỗi kết nối client (mặc định: `500.0`). Đặt thành `<= 0.0` để tắt giới hạn tốc độ mà không tắt mô-đun giới hạn.
- **`burst_capacity`**: Dung lượng bùng nổ token bucket cho các đỉnh ngắn trong các gói client (mặc định: `500.0`).
- **`kick_message`**: Thông báo ngắt kết nối hiển thị cho người chơi khi kết nối của họ vượt quá giới hạn gói (mặc định: `"Kicked for spamming packets"`).
