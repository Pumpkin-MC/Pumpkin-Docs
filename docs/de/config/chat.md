# Chat

Pumpkin ermöglicht die Anpassung des Chat-Nachrichtenformats.

## Chat konfigurieren

#### `format`: Zeichenkette

Das Format für Chat-Nachrichten. Unterstützt Platzhalter wie `{DISPLAYNAME}` und `{MESSAGE}`.

:::code-group

```toml [pumpkin.toml] {2}
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"
```

:::

### Verfügbare Platzhalter

| Platzhalter     | Beschreibung           |
| --------------- | ---------------------- |
| `{DISPLAYNAME}` | Der Anzeigename des Spielers |
| `{MESSAGE}`     | Der Inhalt der Chat-Nachricht |

## Standardkonfiguration

:::code-group

```toml [pumpkin.toml]
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"
```

:::
