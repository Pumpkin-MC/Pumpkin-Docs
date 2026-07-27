# Ghi log

Pumpkin cung cấp các tùy chọn ghi log có thể tùy chỉnh trong `pumpkin.toml`.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[logging]
enabled = true
threads = true
color = true
timestamp = true
file = "latest.log"
```

:::

### Các tùy chọn cấu hình

- **`enabled`**: Công tắc chính để bật hoặc tắt ghi log.
- **`threads`**: Bao gồm tên/ID của thread trong đầu ra log.
- **`color`**: Bật đầu ra màu ANSI trong console log.
- **`timestamp`**: Bao gồm timestamp trong các mục log.
- **`file`**: Đường dẫn đến tệp log (ví dụ: `"latest.log"`).