# World

Pumpkin allows you to configure world generation, chunk storage, lighting, and autosave behaviour.

## Lighting Engine

#### `lighting`: Enum

Controls the lighting calculation strategy used during chunk generation.

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

## Autosave

#### `autosave_ticks`: Integer

The interval between automatic world saves, measured in server ticks. Set to `0` to disable autosave.

:::code-group

```toml [pumpkin.toml] {2}
[world]
autosave_ticks = 0
```

:::

## Level Type

#### `level_type`: String

The world generator to use, mirroring the vanilla `level-type` in `server.properties`. The `minecraft:` prefix is optional.

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

Unknown values fall back to normal generation.

## Generator Settings

#### `generator_settings`: String

Generator-specific settings, mirroring the vanilla `generator-settings` in `server.properties`.

:::code-group

```toml [pumpkin.toml] {2}
[world]
generator_settings = ""
```

:::

Currently used only by the superflat generator (`level_type = "flat"`). An empty string selects the **Classic Flat** preset.

## Superflat

Setting `level_type = "flat"` produces a playable superflat world with fixed horizontal layers, a single biome, and no terrain noise or carvers.

### Preset Format

The `generator_settings` string follows vanilla's legacy format:

```
layers;biome
```

#### Layers

A comma-separated list of block layers ordered **bottom-up**. Each entry is:

- `minecraft:block_name` — a single layer
- `count*minecraft:block_name` — multiple stacked layers (e.g. `3*minecraft:stone`)

#### Biome

The portion after the semicolon sets the world biome (e.g. `minecraft:plains`, `minecraft:desert`).

### Classic Flat Preset

When `generator_settings` is empty:

```
minecraft:bedrock,2*minecraft:dirt,minecraft:grass_block;minecraft:plains
```

### Examples

**Desert superflat:**

:::code-group

```toml [pumpkin.toml]
[world]
level_type = "minecraft:flat"
generator_settings = "minecraft:bedrock,3*minecraft:stone;minecraft:desert"
```

:::

## Chunk Storage

#### `type`: Enum

The chunk storage format controls how chunk data is saved to disk.

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
