# Query

Giao thức Query cho phép các ứng dụng bên ngoài (chẳng hạn như danh sách máy chủ hoặc hệ thống giám sát) yêu cầu chi tiết trạng thái từ Pumpkin.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[networking.query]
enabled = true
address = "0.0.0.0:25565"
```

:::

### Các tùy chọn cấu hình

- **`enabled`**: Bật hoặc tắt trình lắng nghe Query.
- **`address`**: Địa chỉ mạng và cổng để liên kết trình lắng nghe Query.