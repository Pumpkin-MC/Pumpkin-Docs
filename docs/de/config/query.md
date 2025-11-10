# Query

Das Query‑Protokoll ist eine einfache Möglichkeit, den Server nach seinem Status abzufragen. Pumpkin unterstützt das Query‑Protokoll vollständig.

## Query konfigurieren

#### `enabled`: Boolean

Ob auf Query‑Anfragen gehört werden soll oder nicht.

:::code-group

```toml [features.toml] {2}
[query]
enabled = true
```

:::

#### `port`: Integer (0‑65535) (optional)

Auf welchem Port Query‑Anfragen entgegengenommen werden sollen. Wenn nicht angegeben, wird derselbe Port wie der Serverport verwendet.

:::code-group

```toml [features.toml] {3}
[query]
enabled = true
port = 12345
```

:::

## Standardkonfiguration

Standardmäßig ist Query deaktiviert. Wenn es aktiviert ist und kein Port angegeben wurde, läuft es auf dem Server‑Port.

:::code-group

```toml [features.toml]
[query]
enabled = true
port = 25565
```

:::
