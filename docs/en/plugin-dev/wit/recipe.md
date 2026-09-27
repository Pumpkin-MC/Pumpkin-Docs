---
title: Interface recipe
outline: [2, 2]
---

# Interface `recipe`

Host import: `pumpkin:plugin/recipe@0.1.0`

[Package summary](./)

Source: [recipe.wit](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/blob/master/v0.1/recipe.wit)

Recipe definitions and registration.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`item-stack`](./item-stack) | `item-stack` |

## Type Summary

| Kind | Type | Description |
| --- | --- | --- |
| record | [`cooking-recipe`](#type-cooking-recipe) | Represents a cooking recipe (Smelting, Blasting, Smoking, Campfire). |
| enum | [`cooking-type`](#type-cooking-type) | Types of cooking stations. |
| variant | [`ingredient`](#type-ingredient) | Represents an ingredient in a recipe. |
| enum | [`recipe-category`](#type-recipe-category) | Recipe category for the recipe book. |
| resource | [`recipe-manager`](#type-recipe-manager) | Common interface for registering recipes. |
| record | [`shaped-recipe`](#type-shaped-recipe) | Represents a shaped crafting recipe. |
| record | [`shapeless-recipe`](#type-shapeless-recipe) | Represents a shapeless crafting recipe. |

## Operation Summary

| Scope | Operation | Description |
| --- | --- | --- |
| `recipe-manager` | [`register-cooking`](#operation-recipe-manager-register-cooking) | Registers a cooking recipe. |
| `recipe-manager` | [`register-shaped`](#operation-recipe-manager-register-shaped) | Registers a shaped crafting recipe. |
| `recipe-manager` | [`register-shapeless`](#operation-recipe-manager-register-shapeless) | Registers a shapeless crafting recipe. |

## Type Details

### `recipe-category` {#type-recipe-category}

Recipe category for the recipe book.

**Enum cases**

| Name |
| --- |
| `building` |
| `redstone` |
| `equipment` |
| `misc` |
| `food` |
| `blocks` |

### `ingredient` {#type-ingredient}

Represents an ingredient in a recipe.

**Variant cases**

| Name | WIT type | Description |
| --- | --- | --- |
| `item` | `string` | A specific item (e.g. "minecraft:diamond"). |
| `tag` | `string` | A tag group of items (e.g., "minecraft:logs"). |
| `one-of` | `list<string>` | One of multiple specific items. |

### `shaped-recipe` {#type-shaped-recipe}

Represents a shaped crafting recipe.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `pattern` | `list<string>` | The pattern of the recipe (e.g., ["# #", " s ", "# #"]). |
| `key` | `list<tuple<string, ingredient>>` | Mapping of characters in the pattern to ingredients. |
| `output` | `item-stack` | The resulting item stack. |
| `group` | `option<string>` | The recipe group (optional). |
| `category` | `option<recipe-category>` | The recipe category in the recipe book. |
| `show-notification` | `option<bool>` | Whether to show a toast notification when the recipe is unlocked. |

### `shapeless-recipe` {#type-shapeless-recipe}

Represents a shapeless crafting recipe.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `ingredients` | `list<ingredient>` | The list of ingredients required. |
| `output` | `item-stack` | The resulting item stack. |
| `group` | `option<string>` | The recipe group (optional). |
| `category` | `option<recipe-category>` | The recipe category in the recipe book. |

### `cooking-recipe` {#type-cooking-recipe}

Represents a cooking recipe (Smelting, Blasting, Smoking, Campfire).

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `ingredient` | `ingredient` | The ingredient to cook. |
| `output` | `item-stack` | The resulting item stack. |
| `experience` | `f32` | Experience points awarded. |
| `cooking-time` | `u32` | Cooking time in ticks. |
| `group` | `option<string>` | The recipe group (optional). |
| `category` | `option<recipe-category>` | The recipe category in the recipe book. |

### `cooking-type` {#type-cooking-type}

Types of cooking stations.

**Enum cases**

| Name |
| --- |
| `smelting` |
| `blasting` |
| `smoking` |
| `campfire` |

### `recipe-manager` {#type-recipe-manager}

Common interface for registering recipes.

Methods: [`register-shaped`](#operation-recipe-manager-register-shaped), [`register-shapeless`](#operation-recipe-manager-register-shapeless), [`register-cooking`](#operation-recipe-manager-register-cooking).

## Operation Details

### `recipe-manager.register-shaped` {#operation-recipe-manager-register-shaped}

```text
register-shaped: func(id: string, recipe: shaped-recipe);
```

Registers a shaped crafting recipe.

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `string` |
| `recipe` | `shaped-recipe` |

### `recipe-manager.register-shapeless` {#operation-recipe-manager-register-shapeless}

```text
register-shapeless: func(id: string, recipe: shapeless-recipe);
```

Registers a shapeless crafting recipe.

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `string` |
| `recipe` | `shapeless-recipe` |

### `recipe-manager.register-cooking` {#operation-recipe-manager-register-cooking}

```text
register-cooking: func(id: string, station-type: cooking-type, recipe: cooking-recipe);
```

Registers a cooking recipe.

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `string` |
| `station-type` | `cooking-type` |
| `recipe` | `cooking-recipe` |
