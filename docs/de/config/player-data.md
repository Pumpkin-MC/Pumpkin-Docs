# Spielerdaten

Pumpkin ermöglicht die Konfiguration, wie Spielerdaten gespeichert und verwaltet werden.

## Spielerdaten konfigurieren

#### `save_player_data`: Boolean

Ob Spielerdaten (Inventar, Position, Statistiken usw.) gespeichert werden.

:::code-group

```toml [pumpkin.toml] {2}
[player_data]
save_player_data = true
```

:::

#### `save_player_cron_interval`: Ganzzahl

Das Zeitintervall in Sekunden zwischen automatischen Spielerdatenspeicherungen.

:::code-group

```toml [pumpkin.toml] {2}
[player_data]
save_player_cron_interval = 300
```

:::

Der Standardwert von `300` Sekunden entspricht **5 Minuten**.

## Standardkonfiguration

:::code-group

```toml [pumpkin.toml]
[player_data]
save_player_data = true
save_player_cron_interval = 300
```

:::
