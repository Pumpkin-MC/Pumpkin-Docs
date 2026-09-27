---
title: Interface gui
outline: [2, 2]
---

# Interface `gui`

Host import: `pumpkin:plugin/gui@0.1.0`

[Package summary](./)

Source: [gui.wit](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/blob/master/v0.1/gui.wit)

GUI creation and updates.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`text`](./text) | `text-component` |
| [`common`](./common) | `click-type` |
| [`item-stack`](./item-stack) | `item-stack` |
| [`screens`](./screens) | `screen` |
| [`inventory`](./inventory) | `inventory` |

## Type Summary

| Kind | Type |
| --- | --- |
| resource | [`gui`](#type-gui) |

## Operation Summary

| Scope | Operation | Description |
| --- | --- | --- |
| `gui` | [`clear-items`](#operation-gui-clear-items) | Clears all items from the GUI. |
| `gui` | [`constructor`](#operation-gui-constructor) |  |
| `gui` | [`get-allow-grab-items`](#operation-gui-get-allow-grab-items) | Returns whether players can grab items out of the inventory. |
| `gui` | [`get-allow-put-items`](#operation-gui-get-allow-put-items) | Returns whether players can put items into the inventory from their own. |
| `gui` | [`get-inventory`](#operation-gui-get-inventory) | Returns the underlying inventory handle for this GUI. |
| `gui` | [`get-item`](#operation-gui-get-item) |  |
| `gui` | [`get-size`](#operation-gui-get-size) | Returns the number of slots in this GUI. |
| `gui` | [`get-title`](#operation-gui-get-title) | Returns the title of this GUI. |
| `gui` | [`get-type`](#operation-gui-get-type) | Returns the type of this GUI. |
| `gui` | [`set-allow-grab-items`](#operation-gui-set-allow-grab-items) | Sets whether players can grab items out of the inventory. |
| `gui` | [`set-allow-put-items`](#operation-gui-set-allow-put-items) | Sets whether players can put items into the inventory from their own. |
| `gui` | [`set-item`](#operation-gui-set-item) |  |

## Type Details

### `gui` {#type-gui}

Methods: [`constructor`](#operation-gui-constructor), [`get-inventory`](#operation-gui-get-inventory), [`set-item`](#operation-gui-set-item), [`get-item`](#operation-gui-get-item), [`get-type`](#operation-gui-get-type), [`get-title`](#operation-gui-get-title), [`get-size`](#operation-gui-get-size), [`clear-items`](#operation-gui-clear-items), [`set-allow-grab-items`](#operation-gui-set-allow-grab-items), [`get-allow-grab-items`](#operation-gui-get-allow-grab-items), [`set-allow-put-items`](#operation-gui-set-allow-put-items), [`get-allow-put-items`](#operation-gui-get-allow-put-items).

## Operation Details

### `gui.constructor` {#operation-gui-constructor}

```text
constructor(%type: screen, title: text-component);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `%type` | `screen` |
| `title` | `text-component` |

### `gui.get-inventory` {#operation-gui-get-inventory}

```text
get-inventory: func() -> inventory;
```

Returns the underlying inventory handle for this GUI.

**Returns:** `inventory`

### `gui.set-item` {#operation-gui-set-item}

```text
set-item: func(slot: u32, item: item-stack);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `slot` | `u32` |
| `item` | `item-stack` |

### `gui.get-item` {#operation-gui-get-item}

```text
get-item: func(slot: u32) -> option<item-stack>;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `slot` | `u32` |

**Returns:** `option<item-stack>`

### `gui.get-type` {#operation-gui-get-type}

```text
get-type: func() -> screen;
```

Returns the type of this GUI.

**Returns:** `screen`

### `gui.get-title` {#operation-gui-get-title}

```text
get-title: func() -> text-component;
```

Returns the title of this GUI.

**Returns:** `text-component`

### `gui.get-size` {#operation-gui-get-size}

```text
get-size: func() -> u32;
```

Returns the number of slots in this GUI.

**Returns:** `u32`

### `gui.clear-items` {#operation-gui-clear-items}

```text
clear-items: func();
```

Clears all items from the GUI.

### `gui.set-allow-grab-items` {#operation-gui-set-allow-grab-items}

```text
set-allow-grab-items: func(allow: bool);
```

Sets whether players can grab items out of the inventory.

**Parameters**

| Name | WIT type |
| --- | --- |
| `allow` | `bool` |

### `gui.get-allow-grab-items` {#operation-gui-get-allow-grab-items}

```text
get-allow-grab-items: func() -> bool;
```

Returns whether players can grab items out of the inventory.

**Returns:** `bool`

### `gui.set-allow-put-items` {#operation-gui-set-allow-put-items}

```text
set-allow-put-items: func(allow: bool);
```

Sets whether players can put items into the inventory from their own.

**Parameters**

| Name | WIT type |
| --- | --- |
| `allow` | `bool` |

### `gui.get-allow-put-items` {#operation-gui-get-allow-put-items}

```text
get-allow-put-items: func() -> bool;
```

Returns whether players can put items into the inventory from their own.

**Returns:** `bool`
