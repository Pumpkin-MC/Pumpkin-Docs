# Migratieoverzicht & Architectuur

De overstap van plugin-ontwikkeling voor **Bukkit / Spigot / Paper** naar Pumpkin betekent een verschuiving van een Java-georiënteerd objectgeoriënteerd model naar een gecompileerd, meertalig **WebAssembly (WASM)** componentmodel.

---

De onderstaande tabel vergelijkt het verouderde Bukkit/Paper-paradigma met de moderne WebAssembly-architectuur van Pumpkin:

| Concept | Bukkit / Spigot / Paper | Pumpkin |
| :--- | :--- | :--- |
| **Taalondersteuning** | Java / Kotlin / Scala (JVM) | Rust, Python, Kotlin, C#, Go, C |
| **Binaire uitvoer** | `.jar` Java Archive | `.wasm` WebAssembly-component |
| **Plugin-beschrijving** | `plugin.yml`-bestand | Programmatische `PluginMetadata`-struct |
| **Levenscyclus-hooks** | `onEnable()` / `onDisable()` | `on_load(context)` / `on_unload(context)` |
| **Beveiliging & Isolatie** | Onbeperkte JVM-reflectie | Gesandboxt WASM-capabilitymodel |
| **Gelijktijdigheid (Concurrency)** | Single-threaded tick-lus (`BukkitScheduler`) | Multithreaded native uitvoering met async-runtime |

---

## Gedetailleerde migratieonderwerpen

Bekijk speciale handleidingen over het migreren van elk belangrijk plugin-subsysteem:

- [Commando's migreren](./commands) — Overstappen van `getCommand().setExecutor()` en `plugin.yml` naar Brigadier-commandobomen.
- [Events migreren](./events) — Vervanging van `@EventHandler` en `Listener`-interfaces door Pumpkin's blokkerende vs. niet-blokkerende eventsysteem.
- [Inventarissen & GUI's migreren](./inventories) — Overstappen van `Bukkit.createInventory()` naar Pumpkin-container- en venster-handlers.
- [Configuratie & Gegevens migreren](./configuration) — Vervangt `getConfig()` / `config.yml` door native TOML, JSON of aangepaste opslag.
