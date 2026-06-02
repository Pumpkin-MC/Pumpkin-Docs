# Chat

O Pumpkin permite personalizar o formato das mensagens do chat.

## Configurando o Chat

#### `format`: String

O formato para mensagens do chat. Suporta placeholders como `{DISPLAYNAME}` e `{MESSAGE}`.

:::code-group

```toml [pumpkin.toml] {2}
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"
```

:::

### Placeholders disponíveis

| Placeholder       | Descrição                     |
| ----------------- | ----------------------------- |
| `{DISPLAYNAME}`   | O nome de exibição do jogador |
| `{MESSAGE}`       | O conteúdo da mensagem do chat |

## Configuração padrão

:::code-group

```toml [pumpkin.toml]
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"
```

:::
