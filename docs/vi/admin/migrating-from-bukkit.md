# Di chuyển từ Bukkit / Spigot / Paper sang Pumpkin

Hướng dẫn này bao trùm khác biệt cấu trúc và cấu hình khi chuyển đổi một máy chủ từ Bukkit, Spigot hoặc Paper sang Pumpkin.

---

## 1. Khác biệt về cấu trúc

| Khía cạnh | Bukkit / Spigot / Paper | Pumpkin |
| :--- | :--- | :--- |
| **Môi trường chạy** | Máy ảo Java (cần Java 17/21+) | Tệp thực thi gốc (biên dịch bằng Rust, không cần Java) |
| **Lệnh khởi động** | `java [flags] -jar server.jar` | `./pumpkin` |
| **Vòng lặp tick** | Vòng lặp tick đơn luồng với phân công công việc bất đồng bộ | Thực thi tick đa luồng trên các lõi CPU |
| **Định dạng plugin** | Bytecode Java (`.jar`) nhắm đến API Bukkit | WebAssembly (`.wasm`), hoặc `.jar` thông qua PatchBukkit |
| **Ngôn ngữ plugin** | Java, Kotlin, Scala | Rust, Python, Kotlin, C#, Go, C |
| **Cấu hình** | `server.properties`, `paper.yml`, `spigot.yml` | `pumpkin.toml` (định dạng TOML) |
| **Quản lý bộ nhớ** | Bộ thu gom rác của JVM | Cấp phát bộ nhớ trực tiếp từ Hệ điều hành |

---

## 2. Plugin & Tiện ích mở rộng 
### Plugin WebAssembly 
Định dạng plugin chính của Pumpkin là WebAssembly (`.wasm`): 
- **Cách ly**: Plugin chạy trong môi trường WebAssembly được sandbox.
- **Hỗ trợ ngôn ngữ**: Plugin có thể được biên dịch sang WASM từ Rust, Python, Go, C#, C, hoặc Kotlin.
- **Plugin tuỳ chỉnh**: Để chuyển các plugin Bukkit tuỳ chỉnh sang Pumpkin, xem [Hướng dẫn di chuyển cho nhà phát triển](../plugin-dev/migrating-from-bukkit/index).

### Tương thích Plugin Bukkit: PatchBukkit
Đối với các server dựa vào các plugin `.jar` Bukkit/Spigot hiện có, dự án **PatchBukkit** cung cấp một lớp tương thích:
- **Kiến trúc**: PatchBukkit nhúng một JVM vào trong Pumpkin và tái triển khai một số phần của API Bukkit, nối các lệnh gọi tới Pumpkin thông qua JNI và FFI.
- **Vị trí plugin**: Các plugin `.jar` tương thích được đặt trong `patchbukkit/patchbukkit-plugins/`.
- **Tình trạng & Hạn chế**: PatchBukkit đang trong quá trình phát triển. Mặc dù các lệnh gọi API Bukkit tiêu chuẩn được hỗ trợ, các plugin phụ thuộc vào các lớp nội bộ NMS (`net.minecraft.server`), nội bộ CraftBukkit hoặc thao tác bytecode có thể không hoạt động đúng.
- **Yêu cầu Java**: Chạy PatchBukkit cần có môi trường Java (JRE/JDK) được cài trên hệ thống để chạy JVM nhúng.
---

## 3. Cấu hình & Thuộc tính

Pumpkin sử dụng các file cấu hình TOML thay vì `server.properties` và YAML:

| Paper / Spigot (`server.properties`) | Pumpkin (`pumpkin.toml`) |
| :--- | :--- |
| `server-port=25565` | `server_address = "0.0.0.0:25565"` |
| `motd=...` | `motd = "Một Server Pumpkin"` |
| `max-players=20` | `max_players = 20` |
| `online-mode=true` | `online_mode = true` |
| `view-distance=10` | `view_distance = 10` |
| `simulation-distance=8` | `simulation_distance = 8` |

---
## 4. Thế giới & Lưu trữ dữ liệu

- **Tính tương thích định dạng**: Pumpkin đọc định dạng chunk Anvil tiêu chuẩn (các tệp `.mca`).
- **Cấu trúc thư mục**: Khi sao chép các thư mục thế giới từ các hệ thống Paper/Spigot hiện có, hãy đảm bảo rằng các thư mục chiều không gian (`world`, `world_nether`, `world_the_end`) khớp với cấu trúc mà Pumpkin yêu cầu.
- **Yêu cầu định dạng thế giới & gói dữ liệu (data pack) mới nhất**: Hiện tại, Pumpkin chỉ hỗ trợ định dạng thế giới và định dạng gói dữ liệu mới nhất tương ứng với phiên bản Minecraft mục tiêu. Các định dạng thế giới cũ hoặc các phiên bản gói dữ liệu lỗi thời sẽ không được tự động chuyển đổi khi chạy chương trình. 
- **Nâng cấp thế giới trong Client**: Nếu di chuyển một thế giới cũ, hãy nâng cấp nó trước khi tải vào Pumpkin. Bạn có thể cập nhật thế giới trực tiếp thông qua client Minecraft chính thức: mở client ở phiên bản mới nhất tương ứng, truy cập mục **Singleplayer** (Chơi đơn), chọn thế giới đó, nhấp vào **Edit** (Chỉnh sửa), rồi chọn **Optimize World** (Tối ưu hóa thế giới). Ngoài ra, bạn cũng có thể chạy thế giới đó một lần trên một máy chủ Minecraft gốc (vanilla server) ở phiên bản mới nhất. 
- **Gói dữ liệu (Data packs)**: Đảm bảo rằng tất cả các gói dữ liệu nằm trong thư mục `world/datapacks` đã được cập nhật lên định dạng phù hợp với phiên bản Minecraft mục tiêu.

---

## 5. Khởi động & Các tham số JVM

### Không cần cài đặt Java
Pumpkin là một tệp thực thi nguyên bản (native executable) độc lập. Bạn không cần phải cài đặt môi trường chạy Java (JRE/JDK) trên hệ thống hoặc bên trong container của mình để vận hành máy chủ. ### Lệnh khởi chạy
Các máy chủ Paper và Spigot thường sử dụng tập lệnh khởi chạy JVM với các tham số cấp phát bộ nhớ heap và thu gom rác (ví dụ: Aikar's Flags):

:::code-group

```bash [Paper (JVM)]
# Lệnh khởi chạy Paper phổ biến với Aikar's Flags:
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

### Sự khác biệt về bộ nhớ
- **Không có trình thu gom rác (Garbage Collector)**: Pumpkin được viết bằng ngôn ngữ Rust và sử dụng cơ chế quản lý bộ nhớ xác định tại thời điểm biên dịch (RAII). Do đó, không có trình thu gom rác (GC) chạy trong lúc vận hành, cũng như không cần tinh chỉnh các tham số dừng hệ thống (GC pause) để thu gom rác. - **Không cấp phát heap cố định**: Các tham số như `-Xms` và `-Xmx` không tồn tại trong các tệp thực thi dạng native (binary). Bộ nhớ được hệ điều hành cấp phát linh hoạt khi các phân đoạn (chunks) và thực thể (entities) được tải vào, và được giải phóng khi chúng bị loại bỏ khỏi bộ nhớ.
- **Các tham số JVM không còn hiệu lực**: Các tham số dùng để tinh chỉnh chiến lược thu gom rác (garbage collection), kích thước các thế hệ bộ nhớ (generational sizing), hoặc các cơ chế nội bộ của JVM là không cần thiết và không thể truyền vào tệp thực thi này.

---

## Danh mục kiểm tra dành cho quản trị viên

1. [ ] Sao lưu dữ liệu máy chủ và các tệp thế giới (world files) hiện có; đảm bảo thế giới và các gói dữ liệu (data packs) đã được cập nhật lên định dạng mới nhất (ví dụ: thông qua tính năng "Optimize World" trong client).
2. [ ] Chuyển đổi các thiết lập từ `server.properties` sang `pumpkin.toml`.
3. [ ] Xác định các plugin cần thiết và kiểm tra xem có phiên bản tương đương dạng WebAssembly (`.wasm`) hay không, hoặc thử nghiệm với [PatchBukkit](#bukkit-plugin-compatibility-patchbukkit).
4. [ ] Cấu hình các thiết lập proxy (`Velocity` / `BungeeCord`) trong tệp `pumpkin.toml` nếu sử dụng mạng proxy.
5. [ ] Cập nhật các tập lệnh khởi chạy (startup scripts) để chạy trực tiếp tệp `./pumpkin` mà không cần các tham số JVM.
6. [ ] Khởi động máy chủ, sau đó kiểm tra khả năng kết nối và xem xét các tệp nhật ký (logs).
