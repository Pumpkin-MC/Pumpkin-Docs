# Viễn trắc

Pumpkin bao gồm viễn trắc ẩn danh tùy chọn và danh mục máy chủ công cộng chọn tham gia. Cài đặt viễn trắc được cấu hình trong `[telemetry]` trong `pumpkin.toml`.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[telemetry]
enabled = true
endpoint = "https://market.pumpkinmc.org/api/v1/rest/telemetry/heartbeat"
interval_secs = 300
public = false
# server_name = "My Pumpkin Server"
```

:::

### Tùy chọn cấu hình

- **`enabled`**: Có bật viễn trắc ẩn danh hay không (mặc định: `true`).
- **`endpoint`**: URL điểm cuối tiêu thụ backend viễn trắc (mặc định: `"https://market.pumpkinmc.org/api/v1/rest/telemetry/heartbeat"`).
- **`interval_secs`**: Khoảng thời gian heartbeat tính bằng giây (mặc định: `300` giây / 5 phút, tối thiểu `60` giây).
- **`public`**: Có chọn tham gia hiển thị máy chủ này trong danh mục cộng đồng công cộng hay không (mặc định: `false`).
- **`server_name`**: (Tùy chọn) Tên máy chủ công cộng hiển thị trên bảng điều khiển phân tích khi `public` là `true`.
