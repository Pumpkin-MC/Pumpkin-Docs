# Authentifaction

Pumpkin vérifie les comptes avec les serveur de session de Mojang pour assurer que les joueurs utilisents des comptes légitimes. Les paramètre d'authentification sont configuréssous `[networking.java.authentication]` et `[networking.bedrock.authentication]` dans `pumpkin.toml`.

## Java Edition Authentifaction

:::code-group

```toml [pumpkin.toml]
[networking.java.authentication]
enabled = true
connect_timeout = 5000
read_timeout = 5000
prevent_proxy_connections = false

[networking.java.authentication.player_profile]
allow_banned_players = false
allowed_actions = ["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]

[networking.java.authentication.textures]
enabled = true
allowed_url_schemes = ["http", "https"]
allowed_url_domains = [".minecraft.net", ".mojang.com"]

[networking.java.authentication.textures.types]
skin = true
cape = true
elytra = true
```

:::

### Options de configuration

- **`enabled`**: Active l'authentifaction en ligne pour les clients Java.
- **`connect_timeout`**: Délai d'attente de la connection en millisecondes lors de la connection aux serveur d'authentifaction.
- **`read_timeout`**: Délai d'attente de la lecture en millisecondes lors de la connection aux serveur d'authentifaction.
- **`prevent_proxy_connections`**: Bloquer les connection via proxy/VPN pendant l'authentifaction.

### Player Profile Settings

- **`allow_banned_players`**: Autoriser les joueurs bannis par Mojang à se connecter.
- **`allowed_actions`**: Actions autorisés quand un joueur bannis se connecte (`"FORCED_NAME_CHANGE"`, `"USING_BANNED_SKIN"`).

### Textures Settings

- **`enabled`**: Activer la vérification des textures du joueur (skins, capes, elytras).
- **`allowed_url_schemes`**: Schemas d'URL permis pour télécharger les textures (`["http", "https"]`).
- **`allowed_url_domains`**: Domaines permis pour télécharger les textures (`[".minecraft.net", ".mojang.com"]`).
- **`types.skin`**: Activer les skins personnalisés.
- **`types.cape`**: Activer les capes.
- **`types.elytra`**: Activer les textures d'élytre.

## Bedrock Edition Authentication

:::code-group

```toml [pumpkin.toml]
[networking.bedrock.authentication]
enabled = true
connect_timeout = 5000
read_timeout = 5000
```

:::
