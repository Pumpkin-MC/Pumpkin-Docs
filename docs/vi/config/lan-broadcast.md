# Quảng bá qua mạng LAN

Pumpkin có thể quảng bá thông báo máy chủ trên mạng nội bộ để các client trong mạng LAN có thể dễ dàng phát hiện và tham gia vào máy chủ.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[networking.lan_broadcast]
enabled = false
```

:::

### Các tùy chọn cấu hình

- **`enabled`**: Bật hoặc tắt tính năng quảng bá đến các client trong mạng nội bộ.