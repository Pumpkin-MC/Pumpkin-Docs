# Logging

Pumpkin provides customizable logging options in `pumpkin.toml`.

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

- **`enabled`**: Master switch to enable or disable logging.
- **`threads`**: Include thread names/IDs in log output.
- **`color`**: Enable ANSI color output in console logs.
- **`timestamp`**: Include timestamps in log entries.
- **`file`**: Path to the log file (e.g. `"latest.log"`).
