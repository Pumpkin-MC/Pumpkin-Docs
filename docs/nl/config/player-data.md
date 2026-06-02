# Spelergegevens

Pumpkin maakt het mogelijk om te configureren hoe spelersgegevens worden opgeslagen.

## Spelergegevens configureren

#### `save_player_data`: Boolean

Of spelersgegevens (inventaris, positie, statistieken enz.) worden opgeslagen.

:::code-group

```toml [pumpkin.toml] {2}
[player_data]
save_player_data = true
```

:::

#### `save_player_cron_interval`: Geheel getal

Het tijdsinterval in seconden tussen automatische opslagen van spelersgegevens.

:::code-group

```toml [pumpkin.toml] {2}
[player_data]
save_player_cron_interval = 300
```

:::

De standaardwaarde van `300` seconden is gelijk aan **5 minuten**.

## Standaardconfiguratie

:::code-group

```toml [pumpkin.toml]
[player_data]
save_player_data = true
save_player_cron_interval = 300
```

:::
