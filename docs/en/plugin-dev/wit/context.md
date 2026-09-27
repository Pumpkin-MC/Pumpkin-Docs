---
title: Interface context
outline: [2, 2]
---

# Interface `context`

Host import: `pumpkin:plugin/context@0.1.0`

[Package summary](./)

Source: [context.wit](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/context.wit)

Plugin registration, data folder, and server access.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`server`](./server) | `server` |
| [`event`](./event) | `event-type`, `event-priority` |
| [`command`](./command) | `command` |
| [`permission`](./permission) | `permission` |

## Type Summary

| Kind | Type | Description |
| --- | --- | --- |
| resource | [`context`](#type-context) | A contextual handle for plugin-related operations. |
| record | [`marketplace-metadata`](#type-marketplace-metadata) | Verified marketplace metadata for signed plugins. |

## Operation Summary

| Scope | Operation | Description |
| --- | --- | --- |
| `context` | [`get-data-folder`](#operation-context-get-data-folder) | Returns the path to the plugin's private data folder. |
| `context` | [`get-marketplace-metadata`](#operation-context-get-marketplace-metadata) | Returns verified marketplace metadata if this plugin binary is signed, or none if unsigned. |
| `context` | [`get-server`](#operation-context-get-server) | Returns the global server instance. |
| `context` | [`register-command`](#operation-context-register-command) | Registers a new command. |
| `context` | [`register-event`](#operation-context-register-event) | Registers a handler for a specific event. |
| `context` | [`register-event-with-handle`](#operation-context-register-event-with-handle) | Registers an event handler and returns an opaque, host-owned registration ID. |
| `context` | [`register-permission`](#operation-context-register-permission) | Registers a permission node with the server. |
| `context` | [`unregister-event`](#operation-context-unregister-event) | Removes one of this plugin's event registrations. |

## Type Details

### `marketplace-metadata` {#type-marketplace-metadata}

Verified marketplace metadata for signed plugins.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `marketplace-url` | `string` | The marketplace base URL where this plugin is registered. |
| `plugin-id` | `s64` | The unique plugin ID on the marketplace. |
| `plugin-name` | `string` | The canonical plugin name. |
| `version` | `string` | The semver version string of the plugin. |
| `dev-id` | `s64` | Developer ID. |
| `dev-name` | `string` | Developer display name or username. |
| `is-paid` | `bool` | Whether this is a paid marketplace plugin. |
| `user-id` | `s64` | The buyer / licensee user ID (0 for free/open-source). |
| `license-key` | `option<string>` | Unique license key issued to the buyer, if paid. |
| `issued-at` | `string` | ISO-8601 timestamp of when this binary/license was issued. |

### `context` {#type-context}

A contextual handle for plugin-related operations.

Methods: [`register-event`](#operation-context-register-event), [`register-event-with-handle`](#operation-context-register-event-with-handle), [`unregister-event`](#operation-context-unregister-event), [`register-command`](#operation-context-register-command), [`register-permission`](#operation-context-register-permission), [`get-data-folder`](#operation-context-get-data-folder), [`get-server`](#operation-context-get-server), [`get-marketplace-metadata`](#operation-context-get-marketplace-metadata).

## Operation Details

### `context.register-event` {#operation-context-register-event}

```text
register-event: func(handler-id: u32, event-type: event-type, event-priority: event-priority, blocking: bool);
```

Registers a handler for a specific event.

Use `register-event-with-handle` when individual removal is needed.

**Parameters**

| Name | WIT type | Description |
| --- | --- | --- |
| `handler-id` | `u32` | Unique ID for the event handler. |
| `event-type` | `event-type` | The type of event to listen for. |
| `event-priority` | `event-priority` | When this handler should be called relative to others. |
| `blocking` | `bool` | Whether the event should wait for this handler to finish. |

### `context.register-event-with-handle` {#operation-context-register-event-with-handle}

```text
register-event-with-handle: func(handler-id: u32, event-type: event-type, event-priority: event-priority, blocking: bool) -> u64;
```

Registers an event handler and returns an opaque, host-owned registration ID.

`handler-id` identifies the plugin callback; the returned `registration-id`
identifies this specific registration. The registration belongs to this
plugin and can be removed with `unregister-event`.

**Parameters**

| Name | WIT type |
| --- | --- |
| `handler-id` | `u32` |
| `event-type` | `event-type` |
| `event-priority` | `event-priority` |
| `blocking` | `bool` |

**Returns:** `u64`

### `context.unregister-event` {#operation-context-unregister-event}

```text
unregister-event: func(registration-id: u64) -> bool;
```

Removes one of this plugin's event registrations.

Returns `true` if the registration was removed, or `false` if the ID is
unknown, belongs to another plugin, or was already removed. Dispatches
started after successful removal do not include this registration.
Dispatches already in progress may still invoke or finish its callback.
The ID becomes invalid on plugin unload.

**Parameters**

| Name | WIT type |
| --- | --- |
| `registration-id` | `u64` |

**Returns:** `bool`

### `context.register-command` {#operation-context-register-command}

```text
register-command: func(command: command, permission: string);
```

Registers a new command.

**Parameters**

| Name | WIT type | Description |
| --- | --- | --- |
| `command` | `command` | The command definition. |
| `permission` | `string` | The required permission node to execute this command. |

### `context.register-permission` {#operation-context-register-permission}

```text
register-permission: func(permission: permission) -> result<_, string>;
```

Registers a permission node with the server.

**Parameters**

| Name | WIT type |
| --- | --- |
| `permission` | `permission` |

**Returns:** `result<_, string>`

### `context.get-data-folder` {#operation-context-get-data-folder}

```text
get-data-folder: func() -> string;
```

Returns the path to the plugin's private data folder.

**Returns:** `string`

### `context.get-server` {#operation-context-get-server}

```text
get-server: func() -> server;
```

Returns the global server instance.

**Returns:** `server`

### `context.get-marketplace-metadata` {#operation-context-get-marketplace-metadata}

```text
get-marketplace-metadata: func() -> option<marketplace-metadata>;
```

Returns verified marketplace metadata if this plugin binary is signed, or none if unsigned.

**Returns:** `option<marketplace-metadata>`
