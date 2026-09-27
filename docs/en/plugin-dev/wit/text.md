---
title: Interface text
outline: [2, 2]
---

# Interface `text`

Host import: `pumpkin:plugin/text@0.1.0`

[Package summary](./)

Source: [text.wit](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/text.wit)

Text components and formatting.

## Referenced Types

| Interface | Names brought into scope |
| --- | --- |
| [`common`](./common) | `named-color`, `rgb-color`, `argb-color` |

## Type Summary

| Kind | Type |
| --- | --- |
| resource | [`text-component`](#type-text-component) |

## Operation Summary

| Scope | Operation |
| --- | --- |
| `text-component` | [`add-child`](#operation-text-component-add-child) |
| `text-component` | [`add-text`](#operation-text-component-add-text) |
| `text-component` | [`bold`](#operation-text-component-bold) |
| `text-component` | [`click-change-page`](#operation-text-component-click-change-page) |
| `text-component` | [`click-copy-to-clipboard`](#operation-text-component-click-copy-to-clipboard) |
| `text-component` | [`click-open-file`](#operation-text-component-click-open-file) |
| `text-component` | [`click-open-url`](#operation-text-component-click-open-url) |
| `text-component` | [`click-run-command`](#operation-text-component-click-run-command) |
| `text-component` | [`click-suggest-command`](#operation-text-component-click-suggest-command) |
| `text-component` | [`color-named`](#operation-text-component-color-named) |
| `text-component` | [`color-rgb`](#operation-text-component-color-rgb) |
| `text-component` | [`custom`](#operation-text-component-custom) |
| `text-component` | [`encode`](#operation-text-component-encode) |
| `text-component` | [`entity-names`](#operation-text-component-entity-names) |
| `text-component` | [`font`](#operation-text-component-font) |
| `text-component` | [`from-json`](#operation-text-component-from-json) |
| `text-component` | [`from-legacy-string`](#operation-text-component-from-legacy-string) |
| `text-component` | [`from-legacy-string-with-code`](#operation-text-component-from-legacy-string-with-code) |
| `text-component` | [`get-text`](#operation-text-component-get-text) |
| `text-component` | [`gradient`](#operation-text-component-gradient) |
| `text-component` | [`gradient-named`](#operation-text-component-gradient-named) |
| `text-component` | [`hover-show-entity`](#operation-text-component-hover-show-entity) |
| `text-component` | [`hover-show-item`](#operation-text-component-hover-show-item) |
| `text-component` | [`hover-show-text`](#operation-text-component-hover-show-text) |
| `text-component` | [`insertion`](#operation-text-component-insertion) |
| `text-component` | [`italic`](#operation-text-component-italic) |
| `text-component` | [`keybind`](#operation-text-component-keybind) |
| `text-component` | [`obfuscated`](#operation-text-component-obfuscated) |
| `text-component` | [`rainbow`](#operation-text-component-rainbow) |
| `text-component` | [`shadow-color`](#operation-text-component-shadow-color) |
| `text-component` | [`strikethrough`](#operation-text-component-strikethrough) |
| `text-component` | [`text`](#operation-text-component-text) |
| `text-component` | [`to-json`](#operation-text-component-to-json) |
| `text-component` | [`to-pretty-console`](#operation-text-component-to-pretty-console) |
| `text-component` | [`translate`](#operation-text-component-translate) |
| `text-component` | [`translate-cross`](#operation-text-component-translate-cross) |
| `text-component` | [`underlined`](#operation-text-component-underlined) |

## Type Details

### `text-component` {#type-text-component}

Methods: [`text`](#operation-text-component-text), [`translate`](#operation-text-component-translate), [`translate-cross`](#operation-text-component-translate-cross), [`entity-names`](#operation-text-component-entity-names), [`keybind`](#operation-text-component-keybind), [`custom`](#operation-text-component-custom), [`from-legacy-string`](#operation-text-component-from-legacy-string), [`from-legacy-string-with-code`](#operation-text-component-from-legacy-string-with-code), [`from-json`](#operation-text-component-from-json), [`to-json`](#operation-text-component-to-json), [`add-child`](#operation-text-component-add-child), [`add-text`](#operation-text-component-add-text), [`get-text`](#operation-text-component-get-text), [`encode`](#operation-text-component-encode), [`to-pretty-console`](#operation-text-component-to-pretty-console), [`color-named`](#operation-text-component-color-named), [`color-rgb`](#operation-text-component-color-rgb), [`gradient-named`](#operation-text-component-gradient-named), [`gradient`](#operation-text-component-gradient), [`rainbow`](#operation-text-component-rainbow), [`bold`](#operation-text-component-bold), [`italic`](#operation-text-component-italic), [`underlined`](#operation-text-component-underlined), [`strikethrough`](#operation-text-component-strikethrough), [`obfuscated`](#operation-text-component-obfuscated), [`insertion`](#operation-text-component-insertion), [`font`](#operation-text-component-font), [`shadow-color`](#operation-text-component-shadow-color), [`click-open-url`](#operation-text-component-click-open-url), [`click-open-file`](#operation-text-component-click-open-file), [`click-run-command`](#operation-text-component-click-run-command), [`click-suggest-command`](#operation-text-component-click-suggest-command), [`click-change-page`](#operation-text-component-click-change-page), [`click-copy-to-clipboard`](#operation-text-component-click-copy-to-clipboard), [`hover-show-text`](#operation-text-component-hover-show-text), [`hover-show-item`](#operation-text-component-hover-show-item), [`hover-show-entity`](#operation-text-component-hover-show-entity).

## Operation Details

### `text-component.text` {#operation-text-component-text}

```text
text: static func(plain: string) -> text-component;
```

Creates a plain text component.

**Parameters**

| Name | WIT type |
| --- | --- |
| `plain` | `string` |

**Returns:** `text-component`

### `text-component.translate` {#operation-text-component-translate}

```text
translate: static func(key: string, %with: list<text-component>) -> text-component;
```

Creates a translation component.

**Parameters**

| Name | WIT type |
| --- | --- |
| `key` | `string` |
| `%with` | `list<text-component>` |

**Returns:** `text-component`

### `text-component.translate-cross` {#operation-text-component-translate-cross}

```text
translate-cross: static func(java-key: string, bedrock-key: string, %with: list<text-component>) -> text-component;
```

Creates a translation component with a Bedrock-specific fallback key.

**Parameters**

| Name | WIT type |
| --- | --- |
| `java-key` | `string` |
| `bedrock-key` | `string` |
| `%with` | `list<text-component>` |

**Returns:** `text-component`

### `text-component.entity-names` {#operation-text-component-entity-names}

```text
entity-names: static func(selector: string, separator: option<string>) -> text-component;
```

Creates an entity names / selector text component.

**Parameters**

| Name | WIT type |
| --- | --- |
| `selector` | `string` |
| `separator` | `option<string>` |

**Returns:** `text-component`

### `text-component.keybind` {#operation-text-component-keybind}

```text
keybind: static func(keybind: string) -> text-component;
```

Creates a keybind text component (e.g., "key.jump").

**Parameters**

| Name | WIT type |
| --- | --- |
| `keybind` | `string` |

**Returns:** `text-component`

### `text-component.custom` {#operation-text-component-custom}

```text
custom: static func(namespace: string, key: string, locale: string, %with: list<text-component>) -> text-component;
```

Creates a custom translation component.

**Parameters**

| Name | WIT type |
| --- | --- |
| `namespace` | `string` |
| `key` | `string` |
| `locale` | `string` |
| `%with` | `list<text-component>` |

**Returns:** `text-component`

### `text-component.from-legacy-string` {#operation-text-component-from-legacy-string}

```text
from-legacy-string: static func(input: string) -> text-component;
```

Parses a legacy Minecraft formatted string (using section signs '§' by default) into a text component.

**Parameters**

| Name | WIT type |
| --- | --- |
| `input` | `string` |

**Returns:** `text-component`

### `text-component.from-legacy-string-with-code` {#operation-text-component-from-legacy-string-with-code}

```text
from-legacy-string-with-code: static func(input: string, code-symbol: char) -> text-component;
```

Parses a legacy formatted string using a custom color code symbol (e.g. '&' or '§').

**Parameters**

| Name | WIT type |
| --- | --- |
| `input` | `string` |
| `code-symbol` | `char` |

**Returns:** `text-component`

### `text-component.from-json` {#operation-text-component-from-json}

```text
from-json: static func(json: string) -> result<text-component, string>;
```

Parses a standard Minecraft JSON text component.

**Parameters**

| Name | WIT type |
| --- | --- |
| `json` | `string` |

**Returns:** `result<text-component, string>`

### `text-component.to-json` {#operation-text-component-to-json}

```text
to-json: func() -> string;
```

Serializes the text component to JSON format.

**Returns:** `string`

### `text-component.add-child` {#operation-text-component-add-child}

```text
add-child: func(child: text-component);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `child` | `text-component` |

### `text-component.add-text` {#operation-text-component-add-text}

```text
add-text: func(text: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `text` | `string` |

### `text-component.get-text` {#operation-text-component-get-text}

```text
get-text: func() -> string;
```

**Returns:** `string`

### `text-component.encode` {#operation-text-component-encode}

```text
encode: func() -> list<u8>;
```

**Returns:** `list<u8>`

### `text-component.to-pretty-console` {#operation-text-component-to-pretty-console}

```text
to-pretty-console: func() -> string;
```

**Returns:** `string`

### `text-component.color-named` {#operation-text-component-color-named}

```text
color-named: func(color: named-color);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `color` | `named-color` |

### `text-component.color-rgb` {#operation-text-component-color-rgb}

```text
color-rgb: func(color: rgb-color);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `color` | `rgb-color` |

### `text-component.gradient-named` {#operation-text-component-gradient-named}

```text
gradient-named: func(colors: list<named-color>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `colors` | `list<named-color>` |

### `text-component.gradient` {#operation-text-component-gradient}

```text
gradient: func(colors: list<rgb-color>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `colors` | `list<rgb-color>` |

### `text-component.rainbow` {#operation-text-component-rainbow}

```text
rainbow: func();
```

### `text-component.bold` {#operation-text-component-bold}

```text
bold: func(value: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `value` | `bool` |

### `text-component.italic` {#operation-text-component-italic}

```text
italic: func(value: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `value` | `bool` |

### `text-component.underlined` {#operation-text-component-underlined}

```text
underlined: func(value: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `value` | `bool` |

### `text-component.strikethrough` {#operation-text-component-strikethrough}

```text
strikethrough: func(value: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `value` | `bool` |

### `text-component.obfuscated` {#operation-text-component-obfuscated}

```text
obfuscated: func(value: bool);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `value` | `bool` |

### `text-component.insertion` {#operation-text-component-insertion}

```text
insertion: func(text: string);
```

Text inserted into chat when shift-clicked

**Parameters**

| Name | WIT type |
| --- | --- |
| `text` | `string` |

### `text-component.font` {#operation-text-component-font}

```text
font: func(font: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `font` | `string` |

### `text-component.shadow-color` {#operation-text-component-shadow-color}

```text
shadow-color: func(color: argb-color);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `color` | `argb-color` |

### `text-component.click-open-url` {#operation-text-component-click-open-url}

```text
click-open-url: func(url: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `url` | `string` |

### `text-component.click-open-file` {#operation-text-component-click-open-file}

```text
click-open-file: func(path: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `path` | `string` |

### `text-component.click-run-command` {#operation-text-component-click-run-command}

```text
click-run-command: func(command: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `command` | `string` |

### `text-component.click-suggest-command` {#operation-text-component-click-suggest-command}

```text
click-suggest-command: func(command: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `command` | `string` |

### `text-component.click-change-page` {#operation-text-component-click-change-page}

```text
click-change-page: func(page: u32);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `page` | `u32` |

### `text-component.click-copy-to-clipboard` {#operation-text-component-click-copy-to-clipboard}

```text
click-copy-to-clipboard: func(text: string);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `text` | `string` |

### `text-component.hover-show-text` {#operation-text-component-hover-show-text}

```text
hover-show-text: func(text: text-component);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `text` | `text-component` |

### `text-component.hover-show-item` {#operation-text-component-hover-show-item}

```text
hover-show-item: func(item: string);
```

Item data as SNBT string

**Parameters**

| Name | WIT type |
| --- | --- |
| `item` | `string` |

### `text-component.hover-show-entity` {#operation-text-component-hover-show-entity}

```text
hover-show-entity: func(entity-type: string, id: string, name: option<text-component>);
```

**Parameters**

| Name | WIT type |
| --- | --- |
| `entity-type` | `string` |
| `id` | `string` |
| `name` | `option<text-component>` |
