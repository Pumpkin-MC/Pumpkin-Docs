# Benchmarks

Here, common Minecraft servers are compared against Pumpkin.

> [!CAUTION]
> **This comparison is unfair.** Pumpkin currently has far fewer features than other servers, which might suggest it uses fewer resources.
> It's also important to consider that other servers have had years for optimization.
> Vanilla forks, which don’t need to rewrite the entire vanilla logic, can focus exclusively on optimizations.

![Benchmarking](/assets/benchmarking.png)

## Specifications

### Technical

#### Software

- Distribution: Manjaro Linux
- Architecture: x86_64 (64-bit)
- Kernel Version: 6.11.3-arch1-1

#### Hardware

- Motherboard: MAG B650 TOMAHAWK WIFI
- CPU: AMD Ryzen 7600X 6-Core
- RAM: Corsair 2x16GB DDR5 6000Mhz
- Storage: Samsung 990 PRO 1TB PCIe 4.0 M.2 SSD
- Cooling: be quiet Dark Rock Elite

#### Rust

- Toolchain: stable-x86_64-unknown-linux-gnu (1.81.0)
- Rust Compiler: rustc 1.81.0 (eeb90cda1 2024-09-04)

#### Java

- JDK Version: OpenJDK 23 64-Bit 2024-09-17
- JRE Version: OpenJDK Runtime Environment (build 23+37)
- Vendor: Oracle

### Game

- Minecraft version: 1.21.1
- View distance: 10
- Simulated distance: 10
- Online mode: false <sub><sup>(was disabled for easier testing with non-premium accounts)</sup></sub>
- Rcon: false

> [!NOTE]
> All tests have been ran multiple times to guarantee consistent results.
> All players did not move when spawning, only the initial 8 chunks were loaded.
> All servers used their own terrain generation, no world was pre-loaded.

> [!TIP]
> `CPU Max` is usually higher with one player as the initial chunks are being loaded

## Pumpkin

- **Release:** [8febc50](https://github.com/Snowiiii/Pumpkin/commit/8febc5035d5611558c13505b7724e6ca284e0ada)
- **Compile args:** `--release`
- **Run args:** *none*
- **File Size:** 12.3MB
- **Startup time:** 8ms
- **Shutdown time:** 0ms

| Players | RAM     | CPU Idle | CPU Max |
| ------- | ------- | -------- | ------- |
| 0       | 392.2KB | 0%       | 0%      |
| 1       | 24.9MB  | 0%       | 4%      |
| 2       | 25.1MB  | 0%       | 0.6%    |
| 5       | 26MB    | 0%       | 1%      |
| 10      | 27.1MB  | 0%       | 1.5%    |

<sub><sup>Pumpkin does cache already loaded chunks, resulting in no extra RAM usage besides player data and minimal CPU usage.</sup></sub>

#### Compile time
First time compilation:
- **Debug:** 10.35s
- **Release:** 38.40s

Recompilation:
- **Debug:** 1.82s
- **Release:** 28.68s

## Vanilla

- **Release:** [1.21.1](https://piston-data.mojang.com/v1/objects/59353fb40c36d304f2035d51e7d6e6baa98dc05c/server.jar)
- **Compile args:** *none*
- **Run args:** `nogui`
- **File Size:** 51.6MB
- **Startup time:** 7s
- **Shutdown time:** 4s

| Players | RAM   | CPU idle   | CPU Max |
| ------- | ----- | ---------- | ------- |
| 0       | 860MB | 0.1 - 0.3% | 51%     |
| 1       | 1.5GB | 0.9 - 1.0% | 41%     |
| 2       | 1.6GB | 1 - 1.1%   | 10%     |
| 5       | 1.8GB | 2%         | 20%     |
| 10      | 2.2GB | 4%         | 24%     |

## Paper

- **Release:** [1.21.1-122](https://api.papermc.io/v2/projects/paper/versions/1.21.1/builds/122/downloads/paper-1.21.1-122.jar)
- **Compile args:** *none*
- **Run args:** `nogui`
- **File Size:** 49.4MB
- **Startup time:** 7s
- **Shutdown time:** 3s

| Players | RAM   | CPU idle   | CPU Max |
| ------- | ----- | ---------- | ------- |
| 0       | 1.1GB | 0.2 - 0.3% | 36%     |
| 1       | 1.7GB | 0.9 - 1.0% | 47%     |
| 2       | 1.8GB | 1 - 1.1%   | 10%     |
| 5       | 1.9GB | 1.5%       | 15%     |
| 10      | 2.0GB | 3%         | 20%     |


## Purpur

- **Release:** [1.21.1-2324](https://api.purpurmc.org/v2/purpur/1.21.1/2324/download)
- **Compile args:** *none*
- **Run args:** `nogui`
- **File Size:** 53.1MB
- **Startup time:** 8s
- **Shutdown time:** 4s

| Players | RAM   | CPU idle   | CPU Max |
| ------- | ----- | ---------- | ------- |
| 0       | 1.4GB | 0.2 - 0.3% | 25%     |
| 1       | 1.6GB | 0.7 - 1.0% | 35%     |
| 2       | 1.7GB | 1.1 - 1.3% | 9%      |
| 5       | 1.9GB | 1.6%       | 20%     |
| 10      | 2.2GB | 2 - 2.5%   | 26%     |

## Minestom

- **Release:** [0ca1dda2](https://github.com/Minestom/Minestom/commit/0ca1dda2fe11390a1b89a228bbe7bf78fefc73e1) ([used example code from](https://minestom.net/docs/setup/your-first-server))
- **Compile args:** *none*
- **Run args:** *none*
- **File Size:** 2.8MB
- **Startup time:** 310ms
- **Shutdown time:** 0ms

| Players | RAM   | CPU idle   | CPU Max |
| ------- | ----- | ---------- | ------- |
| 0       | 228MB | 0.1 - 0.3% | 1%      |
| 1       | 365MB | 0.9 - 1.0% | 5%      |
| 2       | 371MB | 1 - 1.1%   | 4%      |
| 5       | 390MB | 1.0%       | 6%      |
| 10      | 421MB | 3%         | 9%      |

Benchmarked at <FmtDateTime :d="new Date('2024-10-15T16:34Z')" />
