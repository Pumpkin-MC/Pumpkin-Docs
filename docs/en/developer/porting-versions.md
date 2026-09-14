# Porting to Newer Minecraft Versions

Upgrading Pumpkin to support a newer Minecraft release—whether a minor patch (e.g., `1.21.4` to `1.21.5`) or a major update (e.g., `1.21` to `26.1`/`26.2`)—is a structured, multi-step process.

> [!IMPORTANT]
> **The Extractor mod must be ported first!**
> Pumpkin cannot be ported in isolation. The primary source for Pumpkin's assets (`blocks.json`, `items.json`, `entities.json`, `packets.json`, `tracked_data.json`, `synced_registries.json`, etc.) is our dedicated Fabric mod: [Pumpkin-MC/Extractor](https://github.com/Pumpkin-MC/Extractor). You **must first port and run the Extractor on the target Minecraft version** before running `pumpkin-codegen` or updating server crates.

### Porting Lifecycle at a Glance

| Stage | Responsibility | Primary Crates / Tools |
| :--- | :--- | :--- |
| **1. Port Extractor** | Extract vanilla block states, entities, items, packets, and registries | `Pumpkin-MC/Extractor` (Fabric mod) |
| **2. Update Datapacks** | Ingest new data packs, tags, recipes, and Bedrock mappings | `assets/datapacks/<ver>`, `assets/bedrock` |
| **3. Version Declarations** | Register protocol version and ViaVersion/ViaBackwards remap nodes | `pumpkin-util`, `tools/pumpkin-codegen` |
| **4. Code Generation** | Regenerate zero-cost Rust data tables and registries | `pumpkin-codegen` -> `pumpkin-data` |
| **5. Compiler Fixes** | Update packet layouts, codecs, and data components | `pumpkin-protocol`, `pumpkin-inventory` |
| **6. Gameplay Logic** | Implement new block behaviors, item mechanics, and mob AI | `crates/pumpkin/src/block`, `item`, `entity` |
| **7. Multi-Version QA** | Validate backward compatibility, test suites, and client joins | `cargo test`, `pumpkin-gametest` |

---

## Phase 1: Port the Extractor Mod First (`Pumpkin-MC/Extractor`)

The [Extractor](https://github.com/Pumpkin-MC/Extractor) is a Kotlin-based Fabric mod that boots an actual Minecraft client or server instance to introspect live game registries and extract data into the exact JSON formats Pumpkin expects.

### 1. Clone or Update the Extractor Repository
```bash
git clone https://github.com/Pumpkin-MC/Extractor
cd Extractor
```

### 2. Update `gradle.properties`
Bump the dependency versions to match the target Minecraft version, Yarn mappings, and Fabric ecosystem:

```properties
minecraft_version=26.2
yarn_mappings=26.2+build.1:v2
loader_version=0.16.10
fabric_version=0.115.0+26.2
```

### 3. Resolve Extractor Compilation Errors
Minecraft and Fabric internal APIs often change between releases. Check and fix any broken extractors in `src/main/kotlin/de/snowii/extractor/extractors/`:
- **`Blocks.kt`**: Extracts block states, hardness, resistance, luminance, and collision box offsets.
- **`Items.kt`**: Extracts item IDs, max stack sizes, and default components.
- **`Entities.kt`**: Extracts entity IDs, dimensions (width, height), and eye heights.
- **`Packets.kt`**: Extracts packet IDs for handshake, status, login, configuration, and play states.
- **`SyncedRegistries.kt`**: Extracts dynamic registries synchronized to clients.
- **`TrackedData.kt`**: Extracts entity tracked data indices and serializers.
- **`MultiNoise.kt` & `Biome.kt`**: Extracts world generation biome trees and noise parameters.

### 4. Run the Extractor
Execute the server runner (or client runner for translation/screen dumps):

```bash
./gradlew runServer
```

Once the extraction finishes, all dumped JSON files will be located in `run/pumpkin_extractor_output/`.

### 5. Replace the Old Asset Files in Pumpkin
Copy the newly generated JSON files from `run/pumpkin_extractor_output/` and use them to **replace the old asset files** in Pumpkin:
- Replace the core game assets in `Pumpkin/assets/` (`blocks.json`, `items.json`, `entities.json`, `packets.json`, `properties.json`, `synced_registries.json`, `tracked_data.json`, `en_us.json`, etc.).
- Replace the world generation test files in `Pumpkin/crates/pumpkin-world/assets/`.

---

## Phase 2: Update Assets & Datapacks

Once the raw extractor assets are in place, update the versioned datapacks and supplemental files in Pumpkin:

### 1. Add the Versioned Datapack
Extract the internal vanilla data pack from the new Minecraft server JAR and place it under `assets/datapacks/<version>/`:

```
assets/datapacks/<version>/
└── data/
    ├── minecraft/
    │   ├── advancement/
    │   ├── chat_type/
    │   ├── damage_type/
    │   ├── dimension_type/
    │   ├── enchantment/
    │   ├── item_modifier/
    │   ├── loot_table/
    │   ├── recipe/
    │   ├── tags/
    │   └── worldgen/
    └── c/
        └── tags/ (Conventional / Common Tags)
```

### 2. Update Versioned Assets
Update or generate the corresponding versioned metadata files:
- `assets/registry/<version>_synced_registries.json`: Dynamic registries streamed to the client during the `Configuration` network state.
- `assets/tags/<version>_tags.json`: Tag collections.
- `assets/tracked_data/<version>_tracked_data.json`: Entity metadata indices.

### 3. Update Bedrock Mappings
If porting Bedrock Edition support simultaneously, update the files in `assets/bedrock/` using the latest mappings from [GeyserMC](https://github.com/GeyserMC/Geyser) and Bedrock Dedicated Server (BDS).

### 4. Decompile Sources for Reverse Engineering (Optional but Recommended)
For complex changes—such as worldgen noise router formulas and custom block collision shapes—decompile the matching vanilla JAR into `minecraft-sources-<version>/` (using Vineflower or Fabric Loom with official Mojang mappings) for reference.

---

## Phase 3: Register Version Constants & ViaVersion Mappings

Pumpkin supports multi-version clients through automated protocol remapping powered by **ViaBackwards** / **ViaRewind** mapping tables.

### 1. Declare Version in `pumpkin-util`
Open `crates/pumpkin-util/src/version.rs` and add the new version to [`JavaMinecraftVersion`](file:///home/alex/Documents/Development/Rust/Pumpkin/crates/pumpkin-util/src/version.rs):

```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum JavaMinecraftVersion {
    // ... existing versions ...
    V_1_21_4,
    V_1_21_11,
    V_26_2, // New target version
}

impl JavaMinecraftVersion {
    pub const fn protocol_version(&self) -> i32 {
        match self {
            // ...
            Self::V_26_2 => 770, // Protocol version number
        }
    }

    pub const fn version_name(&self) -> &'static str {
        match self {
            // ...
            Self::V_26_2 => "26.2",
        }
    }
}
```

### 2. Declare Version in `pumpkin-codegen`
Open `tools/pumpkin-codegen/src/version.rs` and add the identical enum variant to the codegen AST.

### 3. Add ViaVersion / ViaBackwards Mappings
To enable clients on older versions to connect to the updated server (e.g., a `1.21.4` client connecting to a `26.2` server):
1. Obtain the NBT mapping file from the [ViaBackwards repository](https://github.com/ViaVersion/ViaBackwards):
   `mappings-<new_version>to<previous_version>.nbt`
2. Save it to:
   `assets/viabackwards/data/mappings-<new_version>to<previous_version>.nbt`
3. In `tools/pumpkin-codegen/src/remap/mod.rs`, link the new node into the `remap_nodes!` macro:

```rust
let node_26_2 = $crate::remap::MappingNode {
    version: $crate::version::JavaMinecraftVersion::V_26_2,
    value: "../../assets/viabackwards/data/mappings-26.2to26.1.nbt",
    child: Some(&node_26_1),
};
$remapper.process(&node_26_2)
```

4. Check `tools/pumpkin-codegen/src/remap/` to ensure specific remap builders (`block_state.rs`, `item_id.rs`, `entity_id.rs`, `sound_id.rs`, `argument_type.rs`) correctly process any new remapping structures introduced by ViaVersion.

---

## Phase 4: Run Code Generation (`pumpkin-codegen`)

With all extractor assets, datapacks, and mapping nodes in place, execute the codegen tool from the workspace root:

```bash
cargo run -p pumpkin-codegen
```

### What Gets Regenerated?
`pumpkin-codegen` generates zero-cost Rust data tables into `crates/pumpkin-data/src/generated/`:
- **`block.rs`**: All block IDs, properties, state masks, and collision shapes.
- **`item.rs`**: Items, default components, and tool tiers.
- **`entity_type.rs` & `tracked_data.rs`**: Entity type IDs, default bounding boxes, and metadata serializers.
- **`packet.rs`**: Serverbound and clientbound packet ID constants across protocol states.
- **`recipes.rs`**: All crafting, cooking, and stonecutting recipes parsed from the new datapack.
- **`tag.rs`**: Tag lookups (`#minecraft:mineable/axe`, `#c:iron_ingots`).
- **`remap/*.rs`**: State remap lookup tables (`block_state_remap.rs`, `item_id_remap.rs`, `entity_id_remap.rs`, `sound_id_remap.rs`).

---

## Phase 5: Resolve Workspace Compilation Errors

After regenerating `pumpkin-data`, the Rust compiler will flag breaking changes across the workspace. Run:

```bash
cargo check --workspace
```

### Common Compiler Breakages & Fixes:

#### 1. Packet ID & Layout Changes (`pumpkin-protocol`)
Mojang frequently adds, moves, or alters packet IDs and payloads:
- Update `pumpkin-protocol/src/java/client/` and `pumpkin-protocol/src/java/server/`.
- Inspect packets like `LoginSuccess`, `PlayLogin`, `Respawn`, and `PlayerSpawnData` for newly added fields (e.g., new game mode flags, dimension attributes, or teleportation IDs).
- For Bedrock Edition, check `StartGame`, `NetworkItem`, and container transaction packets in `pumpkin-protocol/src/bedrock/`.

#### 2. Data Component Changes
If items switched from older NBT structures to new Data Components (or if components were renamed/restructured):
- Update `crates/pumpkin-data/src/data_component.rs`.
- Update serialization and deserialization in `pumpkin-inventory`.

#### 3. Registry Synchronization
During the `Configuration` phase, servers send dynamic registry contents to Java clients. If new registries were added to vanilla Minecraft (e.g., trim materials, banner patterns, instrument sounds):
- Verify `crates/pumpkin-data/src/generated/registry.rs`.
- Ensure `pumpkin/src/net/java/config.rs` streams all required registry codecs to the client.

---

## Phase 6: Implement Logic for New Blocks, Items & Entities

Once the server compiles, any newly introduced gameplay content must be implemented.

### 1. New Blocks
1. Locate new block identifiers in `pumpkin-data::Block`.
2. Create a behavior module under `crates/pumpkin/src/block/blocks/<block_name>.rs` implementing [`BlockBehaviour`](/developer/blocks/adding-blocks):
   ```rust
   pub struct NewBlockBehaviour;

   impl BlockBehaviour for NewBlockBehaviour {
       fn on_use(&self, block: &Block, player: &Arc<Player>, location: BlockPos, world: &Arc<World>) {
           // Interaction logic
       }
   }
   ```
3. Register the behavior in the block registry in `crates/pumpkin/src/block/mod.rs`.

### 2. New Items
1. Locate new item identifiers in `pumpkin-data::Item`.
2. If the item has unique right-click or use behavior (e.g., weapons, projectiles, instruments), create an item behavior in `crates/pumpkin/src/item/items/<item_name>.rs` implementing [`ItemBehaviour`](/developer/items/adding-items).
3. If the item places entities (e.g., spawn eggs, boats, minecarts), configure entity spawning logic in `pumpkin/src/item/items/spawn_egg.rs`.
4. Register the behavior in `crates/pumpkin/src/item/mod.rs`.

### 3. New Entities
1. Check `pumpkin-data::entity_type::EntityType` for new entity IDs.
2. Create an entity struct in `crates/pumpkin/src/entity/mob/` or `living/` extending [`LivingEntity`](/developer/entities/).
3. Implement `TrackedData` fields to match vanilla client expectations (e.g., poses, animations, glowing states).
4. Assign AI goals and navigation tasks using the [Mob AI & Goals system](/developer/entities/ai-and-mobs).
5. Add spawn packet construction in `crates/pumpkin/src/entity/spawning.rs`.

---

## Phase 7: Multi-Version & ViaVersion Verification

Ensure that older clients can still connect seamlessly:

1. **Verify Generated Remap Tables**:
   Check `crates/pumpkin-data/src/generated/block_state_remap.rs` and `item_id_remap.rs`. Ensure that novel block states fall back gracefully to compatible equivalents on older client versions (e.g., new wood variants mapping to oak or spruce).
2. **Packet Translation**:
   Verify that packet writers in `pumpkin-protocol` apply `remap` functions when serializing data for a connection whose negotiated `protocol_version` is older than the server's native version.

---

## Phase 8: Testing & Verification Checklist

Before opening a Pull Request for a version port, complete the following QA checklist:

- [ ] **Automated Tests**:
  ```bash
  cargo test --workspace
  ```
- [ ] **Game Test Suite**:
  ```bash
  cargo test -p pumpkin-gametest
  ```
- [ ] **Strict Linter Rules**:
  ```bash
  cargo clippy --workspace --all-targets -- -D warnings
  ```
- [ ] **Spellcheck**:
  ```bash
  typos
  ```
- [ ] **In-Game Java Client Test**:
  - Connect with the native new Minecraft client version.
  - Test login, world loading, chunk generation, and player movement.
  - Place and break new blocks; verify collision boxes and redstone reactivity.
  - Use and equip new items; test attack speed, durability, and animations.
  - Spawn and fight new entities; test animations, hurt sounds, and drops.
- [ ] **In-Game Older Version Client Test**:
  - Connect with an older supported client version (e.g., 1.21.x).
  - Verify that blocks, items, and entities translate without causing client crashes or desyncs.
- [ ] **In-Game Bedrock Client Test**:
  - Verify that Bedrock clients can authenticate, join, load world chunks, and view custom items.
