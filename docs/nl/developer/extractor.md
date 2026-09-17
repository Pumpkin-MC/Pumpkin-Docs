# Vanilla Data Extractor

The [Pumpkin Extractor](https://github.com/Pumpkin-MC/Extractor) is a dedicated Fabric mod written in Kotlin that introspects a running vanilla Minecraft server or client to dump authoritative game registries and runtime metadata into structured JSON files.

These JSON dumps are consumed by [`pumpkin-codegen`](/developer/codegen) to generate strongly-typed Rust code in `pumpkin-data` and `pumpkin-world`.

---

## Datapacks vs. Extractor: Our Data Philosophy

Before creating a new extractor, it is crucial to understand Pumpkin's data hierarchy:

> [!IMPORTANT]
> **We preferably use vanilla datapacks whenever possible.**
> If vanilla Minecraft already exposes a registry or system through official datapack JSON files, we consume the datapack directly rather than writing custom extractor code.

### When to Use Datapacks vs. When to Use the Extractor

| Source | When to Use | Examples |
| :--- | :--- | :--- |
| **Vanilla Datapacks** *(Preferred)* | Any data officially serialized as JSON by Mojang in `data/minecraft/`. | Recipes, tags (`blocks`, `items`, `fluids`), biomes, dimension types, damage types, trim materials, worldgen noise parameters. |
| **Fabric Extractor** *(Only when necessary)* | Game data **hardcoded in Java bytecode** that cannot be exported from raw datapack files. | Block collision shapes, AABB bounding boxes, block hardness, packet ID-to-state mappings, entity tracked data IDs, fuel burn durations, composter chances, and flower pot conversion tables. |

---

## Extractor Mod Architecture

The Extractor runs on top of the Fabric loader using official Fabric Yarn mappings:

- **Mod Entry Point (`src/main/kotlin/de/snowii/extractor/Extractor.kt`)**: Registers with Fabric's `ServerLifecycleEvents.SERVER_STARTED` event. When the headless server finishes booting, it invokes all registered extractors and dumps files to `run/pumpkin_extractor_output/`.
- **Extractor Interface**: Every data extractor implements the `Extractor.Extractor` interface:
  ```kotlin
  interface Extractor {
      fun fileName(): String

      @Throws(Exception::class)
      fun extract(server: MinecraftServer): JsonElement

      // Returns true if output belongs in tests/ rather than the root output folder
      fun isTest(): Boolean = false
  }
  ```
- **Output Directory**: JSON files are saved to `pumpkin_extractor_output/` encoded in UTF-8 without HTML escaping.

---

## How to Add a New Extractor

Follow this step-by-step workflow when you need to extract new hardcoded vanilla mechanics:

### Step 1: Verify the Data Cannot Be Sourced from Datapacks
Inspect the official Minecraft client/server JAR or Mojang's data reports:
- Check `data/minecraft/` for existing registries, tags, or JSON definitions.
- If the data is present in the datapack, add it directly to `Pumpkin/assets/datapacks/` instead of writing an extractor.

### Step 2: Create the Extractor Class
If the data is hardcoded in Java methods, create a new Kotlin class in:
```text
src/main/kotlin/de/snowii/extractor/extractors/<ExtractorName>.kt
```

Implement the `Extractor.Extractor` interface:

```kotlin
package de.snowii.extractor.extractors

import com.google.gson.JsonElement
import com.google.gson.JsonObject
import com.google.gson.JsonPrimitive
import de.snowii.extractor.Extractor
import net.minecraft.core.registries.BuiltInRegistries
import net.minecraft.server.MinecraftServer
import net.minecraft.world.item.Item
import net.minecraft.world.item.ItemStack

class Fuels : Extractor.Extractor {
    override fun fileName(): String {
        return "fuels.json"
    }

    override fun extract(server: MinecraftServer): JsonElement {
        val fuelsJson = JsonObject()

        // Query vanilla runtime methods
        server.fuelValues().fuelItems().forEach { fuel ->
            val itemId = BuiltInRegistries.ITEM.getKey(fuel).toString()
            val burnDuration = server.fuelValues().burnDuration(ItemStack(fuel))
            fuelsJson.add(itemId, JsonPrimitive(burnDuration))
        }

        return fuelsJson
    }
}
```

### Step 3: Register the Extractor
Open `src/main/kotlin/de/snowii/extractor/Extractor.kt` and add an instance of your class to the `extractors` array:

```kotlin
val extractors = arrayOf(
    // ... existing extractors ...
    Blocks(),
    Items(),
    Entities(),
    Fuels(), // [!code ++]
)
```

### Step 4: Run the Extractor
Execute the headless server task in the Extractor repository:

```bash
./gradlew runServer
```

Once the extraction finishes, locate your new JSON file in:
```text
run/pumpkin_extractor_output/<your_file>.json
```

### Step 5: Integrate with `pumpkin-codegen`
1. Move the generated JSON file into Pumpkin:
   ```bash
   cp run/pumpkin_extractor_output/fuels.json ../Pumpkin/assets/
   ```
2. In the `Pumpkin` repository, open `tools/pumpkin-codegen`:
   - Create a parser for `<your_file>.json`.
   - Write a code generation template to produce the corresponding Rust structs or static lookup tables in `crates/pumpkin-data`.
3. Run code generation:
   ```bash
   cargo run -p pumpkin-codegen
   ```
4. Verify that `pumpkin-data` compiles and passes all unit tests:
   ```bash
   cargo test -p pumpkin-data
   ```

---

## Best Practices for Extractor Contributions

- **Sort Keys Deterministically**: When generating JSON objects or lists, sort entries by numeric registry ID or alphabetically by identifier (`minecraft:stone`, `minecraft:dirt`). This prevents noisy git diffs when re-running extraction across updates.
- **Prefer Standard Types**: Use vanilla identifiers (`net.minecraft.resources.Identifier`) as string keys instead of arbitrary integers where possible.
- **Access Wideners**: If private vanilla fields or methods need to be accessed, declare an access widener in `src/main/resources/extractor.accesswidener` rather than resorting to brittle runtime reflection.
