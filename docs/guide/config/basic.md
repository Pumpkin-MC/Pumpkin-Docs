# Basic Configuration

Representing `configuration.toml`

## Server Address

The address to bind the server to.

:::code-group
```toml [configuration.toml] {2}
server_address = "0.0.0.0:25565"
```
:::

## Seed

The seed for world generation.

:::code-group
```toml [configuration.toml] {2}
seed = ""
```
:::

## Max players

The maximum number of players allowed on the server.

:::code-group
```toml [configuration.toml] {2}
max_players = 100000
```
:::

## View distance

The maximum view distance for players.

:::code-group
```toml [configuration.toml] {2}
view_distance = 10
```
:::

## Simulation distance

The maximum simulation distance for players.

:::code-group
```toml [configuration.toml] {2}
simulation_distance = 10
```
:::

## Default difficulty

The default game difficulty.

:::code-group
```toml [configuration.toml] {2}
default_difficulty = "Normal"
```
:::


```toml
Peaceful
Easy
Normal
Hard
```

## Operation permission level

The default permission level for all players.

:::code-group
```toml [configuration.toml] {2}
op_permission_level = 4
```
:::

## Allow nether

Whether the Nether dimension is enabled.

:::code-group
```toml [configuration.toml] {2}
allow_nether = true
```
:::

## Hardcore

Whether the server is in hardcore mode.

:::code-group
```toml [configuration.toml] {2}
hardcore = false
```
:::

## Online Mode

Whether online mode is enabled. Requires valid Minecraft accounts.

:::code-group
```toml [configuration.toml] {2}
online_mode = true
```
:::

## Encryption

Whether packet encryption is enabled.

> [!IMPORTANT]
> Required when online mode is enabled.

:::code-group
```toml [configuration.toml] {2}
encryption = true
```
:::

## Motd

The server's description displayed on the status screen.

:::code-group
```toml [configuration.toml] {2}
motd = "A Blazing fast Pumpkin Server!"
```
:::

## TPS

The target server's Tick rate.

:::code-group
```toml [configuration.toml] {2}
tps = 20.0
```
:::

## Default gamemode

The default game mode for players.

:::code-group
```toml [configuration.toml] {2}
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

## IP Scrubbing

Whether to scrub player IPs from logs.

:::code-group
```toml [configuration.toml] {2}
scrub_ips = true
```
:::

## Use favicon

Whether to use a server favicon or not.

:::code-group
```toml [configuration.toml] {2}
use_favicon = true
```
:::

## Favicon path

The path to the server's favicon.

:::code-group
```toml [configuration.toml] {2}
favicon_path = "icon.png"
```
:::