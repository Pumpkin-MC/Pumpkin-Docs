# Basic Configuration

## Server Address

The address to bind the server to

:::code-group
```toml [configuration.toml]
server_address = "0.0.0.0:25565"
```
:::

## Seed

The seed for world generation

:::code-group
```toml [configuration.toml]
seed = ""
```
:::

## Max players

The maximum number of players allowed on the server

:::code-group
```toml [configuration.toml]
max_players = 100000
```
:::

## View distance

The maximum view distance for players

:::code-group
```toml [configuration.toml]
view_distance = 10
```
:::

## Simulation distance

The maximum simulation distance for players

:::code-group
```toml [configuration.toml]
simulation_distance = 10
```
:::

## Default difficulty

The default game difficulty. Available types: `Peaceful`, `Easy`, `Normal`, `Hard`

:::code-group
```toml [configuration.toml]
default_difficulty = "Normal"
```
:::

## Operation permission level

The default permission level for all players

:::code-group
```toml [configuration.toml]
op_permission_level = 4
```
:::

## Allow nether

Whether the Nether dimension is enabled

:::code-group
```toml [configuration.toml]
allow_nether = true
```
:::

## Hardcore

Whether the server is in hardcore mode

:::code-group
```toml [configuration.toml]
hardcore = false
```
:::

## Online Mode

Whether online mode is enabled. Requires valid Minecraft accounts

:::code-group
```toml [configuration.toml]
online_mode = true
```
:::

## Encryption

Whether packet encryption is enabled

> [!CAUTION]
> Required when online mode is enabled

:::code-group
```toml [configuration.toml]
encryption = true
```
:::

## MOTD

The server's description displayed on the multiplayer menu

:::code-group
```toml [configuration.toml]
motd = "A Blazing fast Pumpkin Server!"
```
:::

## TPS

The target server's tick rate

:::code-group
```toml [configuration.toml]
tps = 20.0
```
:::

## Default gamemode

The default game mode for players. Available types: `Undefined`, `Survival`, `Creative`, `Adventure`, `Spectator`

:::code-group
```toml [configuration.toml]
default_gamemode = "Survival"
```
:::

## IP Scrubbing

Whether to scrub player IPs from logs

:::code-group
```toml [configuration.toml]
scrub_ips = true
```
:::

## Use favicon

Whether to use a server favicon or not

:::code-group
```toml [configuration.toml]
use_favicon = true
```
:::

## Favicon path

The path to the server's favicon

:::code-group
```toml [configuration.toml]
favicon_path = "icon.png"
```
:::