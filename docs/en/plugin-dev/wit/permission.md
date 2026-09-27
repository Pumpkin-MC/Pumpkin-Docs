---
title: Interface permission
outline: [2, 2]
---

# Interface `permission`

Shared types: `pumpkin:plugin/permission@0.1.0`

[Package summary](./)

Source: [permission.wit](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/blob/master/v0.1/permission.wit)

Permission definitions and defaults.

## Type Summary

| Kind | Type | Description |
| --- | --- | --- |
| record | [`permission`](#type-permission) | Defines a permission node in the system |
| record | [`permission-child`](#type-permission-child) | A child permission entry |
| variant | [`permission-default`](#type-permission-default) | Describes the default behavior for permissions |
| enum | [`permission-level`](#type-permission-level) | Represents the player's permission level |

## Type Details

### `permission-level` {#type-permission-level}

Represents the player's permission level

Permission levels determine the player's access to commands and server operations.
Each numeric level corresponds to a specific role:
- `Zero`: `normal`: Player can use basic commands.
- `One`: `moderator`: Player can bypass spawn protection.
- `Two`: `gamemaster`: Player or executor can use more commands and player can use command blocks.
- `Three`:  `admin`: Player or executor can use commands related to multiplayer management.
- `Four`: `owner`: Player or executor can use all of the commands, including commands related to server management.

**Enum cases**

| Name |
| --- |
| `zero` |
| `one` |
| `two` |
| `three` |
| `four` |

### `permission-default` {#type-permission-default}

Describes the default behavior for permissions

**Variant cases**

| Name | WIT type | Description |
| --- | --- | --- |
| `deny` |  | Permission is not granted by default |
| `allow` |  | Permission is granted by default |
| `op` | `permission-level` | Permission is granted by default to operators |

### `permission-child` {#type-permission-child}

A child permission entry

**Record fields**

| Name | WIT type |
| --- | --- |
| `node` | `string` |
| `value` | `bool` |

### `permission` {#type-permission}

Defines a permission node in the system

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `node` | `string` | The full node name (e.g., "minecraft:command.gamemode") |
| `description` | `string` | Description of what this permission does |
| `default` | `permission-default` | The default value of this permission |
| `children` | `list<permission-child>` | Children nodes that are affected by this permission |
