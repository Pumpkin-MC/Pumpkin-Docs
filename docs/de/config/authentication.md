# Authentifizierung

Server authentifizieren sich über Mojangs Session‑Server, um sicherzustellen, dass der Client auf einem legitimen, bezahlten Account spielt. Pumpkin erlaubt dir, die Authentifizierung vollständig zu konfigurieren.

## Authentifizierung konfigurieren

> [!WARNING]
> Die meisten Server sollten die Standard‑Authentifizierungs‑Konfiguration nicht ändern. Änderungen können unerwartete Folgen haben. **Passe diese Einstellungen nur an, wenn du genau weißt, was du tust!**

#### `enabled`: Boolean

Ob Authentifizierung aktiviert ist oder nicht.

:::code-group

```toml [features.toml] {2}
[authentication]
enabled = false
```

:::

#### `prevent_proxy_connections`: Boolean

Ob Proxy‑Verbindungen blockiert werden.

:::code-group

```toml [features.toml] {3}
[authentication]
enabled = true
prevent_proxy_connections = true
```

:::

#### `auth_url`: String (optional)

Die URL, gegen die authentifiziert wird. Nutzt Mojangs Session‑Server, wenn nicht angegeben.

##### Platzhalter

| Platzhalter      | Beschreibung           |
| ---------------- | ---------------------- |
| `{username}`     | Spielername            |
| `{server_hash}`  | Hash des Servers       |

:::code-group

```toml [features.toml] {2}
[authentication]
auth_url = "[custom auth server here]"
```

:::

#### `prevent_proxy_connection_auth_url`: String (optional)

Die URL für Authentifizierung, falls `prevent_proxy_connections` aktiviert ist. Nutzt Mojangs Session‑Server, wenn nicht angegeben.

##### Platzhalter

| Platzhalter      | Beschreibung                |
| ---------------- | --------------------------- |
| `{username}`     | Spielername                 |
| `{server_hash}`  | Hash des Servers            |
| `{ip}`           | IP‑Adresse des Spielers     |

:::code-group

```toml [features.toml] {2}
[authentication]
prevent_proxy_connection_auth_url = "[custom auth server here]"
```

:::

### Spielerprofil

#### `allow_banned_players`: Boolean

Spieler zulassen, die von Mojang markiert sind.

:::code-group

```toml [features.toml] {2}
[authentication.player_profile]
allow_banned_players = true
```

:::

#### `allowed_actions`: String Array

Welche Aktionen erlaubt sind, falls `allow_banned_players` aktiviert ist.

:::code-group

```toml [features.toml] {3}
[authentication.player_profile]
allow_banned_players = true
allowed_actions = ["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]
```

:::

### Texturen

#### `enabled`: Boolean

Ob Spielertexturen (z. B. Skins / Capes) gefiltert / validiert werden.

:::code-group

```toml [features.toml] {2}
[authentication.textures]
enabled = true
```

:::

#### `allowed_url_schemes`: String Array

Erlaubte URL‑Schemes für Texturen.

:::code-group

```toml [features.toml] {3}
[authentication.textures]
enabled = true
allowed_url_schemes = ["http", "https"]
```

:::

#### `allowed_url_domains`: String Array

Erlaubte URL‑Domains für Texturen.

:::code-group

```toml [features.toml] {3}
[authentication.textures]
enabled = true
allowed_url_domains = [".minecraft.net", ".mojang.com"]
```

:::

### Texturtypen

#### `skin`: Boolean

Ob Spielerskins genutzt werden.

:::code-group

```toml [features.toml] {3}
[authentication.textures.types]
skin = true
```

:::

#### `cape`: Boolean

Ob Spieler‑Capes genutzt werden.

:::code-group

```toml [features.toml] {3}
[authentication.textures.types]
cape = true
```

:::

#### `elytra`: Boolean

Ob Elytren genutzt werden.

:::code-group

```toml [features.toml] {3}
[authentication.textures.types]
elytra = true
```

:::

## Standardkonfiguration

Standardmäßig ist Authentifizierung aktiviert und nutzt Mojangs Server. Hier die Default‑Konfiguration:
:::code-group

```toml [features.toml]
[authentication]
enabled = true
prevent_proxy_connections = false

[authentication.player_profile]
allow_banned_players = false
allowed_actions = ["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]

[authentication.textures]
enabled = true
allowed_url_schemes = ["http", "https"]
allowed_url_domains = [".minecraft.net", ".mojang.com"]

[authentication.textures.types]
skin = true
cape = true
elytra = true
```

:::
