# Kiến trúc Block & Hệ thống State

Block hình thành nền tảng tĩnh và động của các thế giới Minecraft. Trong Pumpkin, việc xử lý block được phân chia rõ ràng thành hai lớp riêng biệt:

1. **Lớp Dữ liệu Tĩnh ([`pumpkin-data`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-data))**: Metadata được tạo tại thời điểm biên dịch gồm các ID block dạng số, ID trạng thái block, độ cứng, sức chống nổ, phát sáng, độ mờ, hình dạng va chạm và các thuộc tính trạng thái block được tạo bởi [`pumpkin-codegen`](/developer/codegen).
2. **Lớp Hành vi Động ([`pumpkin::block`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/block))**: Các hook hành vi phía server—như mở container, bật/tắt tín hiệu redstone, trồng cây, kích hoạt khi phá và hiệu ứng va chạm—được xử lý thông qua trait `BlockBehaviour`.

---

## Block Tĩnh so với Hành vi Tương tác

Vì Minecraft chứa hàng nghìn tổ hợp trạng thái block, Pumpkin tránh việc cấp phát struct hành vi runtime cho các block đơn giản, không tương tác:

| Danh mục | Mô tả | Ví dụ | Cần Hành vi Runtime? |
| :--- | :--- | :--- | :--- |
| **Block Tĩnh** | Các voxel rắn, cứng không có logic tương tác hoặc vật lý tùy chỉnh | `stone`, `dirt`, `cobblestone`, `bedrock`, `obsidian` | Không — Việc đặt, thời gian phá và yêu cầu công cụ được xử lý hoàn toàn bởi `pumpkin-data`. |
| **Block Tương tác** | Các block được kích hoạt bằng chuột phải hoặc hành động công cụ | `door`, `trapdoor`, `lever`, `button`, `crafting_table` | Có — Triển khai `BlockBehaviour::normal_use` hoặc `use_with_item`. |
| **Block Va chạm** | Các block sửa đổi chuyển động thực thể hoặc áp dụng lực | `honey_block`, `slime_block`, `soul_sand`, `powder_snow` | Có — Triển khai `on_entity_collision` hoặc `on_landed_upon`. |
| **Thành phần Redstone** | Nguồn điện, dây dẫn và cổng logic | `redstone_wire`, `repeater`, `comparator`, `observer` | Có — Triển khai `emits_redstone_power` và `on_neighbor_update`. |
| **Block Entity** | Các block với trạng thái tùy chỉnh liên tục, được tuần tự hóa | `chest`, `furnace`, `sign`, `decorated_pot`, `spawner` | Có — Triển khai `create_block_entity` và liên kết với `BlockEntity`. |

---

## ID Block, Trạng thái và Thuộc tính

Minecraft phân biệt giữa một loại **Block** và một **Block State** cụ thể:

### 1. `BlockId` và `BlockStateId`

- **`BlockId`**: Một định danh đại diện cho loại block cơ sở (ví dụ: `minecraft:oak_door`).
- **`BlockStateId`**: Một số nguyên 16-bit đại diện cho tổ hợp duy nhất các thuộc tính block (ví dụ: `minecraft:oak_door[facing=north,half=lower,hinge=left,open=false,powered=false]`).

Trong Pumpkin, dữ liệu block được tra cứu từ các bảng tra cứu được tính toán trước trong `pumpkin-data`:

```rust
use pumpkin_data::Block;
use pumpkin_data::BlockStateId;

// Truy cập thuộc tính tĩnh trực tiếp từ dữ liệu được tạo
let door_block = Block::OAK_DOOR;
let default_state_id: BlockStateId = door_block.default_state_id;

let hardness = door_block.hardness;
let blast_resistance = door_block.blast_resistance;
let is_air = door_block.is_air;
```

### 2. Các Helper Thuộc tính Trạng thái Được Tạo

Thay vì phân tích cú pháp chuỗi thô hoặc bitmask thủ công, [`pumpkin-codegen`](/developer/codegen) tạo ra các helper thuộc tính được định kiểu mạnh trong `pumpkin_data::block_properties`:

```rust
use pumpkin_data::block_properties::{DoorLikeProperties, DoubleBlockHalf, Facing};

// Đọc thuộc tính được định kiểu từ BlockStateId dạng số
let is_open = DoorLikeProperties::open(state_id);
let half = DoorLikeProperties::half(state_id);
let facing = DoorLikeProperties::facing(state_id);

// Tạo BlockStateId mới với thuộc tính đã thay đổi
let toggled_state_id = DoorLikeProperties::with_open(state_id, !is_open);
```

---

## Vật lý, Hộp bao và Raycasting

Pumpkin tính toán va chạm và raycasting các hộp bao trực tiếp sử dụng các hình dạng được nung sẵn trong `pumpkin-data`:

- **Va chạm Rắn**: Trong các tick vật lý, hộp bao song song với trục (AABB) của một thực thể được kiểm tra với các voxel va chạm block xung quanh.
- **Raycasting**: Khi người chơi nhắm mục tiêu một block để đặt hoặc phá, raycast từ client được xác thực với các hình dạng viền block phía server.
- **Hook Chuyển động Tùy chỉnh**: Các block như slime block hoặc honey block ghi đè độ nảy dọc hoặc vận tốc ngang:
  - `bounce_entity_after_fall`: Giảm sát thương khi rơi và nhân vận tốc nảy.
  - `stop_vertical_movement_after_fall`: Xóa vận tốc rơi khi tiếp xúc.

---

## Block Entity (Tile Entity)

Khi một block phải lưu trữ dữ liệu động tùy ý không thể vừa với các bit trạng thái block tiêu chuẩn (như kho container, văn bản sign tùy chỉnh, bộ đếm thời gian pha thuốc, hoặc độ trễ spawner mob), nó sử dụng một **Block Entity**:

| Thành phần | Trách nhiệm | File Triển khai |
| :--- | :--- | :--- |
| Trait `BlockEntity` | Định nghĩa tuần tự hóa NBT (`to_nbt`, `from_nbt`) và thực thi tick | [`crates/pumpkin/src/block/entities/`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/block/entities) |
| `create_block_entity` | Hook trong `BlockBehaviour` được gọi khi đặt block | Được gắn với các hành vi block liên quan |
| Chunk Entity Storage | Quản lý các block entity đang hoạt động và tọa độ trong các phần chunk | [`crates/pumpkin-world`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-world) |

---

## Block Registry & Hệ thống Dispatch

Các sự kiện tương tác block được định tuyến thông qua `BlockRegistry` trung tâm trong [`crates/pumpkin/src/block/registry.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/block/registry.rs):

1. **Đăng ký**: Khi khởi tạo server, tất cả các struct hành vi được đăng ký vào `BlockManager`.
2. **Ánh xạ**: Manager ánh xạ các khóa `BlockId` dạng số đến các instance hành vi thread-safe (`Arc<dyn BlockBehaviour>`).
3. **Dispatch**: Khi lớp mạng nhận các gói hành động block (như `CUseItemOn` hoặc gói đào block), server tra cứu hành vi trong thời gian $O(1)$ và gọi hook liên quan.

---

## Các Bước Tiếp theo

Để triển khai hành vi block tương tác mới, hãy tiếp tục với hướng dẫn thực tế:

- **[Thêm một Block](/developer/blocks/adding-blocks)**: Hướng dẫn đầy đủ về khai báo thuộc tính, triển khai hook tương tác, tạo block entity và đăng ký hành vi.
