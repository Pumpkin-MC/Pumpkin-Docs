# Logging

Pumpkin met a disposition des options de journalisation dans `pumpkin.toml`.

## Configuration

:::code-group

```toml [pumpkin.toml]
[logging]
enabled = true
threads = true
color = true
timestamp = true
file = "latest.log"
```

:::

### Configuration Options

- **`enabled`**: Interrupteur principale pour activer ou désactiver la journalisation.
- **`threads`**: Inclure les noms des fils d'execution (threads) / IDs dans la sortie de la journalisation.
- **`color`**: Active les couleur ANSI dans la journalisation de la console.
- **`timestamp`**: Inclus le timestamp dans les entrés de journalisation.
- **`file`**: Chemin de fichier de journalisation (ex: `"latest.log"`).
