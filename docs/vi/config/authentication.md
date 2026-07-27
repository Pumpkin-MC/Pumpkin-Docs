# Xác thực

Pumpkin xác minh tài khoản với các máy chủ phiên (session servers) của Mojang để đảm bảo người chơi sử dụng tài khoản hợp lệ. Các cài đặt xác thực được cấu hình dưới mục `[networking.java.authentication]` và `[networking.bedrock.authentication]` trong tệp `pumpkin.toml`.

## Xác thực Phiên bản Java (Java Edition)

:::code-group

```toml [pumpkin.toml]
[networking.java.authentication]
enabled = true
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

* **`enabled`**: Bật xác thực trực tuyến cho các máy khách (client) Java.
* **`connect_timeout`**: Thời gian chờ kết nối (tính bằng mili-giây) khi liên lạc với các máy chủ xác thực.
* **`read_timeout`**: Thời gian chờ đọc dữ liệu (tính bằng mili-giây) khi liên lạc với các máy chủ xác thực.
* **`prevent_proxy_connections`**: Chặn các kết nối thông qua proxy/VPN trong quá trình xác thực.

### Cài đặt Hồ sơ Người chơi (Player Profile)

* **`allow_banned_players`**: Cho phép những người chơi bị Mojang gắn cờ/cấm (banned) kết nối vào máy chủ.
* **`allowed_actions`**: Các hành động được phép khi người chơi bị cấm kết nối (`"FORCED_NAME_CHANGE"`, `"USING_BANNED_SKIN"`).

### Cài đặt Kết cấu (Textures)

* **`enabled`**: Bật xác nhận tính hợp lệ của kết cấu người chơi (trang phục - skins, áo choàng - capes, cánh - elytras).
* **`allowed_url_schemes`**: Các giao thức URL được phép dùng để tải xuống kết cấu (`["http", "https"]`).
* **`allowed_url_domains`**: Các tên miền được phép dùng để tải xuống kết cấu (`[".minecraft.net", ".mojang.com"]`).
* **`types.skin`**: Bật trang phục (skin) tùy chỉnh.
* **`types.cape`**: Bật áo choàng (cape).
* **`types.elytra`**: Bật kết cấu cánh (elytra).

## Xác thực Phiên bản Bedrock (Bedrock Edition)

:::code-group

```toml [pumpkin.toml]
[networking.bedrock.authentication]
enabled = true
connect_timeout = 5000
read_timeout = 5000

```

:::
