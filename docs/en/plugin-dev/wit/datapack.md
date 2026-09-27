---
title: Interface datapack
outline: [2, 2]
---

# Interface `datapack`

Host import: `pumpkin:plugin/datapack@0.1.0`

[Package summary](./)

Source: [datapack.wit](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/blob/master/v0.1/datapack.wit)

Datapack inspection and management.

## Type Summary

| Kind | Type | Description |
| --- | --- | --- |
| record | [`datapack-info`](#type-datapack-info) | Information about a discovered or loaded datapack. |
| resource | [`datapack-manager`](#type-datapack-manager) | Global manager for inspecting and controlling server datapacks. |
| variant | [`enable-position`](#type-enable-position) | Position options for enabling a datapack relative to other packs. |

## Operation Summary

| Scope | Operation | Description |
| --- | --- | --- |
| `datapack-manager` | [`disable-pack`](#operation-datapack-manager-disable-pack) | Disables an enabled datapack. |
| `datapack-manager` | [`enable-pack`](#operation-datapack-manager-enable-pack) | Enables a datapack with a specific priority position. |
| `datapack-manager` | [`execute-function`](#operation-datapack-manager-execute-function) | Executes a datapack function or function tag (e.g. "namespace:fn" or "#namespace:tag"). |
| `datapack-manager` | [`get-pack`](#operation-datapack-manager-get-pack) | Retrieves details about a specific datapack by name or ID. |
| `datapack-manager` | [`is-enabled`](#operation-datapack-manager-is-enabled) | Checks if a datapack is currently enabled. |
| `datapack-manager` | [`list-all-packs`](#operation-datapack-manager-list-all-packs) | Returns all known datapacks (both enabled and available/disabled). |
| `datapack-manager` | [`list-available-packs`](#operation-datapack-manager-list-available-packs) | Returns available (disabled) datapacks. |
| `datapack-manager` | [`list-enabled-packs`](#operation-datapack-manager-list-enabled-packs) | Returns only currently enabled datapacks. |
| `datapack-manager` | [`reload`](#operation-datapack-manager-reload) | Reloads all enabled datapacks, recipes, and function tags, |

## Type Details

### `datapack-info` {#type-datapack-info}

Information about a discovered or loaded datapack.

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `string` |
| `name` | `string` |
| `description` | `string` |
| `pack-format` | `u32` |
| `is-enabled` | `bool` |
| `recipe-count` | `u32` |
| `function-count` | `u32` |

### `enable-position` {#type-enable-position}

Position options for enabling a datapack relative to other packs.

**Variant cases**

| Name | WIT type |
| --- | --- |
| `first` |  |
| `last` |  |
| `before` | `string` |
| `after` | `string` |

### `datapack-manager` {#type-datapack-manager}

Global manager for inspecting and controlling server datapacks.

Methods: [`list-all-packs`](#operation-datapack-manager-list-all-packs), [`list-enabled-packs`](#operation-datapack-manager-list-enabled-packs), [`list-available-packs`](#operation-datapack-manager-list-available-packs), [`get-pack`](#operation-datapack-manager-get-pack), [`is-enabled`](#operation-datapack-manager-is-enabled), [`enable-pack`](#operation-datapack-manager-enable-pack), [`disable-pack`](#operation-datapack-manager-disable-pack), [`reload`](#operation-datapack-manager-reload), [`execute-function`](#operation-datapack-manager-execute-function).

## Operation Details

### `datapack-manager.list-all-packs` {#operation-datapack-manager-list-all-packs}

```text
list-all-packs: func() -> list<datapack-info>;
```

Returns all known datapacks (both enabled and available/disabled).

**Returns:** `list<datapack-info>`

### `datapack-manager.list-enabled-packs` {#operation-datapack-manager-list-enabled-packs}

```text
list-enabled-packs: func() -> list<datapack-info>;
```

Returns only currently enabled datapacks.

**Returns:** `list<datapack-info>`

### `datapack-manager.list-available-packs` {#operation-datapack-manager-list-available-packs}

```text
list-available-packs: func() -> list<datapack-info>;
```

Returns available (disabled) datapacks.

**Returns:** `list<datapack-info>`

### `datapack-manager.get-pack` {#operation-datapack-manager-get-pack}

```text
get-pack: func(name: string) -> option<datapack-info>;
```

Retrieves details about a specific datapack by name or ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |

**Returns:** `option<datapack-info>`

### `datapack-manager.is-enabled` {#operation-datapack-manager-is-enabled}

```text
is-enabled: func(name: string) -> bool;
```

Checks if a datapack is currently enabled.

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |

**Returns:** `bool`

### `datapack-manager.enable-pack` {#operation-datapack-manager-enable-pack}

```text
enable-pack: func(name: string, position: enable-position) -> result<_, string>;
```

Enables a datapack with a specific priority position.

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `position` | `enable-position` |

**Returns:** `result<_, string>`

### `datapack-manager.disable-pack` {#operation-datapack-manager-disable-pack}

```text
disable-pack: func(name: string) -> result<_, string>;
```

Disables an enabled datapack.

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |

**Returns:** `result<_, string>`

### `datapack-manager.reload` {#operation-datapack-manager-reload}

```text
reload: func() -> result<_, string>;
```

Reloads all enabled datapacks, recipes, and function tags,
synchronizes recipes with online players, and triggers `#minecraft:load`.

**Returns:** `result<_, string>`

### `datapack-manager.execute-function` {#operation-datapack-manager-execute-function}

```text
execute-function: func(name: string) -> result<u32, string>;
```

Executes a datapack function or function tag (e.g. "namespace:fn" or "#namespace:tag").
Returns the number of commands executed.

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |

**Returns:** `result<u32, string>`
