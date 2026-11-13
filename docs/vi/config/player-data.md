# Dữ liệu Người chơi & Lối chơi

Cài đặt cho lưu dữ liệu người chơi liên tục, advancement, đồng bộ hóa công thức và các tính năng mùa giải thú vui được cấu hình trong `pumpkin.toml`.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[player_data]
save_player_data = true
save_player_cron_interval = 300

[advancement]
save_advancements = true

[recipe]
send_recipes = true

[fun]
april_fools = true
```

:::

### Dữ liệu Người chơi

- **`save_player_data`**: Có lưu dữ liệu người chơi liên tục (hàng tồn, vị trí, sức khỏe) vào đĩa hay không (mặc định: `true`).
- **`save_player_cron_interval`**: Khoảng thời gian tính bằng giây giữa các lần lưu định kỳ tự động của dữ liệu người chơi trực tuyến (mặc định: `300` giây / 5 phút).

### Advancement

- **`save_advancements`**: Có theo dõi và lưu tiến trình advancement của người chơi vào đĩa hay không (mặc định: `true`).

### Công thức

- **`send_recipes`**: Có đồng bộ hóa công thức chế tạo và nấu với các client được kết nối, bật sách công thức phía client hay không (mặc định: `true`).

### Tính năng Thú vị

- **`april_fools`**: Có bật các tính năng và easter egg April Fools thú vị và theo mùa hay không (mặc định: `true`).
