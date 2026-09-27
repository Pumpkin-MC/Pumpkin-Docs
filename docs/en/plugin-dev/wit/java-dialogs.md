---
title: Interface java-dialogs
outline: [2, 2]
---

# Interface `java-dialogs`

Host import: `pumpkin:plugin/java-dialogs@0.1.0`

[Package summary](./)

Source: [java-dialogs.wit](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/java-dialogs.wit)

Java Edition dialog definitions.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`text`](./text) | `text-component` |
| [`item-stack`](./item-stack) | `item-stack` |

## Type Summary

| Kind | Type | Description |
| --- | --- | --- |
| variant | [`action`](#type-action) | Represents an action triggered by a button click. |
| record | [`action-button`](#type-action-button) | Represents a clickable button in a dialog. |
| enum | [`after-action`](#type-after-action) | Defines what happens after a dialog is closed. |
| record | [`custom-click-action`](#type-custom-click-action) | Represents a custom server-side action. |
| record | [`dialog`](#type-dialog) | Represents a dialog shown to a Java Edition player. |
| variant | [`dialog-body`](#type-dialog-body) | Represents an element in the main content area of a dialog. |
| variant | [`dialog-input`](#type-dialog-input) | Represents an interactive input control in a dialog. |
| record | [`dialog-input-bool`](#type-dialog-input-bool) | A checkbox input control. |
| record | [`dialog-input-number-range`](#type-dialog-input-number-range) | A numerical range slider input control. |
| record | [`dialog-input-single-option`](#type-dialog-input-single-option) | A multiple-choice selection input control. |
| record | [`dialog-input-text`](#type-dialog-input-text) | A text field input control. |
| enum | [`dialog-type`](#type-dialog-type) | Represents the layout and button configuration of a dialog. |
| record | [`link`](#type-link) | Represents a link displayed in a Java Edition dialog. |
| variant | [`link-label`](#type-link-label) | The label for a link, which can be a built-in type or custom text. |
| enum | [`link-type`](#type-link-type) | Built-in link types recognized by the Java Edition client. |

## Type Details

### `dialog-type` {#type-dialog-type}

Represents the layout and button configuration of a dialog.

**Enum cases**

| Name | Description |
| --- | --- |
| `notice` | A simple dialog with a single "OK" button. |
| `confirmation` | A dialog with "Yes" and "No" buttons. |
| `multi-action` | A scrollable list of custom buttons. |
| `dialog-list` | A list of buttons that open other registered dialogs. |
| `server-links` | A dedicated menu for displaying server-related links. |

### `dialog-body` {#type-dialog-body}

Represents an element in the main content area of a dialog.

**Variant cases**

| Name | WIT type | Description |
| --- | --- | --- |
| `plain-message` | `text-component` | A simple text message. |
| `item` | `item-stack` | A visual item display. |

### `dialog-input` {#type-dialog-input}

Represents an interactive input control in a dialog.

**Variant cases**

| Name | WIT type | Description |
| --- | --- | --- |
| `%bool` | `dialog-input-bool` | A checkbox for true/false states. |
| `%text` | `dialog-input-text` | A simple string input field. |
| `number-range` | `dialog-input-number-range` | A slider for numerical input within a range. |
| `single-option` | `dialog-input-single-option` | A multiple-choice selection button. |

### `dialog-input-bool` {#type-dialog-input-bool}

A checkbox input control.

**Record fields**

| Name | WIT type |
| --- | --- |
| `label` | `text-component` |
| `default-value` | `bool` |

### `dialog-input-text` {#type-dialog-input-text}

A text field input control.

**Record fields**

| Name | WIT type |
| --- | --- |
| `label` | `text-component` |
| `placeholder` | `text-component` |
| `default-value` | `string` |

### `dialog-input-number-range` {#type-dialog-input-number-range}

A numerical range slider input control.

**Record fields**

| Name | WIT type |
| --- | --- |
| `label` | `text-component` |
| `min-value` | `f32` |
| `max-value` | `f32` |
| `initial-value` | `f32` |
| `step` | `f32` |
| `label-format` | `option<string>` |

### `dialog-input-single-option` {#type-dialog-input-single-option}

A multiple-choice selection input control.

**Record fields**

| Name | WIT type |
| --- | --- |
| `label` | `text-component` |
| `options` | `list<text-component>` |
| `initial-index` | `u32` |

### `after-action` {#type-after-action}

Defines what happens after a dialog is closed.

**Enum cases**

| Name | Description |
| --- | --- |
| `peek` | Returns the player to the previous screen (e.g., keeping an inventory open). |
| `pop` | Closes all open screens. |

### `action-button` {#type-action-button}

Represents a clickable button in a dialog.

**Record fields**

| Name | WIT type |
| --- | --- |
| `text` | `text-component` |
| `tooltip` | `option<text-component>` |
| `width` | `option<u32>` |
| `action` | `action` |

### `action` {#type-action}

Represents an action triggered by a button click.

**Variant cases**

| Name | WIT type | Description |
| --- | --- | --- |
| `open-url` | `string` | Opens an external URL. |
| `custom-click` | `custom-click-action` | Triggers a custom server-side callback with an ID and optional payload. |

### `custom-click-action` {#type-custom-click-action}

Represents a custom server-side action.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `id` | `string` | A unique identifier for the action (sent back to the server). |
| `payload` | `option<list<u8>>` | Optional binary data to send with the action. |

### `link` {#type-link}

Represents a link displayed in a Java Edition dialog.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `label` | `link-label` | The label to display for the link. |
| `url` | `string` | The URL the link points to. |

### `link-label` {#type-link-label}

The label for a link, which can be a built-in type or custom text.

**Variant cases**

| Name | WIT type | Description |
| --- | --- | --- |
| `built-in` | `link-type` | A built-in link type with a predefined icon/label. |
| `custom` | `text-component` | A custom text component label. |

### `link-type` {#type-link-type}

Built-in link types recognized by the Java Edition client.

**Enum cases**

| Name |
| --- |
| `bug-report` |
| `community-guidelines` |
| `support` |
| `status` |
| `feedback` |
| `community` |
| `website` |
| `forums` |
| `news` |
| `announcements` |

### `dialog` {#type-dialog}

Represents a dialog shown to a Java Edition player.

**Record fields**

| Name | WIT type | Description |
| --- | --- | --- |
| `title` | `text-component` | The main title of the dialog. |
| `%type` | `dialog-type` | The layout type of the dialog. |
| `body` | `list<dialog-body>` | A list of body elements to display in the main area. |
| `inputs` | `list<dialog-input>` | A list of interactive input controls. |
| `buttons` | `list<action-button>` | A list of clickable buttons (for multi-action and other types). |
| `links` | `list<link>` | A list of links (primarily for server-links type). |
| `after-action` | `option<after-action>` | What to do after the dialog is closed. |
| `can-close-with-escape` | `bool` | Whether the player can exit the dialog using the Esc key. |
| `external-title` | `option<text-component>` | The text shown on buttons that link to/open this dialog. |
