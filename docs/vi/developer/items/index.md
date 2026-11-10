# Kiến trúc Vật phẩm & Các Thành phần Dữ liệu

Vật phẩm đại diện cho các đối tượng game có thể di chuyển được giữ trong kho đồ của người chơi, thanh công cụ, khe giáp và các container trong thế giới. Trong Pumpkin, việc xử lý vật phẩm được chia thành hai phân hệ chính:

1. **Lớp Dữ liệu Tĩnh ([`pumpkin-data`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-data))**: Metadata được tạo tại thời điểm biên dịch bao gồm ID vật phẩm, kích thước chồng tối đa, độ bền tối đa, thuộc tính cấp độ công cụ, giá trị dinh dưỡng thực phẩm, và các thành phần dữ liệu được tạo bởi [`pumpkin-codegen`](/developer/codegen).
2. **Lớp Hành vi Động ([`pumpkin::item`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/item))**: Các hành động click-phải tương tác, phóng vật thể, thời gian ăn, lắp tên, và tương tác khối được xử lý thông qua trait `ItemBehaviour`.

---

## Vật phẩm Tĩnh vs. Vật phẩm Có hành động

| Loại Vật phẩm | Mô tả | Ví dụ | Cần Struct Hành vi Runtime? |
| :--- | :--- | :--- | :--- |
| **Vật phẩm Thụ động** | Vật phẩm không có hiệu ứng click-phải | `diamond`, `stick`, `iron_ingot`, `feather` | Không — Việc xếp chồng, di chuyển, chế tạo và thả được xử lý tự động bởi `pumpkin-inventory`. |
| **Vật phẩm Khối Tiêu chuẩn** | Vật phẩm tương ứng trực tiếp với các khối có thể đặt | `stone`, `oak_planks`, `glass` | Không — Logic đặt khối truy vấn dữ liệu khối mục tiêu. |
| **Vật thể Phóng & Ném** | Vật phẩm sinh thành thực thể vật lý khi ném | `snowball`, `egg`, `ender_pearl`, `splash_potion` | Có — Triển khai `ItemBehaviour::normal_use`. |
| **Vật phẩm Kênh / Sạc** | Vật phẩm có thời gian sử dụng hoặc hoạt ảnh sạc | `bow`, `crossbow`, `spyglass`, `trident` | Có — Triển khai `get_use_duration`, `on_use_tick`, `on_stopped_using`. |
| **Công cụ Có Tương tác Khối**| Vật phẩm sửa đổi các khối hiện có trong thế giới | `hoe` (làm đất), `axe` (bark gốc), `shovel` (làm đường) | Có — Triển khai `ItemBehaviour::use_on_block`. |

---

## Cấu trúc `ItemStack`

Một `ItemStack` đại diện cho một instance của vật phẩm trong một container kho. Nó bao gồm:

- **`item`**: Tham chiếu đến định nghĩa [`Item`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-data/src/item.rs) tĩnh.
- **`item_count`**: Kích thước chồng hiện tại ($1 \le \text{count} \le \text{max\_stack\_size}$).
- **Các Thành phần Dữ liệu**: Các thuộc tính động được gắn vào chồng vật phẩm (tên tùy chỉnh, lore, giá trị sát thương, phép thuật, hiệu ứng thuốc).

```rust
use pumpkin_data::item::Item;
use pumpkin_data::item_stack::ItemStack;

// Tạo một chồng vật phẩm mới
let mut stack = ItemStack::new(1, Item::DIAMOND_SWORD);

// Giảm an toàn số lượng chồng, tôn trọng chế độ sáng tạo
stack.decrement_unless_creative(player.gamemode.load(), 1);
```

---

## Hệ thống Thành phần Dữ liệu

Minecraft hiện đại đại diện các thuộc tính vật phẩm thông qua các **Thành phần Dữ liệu** mô-đun:

| Thành phần | Trách nhiệm | Mô tả |
| :--- | :--- | :--- |
| `FoodImpl` | Dinh dưỡng & Bão hòa | Điều khiển điểm đói được khôi phục và tỷ lệ bão hòa. |
| `ConsumableImpl` | Cơ chế Tiêu thụ | Điều khiển thời gian ăn, hiệu ứng âm thanh và loại hoạt ảnh. |
| `Damageable` | Độ bền | Theo dõi điểm sát thương hiện tại và vỡ khi đạt độ bền tối đa. |
| `UseCooldown` | Nhóm Hồi chi | Ngăn việc sử dụng lại vật phẩm trong thời gian quy định tính bằng tick game. |
| `Enchantments` | Cấp độ Phép thuật | Ánh xạ key-value của các phép thuật đã áp dụng và cấp độ. |

---

## Sổ đăng ký Vật phẩm & Kiến trúc Điều phối

Các tương tác vật phẩm được quản lý bởi `ItemRegistry` trong [`crates/pumpkin/src/item/registry.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/item/registry.rs):

1. **Đăng ký**: Khi khởi động server, tất cả các triển khai `ItemBehaviour` được đăng ký cùng với các ID vật phẩm số mục tiêu của chúng.
2. **Định tuyến Tương tác**: Khi client gửi các gói sử dụng (`CUseItem`, `CUseItemOn`), Pumpkin đánh giá các hồi chi và điều phối việc thực thi đến `ItemBehaviour` đã đăng ký.
3. **Hệ thống Hồi chi**: Người chơi theo dõi các hồi chi đang hoạt động được khóa bằng chuỗi nhóm hồi chi. Nếu một vật phẩm đang trong thời gian hồi chi, các tương tác bị hủy trước khi gọi hành vi.

---

## Các Bước Tiếp theo

Để triển khai các cơ chế tương tác cho một vật phẩm mới, hãy tiếp tục với hướng dẫn thực tế:

- **[Thêm một Vật phẩm](/developer/items/adding-items)**: Hướng dẫn từng bước để triển khai `ItemMetadata`, `ItemBehaviour`, quản lý hồi chi và đăng ký vật phẩm.
