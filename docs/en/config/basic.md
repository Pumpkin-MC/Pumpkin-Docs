# Basic Configuration

Representing `pumpkin.toml`

## Server Address

The address to bind the server to.

:::code-group

```toml [pumpkin.toml] {2}
java_edition = true
java_edition_address = "0.0.0.0:25565"
bedrock_edition = true
bedrock_edition_address = "0.0.0.0:19132"
```

:::

## Seed

The seed for world generation.

:::code-group

```toml [pumpkin.toml] {2}
seed = ""
```

:::

## Max players

The maximum number of players allowed on the server.

:::code-group

```toml [pumpkin.toml] {2}
max_players = 1000
```

:::

## View distance

The maximum view distance for players.

:::code-group

```toml [pumpkin.toml] {2}
view_distance = 16
```

:::

## Simulation distance

The maximum simulation distance for players.

:::code-group

```toml [pumpkin.toml] {2}
simulation_distance = 10
```

:::

## Default difficulty

The default game difficulty.

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

## Operation permission level

The permission level assigned by the `/op` command.

:::code-group

```toml [pumpkin.toml] {2}
op_permission_level = 4
```

:::

## Allow nether

Whether the Nether dimension is enabled.

:::code-group

```toml [pumpkin.toml] {2}
allow_nether = true
```

:::

## Allow end

Whether the End dimension is enabled.

:::code-group

```toml [pumpkin.toml] {2}
allow_end = true
```

:::

## Hardcore

Whether the server is in hardcore mode.

:::code-group

```toml [pumpkin.toml] {2}
hardcore = false
```

:::

## Online Mode

Whether online mode is enabled. Requires valid Minecraft accounts.

:::code-group

```toml [pumpkin.toml] {2}
online_mode = true
```

:::

## Encryption

Whether packet encryption is enabled.

> [!IMPORTANT]
> Required when online mode is enabled.

:::code-group

```toml [pumpkin.toml] {2}
encryption = true
```

:::

## MOTD

Message of the Day; the server's description displayed on the status screen.

:::code-group

```toml [pumpkin.toml] {2}
motd = "A Blazingly fast Pumpkin Server!"
```

:::

## TPS

The server's target tick rate.

:::code-group

```toml [pumpkin.toml] {2}
tps = 20.0
```

:::

## Default gamemode

The default game mode for players.

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
## force gamemode

Should players be forced to join the server in a fixed game mode

:::code-group

```toml [pumpkin.toml] {2}
force_gamemode = false
```

:::

## IP Scrubbing

Whether to scrub players' IP addresses from logs.

:::code-group

```toml [pumpkin.toml] {2}
scrub_ips = true
```

:::

## Use favicon

Whether to use a server favicon or not.

:::code-group

```toml [pumpkin.toml] {2}
use_favicon = true
```

:::

## Favicon path

The path to the server's favicon.

:::code-group

```toml [pumpkin.toml] {2}
favicon_path = "icon.png"
```

:::
