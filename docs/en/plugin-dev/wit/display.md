---
title: Interface display
outline: [2, 2]
---

# Interface `display`

Host import: `pumpkin:plugin/display@0.1.0`

[Package summary](./)

Source: [display.wit](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/blob/master/v0.1/display.wit)

Display and Interaction entities.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`world`](./world) | `entity` |
| [`text`](./text) | `text-component` |
| [`item-stack`](./item-stack) | `item-stack` |
| [`uuid`](./uuid) | `uuid` |

## Type Summary

| Kind | Type | Description |
| --- | --- | --- |
| enum | [`billboard-mode`](#type-billboard-mode) | Billboard rendering constraints for display entities. |
| resource | [`block-display-entity`](#type-block-display-entity) | Resource specifically for Block Display entities. |
| resource | [`display-entity`](#type-display-entity) | Common base resource for all display entities. |
| record | [`display-transformation`](#type-display-transformation) | Transformation (translation, scale, left and right rotations) for display entities. |
| resource | [`interaction-entity`](#type-interaction-entity) | Resource specifically for Interaction entities. |
| resource | [`item-display-entity`](#type-item-display-entity) | Resource specifically for Item Display entities. |
| enum | [`item-display-mode`](#type-item-display-mode) | Item display transformation modes for item display entities. |
| record | [`quaternionf`](#type-quaternionf) | Single-precision quaternion representing a 3D rotation. |
| enum | [`text-alignment`](#type-text-alignment) | Text alignment options for text display entities. |
| resource | [`text-display-entity`](#type-text-display-entity) | Resource specifically for Text Display entities. |
| record | [`vector3f`](#type-vector3f) | 3D single-precision vector. |

## Operation Summary

| Scope | Operation |
| --- | --- |
| `block-display-entity` | [`from-entity`](#operation-block-display-entity-from-entity) |
| `block-display-entity` | [`get-block-state-id`](#operation-block-display-entity-get-block-state-id) |
| `block-display-entity` | [`get-display`](#operation-block-display-entity-get-display) |
| `block-display-entity` | [`get-entity`](#operation-block-display-entity-get-entity) |
| `block-display-entity` | [`set-block-state-id`](#operation-block-display-entity-set-block-state-id) |
| `display-entity` | [`from-entity`](#operation-display-entity-from-entity) |
| `display-entity` | [`get-billboard`](#operation-display-entity-get-billboard) |
| `display-entity` | [`get-brightness`](#operation-display-entity-get-brightness) |
| `display-entity` | [`get-display-height`](#operation-display-entity-get-display-height) |
| `display-entity` | [`get-display-width`](#operation-display-entity-get-display-width) |
| `display-entity` | [`get-entity`](#operation-display-entity-get-entity) |
| `display-entity` | [`get-glow-color-override`](#operation-display-entity-get-glow-color-override) |
| `display-entity` | [`get-interpolation-duration`](#operation-display-entity-get-interpolation-duration) |
| `display-entity` | [`get-interpolation-start`](#operation-display-entity-get-interpolation-start) |
| `display-entity` | [`get-shadow-radius`](#operation-display-entity-get-shadow-radius) |
| `display-entity` | [`get-shadow-strength`](#operation-display-entity-get-shadow-strength) |
| `display-entity` | [`get-teleport-duration`](#operation-display-entity-get-teleport-duration) |
| `display-entity` | [`get-transformation`](#operation-display-entity-get-transformation) |
| `display-entity` | [`get-view-range`](#operation-display-entity-get-view-range) |
| `display-entity` | [`set-billboard`](#operation-display-entity-set-billboard) |
| `display-entity` | [`set-brightness`](#operation-display-entity-set-brightness) |
| `display-entity` | [`set-display-height`](#operation-display-entity-set-display-height) |
| `display-entity` | [`set-display-width`](#operation-display-entity-set-display-width) |
| `display-entity` | [`set-glow-color-override`](#operation-display-entity-set-glow-color-override) |
| `display-entity` | [`set-interpolation-duration`](#operation-display-entity-set-interpolation-duration) |
| `display-entity` | [`set-interpolation-start`](#operation-display-entity-set-interpolation-start) |
| `display-entity` | [`set-shadow-radius`](#operation-display-entity-set-shadow-radius) |
| `display-entity` | [`set-shadow-strength`](#operation-display-entity-set-shadow-strength) |
| `display-entity` | [`set-teleport-duration`](#operation-display-entity-set-teleport-duration) |
| `display-entity` | [`set-transformation`](#operation-display-entity-set-transformation) |
| `display-entity` | [`set-view-range`](#operation-display-entity-set-view-range) |
| `interaction-entity` | [`from-entity`](#operation-interaction-entity-from-entity) |
| `interaction-entity` | [`get-entity`](#operation-interaction-entity-get-entity) |
| `interaction-entity` | [`get-height`](#operation-interaction-entity-get-height) |
| `interaction-entity` | [`get-last-attacker`](#operation-interaction-entity-get-last-attacker) |
| `interaction-entity` | [`get-last-interaction`](#operation-interaction-entity-get-last-interaction) |
| `interaction-entity` | [`get-response`](#operation-interaction-entity-get-response) |
| `interaction-entity` | [`get-width`](#operation-interaction-entity-get-width) |
| `interaction-entity` | [`set-height`](#operation-interaction-entity-set-height) |
| `interaction-entity` | [`set-response`](#operation-interaction-entity-set-response) |
| `interaction-entity` | [`set-width`](#operation-interaction-entity-set-width) |
| `item-display-entity` | [`from-entity`](#operation-item-display-entity-from-entity) |
| `item-display-entity` | [`get-display`](#operation-item-display-entity-get-display) |
| `item-display-entity` | [`get-entity`](#operation-item-display-entity-get-entity) |
| `item-display-entity` | [`get-item`](#operation-item-display-entity-get-item) |
| `item-display-entity` | [`get-item-display-mode`](#operation-item-display-entity-get-item-display-mode) |
| `item-display-entity` | [`set-item`](#operation-item-display-entity-set-item) |
| `item-display-entity` | [`set-item-display-mode`](#operation-item-display-entity-set-item-display-mode) |
| `text-display-entity` | [`from-entity`](#operation-text-display-entity-from-entity) |
| `text-display-entity` | [`get-alignment`](#operation-text-display-entity-get-alignment) |
| `text-display-entity` | [`get-background`](#operation-text-display-entity-get-background) |
| `text-display-entity` | [`get-default-background`](#operation-text-display-entity-get-default-background) |
| `text-display-entity` | [`get-display`](#operation-text-display-entity-get-display) |
| `text-display-entity` | [`get-entity`](#operation-text-display-entity-get-entity) |
| `text-display-entity` | [`get-line-width`](#operation-text-display-entity-get-line-width) |
| `text-display-entity` | [`get-see-through`](#operation-text-display-entity-get-see-through) |
| `text-display-entity` | [`get-shadow`](#operation-text-display-entity-get-shadow) |
| `text-display-entity` | [`get-text`](#operation-text-display-entity-get-text) |
| `text-display-entity` | [`get-text-opacity`](#operation-text-display-entity-get-text-opacity) |
| `text-display-entity` | [`set-alignment`](#operation-text-display-entity-set-alignment) |
| `text-display-entity` | [`set-background`](#operation-text-display-entity-set-background) |
| `text-display-entity` | [`set-default-background`](#operation-text-display-entity-set-default-background) |
| `text-display-entity` | [`set-line-width`](#operation-text-display-entity-set-line-width) |
| `text-display-entity` | [`set-see-through`](#operation-text-display-entity-set-see-through) |
| `text-display-entity` | [`set-shadow`](#operation-text-display-entity-set-shadow) |
| `text-display-entity` | [`set-text`](#operation-text-display-entity-set-text) |
| `text-display-entity` | [`set-text-opacity`](#operation-text-display-entity-set-text-opacity) |

## Type Details

### `billboard-mode` {#type-billboard-mode}

Billboard rendering constraints for display entities.

**Enum cases**

| Name |
| --- |
| `fixed` |
| `vertical` |
| `horizontal` |
| `center` |

### `item-display-mode` {#type-item-display-mode}

Item display transformation modes for item display entities.

**Enum cases**

| Name |
| --- |
| `none` |
| `thirdperson-lefthand` |
| `thirdperson-righthand` |
| `firstperson-lefthand` |
| `firstperson-righthand` |
| `head` |
| `gui` |
| `ground` |
| `fixed` |

### `text-alignment` {#type-text-alignment}

Text alignment options for text display entities.

**Enum cases**

| Name |
| --- |
| `center` |
| `left` |
| `right` |

### `vector3f` {#type-vector3f}

3D single-precision vector.

**Record fields**

| Name | WIT type |
| --- | --- |
| `x` | `f32` |
| `y` | `f32` |
| `z` | `f32` |

### `quaternionf` {#type-quaternionf}

Single-precision quaternion representing a 3D rotation.

**Record fields**

| Name | WIT type |
| --- | --- |
| `x` | `f32` |
| `y` | `f32` |
| `z` | `f32` |
| `w` | `f32` |

### `display-transformation` {#type-display-transformation}

Transformation (translation, scale, left and right rotations) for display entities.

**Record fields**

| Name | WIT type |
| --- | --- |
| `translation` | `vector3f` |
| `scale` | `vector3f` |
| `left-rotation` | `quaternionf` |
| `right-rotation` | `quaternionf` |

### `display-entity` {#type-display-entity}

Common base resource for all display entities.

Methods: [`from-entity`](#operation-display-entity-from-entity), [`get-entity`](#operation-display-entity-get-entity), [`get-transformation`](#operation-display-entity-get-transformation), [`set-transformation`](#operation-display-entity-set-transformation), [`get-interpolation-duration`](#operation-display-entity-get-interpolation-duration), [`set-interpolation-duration`](#operation-display-entity-set-interpolation-duration), [`get-interpolation-start`](#operation-display-entity-get-interpolation-start), [`set-interpolation-start`](#operation-display-entity-set-interpolation-start), [`get-teleport-duration`](#operation-display-entity-get-teleport-duration), [`set-teleport-duration`](#operation-display-entity-set-teleport-duration), [`get-billboard`](#operation-display-entity-get-billboard), [`set-billboard`](#operation-display-entity-set-billboard), [`get-view-range`](#operation-display-entity-get-view-range), [`set-view-range`](#operation-display-entity-set-view-range), [`get-shadow-radius`](#operation-display-entity-get-shadow-radius), [`set-shadow-radius`](#operation-display-entity-set-shadow-radius), [`get-shadow-strength`](#operation-display-entity-get-shadow-strength), [`set-shadow-strength`](#operation-display-entity-set-shadow-strength), [`get-display-width`](#operation-display-entity-get-display-width), [`set-display-width`](#operation-display-entity-set-display-width), [`get-display-height`](#operation-display-entity-get-display-height), [`set-display-height`](#operation-display-entity-set-display-height), [`get-glow-color-override`](#operation-display-entity-get-glow-color-override), [`set-glow-color-override`](#operation-display-entity-set-glow-color-override), [`get-brightness`](#operation-display-entity-get-brightness), [`set-brightness`](#operation-display-entity-set-brightness).

### `block-display-entity` {#type-block-display-entity}

Resource specifically for Block Display entities.

Methods: [`from-entity`](#operation-block-display-entity-from-entity), [`get-display`](#operation-block-display-entity-get-display), [`get-entity`](#operation-block-display-entity-get-entity), [`get-block-state-id`](#operation-block-display-entity-get-block-state-id), [`set-block-state-id`](#operation-block-display-entity-set-block-state-id).

### `item-display-entity` {#type-item-display-entity}

Resource specifically for Item Display entities.

Methods: [`from-entity`](#operation-item-display-entity-from-entity), [`get-display`](#operation-item-display-entity-get-display), [`get-entity`](#operation-item-display-entity-get-entity), [`get-item`](#operation-item-display-entity-get-item), [`set-item`](#operation-item-display-entity-set-item), [`get-item-display-mode`](#operation-item-display-entity-get-item-display-mode), [`set-item-display-mode`](#operation-item-display-entity-set-item-display-mode).

### `text-display-entity` {#type-text-display-entity}

Resource specifically for Text Display entities.

Methods: [`from-entity`](#operation-text-display-entity-from-entity), [`get-display`](#operation-text-display-entity-get-display), [`get-entity`](#operation-text-display-entity-get-entity), [`get-text`](#operation-text-display-entity-get-text), [`set-text`](#operation-text-display-entity-set-text), [`get-line-width`](#operation-text-display-entity-get-line-width), [`set-line-width`](#operation-text-display-entity-set-line-width), [`get-background`](#operation-text-display-entity-get-background), [`set-background`](#operation-text-display-entity-set-background), [`get-text-opacity`](#operation-text-display-entity-get-text-opacity), [`set-text-opacity`](#operation-text-display-entity-set-text-opacity), [`get-shadow`](#operation-text-display-entity-get-shadow), [`set-shadow`](#operation-text-display-entity-set-shadow), [`get-see-through`](#operation-text-display-entity-get-see-through), [`set-see-through`](#operation-text-display-entity-set-see-through), [`get-default-background`](#operation-text-display-entity-get-default-background), [`set-default-background`](#operation-text-display-entity-set-default-background), [`get-alignment`](#operation-text-display-entity-get-alignment), [`set-alignment`](#operation-text-display-entity-set-alignment).

### `interaction-entity` {#type-interaction-entity}

Resource specifically for Interaction entities.

Methods: [`from-entity`](#operation-interaction-entity-from-entity), [`get-entity`](#operation-interaction-entity-get-entity), [`get-width`](#operation-interaction-entity-get-width), [`set-width`](#operation-interaction-entity-set-width), [`get-height`](#operation-interaction-entity-get-height), [`set-height`](#operation-interaction-entity-set-height), [`get-response`](#operation-interaction-entity-get-response), [`set-response`](#operation-interaction-entity-set-response), [`get-last-attacker`](#operation-interaction-entity-get-last-attacker), [`get-last-interaction`](#operation-interaction-entity-get-last-interaction).

## Operation Details

### `display-entity.from-entity` {#operation-display-entity-from-entity}

```text
from-entity: static func(entity: borrow<entity>) -> option<display-entity>;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `entity` | `borrow<entity>` |

**Returns:** `option<display-entity>`

### `display-entity.get-entity` {#operation-display-entity-get-entity}

```text
get-entity: func() -> entity;
```

**Returns:** `entity`

### `display-entity.get-transformation` {#operation-display-entity-get-transformation}

```text
get-transformation: func() -> display-transformation;
```

**Returns:** `display-transformation`

### `display-entity.set-transformation` {#operation-display-entity-set-transformation}

```text
set-transformation: func(transformation: display-transformation);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `transformation` | `display-transformation` |

### `display-entity.get-interpolation-duration` {#operation-display-entity-get-interpolation-duration}

```text
get-interpolation-duration: func() -> s32;
```

**Returns:** `s32`

### `display-entity.set-interpolation-duration` {#operation-display-entity-set-interpolation-duration}

```text
set-interpolation-duration: func(duration: s32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `duration` | `s32` |

### `display-entity.get-interpolation-start` {#operation-display-entity-get-interpolation-start}

```text
get-interpolation-start: func() -> s32;
```

**Returns:** `s32`

### `display-entity.set-interpolation-start` {#operation-display-entity-set-interpolation-start}

```text
set-interpolation-start: func(delta-ticks: s32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `delta-ticks` | `s32` |

### `display-entity.get-teleport-duration` {#operation-display-entity-get-teleport-duration}

```text
get-teleport-duration: func() -> s32;
```

**Returns:** `s32`

### `display-entity.set-teleport-duration` {#operation-display-entity-set-teleport-duration}

```text
set-teleport-duration: func(duration: s32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `duration` | `s32` |

### `display-entity.get-billboard` {#operation-display-entity-get-billboard}

```text
get-billboard: func() -> billboard-mode;
```

**Returns:** `billboard-mode`

### `display-entity.set-billboard` {#operation-display-entity-set-billboard}

```text
set-billboard: func(mode: billboard-mode);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `mode` | `billboard-mode` |

### `display-entity.get-view-range` {#operation-display-entity-get-view-range}

```text
get-view-range: func() -> f32;
```

**Returns:** `f32`

### `display-entity.set-view-range` {#operation-display-entity-set-view-range}

```text
set-view-range: func(range: f32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `range` | `f32` |

### `display-entity.get-shadow-radius` {#operation-display-entity-get-shadow-radius}

```text
get-shadow-radius: func() -> f32;
```

**Returns:** `f32`

### `display-entity.set-shadow-radius` {#operation-display-entity-set-shadow-radius}

```text
set-shadow-radius: func(radius: f32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `radius` | `f32` |

### `display-entity.get-shadow-strength` {#operation-display-entity-get-shadow-strength}

```text
get-shadow-strength: func() -> f32;
```

**Returns:** `f32`

### `display-entity.set-shadow-strength` {#operation-display-entity-set-shadow-strength}

```text
set-shadow-strength: func(strength: f32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `strength` | `f32` |

### `display-entity.get-display-width` {#operation-display-entity-get-display-width}

```text
get-display-width: func() -> f32;
```

**Returns:** `f32`

### `display-entity.set-display-width` {#operation-display-entity-set-display-width}

```text
set-display-width: func(width: f32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `width` | `f32` |

### `display-entity.get-display-height` {#operation-display-entity-get-display-height}

```text
get-display-height: func() -> f32;
```

**Returns:** `f32`

### `display-entity.set-display-height` {#operation-display-entity-set-display-height}

```text
set-display-height: func(height: f32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `height` | `f32` |

### `display-entity.get-glow-color-override` {#operation-display-entity-get-glow-color-override}

```text
get-glow-color-override: func() -> s32;
```

**Returns:** `s32`

### `display-entity.set-glow-color-override` {#operation-display-entity-set-glow-color-override}

```text
set-glow-color-override: func(color: s32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `color` | `s32` |

### `display-entity.get-brightness` {#operation-display-entity-get-brightness}

```text
get-brightness: func() -> s32;
```

**Returns:** `s32`

### `display-entity.set-brightness` {#operation-display-entity-set-brightness}

```text
set-brightness: func(brightness: s32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `brightness` | `s32` |

### `block-display-entity.from-entity` {#operation-block-display-entity-from-entity}

```text
from-entity: static func(entity: borrow<entity>) -> option<block-display-entity>;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `entity` | `borrow<entity>` |

**Returns:** `option<block-display-entity>`

### `block-display-entity.get-display` {#operation-block-display-entity-get-display}

```text
get-display: func() -> display-entity;
```

**Returns:** `display-entity`

### `block-display-entity.get-entity` {#operation-block-display-entity-get-entity}

```text
get-entity: func() -> entity;
```

**Returns:** `entity`

### `block-display-entity.get-block-state-id` {#operation-block-display-entity-get-block-state-id}

```text
get-block-state-id: func() -> u16;
```

**Returns:** `u16`

### `block-display-entity.set-block-state-id` {#operation-block-display-entity-set-block-state-id}

```text
set-block-state-id: func(state-id: u16);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `state-id` | `u16` |

### `item-display-entity.from-entity` {#operation-item-display-entity-from-entity}

```text
from-entity: static func(entity: borrow<entity>) -> option<item-display-entity>;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `entity` | `borrow<entity>` |

**Returns:** `option<item-display-entity>`

### `item-display-entity.get-display` {#operation-item-display-entity-get-display}

```text
get-display: func() -> display-entity;
```

**Returns:** `display-entity`

### `item-display-entity.get-entity` {#operation-item-display-entity-get-entity}

```text
get-entity: func() -> entity;
```

**Returns:** `entity`

### `item-display-entity.get-item` {#operation-item-display-entity-get-item}

```text
get-item: func() -> option<item-stack>;
```

**Returns:** `option<item-stack>`

### `item-display-entity.set-item` {#operation-item-display-entity-set-item}

```text
set-item: func(item: option<item-stack>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `item` | `option<item-stack>` |

### `item-display-entity.get-item-display-mode` {#operation-item-display-entity-get-item-display-mode}

```text
get-item-display-mode: func() -> item-display-mode;
```

**Returns:** `item-display-mode`

### `item-display-entity.set-item-display-mode` {#operation-item-display-entity-set-item-display-mode}

```text
set-item-display-mode: func(mode: item-display-mode);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `mode` | `item-display-mode` |

### `text-display-entity.from-entity` {#operation-text-display-entity-from-entity}

```text
from-entity: static func(entity: borrow<entity>) -> option<text-display-entity>;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `entity` | `borrow<entity>` |

**Returns:** `option<text-display-entity>`

### `text-display-entity.get-display` {#operation-text-display-entity-get-display}

```text
get-display: func() -> display-entity;
```

**Returns:** `display-entity`

### `text-display-entity.get-entity` {#operation-text-display-entity-get-entity}

```text
get-entity: func() -> entity;
```

**Returns:** `entity`

### `text-display-entity.get-text` {#operation-text-display-entity-get-text}

```text
get-text: func() -> text-component;
```

**Returns:** `text-component`

### `text-display-entity.set-text` {#operation-text-display-entity-set-text}

```text
set-text: func(text: text-component);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `text` | `text-component` |

### `text-display-entity.get-line-width` {#operation-text-display-entity-get-line-width}

```text
get-line-width: func() -> s32;
```

**Returns:** `s32`

### `text-display-entity.set-line-width` {#operation-text-display-entity-set-line-width}

```text
set-line-width: func(width: s32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `width` | `s32` |

### `text-display-entity.get-background` {#operation-text-display-entity-get-background}

```text
get-background: func() -> s32;
```

**Returns:** `s32`

### `text-display-entity.set-background` {#operation-text-display-entity-set-background}

```text
set-background: func(color: s32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `color` | `s32` |

### `text-display-entity.get-text-opacity` {#operation-text-display-entity-get-text-opacity}

```text
get-text-opacity: func() -> s8;
```

**Returns:** `s8`

### `text-display-entity.set-text-opacity` {#operation-text-display-entity-set-text-opacity}

```text
set-text-opacity: func(opacity: s8);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `opacity` | `s8` |

### `text-display-entity.get-shadow` {#operation-text-display-entity-get-shadow}

```text
get-shadow: func() -> bool;
```

**Returns:** `bool`

### `text-display-entity.set-shadow` {#operation-text-display-entity-set-shadow}

```text
set-shadow: func(shadow: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `shadow` | `bool` |

### `text-display-entity.get-see-through` {#operation-text-display-entity-get-see-through}

```text
get-see-through: func() -> bool;
```

**Returns:** `bool`

### `text-display-entity.set-see-through` {#operation-text-display-entity-set-see-through}

```text
set-see-through: func(see-through: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `see-through` | `bool` |

### `text-display-entity.get-default-background` {#operation-text-display-entity-get-default-background}

```text
get-default-background: func() -> bool;
```

**Returns:** `bool`

### `text-display-entity.set-default-background` {#operation-text-display-entity-set-default-background}

```text
set-default-background: func(default-background: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `default-background` | `bool` |

### `text-display-entity.get-alignment` {#operation-text-display-entity-get-alignment}

```text
get-alignment: func() -> text-alignment;
```

**Returns:** `text-alignment`

### `text-display-entity.set-alignment` {#operation-text-display-entity-set-alignment}

```text
set-alignment: func(alignment: text-alignment);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `alignment` | `text-alignment` |

### `interaction-entity.from-entity` {#operation-interaction-entity-from-entity}

```text
from-entity: static func(entity: borrow<entity>) -> option<interaction-entity>;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `entity` | `borrow<entity>` |

**Returns:** `option<interaction-entity>`

### `interaction-entity.get-entity` {#operation-interaction-entity-get-entity}

```text
get-entity: func() -> entity;
```

**Returns:** `entity`

### `interaction-entity.get-width` {#operation-interaction-entity-get-width}

```text
get-width: func() -> f32;
```

**Returns:** `f32`

### `interaction-entity.set-width` {#operation-interaction-entity-set-width}

```text
set-width: func(width: f32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `width` | `f32` |

### `interaction-entity.get-height` {#operation-interaction-entity-get-height}

```text
get-height: func() -> f32;
```

**Returns:** `f32`

### `interaction-entity.set-height` {#operation-interaction-entity-set-height}

```text
set-height: func(height: f32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `height` | `f32` |

### `interaction-entity.get-response` {#operation-interaction-entity-get-response}

```text
get-response: func() -> bool;
```

**Returns:** `bool`

### `interaction-entity.set-response` {#operation-interaction-entity-set-response}

```text
set-response: func(response: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `response` | `bool` |

### `interaction-entity.get-last-attacker` {#operation-interaction-entity-get-last-attacker}

```text
get-last-attacker: func() -> option<uuid>;
```

**Returns:** `option<uuid>`

### `interaction-entity.get-last-interaction` {#operation-interaction-entity-get-last-interaction}

```text
get-last-interaction: func() -> option<uuid>;
```

**Returns:** `option<uuid>`
