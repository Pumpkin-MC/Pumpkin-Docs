# Grundkonfiguration

Entspricht `pumpkin.toml`

## Serveradresse

Die Adresse, an die der Server gebunden wird.

:::code-group

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

:::

## Seed

Der Seed für die Weltgenerierung.

:::code-group

```toml [pumpkin.toml] {2}
seed = ""
```

:::

## Maximale Spielerzahl

Die maximale Anzahl an Spielern, die gleichzeitig auf dem Server erlaubt sind.

:::code-group

```toml [pumpkin.toml] {2}
max_players = 100000
```

:::

## Sichtweite

Die maximale Sichtweite für Spieler.

:::code-group

```toml [pumpkin.toml] {2}
view_distance = 10
```

:::

## Simulationsdistanz

Die maximale Simulationsdistanz für Spieler.

:::code-group

```toml [pumpkin.toml] {2}
simulation_distance = 10
```

:::

## Standard‑Schwierigkeitsgrad

Der standardmäßige Schwierigkeitsgrad.

:::code-group

```toml [pumpkin.toml] {2}
default_difficulty = "Normal"
```

:::

```toml
Peaceful
Easy
Normal
Hard
```

## Operator‑Rechtelevel

Das Berechtigungslevel, das durch den Befehl `/op` vergeben wird.

:::code-group

```toml [pumpkin.toml] {2}
op_permission_level = 4
```

:::

## Nether erlauben

Ob die Nether‑Dimension aktiviert ist.

:::code-group

```toml [pumpkin.toml] {2}
allow_nether = true
```

:::

## End erlauben

Ob die End‑Dimension aktiviert ist.

:::code-group

```toml [pumpkin.toml] {2}
allow_end = true
```

:::

## Hardcore

Ob der Server im Hardcore‑Modus läuft.

:::code-group

```toml [pumpkin.toml] {2}
hardcore = false
```

:::

## Online‑Modus

Ob der Online‑Modus aktiviert ist. Erfordert gültige Minecraft‑Konten.

:::code-group

```toml [pumpkin.toml] {2}
online_mode = true
```

:::

## Verschlüsselung

Ob Paket‑Verschlüsselung aktiviert ist.

> [!IMPORTANT]
> Erforderlich, wenn der Online‑Modus aktiviert ist.

:::code-group

```toml [pumpkin.toml] {2}
encryption = true
```

:::

## MOTD

„Message of the Day“; die Server‑Beschreibung auf dem Status‑Bildschirm.

:::code-group

```toml [pumpkin.toml] {2}
motd = "A Blazingly fast Pumpkin Server!"
```

:::

## TPS

Die Ziel‑Tickrate des Servers.

:::code-group

```toml [pumpkin.toml] {2}
tps = 20.0
```

:::

## Standard‑Spielmodus

Der Standard‑Spielmodus für Spieler.

:::code-group

```toml [pumpkin.toml] {2}
default_gamemode = "Survival"
```

:::

```toml
Undefined
Survival
Creative
Adventure
Spectator
```

## IP‑Bereinigung

Ob Spieler‑IP‑Adressen aus Logs entfernt werden.

:::code-group

```toml [pumpkin.toml] {2}
scrub_ips = true
```

:::

## Favicon verwenden

Ob ein Server‑Favicon verwendet werden soll.

:::code-group

```toml [pumpkin.toml] {2}
use_favicon = true
```

:::

## Favicon‑Pfad

Der Pfad zum Server‑Favicon.

:::code-group

```toml [pumpkin.toml] {2}
favicon_path = "icon.png"
```

:::
