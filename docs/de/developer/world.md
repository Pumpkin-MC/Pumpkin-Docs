# Weltformate

## Region‑Dateiformat

Von Minecraft Beta 1.3 bis Release 1.2 wurde das sogenannte „Region‑Dateiformat“ verwendet.

Die in diesem Format gespeicherten Dateien sind `.mcr`‑Dateien. Jede Datei speichert eine Gruppe von 32×32 Chunks (eine Region).

Mehr Details findest du im [Minecraft‑Wiki](https://minecraft.wiki/w/Region_file_format).

## Anvil‑Dateiformat

Dieses Format ersetzte nach Release 1.2 das Region‑Format und wird für moderne Vanilla‑Welten (Java Edition) verwendet.

Die Dateien sind `.mca`. Bei gleicher Region‑Logik gab es einige Änderungen. Notabel sind die Erhöhung der Bauhöhe zunächst auf 256, später auf 320 Blöcke, sowie mehr Block‑IDs.

Mehr Details findest du im [Minecraft‑Wiki](https://minecraft.wiki/w/Anvil_file_format).

## Linear‑Dateiformat

Ein moderneres Format ist das „Linear region file format“. Es spart Speicherplatz und nutzt zstd statt zlib. Zlib gilt als sehr alt und überholt.

Die Dateien sind `.linear`. Es spart ca. 50% Speicher im Overworld und Nether und ca. 95% im Ende.

Mehr Details auf GitHub: [LinearRegionFileFormatTools](https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools).

## Slime‑Dateiformat

Von Hypixel entwickelt, um viele Schwächen von Anvil zu beheben. Slime ersetzt ebenfalls zlib und spart gegenüber Anvil Speicher. Die gesamte Welt liegt in einer einzigen Datei, die in mehreren Instanzen geladen werden kann.

Die Dateien sind `.slime`.

Mehr Details auf GitHub: [Slime World Manager](https://github.com/cijaaimee/Slime-World-Manager#:~:text=Slime%20World%20Manager%20is%20a,worlds%20faster%20and%20save%20space.) und im [Dev Blog #5](https://hypixel.net/threads/dev-blog-5-storing-your-skyblock-island.2190753/) von Hypixel.

## Schematic‑Dateiformat

Anders als die übrigen Formate dient das Schematic‑Format nicht zum Speichern kompletter Welten, sondern wird in Dritt‑Tools wie MCEdit, WorldEdit und Schematica genutzt.

Die Dateien sind `.schematic` und basieren auf NBT.

Mehr Details im [Minecraft‑Wiki](https://minecraft.wiki/w/Schematic_file_format)

### Weltgenerierung

Beim Serverstart wird geprüft, ob bereits ein Save ("world") vorhanden ist.

Dann startet Pumpkin die Weltgenerierung:

#### Save vorhanden

`AnvilChunkReader` verarbeitet die Region‑Dateien des Saves.

- Region‑Dateien speichern 32×32 Chunks
  > Jede Region‑Datei ist nach ihren Welt‑Koordinaten benannt

> r.{}.{}.mca

- Die Location‑Tabelle wird gelesen (Chunk‑Koordinaten)
- Die Timestamp‑Tabelle wird gelesen (Zeitpunkt der letzten Änderung)

#### Kein Save vorhanden

Der Welt‑Seed ist vorerst „0“. Später wird er aus der „basic“‑Konfiguration übernommen.

`PlainsGenerator` wird verwendet (bisher ist nur das Biom „Plains“ implementiert).

- `PerlinTerrainGenerator` setzt die Chunk‑Höhe
- Stein liegt 5 Blöcke unter der Chunk‑Höhe
- Erde liegt 2 Blöcke unter der Chunk‑Höhe
- Grasblöcke bilden die Oberfläche der Erde
- Bedrock bei y = -64
- Blumen und Gras werden zufällig verteilt

`SuperflatGenerator` ist vorhanden, aktuell aber nicht aufrufbar.

- Bedrock bei y = -64
- Erde zwei Blöcke darüber
- Gras einen weiteren Block darüber

Blöcke lassen sich platzieren und abbauen, aber Änderungen können derzeit in keinem Weltformat gespeichert werden. Anvil‑Welten sind aktuell read‑only.
