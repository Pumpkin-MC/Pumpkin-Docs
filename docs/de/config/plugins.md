# Plugins

Pumpkin unterstützt WASM-basierte Plugins. Dieser Bereich konfiguriert plugin-bezogene Einstellungen.

## Plugins konfigurieren

#### `blocked_permissions`: Zeichenketten-Array

Liste von Berechtigungen, die für alle Plugins global blockiert sind.

:::code-group

```toml [pumpkin.toml] {2}
[plugins]
blocked_permissions = []
```

:::

## Standardkonfiguration

:::code-group

```toml [pumpkin.toml]
[plugins]
blocked_permissions = []
```

:::
