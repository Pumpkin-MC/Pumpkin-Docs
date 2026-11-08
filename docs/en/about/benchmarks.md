# Benchmarks

Here, common Minecraft server software (**Paper** and **Folia**) is compared against **Pumpkin** on **Minecraft Java Edition 26.3 (Protocol 777)**.

> [!CAUTION]
> **Feature completeness note:** While Pumpkin implements terrain generation, lighting, chunk loading, mob spawning, AI goals, and entity physics, it does not yet implement every vanilla mechanic. Missing mechanics can reduce baseline overhead compared to mature vanilla forks.

::: tip Overview
- **Cold-Start & Shutdown:** Pumpkin boots and accepts TCP connections in **`9.6 ms – 12.9 ms`** (vs. **`3,707 ms – 4,905 ms`** on Paper and Folia) and shuts down cleanly in **`41 ms – 71 ms`** (vs. **`1.2 s – 2.8 s`** on Paper and Folia).
- **Memory Footprint:** Pumpkin idles at **`60.0 MiB` RAM** and serves **400 – 700 concurrent players in `1.38 GiB – 1.74 GiB` RAM**, compared to **`2.4 GiB – 4.4 GiB` RAM** with a dynamic `-Xms512M` JVM heap or **`10.8 GiB – 11.7 GiB` RAM** with 10 GiB Aikar's Flags on Paper and Folia.
- **CPU & Tick Efficiency:** At 50 – 300 players in a shared region, Pumpkin uses **2x – 4x less total process CPU** and maintains **2x – 5x lower MSPT** than Paper and Folia, sustaining **`250` players on 2 vCPUs** and **`700+` players on 8 vCPUs** at **20.0 TPS**.
- **Multi-Region Capacity:** Across 8 regions spaced 8,192 blocks apart, Pumpkin sustains **600 concurrent players at 20.0 TPS (`2.05 GiB` RAM)** vs. **100 players on Paper** while preserving a single global world tick.
:::

## Specifications

### Technical

#### Software

- Distribution: Manjaro Linux
- Architecture: x86_64 (64-bit)
- Kernel Version: 7.2.15-1-MANJARO

#### Hardware

- Motherboard: MAG B650 TOMAHAWK WIFI
- CPU: AMD Ryzen 9 9950X 16-Core
- RAM: Corsair 2x16GB DDR5 6000Mhz
- Storage: Samsung 990 PRO 1TB PCIe 4.0 M.2 SSD
- Cooling: be quiet Dark Rock Elite

#### Rust

- Toolchain: stable-x86_64-unknown-linux-gnu (1.99.1)
- Rust Compiler: rustc 1.99.1 (58cf8f9c3 2026-10-13)

#### Java

- JDK Version: OpenJDK 27.0.1.0.3 64-Bit 2026-10-24
- JRE Version: OpenJDK Runtime Environment (build 27.0.1.0.3)
- Vendor: Arch Linux

#### Game

- Minecraft version: 26.3
- World seed: `42` (normal Overworld terrain)
- View distance: 8
- Simulated distance: 8
- Online mode: false
- RCON: false

<sub><sup>Online mode was disabled for easier testing with non-premium accounts.</sup></sub>

### Tested Builds & Active Workload

- **Pumpkin:** `0.2.1+26.3` ([commit `bc494ec66`](https://github.com/Pumpkin-MC/Pumpkin/commit/bc494ec664abcf2244bb01897365fef50a05e966), compiled with `--release`)
- **Paper:** [26.3 build 244](https://papermc.io/downloads/paper)
- **Folia:** [26.3 build 6](https://papermc.io/downloads/folia) (`threaded-regions.threads: 8` on Tier 3)
- **Active Mechanics During Test:** Normal Overworld terrain (`seed = 42`, pre-warmed on disk prior to measurement so initial chunk generation does not skew steady-state tick measurements), natural mob spawning and mob AI goals, entity bounding-box collisions, chunk loading (`view-distance = 8`), packet compression (`threshold = 256`), and continuous **20 Hz** player movement (`SetPlayerPositionAndRotation` + `SwingArm`) from every connected bot.
- **Hardware Isolation:** The server under test is pinned to physical cores on **CCD0** via `taskset -c` (`0,16` for Tier 1, `0-3,16-19` for Tier 2, `0-7,16-23` for Tier 3), while the 8 client bot worker processes are pinned strictly to **CCD1** (`8-15,24-31`).
- **JVM Heap Configurations:** Paper and Folia were tested both with [PaperMC's official Aikar's Flags](https://docs.papermc.io/paper/aikars-flags/) (`-Xms10G -Xmx10G -XX:+UseG1GC -XX:+AlwaysPreTouch`) and with a dynamic heap (`-Xms512M -Xmx10G` without `-XX:+AlwaysPreTouch`) to measure unpinned memory usage.

### Method of Calculation & Dataset

Every value in the tables below is collected automatically by the benchmark harness (<a href="/benchmarks/benchmark_suite.py" target="_blank"><code>benchmark_suite.py</code></a>, raw outputs in <a href="/benchmarks/results_full_tiers.json" target="_blank"><code>results_full_tiers.json</code></a> and <a href="/benchmarks/extra_metrics.json" target="_blank"><code>extra_metrics.json</code></a>) using the following definitions and formulas:

- **Cold-Start Boot Time (`ms`):**
  Monotonic wall-clock elapsed time (`time.perf_counter()`) from `subprocess.Popen` until **both** the server prints its readiness line (`"Server is now running"` on Pumpkin, `"Done ("` on Paper and Folia) **and** a TCP client completes a 3-way handshake (`connect()`) on `127.0.0.1:25566`. Reported as the **median of 3 consecutive cold runs** (`boot_ms = median((t_tcp_ready - t_spawn) * 1000)`).
- **Shutdown Time (`ms`):**
  Monotonic wall-clock elapsed time (`time.perf_counter()`) from writing `stop\n` to the server's `stdin` pipe until `proc.poll() is not None` (OS process termination).
- **Tick Duration (`MSPT`, `P50`, `P95`, `P99` in `ms`) & `TPS`:**
  At each bot step (`50`, `100`, `150`, ...), after all bots complete the full login and spawn sequence (`Handshake` -> `LoginStart` -> `ClientInformation` -> `FinishConfiguration` -> `SynchronizePlayerPosition` -> `AcceptTeleportation` -> `PlayerLoaded`), the harness waits **`8.0 seconds` (`160` ticks)** for steady-state stabilization before sending `tick query` and `tps` over `stdin`:
  - **Pumpkin & Paper:** `MSPT` (`Average time per tick`) and `P50` / `P95` / `P99` percentiles are read directly from the server's built-in 100-tick rolling sample window (`Sample: 100`). When `MSPT <= 50.0 ms`, `TPS = 20.0`; when `MSPT > 50.0 ms`, `TPS = min(reported_tps, 1000.0 / MSPT)`.
  - **Folia:** Because Folia removes the global world tick and does not support `/tick query`, `TPS` (`Median Region TPS`) and per-region `MSPT` are read from Folia's `/tps` `Server Health Report`.
- **Memory Usage (`RSS` & `PSS` in `MiB`):**
  Sampled from the Linux kernel's `/proc/<pid>/status` (`VmRSS:` in KiB) and `/proc/<pid>/smaps_rollup` (`Pss:` in KiB, which apportions shared library pages proportionally) after the `8.0 s` stabilization window at each step (`RSS_MiB = VmRSS_KiB / 1024.0`, `PSS_MiB = Pss_KiB / 1024.0`).
- **Process CPU Usage (`%` of Allocated vCPUs):**
  Sampled from `/proc/<pid>/stat` fields 14 (`utime`, user-space clock ticks) and 15 (`stime`, kernel-space clock ticks) at `SC_CLK_TCK = 100 Hz` over a **`3.0 s` steady-state window** while all connected bots are actively moving at 20 Hz, normalized by the number of logical CPUs (`N_vcpu` in `{2, 8, 16}`) pinned via `taskset -c`:
  ```text
  CPU % = (((utime_1 + stime_1) - (utime_0 + stime_0)) / CLK_TCK) / ((t_1 - t_0) * N_vcpu) * 100
  ```
- **Bot Kinematics & Region Dataset:**
  - **Single-Region (Tier 1 & Tier 2):** All bots spawn at the world spawn in `seed = 42`.
  - **Multi-Region (Tier 3):** Bots are pre-assigned via `<uuid>.dat` `Pos` NBT tags across 8 regions spaced `8,192` blocks (`512` chunks) apart on a `4 x 2` grid: `(0.5, 120.0, 0.5)`, `(8192.5, 120.0, 0.5)`, `(16384.5, 120.0, 0.5)`, `(24576.5, 120.0, 0.5)`, `(0.5, 120.0, 8192.5)`, `(8192.5, 120.0, 8192.5)`, `(16384.5, 120.0, 8192.5)`, and `(24576.5, 120.0, 8192.5)`.
  - **20 Hz Movement Loop:** Every `50 ms`, each bot `i` advances its angle `angle += 0.06 rad` (starting from `angle_0 = (0.37 * i) % (2 * pi)`) along a circle of radius `0.10 blocks` around its spawn origin and transmits `SetPlayerPositionAndRotation` (`0x1F`) + `SwingArm` (`0x0D`) with `TCP_NODELAY` enabled.

::: details Server Configuration Files & Reproducible Datasets
- **Raw JSON Dataset (Multi-Tier MSPT, P50/P95/P99, TPS, RSS/PSS):** <a href="/benchmarks/results_full_tiers.json" target="_blank"><code>/benchmarks/results_full_tiers.json</code></a>
- **Raw JSON Dataset (Process CPU %, Dynamic `-Xms512M` Heap RSS, Shutdown Time, Binary Sizes):** <a href="/benchmarks/extra_metrics.json" target="_blank"><code>/benchmarks/extra_metrics.json</code></a>
- **Benchmark Harness Script (Python 3 `asyncio` + `multiprocessing`):** <a href="/benchmarks/benchmark_suite.py" target="_blank"><code>/benchmarks/benchmark_suite.py</code></a>

**Paper & Folia `server.properties`:**
```ini
level-seed=42
view-distance=8
simulation-distance=8
online-mode=false
max-players=2000
spawn-protection=0
network-compression-threshold=256
enforce-secure-profile=false
pause-when-empty-seconds=-1
server-port=25566
```

**Paper & Folia `config/paper-global.yml` & `bukkit.yml`:**
```yaml
# bukkit.yml
settings:
  connection-throttle: -1

# config/paper-global.yml
packet-limiter:
  all-packets:
    action: DROP
    interval: 7.0
    max-packet-rate: 999999.0
chunk-loading-advanced:
  auto-config-send-distance: true
  player-max-concurrent-chunk-generates: 0
  player-max-concurrent-chunk-loads: 0
```

**Pumpkin `pumpkin.toml` (matching fields):**
```toml
seed = "42"
default_difficulty = "Normal"
default_gamemode = "Survival"
tps = 20.0
spawn_protection = 0

[networking.java]
enabled = true
address = "0.0.0.0:25566"
encryption = false
online_mode = false
max_players = 2000
view_distance = 8
simulation_distance = 8

[networking.java.compression]
enabled = true
threshold = 256
level = 6

[networking.java.packet_limiter]
enabled = false
```
:::

---

## Startup, Shutdown & Baseline Footprint

| Metric | Pumpkin 26.3 | Paper 26.3 | Folia 26.3 |
| :--- | :--- | :--- | :--- |
| **Binary / Bundler Size** | `103.3 MiB` (standalone binary) | `52.7 MiB` (jar + JVM runtime) | `53.0 MiB` (jar + JVM runtime) |
| **Cold-Start Time (2 vCPUs)** | **`12.9 ms`** | `4,650 ms` | `4,905 ms` |
| **Cold-Start Time (8 vCPUs)** | **`9.6 ms`** | `3,787 ms` | `3,707 ms` |
| **Shutdown Time (`stop` to exit)** | **`41 ms – 71 ms`** | `1,169 ms – 1,962 ms` | `1,232 ms – 2,836 ms` |
| **Idle CPU Usage** | **`0.0%`** | `0.3% – 2.0%` | `0.1% – 0.3%` |
| **Idle Memory (`-Xms512M` Dynamic Heap)** | **`60.0 MiB`** | `1,589 – 2,457 MiB` | `1,614 – 1,859 MiB` |
| **Idle Memory (Aikar's `10G` Pre-Touched)** | **`60.0 MiB`** | `10,825 MiB` | `10,826 MiB` |

---

## Tier 1: Single Core (`1 Physical Core / 2 vCPUs`, Single Region)

Represents a 2-vCPU instance or container slice where players congregate in a shared region. A server must stay under `50.0 ms` MSPT to maintain `20.0 TPS`.

### Tick Performance (`MSPT` & `TPS`)

| Players | Pumpkin 26.3 | Paper 26.3 (Aikar 10G) | Folia 26.3 (Aikar 10G) |
| :--- | :--- | :--- | :--- |
| **50** | **`2.31 ms`** (`20.0 TPS`) | `10.18 ms` (`20.0 TPS`) | `10.45 ms` (`20.0 TPS`) |
| **100** | **`3.95 ms`** (`20.0 TPS`) | `19.61 ms` (`20.0 TPS`) | `18.30 ms` (`20.0 TPS`) |
| **150** | **`7.62 ms`** (`20.0 TPS`) | `31.80 ms` (`20.0 TPS`) | `33.32 ms` (`20.0 TPS`) |
| **200** | **`12.71 ms`** (`20.0 TPS`) | `60.60 ms` (`16.5 TPS`) | `55.56 ms` (`18.0 TPS`) |
| **250** | **`8.96 ms`** (`20.0 TPS`) | *Saturated (< 15 TPS)* | *Saturated (< 16 TPS)* |
| **Max @ 20 TPS** | **`250 players`** | `150 players` | `150 players` |

### CPU Usage (`%` of 2 Allocated vCPUs)

Measured from `/proc/<pid>/stat` (`utime + stime`) across the entire server process (tick threads, networking, and JVM GC):

| Players | Pumpkin 26.3 | Paper 26.3 | Folia 26.3 |
| :--- | :--- | :--- | :--- |
| **Idle (0)** | **`0.0%`** | `2.0%` | `0.3%` |
| **50** | **`18.0%`** | `56.8%` | `32.8%` |
| **100** | **`12.3%`** | `43.1%` | `46.5%` |
| **150** | **`20.8%`** | `74.1%` | `78.2%` |
| **200** | **`35.8%`** | `87.2%` (`16.5 TPS`) | `91.4%` (`18.0 TPS`) |

### Memory Usage (`RAM RSS`)

| Players | Pumpkin 26.3 | Paper 26.3 (`-Xms512M`) | Paper 26.3 (Aikar `10G`) | Folia 26.3 (`-Xms512M`) | Folia 26.3 (Aikar `10G`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Idle (0)** | **`60 MiB`** | `1,589 MiB` | `10,829 MiB` | `1,614 MiB` | `10,860 MiB` |
| **50** | **`527 MiB`** | `3,516 MiB` (`15.9 TPS`) | `10,937 MiB` | `3,917 MiB` (`14.7 TPS`) | `11,005 MiB` |
| **100** | **`882 MiB`** | *Saturated* | `11,012 MiB` | *Saturated* | `11,048 MiB` |
| **150** | **`1,057 MiB`** | *Saturated* | `11,095 MiB` | *Saturated* | `11,110 MiB` |
| **200** | **`1,118 MiB`** | *Saturated* | `11,180 MiB` | *Saturated* | `11,165 MiB` |
| **250** | **`1,156 MiB`** | *Saturated* | *Saturated* | *Saturated* | *Saturated* |

<sub><sup>On 2 vCPUs without `-Xms10G -XX:+AlwaysPreTouch`, G1GC heap expansion and OS page faults cause Paper and Folia to drop below 16 TPS at 50 players while still consuming `3.5 – 3.9 GiB` RSS.</sup></sub>

---

## Tier 2: Quad Core (`4 Physical Cores / 8 vCPUs`, Single Region)

Represents a 4-core / 8-thread server hosting a survival spawn, hub, boss event, or PvP arena where players interact within the same region.

### Tick Performance (`MSPT` & `TPS`)

| Players | Pumpkin 26.3 (`MSPT`) | Pumpkin 26.3 (`P99`) | Paper 26.3 (`MSPT`) | Folia 26.3 (`MSPT`) |
| :--- | :--- | :--- | :--- | :--- |
| **Idle (0)** | **`0.04 ms`** (`20.0 TPS`) | **`0.1 ms`** | `0.20 ms` (`20.0 TPS`) | `0.00 ms` (`20.0 TPS`) |
| **50** | **`1.86 ms`** (`20.0 TPS`) | **`3.5 ms`** | `10.70 ms` (`20.0 TPS`) | `4.13 ms` (`20.0 TPS`) |
| **100** | **`3.02 ms`** (`20.0 TPS`) | **`4.5 ms`** | `12.00 ms` (`20.0 TPS`) | `6.74 ms` (`20.0 TPS`) |
| **150** | **`4.82 ms`** (`20.0 TPS`) | **`6.4 ms`** | `17.70 ms` (`20.0 TPS`) | `9.34 ms` (`20.0 TPS`) |
| **200** | **`7.00 ms`** (`20.0 TPS`) | **`9.7 ms`** | `24.60 ms` (`20.0 TPS`) | `16.29 ms` (`20.0 TPS`) |
| **250** | **`9.91 ms`** (`20.0 TPS`) | **`13.6 ms`** | `33.20 ms` (`20.0 TPS`) | `24.51 ms` (`20.0 TPS`) |
| **300** | **`13.17 ms`** (`20.0 TPS`) | **`19.7 ms`** | `41.80 ms` (`20.0 TPS`) | `30.93 ms` (`20.0 TPS`) |
| **400** | **`18.89 ms`** (`20.0 TPS`) | **`49.3 ms`** | *Watchdog Crash (60s freeze)* | `44.48 ms` (`19.2 TPS`) |
| **500 – 700** | **`9.57 – 23.28 ms`** (`20.0 TPS`) | **`71.9 – 91.8 ms`** | *Crashed* | *Saturated (< 20 TPS)* |
| **Max @ 20 TPS** | **`700+ players`** | | `300 players` | `300 players` |

### CPU Usage (`%` of 8 Allocated vCPUs)

| Players | Pumpkin 26.3 | Paper 26.3 | Folia 26.3 |
| :--- | :--- | :--- | :--- |
| **Idle (0)** | **`0.0%`** | `0.3%` | `0.1%` |
| **50** | **`1.9%`** | `7.8%` | `6.0%` |
| **100** | **`4.1%`** | `9.2%` | `7.4%` |
| **150** | **`6.8%`** | `16.0%` | `12.0%` |
| **200** | **`10.9%`** | `26.9%` | `19.9%` |
| **250** | **`15.8%`** | `38.9%` | `30.6%` |
| **300** | **`24.2%`** | `25.5%` *(main thread saturated)* | `44.8%` |
| **400** | **`32.6%`** (`20.0 TPS`) | *Crashed* | `57.4%` (`19.2 TPS`) |
| **500 – 700** | **`37.3% – 45.1%`** (`20.0 TPS`) | *Crashed* | *Saturated* |

### Memory Usage (`RAM RSS`)

| Players | Pumpkin 26.3 | Paper 26.3 (`-Xms512M`) | Paper 26.3 (Aikar `10G`) | Folia 26.3 (`-Xms512M`) | Folia 26.3 (Aikar `10G`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Idle (0)** | **`60 MiB`** | `2,457 MiB` | `10,825 MiB` | `1,859 MiB` | `10,826 MiB` |
| **50** | **`584 MiB`** | `4,052 MiB` | `10,936 MiB` | `4,058 MiB` | `10,980 MiB` |
| **100** | **`771 MiB`** | `4,124 MiB` | `10,982 MiB` | `4,115 MiB` | `11,004 MiB` |
| **150** | **`895 MiB`** | `4,166 MiB` | `11,034 MiB` | `4,317 MiB` | `11,041 MiB` |
| **200** | **`1,053 MiB`** | `4,218 MiB` | `11,084 MiB` | `4,372 MiB` | `11,077 MiB` |
| **250** | **`1,087 MiB`** | `4,194 MiB` | `11,131 MiB` | `4,337 MiB` | `11,117 MiB` |
| **300** | **`1,146 MiB`** | `4,026 MiB` | `11,203 MiB` | `4,186 MiB` | `11,162 MiB` |
| **400** | **`1,416 MiB`** | *Crashed* | *Crashed* | `4,268 MiB` (`19.2 TPS`) | `11,276 MiB` (`19.2 TPS`) |
| **500 – 700** | **`1,575 – 1,782 MiB`** | *Crashed* | *Crashed* | *Saturated* | *Saturated* |

::: info Why Pumpkin Outperforms Both Paper and Folia in Shared Regions
When players congregate in a single region, Folia cannot partition them across separate region threads (`Regions: 1`) and must tick all players on a single thread. Pumpkin parallelizes player movement broadcasting, packet encoding, entity tracker updates, chunk ticks, and disjoint **Entity Islands** across Rayon worker threads while using **3.5x – 7x less RAM** than dynamic-heap Paper/Folia (`-Xms512M`) and **6x – 9x less RAM** than Aikar's 10G configuration.
:::

---

## Tier 3: Multi-Region Dispersion (`8 Physical Cores / 16 vCPUs`, 8 Regions Spaced 8,192 Blocks Apart)

In this workload, players are distributed evenly across **8 independent regions spaced `8,192` blocks (`512` chunks) apart** (`~2,312` active loaded chunks total).

### Tick Performance (`MSPT` & `TPS`)

| Players (Across 8 Regions) | Pumpkin 26.3 (Unified World Tick) | Paper 26.3 (Unified World Tick) | Folia 26.3 (8 Independent Region Clocks) |
| :--- | :--- | :--- | :--- |
| **100** | **`9.56 ms`** (`20.0 TPS`) | `30.10 ms` (`20.0 TPS`) | `6.31 ms/region` (`19.9 TPS`) |
| **200** | **`11.78 ms`** (`20.0 TPS`) | `51.40 ms` (`19.5 TPS`) | `4.19 ms/region` (`20.0 TPS`) |
| **300** | **`16.54 ms`** (`20.0 TPS`) | *Saturated (< 20 TPS)* | `4.76 ms/region` (`20.0 TPS`) |
| **400** | **`23.97 ms`** (`20.0 TPS`) | *Saturated (< 20 TPS)* | `5.38 ms/region` (`20.0 TPS`) |
| **500** | **`34.86 ms`** (`20.0 TPS`) | *Saturated (< 20 TPS)* | `6.12 ms/region` (`20.0 TPS`) |
| **600** | **`42.79 ms`** (`20.0 TPS`) | *Saturated (< 20 TPS)* | `7.18 ms/region` (`20.0 TPS`) |
| **750 – 1,200** | *Saturated at 750 (`52.6 ms`)* | *Saturated (< 20 TPS)* | `8.40 – 12.16 ms/region` (`20.0 TPS`) |
| **Max @ 20 TPS** | **`600 players`** (Unified Tick) | `100 players` (Unified Tick) | `1,200+ players` (Split Clocks) |

### CPU Usage (`%` of 16 Allocated vCPUs)

| Players (Across 8 Regions) | Pumpkin 26.3 | Paper 26.3 | Folia 26.3 |
| :--- | :--- | :--- | :--- |
| **Idle (0)** | **`0.0%`** | `0.1%` | `0.1%` |
| **100** | **`4.2%`** | `7.2%` | `4.8%` |
| **200** | **`6.1%`** | `9.6%` (`19.5 TPS`, single-thread bound) | `3.7%` |
| **300** | **`11.0%`** | *Saturated* | `5.4%` |
| **400** | **`23.0%`** | *Saturated* | `6.8%` |
| **500** | **`39.8%`** | *Saturated* | `8.6%` |
| **600** | **`46.0%`** | *Saturated* | `11.8%` |
| **750 – 1,200** | *Saturated* | *Saturated* | `14.8% – 32.2%` |

### Memory Usage (`RAM RSS`)

| Players (Across 8 Regions) | Pumpkin 26.3 | Paper 26.3 (`-Xms512M`) | Paper 26.3 (Aikar `10G`) | Folia 26.3 (`-Xms512M`) | Folia 26.3 (Aikar `10G`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **100** | **`1,186 MiB`** | `4,442 MiB` | `11,265 MiB` | `4,421 MiB` | `11,276 MiB` |
| **200** | **`1,445 MiB`** | `4,682 MiB` | `11,341 MiB` | `4,609 MiB` | `11,333 MiB` |
| **300** | **`1,750 MiB`** | *Saturated* | *Saturated* | `4,829 MiB` | `11,365 MiB` |
| **400** | **`1,900 MiB`** | *Saturated* | *Saturated* | `4,874 MiB` | `11,398 MiB` |
| **500** | **`2,011 MiB`** | *Saturated* | *Saturated* | `5,129 MiB` | `11,480 MiB` |
| **600** | **`2,097 MiB`** | *Saturated* | *Saturated* | `5,041 MiB` | `11,554 MiB` |
| **750 – 1,200** | *Saturated* | *Saturated* | *Saturated* | `4,993 – 5,185 MiB` | `11,741 MiB` |

### Unified World Tick vs. Split Region Clocks

- **Pumpkin vs. Paper (Unified World Tick, 6x Capacity):**
  Both Pumpkin and Paper preserve vanilla Minecraft's **unified global world tick**, meaning redstone, commands, global game rules, and plugins observe a single consistent tick order across the entire dimension. When 8 distant regions are active simultaneously (`~2,312` chunks), Paper's single main thread saturates at **100 players (`30.10 ms` MSPT)** and drops below 20 TPS at 200 players. Pumpkin sustains **600 players at 20.0 TPS (`42.79 ms` MSPT)** in **`2.05 GiB` RAM** by parallelizing chunk ticks, fluid/random ticks, block entities, entity tracker updates, and disjoint **Entity Islands** on Rayon within each world tick.
- **Why Folia Scales Differently in Dispersed Worlds:**
  Folia achieves `1,200+` dispersed players by **removing the global world tick** and splitting the dimension into 8 unsynchronized region threads (`Regions: 8`, reporting per-region MSPT rather than total world CPU time). This works well for spread-out survival servers where players are thousands of blocks apart, with two trade-offs:
  - **Plugin & Vanilla Compatibility:** Plugins, commands, and cross-region mechanics cannot safely read or mutate world state across regions within a single tick.
  - **Shared-Region Bottleneck:** Whenever players gather in the same region (Tier 1 and Tier 2 above), Folia collapses back to a single region thread (`Regions: 1`) where Pumpkin handles **more than 2.3x as many players (`700+` vs. `300`)** while using **3.5x – 8x less RAM**.

<sub><sup>Benchmarked on November 7, 2026</sup></sub>
