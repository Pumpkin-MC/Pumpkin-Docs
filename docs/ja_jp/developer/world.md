# World Engine & Formats

The world engine is managed primarily within the [`pumpkin-world`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-world) crate. It handles world storage formats, chunk reading and writing, terrain generation, lighting calculations, and block ticking.

---

## Supported World Formats

Pumpkin is designed to support multiple region and world formats, giving server administrators flexibility between vanilla compatibility and modern high-performance compression.

### 1. Anvil File Format (`.mca`)

The Anvil format is the standard format used by vanilla Minecraft: Java Edition.

- **Structure**: Chunks are grouped into 32×32 chunk regions stored in `.mca` files (`r.{x}.{z}.mca`).
- **Data Layers**: Each chunk contains block state palettes, biome palettes, heightmaps, tile entities, and light arrays.
- **Compression**: Individual chunks within the region file are compressed using ZLib or LZ4.
- **Support**: Pumpkin supports **both loading and saving** Anvil region files.

### 2. Linear Region Format (`.linear`)

Linear is a modern alternative to Anvil that drastically reduces world save sizes and speeds up disk I/O by utilizing **Zstandard (zstd)** compression across the entire region rather than per-chunk zlib blocks.

- **Savings**: Reduces disk usage by ~50% in the Overworld and Nether, and up to ~95% in the End.
- **Performance**: High decompression speeds and reduced disk writes make it ideal for high-throughput production servers.
- **Support**: Native read/write support is built into `pumpkin-world`.

### 3. Slime World Format (`.slime`)

Originally developed by Hypixel, the Slime format packages entire worlds into a single, compact, easily duplicable binary file. It is optimized for minigames and temporary instance-based worlds.

### 4. Pump Format

Pumpkin's native chunk storage format designed specifically for rapid serialization without the legacy overhead of the Anvil format.

---

The world engine organizes chunk management and ticking into hierarchical layers:

### Hierarchy

1. **`World`**: Manages dimensions (`overworld`, `the_nether`, `the_end`), coordinates players within that dimension, and broadcasts updates.
2. **`Level`**: The core data structure holding chunk tables, height bounds (-64 to 320 for vanilla 1.18+ worlds), block registries, and tick schedulers.
3. **`Chunker`**: Manages view distances and player subscriptions. Uses `CylindricalChunkIterator` to compute which chunks to stream to players as they move.

### Asynchronous Chunk Pipeline

To maintain steady 20 TPS tick rates:

- Chunks requested by players are checked in the memory cache.
- Uncached chunks are loaded from disk or generated via **Rayon** background tasks without stalling the main game tick loop.
- Completed chunks are dispatched through asynchronous channels to the player's connection stream.

---

## World Generation Pipeline

When a world does not yet have saved chunks, or when players explore past generated boundaries, Pumpkin generates new chunks through a 6-stage pipeline:

1. **Noise Routers**: Multi-octave 3D Perlin and Simplex noise algorithms compute continentalness, erosion, and peaks/valleys.
2. **Density Shaping**: Transforms continuous 3D noise values into terrain density and solid vs. air voxel thresholds.
3. **Biome Climate Mapping**: Samples temperature, humidity, continentalness, and erosion to assign biome IDs.
4. **Surface Rules**: Evaluates layered rules to place grass, dirt, sand, sandstone, or deepslate depending on exposure and altitude.
5. **Carvers**: Carves 3D cave tunnels, ravines, and aquifers into solid rock.
6. **Features & Decoration**: Places ore veins, vegetation, trees, structures, and surface foliage.

### 1. Noise Routers & Density Functions

Pumpkin implements Minecraft's multi-octave 3D Perlin and Simplex noise algorithms:

- Calculates continentalness, erosion, peaks & valleys, and 3D density.
- Generates natural terrain shapes including overhangs, floating islands, mountains, and deep caves.

### 2. Biome Climate Parameters

Biomes are resolved dynamically based on multi-dimensional climate coordinates:

- Temperature
- Humidity
- Continentalness
- Erosion
- Depth
- Weirdness

The parameters match vanilla Minecraft biome palettes and generate smooth biome transitions.

### 3. Generators

- **Vanilla-like Terrain Generator**: Full 3D noise generation matching modern Minecraft world limits (Y = -64 to Y = 320).
- **Superflat Generator**: Configurable flat layers (e.g., Bedrock at Y=-64, Dirt, Grass Block top layer).

---

## Lighting & Ticking

### 1. Lighting Engine

- **Block Light**: Propagated dynamically from light-emitting blocks (torches, glowstone, lava) up to level 15.
- **Sky Light**: Propagated vertically from the sky down through transparent and semi-transparent blocks (leaves, water).
- Light arrays are computed and serialized into clientbound chunk packets so clients render accurate shadows.

### 2. Block & Chunk Ticking

- **Scheduled Ticks**: Blocks requesting delayed execution (water flow, falling sand, redstone repeaters).
- **Random Ticks**: Random blocks selected per sub-chunk each tick to simulate plant growth, ice melting, and crop maturation.
