# Migration von Bukkit / Spigot / Paper zu Pumpkin

Dieser Leitfaden beschreibt die architektonischen und konfigurationsbezogenen Unterschiede beim Wechsel eines Servers von Bukkit, Spigot oder Paper zu Pumpkin.

---

## 1. Architektonische Unterschiede

| Aspekt | Bukkit / Spigot / Paper | Pumpkin |
| :--- | :--- | :--- |
| **Laufzeitumgebung** | Java Virtual Machine (erfordert Java 17/21+) | Native Binärdatei (kompiliertes Rust, kein Java erforderlich) |
| **Startbefehl** | `java [flags] -jar server.jar` | `./pumpkin` |
| **Tick-Loop** | Single-Thread-Tick-Loop mit asynchroner Aufgabenverteilung | Multithreaded Tick-Ausführung über mehrere CPU-Kerne |
| **Plugin-Format** | Java-Bytecode (`.jar`) für die Bukkit-API | WebAssembly (`.wasm`) oder `.jar` via PatchBukkit |
| **Plugin-Sprachen** | Java, Kotlin, Scala | Rust, Python, Kotlin, C#, Go, C |
| **Konfiguration** | `server.properties`, `paper.yml`, `spigot.yml` | `pumpkin.toml` (TOML-Format) |
| **Speicherverwaltung** | JVM Garbage Collection | Native OS-Speicherallokation |

---

## 2. Plugins & Erweiterungen

### WebAssembly-Plugins
Pumpkins primäres Plugin-Format ist WebAssembly (`.wasm`):
- **Isolation**: Plugins laufen in einer isolierten WebAssembly-Laufzeitumgebung (Sandbox).
- **Sprachunterstützung**: Plugins können aus Rust, Python, Go, C#, C oder Kotlin zu WASM kompiliert werden.
- **Eigene Plugins**: Hinweise zur Portierung eigener Bukkit-Plugins findest du im [Entwickler-Migrationsleitfaden](../plugin-dev/migrating-from-bukkit/index).

### Bukkit-Plugin-Kompatibilität: PatchBukkit
Für Server, die auf bestehende Bukkit-/Spigot-`.jar`-Plugins angewiesen sind, bietet das Projekt **PatchBukkit** eine Kompatibilitätsschicht:
- **Architektur**: PatchBukkit bettet eine JVM in Pumpkin ein, implementiert Teile der Bukkit-API nach und vermittelt Aufrufe über JNI und FFI an Pumpkin.
- **Plugin-Verzeichnis**: Kompatible `.jar`-Plugins werden im Verzeichnis `patchbukkit/patchbukkit-plugins/` abgelegt.
- **Status & Einschränkungen**: PatchBukkit befindet sich in aktiver Entwicklung. Standardaufrufe der Bukkit-API werden unterstützt; Plugins, die stark auf NMS-Interna (`net.minecraft.server`), CraftBukkit-Reflexion oder Bytecode-Manipulation angewiesen sind, funktionieren möglicherweise noch nicht wie erwartet.
- **Java-Voraussetzung**: Die Nutzung von PatchBukkit setzt eine installierte Java-Laufzeitumgebung (JRE/JDK) auf dem Hostsystem voraus, um die eingebettete JVM auszuführen.

---

## 3. Konfiguration & Eigenschaften

Pumpkin verwendet TOML-Konfigurationsdateien anstelle von `server.properties` und YAML:

| Paper / Spigot (`server.properties`) | Pumpkin (`pumpkin.toml`) |
| :--- | :--- |
| `server-port=25565` | `server_address = "0.0.0.0:25565"` |
| `motd=...` | `motd = "A Pumpkin Server"` |
| `max-players=20` | `max_players = 20` |
| `online-mode=true` | `online_mode = true` |
| `view-distance=10` | `view_distance = 10` |
| `simulation-distance=8` | `simulation_distance = 8` |

---

## 4. Welt- & Datenspeicherung

- **Formatkompatibilität**: Pumpkin liest das standardmäßige Anvil-Chunk-Format (`.mca`-Dateien).
- **Verzeichnisstruktur**: Achte beim Kopieren von Welten aus bestehenden Paper-/Spigot-Installationen darauf, dass die Dimensionsverzeichnisse (`world`, `world_nether`, `world_the_end`) der erwarteten Pumpkin-Struktur entsprechen.
- **Aktuellstes Welt- & Datapack-Format erforderlich**: Zumindest derzeit unterstützt Pumpkin nur das jeweils aktuellste Weltformat und Datapack-Format der unterstützten Minecraft-Version. Ältere Weltformate oder veraltete Datapack-Versionen werden zur Laufzeit nicht automatisch konvertiert.
  - **Welten im Client aktualisieren**: Wenn du eine ältere Welt migrierst, aktualisiere sie vor dem Laden in Pumpkin. Du kannst eine bestehende Welt direkt im offiziellen Minecraft-Client upgraden: Öffne den Client in der passenden aktuellen Version, gehe auf **Einzelspieler**, wähle die Welt aus, klicke auf **Bearbeiten** und wähle **Welt optimieren**. Alternativ kannst du die Welt einmalig auf einem Vanilla-Server der aktuellen Version starten und speichern.
  - **Datapacks**: Stelle sicher, dass alle Datapacks unter `world/datapacks` auf das von der Zielversion erwartete Format aktualisiert wurden.

---

## 5. Serverstart & JVM-Flags

### Keine Java-Installation erforderlich
Ein reiner Pumpkin-Server ist eine eigenständige native Binärdatei. Du benötigst keine Java-Laufzeitumgebung (JRE/JDK) auf deinem System oder im Container, um den Server auszuführen.

### Startbefehle
Paper- und Spigot-Server nutzen üblicherweise JVM-Startskripte mit Heap-Allokation und Flags zur Steuerung der Garbage Collection (wie z. B. Aikars Flags):

:::code-group

```bash [Paper (JVM)]
# Typischer Paper-Startbefehl mit Aikars Flags:
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

```bash [Pumpkin (Nativ)]
# Linux / macOS:
./pumpkin

# Windows:
./pumpkin.exe

# Docker:
docker run -p 25565:25565 -v ./data:/data pumpkinmc/pumpkin:latest
```

:::

### Unterschiede im Speichermodell
- **Keine Garbage Collection**: Pumpkin ist in Rust geschrieben und nutzt deterministisches Speichermanagement zur Kompilierzeit (RAII). Es gibt keinen Laufzeit-Garbage-Collector und keine GC-Pausenoptimierung.
- **Keine feste Heap-Reservierung**: Flags wie `-Xms` und `-Xmx` existieren bei nativen Binärdateien nicht. Speicher wird bei Bedarf dynamisch vom Betriebssystem angefordert und beim Entladen von Chunks und Entities wieder freigegeben.
- **JVM-Flags nicht anwendbar**: Flags zur Steuerung der Garbage Collection, Generationsgrößen oder JVM-Interna sind nicht erforderlich und können dem Programm nicht übergeben werden.

---

## Admin-Checkliste

1. [ ] Sichere deine bestehenden Serverdaten und erstelle ein Backup, wobei Welt und Datapacks auf das aktuellste Format aktualisiert sein sollten (z. B. via „Welt optimieren“ im Client).
2. [ ] Übertrage Einstellungen aus `server.properties` in die `pumpkin.toml`.
3. [ ] Identifiziere benötigte Plugins und prüfe WebAssembly-Alternativen (`.wasm`) oder teste mit [PatchBukkit](#bukkit-plugin-kompatibilitat-patchbukkit).
4. [ ] Konfiguriere Proxy-Einstellungen (`Velocity` / `BungeeCord`) in der `pumpkin.toml`, falls ein Netzwerk betrieben wird.
5. [ ] Passe Startskripte an, um `./pumpkin` direkt ohne JVM-Argumente aufzurufen.
6. [ ] Starte den Server und überprüfe die Verbindung sowie die Protokolle.
