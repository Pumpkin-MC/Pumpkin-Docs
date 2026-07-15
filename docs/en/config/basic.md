# Basic Configuration

These are the root-level options in `pumpkin.toml` for quick and important changes.

## Seed

The seed for world generation.

:::code-group

```toml [pumpkin.toml] {1}
seed = ""
```

:::

## Default difficulty

The default game difficulty.

:::code-group

```toml [pumpkin.toml] {1}
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

```toml [pumpkin.toml] {1}
op_permission_level = 4
```

:::

## Allow nether

Whether the Nether dimension is enabled.

:::code-group

```toml [pumpkin.toml] {1}
allow_nether = true
```

:::

## Allow end

Whether the End dimension is enabled.

:::code-group

```toml [pumpkin.toml] {1}
allow_end = true
```

:::

## Hardcore

Whether the server is in hardcore mode.

:::code-group

```toml [pumpkin.toml] {1}
hardcore = false
```

:::

## TPS

The server's target tick rate.

:::code-group

```toml [pumpkin.toml] {1}
tps = 20.0
```

:::

## Default gamemode

The default game mode for players.

:::code-group

```toml [pumpkin.toml] {1}
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

## Force gamemode

Whether to force the default gamemode on players when they join.

:::code-group

```toml [pumpkin.toml] {1}
force_gamemode = false
```

:::

## IP Scrubbing

Whether to scrub players' IP addresses from logs.

:::code-group

```toml [pumpkin.toml] {1}
scrub_ips = true
```

:::

## Use favicon

Whether to use a server favicon or not.

:::code-group

```toml [pumpkin.toml] {1}
use_favicon = true
```

:::

## Default level name

The name of the default world folder.

:::code-group

```toml [pumpkin.toml] {1}
default_level_name = "world"
```

:::

## Allow chat reports

Whether to allow chat reports from players.

:::code-group

```toml [pumpkin.toml] {1}
allow_chat_reports = false
```

:::

## White list

Whether the white list is enabled.

:::code-group

```toml [pumpkin.toml] {1}
white_list = false
```

:::

## Enforce whitelist

Whether to enforce the white list by kicking players not on it.

:::code-group

```toml [pumpkin.toml] {1}
enforce_whitelist = false
```

:::
