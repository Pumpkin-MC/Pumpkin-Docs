# Đánh giá hiệu năng

Ở đây, các phần mềm máy chủ Minecraft phổ biến được so sánh với Pumpkin.

> [!CAUTION]
> **Sự so sánh này là không công bằng.** Pumpkin hiện có ít tính năng hơn rất nhiều so với các máy chủ khác, điều này có thể hiểu là nó sử dụng ít tài nguyên hơn.
> Cũng cần lưu ý rằng các máy chủ khác đã có nhiều năm để tối ưu hóa.
> Các bản fork từ Vanilla không cần phải viết lại toàn bộ logic của Vanilla, do đó có thể tập trung hoàn toàn vào việc tối ưu hóa.

![Ảnh chụp màn hình hiển thị 9 cửa sổ trò chơi Minecraft](https://github.com/user-attachments/assets/e08fbb00-42fe-4479-a03b-11bb6886c91a)

## Thông số kỹ thuật

### Kỹ thuật

#### Phần mềm

- Bản phân phối: Manjaro Linux
- Kiến trúc: x86_64 (64-bit)
- Phiên bản Kernel: 6.11.3-arch1-1

#### Phần cứng

- Bo mạch chủ: MAG B650 TOMAHAWK WIFI
- CPU: AMD Ryzen 7600X 6-Core
- RAM: Corsair 2x16GB DDR5 6000Mhz
- Lưu trữ: Samsung 990 PRO 1TB PCIe 4.0 M.2 SSD
- Tản nhiệt: be quiet Dark Rock Elite

#### Rust

- Toolchain: stable-x86_64-unknown-linux-gnu (1.81.0)
- Trình biên dịch Rust: rustc 1.81.0 (eeb90cda1 2024-09-04)

#### Java

- Phiên bản JDK: OpenJDK 23 64-Bit 2024-09-17
- Phiên bản JRE: OpenJDK Runtime Environment (build 23+37)
- Nhà cung cấp: Oracle

#### Trò chơi

- Phiên bản Minecraft: 1.21.1
- Tầm nhìn (View distance): 10
- Khoảng cách mô phỏng (Simulated distance): 10
- Chế độ trực tuyến (Online mode): false
- RCON: false

<sub><sup>Chế độ trực tuyến đã được tắt để dễ dàng kiểm tra hơn với các tài khoản không phải premium.</sup></sub>

> [!NOTE]
> Tất cả các bài kiểm tra đã được chạy nhiều lần để có kết quả chính xác hơn.
> Tất cả người chơi đều không di chuyển khi xuất hiện. Chỉ có 8 chunk ban đầu được tải.
> Tất cả các máy chủ đều sử dụng hệ thống tạo địa hình (terrain generation) của riêng chúng. Không có thế giới nào được tải trước.

> [!IMPORTANT]
> Mức sử dụng `CPU tối đa` thường cao hơn với một người chơi vì các chunk ban đầu đang được tải.

## Pumpkin

Bản dựng (Build): [8febc50](https://github.com/Snowiiii/Pumpkin/commit/8febc5035d5611558c13505b7724e6ca284e0ada)

Tham số biên dịch: `--release`

Tham số chạy:

**Kích thước tệp:** <FmtNum :n=12.3 />MB

**Thời gian khởi động:** <FmtNum :n=8 />ms

**Thời gian tắt:** <FmtNum :n=0 />ms

| Người chơi | RAM                   | CPU rỗi         | CPU tối đa         |
| ---------- | --------------------- | --------------- | ------------------ |
| 0          | <FmtNum :n=392.2 />KB | <FmtNum :n=0 />%| <FmtNum :n=0 />%   |
| 1          | <FmtNum :n=24.9 />MB  | <FmtNum :n=0 />%| <FmtNum :n=4 />%   |
| 2          | <FmtNum :n=25.1 />MB  | <FmtNum :n=0 />%| <FmtNum :n=0.6 />% |
| 5          | <FmtNum :n=26 />MB    | <FmtNum :n=0 />%| <FmtNum :n=1 />%   |
| 10         | <FmtNum :n=27.1 />MB  | <FmtNum :n=0 />%| <FmtNum :n=1.5 />% |

<sub><sup>Pumpkin có lưu cache các chunk đã được tải, dẫn đến việc không tốn thêm RAM ngoài dữ liệu người chơi và sử dụng CPU ở mức tối thiểu.</sup></sub>

### Thời gian biên dịch

Biên dịch từ đầu (không có cache):

**Gỡ lỗi (Debug):** <FmtNum :n=10.35 />giây
**Phát hành (Release):** <FmtNum :n=38.40 />giây

Biên dịch lại (crate pumpkin):

**Gỡ lỗi (Debug):** <FmtNum :n=1.82 />giây
**Phát hành (Release):** <FmtNum :n=28.68 />giây

## Vanilla

Bản phát hành (Release): [1.21.1](https://piston-data.mojang.com/v1/objects/59353fb40c36d304f2035d51e7d6e6baa98dc05c/server.jar)

Tham số biên dịch:

Tham số chạy: `nogui`

**Kích thước tệp:** <FmtNum :n=51.6 />MB

**Thời gian khởi động:** <FmtNum :n=7 />giây

**Thời gian tắt:** <FmtNum :n=4 />giây

| Người chơi | RAM                   | CPU rỗi                                  | CPU tối đa         |
| ---------- | --------------------- | ---------------------------------------- | ------------------ |
| 0          | <FmtNum n="860" />MB  | <FmtNum n="0.1" /> - <FmtNum n="0.3" />% | <FmtNum n="51" />% |
| 1          | <FmtNum n="1.5" />GB  | <FmtNum n="0.9" /> - <FmtNum n="1" />%   | <FmtNum n="41" />% |
| 2          | <FmtNum n="1.6" />GB  | <FmtNum n="1" /> - <FmtNum n="1.1" />%   | <FmtNum n="10" />% |
| 5          | <FmtNum n="1.8" />GB  | <FmtNum n="2" />%                        | <FmtNum n="20" />% |
| 10         | <FmtNum n="2.2" />GB  | <FmtNum n="4" />%                        | <FmtNum n="24" />% |

## Paper

Bản dựng (Build): [122](https://api.papermc.io/v2/projects/paper/versions/1.21.1/builds/122/downloads/paper-1.21.1-122.jar)

Tham số biên dịch:

Tham số chạy: `nogui`

**Kích thước tệp:** <FmtNum :n=49.4 />MB

**Thời gian khởi động:** <FmtNum :n=7 />giây

**Thời gian tắt:** <FmtNum :n=3 />giây

| Người chơi | RAM                 | CPU rỗi                                | CPU tối đa        |
| ---------- | ------------------- | -------------------------------------- | ----------------- |
| 0          | <FmtNum :n=1.1 />GB | <FmtNum :n=0.2 /> - <FmtNum :n=0.3 />% | <FmtNum :n=36 />% |
| 1          | <FmtNum :n=1.7 />GB | <FmtNum :n=0.9 /> - <FmtNum :n=1.0 />% | <FmtNum :n=47 />% |
| 2          | <FmtNum :n=1.8 />GB | <FmtNum :n=1 /> - <FmtNum :n=1.1 />%   | <FmtNum :n=10 />% |
| 5          | <FmtNum :n=1.9 />GB | <FmtNum :n=1.5 />%                     | <FmtNum :n=15 />% |
| 10         | <FmtNum :n=2 />GB   | <FmtNum :n=3 />%                       | <FmtNum :n=20 />% |

## Purpur

Bản dựng (Build): [2324](https://api.purpurmc.org/v2/purpur/1.21.1/2324/download)

Tham số biên dịch:

Tham số chạy: `nogui`

**Kích thước tệp:** <FmtNum :n=53.1 />MB

**Thời gian khởi động:** <FmtNum :n=8 />giây

**Thời gian tắt:** <FmtNum :n=4 />giây

| Người chơi | RAM                 | CPU rỗi                                | CPU tối đa        |
| ---------- | ------------------- | -------------------------------------- | ----------------- |
| 0          | <FmtNum :n=1.4 />GB | <FmtNum :n=0.2 /> - <FmtNum :n=0.3 />% | <FmtNum :n=25 />% |
| 1          | <FmtNum :n=1.6 />GB | <FmtNum :n=0.7 /> - <FmtNum :n=1.0 />% | <FmtNum :n=35 />% |
| 2          | <FmtNum :n=1.7 />GB | <FmtNum :n=1.1 /> - <FmtNum :n=1.3 />% | <FmtNum :n=9 />%  |
| 5          | <FmtNum :n=1.9 />GB | <FmtNum :n=1.6 />%                     | <FmtNum :n=20 />% |
| 10         | <FmtNum :n=2.2 />GB | <FmtNum :n=2 /> - <FmtNum :n=2.5 />%   | <FmtNum :n=26 />% |

## Minestom

Commit: [0ca1dda2fe](https://github.com/Minestom/Minestom/commit/0ca1dda2fe11390a1b89a228bbe7bf78fefc73e1)

Tham số biên dịch:

Tham số chạy:

**Ngôn ngữ:** Các bài kiểm tra hiệu năng được chạy với Kotlin 2.0.0 (Bản thân Minestom được viết bằng Java)

**Kích thước tệp:** <FmtNum :n=2.8 />MB (Thư viện)

**Thời gian khởi động:** <FmtNum :n=310 />ms

**Thời gian tắt:** <FmtNum :n=0 />ms

<sub>[Đã sử dụng mã mẫu từ](https://minestom.net/docs/setup/your-first-server)</sub>

| Người chơi | RAM                 | CPU rỗi                                | CPU tối đa         |
| ---------- | ------------------- | -------------------------------------- | ---------------- |
| 0          | <FmtNum :n=228 />MB | <FmtNum :n=0.1 /> - <FmtNum :n=0.3 />% | <FmtNum :n=1 />% |
| 1          | <FmtNum :n=365 />MB | <FmtNum :n=0.9 /> - <FmtNum :n=1.0 />% | <FmtNum :n=5 />% |
| 2          | <FmtNum :n=371 />MB | <FmtNum :n=1 /> - <FmtNum :n=1.1 />%   | <FmtNum :n=4 />% |
| 5          | <FmtNum :n=390 />MB | <FmtNum :n=1.0 />%                     | <FmtNum :n=6 />% |
| 10         | <FmtNum :n=421 />MB | <FmtNum :n=3 />%                       | <FmtNum :n=9 />% |

Đã kiểm tra hiệu năng vào lúc <FmtDateTime :d="new Date('2024-10-15T16:34Z')" />