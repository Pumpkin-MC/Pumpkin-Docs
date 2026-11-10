# Tạo Mã (`pumpkin-codegen`)

Minecraft là một trò chơi khổng lồ với hàng nghìn trạng thái khối, vật phẩm, ID packet, sự kiện âm thanh, công thức và tham số biome. Các registry này thường xuyên thay đổi giữa các bản cập nhật Minecraft.

Để duy trì độ chính xác 100% mà không cần bảo trì thủ công hàng chục nghìn hằng số dễ mắc lỗi, Pumpkin sử dụng công cụ tạo mã tự động: [`tools/pumpkin-codegen`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/tools/pumpkin-codegen).

---

## Mục đích & Quy trình Làm việc

`pumpkin-codegen` phân tích các báo cáo bộ tạo dữ liệu máy chủ Minecraft chính thức, file assets và đặc tả phiên bản, và xuất các file Rust có kiểu mạnh, không tốn kém trực tiếp vào [`crates/pumpkin-data`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-data).

Pipeline hoạt động trong ba giai đoạn riêng biệt:
1. **Ingestion**: Đọc các asset JSON thô và báo cáo máy chủ vanilla từ `assets/` và `assets/datapacks/`.
2. **Transformation**: Chuẩn hóa các trạng thái, tính toán bitset, xử lý remapping ViaVersion và tối ưu hóa bảng tra cứu.
3. **Emission**: Xuất các hằng số và struct Rust đã biên dịch vào [`crates/pumpkin-data/src/generated`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-data/src/generated).

---

## Các Tập dữ liệu Được Tạo

`pumpkin-codegen` tạo các thành phần sau trong `pumpkin-data`:

| Danh mục | Mô tả | Nguồn Được Tạo |
| :--- | :--- | :--- |
| **Packet** | ID packet serverbound và clientbound cho tất cả trạng thái giao thức trên các phiên bản Minecraft được hỗ trợ. | `packet.rs` |
| **Khối** | Định nghĩa khối, trạng thái mặc định, thuộc tính trạng thái (hướng, powered, waterlogged, v.v.) và hộp va chạm khối. | `block.rs` |
| **Vật phẩm** | Định nghĩa vật phẩm, kích thước stack, độ bền, data component, thuộc tính thức ăn và slot trang bị. | `item.rs` |
| **Registry** | Registry động cho biome, chiều, loại chat, loại sát thương, vật liệu trim và mẫu banner. | `registry.rs` |
| **Biome & Noise** | Tham số khí hậu, cấu hình bộ định tuyến noise, cài đặt noise 3D và quy tắc bề mặt. | `biome.rs`, `noise_router.rs` |
| **Entity** | Loại entity, bounding box mặc định, thuộc tính và schema metadata entity được theo dõi. | `entity_type.rs`, `tracked_data.rs` |
| **Công thức & Chế tạo** | Công thức shaped, shapeless, nung chảy, blast, hun khói và cắt đá. | `recipes.rs` |
| **Tag** | Tag khối, tag vật phẩm, tag chất lỏng và tag loại entity (vd: `#minecraft:mineable/pickaxe`). | `tag.rs` |
| **Enchantment & Thuốc** | Định nghĩa enchantment, hiệu ứng thuốc và công thức giá pha thuốc. | `enchantments.rs`, `potion.rs` |
| **Bản dịch** | Các khóa bản địa hóa chính thức cho tin nhắn chat và tên vật phẩm. | `translations.rs` |
| **WIT Plugin** | File WIT WebAssembly Component Model định nghĩa giao diện plugin. | `wit/` |

---

## Chạy Tạo Mã

Để chạy trình tạo mã cục bộ:

```bash
# Điều hướng đến gốc workspace
cd Pumpkin

# Chạy công cụ codegen
cargo run -p pumpkin-codegen
```

### Khi nào Bạn Nên Chạy Codegen?

- **Nâng cấp lên Phiên bản Minecraft Mới**: Khi chuyển porta Pumpkin sang một bản phát hành Minecraft phụ hoặc chính mới.
- **Thêm Mapping Giao thức**: Khi thêm hỗ trợ cho phiên bản giao thức client cũ hơn hoặc mới hơn.
- **Cập nhật Định nghĩa WIT**: Khi thêm hàm hoặc kiểu mới vào API plugin WebAssembly.

---

## Nguồn Dữ liệu

`pumpkin-codegen` đọc dữ liệu từ một số nguồn chính:

1. **Báo cáo Bộ tạo Dữ liệu Minecraft**: Được tạo bằng cách chạy `java -DbundlerMainClass=net.minecraft.data.Main -jar server.jar --reports`.
2. **Asset Client Minecraft**: Được trích xuất từ các file `.jar` client cho các khóa bản dịch, hình dạng model và mapping âm thanh.
3. **Wiki Giao thức Minecraft**: Được tham khảo chéo với các đặc tả giao thức cho ID packet.
