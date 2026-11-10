# Tài liệu Dành cho Người đóng góp

Chào mừng bạn đến với tài liệu dành cho người đóng góp nội bộ và nhà phát triển Pumpkin!

Pumpkin là phần mềm máy chủ Minecraft có hiệu suất cực cao, có khả năng mở rộng, được viết hoàn toàn bằng **Rust** hiện đại. Được thiết kế từ gốc rễ cho tính đồng thời, an toàn bộ nhớ và độ chính xác vanilla, Pumpkin hỗ trợ cả **Minecraft: Java Edition** và **Minecraft: Bedrock Edition**.

Phần này cung cấp tài liệu toàn diện cho những người đóng góp làm việc trên máy chủ Pumpkin cốt lõi, các crate nội bộ và công cụ hỗ trợ.

---

## Triết lý Cốt lõi & Nguyên tắc Thiết kế

Pumpkin được xây dựng dựa trên một số nguyên tắc kỹ thuật nền tảng:

- **Trừu tượng hóa Không tốn kém & Hiệu suất Thô**: Chúng tôi tận dụng các trừu tượng hóa không tốn kém của Rust, bố cục bộ nhớ hiệu quả và cấu trúc dữ liệu thân thiện với cache để giảm thiểu chi phí CPU và RAM.
- **Mô hình Đồng thời Nghiêm ngặt**:
  - **I/O Bất đồng bộ qua Tokio**: Xử lý socket mạng, bắt tay client, streaming packet và I/O file chạy hiệu quả trên runtime bất đồng bộ.
  - **Tính toán Song song qua Rayon**: Các tính toán nặng nhọc, tốn CPU—như tạo địa hình, tính toán ánh sáng, tuần tự hóa chunk và vật lý—được điều phối đến các thread pool Rayon để tránh chặn vòng lặp mạng async.
  - **Giao tiếp An toàn luồng**: Các kênh không chặn (`tokio::sync::mpsc`, crossbeam) phối hợp công việc một cách liền mạch giữa các task async và thread pool.
- **Chất lượng Mạnh mẽ & Tự do Panic**: Pumpkin thực thi các quy tắc Clippy nghiêm ngặt. Trong mã máy chủ production, các panic, `unwrap()`, `expect()` và lỗi không được xử lý bị từ chối tại thời điểm biên dịch.
- **Kiến trúc Workspace Mô-đun**: Chức năng được phân chia rõ ràng thành các crate tập trung (`pumpkin-protocol`, `pumpkin-world`, `pumpkin-inventory`, `pumpkin-command`, `pumpkin-data`, v.v.). Mỗi crate có trách nhiệm cụ thể và ranh giới phụ thuộc rõ ràng.
- **Độ chính xác Giao thức**: Chúng tôi phấn đấu cho khả năng tương thích vanilla nghiêm ngặt đồng thời cung cấp các tính năng hiện đại như hỗ trợ định dạng vùng Linear, chơi chéo Bedrock và runtime plugin WebAssembly đa ngôn ngữ.

---

## Lộ trình Tài liệu

Khám phá tài liệu dành cho người đóng góp để hiểu cách Pumpkin hoạt động và cách đóng góp hiệu quả:

| Phần | Mô tả |
| :--- | :--- |
| **[Hướng dẫn Đóng góp](/developer/contributing)** | Hướng dẫn từng bước để thiết lập môi trường, build, test, quy tắc clippy và tiêu chuẩn PR. |
| **[Kiến trúc & Crate](/developer/architecture)** | Đi sâu vào cấu trúc workspace multi-crate của Pumpkin, trách nhiệm của crate và luồng dữ liệu. |
| **[Trình trích xuất Dữ liệu](/developer/extractor)** | Trích xuất các registry Minecraft vanilla được hardcode, bounding box và cấu trúc packet thông qua Fabric mod của chúng tôi. |
| **[Tổng quan Mạng](/developer/networking/)** | Kiến trúc mạng cốt lõi, transport và hỗ trợ đa phiên bản. |
| **[Mạng Java Edition](/developer/networking/java/overview)** | Các trạng thái giao thức, [thêm packet](/developer/networking/java/adding-packets) và [xác thực](/developer/networking/java/authentication). |
| **[Mạng Bedrock Edition](/developer/networking/bedrock/overview)** | Transport RakNet/NetherNet, [thêm packet](/developer/networking/bedrock/adding-packets), [xác thực](/developer/networking/bedrock/authentication) và [NetherNet](/developer/networking/bedrock/nethernet). |
| **[Chuyển tiếp Proxy](/developer/networking/proxy/)** | Chuyển tiếp thông tin người chơi an toàn cho [BungeeCord](/developer/networking/proxy/bungeecord), [Velocity](/developer/networking/proxy/velocity) và [Vine](/developer/networking/proxy/vine). |
| **[Giao thức Query](/developer/networking/query)** | Triển khai UDP query GameSpy4 cho các bot giám sát bên ngoài và danh sách máy chủ. |
| **[Khối](/developer/blocks/)** | Kiến trúc khối, trạng thái, va chạm, thuộc tính và [thêm hành vi khối](/developer/blocks/adding-blocks). |
| **[Vật phẩm](/developer/items/)** | Kiến trúc vật phẩm, data component, đồ ăn, cooldown và [thêm hành vi vật phẩm](/developer/items/adding-items). |
| **[Entity & Mob](/developer/entities/)** | Hệ thống phân cấp trait entity, [spawn & theo dõi](/developer/entities/spawning-and-tracking) và [AI mob & pathfinding](/developer/entities/ai-and-mobs). |
| **[Lệnh](/developer/commands/)** | Cây lệnh Brigadier thuần Rust, [thêm lệnh](/developer/commands/adding-commands), [đối số & gợi ý](/developer/commands/arguments-and-suggestions) và [ngữ cảnh thực thi](/developer/commands/execution-and-context). |
| **[Hệ thống Plugin](/developer/plugins/)** | Kiến trúc hệ thống plugin nội bộ, [thêm loader plugin](/developer/plugins/loaders) và [ký & cấp phép WASM](/developer/plugins/wasm-signing). |
| **[Hệ thống Thế giới & Định dạng](/developer/world)** | Tải chunk, lưu, định dạng Anvil/Linear/Slime/Pump, tạo địa hình và ánh sáng. |
| **[Tạo Mã](/developer/codegen)** | Cách `tools/pumpkin-codegen` xử lý dữ liệu vanilla Minecraft để tạo `pumpkin-data`. |
| **[Chuyển porta Phiên bản Minecraft](/developer/porting-versions)** | Hướng dẫn toàn diện để nâng cấp Pumpkin: trích xuất dữ liệu, assets & datapack, codegen, sửa lỗi compiler, logic block/item/entity mới và remapping ViaVersion. |
| **[Phát triển Trên Mobile](/developer/mobile)** | Phát triển và biên dịch Pumpkin trên môi trường mobile như Android (Termux). |

---

## Phát triển Plugin vs. Phát triển Cốt lõi

> [!NOTE]
> Nếu bạn đang tìm cách xây dựng plugin bên thứ ba mở rộng Pumpkin thay vì đóng góp vào chính máy chủ, vui lòng xem phần **[Phát triển Plugin](/plugin-dev/introduction)** chuyên biệt.
>
> Pumpkin hỗ trợ viết plugin bằng **Rust**, **Python**, **C#**, **C**, **Go** và **Kotlin** được hỗ trợ bởi runtime WebAssembly (Wasmtime) và giao diện WIT của chúng tôi.
