# Migrating from Bukkit / Spigot / Paper to Pumpkin

This guide covers architectural and configuration differences when transitioning a server from Bukkit, Spigot, or Paper to Pumpkin.

---

## 1. Architectural Differences

| Aspect | Bukkit / Spigot / Paper | Pumpkin |
| :--- | :--- | :--- |
| **Runtime Environment** | Java Virtual Machine (requires Java 17/21+) | Native executable (compiled Rust, no Java required) |
| **Startup Command** | `java [flags] -jar server.jar` | `./pumpkin` |
| **Tick Loop** | Single-threaded tick loop with async worker offloading | Multithreaded tick execution across CPU cores |
| **Plugin Format** | Java bytecode (`.jar`) targeting Bukkit API | WebAssembly (`.wasm`), or `.jar` via PatchBukkit |
| **Plugin Languages** | Java, Kotlin, Scala | Rust, Python, Kotlin, C#, Go, C |
| **Configuration** | `server.properties`, `paper.yml`, `spigot.yml` | `pumpkin.toml` (TOML format) |
| **Memory Management** | JVM Garbage Collection | Native OS memory allocation |

---

## 2. Plugins & Extensions

### WebAssembly Plugins
Pumpkin's primary plugin format is WebAssembly (`.wasm`):
- **Isolation**: Plugins run in a sandboxed WebAssembly runtime.
- **Language Support**: Plugins can be compiled to WASM from Rust, Python, Go, C#, C, or Kotlin.
- **Custom Plugins**: For porting custom Bukkit plugins to Pumpkin, see the [Developer Migration Guide](../plugin-dev/migrating-from-bukkit/index).

### Bukkit Plugin Compatibility: PatchBukkit
For servers relying on existing Bukkit/Spigot `.jar` plugins, the **PatchBukkit** project provides a compatibility layer:
- **Architecture**: PatchBukkit embeds a JVM within Pumpkin and reimplements parts of the Bukkit API, bridging calls to Pumpkin via JNI and FFI.
- **Plugin Location**: Compatible `.jar` plugins are placed in `patchbukkit/patchbukkit-plugins/`.
- **Status & Limitations**: PatchBukkit is in active development. While standard Bukkit API calls are supported, plugins that depend on internal NMS (`net.minecraft.server`) classes, CraftBukkit internals, or bytecode manipulation may not function properly.
- **Java Requirement**: Running PatchBukkit requires a Java runtime (JRE/JDK) installed on the host system to run the embedded JVM.

---

## 3. Configuration & Properties

Pumpkin uses TOML configuration files instead of `server.properties` and YAML:

| Paper / Spigot (`server.properties`) | Pumpkin (`pumpkin.toml`) |
| :--- | :--- |
| `server-port=25565` | `server_address = "0.0.0.0:25565"` |
| `motd=...` | `motd = "A Pumpkin Server"` |
| `max-players=20` | `max_players = 20` |
| `online-mode=true` | `online_mode = true` |
| `view-distance=10` | `view_distance = 10` |
| `simulation-distance=8` | `simulation_distance = 8` |

---

## 4. World & Data Storage

- **Format Compatibility**: Pumpkin reads standard Anvil chunk format (`.mca` files).
- **Directory Layout**: Ensure dimension directories (`world`, `world_nether`, `world_the_end`) match Pumpkin's expected layout when copying world folders from existing Paper/Spigot installations.
- **Latest World & Data Pack Format Required**: At least for now, Pumpkin only supports the latest world format and latest data pack format for its target Minecraft release. Older world formats or legacy data pack versions are not automatically converted at runtime.
  - **Upgrading Worlds in the Client**: If migrating an older world, upgrade it first before loading it in Pumpkin. You can update a world directly in the official Minecraft client: open the client on the matching latest version, navigate to **Singleplayer**, select the world, click **Edit**, and choose **Optimize World**. Alternatively, you can run the world once on a vanilla server matching the latest version.
  - **Data Packs**: Ensure all data packs located in `world/datapacks` are updated to the pack format expected by the target release.

---

## 5. Startup & JVM Flags

### No Java Installation Needed
Pure Pumpkin is a self-contained native executable. You do not need a Java runtime (JRE/JDK) installed on your system or inside your container to run the server.

### Startup Commands
Paper and Spigot servers often use JVM startup scripts with heap allocation and garbage collection flags (such as Aikar's Flags):

:::code-group

```bash [Paper (JVM)]
# Common Paper startup command with Aikar's Flags:
java -Xms10G -Xmx10G \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -XX:G1NewSizePercent=30 \
  -XX:G1MaxNewSizePercent=40 \
  -XX:G1HeapRegionSize=8M \
  -XX:G1ReservePercent=20 \
  -XX:G1HeapWastePercent=5 \
  -XX:G1MixedGCCountTarget=4 \
  -XX:InitiatingHeapOccupancyPercent=15 \
  -XX:G1MixedGCLiveThresholdPercent=90 \
  -XX:G1RSetUpdatingPauseTimePercent=5 \
  -XX:SurvivorRatio=32 \
  -XX:+PerfDisableSharedMem \
  -XX:MaxTenuringThreshold=1 \
  -Dusing.aikars.flags=https://mcflags.emc.gs \
  -Daikars.new.flags=true \
  -jar paper.jar --nogui
```

```bash [Pumpkin (Native)]
# Linux / macOS:
./pumpkin

# Windows:
./pumpkin.exe

# Docker:
docker run -p 25565:25565 -v ./data:/data pumpkinmc/pumpkin:latest
```

:::

### Memory Differences
- **No Garbage Collector**: Pumpkin is written in Rust and uses deterministic compile-time memory management (RAII). There is no runtime garbage collector or GC pause tuning.
- **No Fixed Heap Allocation**: Flags like `-Xms` and `-Xmx` do not exist in native binaries. Memory is allocated from the OS dynamically as chunks and entities load, and returned when they unload.
- **JVM Flags Do Not Apply**: Flags tuning garbage collection strategies, generational sizing, or JVM internals are not needed and cannot be passed to the binary.

---

## Admin Checklist

1. [ ] Back up existing server data and world files, and ensure the world and data packs are updated to the latest format (e.g., via the client's "Optimize World").
2. [ ] Map `server.properties` settings to `pumpkin.toml`.
3. [ ] Identify required plugins and check for WebAssembly (`.wasm`) equivalents or test with [PatchBukkit](#bukkit-plugin-compatibility-patchbukkit).
4. [ ] Configure proxy settings (`Velocity` / `BungeeCord`) in `pumpkin.toml` if using a proxy network.
5. [ ] Update startup scripts to launch `./pumpkin` directly without JVM arguments.
6. [ ] Start the server and check connectivity and logs.
