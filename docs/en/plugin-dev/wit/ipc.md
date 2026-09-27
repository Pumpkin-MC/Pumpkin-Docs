---
title: Interface ipc
outline: [2, 2]
---

# Interface `ipc`

Host import: `pumpkin:plugin/ipc@0.1.0`

[Package summary](./)

Source: [ipc.wit](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/blob/master/v0.1/ipc.wit)

Plugin messages and plugin identifiers.

## Type Summary

| Kind | Type |
| --- | --- |
| alias | [`ipc-message`](#type-ipc-message) |
| alias | [`plugin-id`](#type-plugin-id) |

## Operation Summary

| Scope | Operation |
| --- | --- |
| `ipc` | [`send-ipc-message`](#operation-ipc-send-ipc-message) |

## Type Details

### `plugin-id` {#type-plugin-id}

```text
type plugin-id = string;
```

### `ipc-message` {#type-ipc-message}

```text
type ipc-message = list<u8>;
```

## Operation Details

### `ipc.send-ipc-message` {#operation-ipc-send-ipc-message}

```text
send-ipc-message: func(recipient: plugin-id, message: ipc-message) -> result<result<ipc-message, string>>;
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `recipient` | `plugin-id` |
| `message` | `ipc-message` |

**Returns:** `result<result<ipc-message, string>>`
