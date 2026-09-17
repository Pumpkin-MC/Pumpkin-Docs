# Chat e Anti-Spam

O Pumpkin oferece formatação de chat personalizável no jogo e proteção anti-spam integrada na seção `[chat]` do `pumpkin.toml`.

## Configuração

:::code-group

```toml [pumpkin.toml]
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"

[chat.anti_spam]
enabled = true
spam_threshold = 200
message_cost = 20
decay_per_tick = 1
ops_bypass = true
```

:::

### Configurações de Chat

- **`format`**: A string de formato da mensagem de chat (padrão: `"<{DISPLAYNAME}> {MESSAGE}"`).
  - `{DISPLAYNAME}`: Nome de exibição do jogador.
  - `{MESSAGE}`: Texto da mensagem de chat.
  > [!NOTE]
  > A formatação personalizada de chat não se aplica quando o relatório seguro de chat (`allow_chat_reports = true`) estiver habilitado.

### Proteção Anti-Spam

O Pumpkin implementa um contador de spam do tipo leaky-bucket (balde furado) para proteger o servidor contra spam de jogadores e inundações de bots:

- **`enabled`**: Se a proteção anti-spam está ativa (padrão: `true`).
- **`spam_threshold`**: O limite do contador de spam em ticks no qual um jogador será expulso (kicked) (padrão: `200` ticks).
- **`message_cost`**: A quantidade adicionada ao contador de spam do jogador para cada mensagem de chat ou comando enviado (padrão: `20` ticks).
- **`decay_per_tick`**: A quantidade decaída do contador de spam do jogador a cada tick do servidor (padrão: `1` tick).
- **`ops_bypass`**: Se os operadores do servidor ignoram as verificações anti-spam (padrão: `true`).
