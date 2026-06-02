# RCON

RCON ist ein Protokoll, mit dem du den Server remote von einem anderen Gerät verwalten kannst. Pumpkin unterstützt RCON vollständig.

## RCON konfigurieren

#### `enabled`: Boolean

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon]
enabled = true
```

:::

#### `address`: String

Adresse und Port, auf denen RCON lauschen soll.

:::code-group

```toml [pumpkin.toml] {3}
[networking.rcon]
enabled = true
address = "0.0.0.0:25575"
```

:::

#### `password`: String

Das Passwort für RCON‑Authentifizierung.

:::code-group

```toml [pumpkin.toml] {3}
[networking.rcon]
enabled = true
password = "[dein sicheres passwort hier]"
```

:::

#### `max_connections`: Integer

Maximale Anzahl gleichzeitiger RCON‑Verbindungen. `0` deaktiviert das Limit.

:::code-group

```toml [pumpkin.toml] {3}
[networking.rcon]
enabled = true
max_connections = 5
```

:::

### Logging

#### `logged_successfully`: Boolean

Ob erfolgreiche Logins protokolliert werden.

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
logged_successfully = true
```

:::

#### `wrong_password`: Boolean

Ob falsche Passwortversuche protokolliert werden.

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
logged_successfully = true
```

:::

#### `commands`: Boolean

Ob von RCON ausgeführte Befehle protokolliert werden.

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
commands = true
```

:::

#### `quit`: Boolean

Ob das Beenden eines RCON‑Clients protokolliert wird.

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
quit = true
```

:::

## Standardkonfiguration

Standardmäßig ist RCON deaktiviert.

:::code-group

```toml [pumpkin.toml]
[networking.rcon]
enabled = false
address = "0.0.0.0:25575"
password = ""
max_connections = 0

[networking.rcon.logging]
logged_successfully = true
wrong_password = true
commands = true
quit = true
```

:::
