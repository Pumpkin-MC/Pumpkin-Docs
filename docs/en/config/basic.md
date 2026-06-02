# Basic Configuration

Representing the top-level fields in `pumpkin.toml`. These are the core server settings.

## Java Edition

Whether Java Edition clients are accepted.

:::code-group

```toml [pumpkin.toml] {2}
java_edition = true
```

:::

## Java Edition Address

The address and port to which the Java Edition server will bind.

:::code-group

```toml [pumpkin.toml] {2}
java_edition_address = "0.0.0.0:25565"
```

:::

## Bedrock Edition

Whether Bedrock Edition clients are accepted.

:::code-group

```toml [pumpkin.toml] {2}
bedrock_edition = true
```

:::

## Bedrock Edition Address

The address and port to which the Bedrock Edition server will bind.

:::code-group

```toml [pumpkin.toml] {2}
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

## Max Players

The maximum number of players allowed on the server. Specifying `0` disables the limit.

:::code-group

```toml [pumpkin.toml] {2}
max_players = 1000
```

:::

## View Distance

The maximum view distance for players.

:::code-group

```toml [pumpkin.toml] {2}
view_distance = 16
```

:::

## Simulation Distance

The maximum simulation distance for players.

:::code-group

```toml [pumpkin.toml] {2}
simulation_distance = 10
```

:::

## Default Difficulty

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

## Operation Permission Level

The permission level assigned by the `/op` command.

:::code-group

```toml [pumpkin.toml] {2}
op_permission_level = 4
```

:::

## Allow Nether

Whether the Nether dimension is enabled.

:::code-group

```toml [pumpkin.toml] {2}
allow_nether = true
```

:::

## Allow End

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
motd = "A blazingly fast Pumpkin server!"
```

:::

## TPS

The server's target tick rate.

:::code-group

```toml [pumpkin.toml] {2}
tps = 20.0
```

:::

## Default Gamemode

The default game mode for players.

:::code-group

```toml [pumpkin.toml] {2}
default_gamemode = "Survival"
```

:::

```toml
Survival
Creative
Adventure
Spectator
```

## Force Gamemode

Whether the server forces the gamemode on-join.

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

## Use Favicon

Whether to use a server favicon or not.

:::code-group

```toml [pumpkin.toml] {2}
use_favicon = true
```

:::

## Favicon Path

The path to the server's favicon.

:::code-group

```toml [pumpkin.toml] {2}
favicon_path = "icon.png"
```

:::

## Default Level Name

The default level (world) name.

:::code-group

```toml [pumpkin.toml] {2}
default_level_name = "world"
```

:::

## Allow Chat Reports

Whether chat messages should be signed and reportable.

:::code-group

```toml [pumpkin.toml] {2}
allow_chat_reports = false
```

:::

## White List

Whether to enable the whitelist.

:::code-group

```toml [pumpkin.toml] {2}
white_list = false
```

:::

## Enforce Whitelist

Whether to kick players not on the whitelist when it is enabled.

:::code-group

```toml [pumpkin.toml] {2}
enforce_whitelist = false
```

:::
