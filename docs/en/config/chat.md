# Chat
Pumpkin allows you to configure how the chat appears to players.

## Configuring Chat
#### `format`: String
Allows you to customize how the sender name and message appear in chat.

> [!TIP]
> The chat format accepts all Minecraft style codes prefixed with `&`.<br>[See All Minecraft Style Codes](https://htmlcolorcodes.com/minecraft-color-codes/)

::: details Available placeholders
```toml
{DISPLAYNAME}  - The name of the player who sent the message.
{MESSAGE}      - The message that the player sent.
```
:::

:::code-group
```toml [features.toml]
[chat]
format = "&l{DISPLAYNAME}&7: {MESSAGE}"
```
:::

## Default Config
By default, chat messages will appear identically to Vanilla messages.

:::code-group
```toml [features.toml]
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"
```
:::