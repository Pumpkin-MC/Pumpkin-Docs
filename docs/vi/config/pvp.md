# PVP

Hành vi PVP và cơ chế chiến đấu được cấu hình trong `[pvp]` trong `pumpkin.toml`.

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

### Tùy chọn cấu hình

- **`enabled`**: Bật chiến đấu người chơi với người chơi.
- **`hurt_animation`**: Hiển thị hoạt ảnh bị thương khi bị tấn công.
- **`protect_creative`**: Ngăn người chơi ở chế độ Creative nhận sát thương PVP.
- **`knockback`**: Bật hiệu ứng đẩy lùi khi nhận sát thương.
- **`swing`**: Bật hoạt ảnh vung tay trong khi tấn công.
