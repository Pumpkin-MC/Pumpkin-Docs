# Wereld

Pumpkin maakt het mogelijk om wereldgeneratie, chunk-opslag, verlichting en automatisch opslaan te configureren.

## Verlichting

#### `lighting`: Enum

Beheert de lichtberekening tijdens chunk-generatie.

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

## Automatisch opslaan

#### `autosave_ticks`: Geheel getal

Het interval tussen automatische wereldopslagen, gemeten in server-ticks. Stel in op `0` om automatisch opslaan uit te schakelen.

:::code-group

```toml [pumpkin.toml] {2}
[world]
autosave_ticks = 0
```

:::

## Wereldtype

#### `level_type`: Tekenreeks

De te gebruiken wereldgenerator. Het `minecraft:`-voorvoegsel is optioneel.

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

Onbekende waarden vallen terug op normale generatie.

## Generatorinstellingen

#### `generator_settings`: Tekenreeks

Generatorspecifieke instellingen. Een lege waarde selecteert de **Classic Flat**-voorinstelling.

:::code-group

```toml [pumpkin.toml] {2}
[world]
generator_settings = ""
```

:::

## Superflat

Stel `level_type = "flat"` in om een speelbare superflat-wereld te genereren met vaste horizontale lagen, één biome en geen terreinruis.

### Voorinstellingsformaat

De `generator_settings`-string volgt het Vanilla-formaat:

```
layers;biome
```

#### Lagen

Een door komma's gescheiden lijst van bloklagen, gerangschikt van **onder naar boven**. Elke invoer is:

- `minecraft:block_name` — een enkele laag
- `count*minecraft:block_name` — meerdere gestapelde lagen (bijv. `3*minecraft:stone`)

#### Biome

Het gedeelte na de puntkomma stelt het wereldbiome in (bijv. `minecraft:plains`, `minecraft:desert`).

### Classic Flat-voorinstelling

Wanneer `generator_settings` leeg is:

```
minecraft:bedrock,2*minecraft:dirt,minecraft:grass_block;minecraft:plains
```

## Chunk-opslag

#### `type`: Enum

Het chunk-opslagformaat beheert hoe chunk-gegevens op schijf worden opgeslagen.

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
