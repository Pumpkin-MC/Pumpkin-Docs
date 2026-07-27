# Cấu hình

Pumpkin sử dụng một tệp `pumpkin.toml` duy nhất để cấu hình mọi khía cạnh của máy chủ. Dưới đây là cấu trúc hoàn chỉnh của tệp cấu hình với tất cả các phần có sẵn và giá trị mặc định.

## Tệp `pumpkin.toml` Mặc định Hoàn chỉnh

```toml
seed = "1785537519969227430"
default_difficulty = "Normal"
op_permission_level = 4
allow_nether = true
allow_end = true
hardcore = false
tps = 20.0
default_gamemode = "Survival"
force_gamemode = false
scrub_ips = true
use_favicon = true
default_level_name = "world"
allow_chat_reports = false
white_list = false
enforce_whitelist = false

[logging]
enabled = true
threads = true
color = true
timestamp = true
file = "latest.log"

[resource_pack.java]
enabled = false
url = ""
sha1 = ""
prompt_message = ""
force = false

[resource_pack.bedrock]
enabled = false
force = false
packs = []

[world]
lighting = "default"
autosave_ticks = 0

[world.chunk]
type = "anvil"
write_in_place = false

[world.chunk.compression]
algorithm = "LZ4"
level = 6

[networking.query]
enabled = true
address = "0.0.0.0:25565"

[networking.rcon]
enabled = false
address = "0.0.0.0:25575"
password = ""
max_connections = 10

[networking.rcon.logging]
logged_successfully = true
wrong_password = true
commands = true
quit = true

[networking.proxy]
enabled = false

[networking.proxy.velocity]
enabled = false
secret = ""

[networking.proxy.bungeecord]
enabled = false

[networking.lan_broadcast]
enabled = false

[networking.java]
enabled = true
address = "0.0.0.0:25565"
encryption = true
online_mode = true
max_players = 1000
view_distance = 16
simulation_distance = 10
motd = "A blazingly fast Pumpkin server!"

[networking.java.compression]
enabled = true
threshold = 256
level = 4

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

[networking.bedrock]
enabled = true
address = "0.0.0.0:19132"
encryption = true
online_mode = true
max_players = 1000
view_distance = 16
simulation_distance = 10
motd = "A blazingly fast Pumpkin server!"

[networking.bedrock.compression]
enabled = true
threshold = 256
level = 4

[networking.bedrock.authentication]
enabled = true
connect_timeout = 5000
read_timeout = 5000

[commands]
use_console = true
use_tty = true
log_console = true
broadcast_console_to_ops = true
default_op_level = 0

[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"

[pvp]
enabled = true
hurt_animation = true
protect_creative = true
knockback = true
swing = true

[server_links]
enabled = true
bug_report = "[https://github.com/Pumpkin-MC/Pumpkin/issues](https://github.com/Pumpkin-MC/Pumpkin/issues)"
support = ""
status = ""
feedback = ""
community = ""
website = ""
forums = ""
news = ""
announcements = ""

[server_links.custom]

[player_data]
save_player_data = true
save_player_cron_interval = 300

[fun]
april_fools = true

[recipe]
send_recipes = true

[plugins]
blocked_permissions = []

[advancement]
save_advancements = true
```

## Chi tiết các Cài đặt

### Cài đặt Cấp cao nhất (Top-Level Settings)

* **`seed`**: Chuỗi seed dùng để tạo thế giới.
* **`default_difficulty`**: Độ khó mặc định (`"Peaceful"`, `"Easy"`, `"Normal"`, `"Hard"`).
* **`op_permission_level`**: Cấp độ quyền hạn mặc định được gán cho quản trị viên (operator) (1-4).
* **`allow_nether`**: Bật/tắt chiều không gian Nether.
* **`allow_end`**: Bật/tắt chiều không gian End.
* **`hardcore`**: Kích hoạt chế độ hardcore (người chơi không thể hồi sinh trong chế độ sinh tồn).
* **`tps`**: Số tick mục tiêu mỗi giây (mặc định: `20.0`).
* **`default_gamemode`**: Chế độ chơi mặc định (`"Survival"`, `"Creative"`, `"Adventure"`, `"Spectator"`).
* **`force_gamemode`**: Bắt buộc người chơi tham gia bằng chế độ chơi mặc định.
* **`scrub_ips`**: Ẩn danh địa chỉ IP của người chơi trong các tệp log (nhật ký).
* **`use_favicon`**: Kích hoạt biểu tượng máy chủ (`icon.png`).
* **`default_level_name`**: Tên của thư mục thế giới chính (mặc định: `"world"`).
* **`allow_chat_reports`**: Bật tính năng báo cáo trò chuyện đã ký (signed chat reporting).
* **`white_list`**: Bật danh sách trắng (whitelist) của máy chủ.
* **`enforce_whitelist`**: Đuổi (kick) những người chơi không có mặt trong danh sách trắng khi danh sách này được bật.