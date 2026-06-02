# Chat

Pumpkin allows you to customize the chat message format.

## Configuring Chat

#### `format`: String

The format string for chat messages. Supports placeholders like `{DISPLAYNAME}` and `{MESSAGE}`.

:::code-group

```toml [pumpkin.toml] {2}
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"
```

:::

### Available Placeholders

| Placeholder     | Description              |
| --------------- | ------------------------ |
| `{DISPLAYNAME}` | The player's display name |
| `{MESSAGE}`     | The chat message content  |

## Default Config

:::code-group

```toml [pumpkin.toml]
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"
```

:::
