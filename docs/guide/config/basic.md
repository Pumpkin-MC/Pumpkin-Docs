# Basic Configuration

## `server_address`

The address to bind the server to.

:::code-group
```toml [configuration.toml]
server_address = "0.0.0.0:25565" # String (IP:Port)
```
:::

## `seed`

The seed for world generation.

:::code-group
```toml [configuration.toml]
seed = "" # String
```
:::

## `max_players`

The maximum number of players allowed on the server.

:::code-group
```toml [configuration.toml]
max_players = 100000 # Integer
```
:::

## `view_distance`

The maximum view distance for players.

:::code-group
```toml [configuration.toml]
view_distance = 10 # Integer
```
:::

## `simulation_distance`

The maximum simulation distance for players.

:::code-group
```toml [configuration.toml]
simulation_distance = 10 # Integer
```
:::

## `default_difficulty`

The default game difficulty.

:::code-group
```toml [configuration.toml]
default_difficulty = "Normal" # Enum (Peaceful, Easy, Normal, Hard)
```
:::

## `op_permission_level`

The default permission level for all players.

:::code-group
```toml [configuration.toml]
op_permission_level = 4 # Enum (0, 1, 2, 3, 4)
```
:::

## `allow_nether`

Whether the Nether dimension is enabled.

:::code-group
```toml [configuration.toml]
allow_nether = true # Boolean
```
:::

## `hardcore`

Whether the server is in hardcore mode.

:::code-group
```toml [configuration.toml]
hardcore = false # Boolean
```
:::

## `online_mode`

Whether online mode is enabled. Requires valid Minecraft accounts.

:::code-group
```toml [configuration.toml]
online_mode = true # Boolean
```
:::

## `encryption`

Whether packet encryption is enabled.

> [!CAUTION]
> Required when online mode is enabled

:::code-group
```toml [configuration.toml]
encryption = true # Boolean
```
:::

## `motd`

The server's description displayed on the multiplayer menu.

:::code-group
```toml [configuration.toml]
motd = "A Blazing fast Pumpkin Server!" # String
```
:::

## `tps`

The target server's tick rate.

:::code-group
```toml [configuration.toml]
tps = 20.0 # Float
```
:::

## `default_gamemode`

The default game mode for players.

:::code-group
```toml [configuration.toml]
default_gamemode = "Survival" # Enum (Survival, Creative, Adventure, Spectator)
```
:::

## `scrub_ips`

Whether to scrub player IPs from logs.

:::code-group
```toml [configuration.toml]
scrub_ips = true # Boolean
```
:::

## `use_favicon`

Whether to use a server favicon or not.

:::code-group
```toml [configuration.toml]
use_favicon = true # Boolean
```
:::

## `favicon_path`

The path to the server's favicon.

:::code-group
```toml [configuration.toml]
favicon_path = "icon.png" # String
```
:::
