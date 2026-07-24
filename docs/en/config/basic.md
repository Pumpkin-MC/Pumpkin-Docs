# Configuration

Pumpkin uses a single `pumpkin.toml` file to configure all aspects of the server. Below is the complete structure of the configuration file with all available sections and default values.

## Complete Default `pumpkin.toml`

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
blocked_permissions = []

[advancement]
save_advancements = true
```

## Settings Breakdown

### Top-Level Settings

- **`seed`**: Seed string for world generation.
- **`default_difficulty`**: Default difficulty (`"Peaceful"`, `"Easy"`, `"Normal"`, `"Hard"`).
- **`op_permission_level`**: Default permission level assigned to operators (1-4).
- **`allow_nether`**: Whether the Nether dimension is enabled.
- **`allow_end`**: Whether the End dimension is enabled.
- **`hardcore`**: Enables hardcore mode (players cannot respawn in survival).
- **`tps`**: Target ticks per second (default: `20.0`).
- **`default_gamemode`**: Default game mode (`"Survival"`, `"Creative"`, `"Adventure"`, `"Spectator"`).
- **`force_gamemode`**: Force players to join in the default gamemode.
- **`scrub_ips`**: Anonymize player IP addresses in logs.
- **`use_favicon`**: Enable server icon (`icon.png`).
- **`default_level_name`**: Name of the main world directory (default: `"world"`).
- **`allow_chat_reports`**: Enable signed chat reporting.
- **`white_list`**: Enable server whitelist.
- **`enforce_whitelist`**: Kick non-whitelisted players when whitelist is toggled on.
