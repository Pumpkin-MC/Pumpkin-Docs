---
title: Interface advancement
outline: [2, 2]
---

# Interface `advancement`

Host import: `pumpkin:plugin/advancement@0.1.0`

[Package summary](./)

Source: [advancement.wit](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/blob/master/v0.1/advancement.wit)

Advancement definitions and progress.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`text`](./text) | `text-component` |

## Type Summary

| Kind | Type | Description |
| --- | --- | --- |
| record | [`advancement-display`](#type-advancement-display) | Display information for an advancement. |
| record | [`advancement-info`](#type-advancement-info) | Detailed information about an advancement. |
| record | [`advancement-progress`](#type-advancement-progress) | Represents progress of an advancement for a player. |
| enum | [`frame-type`](#type-frame-type) | Frame type for an advancement. |

## Type Details

### `frame-type` {#type-frame-type}

Frame type for an advancement.

**Enum cases**

| Name |
| --- |
| `task` |
| `challenge` |
| `goal` |

### `advancement-display` {#type-advancement-display}

Display information for an advancement.

**Record fields**

| Name | WIT type |
| --- | --- |
| `title` | `text-component` |
| `description` | `text-component` |
| `frame` | `frame-type` |
| `show-toast` | `bool` |
| `hidden` | `bool` |
| `announce-to-chat` | `bool` |
| `background` | `option<string>` |
| `x` | `f32` |
| `y` | `f32` |

### `advancement-info` {#type-advancement-info}

Detailed information about an advancement.

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `string` |
| `parent-id` | `option<string>` |
| `criteria` | `list<string>` |
| `display` | `option<advancement-display>` |

### `advancement-progress` {#type-advancement-progress}

Represents progress of an advancement for a player.

**Record fields**

| Name | WIT type |
| --- | --- |
| `advancement-id` | `string` |
| `done` | `bool` |
| `awarded-criteria` | `list<string>` |
| `remaining-criteria` | `list<string>` |
