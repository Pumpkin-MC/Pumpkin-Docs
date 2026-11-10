# Xác thực

Pumpkin xác minh tài khoản với máy chủ phiên của Mojang để đảm bảo người chơi sử dụng tài khoản hợp pháp. Cài đặt xác thực được cấu hình trong `[networking.java.authentication]` và `[networking.bedrock.authentication]` trong `pumpkin.toml`.

## Xác thực Phiên bản Java

:::code-group

```toml [pumpkin.toml]
[networking.java.authentication]
enabled = true
fallbacks = []
profile_by_name_fallbacks = []
profile_by_uuid_fallbacks = []
connect_timeout = 5000
read_timeout = 5000
prevent_proxy_connections = false

[networking.java.authentication.player_profile]
allow_banned_players = false
allowed_actions = ["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]

[networking.java.authentication.textures]
enabled = true
allowed_url_schemes = ["http", "https"]
allowed_url_domains = [".minecraft.net", ".mojang.com"]

[networking.java.authentication.textures.types]
skin = true
cape = true
elytra = true
```

:::

### Các Tùy chọn Cấu hình

- **`enabled`**: Bật xác thực trực tuyến cho client Java (mặc định: `true`).
- **`url`**: (Tùy chọn) URL xác thực tùy chỉnh để xác minh yêu cầu tham gia (ví dụ: máy chủ xác thực tùy chỉnh như Drasl). Hỗ trợ tham số `{username}` và `{server_hash}`.
- **`fallbacks`**: Danh sách URL xác thực dự phòng được liên lạc nếu máy chủ phiên chính/th oficcial không thể truy cập.
- **`profile_by_name_url`**: (Tùy chọn) Mẫu URL tùy chỉnh để lấy hồ sơ người chơi theo tên người dùng (`{username}`).
- **`profile_by_name_fallbacks`**: URL dự phòng để tra cứu hồ sơ người chơi theo tên người dùng.
- **`profile_by_uuid_url`**: (Tùy chọn) Mẫu URL tùy chỉnh để lấy hồ sơ người chơi theo UUID (`{uuid}`).
- **`profile_by_uuid_fallbacks`**: URL dự phòng để tra cứu hồ sơ người chơi theo UUID.
- **`connect_timeout`**: Thời gian chờ kết nối tính bằng mili giây khi liên hệ máy chủ xác thực (mặc định: `5000`).
- **`read_timeout`**: Thời gian chờ đọc tính bằng mili giây khi liên hệ máy chủ xác thực (mặc định: `5000`).
- **`prevent_proxy_connections`**: Có chặn kết nối từ proxy hoặc VPN trong quá trình xác thực Mojang hay không (mặc định: `false`).
- **`prevent_proxy_connection_auth_url`**: (Tùy chọn) Điểm cuối xác thực tùy chỉnh được sử dụng cụ thể khi bật ngăn chặn proxy.
- **`services_url`**: (Tùy chọn) URL dịch vụ Minecraft công khai (được sử dụng cho chứng chỉ và khóa người chơi).

### Cài đặt Hồ sơ Người chơi

- **`allow_banned_players`**: Có cho phép người chơi bị gắn cờ hoặc cấm bởi Mojang kết nối hay không (mặc định: `false`).
- **`allowed_actions`**: Các hành động hồ sơ được phép khi người chơi bị gắn cờ kết nối (ví dụ: `["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]`).

### Cài đặt Texture

- **`enabled`**: Bật tải và xác minh skin, áo choàng và texture elytra của người chơi (mặc định: `true`).
- **`allowed_url_schemes`**: Các giao thức URL được phép cho tải texture (mặc định: `["http", "https"]`).
- **`allowed_url_domains`**: Các tên miền được phép cho tải texture (mặc định: `[".minecraft.net", ".mojang.com"]`).
- **`types.skin`**: Bật skin người chơi tùy chỉnh (mặc định: `true`).
- **`types.cape`**: Bật áo choàng người chơi (mặc định: `true`).
- **`types.elytra`**: Bật texture elytra người chơi (mặc định: `true`).

## Xác thực Phiên bản Bedrock

:::code-group

```toml [pumpkin.toml]
[networking.bedrock.authentication]
enabled = true
connect_timeout = 5000
read_timeout = 5000
```

:::

### Các Tùy chọn Cấu hình

- **`enabled`**: Có yêu cầu xác thực Xbox Live cho client Bedrock hay không (mặc định: `true`).
- **`url`**: (Tùy chọn) URL điểm cuối xác thực hoặc khám phá tùy chỉnh.
- **`connect_timeout`**: Thời gian chờ kết nối tính bằng mili giây (mặc định: `5000`).
- **`read_timeout`**: Thời gian chờ đọc tính bằng mili giây (mặc định: `5000`).
