# Kiến trúc & Crate của Pumpkin

Pumpkin được tổ chức dưới dạng một Cargo workspace mô-đun bao gồm các crate chuyên biệt. Mỗi crate có trách nhiệm riêng biệt, ranh giới được xác định nghiêm ngặt và ít phụ thuộc chéo.

Kiến trúc này cho phép tốc độ biên dịch song song cao, kiểm thử cô lập, chia sẻ dữ liệu không tốn kém và phân tách rõ ràng giữa các giao thức mạng, logic trò chơi và quản lý thế giới.

---

## Tổng quan các Crate trong Workspace

### Kiến trúc Workspace Nhìn nhanh

| Lớp | Các Crate | Trách nhiệm |
| :--- | :--- | :--- |
| **Runtime Cốt lõi** | `pumpkin` | Vòng lặp trò chơi, tick thế giới, phiên người chơi, quản lý entity và các vòng lặp sự kiện |
| **Mạng & Giao thức** | `pumpkin-protocol`, `pumpkin-auth`, `pumpkin-nbt` | Tuần tự hóa packet Java/Bedrock, xác thực Yggdrasil & Xbox Live, SNBT |
| **Thế giới & Gameplay** | `pumpkin-world`, `pumpkin-inventory`, `pumpkin-command` | I/O vùng (Anvil/Linear), tạo địa hình, tick khối, container, cây Brigadier |
| **Khả năng Mở rộng** | `pumpkin-plugin-runtime`, `pumpkin-host-bindings`, `pumpkin-plugin-api`, `pumpkin-plugin-wit` | Thực thi plugin WebAssembly qua Wasmtime, API host WIT, loader native và WASM |
| **Nền tảng** | `pumpkin-data`, `pumpkin-config`, `pumpkin-util` | Registry được code-gen, file cấu hình có kiểu, vector toán học, quyền hạn |

---

## Chi tiết Các Crate

### 1. `pumpkin` (Máy chủ Cốt lõi)
- **Đường dẫn**: `crates/pumpkin`
- **Mục đích**: Binary máy chủ chính và engine điều phối tập trung.
- **Trách nhiệm**:
  - Khởi tạo cấu hình, logging (`tracing`) và telemetry.
  - Spawn các network listener Tokio cho Minecraft: Java Edition, Bedrock Edition, RCON, Query và quảng bá LAN.
  - Quản lý vòng lặp tick máy chủ (`Server::tick`), phối hợp cập nhật thế giới, hành động người chơi, di chuyển entity và broadcast chunk.
  - Điều phối các packet client đến thông qua `crates/pumpkin/src/net/java/` và `net/bedrock/`.
  - Tích hợp trình quản lý plugin, kích hoạt các event handler trước và sau khi xử lý packet.

### 2. `pumpkin-protocol` (Giao thức Mạng)
- **Đường dẫn**: `crates/pumpkin-protocol`
- **Mục đích**: Tuần tự hóa và giải tuần tự hóa định dạng mạng tốc độ cao cho Minecraft Java và Bedrock edition.
- **Trách nhiệm**:
  - Triển khai các trait `ClientPacket` (tuần tự hóa) và `ServerPacket` (giải tuần tự hóa).
  - Xử lý các primitive giao thức: `VarInt`, `VarLong`, UUID, NBT compound và codec chuỗi.
  - Triển khai packet trên tất cả các trạng thái: `Handshake`, `Status`, `Login`, `Config` và `Play`.
  - Cung cấp nén packet (ZLib/Fast compression) và mã hóa packet (AES-128/CFB8).
  - Đóng gói các giao thức RCON và GameSpy4 Query.

### 3. `pumpkin-world` (Thế giới & Chunk)
- **Đường dẫn**: `crates/pumpkin-world`
- **Mục đích**: Tải thế giới, lưu, tạo địa hình và quản lý chunk.
- **Trách nhiệm**:
  - Hỗ trợ nhiều định dạng lưu trữ chunk:
    - **Vanilla Anvil (`.mca`)**: Đọc và ghi file vùng tiêu chuẩn.
    - **Linear (`.linear`)**: Định dạng vùng nén zstd hiệu suất cao tiết kiệm 50–95% dung lượng đĩa.
    - **Slime (`.slime`)**: Định dạng thế giới đơn file.
    - **Pump**: Định dạng lưu trữ chunk native của Pumpkin.
  - Triển khai pipeline tạo thế giới: Bản đồ độ cao Perlin noise, bộ định tuyến noise 3D, tham số khí hậu biome, tính năng đã đặt, carver và địa hình superflat.
  - Quản lý ánh sáng khối và lan truyền ánh sáng trời.
  - Phối hợp tải chunk, unload và streaming qua các iterator chunk hình trụ.

### 4. `pumpkin-data` (Tập dữ liệu & Registry Minecraft)
- **Đường dẫn**: `crates/pumpkin-data`
- **Mục đích**: Các registry tĩnh thời gian biên dịch và bảng dữ liệu được tạo trực tiếp từ assets và báo cáo vanilla Minecraft.
- **Trách nhiệm**:
  - Chứa các mapping ID, thuộc tính và định nghĩa hoàn chỉnh cho khối, vật phẩm, biome, entity, âm thanh, particle, enchantment và công thức.
  - Tra cứu ID packet trên nhiều phiên bản giao thức Minecraft.
  - Các bảng tra cứu không tốn kém được tạo bởi `tools/pumpkin-codegen`.

### 5. `pumpkin-config` (Quản lý Cấu hình)
- **Đường dẫn**: `crates/pumpkin-config`
- **Mục đích**: Phân tích, tuần tự hóa và xác thực cấu hình TOML.
- **Trách nhiệm**:
  - Tải và ghi `pumpkin.toml`.
  - Cấu hình cổng máy chủ, ngưỡng nén, chế độ proxy, resource pack, cấp độ logging, cài đặt thế giới và tích hợp Bedrock.
  - Cung cấp mặc định an toàn và xác thực schema.

### 6. `pumpkin-inventory` (Kho đồ & Container)
- **Đường dẫn**: `crates/pumpkin-inventory`
- **Mục đích**: Xử lý cửa sổ container phía máy chủ và cơ chế kho đồ.
- **Trách nhiệm**:
  - Quản lý kho đồ người chơi, container rương, bàn chế tạo, lò nung và màn hình giao dịch dân làng.
  - Xác thực click slot client, thao tác kéo, xếp chồng vật phẩm và chia vật phẩm.
  - Phối hợp đồng bộ hóa packet cửa sổ để đảm bảo tính chính xác của kho đồ client.

### 7. `pumpkin-command` (Bộ điều phối Lệnh)
- **Đường dẫn**: `crates/pumpkin-command`
- **Mục đích**: Bộ điều phối và phân tích cây lệnh phân cấp theo phong cách Brigadier.
- **Trách nhiệm**:
  - Xây dựng cây lệnh mô-đun với các đối số có kiểu (`Integer`, `Float`, `Entity`, `BlockPos`, v.v.).
  - Thực thi các lệnh đã kiểm tra quyền.
  - Cung cấp gợi ý tự động theo thời gian thực gửi đến các client đã kết nối.

### 8. `pumpkin-auth` (Xác thực & Xác minh Phiên)
- **Đường dẫn**: `crates/pumpkin-auth`
- **Mục đích**: Xác thực mật mã và xác minh danh tính người chơi.
- **Trách nhiệm**:
  - Xác thực phiên client với máy chủ xác thực Yggdrasil của Mojang.
  - Xử lý tạo cặp khóa RSA và trao đổi bí mật chung trong trạng thái Login.
  - Hỗ trợ tạo UUID chế độ offline và endpoint xác thực tùy chỉnh.
  - Triển khai các giao thức chuyển tiếp proxy: [BungeeCord](https://github.com/SpigotMC/BungeeCord), [BungeeGuard](https://github.com/lucko/BungeeGuard) và chuyển tiếp hiện đại [Velocity](https://github.com/PaperMC/Velocity) với chữ ký HMAC-SHA256.

### 9. `pumpkin-nbt` (Codec Named Binary Tag)
- **Đường dẫn**: `crates/pumpkin-nbt`
- **Mục đích**: Trình phân tích và tuần tự hóa NBT binary throughput cao.
- **Trách nhiệm**:
  - Phân tích và mã hóa tất cả các loại tag NBT tiêu chuẩn (`Byte`, `Short`, `Int`, `Long`, `Float`, `Double`, `ByteArray`, `String`, `List`, `Compound`, `IntArray`, `LongArray`).
  - Hỗ trợ các lớp nén: Gzip, Zlib và NBT mạng không nén.

### 10. `pumpkin-plugin-*` (Cơ sở hạ tầng Khả năng Mở rộng)
- **Đường dẫn**:
  - `crates/pumpkin-plugin-api`: Rust developer SDK để biên dịch plugin native.
  - `crates/pumpkin-plugin-runtime`: Host thực thi WebAssembly được hỗ trợ bởi Wasmtime.
  - `crates/pumpkin-plugin-wit`: Đặc tả WebAssembly Interface Type (WIT).
  - `crates/pumpkin-host-bindings`: Các host binding tự động kết nối Wasmtime và core máy chủ.
- **Mục đích**: Cho phép thực thi plugin đa ngôn ngữ an toàn (Rust, Python, C#, C, Go, Kotlin) với bộ nhớ được sandbox và hiệu suất gần native.

### 11. `pumpkin-util` & `pumpkin-macros` (Nền tảng)
- **Đường dẫn**: `crates/pumpkin-util`, `crates/pumpkin-macros`, `crates/pumpkin-api-macros`
- **Mục đích**: Các kiểu nền tảng, thuật toán chia sẻ và macro thủ tục.
- **Trách nhiệm**:
  - Tiện ích toán học: `Vector2`, `Vector3`, `BoundingBox` và chuyển đổi góc.
  - Định dạng văn bản và chat: `TextComponent` và tuần tự hóa JSON component.
  - Các macro thủ tục như `#[java_packet(...)]` liên kết struct packet với ID giao thức và trait packet.

### 12. `tools/` (Công cụ Nhà phát triển)
- **`tools/pumpkin-codegen`**: Trình tạo mã tự động phân tích các file jar phiên bản Minecraft, báo cáo dữ liệu và lưu trữ assets để xuất file nguồn Rust vào `pumpkin-data`.
- **`tools/pumpkin-fuzzer`**: Bộ fuzz testing cho trình phân tích packet mạng, NBT reader và giải mã file vùng để xác định các vector crash tiềm ẩn hoặc bất thường bộ nhớ.

---

## Mô hình Đồng thời & Luồng

| Thành phần | Runtime / Pool | Khối lượng Công việc Chính | Cơ chế Giao tiếp |
| :--- | :--- | :--- | :--- |
| **Mạng & Socket I/O** | Tokio Async Runtime | Đọc packet TCP, packet UDP Bedrock, framing, bắt tay phiên | Async task (`tokio::spawn`), reactor không chặn |
| **Tính toán Nặng** | Rayon Thread Pool | Tạo địa hình, bộ định tuyến noise, lan truyền ánh sáng, nén chunk | Worker thread qua crossbeam / Rayon iterator |
| **Cầu nối Giữa các Thread** | Kênh Tokio | Điều phối chunk đã hoàn thành và packet đã mã hóa trở lại các task mạng | Kênh `tokio::sync::mpsc` không chặn |

Pumpkin tuân thủ nghiêm ngặt sự phân tách mối quan tâm này:
- **Ràng buộc I/O**: Được quản lý trên các task bất đồng bộ Tokio.
- **Ràng buộc CPU**: Được quản lý trên các thread pool Rayon.
- **Giao tiếp**: Được phối hợp qua các kênh cross-thread (`tokio::sync::mpsc`) mà không bao giờ chặn reactor loop Tokio.
