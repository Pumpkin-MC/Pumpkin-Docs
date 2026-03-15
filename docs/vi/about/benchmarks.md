# Benchmark

Tại đây, các Minecraft server software thông dụng sẽ được so sánh với Pumpkin.

> [!CAUTION] CHÚ Ý
> **So sánh này không công bằng.** Pumpkin hiện tại có ít tính năng hơn nhiều so với các server khác, điều này có thể cho thấy nó sử dụng ít tài nguyên hơn.
> Điều quan trọng cần lưu ý là các server khác đã có nhiều năm để tối ưu hóa.
> Các bản fork của Vanilla, không cần phải viết lại toàn bộ logic của Vanilla, có thể tập trung hoàn toàn vào tối ưu hóa.

![Một screenshot hiển thị 9 cửa sổ game Minecraft](https://github.com/user-attachments/assets/e08fbb00-42fe-4479-a03b-11bb6886c91a)

## Thông số kĩ thuật

### Kĩ thuật

#### Phần mềm

- Distribution: Manjaro Linux
- Architecture: x86_64 (64-bit)
- Kernel Version: 6.11.3-arch1-1

#### Phần cứng

- Motherboard: MAG B650 TOMAHAWK WIFI
- CPU: AMD Ryzen 7600X 6-Core
- RAM: Corsair 2x16GB DDR5 6000Mhz
- Storage: Samsung 990 PRO 1TB PCIe 4.0 M.2 SSD
- Cooling: BeQuiet ! Dark Rock Elite

#### Rust

- Toolchain: stable-x86_64-unknown-linux-gnu (1.81.0)
- Rust Compiler: rustc 1.81.0 (eeb90cda1 2024-09-04)

#### Java

- Phiên bản JDK: OpenJDK 23 64-Bit 2024-09-17
- Phiên bản JRE: OpenJDK Runtime Environment (build 23+37)
- Nhà cung cấp: Oracle

#### Game

- Phiên bản Minecraft: 1.21.1
- View distance: 10
- Simulated distance: 10
- Online mode: false
- RCON: false

<sub><sup>Online mode đã được tắt để test với acc crack dễ dàng hơn.</sup></sub>

> [!NOTE] GHI CHÚ
> Tất cả các bài test đã được chạy nhiều lần để có kết quả chính xác hơn.
> Tất cả người chơi không di chuyển khi spawn. Chỉ 8 chunk ban đầu được tải.
> Tất cả các server sử dụng terrain generation của riêng mình. Không có world nào được load trước.

> [!IMPORTANT] QUAN TRỌNG
> `CPU Max` thường cao hơn với một người chơi vì các chunk ban đầu đang được tải.

## Pumpkin

Build: [8febc50](https://github.com/Snowiiii/Pumpkin/commit/8febc5035d5611558c13505b7724e6ca284e0ada)

Compile args: `--release`

Run args:

**Kích thước file:** <FmtNum :n=12.3 />MB

**Thời gian khởi động:** <FmtNum :n=8 />ms

**Thời gian tắt:** <FmtNum :n=0 />ms

| Người chơi | RAM                   | CPU tĩnh        | CPU Max            |
| ---------- | --------------------- | ---------------- | ------------------ |
| 0       | <FmtNum :n=392.2 />KB | <FmtNum :n=0 />% | <FmtNum :n=0 />%   |
| 1       | <FmtNum :n=24.9 />MB  | <FmtNum :n=0 />% | <FmtNum :n=4 />%   |
| 2       | <FmtNum :n=25.1 />MB  | <FmtNum :n=0 />% | <FmtNum :n=0.6 />% |
| 5       | <FmtNum :n=26 />MB    | <FmtNum :n=0 />% | <FmtNum :n=1 />%   |
| 10      | <FmtNum :n=27.1 />MB  | <FmtNum :n=0 />% | <FmtNum :n=1.5 />% |

<sub><sup>Pumpkin cache các chunk đã tải, dẫn đến không tốn thêm RAM ngoài dữ liệu người chơi và sử dụng CPU tối thiểu.</sup></sub>

### Thời gian compile

Compile từ đầu:

**Debug:** <FmtNum :n=10.35 />sec
**Release:** <FmtNum :n=38.40 />sec

Recompile (crate pumpkin):

**Debug:** <FmtNum :n=1.82 />sec
**Release:** <FmtNum :n=28.68 />sec

## Vanilla

Release: [1.21.1](https://piston-data.mojang.com/v1/objects/59353fb40c36d304f2035d51e7d6e6baa98dc05c/server.jar)

Compile args:

Run args: `nogui`

**Kích thước file:** <FmtNum :n=51.6 />MB

**Thời gian khởi động:** <FmtNum :n=7 />sec

**Thời gian tắt:** <FmtNum :n=4 />sec

| Người chơi | RAM                   | CPU tĩnh                                 | CPU Max            |
| ---------- | --------------------- | ---------------------------------------- | ------------------ |
| 0       | <FmtNum n="860" />MB  | <FmtNum n="0.1" /> - <FmtNum n="0.3" />% | <FmtNum n="51" />% |
| 1       | <FmtNum n="1.5" />GB  | <FmtNum n="0.9" /> - <FmtNum n="1" />%   | <FmtNum n="41" />% |
| 2       | <FmtNum n="1.6" />GB  | <FmtNum n="1" /> - <FmtNum n="1.1" />%   | <FmtNum n="10" />% |
| 5       | <FmtNum n="1.8" />GB  | <FmtNum n="2" />%                        | <FmtNum n="20" />% |
| 10      | <FmtNum n="2.2" />GB  | <FmtNum n="4" />%                        | <FmtNum n="24" />% |

## Paper

Build: [122](https://api.papermc.io/v2/projects/paper/versions/1.21.1/builds/122/downloads/paper-1.21.1-122.jar)

Compile args:

Run args: `nogui`

**Kích thước file:** <FmtNum :n=49.4 />MB

**Thời gian khởi động:** <FmtNum :n=7 />sec

**Thời gian tắt:** <FmtNum :n=3 />sec

| Người chơi | RAM                 | CPU tĩnh                               | CPU Max           |
| ---------- | ------------------- | -------------------------------------- | ----------------- |
| 0       | <FmtNum :n=1.1 />GB | <FmtNum :n=0.2 /> - <FmtNum :n=0.3 />% | <FmtNum :n=36 />% |
| 1       | <FmtNum :n=1.7 />GB | <FmtNum :n=0.9 /> - <FmtNum :n=1.0 />% | <FmtNum :n=47 />% |
| 2       | <FmtNum :n=1.8 />GB | <FmtNum :n=1 /> - <FmtNum :n=1.1 />%   | <FmtNum :n=10 />% |
| 5       | <FmtNum :n=1.9 />GB | <FmtNum :n=1.5 />%                     | <FmtNum :n=15 />% |
| 10      | <FmtNum :n=2 />GB   | <FmtNum :n=3 />%                       | <FmtNum :n=20 />% |

## Purpur

Build: [2324](https://api.purpurmc.org/v2/purpur/1.21.1/2324/download)

Compile args:

Run args: `nogui`

**Kích thước file:** <FmtNum :n=53.1 />MB

**Thời gian khởi động:** <FmtNum :n=8 />sec

**Thời gian tắt:** <FmtNum :n=4 />sec

| Người chơi | RAM                 | CPU tĩnh                               | CPU Max           |
| ---------- | ------------------- | -------------------------------------- | ----------------- |
| 0       | <FmtNum :n=1.4 />GB | <FmtNum :n=0.2 /> - <FmtNum :n=0.3 />% | <FmtNum :n=25 />% |
| 1       | <FmtNum :n=1.6 />GB | <FmtNum :n=0.7 /> - <FmtNum :n=1.0 />% | <FmtNum :n=35 />% |
| 2       | <FmtNum :n=1.7 />GB | <FmtNum :n=1.1 /> - <FmtNum :n=1.3 />% | <FmtNum :n=9 />%  |
| 5       | <FmtNum :n=1.9 />GB | <FmtNum :n=1.6 />%                     | <FmtNum :n=20 />% |
| 10      | <FmtNum :n=2.2 />GB | <FmtNum :n=2 /> - <FmtNum :n=2.5 />%   | <FmtNum :n=26 />% |

## Minestom

Commit: [0ca1dda2fe](https://github.com/Minestom/Minestom/commit/0ca1dda2fe11390a1b89a228bbe7bf78fefc73e1)

Compile args:

Run args:

**Ngôn ngữ:** Benchmarks chạy với Kotlin 2.0.0 (Minestom được viết bằng Java)

**Kích thước file:** <FmtNum :n=2.8 />MB (Library)

**Thời gian khởi động:** <FmtNum :n=310 />ms

**Thời gian tắt:** <FmtNum :n=0 />ms

<sub>[Sử dụng code mẫu từ ](https://minestom.net/docs/setup/your-first-server)</sub>

| Người chơi | RAM                 | CPU tĩnh                               | CPU Max          |
| ---------- | ------------------- | -------------------------------------- | ---------------- |
| 0       | <FmtNum :n=228 />MB | <FmtNum :n=0.1 /> - <FmtNum :n=0.3 />% | <FmtNum :n=1 />% |
| 1       | <FmtNum :n=365 />MB | <FmtNum :n=0.9 /> - <FmtNum :n=1.0 />% | <FmtNum :n=5 />% |
| 2       | <FmtNum :n=371 />MB | <FmtNum :n=1 /> - <FmtNum :n=1.1 />%   | <FmtNum :n=4 />% |
| 5       | <FmtNum :n=390 />MB | <FmtNum :n=1.0 />%                     | <FmtNum :n=6 />% |
| 10      | <FmtNum :n=421 />MB | <FmtNum :n=3 />%                       | <FmtNum :n=9 />% |

Được benchmark vào <FmtDateTime :d="new Date('2024-10-15T16:34Z')" />
