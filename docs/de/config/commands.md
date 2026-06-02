# Befehle

Pumpkin unterstützt Vanilla‑Befehle und erlaubt dir zu konfigurieren, von wo sie ausgeführt werden dürfen.

## Befehle konfigurieren

#### `use_console`: Boolean

Ob Befehle aus der Konsole akzeptiert werden.

:::code-group

```toml [pumpkin.toml] {2}
[commands]
use_console = false
```

:::

#### `log_console`: Boolean

Ob Spieler‑Befehle in der Konsole protokolliert werden.

:::code-group

```toml [pumpkin.toml] {2}
[commands]
log_console = false
```

:::

## Operator‑Berechtigungslevel

Standard‑Berechtigungslevel für alle Spieler.

:::code-group

```toml [pumpkin.toml] {2}
default_op_level = 0
```

:::

## Standardkonfiguration

Standardmäßig erlaubt Pumpkin Befehle aus der Konsole und protokolliert alle Spieler‑Befehle.

:::code-group

```toml [pumpkin.toml]
[commands]
use_console = true
log_console = true
default_op_level = 0
```

:::
