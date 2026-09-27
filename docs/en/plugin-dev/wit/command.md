---
title: Interface command
outline: [2, 2]
---

# Interface `command`

Host import: `pumpkin:plugin/command@0.1.0`

[Package summary](./)

Source: [command.wit](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/command.wit)

Command trees, arguments, execution, and suggestions.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`world`](./world) | `%world`, `entity` |
| [`player`](./player) | `player` |
| [`block-entity`](./block-entity) | `command-block-entity` |
| [`common`](./common) | `position`, `block-pos`, `locale`, `game-mode` |
| [`item-stack`](./item-stack) | `item-stack` |
| [`server`](./server) | `server`, `difficulty` |
| [`text`](./text) | `text-component` |

## Type Summary

| Kind | Type |
| --- | --- |
| variant | [`arg`](#type-arg) |
| variant | [`argument-type`](#type-argument-type) |
| enum | [`bossbar-color`](#type-bossbar-color) |
| enum | [`bossbar-style`](#type-bossbar-style) |
| resource | [`command`](#type-command) |
| variant | [`command-error`](#type-command-error) |
| resource | [`command-node`](#type-command-node) |
| resource | [`command-sender`](#type-command-sender) |
| variant | [`command-sender-type`](#type-command-sender-type) |
| record | [`command-suggestion`](#type-command-suggestion) |
| record | [`command-suggestions`](#type-command-suggestions) |
| resource | [`consumed-args`](#type-consumed-args) |
| enum | [`entity-anchor`](#type-entity-anchor) |
| record | [`entity-argument`](#type-entity-argument) |
| variant | [`not-in-bounds`](#type-not-in-bounds) |
| variant | [`number`](#type-number) |
| enum | [`permission-level`](#type-permission-level) |
| enum | [`sound-category`](#type-sound-category) |
| enum | [`string-type`](#type-string-type) |
| record | [`suggestion-request`](#type-suggestion-request) |
| enum | [`suggestion-type`](#type-suggestion-type) |

## Operation Summary

| Scope | Operation |
| --- | --- |
| `command` | [`constructor`](#operation-command-constructor) |
| `command` | [`execute-with-handler-id`](#operation-command-execute-with-handler-id) |
| `command` | [`then`](#operation-command-then) |
| `command-node` | [`argument`](#operation-command-node-argument) |
| `command-node` | [`execute-with-handler-id`](#operation-command-node-execute-with-handler-id) |
| `command-node` | [`literal`](#operation-command-node-literal) |
| `command-node` | [`require-with-handler-id`](#operation-command-node-require-with-handler-id) |
| `command-node` | [`suggest-with-handler-id`](#operation-command-node-suggest-with-handler-id) |
| `command-node` | [`then`](#operation-command-node-then) |
| `command-sender` | [`as-player`](#operation-command-sender-as-player) |
| `command-sender` | [`get-command-sender-type`](#operation-command-sender-get-command-sender-type) |
| `command-sender` | [`get-locale`](#operation-command-sender-get-locale) |
| `command-sender` | [`get-name`](#operation-command-sender-get-name) |
| `command-sender` | [`has-permission`](#operation-command-sender-has-permission) |
| `command-sender` | [`has-permission-level`](#operation-command-sender-has-permission-level) |
| `command-sender` | [`is-console`](#operation-command-sender-is-console) |
| `command-sender` | [`is-player`](#operation-command-sender-is-player) |
| `command-sender` | [`permission-level`](#operation-command-sender-permission-level) |
| `command-sender` | [`position`](#operation-command-sender-position) |
| `command-sender` | [`send-error`](#operation-command-sender-send-error) |
| `command-sender` | [`send-message`](#operation-command-sender-send-message) |
| `command-sender` | [`send-system-message`](#operation-command-sender-send-system-message) |
| `command-sender` | [`set-success-count`](#operation-command-sender-set-success-count) |
| `command-sender` | [`should-broadcast-console-to-ops`](#operation-command-sender-should-broadcast-console-to-ops) |
| `command-sender` | [`should-receive-feedback`](#operation-command-sender-should-receive-feedback) |
| `command-sender` | [`should-track-output`](#operation-command-sender-should-track-output) |
| `command-sender` | [`world`](#operation-command-sender-world) |
| `consumed-args` | [`get-value`](#operation-consumed-args-get-value) |

## Type Details

### `command-error` {#type-command-error}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `invalid-consumption` | `option<string>` |
| `invalid-requirement` |  |
| `permission-denied` |  |
| `command-failed` | `text-component` |

### `command-node` {#type-command-node}

Methods: [`literal`](#operation-command-node-literal), [`argument`](#operation-command-node-argument), [`then`](#operation-command-node-then), [`execute-with-handler-id`](#operation-command-node-execute-with-handler-id), [`suggest-with-handler-id`](#operation-command-node-suggest-with-handler-id), [`require-with-handler-id`](#operation-command-node-require-with-handler-id).

### `suggestion-request` {#type-suggestion-request}

**Record fields**

| Name | WIT type |
| --- | --- |
| `input` | `string` |
| `cursor` | `u32` |
| `start` | `u32` |
| `remaining` | `string` |

### `command-suggestion` {#type-command-suggestion}

**Record fields**

| Name | WIT type |
| --- | --- |
| `value` | `string` |
| `tooltip` | `option<text-component>` |

### `command-suggestions` {#type-command-suggestions}

**Record fields**

| Name | WIT type |
| --- | --- |
| `start` | `u32` |
| `length` | `u32` |
| `values` | `list<command-suggestion>` |

### `argument-type` {#type-argument-type}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `%bool` |  |
| `float` | `tuple<option<f32>, option<f32>>` |
| `double` | `tuple<option<f64>, option<f64>>` |
| `integer` | `tuple<option<s32>, option<s32>>` |
| `long` | `tuple<option<s64>, option<s64>>` |
| `%string` | `string-type` |
| `entities` |  |
| `entity` |  |
| `players` |  |
| `game-profile` |  |
| `block-pos` |  |
| `column-pos` |  |
| `position3d` |  |
| `position2d` |  |
| `block-state` |  |
| `block-predicate` |  |
| `item` |  |
| `item-predicate` |  |
| `color` |  |
| `component` |  |
| `style` |  |
| `message` |  |
| `nbt-compound-tag` |  |
| `nbt-tag` |  |
| `nbt-path` |  |
| `objective` |  |
| `objective-criteria` |  |
| `operation` |  |
| `particle` |  |
| `angle` |  |
| `rotation` |  |
| `scoreboard-slot` |  |
| `score-holder` | `bool` |
| `swizzle` |  |
| `team` |  |
| `item-slot` |  |
| `resource-location` |  |
| `mob-effect` |  |
| `function` |  |
| `entity-anchor` |  |
| `int-range` |  |
| `float-range` |  |
| `dimension` |  |
| `gamemode` |  |
| `difficulty` |  |
| `time` | `option<s32>` |
| `%resource` | `string` |
| `resource-or-tag` | `string` |
| `resource-or-tag-key` | `string` |
| `resource-key` | `string` |
| `template-mirror` |  |
| `template-rotation` |  |
| `uuid` |  |

### `entity-argument` {#type-entity-argument}

**Record fields**

| Name | WIT type |
| --- | --- |
| `single` | `bool` |
| `players-only` | `bool` |

### `command-sender-type` {#type-command-sender-type}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `rcon` |  |
| `console` |  |
| `player` | `player` |
| `command-block` | `tuple<command-block-entity, %world>` |
| `dummy` |  |

### `permission-level` {#type-permission-level}

**Enum cases**

| Name |
| --- |
| `zero` |
| `one` |
| `two` |
| `three` |
| `four` |

### `command-sender` {#type-command-sender}

Methods: [`get-command-sender-type`](#operation-command-sender-get-command-sender-type), [`get-name`](#operation-command-sender-get-name), [`send-message`](#operation-command-sender-send-message), [`send-system-message`](#operation-command-sender-send-system-message), [`send-error`](#operation-command-sender-send-error), [`set-success-count`](#operation-command-sender-set-success-count), [`is-player`](#operation-command-sender-is-player), [`is-console`](#operation-command-sender-is-console), [`as-player`](#operation-command-sender-as-player), [`permission-level`](#operation-command-sender-permission-level), [`has-permission-level`](#operation-command-sender-has-permission-level), [`has-permission`](#operation-command-sender-has-permission), [`position`](#operation-command-sender-position), [`world`](#operation-command-sender-world), [`get-locale`](#operation-command-sender-get-locale), [`should-receive-feedback`](#operation-command-sender-should-receive-feedback), [`should-broadcast-console-to-ops`](#operation-command-sender-should-broadcast-console-to-ops), [`should-track-output`](#operation-command-sender-should-track-output).

### `string-type` {#type-string-type}

**Enum cases**

| Name |
| --- |
| `single-word` |
| `quotable` |
| `greedy` |

### `suggestion-type` {#type-suggestion-type}

**Enum cases**

| Name |
| --- |
| `ask-server` |
| `all-recipes` |
| `available-sounds` |
| `available-biomes` |
| `summonable-entities` |

### `arg` {#type-arg}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `simple` | `string` |
| `msg` | `string` |
| `%bool` | `bool` |
| `item` | `string` |
| `item-predicate` | `string` |
| `resource-location` | `string` |
| `block` | `string` |
| `block-predicate` | `string` |
| `time` | `s32` |
| `num` | `result<number, not-in-bounds>` |
| `block-pos` | `block-pos` |
| `pos3d` | `tuple<f64, f64, f64>` |
| `pos2d` | `tuple<f64, f64>` |
| `rotation` | `tuple<f32, bool, f32, bool>` |
| `gamemode` | `game-mode` |
| `difficulty` | `difficulty` |
| `players` | `list<player>` |
| `particle` | `string` |
| `text-component` | `text-component` |
| `bossbar-color` | `bossbar-color` |
| `bossbar-style` | `bossbar-style` |
| `sound-category` | `sound-category` |
| `damage-type` | `string` |
| `effect` | `string` |
| `enchantment` | `string` |
| `advancement` | `string` |
| `entity-anchor` | `entity-anchor` |

### `bossbar-color` {#type-bossbar-color}

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

### `bossbar-style` {#type-bossbar-style}

**Enum cases**

| Name |
| --- |
| `no-division` |
| `notches6` |
| `notches10` |
| `notches12` |
| `notches20` |

### `sound-category` {#type-sound-category}

**Enum cases**

| Name |
| --- |
| `master` |
| `music` |
| `records` |
| `weather` |
| `blocks` |
| `hostile` |
| `neutral` |
| `players` |
| `ambient` |
| `voice` |

### `entity-anchor` {#type-entity-anchor}

**Enum cases**

| Name |
| --- |
| `eyes` |
| `feet` |

### `number` {#type-number}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `float64` | `f64` |
| `float32` | `f32` |
| `int32` | `s32` |
| `int64` | `s64` |

### `not-in-bounds` {#type-not-in-bounds}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `lower-bound` | `tuple<number, number>` |
| `upper-bound` | `tuple<number, number>` |

### `consumed-args` {#type-consumed-args}

Methods: [`get-value`](#operation-consumed-args-get-value).

### `command` {#type-command}

Methods: [`constructor`](#operation-command-constructor), [`then`](#operation-command-then), [`execute-with-handler-id`](#operation-command-execute-with-handler-id).

## Operation Details

### `command-node.literal` {#operation-command-node-literal}

```text
literal: static func(name: string) -> command-node;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |

**Returns:** `command-node`

### `command-node.argument` {#operation-command-node-argument}

```text
argument: static func(name: string, %type: argument-type) -> command-node;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `string` |
| `%type` | `argument-type` |

**Returns:** `command-node`

### `command-node.then` {#operation-command-node-then}

```text
then: func(node: command-node);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `node` | `command-node` |

### `command-node.execute-with-handler-id` {#operation-command-node-execute-with-handler-id}

```text
execute-with-handler-id: func(handler-id: u32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `handler-id` | `u32` |

### `command-node.suggest-with-handler-id` {#operation-command-node-suggest-with-handler-id}

```text
suggest-with-handler-id: func(handler-id: u32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `handler-id` | `u32` |

### `command-node.require-with-handler-id` {#operation-command-node-require-with-handler-id}

```text
require-with-handler-id: func(handler-id: u32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `handler-id` | `u32` |

### `command-sender.get-command-sender-type` {#operation-command-sender-get-command-sender-type}

```text
get-command-sender-type: func() -> command-sender-type;
```

**Returns:** `command-sender-type`

### `command-sender.get-name` {#operation-command-sender-get-name}

```text
get-name: func() -> string;
```

**Returns:** `string`

### `command-sender.send-message` {#operation-command-sender-send-message}

```text
send-message: func(text: text-component);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `text` | `text-component` |

### `command-sender.send-system-message` {#operation-command-sender-send-system-message}

```text
send-system-message: func(text: text-component);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `text` | `text-component` |

### `command-sender.send-error` {#operation-command-sender-send-error}

```text
send-error: func(text: text-component);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `text` | `text-component` |

### `command-sender.set-success-count` {#operation-command-sender-set-success-count}

```text
set-success-count: func(count: s32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `count` | `s32` |

### `command-sender.is-player` {#operation-command-sender-is-player}

```text
is-player: func() -> bool;
```

**Returns:** `bool`

### `command-sender.is-console` {#operation-command-sender-is-console}

```text
is-console: func() -> bool;
```

**Returns:** `bool`

### `command-sender.as-player` {#operation-command-sender-as-player}

```text
as-player: func() -> option<player>;
```

**Returns:** `option<player>`

### `command-sender.permission-level` {#operation-command-sender-permission-level}

```text
permission-level: func() -> permission-level;
```

**Returns:** `permission-level`

### `command-sender.has-permission-level` {#operation-command-sender-has-permission-level}

```text
has-permission-level: func(level: permission-level) -> bool;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `level` | `permission-level` |

**Returns:** `bool`

### `command-sender.has-permission` {#operation-command-sender-has-permission}

```text
has-permission: func(server: borrow<server>, node: string) -> bool;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `server` | `borrow<server>` |
| `node` | `string` |

**Returns:** `bool`

### `command-sender.position` {#operation-command-sender-position}

```text
position: func() -> option<position>;
```

**Returns:** `option<position>`

### `command-sender.world` {#operation-command-sender-world}

```text
%world: func() -> option<%world>;
```

**Returns:** `option<%world>`

### `command-sender.get-locale` {#operation-command-sender-get-locale}

```text
get-locale: func() -> locale;
```

**Returns:** `locale`

### `command-sender.should-receive-feedback` {#operation-command-sender-should-receive-feedback}

```text
should-receive-feedback: func() -> bool;
```

**Returns:** `bool`

### `command-sender.should-broadcast-console-to-ops` {#operation-command-sender-should-broadcast-console-to-ops}

```text
should-broadcast-console-to-ops: func() -> bool;
```

**Returns:** `bool`

### `command-sender.should-track-output` {#operation-command-sender-should-track-output}

```text
should-track-output: func() -> bool;
```

**Returns:** `bool`

### `consumed-args.get-value` {#operation-consumed-args-get-value}

```text
get-value: func(key: string) -> arg;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `key` | `string` |

**Returns:** `arg`

### `command.constructor` {#operation-command-constructor}

```text
constructor(names: list<string>, description: string);
```

First name is primary, rest are aliases

**Parameters**

| Name | WIT type |
| --- | --- |
| `names` | `list<string>` |
| `description` | `string` |

### `command.then` {#operation-command-then}

```text
then: func(node: command-node);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `node` | `command-node` |

### `command.execute-with-handler-id` {#operation-command-execute-with-handler-id}

```text
execute-with-handler-id: func(handler-id: u32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `handler-id` | `u32` |
