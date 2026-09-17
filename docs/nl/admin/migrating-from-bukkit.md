# Migreren van Bukkit / Spigot / Paper naar Pumpkin

Deze handleiding beschrijft de architectonische en configuratieverschillen bij het overzetten van een server van Bukkit, Spigot of Paper naar Pumpkin.

---

## 1. Architectonische verschillen

| Aspect | Bukkit / Spigot / Paper | Pumpkin |
| :--- | :--- | :--- |
| **Runtime-omgeving** | Java Virtual Machine (vereist Java 17/21+) | Native executable (gecompileerd in Rust, geen Java vereist) |
| **Opstartopdracht** | `java [flags] -jar server.jar` | `./pumpkin` |
| **Tick-lus** | Single-threaded tick-lus met asynchrone taken | Multithreaded tick-uitvoering over CPU-kernen |
| **Plugin-formaat** | Java-bytecode (`.jar`) gericht op Bukkit API | WebAssembly (`.wasm`), of `.jar` via PatchBukkit |
| **Plugin-talen** | Java, Kotlin, Scala | Rust, Python, Kotlin, C#, Go, C |
| **Configuratie** | `server.properties`, `paper.yml`, `spigot.yml` | `pumpkin.toml` (TOML-formaat) |
| **Geheugenbeheer** | JVM Garbage Collection | Native OS-geheugenallocatie |

---

## 2. Plugins & Extensies

### WebAssembly-plugins
Het primaire plugin-formaat van Pumpkin is WebAssembly (`.wasm`):
- **Isolatie**: Plugins draaien in een gesandboxte WebAssembly-runtime.
- **Taalondersteuning**: Plugins kunnen naar WASM worden gecompileerd vanuit Rust, Python, Go, C#, C of Kotlin.
- **Aangepaste plugins**: Zie voor het overzetten van eigen Bukkit-plugins de [Migratiehandleiding voor ontwikkelaars](../plugin-dev/migrating-from-bukkit/index).

### Bukkit-plugincompatibiliteit: PatchBukkit
Voor servers die afhankelijk zijn van bestaande Bukkit-/Spigot-`.jar`-plugins biedt het **PatchBukkit**-project een compatibiliteitslaag:
- **Architectuur**: PatchBukkit sluit een JVM in binnen Pumpkin en implementeert delen van de Bukkit API opnieuw, waarbij aanroepen via JNI en FFI worden overbrugd naar Pumpkin.
- **Plugin-locatie**: Compatibele `.jar`-plugins worden in `patchbukkit/patchbukkit-plugins/` geplaatst.
- **Status & Beperkingen**: PatchBukkit is actief in ontwikkeling. Standaard Bukkit API-aanroepen worden ondersteund; plugins die sterk afhankelijk zijn van interne NMS-klassen (`net.minecraft.server`), CraftBukkit-reflectie of bytecode-manipulatie werken mogelijk nog niet volledig.
- **Java-vereiste**: Het gebruik van PatchBukkit vereist een geïnstalleerde Java-runtime (JRE/JDK) op het hostsysteem om de ingesloten JVM uit te voeren.

---

## 3. Configuratie & Eigenschappen

Pumpkin gebruikt TOML-configuratiebestanden in plaats van `server.properties` en YAML:

| Paper / Spigot (`server.properties`) | Pumpkin (`pumpkin.toml`) |
| :--- | :--- |
| `server-port=25565` | `server_address = "0.0.0.0:25565"` |
| `motd=...` | `motd = "A Pumpkin Server"` |
| `max-players=20` | `max_players = 20` |
| `online-mode=true` | `online_mode = true` |
| `view-distance=10` | `view_distance = 10` |
| `simulation-distance=8` | `simulation_distance = 8` |

---

## 4. Wereld- & Gegevensopslag

- **Formaatcompatibiliteit**: Pumpkin leest het standaard Anvil-chunkformaat (`.mca`-bestanden).
- **Mapindeling**: Zorg ervoor dat dimensiemappen (`world`, `world_nether`, `world_the_end`) overeenkomen met de verwachte structuur van Pumpkin bij het kopiëren van werelden vanuit bestaande Paper-/Spigot-installaties.
- **Nieuwste wereld- & datapack-formaat vereist**: Vooralsnog ondersteunt Pumpkin alleen het nieuwste wereldformaat en datapack-formaat voor de ondersteunde Minecraft-versie. Oudere wereldformaten of verouderde datapack-versies worden tijdens runtime niet automatisch geconverteerd.
  - **Werelden bijwerken in de client**: Als je een oudere wereld migreert, werk deze dan eerst bij voordat je deze in Pumpkin laadt. Je kunt een bestaande wereld direct in de officiële Minecraft-client upgraden: open de client in de overeenkomende nieuwste versie, ga naar **Singleplayer**, selecteer de wereld, klik op **Edit** en kies **Optimize World**. Als alternatief kun je de wereld eenmalig laden en opslaan op een vanilla-server van de nieuwste versie.
  - **Datapacks**: Zorg ervoor dat alle datapacks in `world/datapacks` zijn bijgewerkt naar het formaat dat door de doelversie wordt verwacht.

---

## 5. Opstarten & JVM-flags

### Geen Java-installatie nodig
Pure Pumpkin is een zelfstandige native executable. Je hebt geen Java-runtime (JRE/JDK) nodig op je systeem of in je container om de server uit te voeren.

### Opstartopdrachten
Paper- en Spigot-servers gebruiken vaak JVM-opstartscripts met heap-allocatie en garbage collection-flags (zoals Aikar's Flags):

:::code-group

```bash [Paper (JVM)]
# Typische Paper-opstartopdracht met Aikar's Flags:
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

### Geheugenverschillen
- **Geen Garbage Collector**: Pumpkin is geschreven in Rust en gebruikt deterministisch geheugenbeheer tijdens het compileren (RAII). Er is geen runtime garbage collector of GC-pauze-afstemming.
- **Geen vaste heap-reservering**: Vlaggen zoals `-Xms` en `-Xmx` bestaan niet bij native binaries. Geheugen wordt dynamisch aangevraagd bij het besturingssysteem wanneer chunks en entiteiten laden, en weer vrijgegeven bij het ontladen.
- **JVM-flags zijn niet van toepassing**: Vlaggen voor het afstemmen van garbage collection, generatiegroottes of JVM-interne instellingen zijn niet nodig en kunnen niet worden doorgegeven.

---

## Beheerderschecklist

1. [ ] Maak een back-up van bestaande servergegevens en wereldbestanden en zorg dat de wereld en datapacks zijn bijgewerkt naar het nieuwste formaat (bijv. via "Optimize World" in de client).
2. [ ] Vertaal `server.properties`-instellingen naar `pumpkin.toml`.
3. [ ] Identificeer vereiste plugins en zoek naar WebAssembly-equivalenten (`.wasm`) of test met [PatchBukkit](#bukkit-plugincompatibiliteit-patchbukkit).
4. [ ] Configureer proxy-instellingen (`Velocity` / `BungeeCord`) in `pumpkin.toml` bij gebruik van een proxynetwerk.
5. [ ] Werk opstartscripts bij om `./pumpkin` direct uit te voeren zonder JVM-argumenten.
6. [ ] Start de server en controleer de connectiviteit en logs.
