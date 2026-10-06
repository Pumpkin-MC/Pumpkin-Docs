---
title: Interface uuid
outline: [2, 2]
---

# Interface `uuid`

Shared types: `pumpkin:plugin/uuid@0.1.0`

[Package summary](./)

Source: [uuid.wit](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/uuid.wit)

UUID type and parsing.

## Type Summary

| Kind | Type | Description |
| --- | --- | --- |
| record | [`uuid`](#type-uuid) | A 128-bit UUID represented as two 64-bit integers. |

## Operation Summary

| Scope | Operation | Description |
| --- | --- | --- |
| `uuid` | [`generate`](#operation-uuid-generate) | Generates a new random v4 UUID. |
| `uuid` | [`parse`](#operation-uuid-parse) | Parses a UUID from a string. Returns none if the string is not a valid UUID. |
| `uuid` | [`to-string`](#operation-uuid-to-string) | Converts a UUID to its standard string representation. |

## Type Details

### `uuid` {#type-uuid}

A 128-bit UUID represented as two 64-bit integers.

**Record fields**

| Name | WIT type |
| --- | --- |
| `high` | `u64` |
| `low` | `u64` |

## Operation Details

### `uuid.generate` {#operation-uuid-generate}

```text
generate: func() -> uuid;
```

Generates a new random v4 UUID.

**Returns:** `uuid`

### `uuid.parse` {#operation-uuid-parse}

```text
parse: func(s: string) -> option<uuid>;
```

Parses a UUID from a string. Returns none if the string is not a valid UUID.

**Parameters**

| Name | WIT type |
| --- | --- |
| `s` | `string` |

**Returns:** `option<uuid>`

### `uuid.to-string` {#operation-uuid-to-string}

```text
to-string: func(id: uuid) -> string;
```

Converts a UUID to its standard string representation.

**Parameters**

| Name | WIT type |
| --- | --- |
| `id` | `uuid` |

**Returns:** `string`
