---
title: Interface metadata
outline: [2, 2]
---

# Interface `metadata`

Plugin export: `pumpkin:plugin/metadata@0.1.0`

[Package summary](./)

Source: [metadata.wit](https://github.com/Pumpkin-MC/pumpkin-plugin-wit/blob/master/v0.1/metadata.wit)

Plugin identity, version, and dependencies.

## Type Summary

| Kind | Type |
| --- | --- |
| record | [`plugin-metadata`](#type-plugin-metadata) |

## Operation Summary

| Scope | Operation |
| --- | --- |
| `metadata` | [`get-metadata`](#operation-metadata-get-metadata) |

## Type Details

### `plugin-metadata` {#type-plugin-metadata}

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `name` | `string` | Name of the plugin. |
| `version` | `string` | Plugin version (semver). |
| `authors` | `list<string>` | Plugin authors. |
| `description` | `string` | Short description of the plugin. |
| `dependencies` | `list<string>` | Plugin dependencies. |
| `permissions` | `list<string>` | Permissions requested by the plugin. |

## Operation Details

### `metadata.get-metadata` {#operation-metadata-get-metadata}

```text
get-metadata: func() -> plugin-metadata;
```

**Returns:** `plugin-metadata`
