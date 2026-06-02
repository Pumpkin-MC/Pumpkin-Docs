# Player Data

Pumpkin allows you to configure how player data is saved and persisted.

## Configuring Player Data

#### `save_player_data`: Boolean

Whether player data (inventory, position, stats, etc.) is saved.

:::code-group

```toml [pumpkin.toml] {2}
[player_data]
save_player_data = true
```

:::

#### `save_player_cron_interval`: Integer

The time interval in seconds between automatic player data saves.

:::code-group

```toml [pumpkin.toml] {2}
[player_data]
save_player_cron_interval = 300
```

:::

The default value of `300` seconds equals **5 minutes**.

## Default Config

:::code-group

```toml [pumpkin.toml]
[player_data]
save_player_data = true
save_player_cron_interval = 300
```

:::
