---
title: Interface inventory
outline: [2, 2]
---

# Interface `inventory`

Host import: `pumpkin:plugin/inventory@0.1.0`

[Package summary](./)

Source: [inventory.wit](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/inventory.wit)

Inventory slots and player inventory operations.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`item-stack`](./item-stack) | `item-stack` |
| [`common`](./common) | `hand` |

## Type Summary

| Kind | Type | Description |
| --- | --- | --- |
| resource | [`inventory`](#type-inventory) | Common inventory resource used across GUIs, player inventories, and containers. |
| resource | [`player-inventory`](#type-player-inventory) | Specialized player inventory handle providing access to main inventory, armor, offhand, and hotbar. |

## Operation Summary

| Scope | Operation | Description |
| --- | --- | --- |
| `inventory` | [`clear`](#operation-inventory-clear) | Clears all items from this inventory. |
| `inventory` | [`contains-item`](#operation-inventory-contains-item) | Checks if the inventory contains at least one item with the given ID. |
| `inventory` | [`count-item`](#operation-inventory-count-item) | Counts the total number of items with the given ID in this inventory. |
| `inventory` | [`get-all-items`](#operation-inventory-get-all-items) | Returns all items in this inventory as a list of slots. |
| `inventory` | [`get-item`](#operation-inventory-get-item) | Returns the item in the specified slot index, or none if empty. |
| `inventory` | [`get-size`](#operation-inventory-get-size) | Returns the number of slots in this inventory. |
| `inventory` | [`is-empty`](#operation-inventory-is-empty) | Returns true if all slots in this inventory are empty. |
| `inventory` | [`remove-item`](#operation-inventory-remove-item) | Removes and returns the item in the specified slot index. |
| `inventory` | [`set-all-items`](#operation-inventory-set-all-items) | Sets all items in this inventory from a list. |
| `inventory` | [`set-item`](#operation-inventory-set-item) | Sets the item in the specified slot index. |
| `player-inventory` | [`as-inventory`](#operation-player-inventory-as-inventory) | Returns the generic 36-slot inventory handle (hotbar + main storage). |
| `player-inventory` | [`clear-all`](#operation-player-inventory-clear-all) | Clears all slots (main inventory, armor, offhand). |
| `player-inventory` | [`clear-armor`](#operation-player-inventory-clear-armor) | Clears all armor slots. |
| `player-inventory` | [`clear-main`](#operation-player-inventory-clear-main) | Clears the 36 main inventory slots. |
| `player-inventory` | [`get-boots`](#operation-player-inventory-get-boots) |  |
| `player-inventory` | [`get-chestplate`](#operation-player-inventory-get-chestplate) |  |
| `player-inventory` | [`get-helmet`](#operation-player-inventory-get-helmet) | Armor slot accessors |
| `player-inventory` | [`get-item-in-hand`](#operation-player-inventory-get-item-in-hand) | Returns the item currently held in the specified hand. |
| `player-inventory` | [`get-leggings`](#operation-player-inventory-get-leggings) |  |
| `player-inventory` | [`get-off-hand`](#operation-player-inventory-get-off-hand) |  |
| `player-inventory` | [`get-selected-slot`](#operation-player-inventory-get-selected-slot) | Returns the currently selected hotbar slot index (0-8). |
| `player-inventory` | [`set-boots`](#operation-player-inventory-set-boots) |  |
| `player-inventory` | [`set-chestplate`](#operation-player-inventory-set-chestplate) |  |
| `player-inventory` | [`set-helmet`](#operation-player-inventory-set-helmet) |  |
| `player-inventory` | [`set-item-in-hand`](#operation-player-inventory-set-item-in-hand) | Sets the item in the specified hand. |
| `player-inventory` | [`set-leggings`](#operation-player-inventory-set-leggings) |  |
| `player-inventory` | [`set-off-hand`](#operation-player-inventory-set-off-hand) |  |
| `player-inventory` | [`set-selected-slot`](#operation-player-inventory-set-selected-slot) | Sets the currently selected hotbar slot index (0-8). |

## Type Details

### `inventory` {#type-inventory}

Common inventory resource used across GUIs, player inventories, and containers.

Methods: [`get-size`](#operation-inventory-get-size), [`is-empty`](#operation-inventory-is-empty), [`get-item`](#operation-inventory-get-item), [`set-item`](#operation-inventory-set-item), [`remove-item`](#operation-inventory-remove-item), [`clear`](#operation-inventory-clear), [`get-all-items`](#operation-inventory-get-all-items), [`set-all-items`](#operation-inventory-set-all-items), [`count-item`](#operation-inventory-count-item), [`contains-item`](#operation-inventory-contains-item).

### `player-inventory` {#type-player-inventory}

Specialized player inventory handle providing access to main inventory, armor, offhand, and hotbar.

Methods: [`as-inventory`](#operation-player-inventory-as-inventory), [`get-item-in-hand`](#operation-player-inventory-get-item-in-hand), [`set-item-in-hand`](#operation-player-inventory-set-item-in-hand), [`get-selected-slot`](#operation-player-inventory-get-selected-slot), [`set-selected-slot`](#operation-player-inventory-set-selected-slot), [`get-helmet`](#operation-player-inventory-get-helmet), [`set-helmet`](#operation-player-inventory-set-helmet), [`get-chestplate`](#operation-player-inventory-get-chestplate), [`set-chestplate`](#operation-player-inventory-set-chestplate), [`get-leggings`](#operation-player-inventory-get-leggings), [`set-leggings`](#operation-player-inventory-set-leggings), [`get-boots`](#operation-player-inventory-get-boots), [`set-boots`](#operation-player-inventory-set-boots), [`get-off-hand`](#operation-player-inventory-get-off-hand), [`set-off-hand`](#operation-player-inventory-set-off-hand), [`clear-armor`](#operation-player-inventory-clear-armor), [`clear-main`](#operation-player-inventory-clear-main), [`clear-all`](#operation-player-inventory-clear-all).

## Operation Details

### `inventory.get-size` {#operation-inventory-get-size}

```text
get-size: func() -> u32;
```

Returns the number of slots in this inventory.

**Returns:** `u32`

### `inventory.is-empty` {#operation-inventory-is-empty}

```text
is-empty: func() -> bool;
```

Returns true if all slots in this inventory are empty.

**Returns:** `bool`

### `inventory.get-item` {#operation-inventory-get-item}

```text
get-item: func(slot: u32) -> option<item-stack>;
```

Returns the item in the specified slot index, or none if empty.

**Parameters**

| Name | WIT type |
| --- | --- |
| `slot` | `u32` |

**Returns:** `option<item-stack>`

### `inventory.set-item` {#operation-inventory-set-item}

```text
set-item: func(slot: u32, item: option<item-stack>);
```

Sets the item in the specified slot index.

**Parameters**

| Name | WIT type |
| --- | --- |
| `slot` | `u32` |
| `item` | `option<item-stack>` |

### `inventory.remove-item` {#operation-inventory-remove-item}

```text
remove-item: func(slot: u32) -> option<item-stack>;
```

Removes and returns the item in the specified slot index.

**Parameters**

| Name | WIT type |
| --- | --- |
| `slot` | `u32` |

**Returns:** `option<item-stack>`

### `inventory.clear` {#operation-inventory-clear}

```text
clear: func();
```

Clears all items from this inventory.

### `inventory.get-all-items` {#operation-inventory-get-all-items}

```text
get-all-items: func() -> list<option<item-stack>>;
```

Returns all items in this inventory as a list of slots.

**Returns:** `list<option<item-stack>>`

### `inventory.set-all-items` {#operation-inventory-set-all-items}

```text
set-all-items: func(items: list<option<item-stack>>);
```

Sets all items in this inventory from a list.

**Parameters**

| Name | WIT type |
| --- | --- |
| `items` | `list<option<item-stack>>` |

### `inventory.count-item` {#operation-inventory-count-item}

```text
count-item: func(item-id: string) -> u32;
```

Counts the total number of items with the given ID in this inventory.

**Parameters**

| Name | WIT type |
| --- | --- |
| `item-id` | `string` |

**Returns:** `u32`

### `inventory.contains-item` {#operation-inventory-contains-item}

```text
contains-item: func(item-id: string) -> bool;
```

Checks if the inventory contains at least one item with the given ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `item-id` | `string` |

**Returns:** `bool`

### `player-inventory.as-inventory` {#operation-player-inventory-as-inventory}

```text
as-inventory: func() -> inventory;
```

Returns the generic 36-slot inventory handle (hotbar + main storage).

**Returns:** `inventory`

### `player-inventory.get-item-in-hand` {#operation-player-inventory-get-item-in-hand}

```text
get-item-in-hand: func(hand: hand) -> option<item-stack>;
```

Returns the item currently held in the specified hand.

**Parameters**

| Name | WIT type |
| --- | --- |
| `hand` | `hand` |

**Returns:** `option<item-stack>`

### `player-inventory.set-item-in-hand` {#operation-player-inventory-set-item-in-hand}

```text
set-item-in-hand: func(hand: hand, item: option<item-stack>);
```

Sets the item in the specified hand.

**Parameters**

| Name | WIT type |
| --- | --- |
| `hand` | `hand` |
| `item` | `option<item-stack>` |

### `player-inventory.get-selected-slot` {#operation-player-inventory-get-selected-slot}

```text
get-selected-slot: func() -> u8;
```

Returns the currently selected hotbar slot index (0-8).

**Returns:** `u8`

### `player-inventory.set-selected-slot` {#operation-player-inventory-set-selected-slot}

```text
set-selected-slot: func(slot: u8);
```

Sets the currently selected hotbar slot index (0-8).

**Parameters**

| Name | WIT type |
| --- | --- |
| `slot` | `u8` |

### `player-inventory.get-helmet` {#operation-player-inventory-get-helmet}

```text
get-helmet: func() -> option<item-stack>;
```

Armor slot accessors

**Returns:** `option<item-stack>`

### `player-inventory.set-helmet` {#operation-player-inventory-set-helmet}

```text
set-helmet: func(item: option<item-stack>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `item` | `option<item-stack>` |

### `player-inventory.get-chestplate` {#operation-player-inventory-get-chestplate}

```text
get-chestplate: func() -> option<item-stack>;
```

**Returns:** `option<item-stack>`

### `player-inventory.set-chestplate` {#operation-player-inventory-set-chestplate}

```text
set-chestplate: func(item: option<item-stack>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `item` | `option<item-stack>` |

### `player-inventory.get-leggings` {#operation-player-inventory-get-leggings}

```text
get-leggings: func() -> option<item-stack>;
```

**Returns:** `option<item-stack>`

### `player-inventory.set-leggings` {#operation-player-inventory-set-leggings}

```text
set-leggings: func(item: option<item-stack>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `item` | `option<item-stack>` |

### `player-inventory.get-boots` {#operation-player-inventory-get-boots}

```text
get-boots: func() -> option<item-stack>;
```

**Returns:** `option<item-stack>`

### `player-inventory.set-boots` {#operation-player-inventory-set-boots}

```text
set-boots: func(item: option<item-stack>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `item` | `option<item-stack>` |

### `player-inventory.get-off-hand` {#operation-player-inventory-get-off-hand}

```text
get-off-hand: func() -> option<item-stack>;
```

**Returns:** `option<item-stack>`

### `player-inventory.set-off-hand` {#operation-player-inventory-set-off-hand}

```text
set-off-hand: func(item: option<item-stack>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `item` | `option<item-stack>` |

### `player-inventory.clear-armor` {#operation-player-inventory-clear-armor}

```text
clear-armor: func();
```

Clears all armor slots.

### `player-inventory.clear-main` {#operation-player-inventory-clear-main}

```text
clear-main: func();
```

Clears the 36 main inventory slots.

### `player-inventory.clear-all` {#operation-player-inventory-clear-all}

```text
clear-all: func();
```

Clears all slots (main inventory, armor, offhand).
