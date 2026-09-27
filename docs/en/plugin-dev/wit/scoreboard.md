---
title: Interface scoreboard
outline: [2, 2]
---

# Interface `scoreboard`

Host import: `pumpkin:plugin/scoreboard@0.1.0`

[Package summary](./)

Source: [scoreboard.wit](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/scoreboard.wit)

Scoreboards, objectives, and scores.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`text`](./text) | `text-component` |
| [`common`](./common) | `named-color` |

## Type Summary

| Kind | Type |
| --- | --- |
| enum | [`bedrock-display-slot`](#type-bedrock-display-slot) |
| resource | [`bedrock-scoreboard`](#type-bedrock-scoreboard) |
| enum | [`bedrock-sort-order`](#type-bedrock-sort-order) |
| enum | [`collision-rule`](#type-collision-rule) |
| enum | [`display-slot`](#type-display-slot) |
| enum | [`nametag-visibility`](#type-nametag-visibility) |
| variant | [`number-format`](#type-number-format) |
| enum | [`render-type`](#type-render-type) |
| resource | [`scoreboard`](#type-scoreboard) |
| record | [`team-settings`](#type-team-settings) |

## Operation Summary

| Scope | Operation |
| --- | --- |
| `bedrock-scoreboard` | [`add-objective`](#operation-bedrock-scoreboard-add-objective) |
| `bedrock-scoreboard` | [`add-score`](#operation-bedrock-scoreboard-add-score) |
| `bedrock-scoreboard` | [`clear-display-slot`](#operation-bedrock-scoreboard-clear-display-slot) |
| `bedrock-scoreboard` | [`remove-objective`](#operation-bedrock-scoreboard-remove-objective) |
| `bedrock-scoreboard` | [`remove-score`](#operation-bedrock-scoreboard-remove-score) |
| `bedrock-scoreboard` | [`reset-entity-scores`](#operation-bedrock-scoreboard-reset-entity-scores) |
| `bedrock-scoreboard` | [`set-display-slot`](#operation-bedrock-scoreboard-set-display-slot) |
| `bedrock-scoreboard` | [`update-objective`](#operation-bedrock-scoreboard-update-objective) |
| `bedrock-scoreboard` | [`update-score`](#operation-bedrock-scoreboard-update-score) |
| `scoreboard` | [`add-objective`](#operation-scoreboard-add-objective) |
| `scoreboard` | [`add-player-to-team`](#operation-scoreboard-add-player-to-team) |
| `scoreboard` | [`add-score`](#operation-scoreboard-add-score) |
| `scoreboard` | [`clear-display-slot`](#operation-scoreboard-clear-display-slot) |
| `scoreboard` | [`clear-team-players`](#operation-scoreboard-clear-team-players) |
| `scoreboard` | [`create-team`](#operation-scoreboard-create-team) |
| `scoreboard` | [`get-player-team`](#operation-scoreboard-get-player-team) |
| `scoreboard` | [`get-team`](#operation-scoreboard-get-team) |
| `scoreboard` | [`get-team-players`](#operation-scoreboard-get-team-players) |
| `scoreboard` | [`get-teams`](#operation-scoreboard-get-teams) |
| `scoreboard` | [`remove-objective`](#operation-scoreboard-remove-objective) |
| `scoreboard` | [`remove-player-from-team`](#operation-scoreboard-remove-player-from-team) |
| `scoreboard` | [`remove-score`](#operation-scoreboard-remove-score) |
| `scoreboard` | [`remove-team`](#operation-scoreboard-remove-team) |
| `scoreboard` | [`reset-entity-scores`](#operation-scoreboard-reset-entity-scores) |
| `scoreboard` | [`set-display-slot`](#operation-scoreboard-set-display-slot) |
| `scoreboard` | [`update-objective`](#operation-scoreboard-update-objective) |
| `scoreboard` | [`update-score`](#operation-scoreboard-update-score) |
| `scoreboard` | [`update-team`](#operation-scoreboard-update-team) |

## Type Details

### `render-type` {#type-render-type}

**Enum cases**

| Name |
| --- |
| `integer` |
| `hearts` |

### `number-format` {#type-number-format}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `blank` |  |
| `fixed` | `text-component` |

### `display-slot` {#type-display-slot}

**Enum cases**

| Name |
| --- |
| `player-list` |
| `sidebar` |
| `below-name` |
| `sidebar-team-black` |
| `sidebar-team-dark-blue` |
| `sidebar-team-dark-green` |
| `sidebar-team-dark-aqua` |
| `sidebar-team-dark-red` |
| `sidebar-team-dark-purple` |
| `sidebar-team-gold` |
| `sidebar-team-gray` |
| `sidebar-team-dark-gray` |
| `sidebar-team-blue` |
| `sidebar-team-green` |
| `sidebar-team-aqua` |
| `sidebar-team-red` |
| `sidebar-team-light-purple` |
| `sidebar-team-yellow` |
| `sidebar-team-white` |

### `nametag-visibility` {#type-nametag-visibility}

**Enum cases**

| Name |
| --- |
| `always` |
| `never` |
| `hide-for-other-teams` |
| `hide-for-own-team` |

### `collision-rule` {#type-collision-rule}

**Enum cases**

| Name |
| --- |
| `always` |
| `never` |
| `push-other-teams` |
| `push-own-team` |

### `team-settings` {#type-team-settings}

**Record fields**

| Name | WIT type |
| --- | --- |
| `display-name` | `text-component` |
| `friendly-fire` | `bool` |
| `see-friendly-invisibles` | `bool` |
| `nametag-visibility` | `nametag-visibility` |
| `collision-rule` | `collision-rule` |
| `color` | `named-color` |
| `prefix` | `text-component` |
| `suffix` | `text-component` |

### `scoreboard` {#type-scoreboard}

Methods: [`add-objective`](#operation-scoreboard-add-objective), [`update-objective`](#operation-scoreboard-update-objective), [`remove-objective`](#operation-scoreboard-remove-objective), [`set-display-slot`](#operation-scoreboard-set-display-slot), [`clear-display-slot`](#operation-scoreboard-clear-display-slot), [`update-score`](#operation-scoreboard-update-score), [`add-score`](#operation-scoreboard-add-score), [`remove-score`](#operation-scoreboard-remove-score), [`reset-entity-scores`](#operation-scoreboard-reset-entity-scores), [`create-team`](#operation-scoreboard-create-team), [`remove-team`](#operation-scoreboard-remove-team), [`update-team`](#operation-scoreboard-update-team), [`add-player-to-team`](#operation-scoreboard-add-player-to-team), [`remove-player-from-team`](#operation-scoreboard-remove-player-from-team), [`clear-team-players`](#operation-scoreboard-clear-team-players), [`get-teams`](#operation-scoreboard-get-teams), [`get-team`](#operation-scoreboard-get-team), [`get-team-players`](#operation-scoreboard-get-team-players), [`get-player-team`](#operation-scoreboard-get-player-team).

### `bedrock-sort-order` {#type-bedrock-sort-order}

**Enum cases**

| Name |
| --- |
| `ascending` |
| `descending` |

### `bedrock-display-slot` {#type-bedrock-display-slot}

**Enum cases**

| Name |
| --- |
| `player-list` |
| `sidebar` |
| `below-name` |

### `bedrock-scoreboard` {#type-bedrock-scoreboard}

Methods: [`add-objective`](#operation-bedrock-scoreboard-add-objective), [`update-objective`](#operation-bedrock-scoreboard-update-objective), [`remove-objective`](#operation-bedrock-scoreboard-remove-objective), [`set-display-slot`](#operation-bedrock-scoreboard-set-display-slot), [`clear-display-slot`](#operation-bedrock-scoreboard-clear-display-slot), [`update-score`](#operation-bedrock-scoreboard-update-score), [`add-score`](#operation-bedrock-scoreboard-add-score), [`remove-score`](#operation-bedrock-scoreboard-remove-score), [`reset-entity-scores`](#operation-bedrock-scoreboard-reset-entity-scores).

## Operation Details

### `scoreboard.add-objective` {#operation-scoreboard-add-objective}

```text
add-objective: func(name: string, display-name: text-component, render-type: render-type, number-format: option<number-format>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `display-name` | `text-component` |
| `render-type` | `render-type` |
| `number-format` | `option<number-format>` |

### `scoreboard.update-objective` {#operation-scoreboard-update-objective}

```text
update-objective: func(name: string, display-name: text-component, render-type: render-type, number-format: option<number-format>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `display-name` | `text-component` |
| `render-type` | `render-type` |
| `number-format` | `option<number-format>` |

### `scoreboard.remove-objective` {#operation-scoreboard-remove-objective}

```text
remove-objective: func(name: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |

### `scoreboard.set-display-slot` {#operation-scoreboard-set-display-slot}

```text
set-display-slot: func(slot: display-slot, objective-name: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `slot` | `display-slot` |
| `objective-name` | `string` |

### `scoreboard.clear-display-slot` {#operation-scoreboard-clear-display-slot}

```text
clear-display-slot: func(slot: display-slot);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `slot` | `display-slot` |

### `scoreboard.update-score` {#operation-scoreboard-update-score}

```text
update-score: func(entity-name: string, objective-name: string, value: s32, number-format: option<number-format>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `entity-name` | `string` |
| `objective-name` | `string` |
| `value` | `s32` |
| `number-format` | `option<number-format>` |

### `scoreboard.add-score` {#operation-scoreboard-add-score}

```text
add-score: func(entity-name: string, objective-name: string, delta: s32) -> s32;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `entity-name` | `string` |
| `objective-name` | `string` |
| `delta` | `s32` |

**Returns:** `s32`

### `scoreboard.remove-score` {#operation-scoreboard-remove-score}

```text
remove-score: func(entity-name: string, objective-name: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `entity-name` | `string` |
| `objective-name` | `string` |

### `scoreboard.reset-entity-scores` {#operation-scoreboard-reset-entity-scores}

```text
reset-entity-scores: func(entity-name: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `entity-name` | `string` |

### `scoreboard.create-team` {#operation-scoreboard-create-team}

```text
create-team: func(name: string, settings: team-settings);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `settings` | `team-settings` |

### `scoreboard.remove-team` {#operation-scoreboard-remove-team}

```text
remove-team: func(name: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |

### `scoreboard.update-team` {#operation-scoreboard-update-team}

```text
update-team: func(name: string, settings: team-settings);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `settings` | `team-settings` |

### `scoreboard.add-player-to-team` {#operation-scoreboard-add-player-to-team}

```text
add-player-to-team: func(team-name: string, player-name: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `team-name` | `string` |
| `player-name` | `string` |

### `scoreboard.remove-player-from-team` {#operation-scoreboard-remove-player-from-team}

```text
remove-player-from-team: func(team-name: string, player-name: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `team-name` | `string` |
| `player-name` | `string` |

### `scoreboard.clear-team-players` {#operation-scoreboard-clear-team-players}

```text
clear-team-players: func(team-name: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `team-name` | `string` |

### `scoreboard.get-teams` {#operation-scoreboard-get-teams}

```text
get-teams: func() -> list<string>;
```

**Returns:** `list<string>`

### `scoreboard.get-team` {#operation-scoreboard-get-team}

```text
get-team: func(name: string) -> option<team-settings>;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |

**Returns:** `option<team-settings>`

### `scoreboard.get-team-players` {#operation-scoreboard-get-team-players}

```text
get-team-players: func(team-name: string) -> list<string>;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `team-name` | `string` |

**Returns:** `list<string>`

### `scoreboard.get-player-team` {#operation-scoreboard-get-player-team}

```text
get-player-team: func(player-name: string) -> option<string>;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `player-name` | `string` |

**Returns:** `option<string>`

### `bedrock-scoreboard.add-objective` {#operation-bedrock-scoreboard-add-objective}

```text
add-objective: func(name: string, display-name: string, sort-order: bedrock-sort-order);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `display-name` | `string` |
| `sort-order` | `bedrock-sort-order` |

### `bedrock-scoreboard.update-objective` {#operation-bedrock-scoreboard-update-objective}

```text
update-objective: func(name: string, display-name: string, sort-order: bedrock-sort-order);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `display-name` | `string` |
| `sort-order` | `bedrock-sort-order` |

### `bedrock-scoreboard.remove-objective` {#operation-bedrock-scoreboard-remove-objective}

```text
remove-objective: func(name: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |

### `bedrock-scoreboard.set-display-slot` {#operation-bedrock-scoreboard-set-display-slot}

```text
set-display-slot: func(slot: bedrock-display-slot, objective-name: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `slot` | `bedrock-display-slot` |
| `objective-name` | `string` |

### `bedrock-scoreboard.clear-display-slot` {#operation-bedrock-scoreboard-clear-display-slot}

```text
clear-display-slot: func(slot: bedrock-display-slot);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `slot` | `bedrock-display-slot` |

### `bedrock-scoreboard.update-score` {#operation-bedrock-scoreboard-update-score}

```text
update-score: func(entity-name: string, objective-name: string, value: s32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `entity-name` | `string` |
| `objective-name` | `string` |
| `value` | `s32` |

### `bedrock-scoreboard.add-score` {#operation-bedrock-scoreboard-add-score}

```text
add-score: func(entity-name: string, objective-name: string, delta: s32) -> s32;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `entity-name` | `string` |
| `objective-name` | `string` |
| `delta` | `s32` |

**Returns:** `s32`

### `bedrock-scoreboard.remove-score` {#operation-bedrock-scoreboard-remove-score}

```text
remove-score: func(entity-name: string, objective-name: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `entity-name` | `string` |
| `objective-name` | `string` |

### `bedrock-scoreboard.reset-entity-scores` {#operation-bedrock-scoreboard-reset-entity-scores}

```text
reset-entity-scores: func(entity-name: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `entity-name` | `string` |
