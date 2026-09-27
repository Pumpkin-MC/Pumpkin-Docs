---
title: Plugin World
outline: [2, 2]
---

# World `plugin`

`pumpkin:plugin/plugin@0.1.0`

[Package summary](./)

Source: [plugin.wit](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/blob/master/v0.1/plugin.wit)

Plugins call the host imports. The host calls the plugin exports.

## Host Imports

| Interface | Description |
| --- | --- |
| [`logging`](./logging) | Log levels and logging functions. |
| [`gui`](./gui) | GUI creation and updates. |
| [`scoreboard`](./scoreboard) | Scoreboards, objectives, and scores. |
| [`server`](./server) | Server state and player lookup. |
| [`text`](./text) | Text components and formatting. |
| [`command`](./command) | Command trees, arguments, execution, and suggestions. |
| [`context`](./context) | Plugin registration, data folder, and server access. |
| [`i18n`](./i18n) | Translate keys and load custom translations. |
| [`scheduler`](./scheduler) | Delayed and repeating tasks; cancellation. |
| [`world`](./world) | Worlds, blocks, entities, and chunk generation. |
| [`entity`](./entity) | Entity types re-exported from the world interface. |
| [`boss-bar`](./boss-bar) | Boss bar creation and updates. |
| [`forms`](./forms) | Bedrock form definitions. |
| [`java-dialogs`](./java-dialogs) | Java Edition dialog definitions. |
| [`status-effect`](./status-effect) | Status effect types. |
| [`block-entity`](./block-entity) | Block entity types and operations. |
| [`ipc`](./ipc) | Plugin messages and plugin identifiers. |
| [`attributes`](./attributes) | Entity attributes and modifiers. |
| [`player`](./player) | Players and player operations. |
| [`advancement`](./advancement) | Advancement definitions and progress. |
| [`recipe`](./recipe) | Recipe definitions and registration. |
| [`inventory`](./inventory) | Inventory slots and player inventory operations. |
| [`datapack`](./datapack) | Datapack inspection and management. |
| [`enchantments`](./enchantments) | Enchantment definitions and registration. |
| [`damage-types`](./damage-types) | Damage type identifiers. |
| [`screens`](./screens) | Screen and container types. |
| [`statistics`](./statistics) | Statistic categories and types. |
| [`display`](./display) | Display and Interaction entities. |
| [`game-rules`](./game-rules) | Game rule definitions and values. |
| [`game-events`](./game-events) | Game event types. |
| [`potions`](./potions) | Potion types. |
| [`entity-statuses`](./entity-statuses) | Entity status and animation identifiers. |

## Export Summary

| Export | Description |
| --- | --- |
| [`init-plugin`](#operation-plugin-init-plugin) | Called by the host once to initialize the plugin. |
| [`on-load`](#operation-plugin-on-load) | Called when the plugin is being loaded. |
| [`on-unload`](#operation-plugin-on-unload) | Called when the plugin is being unloaded. |
| [`handle-event`](#operation-plugin-handle-event) | Dispatches an event to the plugin for handling. |
| [`handle-command`](#operation-plugin-handle-command) | Dispatches a command execution to the plugin. |
| [`handle-command-suggestion`](#operation-plugin-handle-command-suggestion) | Dispatches a command suggestion request to the plugin. |
| [`handle-task`](#operation-plugin-handle-task) | Dispatches a scheduled task execution to the plugin. |
| [`handle-ipc-message`](#operation-plugin-handle-ipc-message) | Processes an incoming message from another plugin if possible, and returns (a possibly empty) response. |
| [`handle-ai-goal-can-start`](#operation-plugin-handle-ai-goal-can-start) |  |
| [`handle-ai-goal-should-continue`](#operation-plugin-handle-ai-goal-should-continue) |  |
| [`handle-ai-goal-start`](#operation-plugin-handle-ai-goal-start) |  |
| [`handle-ai-goal-tick`](#operation-plugin-handle-ai-goal-tick) |  |
| [`handle-ai-goal-stop`](#operation-plugin-handle-ai-goal-stop) |  |
| [`handle-generate-phase`](#operation-plugin-handle-generate-phase) | Dispatches a chunk generation phase to the plugin. |
| [`metadata`](./metadata) | Plugin identity, version, and dependencies. |

## Export Details

### `init-plugin` {#operation-plugin-init-plugin}

```text
export init-plugin: func();
```

Called by the host once to initialize the plugin.

### `on-load` {#operation-plugin-on-load}

```text
export on-load: func(context: context) -> result<_, string>;
```

Called when the plugin is being loaded.
Use this to register commands, events, and perform initial setup.

**Parameters**

| Name | WIT type |
| --- | --- |
| `context` | `context` |

**Returns:** `result<_, string>`

### `on-unload` {#operation-plugin-on-unload}

```text
export on-unload: func(context: context) -> result<_, string>;
```

Called when the plugin is being unloaded.
Use this to save data and clean up resources.

**Parameters**

| Name | WIT type |
| --- | --- |
| `context` | `context` |

**Returns:** `result<_, string>`

### `handle-event` {#operation-plugin-handle-event}

```text
export handle-event: func(event-id: u32, server: server-instance, event: event) -> event;
```

Dispatches an event to the plugin for handling.

**Parameters**

| Name | WIT type |
| --- | --- |
| `event-id` | `u32` |
| `server` | `server-instance` |
| `event` | `event` |

**Returns:** `event`

### `handle-command` {#operation-plugin-handle-command}

```text
export handle-command: func(command-id: u32, sender: command-sender, server: server-instance, args: consumed-args) -> result<s32, command-error>;
```

Dispatches a command execution to the plugin.

**Parameters**

| Name | WIT type |
| --- | --- |
| `command-id` | `u32` |
| `sender` | `command-sender` |
| `server` | `server-instance` |
| `args` | `consumed-args` |

**Returns:** `result<s32, command-error>`

### `handle-command-suggestion` {#operation-plugin-handle-command-suggestion}

```text
export handle-command-suggestion: func(handler-id: u32, sender: command-sender, server: server-instance, request: suggestion-request) -> command-suggestions;
```

Dispatches a command suggestion request to the plugin.

**Parameters**

| Name | WIT type |
| --- | --- |
| `handler-id` | `u32` |
| `sender` | `command-sender` |
| `server` | `server-instance` |
| `request` | `suggestion-request` |

**Returns:** `command-suggestions`

### `handle-task` {#operation-plugin-handle-task}

```text
export handle-task: func(handler-id: u32, server: server-instance);
```

Dispatches a scheduled task execution to the plugin.

**Parameters**

| Name | WIT type |
| --- | --- |
| `handler-id` | `u32` |
| `server` | `server-instance` |

### `handle-ipc-message` {#operation-plugin-handle-ipc-message}

```text
export handle-ipc-message: func(sender: plugin-id, message: ipc-message) -> result<ipc-message, string>;
```

Processes an incoming message from another plugin if possible, and returns (a possibly empty) response.

**Parameters**

| Name | WIT type |
| --- | --- |
| `sender` | `plugin-id` |
| `message` | `ipc-message` |

**Returns:** `result<ipc-message, string>`

### `handle-ai-goal-can-start` {#operation-plugin-handle-ai-goal-can-start}

```text
export handle-ai-goal-can-start: func(goal-id: u32, server: server-instance, entity: entity) -> bool;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `goal-id` | `u32` |
| `server` | `server-instance` |
| `entity` | `entity` |

**Returns:** `bool`

### `handle-ai-goal-should-continue` {#operation-plugin-handle-ai-goal-should-continue}

```text
export handle-ai-goal-should-continue: func(goal-id: u32, server: server-instance, entity: entity) -> bool;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `goal-id` | `u32` |
| `server` | `server-instance` |
| `entity` | `entity` |

**Returns:** `bool`

### `handle-ai-goal-start` {#operation-plugin-handle-ai-goal-start}

```text
export handle-ai-goal-start: func(goal-id: u32, server: server-instance, entity: entity);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `goal-id` | `u32` |
| `server` | `server-instance` |
| `entity` | `entity` |

### `handle-ai-goal-tick` {#operation-plugin-handle-ai-goal-tick}

```text
export handle-ai-goal-tick: func(goal-id: u32, server: server-instance, entity: entity);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `goal-id` | `u32` |
| `server` | `server-instance` |
| `entity` | `entity` |

### `handle-ai-goal-stop` {#operation-plugin-handle-ai-goal-stop}

```text
export handle-ai-goal-stop: func(goal-id: u32, server: server-instance, entity: entity);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `goal-id` | `u32` |
| `server` | `server-instance` |
| `entity` | `entity` |

### `handle-generate-phase` {#operation-plugin-handle-generate-phase}

```text
export handle-generate-phase: func(generator-id: u32, phase: generation-phase, chunk: chunk-buffer);
```

Dispatches a chunk generation phase to the plugin.

**Parameters**

| Name | WIT type |
| --- | --- |
| `generator-id` | `u32` |
| `phase` | `generation-phase` |
| `chunk` | `chunk-buffer` |
