# Chat & Anti-Spam

Pumpkin provides customizable in-game chat formatting and built-in anti-spam protection under `[chat]` in `pumpkin.toml`.

## Configuration

:::code-group

```toml [pumpkin.toml]
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"

[chat.anti_spam]
enabled = true
spam_threshold = 200
# chat_spam_threshold_seconds = 10
# command_spam_threshold_seconds = 10
message_cost = 20
decay_per_tick = 1
ops_bypass = true
```

:::

### Chat Settings

- **`format`**: The chat message format string (default: `"<{DISPLAYNAME}> {MESSAGE}"`).
  - `{DISPLAYNAME}`: Player display name.
  - `{MESSAGE}`: Chat message text.
  > [!NOTE]
  > Custom chat formatting does not apply when secure chat reporting (`allow_chat_reports = true`) is enabled.

### Anti-Spam Protection

Pumpkin implements a leaky-bucket spam counter to protect the server from spamming players and bot floods:

- **`enabled`**: Whether anti-spam protection is active (default: `true`).
- **`spam_threshold`**: Legacy tick-based spam counter threshold at which a player will be kicked (default: `200` ticks).
- **`chat_spam_threshold_seconds`**: (Optional) Chat spam threshold in seconds (also accepts `chat-spam-threshold-seconds`). Overrides the legacy `spam_threshold` for chat messages when set (`seconds * 20` ticks).
- **`command_spam_threshold_seconds`**: (Optional) Command spam threshold in seconds (also accepts `command-spam-threshold-seconds`). Overrides the legacy `spam_threshold` for commands when set (`seconds * 20` ticks).
- **`message_cost`**: The amount added to the player's spam counter for each chat message or command sent (default: `20` ticks).
- **`decay_per_tick`**: The amount decayed from the player's spam counter on each server tick (default: `1` tick).
- **`ops_bypass`**: Whether server operators bypass anti-spam checks (default: `true`).
