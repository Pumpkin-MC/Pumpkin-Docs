---
title: Interface server
outline: [2, 2]
---

# Interface `server`

Host import: `pumpkin:plugin/server@0.1.0`

[Package summary](./)

Source: [server.wit](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/server.wit)

Server state and player lookup.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`player`](./player) | `player`, `ban-player-options`, `ban-ip-options`, `server-link`, `known-server-link`, `server-link-label` |
| [`common`](./common) | `game-mode` |
| [`world`](./world) | `%world` |
| [`text`](./text) | `text-component` |
| [`uuid`](./uuid) | `uuid` |
| [`recipe`](./recipe) | `recipe-manager` |
| [`enchantments`](./enchantments) | `enchantment-manager`, `custom-enchantment` |
| [`permission`](./permission) | `permission-level` |
| [`advancement`](./advancement) | `advancement-info` |
| [`datapack`](./datapack) | `datapack-manager`, `datapack-info` |

## Type Summary

| Kind | Type | Description |
| --- | --- | --- |
| resource | [`ban-manager`](#type-ban-manager) | Global manager for player and IP bans. |
| record | [`banned-ip-entry`](#type-banned-ip-entry) | Represents a banned IP entry in the IP ban list. |
| record | [`banned-player-entry`](#type-banned-player-entry) | Represents a banned player entry in the ban list. |
| variant | [`command-sender`](#type-command-sender) |  |
| enum | [`difficulty`](#type-difficulty) | Represents the difficulty setting of a Minecraft server. |
| enum | [`dimension`](#type-dimension) | Represents the three main Minecraft dimensions. |
| record | [`op-entry`](#type-op-entry) | Represents an operator entry in the ops configuration. |
| resource | [`op-manager`](#type-op-manager) | Interface for querying and managing server operators. |
| resource | [`server`](#type-server) | Represents the global server instance. |
| record | [`sys-info`](#type-sys-info) |  |
| record | [`whitelist-entry`](#type-whitelist-entry) | Represents a player entry in the server whitelist. |
| resource | [`whitelist-manager`](#type-whitelist-manager) | Global manager for the server whitelist. |

## Operation Summary

| Scope | Operation | Description |
| --- | --- | --- |
| `ban-manager` | [`ban-ip`](#operation-ban-manager-ban-ip) | Bans an IP address with the specified options. |
| `ban-manager` | [`ban-player`](#operation-ban-manager-ban-player) | Bans a player by name and UUID with the specified options (works for online and offline players). |
| `ban-manager` | [`get-ip-ban`](#operation-ban-manager-get-ip-ban) | Retrieves the ban entry for an IP address, if banned. |
| `ban-manager` | [`get-player-ban`](#operation-ban-manager-get-player-ban) | Retrieves the ban entry for a player UUID, if banned. |
| `ban-manager` | [`is-ip-banned`](#operation-ban-manager-is-ip-banned) | Checks if an IP address is currently banned. |
| `ban-manager` | [`is-player-banned`](#operation-ban-manager-is-player-banned) | Checks if a player UUID is currently banned. |
| `ban-manager` | [`list-ip-bans`](#operation-ban-manager-list-ip-bans) | Returns all currently active IP bans. |
| `ban-manager` | [`list-player-bans`](#operation-ban-manager-list-player-bans) | Returns all currently active player bans. |
| `ban-manager` | [`unban-ip`](#operation-ban-manager-unban-ip) | Removes an IP ban. Returns true if the IP was banned. |
| `ban-manager` | [`unban-player`](#operation-ban-manager-unban-player) | Removes a player ban by UUID. Returns true if the player was banned. |
| `op-manager` | [`deop-player`](#operation-op-manager-deop-player) | Revokes operator status from a player (online or offline). Returns true if the player was previously op. |
| `op-manager` | [`get-op`](#operation-op-manager-get-op) | Retrieves the operator entry for a player UUID, if present. |
| `op-manager` | [`get-permission-level`](#operation-op-manager-get-permission-level) | Gets the effective permission level for a player UUID (returns zero if not op). |
| `op-manager` | [`is-op`](#operation-op-manager-is-op) | Checks if a player UUID is currently an operator. |
| `op-manager` | [`list-ops`](#operation-op-manager-list-ops) | Returns a list of all operator entries on the server. |
| `op-manager` | [`op-player`](#operation-op-manager-op-player) | Grants operator status to a player (online or offline) with the specified level and bypass setting. |
| `server` | [`broadcast`](#operation-server-broadcast) | Broadcasts a system chat message to all players. |
| `server` | [`broadcast-tab-list-header-footer`](#operation-server-broadcast-tab-list-header-footer) | Broadcasts a tab list header and footer to all players. |
| `server` | [`create-world`](#operation-server-create-world) | Creates or loads a world by its name and dimension. |
| `server` | [`delete-message-by-id`](#operation-server-delete-message-by-id) | Deletes a signed chat message from all players' chat windows using its signature cache ID. |
| `server` | [`delete-message-by-signature`](#operation-server-delete-message-by-signature) | Deletes a signed chat message from all players' chat windows using its 256-byte signature. |
| `server` | [`execute-command`](#operation-server-execute-command) |  |
| `server` | [`get-advancement`](#operation-server-get-advancement) | Returns detailed information about an advancement by its ID (e.g., "minecraft:story/mine_stone" or "story/mine_stone"). |
| `server` | [`get-all-advancement-ids`](#operation-server-get-all-advancement-ids) | Returns a list of all registered advancement IDs on the server. |
| `server` | [`get-all-enchantment-ids`](#operation-server-get-all-enchantment-ids) | Returns a list of all registered enchantment IDs (custom and vanilla) on the server. |
| `server` | [`get-all-players`](#operation-server-get-all-players) | Returns a list of all online players across all worlds. |
| `server` | [`get-all-worlds`](#operation-server-get-all-worlds) | Returns a list of all worlds on this server. |
| `server` | [`get-allow-end`](#operation-server-get-allow-end) | Returns whether the server allows the End dimension. |
| `server` | [`get-allow-nether`](#operation-server-get-allow-nether) | Returns whether the server allows the Nether dimension. |
| `server` | [`get-ban-manager`](#operation-server-get-ban-manager) | Returns the global ban manager for querying and modifying player and IP bans. |
| `server` | [`get-datapack-manager`](#operation-server-get-datapack-manager) | Returns the global datapack manager for inspecting, enabling, disabling, and reloading datapacks. |
| `server` | [`get-default-gamemode`](#operation-server-get-default-gamemode) | Returns the server's default gamemode. |
| `server` | [`get-difficulty`](#operation-server-get-difficulty) | Returns the current difficulty level of the server. |
| `server` | [`get-enchantment`](#operation-server-get-enchantment) | Returns information about an enchantment by its ID (vanilla or custom). |
| `server` | [`get-enchantment-manager`](#operation-server-get-enchantment-manager) | Returns the global enchantment manager for registering and querying custom enchantments. |
| `server` | [`get-max-players`](#operation-server-get-max-players) | Returns the maximum number of players allowed on the server. |
| `server` | [`get-motd`](#operation-server-get-motd) | Returns the server's Message of the Day (MOTD). |
| `server` | [`get-mspt`](#operation-server-get-mspt) | Returns the rolling average Milliseconds Per Tick (MSPT). |
| `server` | [`get-op-manager`](#operation-server-get-op-manager) | Returns the operator manager to query or modify server operators. |
| `server` | [`get-player-by-name`](#operation-server-get-player-by-name) | Searches for a player by their exact name. |
| `server` | [`get-player-by-uuid`](#operation-server-get-player-by-uuid) | Searches for a player by their UUID string. |
| `server` | [`get-player-count`](#operation-server-get-player-count) | Returns the total number of players currently connected to the server. |
| `server` | [`get-player-count-in-world`](#operation-server-get-player-count-in-world) | Returns the number of online players in a specific world. |
| `server` | [`get-players-in-world`](#operation-server-get-players-in-world) | Returns a list of all online players in a specific world. |
| `server` | [`get-recipe-manager`](#operation-server-get-recipe-manager) | Returns the recipe manager to register custom recipes. |
| `server` | [`get-simulation-distance`](#operation-server-get-simulation-distance) | Returns the server's maximum simulation distance. |
| `server` | [`get-sys-info`](#operation-server-get-sys-info) | Returns system information (CPU, Memory, OS). |
| `server` | [`get-tps`](#operation-server-get-tps) | Returns the effective Ticks Per Second (TPS). |
| `server` | [`get-view-distance`](#operation-server-get-view-distance) | Returns the server's maximum view distance. |
| `server` | [`get-whitelist-manager`](#operation-server-get-whitelist-manager) | Returns the global whitelist manager for querying and modifying the server whitelist. |
| `server` | [`get-world-by-name`](#operation-server-get-world-by-name) | Gets a world by its dimension name (e.g., "minecraft:overworld") or custom world name (e.g., "world", "arena_1"). |
| `server` | [`has-whitelist`](#operation-server-has-whitelist) | Returns whether the server has a whitelist enabled. |
| `server` | [`has-world`](#operation-server-has-world) | Checks if a world exists by name or dimension. |
| `server` | [`is-hardcore`](#operation-server-is-hardcore) | Returns whether the server is in hardcore mode. |
| `server` | [`is-online-mode`](#operation-server-is-online-mode) | Returns whether the server is in online mode (authenticates with Mojang). |
| `server` | [`save-all`](#operation-server-save-all) | Saves all players, player advancements, and loaded worlds to disk. |
| `server` | [`set-server-links`](#operation-server-set-server-links) | Broadcasts custom server links to all connected players (displayed in the client Esc pause menu in 1.21+). |
| `server` | [`unload-world`](#operation-server-unload-world) | Unloads and saves a world by its name or dimension. |
| `whitelist-manager` | [`add-player`](#operation-whitelist-manager-add-player) | Adds a player to the whitelist (online or offline). Returns true if newly added. |
| `whitelist-manager` | [`is-enabled`](#operation-whitelist-manager-is-enabled) | Returns whether the whitelist is currently enabled. |
| `whitelist-manager` | [`is-whitelisted`](#operation-whitelist-manager-is-whitelisted) | Checks if a player UUID is on the whitelist. |
| `whitelist-manager` | [`list-entries`](#operation-whitelist-manager-list-entries) | Returns all whitelisted player entries. |
| `whitelist-manager` | [`remove-player`](#operation-whitelist-manager-remove-player) | Removes a player from the whitelist. Returns true if the player was on the whitelist. |
| `whitelist-manager` | [`set-enabled`](#operation-whitelist-manager-set-enabled) | Enables or disables the server whitelist. If enabled and enforce-whitelist is set, kicks non-whitelisted players. |

## Type Details

### `op-entry` {#type-op-entry}

Represents an operator entry in the ops configuration.

**Record fields**

| Name | WIT type |
| --- | --- |
| `uuid` | `uuid` |
| `name` | `string` |
| `level` | `permission-level` |
| `bypasses-player-limit` | `bool` |

### `op-manager` {#type-op-manager}

Interface for querying and managing server operators.

Methods: [`is-op`](#operation-op-manager-is-op), [`get-op`](#operation-op-manager-get-op), [`get-permission-level`](#operation-op-manager-get-permission-level), [`op-player`](#operation-op-manager-op-player), [`deop-player`](#operation-op-manager-deop-player), [`list-ops`](#operation-op-manager-list-ops).

### `banned-player-entry` {#type-banned-player-entry}

Represents a banned player entry in the ban list.

**Record fields**

| Name | WIT type |
| --- | --- |
| `uuid` | `uuid` |
| `name` | `string` |
| `created` | `string` |
| `source` | `string` |
| `expires` | `option<string>` |
| `reason` | `string` |

### `banned-ip-entry` {#type-banned-ip-entry}

Represents a banned IP entry in the IP ban list.

**Record fields**

| Name | WIT type |
| --- | --- |
| `ip` | `string` |
| `created` | `string` |
| `source` | `string` |
| `expires` | `option<string>` |
| `reason` | `string` |

### `ban-manager` {#type-ban-manager}

Global manager for player and IP bans.

Methods: [`is-player-banned`](#operation-ban-manager-is-player-banned), [`get-player-ban`](#operation-ban-manager-get-player-ban), [`ban-player`](#operation-ban-manager-ban-player), [`unban-player`](#operation-ban-manager-unban-player), [`list-player-bans`](#operation-ban-manager-list-player-bans), [`is-ip-banned`](#operation-ban-manager-is-ip-banned), [`get-ip-ban`](#operation-ban-manager-get-ip-ban), [`ban-ip`](#operation-ban-manager-ban-ip), [`unban-ip`](#operation-ban-manager-unban-ip), [`list-ip-bans`](#operation-ban-manager-list-ip-bans).

### `whitelist-entry` {#type-whitelist-entry}

Represents a player entry in the server whitelist.

**Record fields**

| Name | WIT type |
| --- | --- |
| `uuid` | `uuid` |
| `name` | `string` |

### `whitelist-manager` {#type-whitelist-manager}

Global manager for the server whitelist.

Methods: [`is-enabled`](#operation-whitelist-manager-is-enabled), [`set-enabled`](#operation-whitelist-manager-set-enabled), [`is-whitelisted`](#operation-whitelist-manager-is-whitelisted), [`add-player`](#operation-whitelist-manager-add-player), [`remove-player`](#operation-whitelist-manager-remove-player), [`list-entries`](#operation-whitelist-manager-list-entries).

### `difficulty` {#type-difficulty}

Represents the difficulty setting of a Minecraft server.

**Enum cases**

| Name | Description |
| --- | --- |
| `peaceful` | Hostile mobs do not spawn. Players regain health automatically. |
| `easy` | Hostile mobs deal less damage. |
| `normal` | Standard Minecraft difficulty. |
| `hard` | Hostile mobs deal more damage. |

### `dimension` {#type-dimension}

Represents the three main Minecraft dimensions.

**Enum cases**

| Name |
| --- |
| `overworld` |
| `nether` |
| `end` |

### `sys-info` {#type-sys-info}

**Record fields**

| Name | WIT type |
| --- | --- |
| `cpu-count` | `option<u32>` |
| `total-memory` | `option<u64>` |
| `used-memory` | `option<u64>` |
| `os-name` | `option<string>` |
| `os-version` | `option<string>` |
| `pumpkin-version` | `string` |

### `command-sender` {#type-command-sender}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `console` |  |
| `player` | `player` |

### `server` {#type-server}

Represents the global server instance.

Methods: [`get-sys-info`](#operation-server-get-sys-info), [`get-difficulty`](#operation-server-get-difficulty), [`get-player-count`](#operation-server-get-player-count), [`get-mspt`](#operation-server-get-mspt), [`get-tps`](#operation-server-get-tps), [`get-all-players`](#operation-server-get-all-players), [`get-player-by-name`](#operation-server-get-player-by-name), [`get-player-by-uuid`](#operation-server-get-player-by-uuid), [`get-all-worlds`](#operation-server-get-all-worlds), [`get-world-by-name`](#operation-server-get-world-by-name), [`has-world`](#operation-server-has-world), [`execute-command`](#operation-server-execute-command), [`create-world`](#operation-server-create-world), [`unload-world`](#operation-server-unload-world), [`save-all`](#operation-server-save-all), [`get-players-in-world`](#operation-server-get-players-in-world), [`get-player-count-in-world`](#operation-server-get-player-count-in-world), [`broadcast`](#operation-server-broadcast), [`delete-message-by-signature`](#operation-server-delete-message-by-signature), [`delete-message-by-id`](#operation-server-delete-message-by-id), [`broadcast-tab-list-header-footer`](#operation-server-broadcast-tab-list-header-footer), [`get-max-players`](#operation-server-get-max-players), [`is-hardcore`](#operation-server-is-hardcore), [`is-online-mode`](#operation-server-is-online-mode), [`get-motd`](#operation-server-get-motd), [`has-whitelist`](#operation-server-has-whitelist), [`get-allow-nether`](#operation-server-get-allow-nether), [`get-allow-end`](#operation-server-get-allow-end), [`get-view-distance`](#operation-server-get-view-distance), [`get-simulation-distance`](#operation-server-get-simulation-distance), [`get-default-gamemode`](#operation-server-get-default-gamemode), [`get-recipe-manager`](#operation-server-get-recipe-manager), [`get-op-manager`](#operation-server-get-op-manager), [`get-ban-manager`](#operation-server-get-ban-manager), [`get-whitelist-manager`](#operation-server-get-whitelist-manager), [`get-advancement`](#operation-server-get-advancement), [`get-all-advancement-ids`](#operation-server-get-all-advancement-ids), [`get-enchantment-manager`](#operation-server-get-enchantment-manager), [`get-enchantment`](#operation-server-get-enchantment), [`get-all-enchantment-ids`](#operation-server-get-all-enchantment-ids), [`get-datapack-manager`](#operation-server-get-datapack-manager), [`set-server-links`](#operation-server-set-server-links).

## Operation Details

### `op-manager.is-op` {#operation-op-manager-is-op}

```text
is-op: func(id: uuid) -> bool;
```

Checks if a player UUID is currently an operator.

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `uuid` |

**Returns:** `bool`

### `op-manager.get-op` {#operation-op-manager-get-op}

```text
get-op: func(id: uuid) -> option<op-entry>;
```

Retrieves the operator entry for a player UUID, if present.

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `uuid` |

**Returns:** `option<op-entry>`

### `op-manager.get-permission-level` {#operation-op-manager-get-permission-level}

```text
get-permission-level: func(id: uuid) -> permission-level;
```

Gets the effective permission level for a player UUID (returns zero if not op).

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `uuid` |

**Returns:** `permission-level`

### `op-manager.op-player` {#operation-op-manager-op-player}

```text
op-player: func(name: string, id: uuid, level: permission-level, bypasses-player-limit: bool);
```

Grants operator status to a player (online or offline) with the specified level and bypass setting.

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `id` | `uuid` |
| `level` | `permission-level` |
| `bypasses-player-limit` | `bool` |

### `op-manager.deop-player` {#operation-op-manager-deop-player}

```text
deop-player: func(id: uuid) -> bool;
```

Revokes operator status from a player (online or offline). Returns true if the player was previously op.

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `uuid` |

**Returns:** `bool`

### `op-manager.list-ops` {#operation-op-manager-list-ops}

```text
list-ops: func() -> list<op-entry>;
```

Returns a list of all operator entries on the server.

**Returns:** `list<op-entry>`

### `ban-manager.is-player-banned` {#operation-ban-manager-is-player-banned}

```text
is-player-banned: func(id: uuid) -> bool;
```

Checks if a player UUID is currently banned.

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `uuid` |

**Returns:** `bool`

### `ban-manager.get-player-ban` {#operation-ban-manager-get-player-ban}

```text
get-player-ban: func(id: uuid) -> option<banned-player-entry>;
```

Retrieves the ban entry for a player UUID, if banned.

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `uuid` |

**Returns:** `option<banned-player-entry>`

### `ban-manager.ban-player` {#operation-ban-manager-ban-player}

```text
ban-player: func(name: string, id: uuid, options: ban-player-options);
```

Bans a player by name and UUID with the specified options (works for online and offline players).

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `id` | `uuid` |
| `options` | `ban-player-options` |

### `ban-manager.unban-player` {#operation-ban-manager-unban-player}

```text
unban-player: func(id: uuid) -> bool;
```

Removes a player ban by UUID. Returns true if the player was banned.

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `uuid` |

**Returns:** `bool`

### `ban-manager.list-player-bans` {#operation-ban-manager-list-player-bans}

```text
list-player-bans: func() -> list<banned-player-entry>;
```

Returns all currently active player bans.

**Returns:** `list<banned-player-entry>`

### `ban-manager.is-ip-banned` {#operation-ban-manager-is-ip-banned}

```text
is-ip-banned: func(ip: string) -> bool;
```

Checks if an IP address is currently banned.

**Parameters**

| Name | WIT type |
| --- | --- |
| `ip` | `string` |

**Returns:** `bool`

### `ban-manager.get-ip-ban` {#operation-ban-manager-get-ip-ban}

```text
get-ip-ban: func(ip: string) -> option<banned-ip-entry>;
```

Retrieves the ban entry for an IP address, if banned.

**Parameters**

| Name | WIT type |
| --- | --- |
| `ip` | `string` |

**Returns:** `option<banned-ip-entry>`

### `ban-manager.ban-ip` {#operation-ban-manager-ban-ip}

```text
ban-ip: func(ip: string, options: ban-ip-options);
```

Bans an IP address with the specified options.

**Parameters**

| Name | WIT type |
| --- | --- |
| `ip` | `string` |
| `options` | `ban-ip-options` |

### `ban-manager.unban-ip` {#operation-ban-manager-unban-ip}

```text
unban-ip: func(ip: string) -> bool;
```

Removes an IP ban. Returns true if the IP was banned.

**Parameters**

| Name | WIT type |
| --- | --- |
| `ip` | `string` |

**Returns:** `bool`

### `ban-manager.list-ip-bans` {#operation-ban-manager-list-ip-bans}

```text
list-ip-bans: func() -> list<banned-ip-entry>;
```

Returns all currently active IP bans.

**Returns:** `list<banned-ip-entry>`

### `whitelist-manager.is-enabled` {#operation-whitelist-manager-is-enabled}

```text
is-enabled: func() -> bool;
```

Returns whether the whitelist is currently enabled.

**Returns:** `bool`

### `whitelist-manager.set-enabled` {#operation-whitelist-manager-set-enabled}

```text
set-enabled: func(enabled: bool);
```

Enables or disables the server whitelist. If enabled and enforce-whitelist is set, kicks non-whitelisted players.

**Parameters**

| Name | WIT type |
| --- | --- |
| `enabled` | `bool` |

### `whitelist-manager.is-whitelisted` {#operation-whitelist-manager-is-whitelisted}

```text
is-whitelisted: func(id: uuid) -> bool;
```

Checks if a player UUID is on the whitelist.

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `uuid` |

**Returns:** `bool`

### `whitelist-manager.add-player` {#operation-whitelist-manager-add-player}

```text
add-player: func(name: string, id: uuid) -> bool;
```

Adds a player to the whitelist (online or offline). Returns true if newly added.

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `id` | `uuid` |

**Returns:** `bool`

### `whitelist-manager.remove-player` {#operation-whitelist-manager-remove-player}

```text
remove-player: func(id: uuid) -> bool;
```

Removes a player from the whitelist. Returns true if the player was on the whitelist.

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `uuid` |

**Returns:** `bool`

### `whitelist-manager.list-entries` {#operation-whitelist-manager-list-entries}

```text
list-entries: func() -> list<whitelist-entry>;
```

Returns all whitelisted player entries.

**Returns:** `list<whitelist-entry>`

### `server.get-sys-info` {#operation-server-get-sys-info}

```text
get-sys-info: func() -> sys-info;
```

Returns system information (CPU, Memory, OS).
Fields are returned only if the plugin has the corresponding permissions.

**Returns:** `sys-info`

### `server.get-difficulty` {#operation-server-get-difficulty}

```text
get-difficulty: func() -> difficulty;
```

Returns the current difficulty level of the server.

**Returns:** `difficulty`

### `server.get-player-count` {#operation-server-get-player-count}

```text
get-player-count: func() -> u32;
```

Returns the total number of players currently connected to the server.

**Returns:** `u32`

### `server.get-mspt` {#operation-server-get-mspt}

```text
get-mspt: func() -> f64;
```

Returns the rolling average Milliseconds Per Tick (MSPT).
A value below 50.0 is required for a stable 20 TPS.

**Returns:** `f64`

### `server.get-tps` {#operation-server-get-tps}

```text
get-tps: func() -> f64;
```

Returns the effective Ticks Per Second (TPS).
Ideal value is 20.0.

**Returns:** `f64`

### `server.get-all-players` {#operation-server-get-all-players}

```text
get-all-players: func() -> list<player>;
```

Returns a list of all online players across all worlds.

**Returns:** `list<player>`

### `server.get-player-by-name` {#operation-server-get-player-by-name}

```text
get-player-by-name: func(name: string) -> option<player>;
```

Searches for a player by their exact name.

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |

**Returns:** `option<player>`

### `server.get-player-by-uuid` {#operation-server-get-player-by-uuid}

```text
get-player-by-uuid: func(id: uuid) -> option<player>;
```

Searches for a player by their UUID string.

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `uuid` |

**Returns:** `option<player>`

### `server.get-all-worlds` {#operation-server-get-all-worlds}

```text
get-all-worlds: func() -> list<%world>;
```

Returns a list of all worlds on this server.

**Returns:** `list<%world>`

### `server.get-world-by-name` {#operation-server-get-world-by-name}

```text
get-world-by-name: func(name: string) -> option<%world>;
```

Gets a world by its dimension name (e.g., "minecraft:overworld") or custom world name (e.g., "world", "arena_1").

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |

**Returns:** `option<%world>`

### `server.has-world` {#operation-server-has-world}

```text
has-world: func(name: string) -> bool;
```

Checks if a world exists by name or dimension.

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |

**Returns:** `bool`

### `server.execute-command` {#operation-server-execute-command}

```text
execute-command: func(command: string, sender: command-sender);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `command` | `string` |
| `sender` | `command-sender` |

### `server.create-world` {#operation-server-create-world}

```text
create-world: func(name: string, dimension: dimension) -> %world;
```

Creates or loads a world by its name and dimension.
If a world with the given name already exists, it will be returned.

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `dimension` | `dimension` |

**Returns:** `%world`

### `server.unload-world` {#operation-server-unload-world}

```text
unload-world: func(name: string) -> result<_, string>;
```

Unloads and saves a world by its name or dimension.
Returns an error if the world cannot be found, is the primary/default world, or still has players inside.

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |

**Returns:** `result<_, string>`

### `server.save-all` {#operation-server-save-all}

```text
save-all: func() -> result<_, string>;
```

Saves all players, player advancements, and loaded worlds to disk.

**Returns:** `result<_, string>`

### `server.get-players-in-world` {#operation-server-get-players-in-world}

```text
get-players-in-world: func(world-ref: %world) -> list<player>;
```

Returns a list of all online players in a specific world.

**Parameters**

| Name | WIT type |
| --- | --- |
| `world-ref` | `%world` |

**Returns:** `list<player>`

### `server.get-player-count-in-world` {#operation-server-get-player-count-in-world}

```text
get-player-count-in-world: func(world-ref: %world) -> u32;
```

Returns the number of online players in a specific world.

**Parameters**

| Name | WIT type |
| --- | --- |
| `world-ref` | `%world` |

**Returns:** `u32`

### `server.broadcast` {#operation-server-broadcast}

```text
broadcast: func(message: string);
```

Broadcasts a system chat message to all players.

**Parameters**

| Name | WIT type |
| --- | --- |
| `message` | `string` |

### `server.delete-message-by-signature` {#operation-server-delete-message-by-signature}

```text
delete-message-by-signature: func(signature: list<u8>);
```

Deletes a signed chat message from all players' chat windows using its 256-byte signature.

**Parameters**

| Name | WIT type |
| --- | --- |
| `signature` | `list<u8>` |

### `server.delete-message-by-id` {#operation-server-delete-message-by-id}

```text
delete-message-by-id: func(signature-id: s32);
```

Deletes a signed chat message from all players' chat windows using its signature cache ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `signature-id` | `s32` |

### `server.broadcast-tab-list-header-footer` {#operation-server-broadcast-tab-list-header-footer}

```text
broadcast-tab-list-header-footer: func(header: text-component, footer: text-component);
```

Broadcasts a tab list header and footer to all players.

**Parameters**

| Name | WIT type |
| --- | --- |
| `header` | `text-component` |
| `footer` | `text-component` |

### `server.get-max-players` {#operation-server-get-max-players}

```text
get-max-players: func() -> u32;
```

Returns the maximum number of players allowed on the server.

**Returns:** `u32`

### `server.is-hardcore` {#operation-server-is-hardcore}

```text
is-hardcore: func() -> bool;
```

Returns whether the server is in hardcore mode.

**Returns:** `bool`

### `server.is-online-mode` {#operation-server-is-online-mode}

```text
is-online-mode: func() -> bool;
```

Returns whether the server is in online mode (authenticates with Mojang).

**Returns:** `bool`

### `server.get-motd` {#operation-server-get-motd}

```text
get-motd: func() -> string;
```

Returns the server's Message of the Day (MOTD).

**Returns:** `string`

### `server.has-whitelist` {#operation-server-has-whitelist}

```text
has-whitelist: func() -> bool;
```

Returns whether the server has a whitelist enabled.

**Returns:** `bool`

### `server.get-allow-nether` {#operation-server-get-allow-nether}

```text
get-allow-nether: func() -> bool;
```

Returns whether the server allows the Nether dimension.

**Returns:** `bool`

### `server.get-allow-end` {#operation-server-get-allow-end}

```text
get-allow-end: func() -> bool;
```

Returns whether the server allows the End dimension.

**Returns:** `bool`

### `server.get-view-distance` {#operation-server-get-view-distance}

```text
get-view-distance: func() -> u8;
```

Returns the server's maximum view distance.

**Returns:** `u8`

### `server.get-simulation-distance` {#operation-server-get-simulation-distance}

```text
get-simulation-distance: func() -> u8;
```

Returns the server's maximum simulation distance.

**Returns:** `u8`

### `server.get-default-gamemode` {#operation-server-get-default-gamemode}

```text
get-default-gamemode: func() -> game-mode;
```

Returns the server's default gamemode.

**Returns:** `game-mode`

### `server.get-recipe-manager` {#operation-server-get-recipe-manager}

```text
get-recipe-manager: func() -> recipe-manager;
```

Returns the recipe manager to register custom recipes.

**Returns:** `recipe-manager`

### `server.get-op-manager` {#operation-server-get-op-manager}

```text
get-op-manager: func() -> op-manager;
```

Returns the operator manager to query or modify server operators.

**Returns:** `op-manager`

### `server.get-ban-manager` {#operation-server-get-ban-manager}

```text
get-ban-manager: func() -> ban-manager;
```

Returns the global ban manager for querying and modifying player and IP bans.

**Returns:** `ban-manager`

### `server.get-whitelist-manager` {#operation-server-get-whitelist-manager}

```text
get-whitelist-manager: func() -> whitelist-manager;
```

Returns the global whitelist manager for querying and modifying the server whitelist.

**Returns:** `whitelist-manager`

### `server.get-advancement` {#operation-server-get-advancement}

```text
get-advancement: func(id: string) -> option<advancement-info>;
```

Returns detailed information about an advancement by its ID (e.g., "minecraft:story/mine_stone" or "story/mine_stone").

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `string` |

**Returns:** `option<advancement-info>`

### `server.get-all-advancement-ids` {#operation-server-get-all-advancement-ids}

```text
get-all-advancement-ids: func() -> list<string>;
```

Returns a list of all registered advancement IDs on the server.

**Returns:** `list<string>`

### `server.get-enchantment-manager` {#operation-server-get-enchantment-manager}

```text
get-enchantment-manager: func() -> enchantment-manager;
```

Returns the global enchantment manager for registering and querying custom enchantments.

**Returns:** `enchantment-manager`

### `server.get-enchantment` {#operation-server-get-enchantment}

```text
get-enchantment: func(id: string) -> option<custom-enchantment>;
```

Returns information about an enchantment by its ID (vanilla or custom).

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `string` |

**Returns:** `option<custom-enchantment>`

### `server.get-all-enchantment-ids` {#operation-server-get-all-enchantment-ids}

```text
get-all-enchantment-ids: func() -> list<string>;
```

Returns a list of all registered enchantment IDs (custom and vanilla) on the server.

**Returns:** `list<string>`

### `server.get-datapack-manager` {#operation-server-get-datapack-manager}

```text
get-datapack-manager: func() -> datapack-manager;
```

Returns the global datapack manager for inspecting, enabling, disabling, and reloading datapacks.

**Returns:** `datapack-manager`

### `server.set-server-links` {#operation-server-set-server-links}

```text
set-server-links: func(links: list<server-link>);
```

Broadcasts custom server links to all connected players (displayed in the client Esc pause menu in 1.21+).

**Parameters**

| Name | WIT type |
| --- | --- |
| `links` | `list<server-link>` |
