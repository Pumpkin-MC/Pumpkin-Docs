# Spielerdaten & Gameplay

Einstellungen zum Speichern persistenter Spielerdaten, Fortschritte (Advancements), Rezept-Synchronisation und saisonaler Späße werden in `pumpkin.toml` vorgenommen.

## Konfiguration

:::code-group

```toml [pumpkin.toml]
[player_data]
save_player_data = true
save_player_cron_interval = 300

[advancement]
save_advancements = true

[recipe]
send_recipes = true

[fun]
april_fools = true
```

:::

### Spielerdaten

- **`save_player_data`**: Gibt an, ob persistente Spielerdaten (Inventar, Position, Gesundheit) auf der Festplatte gespeichert werden (Standard: `true`).
- **`save_player_cron_interval`**: Zeitintervall in Sekunden zwischen automatischen periodischen Speicherungen der Daten von Online-Spielern (Standard: `300` Sekunden / 5 Minuten).

### Fortschritte (Advancements)

- **`save_advancements`**: Gibt an, ob der Fortschritt von Spielern bei Fortschritten/Erfolgen erfasst und auf der Festplatte gespeichert wird (Standard: `true`).

### Rezepte

- **`send_recipes`**: Gibt an, ob Werk- und Schmelzrezepte mit verbundenen Clients synchronisiert werden, wodurch das clientseitige Rezeptbuch aktiviert wird (Standard: `true`).

### Spaßfunktionen

- **`april_fools`**: Gibt an, ob lustige und saisonale Aprilscherz-Easter-Eggs und Features aktiviert sind (Standard: `true`).
