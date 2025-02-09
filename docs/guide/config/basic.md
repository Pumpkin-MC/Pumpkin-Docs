# Basic Configuration

This configuration values can be edited in `configuration.toml`

## `server_address`

The address to bind the server to.

```toml
server_address = "0.0.0.0:25565" # String (IP:Port)
```

## `seed`

The seed for world generation.

```toml
seed = "" # String
```

## `max_players`

The maximum number of players allowed on the server.

```toml
max_players = 100000 # Integer
```

## `view_distance`

The maximum view distance for players.

```toml
view_distance = 10 # Integer
```

## `simulation_distance`

The maximum simulation distance for players.

```toml
simulation_distance = 10 # Integer
```

## `default_difficulty`

The default game difficulty.

```toml
default_difficulty = "Normal" # Enum (Peaceful, Easy, Normal, Hard)
```

## `op_permission_level`

The default permission level for all players.

```toml
op_permission_level = 4 # Enum (0, 1, 2, 3, 4)
```

## `allow_nether`

Whether the Nether dimension is enabled.

```toml
allow_nether = true # Boolean
```

## `hardcore`

Whether the server is in hardcore mode.

```toml
hardcore = false # Boolean
```

## `online_mode`

Whether online mode is enabled. Requires valid Minecraft accounts.

```toml
online_mode = true # Boolean
```

## `encryption`

Whether packet encryption is enabled.

> [!CAUTION]
> Required when online mode is enabled

```toml
encryption = true # Boolean
```

## `motd`

The server's description displayed on the multiplayer menu.

```toml
motd = "A Blazing fast Pumpkin Server!" # String
```

## `tps`

The target server's tick rate.

```toml
tps = 20.0 # Float
```

## `default_gamemode`

The default game mode for players.

```toml
default_gamemode = "Survival" # Enum (Survival, Creative, Adventure, Spectator)
```

## `scrub_ips`

Whether to scrub player IPs from logs.

```toml
scrub_ips = true # Boolean
```

## `use_favicon`

Whether to use a server favicon or not.

```toml
use_favicon = true # Boolean
```

## `favicon_path`

The path to the server's favicon.

```toml
favicon_path = "icon.png" # String
```
