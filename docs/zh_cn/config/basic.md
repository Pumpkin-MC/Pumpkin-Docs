# 配置

Pumpkin 使用单个 `pumpkin.toml` 文件配置服务器的各个方面。以下是配置文件的完整结构，包含所有可用配置节及默认值。

## 完整的默认 `pumpkin.toml`

```toml
seed = "1790155153199293024"
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
accepts_transfers = true
spawn_protection = 16

[logging]
enabled = true
level = "info"
threads = false
thread_ids = false
target = false
color = true
timestamp = true
timestamp_format = "[hour]:[minute]:[second]"
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
autosave_ticks = 6000

[world.chunk]
type = "pump"

[world.entity_islands]
unaudited_reach = 16.0
knockback_reach = 4.0

[networking.query]
enabled = false
address = "0.0.0.0:25565"

[networking.management]
enabled = false
address = "127.0.0.1:25585"
secret = ""
allowed_origins = []
status_heartbeat_interval = 0

[networking.proxy]
enabled = false

[networking.proxy.velocity]
enabled = false
secret = ""

[networking.proxy.bungeecord]
enabled = false
secret = ""

[networking.proxy.vine]
enabled = false
public_key = ""
secret = ""

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
keep_alive_time = 15
motd = "A blazingly fast Pumpkin server!"

[networking.java.compression]
enabled = true
threshold = 256
level = 4

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

[networking.java.packet_limiter]
enabled = true
max_packet_rate = 500.0
burst_capacity = 500.0
kick_message = "Kicked for spamming packets"

[networking.bedrock]
enabled = true
online_mode = true
max_players = 1000
view_distance = 16
simulation_distance = 10
motd = "A blazingly fast Pumpkin server!"
username_prefix = ""
replace_username_spaces = true
chunk_caching = true

[networking.bedrock.compression]
enabled = true
threshold = 256
level = 4

[networking.bedrock.authentication]
enabled = true
connect_timeout = 5000
read_timeout = 5000

[networking.bedrock.nethernet]
enabled = true
address = "0.0.0.0:19132"
external_ip = ""
identity_key = "nethernet-key.der"
stun_servers = []

[networking.bedrock.packet_limiter]
enabled = true
max_packet_rate = 500.0
burst_capacity = 500.0
kick_message = "Kicked for spamming packets"

[commands]
use_console = true
use_tty = true
log_console = true
broadcast_console_to_ops = true
default_op_level = 0

[commands.overrides]

[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"

[chat.anti_spam]
enabled = true
spam_threshold = 200
message_cost = 20
decay_per_tick = 1
ops_bypass = true

[pvp]
enabled = true
hurt_animation = true
protect_creative = true
knockback = true
swing = true

[server_links]
enabled = true
bug_report = "https://github.com/Pumpkin-MC/Pumpkin/issues"
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
enabled = true
hot_reload = false
ask_permission_confirmation = true
allow_unsigned = true
allowed_permissions = []
blocked_permissions = []
inherit_env = false
loopback_only = false
verify_signatures = true

[plugins.overrides]

[advancement]
save_advancements = true

[telemetry]
enabled = true
endpoint = "https://market.pumpkinmc.org/api/v1/rest/telemetry/heartbeat"
interval_secs = 300
public = false
```

## 设置详解

### 顶层设置

- **`seed`**：用于世界生成的种子字符串。
- **`default_difficulty`**：默认难度（`"Peaceful"`、`"Easy"`、`"Normal"`、`"Hard"`）。
- **`op_permission_level`**：分配给管理员的默认权限等级（1–4）。
- **`allow_nether`**：是否启用下界维度。
- **`allow_end`**：是否启用末地维度。
- **`hardcore`**：启用极限模式（玩家无法在生存模式中重生）。
- **`tps`**：目标每秒 tick 数（默认：`20.0`）。
- **`default_gamemode`**：默认游戏模式（`"Survival"`、`"Creative"`、`"Adventure"`、`"Spectator"`）。
- **`force_gamemode`**：强制玩家以默认游戏模式加入。
- **`scrub_ips`**：在日志中对玩家 IP 地址进行匿名化处理。
- **`use_favicon`**：启用服务器图标（`icon.png`）。
- **`favicon_path`**：自定义服务器图标的可选文件路径。
- **`default_level_name`**：主世界目录的名称（默认：`"world"`）。
- **`allow_chat_reports`**：启用签名聊天举报（需要 `networking.java.online_mode = true`）。
- **`white_list`**：启用服务器白名单。
- **`enforce_whitelist`**：开启白名单时踢出不在白名单中的玩家。
- **`accepts_transfers`**：此服务器是否接受来自其他服务器传入的玩家跨服转移（Transfer）（默认：`true`，也接受 `accepts-transfers`）。
- **`spawn_protection`**：世界出生点周围保护区域的方块半径，在此半径内非管理员权限玩家无法破坏或放置方块。设置为 `0` 可禁用出生点保护（默认：`16`）。
