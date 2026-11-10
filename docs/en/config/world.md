# World

Pumpkin allows fine-tuning world storage formats, autosave intervals, lighting modes, and parallel entity ticking margins under `[world]` in `pumpkin.toml`.

## Configuration

:::code-group

```toml [pumpkin.toml]
[world]
lighting = "default"
autosave_ticks = 6000

[world.chunk]
type = "pump"

[world.entity_islands]
unaudited_reach = 16.0
knockback_reach = 4.0
```

:::

When using the standard Anvil format (`type = "anvil"`), chunk compression can also be configured:

:::code-group

```toml [pumpkin.toml (Anvil)]
[world.chunk]
type = "anvil"

[world.chunk.compression]
algorithm = "LZ4"
level = 6
```

:::

### World Settings

- **`lighting`**: Lighting engine propagation calculation mode.
  - `"default"`: Standard Vanilla Minecraft light propagation.
  - `"full"`: Full skylight everywhere without shadows.
  - `"dark"`: Completely dark lighting everywhere (zero light).
- **`autosave_ticks`**: Number of server ticks between automatic world saves (default: `6000`, equivalent to 5 minutes at 20 TPS). Setting this to `0` disables world autosaving.

### Chunk Storage Settings

- **`type`**: The chunk storage format to use (default: `"pump"`):
  - `"pump"`: Pumpkin's native optimized world format (`.pump`).
  - `"anvil"`: Standard Minecraft Anvil region file format (`.mca`).
  - `"linear"`: Linear region storage format (`.linear`) using fast compression for a smaller disk footprint.
- **`compression.algorithm`**: Compression algorithm used for Anvil chunk data (`"LZ4"`, `"ZLib"`, `"GZip"`, `"Custom"`, default: `"LZ4"`).
- **`compression.level`**: Compression level for Anvil chunk storage (default: `6`).

### Entity Islands Settings

Safety margins for ticking entities in parallel islands under `[world.entity_islands]`. Lower values allow more entities to tick in parallel, whereas higher values preserve strict tick ordering across wider interactions:

- **`unaudited_reach`**: Distance in blocks that an entity whose tick is not audited can reach beyond its follow range (default: `16.0`).
- **`knockback_reach`**: Distance in blocks that a hit from an unaudited entity can throw an audited entity in a single tick. Increase this value for contraptions such as TNT cannons (default: `4.0`).
