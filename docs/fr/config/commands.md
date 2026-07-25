# Commandes

Pumpkin supporte les commandes Minecraft et autorise la configuration de la console, TTY, et le comportement des permissions dans `pumpkin.toml`.

## Configuration

:::code-group

```toml [pumpkin.toml]
[commands]
use_console = true
use_tty = true
log_console = true
broadcast_console_to_ops = true
default_op_level = 0
```

:::

### Configuration Options

- **`use_console`**: Controle si les commandes rentrés depuis la console sont acceptés ou non.
- **`use_tty`**: Controle si le support de TTY est activé ou non pour la console interactive.
- **`log_console`**: Controle si les commandes éxecutés par les joueurs sont enregistrés dans la console ou non.
- **`broadcast_console_to_ops`**: Renvoie la console aux opérateur (OPs).
- **`default_op_level`**: Niveau d'OP assigné par défaut (0 à 4).
