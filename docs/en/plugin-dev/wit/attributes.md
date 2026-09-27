---
title: Interface attributes
outline: [2, 2]
---

# Interface `attributes`

Host import: `pumpkin:plugin/attributes@0.1.0`

[Package summary](./)

Source: [attributes.wit](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/blob/master/v0.1/attributes.wit)

Entity attributes and modifiers.

## Type Summary

| Kind | Type |
| --- | --- |
| enum | [`attribute`](#type-attribute) |
| record | [`attribute-modifier`](#type-attribute-modifier) |
| enum | [`modifier-operation`](#type-modifier-operation) |

## Type Details

### `attribute` {#type-attribute}

**Enum cases**

| Name |
| --- |
| `air-drag-modifier` |
| `armor` |
| `armor-toughness` |
| `attack-damage` |
| `attack-knockback` |
| `attack-speed` |
| `below-name-distance` |
| `block-break-speed` |
| `block-interaction-range` |
| `bounciness` |
| `burning-time` |
| `camera-distance` |
| `explosion-knockback-resistance` |
| `entity-interaction-range` |
| `fall-damage-multiplier` |
| `flying-speed` |
| `follow-range` |
| `friction-modifier` |
| `gravity` |
| `jump-strength` |
| `knockback-resistance` |
| `luck` |
| `max-absorption` |
| `max-health` |
| `mining-efficiency` |
| `movement-efficiency` |
| `movement-speed` |
| `name-tag-distance` |
| `oxygen-bonus` |
| `safe-fall-distance` |
| `scale` |
| `sneaking-speed` |
| `spawn-reinforcements` |
| `step-height` |
| `submerged-mining-speed` |
| `sweeping-damage-ratio` |
| `tempt-range` |
| `water-movement-efficiency` |
| `waypoint-transmit-range` |
| `waypoint-receive-range` |

### `modifier-operation` {#type-modifier-operation}

**Enum cases**

| Name |
| --- |
| `add` |
| `multiply-base` |
| `multiply-total` |

### `attribute-modifier` {#type-attribute-modifier}

**Record fields**

| Name | WIT type |
| --- | --- |
| `id` | `string` |
| `amount` | `f64` |
| `operation` | `modifier-operation` |
