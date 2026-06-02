# Whitelist

Pumpkin supports a whitelist to restrict server access to specific players.

## Configuration

The whitelist is controlled by two top-level fields in `pumpkin.toml`:

#### `white_list`: Boolean

Whether the whitelist is enabled.

:::code-group

```toml [pumpkin.toml] {2}
white_list = false
```

:::

#### `enforce_whitelist`: Boolean

Whether to kick players who are not on the whitelist when it is enabled. This applies when the whitelist is updated while players are online.

:::code-group

```toml [pumpkin.toml] {2}
enforce_whitelist = false
```

:::

## Whitelist File

Whitelist entries are stored in `whitelist.json` in the server's working directory. Each entry contains:

```json
{
  "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "name": "PlayerName"
}
```

You can manage the whitelist using the `/whitelist` command in-game or from the console.

## Default Config

:::code-group

```toml [pumpkin.toml]
white_list = false
enforce_whitelist = false
```

:::
