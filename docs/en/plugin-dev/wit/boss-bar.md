---
title: Interface boss-bar
outline: [2, 2]
---

# Interface `boss-bar`

Host import: `pumpkin:plugin/boss-bar@0.1.0`

[Package summary](./)

Source: [boss-bar.wit](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/blob/master/v0.1/boss-bar.wit)

Boss bar creation and updates.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`text`](./text) | `text-component` |
| [`player`](./player) | `player` |

## Type Summary

| Kind | Type | Description |
| --- | --- | --- |
| resource | [`boss-bar`](#type-boss-bar) | Represents a boss bar that can be shown to players. |
| enum | [`boss-bar-color`](#type-boss-bar-color) | Represents the color of a boss bar. |
| enum | [`boss-bar-division`](#type-boss-bar-division) | Represents the notches/divisions of a boss bar. |
| record | [`boss-bar-metadata`](#type-boss-bar-metadata) | Metadata flags that can be toggled on a boss bar. |

## Operation Summary

| Scope | Operation | Description |
| --- | --- | --- |
| `boss-bar` | [`add-player`](#operation-boss-bar-add-player) | Adds a player to this boss bar, making it visible to them. |
| `boss-bar` | [`constructor`](#operation-boss-bar-constructor) | Creates a new boss bar. |
| `boss-bar` | [`get-color`](#operation-boss-bar-get-color) | Returns the color of this boss bar. |
| `boss-bar` | [`get-division`](#operation-boss-bar-get-division) | Returns the division of this boss bar. |
| `boss-bar` | [`get-health`](#operation-boss-bar-get-health) | Returns the health (0.0 to 1.0) of this boss bar. |
| `boss-bar` | [`get-metadata`](#operation-boss-bar-get-metadata) | Returns the currently active metadata on this boss bar. |
| `boss-bar` | [`get-players`](#operation-boss-bar-get-players) | Returns a list of all players currently seeing this boss bar. |
| `boss-bar` | [`get-title`](#operation-boss-bar-get-title) | Returns the title of this boss bar. |
| `boss-bar` | [`remove-all`](#operation-boss-bar-remove-all) | Removes this boss bar from all players and cleans it up. |
| `boss-bar` | [`remove-player`](#operation-boss-bar-remove-player) | Removes a player from this boss bar, hiding it from them. |
| `boss-bar` | [`set-color`](#operation-boss-bar-set-color) | Sets the color of this boss bar. |
| `boss-bar` | [`set-division`](#operation-boss-bar-set-division) | Sets the division of this boss bar. |
| `boss-bar` | [`set-health`](#operation-boss-bar-set-health) | Sets the health (0.0 to 1.0) of this boss bar. |
| `boss-bar` | [`set-metadata`](#operation-boss-bar-set-metadata) | Updates the metadata on this boss bar. |
| `boss-bar` | [`set-title`](#operation-boss-bar-set-title) | Sets the title of this boss bar. |

## Type Details

### `boss-bar-color` {#type-boss-bar-color}

Represents the color of a boss bar.

**Enum cases**

| Name |
| --- |
| `pink` |
| `blue` |
| `red` |
| `green` |
| `yellow` |
| `purple` |
| `white` |

### `boss-bar-division` {#type-boss-bar-division}

Represents the notches/divisions of a boss bar.

**Enum cases**

| Name |
| --- |
| `no-division` |
| `notches-6` |
| `notches-10` |
| `notches-12` |
| `notches-20` |

### `boss-bar-metadata` {#type-boss-bar-metadata}

Metadata flags that can be toggled on a boss bar.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `darken-sky` | `bool` | Darkens the sky for players who see the boss bar. |
| `dragon-bar` | `bool` | If true, the bar is considered a "dragon bar" (used for Ender Dragon). |
| `create-fog` | `bool` | If true, fog is created around the players who see the boss bar. |

### `boss-bar` {#type-boss-bar}

Represents a boss bar that can be shown to players.

Methods: [`constructor`](#operation-boss-bar-constructor), [`get-title`](#operation-boss-bar-get-title), [`set-title`](#operation-boss-bar-set-title), [`get-health`](#operation-boss-bar-get-health), [`set-health`](#operation-boss-bar-set-health), [`get-color`](#operation-boss-bar-get-color), [`set-color`](#operation-boss-bar-set-color), [`get-division`](#operation-boss-bar-get-division), [`set-division`](#operation-boss-bar-set-division), [`get-metadata`](#operation-boss-bar-get-metadata), [`set-metadata`](#operation-boss-bar-set-metadata), [`add-player`](#operation-boss-bar-add-player), [`remove-player`](#operation-boss-bar-remove-player), [`get-players`](#operation-boss-bar-get-players), [`remove-all`](#operation-boss-bar-remove-all).

## Operation Details

### `boss-bar.constructor` {#operation-boss-bar-constructor}

```text
constructor(title: text-component, color: boss-bar-color, division: boss-bar-division);
```

Creates a new boss bar.

**Parameters**

| Name | WIT type |
| --- | --- |
| `title` | `text-component` |
| `color` | `boss-bar-color` |
| `division` | `boss-bar-division` |

### `boss-bar.get-title` {#operation-boss-bar-get-title}

```text
get-title: func() -> text-component;
```

Returns the title of this boss bar.

**Returns:** `text-component`

### `boss-bar.set-title` {#operation-boss-bar-set-title}

```text
set-title: func(title: text-component);
```

Sets the title of this boss bar.

**Parameters**

| Name | WIT type |
| --- | --- |
| `title` | `text-component` |

### `boss-bar.get-health` {#operation-boss-bar-get-health}

```text
get-health: func() -> f32;
```

Returns the health (0.0 to 1.0) of this boss bar.

**Returns:** `f32`

### `boss-bar.set-health` {#operation-boss-bar-set-health}

```text
set-health: func(health: f32);
```

Sets the health (0.0 to 1.0) of this boss bar.

**Parameters**

| Name | WIT type |
| --- | --- |
| `health` | `f32` |

### `boss-bar.get-color` {#operation-boss-bar-get-color}

```text
get-color: func() -> boss-bar-color;
```

Returns the color of this boss bar.

**Returns:** `boss-bar-color`

### `boss-bar.set-color` {#operation-boss-bar-set-color}

```text
set-color: func(color: boss-bar-color);
```

Sets the color of this boss bar.

**Parameters**

| Name | WIT type |
| --- | --- |
| `color` | `boss-bar-color` |

### `boss-bar.get-division` {#operation-boss-bar-get-division}

```text
get-division: func() -> boss-bar-division;
```

Returns the division of this boss bar.

**Returns:** `boss-bar-division`

### `boss-bar.set-division` {#operation-boss-bar-set-division}

```text
set-division: func(division: boss-bar-division);
```

Sets the division of this boss bar.

**Parameters**

| Name | WIT type |
| --- | --- |
| `division` | `boss-bar-division` |

### `boss-bar.get-metadata` {#operation-boss-bar-get-metadata}

```text
get-metadata: func() -> boss-bar-metadata;
```

Returns the currently active metadata on this boss bar.

**Returns:** `boss-bar-metadata`

### `boss-bar.set-metadata` {#operation-boss-bar-set-metadata}

```text
set-metadata: func(metadata: boss-bar-metadata);
```

Updates the metadata on this boss bar.

**Parameters**

| Name | WIT type |
| --- | --- |
| `metadata` | `boss-bar-metadata` |

### `boss-bar.add-player` {#operation-boss-bar-add-player}

```text
add-player: func(player: player);
```

Adds a player to this boss bar, making it visible to them.

**Parameters**

| Name | WIT type |
| --- | --- |
| `player` | `player` |

### `boss-bar.remove-player` {#operation-boss-bar-remove-player}

```text
remove-player: func(player: player);
```

Removes a player from this boss bar, hiding it from them.

**Parameters**

| Name | WIT type |
| --- | --- |
| `player` | `player` |

### `boss-bar.get-players` {#operation-boss-bar-get-players}

```text
get-players: func() -> list<player>;
```

Returns a list of all players currently seeing this boss bar.

**Returns:** `list<player>`

### `boss-bar.remove-all` {#operation-boss-bar-remove-all}

```text
remove-all: func();
```

Removes this boss bar from all players and cleans it up.
