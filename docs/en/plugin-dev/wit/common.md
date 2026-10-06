---
title: Interface common
outline: [2, 2]
---

# Interface `common`

Shared types: `pumpkin:plugin/common@0.1.0`

[Package summary](./)

Source: [common.wit](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/common.wit)

Coordinates, colors, NBT, and other shared types.

## Type Summary

| Kind | Type | Description |
| --- | --- | --- |
| record | [`argb-color`](#type-argb-color) | An ARGB color with alpha (transparency) channel. |
| record | [`block-pos`](#type-block-pos) | A position in the world grid (integers). |
| enum | [`click-type`](#type-click-type) | Represents the type of click interaction in a GUI. |
| enum | [`entity-pose`](#type-entity-pose) | Represents the various poses an entity can be in. |
| enum | [`game-mode`](#type-game-mode) | Represents the game modes available in Minecraft. |
| enum | [`hand`](#type-hand) | Represents the hands of a player. |
| enum | [`locale`](#type-locale) | All Minecraft-supported locales. |
| enum | [`named-color`](#type-named-color) | The 16 base Minecraft colors. |
| record | [`nbt-entry`](#type-nbt-entry) | Represents one entry in an NBT compound tag. |
| variant | [`nbt-tag`](#type-nbt-tag) | Represents a Minecraft NBT tag. |
| record | [`nbt-tree`](#type-nbt-tree) | Represents a Minecraft NBT tag tree. |
| alias | [`position`](#type-position) | A precise coordinate in the world (floats). |
| alias | [`raw-text-component`](#type-raw-text-component) | Serialized text component as a postcard byte array. |
| record | [`rgb-color`](#type-rgb-color) | An RGB color represented by its red, green, and blue components. |

## Type Details

### `raw-text-component` {#type-raw-text-component}

Serialized text component as a postcard byte array.
@deprecated Use the text-component resource from the text interface instead.

```text
type raw-text-component = list<u8>;
```

### `nbt-entry` {#type-nbt-entry}

Represents one entry in an NBT compound tag.

**Record fields**

| Name | WIT type |
| --- | --- |
| `key` | `string` |
| `value` | `u32` |

### `nbt-tree` {#type-nbt-tree}

Represents a Minecraft NBT tag tree.

**Record fields**

| Name | WIT type |
| --- | --- |
| `root` | `u32` |
| `tags` | `list<nbt-tag>` |

### `nbt-tag` {#type-nbt-tag}

Represents a Minecraft NBT tag.

**Variant cases**

| Name | WIT type |
| --- | --- |
| `byte` | `s8` |
| `short` | `s16` |
| `int` | `s32` |
| `long` | `s64` |
| `float` | `f32` |
| `double` | `f64` |
| `byte-array` | `list<s8>` |
| `string-tag` | `string` |
| `list-tag` | `list<u32>` |
| `compound` | `list<nbt-entry>` |
| `int-array` | `list<s32>` |
| `long-array` | `list<s64>` |

### `block-pos` {#type-block-pos}

A position in the world grid (integers).

**Record fields**

| Name | WIT type |
| --- | --- |
| `x` | `s32` |
| `y` | `s32` |
| `z` | `s32` |

### `position` {#type-position}

A precise coordinate in the world (floats).

```text
type position = tuple<f64, f64, f64>;
```

### `hand` {#type-hand}

Represents the hands of a player.

**Enum cases**

| Name |
| --- |
| `left` |
| `right` |

### `game-mode` {#type-game-mode}

Represents the game modes available in Minecraft.

**Enum cases**

| Name |
| --- |
| `survival` |
| `creative` |
| `adventure` |
| `spectator` |

### `named-color` {#type-named-color}

The 16 base Minecraft colors.

**Enum cases**

| Name |
| --- |
| `black` |
| `dark-blue` |
| `dark-green` |
| `dark-aqua` |
| `dark-red` |
| `dark-purple` |
| `gold` |
| `gray` |
| `dark-gray` |
| `blue` |
| `green` |
| `aqua` |
| `red` |
| `light-purple` |
| `yellow` |
| `white` |

### `rgb-color` {#type-rgb-color}

An RGB color represented by its red, green, and blue components.

**Record fields**

| Name | WIT type |
| --- | --- |
| `r` | `u8` |
| `g` | `u8` |
| `b` | `u8` |

### `argb-color` {#type-argb-color}

An ARGB color with alpha (transparency) channel.

**Record fields**

| Name | WIT type |
| --- | --- |
| `a` | `u8` |
| `r` | `u8` |
| `g` | `u8` |
| `b` | `u8` |

### `click-type` {#type-click-type}

Represents the type of click interaction in a GUI.

**Enum cases**

| Name |
| --- |
| `left` |
| `right` |
| `shift-left` |
| `shift-right` |
| `middle` |
| `drop` |
| `control-drop` |
| `double-click` |
| `number-key` |
| `unknown` |

### `entity-pose` {#type-entity-pose}

Represents the various poses an entity can be in.

**Enum cases**

| Name |
| --- |
| `standing` |
| `fall-flying` |
| `sleeping` |
| `swimming` |
| `spin-attack` |
| `crouching` |
| `long-jumping` |
| `dying` |
| `croaking` |
| `using-tongue` |
| `sitting` |
| `roaring` |
| `sniffing` |
| `emerging` |
| `digging` |
| `sliding` |
| `shooting` |
| `inhaling` |

### `locale` {#type-locale}

All Minecraft-supported locales.

**Enum cases**

| Name |
| --- |
| `af-za` |
| `ar-sa` |
| `ast-es` |
| `az-az` |
| `ba-ru` |
| `bar` |
| `be-by` |
| `bg-bg` |
| `br-fr` |
| `brb` |
| `bs-ba` |
| `ca-es` |
| `cs-cz` |
| `cy-gb` |
| `da-dk` |
| `de-at` |
| `de-ch` |
| `de-de` |
| `el-gr` |
| `en-au` |
| `en-ca` |
| `en-gb` |
| `en-nz` |
| `en-pt` |
| `en-ud` |
| `en-us` |
| `enp` |
| `enws` |
| `eo-uy` |
| `es-ar` |
| `es-cl` |
| `es-ec` |
| `es-es` |
| `es-mx` |
| `es-uy` |
| `es-ve` |
| `esan` |
| `et-ee` |
| `eu-es` |
| `fa-ir` |
| `fi-fi` |
| `fil-ph` |
| `fo-fo` |
| `fr-ca` |
| `fr-fr` |
| `fra-de` |
| `fur-it` |
| `fy-nl` |
| `ga-ie` |
| `gd-gb` |
| `gl-es` |
| `haw-us` |
| `he-il` |
| `hi-in` |
| `hr-hr` |
| `hu-hu` |
| `hy-am` |
| `id-id` |
| `ig-ng` |
| `io-en` |
| `is-is` |
| `isv` |
| `it-it` |
| `ja-jp` |
| `jbo-en` |
| `ka-ge` |
| `kk-kz` |
| `kn-in` |
| `ko-kr` |
| `ksh` |
| `kw-gb` |
| `la-la` |
| `lb-lu` |
| `li-li` |
| `lmo` |
| `lo-la` |
| `lol-us` |
| `lt-lt` |
| `lv-lv` |
| `lzh` |
| `mk-mk` |
| `mn-mn` |
| `ms-my` |
| `mt-mt` |
| `nah` |
| `nds-de` |
| `nl-be` |
| `nl-nl` |
| `nn-no` |
| `no-no` |
| `oc-fr` |
| `ovd` |
| `pl-pl` |
| `pt-br` |
| `pt-pt` |
| `qya-aa` |
| `ro-ro` |
| `rpr` |
| `ru-ru` |
| `ry-ua` |
| `sah-sah` |
| `se-no` |
| `sk-sk` |
| `sl-si` |
| `so-so` |
| `sq-al` |
| `sr-cs` |
| `sr-sp` |
| `sv-se` |
| `sxu` |
| `szl` |
| `ta-in` |
| `th-th` |
| `tl-ph` |
| `tlh-aa` |
| `tok` |
| `tr-tr` |
| `tt-ru` |
| `uk-ua` |
| `val-es` |
| `vec-it` |
| `vi-vn` |
| `yi-de` |
| `yo-ng` |
| `zh-cn` |
| `zh-hk` |
| `zh-tw` |
| `zlm-arab` |
