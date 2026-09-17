# Spelergegevens & Gameplay

Instellingen voor het opslaan van persistente spelergegevens, advancements, receptsynchronisatie en leuke seizoensgebonden functies worden geconfigureerd in `pumpkin.toml`.

## Configuratie

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

### Spelergegevens

- **`save_player_data`**: Of persistente spelergegevens (inventaris, locatie, levenspunten) worden opgeslagen op schijf (standaard: `true`).
- **`save_player_cron_interval`**: Tijdsinterval in seconden tussen periodieke automatische opslag van gegevens van online spelers (standaard: `300` seconden / 5 minuten).

### Advancements

- **`save_advancements`**: Of de voortgang van advancements van spelers wordt bijgehouden en opgeslagen op schijf (standaard: `true`).

### Recepten

- **`send_recipes`**: Of crafting- en smelting-recepten worden gesynchroniseerd met verbonden clients, waardoor het receptenboek aan de clientzijde werkt (standaard: `true`).

### Leuke functies

- **`april_fools`**: Of leuke en seizoensgebonden 1-april-easter-eggs en -functies zijn ingeschakeld (standaard: `true`).
