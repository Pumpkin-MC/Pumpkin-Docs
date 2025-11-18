# RCON

RCON ist ein Protokoll, mit dem du den Server remote von einem anderen Gerät verwalten kannst. Pumpkin unterstützt RCON vollständig.

## RCON konfigurieren

#### `enabled`: Boolean

:::code-group

```toml [features.toml] {2}
[rcon]
enabled = true
```

:::

#### `address`: String

Adresse und Port, auf denen RCON lauschen soll.

:::code-group

```toml [features.toml] {3}
[rcon]
enabled = true
address = "0.0.0.0:25575"
```

:::

#### `password`: String

Das Passwort für RCON‑Authentifizierung.

:::code-group

```toml [features.toml] {3}
[rcon]
enabled = true
password = "[dein sicheres passwort hier]"
```

:::

#### `max_connections`: Integer

Maximale Anzahl gleichzeitiger RCON‑Verbindungen. `0` deaktiviert das Limit.

:::code-group

```toml [features.toml] {3}
[rcon]
enabled = true
max_connections = 5
```

:::

### Logging

#### `log_logged_successfully`: Boolean

Ob erfolgreiche Logins protokolliert werden.

:::code-group

```toml [features.toml] {2}
[rcon.logging]
log_logged_successfully = true
```

:::

#### `log_wrong_password`: Boolean

Ob falsche Passwortversuche protokolliert werden.

:::code-group

```toml [features.toml] {2}
[rcon.logging]
log_logged_successfully = true
```

:::

#### `log_commands`: Boolean

Ob von RCON ausgeführte Befehle protokolliert werden.

:::code-group

```toml [features.toml] {2}
[rcon.logging]
log_commands = true
```

:::

#### `log_quit`: Boolean

Ob das Beenden eines RCON‑Clients protokolliert wird.

:::code-group

```toml [features.toml] {2}
[rcon.logging]
log_quit = true
```

:::

## Standardkonfiguration

Standardmäßig ist RCON deaktiviert.

:::code-group

```toml [features.toml]
[rcon]
enabled = false
address = "0.0.0.0:25575"
password = ""
max_connections = 0

[rcon.logging]
log_logged_successfully = true
log_wrong_password = true
log_commands = true
log_quit = true
```

:::
