# RCON

RCON permet administration à disqtance de votre server Pumpkin par une connection réseau. Dans `pumpkin.toml`, les paramètres sont placés sous `[networking.rcon]`

## Configuration

:::code-group

```toml [pumpkin.toml]
[networking.rcon]
enabled = false
address = "0.0.0.0:25575"
password = ""
max_connections = 10

[networking.rcon.logging]
logged_successfully = true
wrong_password = true
commands = true
quit = true
```

:::

### Paramètres RCON

- **`enabled`**: Commutateur principal pour activer le service RCON.
- **`address`**: Adresse IP et port auxquels lier le serveur RCON.
- **`password`**: Mot de passe requis pour l’authentification des clients RCON.
- **`max_connections`**: Nombre maximal de connexions concurrentes à des clients RCON autorisées.

### Paramètres de connection RCON

- **`logged_successfully`** : consigner les événements d’authentification client réussis.
- **`wrong_password`** : Consigner les tentatives d’authentification échouées (mauvais mot de passe).
- **`commands`** : consigner les commandes exécutées via RCON.
- **`quit`** : consigner les événements de déconnexion du client.