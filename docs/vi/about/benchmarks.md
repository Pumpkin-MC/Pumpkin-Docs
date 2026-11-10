Dưới đây là bản dịch hoàn chỉnh sang tiếng Việt cho tài liệu benchmark của Pumpkin-MC:

---

# Các bài kiểm tra hiệu năng (Benchmarks)

Tại đây, các phần mềm máy chủ Minecraft phổ biến (**Paper** và **Folia**) được so sánh với **Pumpkin** trên **Minecraft Java Edition 26.3 (Giao thức 777)**.

> [!CAUTION]
> **Lưu ý về tính hoàn thiện của tính năng:** Mặc dù Pumpkin đã triển khai hệ thống tạo địa hình, chiếu sáng, tải chunk, sinh mob, mục tiêu AI, và vật lý thực thể, nó vẫn chưa hoàn thiện mọi cơ chế của bản vanilla. Các cơ chế còn thiếu có thể làm giảm chi phí tài nguyên nền so với các bản fork vanilla trưởng thành hơn.

::: tip Tổng quan

* **Khởi động lạnh & Tắt máy (Cold-Start & Shutdown):** Pumpkin khởi động và chấp nhận kết nối TCP trong **`9.6 ms – 12.9 ms`** (so với **`3,707 ms – 4,905 ms`** trên Paper và Folia) và tắt máy sạch sẽ trong **`41 ms – 71 ms`** (so với **`1.2 s – 2.8 s`** trên Paper và Folia).
* **Dung lượng bộ nhớ (Memory Footprint):** Pumpkin chạy nhàn rỗi (idle) ở mức **`60.0 MiB` RAM** và phục vụ **400 – 700 người chơi đồng thời trong `1.38 GiB – 1.74 GiB` RAM**, so với **`2.4 GiB – 4.4 GiB` RAM** khi dùng heap JVM động `-Xms512M` hoặc **`10.8 GiB – 11.7 GiB` RAM** với 10 GiB Aikar's Flags trên Paper và Folia.
* **Hiệu suất CPU & Tick:** Với 50 – 300 người chơi trong một vùng chia sẻ (shared region), Pumpkin sử dụng **ít hơn từ 2x – 4x tổng CPU của tiến trình** và duy trì **MSPT thấp hơn từ 2x – 5x** so với Paper và Folia, duy trì được **`250` người chơi trên 2 vCPU** và **`700+` người chơi trên 8 vCPU** ở mức **20.0 TPS**.
* **Dung lượng đa vùng (Multi-Region Capacity):** Trên 8 vùng cách nhau 8.192 block, Pumpkin duy trì **600 người chơi đồng thời ở mức 20.0 TPS (`2.05 GiB` RAM)** so với **100 người chơi trên Paper** trong khi vẫn bảo toàn một tick thế giới toàn cục thống nhất (single global world tick).
:::

## Thông số kỹ thuật (Specifications)

### Kỹ thuật (Technical)

#### Phần mềm (Software)

* Bản phân phối: Manjaro Linux
* Kiến trúc: x86_64 (64-bit)
* Phiên bản Kernel: 7.2.15-1-MANJARO

#### Phần cứng (Hardware)

* Bo mạch chủ (Motherboard): MAG B650 TOMAHAWK WIFI
* CPU: AMD Ryzen 9 9950X 16-Core
* RAM: Corsair 2x16GB DDR5 6000Mhz
* Lưu trữ (Storage): Samsung 990 PRO 1TB PCIe 4.0 M.2 SSD
* Tản nhiệt (Cooling): be quiet Dark Rock Elite

#### Rust

* Toolchain: stable-x86_64-unknown-linux-gnu (1.99.1)
* Trình biên dịch Rust: rustc 1.99.1 (58cf8f9c3 2026-10-13)

#### Java

* Phiên bản JDK: OpenJDK 27.0.1.0.3 64-Bit 2026-10-24
* Phiên bản JRE: OpenJDK Runtime Environment (build 27.0.1.0.3)
* Nhà cung cấp (Vendor): Arch Linux

#### Trò chơi (Game)

* Phiên bản Minecraft: 26.3
* Seed thế giới: `42` (địa hình Overworld thông thường)
* Tầm nhìn (View distance): 8
* Tầm mô phỏng (Simulated distance): 8
* Chế độ trực tuyến (Online mode): false
* RCON: false

Chế độ trực tuyến đã bị vô hiệu hóa để dễ dàng kiểm thử với các tài khoản không phải bản quyền (non-premium).

### Các bản dựng được kiểm thử & Khối lượng công việc hoạt động (Tested Builds & Active Workload)

* **Pumpkin:** `0.2.1+26.3` ([commit `bc494ec66](https://github.com/Pumpkin-MC/Pumpkin/commit/bc494ec664abcf2244bb01897365fef50a05e966)`, biên dịch với `--release`)
* **Paper:** [26.3 build 244](https://papermc.io/downloads/paper)
* **Folia:** [26.3 build 6](https://papermc.io/downloads/folia) (`threaded-regions.threads: 8` trên Tier 3)
* **Các cơ chế hoạt động trong bài kiểm thử:** Địa hình Overworld thông thường (`seed = 42`, đã được làm ấm trước trên đĩa trước khi đo lường để việc tạo chunk ban đầu không làm lệch các phép đo tick ở trạng thái ổn định), sinh mob tự nhiên và mục tiêu AI của mob, va chạm hộp bao quanh thực thể (entity bounding-box collisions), tải chunk (`view-distance = 8`), nén gói tin (`threshold = 256`), và chu kỳ di chuyển của người chơi liên tục ở **20 Hz** (`SetPlayerPositionAndRotation` + `SwingArm`) từ mọi bot kết nối.
* **Cô lập phần cứng (Hardware Isolation):** Máy chủ được kiểm thử được ghim vào các lõi vật lý trên **CCD0** thông qua `taskset -c` (`0,16` cho Tier 1, `0-3,16-19` cho Tier 2, `0-7,16-23` cho Tier 3), trong khi 8 tiến trình worker bot client được ghim chặt vào **CCD1** (`8-15,24-31`).
* **Cấu hình JVM Heap:** Paper và Folia được kiểm thử cả với [Aikar's Flags chính thức của PaperMC](https://docs.papermc.io/paper/aikars-flags/) (`-Xms10G -Xmx10G -XX:+UseG1GC -XX:+AlwaysPreTouch`) và với một heap động (`-Xms512M -Xmx10G` không có `-XX:+AlwaysPreTouch`) để đo lường mức sử dụng bộ nhớ không được ghim.

### Phương pháp tính toán & Tập dữ liệu (Method of Calculation & Dataset)

Mọi giá trị trong các bảng dưới đây được thu thập tự động bởi tập lệnh kiểm thử (benchmark_suite.py, kết quả thô trong results_full_tiers.json và extra_metrics.json) sử dụng các định nghĩa và công thức sau:

* **Thời gian khởi động lạnh (`ms`):**
Thời gian đồng hồ treo tường đơn điệu đã trôi qua (`time.perf_counter()`) từ `subprocess.Popen` cho đến khi **cả hai**: máy chủ in ra dòng sẵn sàng (`"Server is now running"` trên Pumpkin, `"Done ("` trên Paper và Folia) **và** một TCP client hoàn tất bắt tay 3 bước (`connect()`) trên `127.0.0.1:25566`. Được báo cáo là **trung vị của 3 lần chạy lạnh liên tiếp** (`boot_ms = median((t_tcp_ready - t_spawn) * 1000)`).
* **Thời gian tắt máy (`ms`):**
Thời gian đồng hồ treo tường đơn điệu đã trôi qua (`time.perf_counter()`) từ việc ghi `stop\n` vào ống `stdin` của máy chủ cho đến khi `proc.poll() is not None` (tiến trình OS chấm dứt).
* **Thời gian Tick (`MSPT`, `P50`, `P95`, `P99` tính bằng `ms`) & `TPS`:**
Tại mỗi bước bot (`50`, `100`, `150`, ...), sau khi tất cả các bot hoàn tất chuỗi đăng nhập và xuất hiện đầy đủ (`Handshake` -> `LoginStart` -> `ClientInformation` -> `FinishConfiguration` -> `SynchronizePlayerPosition` -> `AcceptTeleportation` -> `PlayerLoaded`), tiến trình kiểm thử sẽ đợi **`8.0 giây` (`160` tick)** để ổn định trạng thái trước khi gửi `tick query` và `tps` qua `stdin`:
* **Pumpkin & Paper:** `MSPT` (`Thời gian trung bình mỗi tick`) và các phân vị `P50` / `P95` / `P99` được đọc trực tiếp từ cửa sổ mẫu cuộn 100 tick tích hợp sẵn của máy chủ (`Sample: 100`). Khi `MSPT <= 50.0 ms`, `TPS = 20.0`; khi `MSPT > 50.0 ms`, `TPS = min(reported_tps, 1000.0 / MSPT)`.
* **Folia:** Do Folia loại bỏ tick thế giới toàn cục và không hỗ trợ `/tick query`, `TPS` (`TPS Vùng trung vị`) và `MSPT` theo từng vùng được đọc từ `Báo cáo sức khỏe máy chủ` (`Server Health Report`) của lệnh `/tps` trên Folia.


* **Mức sử dụng bộ nhớ (`RSS` & `PSS` tính bằng `MiB`):**
Được lấy mẫu từ `/proc/<pid>/status` của Linux kernel (`VmRSS:` tính bằng KiB) và `/proc/<pid>/smaps_rollup` (`Pss:` tính bằng KiB, phân bổ tỷ lệ các trang thư viện chia sẻ) sau cửa sổ ổn định `8.0 s` ở mỗi bước (`RSS_MiB = VmRSS_KiB / 1024.0`, `PSS_MiB = Pss_KiB / 1024.0`).
* **Mức sử dụng CPU của tiến trình (`%` số vCPU được cấp phát):**
Được lấy mẫu từ các trường 14 (`utime`, tick xung nhịp không gian người dùng) và 15 (`stime`, tick xung nhịp không gian kernel) của `/proc/<pid>/stat` tại `SC_CLK_TCK = 100 Hz` trong **cửa sổ trạng thái ổn định `3.0 s**` khi tất cả các bot kết nối đang tích cực di chuyển ở tốc độ 20 Hz, được chuẩn hóa theo số lượng CPU logic (`N_vcpu` trong `{2, 8, 16}`) được ghim thông qua `taskset -c`:
```text
CPU % = (((utime_1 + stime_1) - (utime_0 + stime_0)) / CLK_TCK) / ((t_1 - t_0) * N_vcpu) * 100

```


* **Động học Bot & Tập dữ liệu Vùng (Bot Kinematics & Region Dataset):**
* **Đơn vùng (Tier 1 & Tier 2):** Tất cả bot xuất hiện tại điểm spawn của thế giới trong `seed = 42`.
* **Đa vùng / Phân tán (Tier 3):** Các bot được gán trước thông qua thẻ NBT `Pos` trong file `<uuid>.dat` trên 8 vùng cách nhau `8.192` block (`512` chunk) trên một lưới `4 x 2`: `(0.5, 120.0, 0.5)`, `(8192.5, 120.0, 0.5)`, `(16384.5, 120.0, 0.5)`, `(24576.5, 120.0, 0.5)`, `(0.5, 120.0, 8192.5)`, `(8192.5, 120.0, 8192.5)`, `(16384.5, 120.0, 8192.5)`, và `(24576.5, 120.0, 8192.5)`.
* **Vòng lặp di chuyển 20 Hz:** Cứ sau `50 ms`, mỗi bot `i` tăng góc của mình `angle += 0.06 rad` (bắt đầu từ `angle_0 = (0.37 * i) % (2 * pi)`) theo một đường tròn có bán kính `0.10 block` xung quanh gốc spawn của nó và truyền tải `SetPlayerPositionAndRotation` (`0x1F`) + `SwingArm` (`0x0D`) với `TCP_NODELAY` được bật.



::: details Tệp cấu hình máy chủ & Tập dữ liệu tái tạo (Server Configuration Files & Reproducible Datasets)

* **Tập dữ liệu JSON thô (MSPT đa cấp độ, P50/P95/P99, TPS, RSS/PSS):** /benchmarks/results_full_tiers.json
* **Tập dữ liệu JSON thô (% CPU tiến trình, RSS heap động `-Xms512M`, Thời gian tắt máy, Kích thước tệp nhị phân):** /benchmarks/extra_metrics.json
* **Tập lệnh kiểm thử hiệu năng (Python 3 `asyncio` + `multiprocessing`):** /benchmarks/benchmark_suite.py

**`server.properties` của Paper & Folia:**

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

**`config/paper-global.yml` & `bukkit.yml` của Paper & Folia:**

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

**`pumpkin.toml` của Pumpkin (các trường tương ứng):**

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

## Khởi động, Tắt máy & Tài nguyên cơ bản (Startup, Shutdown & Baseline Footprint)

| Chỉ số (Metric) | Pumpkin 26.3 | Paper 26.3 | Folia 26.3 |
| --- | --- | --- | --- |
| **Kích thước tệp nhị phân / Bundler** | `103.3 MiB` (tệp nhị phân độc lập) | `52.7 MiB` (jar + JVM runtime) | `53.0 MiB` (jar + JVM runtime) |
| **Thời gian khởi động lạnh (2 vCPUs)** | **`12.9 ms`** | `4,650 ms` | `4,905 ms` |
| **Thời gian khởi động lạnh (8 vCPUs)** | **`9.6 ms`** | `3,787 ms` | `3,707 ms` |
| **Thời gian tắt máy (`stop` đến khi thoát)** | **`41 ms – 71 ms`** | `1,169 ms – 1,962 ms` | `1,232 ms – 2,836 ms` |
| **Mức sử dụng CPU nhàn rỗi (Idle CPU)** | **`0.0%`** | `0.3% – 2.0%` | `0.1% – 0.3%` |
| **Bộ nhớ nhàn rỗi (Heap động `-Xms512M`)** | **`60.0 MiB`** | `1,589 – 2,457 MiB` | `1,614 – 1,859 MiB` |
| **Bộ nhớ nhàn rỗi (Aikar's `10G` Pre-Touched)** | **`60.0 MiB`** | `10,825 MiB` | `10,826 MiB` |

---

## Tier 1: Lõi đơn (`1 Lõi vật lý / 2 vCPUs`, Đơn vùng)

Đại diện cho một instance hoặc phân vùng container 2 vCPU nơi người chơi tụ tập trong một vùng chia sẻ. Máy chủ phải duy trì MSPT dưới `50.0 ms` để giữ mức `20.0 TPS`.

### Hiệu suất Tick (`MSPT` & `TPS`)

| Người chơi | Pumpkin 26.3 | Paper 26.3 (Aikar 10G) | Folia 26.3 (Aikar 10G) |
| --- | --- | --- | --- |
| **50** | **`2.31 ms`** (`20.0 TPS`) | `10.18 ms` (`20.0 TPS`) | `10.45 ms` (`20.0 TPS`) |
| **100** | **`3.95 ms`** (`20.0 TPS`) | `19.61 ms` (`20.0 TPS`) | `18.30 ms` (`20.0 TPS`) |
| **150** | **`7.62 ms`** (`20.0 TPS`) | `31.80 ms` (`20.0 TPS`) | `33.32 ms` (`20.0 TPS`) |
| **200** | **`12.71 ms`** (`20.0 TPS`) | `60.60 ms` (`16.5 TPS`) | `55.56 ms` (`18.0 TPS`) |
| **250** | **`8.96 ms`** (`20.0 TPS`) | *Bão hòa (< 15 TPS)* | *Bão hòa (< 16 TPS)* |
| **Tối đa @ 20 TPS** | **`250 người chơi`** | `150 người chơi` | `150 người chơi` |

### Mức sử dụng CPU (`%` của 2 vCPU được cấp phát)

Được đo từ `/proc/<pid>/stat` (`utime + stime`) trên toàn bộ tiến trình máy chủ (luồng tick, mạng và JVM GC):

| Người chơi | Pumpkin 26.3 | Paper 26.3 | Folia 26.3 |
| --- | --- | --- | --- |
| **Nhàn rỗi (0)** | **`0.0%`** | `2.0%` | `0.3%` |
| **50** | **`18.0%`** | `56.8%` | `32.8%` |
| **100** | **`12.3%`** | `43.1%` | `46.5%` |
| **150** | **`20.8%`** | `74.1%` | `78.2%` |
| **200** | **`35.8%`** | `87.2%` (`16.5 TPS`) | `91.4%` (`18.0 TPS`) |

### Mức sử dụng bộ nhớ (`RAM RSS`)

| Người chơi | Pumpkin 26.3 | Paper 26.3 (`-Xms512M`) | Paper 26.3 (Aikar `10G`) | Folia 26.3 (`-Xms512M`) | Folia 26.3 (Aikar `10G`) |
| --- | --- | --- | --- | --- | --- |
| **Nhàn rỗi (0)** | **`60 MiB`** | `1,589 MiB` | `10,829 MiB` | `1,614 MiB` | `10,860 MiB` |
| **50** | **`527 MiB`** | `3,516 MiB` (`15.9 TPS`) | `10,937 MiB` | `3,917 MiB` (`14.7 TPS`) | `11,005 MiB` |
| **100** | **`882 MiB`** | *Bão hòa* | `11,012 MiB` | *Bão hòa* | `11,048 MiB` |
| **150** | **`1,057 MiB`** | *Bão hòa* | `11,095 MiB` | *Bão hòa* | `11,110 MiB` |
| **200** | **`1,118 MiB`** | *Bão hòa* | `11,180 MiB` | *Bão hòa* | `11,165 MiB` |
| **250** | **`1,156 MiB`** | *Bão hòa* | *Bão hòa* | *Bão hòa* | *Bão hòa* |

Trên 2 vCPU không có `-Xms10G -XX:+AlwaysPreTouch`, việc mở rộng heap của G1GC và lỗi trang OS khiến Paper và Folia giảm xuống dưới 16 TPS ở mốc 50 người chơi trong khi vẫn tiêu thụ `3.5 – 3.9 GiB` RSS.

---

## Tier 2: Lõi tứ (`4 Lõi vật lý / 8 vCPUs`, Đơn vùng)

Đại diện cho một máy chủ 4 lõi / 8 luồng host một điểm spawn sinh tồn, khu vực hub, sự kiện boss, hoặc đấu trường PvP nơi người chơi tương tác trong cùng một vùng.

### Hiệu suất Tick (`MSPT` & `TPS`)

| Người chơi | Pumpkin 26.3 (`MSPT`) | Pumpkin 26.3 (`P99`) | Paper 26.3 (`MSPT`) | Folia 26.3 (`MSPT`) |
| --- | --- | --- | --- | --- |
| **Nhàn rỗi (0)** | **`0.04 ms`** (`20.0 TPS`) | **`0.1 ms`** | `0.20 ms` (`20.0 TPS`) | `0.00 ms` (`20.0 TPS`) |
| **50** | **`1.86 ms`** (`20.0 TPS`) | **`3.5 ms`** | `10.70 ms` (`20.0 TPS`) | `4.13 ms` (`20.0 TPS`) |
| **100** | **`3.02 ms`** (`20.0 TPS`) | **`4.5 ms`** | `12.00 ms` (`20.0 TPS`) | `6.74 ms` (`20.0 TPS`) |
| **150** | **`4.82 ms`** (`20.0 TPS`) | **`6.4 ms`** | `17.70 ms` (`20.0 TPS`) | `9.34 ms` (`20.0 TPS`) |
| **200** | **`7.00 ms`** (`20.0 TPS`) | **`9.7 ms`** | `24.60 ms` (`20.0 TPS`) | `16.29 ms` (`20.0 TPS`) |
| **250** | **`9.91 ms`** (`20.0 TPS`) | **`13.6 ms`** | `33.20 ms` (`20.0 TPS`) | `24.51 ms` (`20.0 TPS`) |
| **300** | **`13.17 ms`** (`20.0 TPS`) | **`19.7 ms`** | `41.80 ms` (`20.0 TPS`) | `30.93 ms` (`20.0 TPS`) |
| **400** | **`18.89 ms`** (`20.0 TPS`) | **`49.3 ms`** | *Watchdog Crash (đóng băng 60s)* | `44.48 ms` (`19.2 TPS`) |
| **500 – 700** | **`9.57 – 23.28 ms`** (`20.0 TPS`) | **`71.9 – 91.8 ms`** | *Crash* | *Bão hòa (< 20 TPS)* |
| **Tối đa @ 20 TPS** | **`700+ người chơi`** |  | `300 người chơi` | `300 người chơi` |

### Mức sử dụng CPU (`%` của 8 vCPU được cấp phát)

| Người chơi | Pumpkin 26.3 | Paper 26.3 | Folia 26.3 |
| --- | --- | --- | --- |
| **Nhàn rỗi (0)** | **`0.0%`** | `0.3%` | `0.1%` |
| **50** | **`1.9%`** | `7.8%` | `6.0%` |
| **100** | **`4.1%`** | `9.2%` | `7.4%` |
| **150** | **`6.8%`** | `16.0%` | `12.0%` |
| **200** | **`10.9%`** | `26.9%` | `19.9%` |
| **250** | **`15.8%`** | `38.9%` | `30.6%` |
| **300** | **`24.2%`** | `25.5%` *(luồng chính bão hòa)* | `44.8%` |
| **400** | **`32.6%`** (`20.0 TPS`) | *Crash* | `57.4%` (`19.2 TPS`) |
| **500 – 700** | **`37.3% – 45.1%`** (`20.0 TPS`) | *Crash* | *Bão hòa* |

### Mức sử dụng bộ nhớ (`RAM RSS`)

| Người chơi | Pumpkin 26.3 | Paper 26.3 (`-Xms512M`) | Paper 26.3 (Aikar `10G`) | Folia 26.3 (`-Xms512M`) | Folia 26.3 (Aikar `10G`) |
| --- | --- | --- | --- | --- | --- |
| **Nhàn rỗi (0)** | **`60 MiB`** | `2,457 MiB` | `10,825 MiB` | `1,859 MiB` | `10,826 MiB` |
| **50** | **`584 MiB`** | `4,052 MiB` | `10,936 MiB` | `4,058 MiB` | `10,980 MiB` |
| **100** | **`771 MiB`** | `4,124 MiB` | `10,982 MiB` | `4,115 MiB` | `11,004 MiB` |
| **150** | **`895 MiB`** | `4,166 MiB` | `11,034 MiB` | `4,317 MiB` | `11,041 MiB` |
| **200** | **`1,053 MiB`** | `4,218 MiB` | `11,084 MiB` | `4,372 MiB` | `11,077 MiB` |
| **250** | **`1,087 MiB`** | `4,194 MiB` | `11,131 MiB` | `4,337 MiB` | `11,117 MiB` |
| **300** | **`1,146 MiB`** | `4,026 MiB` | `11,203 MiB` | `4,186 MiB` | `11,162 MiB` |
| **400** | **`1,416 MiB`** | *Crash* | *Crash* | `4,268 MiB` (`19.2 TPS`) | `11,276 MiB` (`19.2 TPS`) |
| **500 – 700** | **`1,575 – 1,782 MiB`** | *Crash* | *Crash* | *Bão hòa* | *Bão hòa* |

::: info Tại sao Pumpkin vượt trội hơn cả Paper và Folia trong các Vùng chia sẻ (Shared Regions)
Khi người chơi tụ tập trong một vùng duy nhất, Folia không thể chia tách họ ra các luồng vùng riêng biệt (`Regions: 1`) và bắt buộc phải tick toàn bộ người chơi trên một luồng đơn. Pumpkin song song hóa việc phát sóng di chuyển của người chơi, mã hóa gói tin, cập nhật trình theo dõi thực thể, tick chunk, và các **Đảo thực thể (Entity Islands)** rời rạc trên các luồng worker của Rayon trong khi sử dụng **ít RAM hơn từ 3.5x – 7x** so với Paper/Folia heap động (`-Xms512M`) và **ít hơn từ 6x – 9x** so với cấu hình 10G của Aikar.
:::

---

## Tier 3: Phân tán đa vùng (`8 Lõi vật lý / 16 vCPUs`, 8 Vùng cách nhau 8.192 Block)

Trong khối lượng công việc này, người chơi được phân bổ đều trên **8 vùng độc lập cách nhau `8.192` block (`512` chunk)** (`~2.312` chunk đang tải hoạt động tổng cộng).

### Hiệu suất Tick (`MSPT` & `TPS`)

| Người chơi (Trải đều trên 8 vùng) | Pumpkin 26.3 (Tick thế giới thống nhất) | Paper 26.3 (Tick thế giới thống nhất) | Folia 26.3 (8 Đồng hồ vùng độc lập) |
| --- | --- | --- | --- |
| **100** | **`9.56 ms`** (`20.0 TPS`) | `30.10 ms` (`20.0 TPS`) | `6.31 ms/vùng` (`19.9 TPS`) |
| **200** | **`11.78 ms`** (`20.0 TPS`) | `51.40 ms` (`19.5 TPS`) | `4.19 ms/vùng` (`20.0 TPS`) |
| **300** | **`16.54 ms`** (`20.0 TPS`) | *Bão hòa (< 20 TPS)* | `4.76 ms/vùng` (`20.0 TPS`) |
| **400** | **`23.97 ms`** (`20.0 TPS`) | *Bão hòa (< 20 TPS)* | `5.38 ms/vùng` (`20.0 TPS`) |
| **500** | **`34.86 ms`** (`20.0 TPS`) | *Bão hòa (< 20 TPS)* | `6.12 ms/vùng` (`20.0 TPS`) |
| **600** | **`42.79 ms`** (`20.0 TPS`) | *Bão hòa (< 20 TPS)* | `7.18 ms/vùng` (`20.0 TPS`) |
| **750 – 1,200** | *Bão hòa ở mốc 750 (`52.6 ms`)* | *Bão hòa (< 20 TPS)* | `8.40 – 12.16 ms/vùng` (`20.0 TPS`) |
| **Tối đa @ 20 TPS** | **`600 người chơi`** (Tick thống nhất) | `100 người chơi` (Tick thống nhất) | `1.200+ người chơi` (Chia tách đồng hồ) |

### Mức sử dụng CPU (`%` của 16 vCPU được cấp phát)

| Người chơi (Trải đều trên 8 vùng) | Pumpkin 26.3 | Paper 26.3 | Folia 26.3 |
| --- | --- | --- | --- |
| **Nhàn rỗi (0)** | **`0.0%`** | `0.1%` | `0.1%` |
| **100** | **`4.2%`** | `7.2%` | `4.8%` |
| **200** | **`6.1%`** | `9.6%` (`19.5 TPS`, giới hạn luồng đơn) | `3.7%` |
| **300** | **`11.0%`** | *Bão hòa* | `5.4%` |
| **400** | **`23.0%`** | *Bão hòa* | `6.8%` |
| **500** | **`39.8%`** | *Bão hòa* | `8.6%` |
| **600** | **`46.0%`** | *Bão hòa* | `11.8%` |
| **750 – 1,200** | *Bão hòa* | *Bão hòa* | `14.8% – 32.2%` |

### Mức sử dụng bộ nhớ (`RAM RSS`)

| Người chơi (Trải đều trên 8 vùng) | Pumpkin 26.3 | Paper 26.3 (`-Xms512M`) | Paper 26.3 (Aikar `10G`) | Folia 26.3 (`-Xms512M`) | Folia 26.3 (Aikar `10G`) |
| --- | --- | --- | --- | --- | --- |
| **100** | **`1,186 MiB`** | `4,442 MiB` | `11,265 MiB` | `4,421 MiB` | `11,276 MiB` |
| **200** | **`1,445 MiB`** | `4,682 MiB` | `11,341 MiB` | `4,609 MiB` | `11,333 MiB` |
| **300** | **`1,750 MiB`** | *Bão hòa* | *Bão hòa* | `4,829 MiB` | `11,365 MiB` |
| **400** | **`1,900 MiB`** | *Bão hòa* | *Bão hòa* | `4,874 MiB` | `11,398 MiB` |
| **500** | **`2,011 MiB`** | *Bão hòa* | *Bão hòa* | `5,129 MiB` | `11,480 MiB` |
| **600** | **`2,097 MiB`** | *Bão hòa* | *Bão hòa* | `5,041 MiB` | `11,554 MiB` |
| **750 – 1,200** | *Bão hòa* | *Bão hòa* | *Bão hòa* | `4,993 – 5,185 MiB` | `11,741 MiB` |

### Tick thế giới thống nhất so với Đồng hồ vùng chia tách (Unified World Tick vs. Split Region Clocks)

* **Pumpkin so với Paper (Tick thế giới thống nhất, dung lượng lớn gấp 6 lần):**
Cả Pumpkin và Paper đều bảo toàn **tick thế giới toàn cục thống nhất** của Minecraft vanilla, nghĩa là hệ thống redstone, lệnh, luật chơi chung và các plugin đều tuân theo một thứ tự tick nhất quán duy nhất trên toàn bộ chiều không gian. Khi 8 vùng ở xa hoạt động đồng thời (`~2,312` chunk), luồng chính đơn lẻ của Paper bão hòa ở mức **100 người chơi (`30.10 ms` MSPT)** và giảm xuống dưới 20 TPS ở mức 200 người chơi. Pumpkin duy trì **600 người chơi ở mức 20.0 TPS (`42.79 ms` MSPT)** trong **`2.05 GiB` RAM** bằng cách song song hóa việc tick chunk, tick chất lỏng/ngẫu nhiên, block entity, cập nhật trình theo dõi thực thể, và các **Đảo thực thể** rời rạc trên Rayon trong mỗi tick thế giới.
* **Tại sao Folia mở rộng quy mô khác biệt trong các thế giới phân tán:**
Folia đạt được `1,200+` người chơi phân tán bằng cách **loại bỏ tick thế giới toàn cục** và chia chiều không gian thành 8 luồng vùng không đồng bộ (`Regions: 8`, báo cáo MSPT theo từng vùng thay vì tổng thời gian CPU của thế giới). Cách tiếp cận này hoạt động tốt đối với các máy chủ sinh tồn trải rộng nơi người chơi cách nhau hàng nghìn block, với hai đánh đổi:
* **Khả năng tương thích Plugin & Vanilla:** Các plugin, lệnh và cơ chế xuyên vùng không thể đọc hoặc đột biến trạng thái thế giới một cách an toàn giữa các vùng trong một tick đơn lẻ.
* **Nút thắt cổ chai ở vùng chia sẻ:** Bất cứ khi nào người chơi tụ tập trong cùng một vùng (Tier 1 và Tier 2 ở trên), Folia quay trở lại một luồng vùng đơn lẻ (`Regions: 1`) nơi Pumpkin xử lý **nhiều hơn gấp 2.3 lần số lượng người chơi (`700+` so với `300`)** trong khi sử dụng **ít RAM hơn từ 3.5x – 8x**.



Được kiểm thử hiệu năng vào ngày 7 tháng 11 năm 2026
