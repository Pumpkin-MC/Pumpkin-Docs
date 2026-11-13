# Plugin

Pumpkin cung cấp runtime plugin WebAssembly (WASM) với bảo mật dựa trên khả năng. Hành vi plugin, xác minh chữ ký và quyền được cấu hình trong `[plugins]` trong `pumpkin.toml`.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[plugins]
enabled = true
hot_reload = false
ask_permission_confirmation = true
allow_unsigned = true
allowed_permissions = []
blocked_permissions = []
inherit_env = false
loopback_only = false
verify_signatures = true

# Ghi đè tùy chọn cho từng plugin
[plugins.overrides.my_plugin]
enabled = true
allow_unsigned = true
max_memory_mb = 128
allowed_permissions = ["fs:read:data"]
blocked_permissions = ["network:outbound"]
loopback_only = true

[plugins.overrides.my_plugin.environment]
API_KEY = "example_secret"
```

:::

### Cài đặt Plugin Toàn cục

- **`enabled`**: Công tắc chính để bật hoặc tắt runtime plugin (mặc định: `true`).
- **`hot_reload`**: Theo dõi thư mục `plugins/` và tự động tải lại các plugin đã sửa đổi tại runtime (mặc định: `false`).
- **`ask_permission_confirmation`**: Nhắc trong console máy chủ khi một plugin yêu cầu khả năng/quyền chưa được phê duyệt (mặc định: `true`).
- **`allow_unsigned`**: Cho phép tải các plugin WASM không ký (mặc định: `true`).
- **`allowed_permissions`**: Danh sách các quyền được phê duyệt trước toàn cục cho tất cả plugin, bỏ qua các lời nhắc console tương tác (mặc định: `[]`).
- **`blocked_permissions`**: Danh sách các quyền bị từ chối toàn cục cho tất cả plugin (mặc định: `[]`).
- **`inherit_env`**: Có kế thừa các biến môi trường máy chủ vào sandbox WASI plugin theo mặc định hay không (mặc định: `false`).
- **`loopback_only`**: Có hạn chế kết nối mạng ra từ plugin đến `127.0.0.1` / localhost hay không (mặc định: `false`).
- **`max_memory_mb`**: (Tùy chọn) Giới hạn bộ nhớ tối đa toàn cục tính bằng megabyte (MB) cho mỗi phiên bản plugin.
- **`verify_signatures`**: Pumpkin có xác minh chữ ký mã hóa trên các plugin WASM trước khi tải hay không (mặc định: `true`).

### Ghi đè cho từng Plugin

Tinh chỉnh quyền và biến môi trường cho các plugin cụ thể trong `[plugins.overrides.<plugin_name>]`:

- **`enabled`**: Bật hoặc tắt plugin cụ thể này (mặc định: `true`).
- **`allow_unsigned`**: Ghi đè có cho phép plugin cụ thể này chạy không ký hay không (`true`/`false`).
- **`max_memory_mb`**: Giới hạn bộ nhớ tối đa tính bằng MB được phân bổ cụ thể cho plugin này.
- **`allowed_permissions`**: Quyền được phê duyệt trước cho plugin này.
- **`blocked_permissions`**: Quyền bị chặn rõ ràng cho plugin này.
- **`loopback_only`**: Ghi đè hạn chế mạng loopback cho plugin này.
- **`environment`**: Bảng các biến môi trường tùy chỉnh được truyền trực tiếp vào môi trường WASI của plugin.
