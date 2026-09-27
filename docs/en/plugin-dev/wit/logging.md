---
title: Interface logging
outline: [2, 2]
---

# Interface `logging`

Host import: `pumpkin:plugin/logging@0.1.0`

[Package summary](./)

Source: [log.wit](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/log.wit)

Log levels and logging functions.

## Type Summary

| Kind | Type |
| --- | --- |
| enum | [`level`](#type-level) |

## Operation Summary

| Scope | Operation | Description |
| --- | --- | --- |
| `logging` | [`log`](#operation-logging-log) | log any general purpose message |
| `logging` | [`log-tracing`](#operation-logging-log-tracing) | This function is meant to be used by the tracing crate. |

## Type Details

### `level` {#type-level}

**Enum cases**

| Name |
| --- |
| `trace` |
| `debug` |
| `info` |
| `warn` |
| `error` |

## Operation Details

### `logging.log` {#operation-logging-log}

```text
log: func(level: level, message: string);
```

log any general purpose message

**Parameters**

| Name | WIT type |
| --- | --- |
| `level` | `level` |
| `message` | `string` |

### `logging.log-tracing` {#operation-logging-log-tracing}

```text
log-tracing: func(event: list<u8>);
```

This function is meant to be used by the tracing crate.

**Parameters**

| Name | WIT type |
| --- | --- |
| `event` | `list<u8>` |
