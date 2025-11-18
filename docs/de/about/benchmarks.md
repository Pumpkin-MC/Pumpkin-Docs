# Benchmarks

Hier wird gängige Minecraft‑Serversoftware mit Pumpkin verglichen.

> [!CAUTION]
> **Dieser Vergleich ist nicht fair.** Pumpkin verfügt derzeit über deutlich weniger Features als andere Server, was den Ressourcenverbrauch geringer erscheinen lassen kann.
> Es ist außerdem zu berücksichtigen, dass andere Server jahrelang optimiert wurden.
> Vanilla‑Forks, die die gesamte Vanilla‑Logik nicht neu implementieren müssen, können sich ausschließlich auf Optimierungen konzentrieren.

![Ein Screenshot mit 9 Minecraft‑Spiel‑Fenstern](https://github.com/user-attachments/assets/e08fbb00-42fe-4479-a03b-11bb6886c91a)

## Spezifikationen

### Technik

#### Software

- Distribution: Manjaro Linux
- Architektur: x86_64 (64‑bit)
- Kernel‑Version: 6.11.3-arch1-1

#### Hardware

- Mainboard: MAG B650 TOMAHAWK WIFI
- CPU: AMD Ryzen 7600X 6‑Kern
- RAM: Corsair 2x16GB DDR5 6000Mhz
- Speicher: Samsung 990 PRO 1TB PCIe 4.0 M.2 SSD
- Kühlung: be quiet Dark Rock Elite

#### Rust

- Toolchain: stable-x86_64-unknown-linux-gnu (1.81.0)
- Rust‑Compiler: rustc 1.81.0 (eeb90cda1 2024-09-04)

#### Java

- JDK‑Version: OpenJDK 23 64‑Bit 2024-09-17
- JRE‑Version: OpenJDK Runtime Environment (Build 23+37)
- Anbieter: Oracle

#### Spiel

- Minecraft‑Version: 1.21.1
- Sichtweite: 10
- Simulationsdistanz: 10
- Online‑Modus: false
- RCON: false

<sub><sup>Der Online‑Modus wurde für einfacheres Testen mit Non‑Premium‑Accounts deaktiviert.</sup></sub>

> [!NOTE]
> Alle Tests wurden für genauere Ergebnisse mehrfach ausgeführt.
> Alle Spieler blieben nach dem Spawnen stehen. Nur die initialen 8 Chunks wurden geladen.
> Alle Server nutzten ihre eigene Terrain‑Generierung. Es wurde keine Welt vorab geladen.

> [!IMPORTANT]
> `CPU Max` ist mit einem Spieler meist höher, da die initialen Chunks geladen werden.

## Pumpkin

Build: [8febc50](https://github.com/Snowiiii/Pumpkin/commit/8febc5035d5611558c13505b7724e6ca284e0ada)

Compile‑Args: `--release`

Run‑Args:

**Dateigröße:** <FmtNum :n=12.3 />MB

**Startzeit:** <FmtNum :n=8 />ms

**Stopzeit:** <FmtNum :n=0 />ms

| Spieler | RAM                    | CPU Idle          | CPU Max             |
| ------- | ---------------------- | ----------------- | ------------------- |
| 0       | <FmtNum :n=392.2 />KB  | <FmtNum :n=0 />%  | <FmtNum :n=0 />%    |
| 1       | <FmtNum :n=24.9 />MB   | <FmtNum :n=0 />%  | <FmtNum :n=4 />%    |
| 2       | <FmtNum :n=25.1 />MB   | <FmtNum :n=0 />%  | <FmtNum :n=0.6 />%  |
| 5       | <FmtNum :n=26 />MB     | <FmtNum :n=0 />%  | <FmtNum :n=1 />%    |
| 10      | <FmtNum :n=27.1 />MB   | <FmtNum :n=0 />%  | <FmtNum :n=1.5 />%  |

<sub><sup>Pumpkin cached bereits geladene Chunks, wodurch außer Spielerdaten kein zusätzlicher RAM verbraucht wird und die CPU‑Last minimal bleibt.</sup></sub>

### Compile‑Zeit

Kompilieren von Grund auf:

**Debug:** <FmtNum :n=10.35 />s
**Release:** <FmtNum :n=38.40 />s

Re‑Kompilierung (pumpkin‑Crate):

**Debug:** <FmtNum :n=1.82 />s
**Release:** <FmtNum :n=28.68 />s

## Vanilla

Release: [1.21.1](https://piston-data.mojang.com/v1/objects/59353fb40c36d304f2035d51e7d6e6baa98dc05c/server.jar)

Compile‑Args:

Run‑Args: `nogui`

**Dateigröße:** <FmtNum :n=51.6 />MB

**Startzeit:** <FmtNum :n=7 />s

**Stopzeit:** <FmtNum :n=4 />s

| Spieler | RAM                  | CPU idle                                  | CPU Max             |
| ------- | -------------------- | ----------------------------------------- | ------------------- |
| 0       | <FmtNum n="860" />MB | <FmtNum n="0.1" /> - <FmtNum n="0.3" />% | <FmtNum n="51" />%  |
| 1       | <FmtNum n="1.5" />GB | <FmtNum n="0.9" /> - <FmtNum n="1" />%   | <FmtNum n="41" />%  |
| 2       | <FmtNum n="1.6" />GB | <FmtNum n="1" /> - <FmtNum n="1.1" />%   | <FmtNum n="10" />%  |
| 5       | <FmtNum n="1.8" />GB | <FmtNum n="2" />%                         | <FmtNum n="20" />%  |
| 10      | <FmtNum n="2.2" />GB | <FmtNum n="4" />%                         | <FmtNum n="24" />%  |

## Paper

Build: [122](https://api.papermc.io/v2/projects/paper/versions/1.21.1/builds/122/downloads/paper-1.21.1-122.jar)

Compile‑Args:

Run‑Args: `nogui`

**Dateigröße:** <FmtNum :n=49.4 />MB

**Startzeit:** <FmtNum :n=7 />s

**Stopzeit:** <FmtNum :n=3 />s

| Spieler | RAM                | CPU idle                                | CPU Max            |
| ------- | ------------------ | --------------------------------------- | ------------------ |
| 0       | <FmtNum :n=1.1 />GB | <FmtNum :n=0.2 /> - <FmtNum :n=0.3 />% | <FmtNum :n=36 />%  |
| 1       | <FmtNum :n=1.7 />GB | <FmtNum :n=0.9 /> - <FmtNum :n=1.0 />% | <FmtNum :n=47 />%  |
| 2       | <FmtNum :n=1.8 />GB | <FmtNum :n=1 /> - <FmtNum :n=1.1 />%   | <FmtNum :n=10 />%  |
| 5       | <FmtNum :n=1.9 />GB | <FmtNum :n=1.5 />%                     | <FmtNum :n=15 />%  |
| 10      | <FmtNum :n=2 />GB   | <FmtNum :n=3 />%                       | <FmtNum :n=20 />%  |

## Purpur

Build: [2324](https://api.purpurmc.org/v2/purpur/1.21.1/2324/download)

Compile‑Args:

Run‑Args: `nogui`

**Dateigröße:** <FmtNum :n=53.1 />MB

**Startzeit:** <FmtNum :n=8 />s

**Stopzeit:** <FmtNum :n=4 />s

| Spieler | RAM                | CPU idle                                | CPU Max            |
| ------- | ------------------ | --------------------------------------- | ------------------ |
| 0       | <FmtNum :n=1.4 />GB | <FmtNum :n=0.2 /> - <FmtNum :n=0.3 />% | <FmtNum :n=25 />%  |
| 1       | <FmtNum :n=1.6 />GB | <FmtNum :n=0.7 /> - <FmtNum :n=1.0 />% | <FmtNum :n=35 />%  |
| 2       | <FmtNum :n=1.7 />GB | <FmtNum :n=1.1 /> - <FmtNum :n=1.3 />% | <FmtNum :n=9 />%   |
| 5       | <FmtNum :n=1.9 />GB | <FmtNum :n=1.6 />%                     | <FmtNum :n=20 />%  |
| 10      | <FmtNum :n=2.2 />GB | <FmtNum :n=2 /> - <FmtNum :n=2.5 />%   | <FmtNum :n=26 />%  |

## Minestom

Commit: [0ca1dda2fe](https://github.com/Minestom/Minestom/commit/0ca1dda2fe11390a1b89a228bbe7bf78fefc73e1)

Compile‑Args:

Run‑Args:

**Sprache:** Benchmarks liefen mit Kotlin 2.0.0 (Minestom selbst ist in Java geschrieben)

**Dateigröße:** <FmtNum :n=2.8 />MB (Bibliothek)

**Startzeit:** <FmtNum :n=310 />ms

**Stopzeit:** <FmtNum :n=0 />ms

<sub>[Beispielcode verwendet von](https://minestom.net/docs/setup/your-first-server)</sub>

| Spieler | RAM                | CPU idle                                | CPU Max           |
| ------- | ------------------ | --------------------------------------- | ----------------- |
| 0       | <FmtNum :n=228 />MB | <FmtNum :n=0.1 /> - <FmtNum :n=0.3 />% | <FmtNum :n=1 />%  |
| 1       | <FmtNum :n=365 />MB | <FmtNum :n=0.9 /> - <FmtNum :n=1.0 />% | <FmtNum :n=5 />%  |
| 2       | <FmtNum :n=371 />MB | <FmtNum :n=1 /> - <FmtNum :n=1.1 />%   | <FmtNum :n=4 />%  |
| 5       | <FmtNum :n=390 />MB | <FmtNum :n=1.0 />%                     | <FmtNum :n=6 />%  |
| 10      | <FmtNum :n=421 />MB | <FmtNum :n=3 />%                       | <FmtNum :n=9 />%  |

Benchmarks ausgeführt am <FmtDateTime :d="new Date('2024-10-15T16:34Z')" />
