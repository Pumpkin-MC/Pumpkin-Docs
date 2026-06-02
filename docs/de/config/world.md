# Welt

Pumpkin ermöglicht die Konfiguration von Weltgenerierung, Chunk-Speicherung, Beleuchtung und automatischem Speichern.

## Beleuchtung

#### `lighting`: Enum

Steuert die Beleuchtungsberechnung während der Chunk-Generierung.

:::code-group

```toml [pumpkin.toml] {2}
[world]
lighting = "default"
```

:::

```toml
default
full
dark
```

## Automatisches Speichern

#### `autosave_ticks`: Ganzzahl

Das Intervall zwischen automatischen Welt-Speicherungen in Server-Ticks. Auf `0` setzen, um Autosave zu deaktivieren.

:::code-group

```toml [pumpkin.toml] {2}
[world]
autosave_ticks = 0
```

:::

## Welttyp

#### `level_type`: Zeichenkette

Der zu verwendende Weltgenerator. Der Präfix `minecraft:` ist optional.

:::code-group

```toml [pumpkin.toml] {2}
[world]
level_type = "minecraft:normal"
```

:::

```toml
minecraft:normal
minecraft:flat
```

Unbekannte Werte fallen zurück auf normale Generierung.

## Generator-Einstellungen

#### `generator_settings`: Zeichenkette

Generatorspezifische Einstellungen. Ein leerer Wert wählt die **Classic Flat**-Voreinstellung.

:::code-group

```toml [pumpkin.toml] {2}
[world]
generator_settings = ""
```

:::

## Superflat

Setzen Sie `level_type = "flat"`, um eine spielbare Superflat-Welt mit festen horizontalen Schichten, einem einzelnen Biom und ohne Geländerauschen zu erzeugen.

### Voreinstellungsformat

Der `generator_settings`-String folgt dem Vanilla-Format:

```
layers;biome
```

#### Schichten

Eine durch Kommas getrennte Liste von Blockschichten, sortiert von **unten nach oben**. Jeder Eintrag ist:

- `minecraft:block_name` — eine einzelne Schicht
- `count*minecraft:block_name` — mehrere gestapelte Schichten (z.B. `3*minecraft:stone`)

#### Biom

Der Teil nach dem Semikolon setzt das Welt-Biom (z.B. `minecraft:plains`, `minecraft:desert`).

### Classic-Flat-Voreinstellung

Wenn `generator_settings` leer ist:

```
minecraft:bedrock,2*minecraft:dirt,minecraft:grass_block;minecraft:plains
```

## Chunk-Speicherung

#### `type`: Enum

Das Chunk-Speicherformat steuert, wie Chunk-Daten auf der Festplatte gespeichert werden.

:::code-group

```toml [pumpkin.toml] {2}
[world.chunk]
type = "pump"
```

:::

```toml
pump
anvil
linear
```
