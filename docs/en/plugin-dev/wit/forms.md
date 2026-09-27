---
title: Interface forms
outline: [2, 2]
---

# Interface `forms`

Host import: `pumpkin:plugin/forms@0.1.0`

[Package summary](./)

Source: [forms.wit](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/forms.wit)

Bedrock form definitions.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`text`](./text) | `text-component` |

## Type Summary

| Kind | Type |
| --- | --- |
| record | [`custom-form`](#type-custom-form) |
| variant | [`custom-form-element`](#type-custom-form-element) |
| variant | [`form`](#type-form) |
| record | [`form-image`](#type-form-image) |
| enum | [`image-type`](#type-image-type) |
| record | [`modal-form`](#type-modal-form) |
| record | [`simple-form`](#type-simple-form) |
| record | [`simple-form-button`](#type-simple-form-button) |

## Type Details

### `image-type` {#type-image-type}

**Enum cases**

| Name |
| --- |
| `url` |
| `path` |

### `form-image` {#type-form-image}

**Record fields**

| Name | WIT type |
| --- | --- |
| `%type` | `image-type` |
| `data` | `string` |

### `simple-form-button` {#type-simple-form-button}

**Record fields**

| Name | WIT type |
| --- | --- |
| `text` | `text-component` |
| `image` | `option<form-image>` |

### `simple-form` {#type-simple-form}

**Record fields**

| Name | WIT type |
| --- | --- |
| `title` | `text-component` |
| `content` | `text-component` |
| `buttons` | `list<simple-form-button>` |

### `modal-form` {#type-modal-form}

**Record fields**

| Name | WIT type |
| --- | --- |
| `title` | `text-component` |
| `content` | `text-component` |
| `button1` | `text-component` |
| `button2` | `text-component` |

### `custom-form-element` {#type-custom-form-element}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `label` | `text-component` |
| `toggle` | `tuple<text-component, bool>` |
| `slider` | `tuple<text-component, f32, f32, f32, f32>` |
| `step-slider` | `tuple<text-component, list<string>, u32>` |
| `dropdown` | `tuple<text-component, list<string>, u32>` |
| `input` | `tuple<text-component, string, string>` |

### `custom-form` {#type-custom-form}

**Record fields**

| Name | WIT type |
| --- | --- |
| `title` | `text-component` |
| `elements` | `list<custom-form-element>` |

### `form` {#type-form}

**Variant cases**

| Name | WIT type |
| --- | --- |
| `simple` | `simple-form` |
| `modal` | `modal-form` |
| `custom` | `custom-form` |
