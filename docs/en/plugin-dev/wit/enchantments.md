---
title: Interface enchantments
outline: [2, 2]
---

# Interface `enchantments`

Host import: `pumpkin:plugin/enchantments@0.1.0`

[Package summary](./)

Source: [enchantments.wit](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/enchantments.wit)

Enchantment definitions and registration.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`text`](./text) | `text-component` |

## Type Summary

| Kind | Type | Description |
| --- | --- | --- |
| enum | [`attribute-modifier-slot`](#type-attribute-modifier-slot) | Equipment slot where an enchantment is active. |
| record | [`custom-enchantment`](#type-custom-enchantment) | Represents a custom enchantment definition. |
| enum | [`enchantment`](#type-enchantment) | Vanilla enchantments enum. |
| resource | [`enchantment-manager`](#type-enchantment-manager) | Global manager for registering and querying custom enchantments. |

## Operation Summary

| Scope | Operation | Description |
| --- | --- | --- |
| `enchantment-manager` | [`get-all-enchantment-ids`](#operation-enchantment-manager-get-all-enchantment-ids) | Returns all registered custom enchantment IDs. |
| `enchantment-manager` | [`get-enchantment`](#operation-enchantment-manager-get-enchantment) | Gets an enchantment definition by its ID. |
| `enchantment-manager` | [`has-enchantment`](#operation-enchantment-manager-has-enchantment) | Checks if an enchantment ID is registered. |
| `enchantment-manager` | [`register-enchantment`](#operation-enchantment-manager-register-enchantment) | Registers a new custom enchantment with the server. |

## Type Details

### `attribute-modifier-slot` {#type-attribute-modifier-slot}

Equipment slot where an enchantment is active.

**Enum cases**

| Name |
| --- |
| `any` |
| `main-hand` |
| `off-hand` |
| `hand` |
| `feet` |
| `legs` |
| `chest` |
| `head` |
| `armor` |
| `body` |
| `saddle` |

### `enchantment` {#type-enchantment}

Vanilla enchantments enum.

**Enum cases**

| Name |
| --- |
| `aqua-affinity` |
| `bane-of-arthropods` |
| `binding-curse` |
| `blast-protection` |
| `breach` |
| `channeling` |
| `density` |
| `depth-strider` |
| `efficiency` |
| `feather-falling` |
| `fire-aspect` |
| `fire-protection` |
| `flame` |
| `fortune` |
| `frost-walker` |
| `impaling` |
| `infinity` |
| `knockback` |
| `looting` |
| `loyalty` |
| `luck-of-the-sea` |
| `lunge` |
| `lure` |
| `mending` |
| `multishot` |
| `piercing` |
| `power` |
| `projectile-protection` |
| `protection` |
| `punch` |
| `quick-charge` |
| `respiration` |
| `riptide` |
| `sharpness` |
| `silk-touch` |
| `smite` |
| `soul-speed` |
| `sweeping-edge` |
| `swift-sneak` |
| `thorns` |
| `unbreaking` |
| `vanishing-curse` |
| `wind-burst` |

### `custom-enchantment` {#type-custom-enchantment}

Represents a custom enchantment definition.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the enchantment (e.g. "my_plugin:lifesteal"). |
| `description` | `text-component` | Description or display name of the enchantment. |
| `max-level` | `u32` | Maximum level of the enchantment (e.g. 1..=10). |
| `anvil-cost` | `u32` | Base anvil repair/combination cost multiplier. |
| `supported-items` | `string` | Tag or item pattern for supported items (e.g. "#minecraft:enchantable/weapon"). |
| `weight` | `u32` | Weight / rarity of the enchantment (higher = more common, default 5). |
| `slots` | `list<attribute-modifier-slot>` | Equipment slots where this enchantment is active. |
| `exclusive-set` | `list<string>` | List of exclusive/conflicting enchantment IDs. |

### `enchantment-manager` {#type-enchantment-manager}

Global manager for registering and querying custom enchantments.

Methods: [`register-enchantment`](#operation-enchantment-manager-register-enchantment), [`get-enchantment`](#operation-enchantment-manager-get-enchantment), [`has-enchantment`](#operation-enchantment-manager-has-enchantment), [`get-all-enchantment-ids`](#operation-enchantment-manager-get-all-enchantment-ids).

## Operation Details

### `enchantment-manager.register-enchantment` {#operation-enchantment-manager-register-enchantment}

```text
register-enchantment: func(enchantment: custom-enchantment) -> result<_, string>;
```

Registers a new custom enchantment with the server.

**Parameters**

| Name | WIT type |
| --- | --- |
| `enchantment` | `custom-enchantment` |

**Returns:** `result<_, string>`

### `enchantment-manager.get-enchantment` {#operation-enchantment-manager-get-enchantment}

```text
get-enchantment: func(id: string) -> option<custom-enchantment>;
```

Gets an enchantment definition by its ID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `string` |

**Returns:** `option<custom-enchantment>`

### `enchantment-manager.has-enchantment` {#operation-enchantment-manager-has-enchantment}

```text
has-enchantment: func(id: string) -> bool;
```

Checks if an enchantment ID is registered.

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `string` |

**Returns:** `bool`

### `enchantment-manager.get-all-enchantment-ids` {#operation-enchantment-manager-get-all-enchantment-ids}

```text
get-all-enchantment-ids: func() -> list<string>;
```

Returns all registered custom enchantment IDs.

**Returns:** `list<string>`
