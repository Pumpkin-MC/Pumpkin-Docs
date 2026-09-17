# Welt

Pumpkin ermöglicht die Feinabstimmung von Weltspeicherformaten, automatischen Speicherintervallen (Autosave) und Beleuchtungsmodi unter `[world]` in `pumpkin.toml`.

## Konfiguration

:::code-group

```toml [pumpkin.toml]
[world]
lighting = "default"
autosave_ticks = 6000

[world.chunk]
type = "anvil"
write_in_place = false

[world.chunk.compression]
algorithm = "LZ4"
level = 6
```

:::

### Welteinstellungen

- **`lighting`**: Berechnungsmodus für die Lichtausbreitung der Beleuchtungs-Engine.
  - `"default"`: Standardmäßige Vanilla-Minecraft-Lichtausbreitung.
  - `"full"`: Durchgehend volles Himmelslicht überall ohne Schatten.
  - `"dark"`: Vollständig dunkle Beleuchtung überall (kein Licht).
- **`autosave_ticks`**: Anzahl der Server-Ticks zwischen automatischen Weltspeicherungen (Standard: `6000`, entspricht 5 Minuten bei 20 TPS). Ein Wert von `0` deaktiviert das automatische Speichern der Welt.

### Chunk-Speichereinstellungen

- **`type`**: Das zu verwendende Chunk-Speicherformat:
  - `"anvil"`: Standardmäßiges Minecraft-Anvil-Region-Dateiformat (`.mca`).
  - `"linear"`: Linear-Region-Speicherformat mit schneller Kompression für einen geringeren Speicherplatzbedarf.
  - `"pump"`: Pumpkins natives, optimiertes Weltformat.
- **`write_in_place`**: Gibt an, ob Chunks direkt an Ort und Stelle (in-place) in bestehende Regionsdateien überschrieben werden sollen, anstatt freie Chunks neu zuzuweisen (Standard: `false`).
- **`compression.algorithm`**: Kompressionsalgorithmus für Chunk-Daten (`"LZ4"`, `"ZLib"`, `"GZip"`, `"Custom"`).
- **`compression.level`**: Kompressionsstufe für die Chunk-Speicherung (Standard: `6`).
