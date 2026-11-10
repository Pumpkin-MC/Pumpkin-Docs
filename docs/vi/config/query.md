# Query

Giao thức Query cho phép các ứng dụng bên ngoài (như danh sách máy chủ hoặc hệ thống theo dõi) yêu cầu chi tiết trạng thái từ Pumpkin.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[networking.query]
enabled = false
address = "0.0.0.0:25565"
```

:::

### Các Tùy chọn Cấu hình

- **`enabled`**: Bật hoặc tắt trình lắng nghe GS4 Query (mặc định: `false`).
- **`address`**: Địa chỉ mạng và cổng để liên kết trình lắng nghe Query (mặc định: `"0.0.0.0:25565"`).
