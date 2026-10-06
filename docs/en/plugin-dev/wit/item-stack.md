---
title: Interface item-stack
outline: [2, 2]
---

# Interface `item-stack`

Shared types: `pumpkin:plugin/item-stack@0.1.0`

[Package summary](./)

Source: [item-stack.wit](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/item-stack.wit)

Item stacks and their components.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`attributes`](./attributes) | `attribute`, `attribute-modifier` |
| [`data-components`](./data-components) | `data-component` |
| [`enchantments`](./enchantments) | `attribute-modifier-slot`, `enchantment` |
| [`text`](./text) | `text-component` |
| [`common`](./common) | `nbt-entry`, `nbt-tree`, `nbt-tag` |

## Type Summary

| Kind | Type | Description |
| --- | --- | --- |
| record | [`custom-enchantment-value`](#type-custom-enchantment-value) | Represents a custom enchantment and its level on an item stack. |
| record | [`data-component-value`](#type-data-component-value) | Represents a data component and its serialized value. |
| record | [`enchantment-value`](#type-enchantment-value) | Represents an enchantment and its level. |
| record | [`item-attribute-modifier`](#type-item-attribute-modifier) | Represents an attribute modifier applied to an item stack for a specific slot. |
| resource | [`item-stack`](#type-item-stack) |  |

## Operation Summary

| Scope | Operation | Description |
| --- | --- | --- |
| `item-stack` | [`add-attribute-modifier`](#operation-item-stack-add-attribute-modifier) | Adds an attribute modifier to this item stack. |
| `item-stack` | [`add-custom-enchantment`](#operation-item-stack-add-custom-enchantment) | Adds a custom enchantment to this item stack. |
| `item-stack` | [`add-enchantment`](#operation-item-stack-add-enchantment) | Adds an enchantment to this item stack. |
| `item-stack` | [`add-lore`](#operation-item-stack-add-lore) | Adds a line to the lore of this item stack. |
| `item-stack` | [`clear-attribute-modifiers`](#operation-item-stack-clear-attribute-modifiers) | Clears all custom attribute modifiers from this item stack. |
| `item-stack` | [`constructor`](#operation-item-stack-constructor) |  |
| `item-stack` | [`get-attribute-modifiers`](#operation-item-stack-get-attribute-modifiers) | Returns all attribute modifiers on this item stack. |
| `item-stack` | [`get-components`](#operation-item-stack-get-components) | Returns all data components on this item stack. |
| `item-stack` | [`get-count`](#operation-item-stack-get-count) | Returns the number of items in the stack. |
| `item-stack` | [`get-custom-data`](#operation-item-stack-get-custom-data) | Returns a namespaced custom data value from this item stack, if set. |
| `item-stack` | [`get-custom-enchantment-level`](#operation-item-stack-get-custom-enchantment-level) | Returns the level of a custom enchantment on this item stack, if present. |
| `item-stack` | [`get-custom-enchantments`](#operation-item-stack-get-custom-enchantments) | Returns all custom enchantments on this item stack. |
| `item-stack` | [`get-custom-name`](#operation-item-stack-get-custom-name) | Returns the custom name of this item stack, if set. |
| `item-stack` | [`get-enchantments`](#operation-item-stack-get-enchantments) | Returns all enchantments on this item stack. |
| `item-stack` | [`get-lore`](#operation-item-stack-get-lore) | Returns the lore of this item stack. |
| `item-stack` | [`get-max-count`](#operation-item-stack-get-max-count) | Returns the maximum number of items that can be in this stack. |
| `item-stack` | [`get-registry-key`](#operation-item-stack-get-registry-key) | Returns the unique registry key of the item (e.g., "minecraft:diamond"). |
| `item-stack` | [`has-custom-data`](#operation-item-stack-has-custom-data) | Returns whether this item stack has a namespaced custom data value. |
| `item-stack` | [`has-custom-enchantment`](#operation-item-stack-has-custom-enchantment) | Returns whether this item stack has a specific custom enchantment. |
| `item-stack` | [`remove-attribute-modifiers`](#operation-item-stack-remove-attribute-modifiers) | Removes all attribute modifiers for a specific attribute from this item stack. |
| `item-stack` | [`remove-component`](#operation-item-stack-remove-component) | Removes a data component from this item stack. |
| `item-stack` | [`remove-custom-data`](#operation-item-stack-remove-custom-data) | Removes a namespaced custom data value from this item stack. |
| `item-stack` | [`remove-custom-enchantment`](#operation-item-stack-remove-custom-enchantment) | Removes a custom enchantment from this item stack. |
| `item-stack` | [`remove-enchantment`](#operation-item-stack-remove-enchantment) | Removes an enchantment from this item stack. |
| `item-stack` | [`set-component`](#operation-item-stack-set-component) | Sets a data component on this item stack. |
| `item-stack` | [`set-count`](#operation-item-stack-set-count) | Sets the number of items in the stack. |
| `item-stack` | [`set-custom-data`](#operation-item-stack-set-custom-data) | Sets a namespaced custom data value on this item stack. |
| `item-stack` | [`set-custom-name`](#operation-item-stack-set-custom-name) | Sets the custom name of this item stack. |
| `item-stack` | [`set-lore`](#operation-item-stack-set-lore) | Sets the lore of this item stack. |

## Type Details

### `enchantment-value` {#type-enchantment-value}

Represents an enchantment and its level.

**Record fields**

| Name | WIT type |
| --- | --- |
| `enchantment` | `enchantment` |
| `level` | `u32` |

### `custom-enchantment-value` {#type-custom-enchantment-value}

Represents a custom enchantment and its level on an item stack.

**Record fields**

| Name | WIT type |
| --- | --- |
| `enchantment-id` | `string` |
| `level` | `u32` |

### `item-attribute-modifier` {#type-item-attribute-modifier}

Represents an attribute modifier applied to an item stack for a specific slot.

**Record fields**

| Name | WIT type |
| --- | --- |
| `attribute` | `attribute` |
| `modifier` | `attribute-modifier` |
| `slot` | `attribute-modifier-slot` |

### `data-component-value` {#type-data-component-value}

Represents a data component and its serialized value.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `component` | `data-component` |  |
| `value` | `list<u8>` | The serialized value of the component. |

### `item-stack` {#type-item-stack}

Methods: [`constructor`](#operation-item-stack-constructor), [`get-registry-key`](#operation-item-stack-get-registry-key), [`get-count`](#operation-item-stack-get-count), [`set-count`](#operation-item-stack-set-count), [`get-max-count`](#operation-item-stack-get-max-count), [`get-enchantments`](#operation-item-stack-get-enchantments), [`add-enchantment`](#operation-item-stack-add-enchantment), [`remove-enchantment`](#operation-item-stack-remove-enchantment), [`get-custom-enchantments`](#operation-item-stack-get-custom-enchantments), [`add-custom-enchantment`](#operation-item-stack-add-custom-enchantment), [`remove-custom-enchantment`](#operation-item-stack-remove-custom-enchantment), [`get-custom-enchantment-level`](#operation-item-stack-get-custom-enchantment-level), [`has-custom-enchantment`](#operation-item-stack-has-custom-enchantment), [`get-attribute-modifiers`](#operation-item-stack-get-attribute-modifiers), [`add-attribute-modifier`](#operation-item-stack-add-attribute-modifier), [`remove-attribute-modifiers`](#operation-item-stack-remove-attribute-modifiers), [`clear-attribute-modifiers`](#operation-item-stack-clear-attribute-modifiers), [`get-lore`](#operation-item-stack-get-lore), [`set-lore`](#operation-item-stack-set-lore), [`add-lore`](#operation-item-stack-add-lore), [`get-custom-name`](#operation-item-stack-get-custom-name), [`set-custom-name`](#operation-item-stack-set-custom-name), [`set-custom-data`](#operation-item-stack-set-custom-data), [`get-custom-data`](#operation-item-stack-get-custom-data), [`remove-custom-data`](#operation-item-stack-remove-custom-data), [`has-custom-data`](#operation-item-stack-has-custom-data), [`get-components`](#operation-item-stack-get-components), [`set-component`](#operation-item-stack-set-component), [`remove-component`](#operation-item-stack-remove-component).

## Operation Details

### `item-stack.constructor` {#operation-item-stack-constructor}

```text
constructor(registry-key: string, count: u8);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `registry-key` | `string` |
| `count` | `u8` |

### `item-stack.get-registry-key` {#operation-item-stack-get-registry-key}

```text
get-registry-key: func() -> string;
```

Returns the unique registry key of the item (e.g., "minecraft:diamond").

**Returns:** `string`

### `item-stack.get-count` {#operation-item-stack-get-count}

```text
get-count: func() -> u8;
```

Returns the number of items in the stack.

**Returns:** `u8`

### `item-stack.set-count` {#operation-item-stack-set-count}

```text
set-count: func(count: u8);
```

Sets the number of items in the stack.

**Parameters**

| Name | WIT type |
| --- | --- |
| `count` | `u8` |

### `item-stack.get-max-count` {#operation-item-stack-get-max-count}

```text
get-max-count: func() -> u8;
```

Returns the maximum number of items that can be in this stack.

**Returns:** `u8`

### `item-stack.get-enchantments` {#operation-item-stack-get-enchantments}

```text
get-enchantments: func() -> list<enchantment-value>;
```

Returns all enchantments on this item stack.

**Returns:** `list<enchantment-value>`

### `item-stack.add-enchantment` {#operation-item-stack-add-enchantment}

```text
add-enchantment: func(enchantment: enchantment, level: u32);
```

Adds an enchantment to this item stack.

**Parameters**

| Name | WIT type |
| --- | --- |
| `enchantment` | `enchantment` |
| `level` | `u32` |

### `item-stack.remove-enchantment` {#operation-item-stack-remove-enchantment}

```text
remove-enchantment: func(enchantment: enchantment);
```

Removes an enchantment from this item stack.

**Parameters**

| Name | WIT type |
| --- | --- |
| `enchantment` | `enchantment` |

### `item-stack.get-custom-enchantments` {#operation-item-stack-get-custom-enchantments}

```text
get-custom-enchantments: func() -> list<custom-enchantment-value>;
```

Returns all custom enchantments on this item stack.

**Returns:** `list<custom-enchantment-value>`

### `item-stack.add-custom-enchantment` {#operation-item-stack-add-custom-enchantment}

```text
add-custom-enchantment: func(enchantment-id: string, level: u32);
```

Adds a custom enchantment to this item stack.

**Parameters**

| Name | WIT type |
| --- | --- |
| `enchantment-id` | `string` |
| `level` | `u32` |

### `item-stack.remove-custom-enchantment` {#operation-item-stack-remove-custom-enchantment}

```text
remove-custom-enchantment: func(enchantment-id: string);
```

Removes a custom enchantment from this item stack.

**Parameters**

| Name | WIT type |
| --- | --- |
| `enchantment-id` | `string` |

### `item-stack.get-custom-enchantment-level` {#operation-item-stack-get-custom-enchantment-level}

```text
get-custom-enchantment-level: func(enchantment-id: string) -> option<u32>;
```

Returns the level of a custom enchantment on this item stack, if present.

**Parameters**

| Name | WIT type |
| --- | --- |
| `enchantment-id` | `string` |

**Returns:** `option<u32>`

### `item-stack.has-custom-enchantment` {#operation-item-stack-has-custom-enchantment}

```text
has-custom-enchantment: func(enchantment-id: string) -> bool;
```

Returns whether this item stack has a specific custom enchantment.

**Parameters**

| Name | WIT type |
| --- | --- |
| `enchantment-id` | `string` |

**Returns:** `bool`

### `item-stack.get-attribute-modifiers` {#operation-item-stack-get-attribute-modifiers}

```text
get-attribute-modifiers: func() -> list<item-attribute-modifier>;
```

Returns all attribute modifiers on this item stack.

**Returns:** `list<item-attribute-modifier>`

### `item-stack.add-attribute-modifier` {#operation-item-stack-add-attribute-modifier}

```text
add-attribute-modifier: func(modifier: item-attribute-modifier);
```

Adds an attribute modifier to this item stack.

**Parameters**

| Name | WIT type |
| --- | --- |
| `modifier` | `item-attribute-modifier` |

### `item-stack.remove-attribute-modifiers` {#operation-item-stack-remove-attribute-modifiers}

```text
remove-attribute-modifiers: func(attribute: attribute);
```

Removes all attribute modifiers for a specific attribute from this item stack.

**Parameters**

| Name | WIT type |
| --- | --- |
| `attribute` | `attribute` |

### `item-stack.clear-attribute-modifiers` {#operation-item-stack-clear-attribute-modifiers}

```text
clear-attribute-modifiers: func();
```

Clears all custom attribute modifiers from this item stack.

### `item-stack.get-lore` {#operation-item-stack-get-lore}

```text
get-lore: func() -> list<text-component>;
```

Returns the lore of this item stack.

**Returns:** `list<text-component>`

### `item-stack.set-lore` {#operation-item-stack-set-lore}

```text
set-lore: func(lore: list<text-component>);
```

Sets the lore of this item stack.

**Parameters**

| Name | WIT type |
| --- | --- |
| `lore` | `list<text-component>` |

### `item-stack.add-lore` {#operation-item-stack-add-lore}

```text
add-lore: func(line: text-component);
```

Adds a line to the lore of this item stack.

**Parameters**

| Name | WIT type |
| --- | --- |
| `line` | `text-component` |

### `item-stack.get-custom-name` {#operation-item-stack-get-custom-name}

```text
get-custom-name: func() -> option<text-component>;
```

Returns the custom name of this item stack, if set.

**Returns:** `option<text-component>`

### `item-stack.set-custom-name` {#operation-item-stack-set-custom-name}

```text
set-custom-name: func(name: option<text-component>);
```

Sets the custom name of this item stack.

**Parameters**

| Name | WIT type |
| --- | --- |
| `name` | `option<text-component>` |

### `item-stack.set-custom-data` {#operation-item-stack-set-custom-data}

```text
set-custom-data: func(namespace: string, key: string, value: nbt-tree);
```

Sets a namespaced custom data value on this item stack.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |
| `value` | `nbt-tree` |

### `item-stack.get-custom-data` {#operation-item-stack-get-custom-data}

```text
get-custom-data: func(namespace: string, key: string) -> option<nbt-tree>;
```

Returns a namespaced custom data value from this item stack, if set.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |

**Returns:** `option<nbt-tree>`

### `item-stack.remove-custom-data` {#operation-item-stack-remove-custom-data}

```text
remove-custom-data: func(namespace: string, key: string);
```

Removes a namespaced custom data value from this item stack.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |

### `item-stack.has-custom-data` {#operation-item-stack-has-custom-data}

```text
has-custom-data: func(namespace: string, key: string) -> bool;
```

Returns whether this item stack has a namespaced custom data value.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |

**Returns:** `bool`

### `item-stack.get-components` {#operation-item-stack-get-components}

```text
get-components: func() -> list<data-component-value>;
```

Returns all data components on this item stack.

**Returns:** `list<data-component-value>`

### `item-stack.set-component` {#operation-item-stack-set-component}

```text
set-component: func(component: data-component, value: list<u8>);
```

Sets a data component on this item stack.

**Parameters**

| Name | WIT type |
| --- | --- |
| `component` | `data-component` |
| `value` | `list<u8>` |

### `item-stack.remove-component` {#operation-item-stack-remove-component}

```text
remove-component: func(component: data-component);
```

Removes a data component from this item stack.

**Parameters**

| Name | WIT type |
| --- | --- |
| `component` | `data-component` |
