# Migrationsübersicht & Architektur

Der Wechsel von der Plugin-Entwicklung für **Bukkit / Spigot / Paper** zu Pumpkin erfordert den Übergang von einem Java-zentrierten, objektorientierten Modell hin zu einem kompilierten, mehrsprachigen **WebAssembly (WASM)**-Komponentenmodell.

---

Die folgende Tabelle stellt das bewährte Bukkit-/Paper-Paradigma Pumpkins moderner WebAssembly-Architektur gegenüber:

| Konzept | Bukkit / Spigot / Paper | Pumpkin |
| :--- | :--- | :--- |
| **Sprachunterstützung** | Java / Kotlin / Scala (JVM) | Rust, Python, Kotlin, C#, Go, C |
| **Binärausgabe** | `.jar` Java-Archiv | `.wasm` WebAssembly-Komponente |
| **Plugin-Deskriptor** | `plugin.yml`-Datei | Programmatische `PluginMetadata`-Struktur |
| **Lebenszyklus-Hooks** | `onEnable()` / `onDisable()` | `on_load(context)` / `on_unload(context)` |
| **Sicherheit & Isolation** | Uneingeschränkte JVM-Reflection | Isoliertes WASM-Fähigkeitenmodell (Capability Model) |
| **Nebenläufigkeit (Concurrency)** | Single-Thread-Tick-Loop (`BukkitScheduler`) | Multithreaded native Ausführung mit Async-Laufzeitumgebung |

---

## Detaillierte Migrationsthemen

Erkunde ausführliche Leitfäden zur Migration der einzelnen zentralen Plugin-Subsysteme:

- [Befehle migrieren](./commands) — Übergang von `getCommand().setExecutor()` und `plugin.yml` zu Brigadier-Befehlsbäumen.
- [Events migrieren](./events) — Ersetzen von `@EventHandler` und `Listener`-Schnittstellen durch Pumpkins blockierendes bzw. nicht-blockierendes Event-System.
- [Inventare & GUIs migrieren](./inventories) — Wechsel von `Bukkit.createInventory()` zu Pumpkins Container- und Fenster-Handlern.
- [Konfiguration & Daten migrieren](./configuration) — Ersetzt `getConfig()` / `config.yml` durch natives TOML, JSON oder benutzerdefinierte Speicherlösungen.
