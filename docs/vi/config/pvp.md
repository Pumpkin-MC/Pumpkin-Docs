# PVP

Hành vi và cơ chế chiến đấu PVP được cấu hình tại mục `[pvp]` trong `pumpkin.toml`.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[pvp]
enabled = true
hurt_animation = true
protect_creative = true
knockback = true
swing = true
```

:::

### Các tùy chọn cấu hình

- **`enabled`**: Bật chế độ chiến đấu giữa người chơi với người chơi (PVP).
- **`hurt_animation`**: Hiển thị hoạt ảnh chịu sát thương khi bị tấn công.
- **`protect_creative`**: Ngăn người chơi ở chế độ Sáng tạo (Creative) nhận sát thương PVP.
- **`knockback`**: Bật hiệu ứng bật lùi khi nhận sát thương.
- **`swing`**: Bật hoạt ảnh vung tay khi tấn công.