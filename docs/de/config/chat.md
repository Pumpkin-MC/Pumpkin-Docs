# Chat & Anti-Spam

Pumpkin bietet anpassbare In-Game-Chatformatierung und einen integrierten Anti-Spam-Schutz unter `[chat]` in `pumpkin.toml`.

## Konfiguration

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

### Chat-Einstellungen

- **`format`**: Das Format für Chatnachrichten (Standard: `"<{DISPLAYNAME}> {MESSAGE}"`).
  - `{DISPLAYNAME}`: Anzeigename des Spielers.
  - `{MESSAGE}`: Text der Chatnachricht.
  > [!NOTE]
  > Eine benutzerdefinierte Chatformatierung wird nicht angewendet, wenn sichere Chat-Meldungen (`allow_chat_reports = true`) aktiviert sind.

### Anti-Spam-Schutz

Pumpkin implementiert einen Leaky-Bucket-Spam-Zähler, um den Server vor spammenden Spielern und Bot-Floods zu schützen:

- **`enabled`**: Gibt an, ob der Anti-Spam-Schutz aktiv ist (Standard: `true`).
- **`spam_threshold`**: Der Schwellenwert des Spam-Zählers in Ticks, ab dem ein Spieler gekickt wird (Standard: `200` Ticks).
- **`message_cost`**: Der Wert, der dem Spam-Zähler des Spielers für jede gesendete Chatnachricht oder jeden Befehl hinzugefügt wird (Standard: `20` Ticks).
- **`decay_per_tick`**: Der Wert, um den der Spam-Zähler des Spielers mit jedem Server-Tick abgebaut wird (Standard: `1` Tick).
- **`ops_bypass`**: Gibt an, ob Server-Operatoren von Anti-Spam-Prüfungen ausgenommen sind (Standard: `true`).
