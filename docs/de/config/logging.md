# Logging

Pumpkin gibt dir Kontrolle darüber, was in die Logs geschrieben wird.

## Logging konfigurieren

#### `enabled`: Boolean

Ob Logging aktiviert ist oder nicht.

:::code-group

```toml [features.toml] {2}
[logging]
enabled = true
```

:::

#### `level`: Enum

Die Protokoll‑Verbalität (Log‑Level). Mögliche Werte:

- Off
- Error
- Warn
- Info
- Debug
- Trace

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
level = "Debug"
```

:::

#### `env`: Boolean

Ob das Log‑Level über die Umgebungsvariable `RUST_LOG` gesteuert werden kann.

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
env = true
```

:::

#### `threads`: Boolean

Ob Threads in Log‑Einträgen ausgegeben werden sollen.

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
threads = false
```

:::

#### `color`: Boolean

Ob die Konsolenausgabe farbig erfolgen soll.

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
color = false
```

:::

#### `timestamp`: Boolean

Ob ein Zeitstempel in den Log‑Nachrichten ausgegeben werden soll.

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
timestamp = false
```

:::

## Standardkonfiguration

Standardmäßig ist Logging auf `Info` gesetzt und gibt farbige Ausgaben inklusive Threads und Zeitstempel aus.

:::code-group

```toml [features.toml]
[logging]
enabled = true
level = "Info"
env = false
threads = true
color = true
timestamp = true
```

:::
