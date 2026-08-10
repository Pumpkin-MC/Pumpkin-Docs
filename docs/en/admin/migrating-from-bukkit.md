# Migrating a Server from Bukkit / Spigot / Paper to Pumpkin

Switching your server environment from Paper/Spigot to Pumpkin brings massive performance gains, multithreaded tick execution, and reduced RAM usage. However, because Pumpkin is built in Rust rather than running on the Java Virtual Machine, there are fundamental architectural differences that server administrators need to know.

---

## 1. Major Server Differences At-a-Glance

| Feature / Aspect | Bukkit / Spigot / Paper | Pumpkin |
| :--- | :--- | :--- |
| **Runtime Environment** | Java Virtual Machine (JVM) | Native Binary (Rust) |
| **Main Thread Architecture** | Single-threaded tick loop with asynchronous offloading | Multithreaded tick execution across CPU cores |
| **Plugin Engine** | `.jar` files compiled for Java / Bukkit API | `.wasm` WebAssembly components running in sandboxed WASM runtime |
| **Plugin Languages** | Java / Kotlin / Scala | Rust, Python, Kotlin, C#, Go, C |
| **Configuration Format** | `server.properties` & `paper.yml` / `spigot.yml` | `pumpkin.toml` & structured TOML configuration files |
| **Memory Footprint** | High baseline (JVM garbage collection overhead) | Micro baseline (Native memory management) |

---

## 2. Plugins & Extensions

- **Java `.jar` Plugins Cannot Run Directly**: Standard Bukkit/Spigot `.jar` plugins are bytecode compiled for the Java JVM and Bukkit API. They cannot be dropped into Pumpkin's `plugins/` directory.
- **WebAssembly Plugins**: Pumpkin uses WebAssembly (`.wasm`) for plugins. This sandboxes plugins for memory safety and security while allowing developers to write plugins in virtually any language.
- **Porting Plugins**: If you maintain custom internal plugins, consult our [Developer Migration Guide](../plugin-dev/migrating-from-bukkit/index) to convert Java logic to Pumpkin plugin bindings.

---

## 3. Configuration & Properties

Instead of `server.properties` and YAML files, Pumpkin consolidates server configuration into clean TOML files:

| Paper / Spigot Setting | Pumpkin `pumpkin.toml` Equivalent |
| :--- | :--- |
| `server-port=25565` | `server_address = "0.0.0.0:25565"` |
| `motd=...` | `motd = "A Pumpkin Server"` |
| `max-players=20` | `max_players = 20` |
| `online-mode=true` | `online_mode = true` |
| `view-distance=10` | `view_distance = 10` |
| `simulation-distance=8` | `simulation_distance = 8` |

---

## 4. World & Data Storage

- **Anvil Format Compatibility**: Pumpkin reads standard Minecraft chunk data format.
- **Dimension Directories**: Make sure `world`, `world_nether`, and `world_the_end` directory structures are mapped appropriately when copying existing worlds from Paper/Spigot server installations.

---

## 5. Performance Tuning & Startup

Unlike Paper servers which require complex JVM flags (`-XX:+UseG1GC`, `-Xms`, `-Xmx`), Pumpkin runs as a direct native binary:

```bash
# Starting Pumpkin Server on Linux/macOS
./pumpkin

# Or running via Docker
docker run -p 25565:25565 -v ./data:/data pumpkinmc/pumpkin:latest
```

No garbage collection tuning or JVM heap allocation tuning is needed.

---

## Admin Checklist for Migration

1. [ ] Back up your existing Paper/Spigot server data and world files.
2. [ ] Map `server.properties` values into Pumpkin's `pumpkin.toml`.
3. [ ] Check if replacement WebAssembly plugins (`.wasm`) are available for your essential server utilities.
4. [ ] Configure Proxy support (`Velocity` / `BungeeCord`) if running behind a server network.
5. [ ] Launch `./pumpkin` and verify player connectivity and performance logs.
