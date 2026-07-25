# Commands

Pumpkin supports Minecraft commands and allows configuring console, TTY, and permission behaviors in `pumpkin.toml`.

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

- **`use_console`**: Whether commands input via console are accepted.
- **`use_tty`**: Whether TTY support is enabled for the interactive console.
- **`log_console`**: Whether commands executed by players are logged to the console.
- **`broadcast_console_to_ops`**: Broadcast console command outputs to server operators.
- **`default_op_level`**: Default OP level assigned (0 to 4).
