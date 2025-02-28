# Benchmarktests

Hier worden veelvoorkomende Minecraft-servers vergeleken met Pumpkin.

> [!CAUTION]
> **Deze vergelijking is oneerlijk.** Pumpkin heeft momenteel veel minder functies dan andere servers, wat zou kunnen suggereren dat het minder middelen gebruikt.
> Het is ook belangrijk om te overwegen dat andere servers jaren hebben gehad voor optimalisatie.
> Vanilla forks, die de volledige vanilla-logica niet hoeven te herschrijven, kunnen zich uitsluitend richten op optimalisaties.

![Screenshot From 2024-10-15 16-42-53](https://github.com/user-attachments/assets/e08fbb00-42fe-4479-a03b-11bb6886c91a)

## Specificaties

#### Technisch

**Software**

- Distributie: Manjaro Linux
- Architectuur: x86_64 (64-bit)
- Kernelversie: 6.11.3-arch1-1

**Hardware**

- Moederbord: MAG B650 TOMAHAWK WIFI
- CPU: AMD Ryzen 7600X 6-Core
- RAM: Corsair 2x16GB DDR5 6000Mhz
- Opslag: Samsung 990 PRO 1TB PCIe 4.0 M.2 SSD
- Koeling: be quiet Dark Rock Elite

**Rust**

- Toolchain: stable-x86_64-unknown-linux-gnu (1.81.0)
- Rust Compiler: rustc 1.81.0 (eeb90cda1 2024-09-04)

**Java**

- JDK Versie: OpenJDK 23 64-Bit 2024-09-17
- JRE Versie: OpenJDK Runtime Environment (build 23+37)
- Leverancier: Oracle

#### Spel

- Minecraft versie: 1.21.1
- Zichtafstand: 10
- Gesimuleerde afstand: 10
- Online modus: false
- Rcon: false

<sub><sup>online modus was uitgeschakeld voor eenvoudiger testen met niet-premium accounts</sup></sub>

> [!NOTE]
> Alle tests zijn meerdere keren uitgevoerd om consistente resultaten te garanderen.
> Alle spelers bewogen niet bij het spawnen, alleen de eerste 8 chunks werden geladen.
> Alle servers gebruikten hun eigen terrein generatie, geen wereld was vooraf geladen.

> [!IMPORTANT]
> `CPU Max` is meestal hoger met één speler omdat de eerste chunks worden geladen.

## Pumpkin

Build: [8febc50](https://github.com/Snowiiii/Pumpkin/commit/8febc5035d5611558c13505b7724e6ca284e0ada)

Compileer args: `--release`

Run args:

**Bestandsgrootte:** <FmtNum :n=12.3 />MB

**Opstarttijd:** <FmtNum :n=8 />ms

**Afsluitingstijd:** <FmtNum :n=0 />ms

| Spelers | RAM                   | CPU Idle         | CPU Max            |
| ------- | --------------------- | ---------------- | ------------------ |
| 0       | <FmtNum :n=392.2 />KB | <FmtNum :n=0 />% | <FmtNum :n=0 />%   |
| 1       | <FmtNum :n=24.9 />MB  | <FmtNum :n=0 />% | <FmtNum :n=4 />%   |
| 2       | <FmtNum :n=25.1 />MB  | <FmtNum :n=0 />% | <FmtNum :n=0.6 />% |
| 5       | <FmtNum :n=26 />MB    | <FmtNum :n=0 />% | <FmtNum :n=1 />%   |
| 10      | <FmtNum :n=27.1 />MB  | <FmtNum :n=0 />% | <FmtNum :n=1.5 />% |

<sub><sup>Pumpkin cachet al geladen chunks, wat resulteert in geen extra RAM-gebruik behalve spelergegevens en minimaal CPU-gebruik.</sup></sub>

#### Compileertijd
Compileren vanaf niets:

**Debug:** <FmtNum :n=10.35 />sec
**Release:** <FmtNum :n=38.40 />sec

Hercompilatie (pumpkin crate):

**Debug:** <FmtNum :n=1.82 />sec
**Release:** <FmtNum :n=28.68 />sec

## Vanilla

Release: [1.21.1](https://piston-data.mojang.com/v1/objects/59353fb40c36d304f2035d51e7d6e6baa98dc05c/server.jar)

Compileer args:

Run args: `nogui`

**Bestandsgrootte:** <FmtNum :n=51.6 />MB

**Opstarttijd:** <FmtNum :n=7 />sec

**Afsluitingstijd:** <FmtNum :n=4 />sec

| Spelers | RAM                   | CPU idle                                 | CPU Max            |
| ------- | --------------------- | ---------------------------------------- | ------------------ |
| 0       | <FmtNum n="860" />MB  | <FmtNum n="0.1" /> - <FmtNum n="0.3" />% | <FmtNum n="51" />% |
| 1       | <FmtNum n="1.5" />GB  | <FmtNum n="0.9" /> - <FmtNum n="1" />%   | <FmtNum n="41" />% |
| 2       | <FmtNum n="1.6" />GB  | <FmtNum n="1" /> - <FmtNum n="1.1" />%   | <FmtNum n="10" />% |
| 5       | <FmtNum n="1.8" />GB  | <FmtNum n="2" />%                        | <FmtNum n="20" />% |
| 10      | <FmtNum n="2.2" />GB  | <FmtNum n="4" />%                        | <FmtNum n="24" />% |

## Paper

Build: [122](https://api.papermc.io/v2/projects/paper/versions/1.21.1/builds/122/downloads/paper-1.21.1-122.jar)

Compileer args:

Run args: `nogui`

**Bestandsgrootte:** <FmtNum :n=49.4 />MB

**Opstarttijd:** <FmtNum :n=7 />sec

**Afsluitingstijd:** <FmtNum :n=3 />sec

| Spelers | RAM                 | CPU idle                               | CPU Max           |
| ------- | ------------------- | -------------------------------------- | ----------------- |
| 0       | <FmtNum :n=1.1 />GB | <FmtNum :n=0.2 /> - <FmtNum :n=0.3 />% | <FmtNum :n=36 />% |
| 1       | <FmtNum :n=1.7 />GB | <FmtNum :n=0.9 /> - <FmtNum :n=1.0 />% | <FmtNum :n=47 />% |
| 2       | <FmtNum :n=1.8 />GB | <FmtNum :n=1 /> - <FmtNum :n=1.1 />%   | <FmtNum :n=10 />% |
| 5       | <FmtNum :n=1.9 />GB | <FmtNum :n=1.5 />%                     | <FmtNum :n=15 />% |
| 10      | <FmtNum :n=2 />GB   | <FmtNum :n=3 />%                       | <FmtNum :n=20 />% |


## Purpur

Build: [2324](https://api.purpurmc.org/v2/purpur/1.21.1/2324/download)

Compileer args:

Run args: `nogui`

**Bestandsgrootte:** <FmtNum :n=53.1 />MB

**Opstarttijd:** <FmtNum :n=8 />sec

**Afsluitingstijd:** <FmtNum :n=4 />sec

| Spelers | RAM                 | CPU idle                               | CPU Max           |
| ------- | ------------------- | -------------------------------------- | ----------------- |
| 0       | <FmtNum :n=1.4 />GB | <FmtNum :n=0.2 /> - <FmtNum :n=0.3 />% | <FmtNum :n=25 />% |
| 1       | <FmtNum :n=1.6 />GB | <FmtNum :n=0.7 /> - <FmtNum :n=1.0 />% | <FmtNum :n=35 />% |
| 2       | <FmtNum :n=1.7 />GB | <FmtNum :n=1.1 /> - <FmtNum :n=1.3 />% | <FmtNum :n=9 />%  |
| 5       | <FmtNum :n=1.9 />GB | <FmtNum :n=1.6 />%                     | <FmtNum :n=20 />% |
| 10      | <FmtNum :n=2.2 />GB | <FmtNum :n=2 /> - <FmtNum :n=2.5 />%   | <FmtNum :n=26 />% |


## Minestom

Commit: [0ca1dda2fe](https://github.com/Minestom/Minestom/commit/0ca1dda2fe11390a1b89a228bbe7bf78fefc73e1)

Compileer args:

Run args:

**Taal:** Benchmarks uitgevoerd met Kotlin 2.0.0 (Minestom zelf is gemaakt met Java)

**Bestandsgrootte:** <FmtNum :n=2.8 />MB (Library)

**Opstarttijd:** <FmtNum :n=310 />ms

**Afsluitingstijd:** <FmtNum :n=0 />ms

<sub>[Gebruikte voorbeeldcode](https://minestom.net/docs/setup/your-first-server)</sub>

| Spelers | RAM                 | CPU idle                               | CPU Max          |
| ------- | ------------------- | -------------------------------------- | ---------------- |
| 0       | <FmtNum :n=228 />MB | <FmtNum :n=0.1 /> - <FmtNum :n=0.3 />% | <FmtNum :n=1 />% |
| 1       | <FmtNum :n=365 />MB | <FmtNum :n=0.9 /> - <FmtNum :n=1.0 />% | <FmtNum :n=5 />% |
| 2       | <FmtNum :n=371 />MB | <FmtNum :n=1 /> - <FmtNum :n=1.1 />%   | <FmtNum :n=4 />% |
| 5       | <FmtNum :n=390 />MB | <FmtNum :n=1.0 />%                     | <FmtNum :n=6 />% |
| 10      | <FmtNum :n=421 />MB | <FmtNum :n=3 />%                       | <FmtNum :n=9 />% |


Benchmark uitgevoerd op <FmtDateTime :d="new Date('2024-10-15T16:34Z')" />
