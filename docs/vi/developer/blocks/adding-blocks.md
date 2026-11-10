# Thêm Hành vi Block

Hướng dẫn này đi qua việc triển khai hành vi tương tác cho một block trong Pumpkin.

---

## Khi Nào Cần Hành vi?

- **Block Không Tương tác** (ví dụ: stone, dirt, terracotta): **Không** yêu cầu bất kỳ code Rust tùy chỉnh nào. Tốc độ phá, độ cứng và thuộc tính đặt của chúng được tự động derives từ `pumpkin-data`.
- **Block Tương tác hoặc Chức năng** (ví dụ: doors, chests, levers, crops, campfires, TNT): Yêu cầu triển khai trait `BlockBehaviour` để phản hồi các cú nhấp của người chơi, tín hiệu redstone, bước vật lý hoặc các tick bộ đếm thời gian.

---

## Bước 1: Tạo Struct Hành vi

Tạo một file mới dưới `crates/pumpkin/src/block/blocks/<category>/<block_name>.rs` (hoặc trực tiếp trong `crates/pumpkin/src/block/blocks/`).

Sử dụng macro `#[pumpkin_block(...)]` để liên kết struct hành vi của bạn với một hoặc nhiều định danh block vanilla:

```rust
use std::sync::Arc;
use pumpkin_data::Block;
use pumpkin_data::block_properties::{DoorLikeProperties, Facing};
use pumpkin_macros::pumpkin_block;
use pumpkin_util::math::position::BlockPos;
use crate::block::registry::BlockActionResult;
use crate::block::{
    BlockBehaviour, NormalUseArgs, OnNeighborUpdateArgs, PlacedArgs, UseWithItemArgs,
};
use crate::world::World;

/// Liên kết struct hành vi này với một hoặc nhiều ID block.
#[pumpkin_block([
    "minecraft:oak_door",
    "minecraft:iron_door",
    "minecraft:spruce_door",
    "minecraft:birch_door"
])]
pub struct DoorBlock;

impl BlockBehaviour for DoorBlock {
    fn normal_use(&self, args: NormalUseArgs<'_>) -> BlockActionResult {
        let state_id = args.world.get_block_state(args.location).await;

        // Cửa sắt yêu cầu nguồn điện redstone và không thể mở thủ công bằng tay
        if args.block.id == pumpkin_data::Block::IRON_DOOR.id {
            return BlockActionResult::Pass;
        }

        // Chuyển đổi trạng thái mở
        let is_open = DoorLikeProperties::open(state_id);
        let new_state = DoorLikeProperties::with_open(state_id, !is_open);
        args.world.set_block_state(args.location, new_state).await;

        BlockActionResult::Consume
    }

    fn on_neighbor_update(&self, args: OnNeighborUpdateArgs<'_>) {
        // Xử lý tín hiệu redstone từ block lân cận hoặc phá block hỗ trợ
    }
}
```

---

## Bước 2: Tham chiếu Hook `BlockBehaviour`

Trait `BlockBehaviour` hiển thị các hook vòng đời mô phỏng theo cơ chế vanilla:

### Hook Tương tác Người chơi & Vật phẩm

| Hook | Chữ ký | Mô tả |
| :--- | :--- | :--- |
| `normal_use` | `(&self, args: NormalUseArgs<'_>) -> BlockActionResult` | Được kích hoạt khi chuột phải vào block với tay trống. |
| `use_with_item` | `(&self, args: UseWithItemArgs<'_>) -> BlockActionResult` | Được kích hoạt khi chuột phải vào block khi đang cầm vật phẩm. |
| `get_screen_handler_factory` | `(&self, args: GetScreenHandlerFactoryArgs<'_>) -> Option<Box<dyn ScreenHandlerFactory>>` | Trả về một factory container kho để mở màn hình UI (ví dụ: Rương, Bàn chế tạo). |

### Hook Vòng đời Thế giới & Vật lý

| Hook | Chữ ký | Mô tả |
| :--- | :--- | :--- |
| `placed` | `(&self, args: PlacedArgs<'_>)` | Được kích hoạt ngay sau khi block được đặt trong thế giới. |
| `broken` | `(&self, args: BrokenArgs<'_>)` | Được kích hoạt khi bị phá bởi người chơi hoặc cơ chế game. |
| `on_entity_collision` | `(&self, args: OnEntityCollisionArgs<'_>)` | Được kích hoạt khi một thực thể đi vào, bước lên hoặc rơi vào block. |
| `on_neighbor_update` | `(&self, args: OnNeighborUpdateArgs<'_>)` | Được kích hoạt khi trạng thái block liền kề cập nhật hoặc bị phá hủy. |
| `on_projectile_hit` | `(&self, args: OnProjectileHitArgs<'_>)` | Được kích hoạt khi mũi tên, quả cầu tuyết hoặc đạn va chạm vào block. |

### Hook Redstone & Điện

| Hook | Chữ ký | Mô tả |
| :--- | :--- | :--- |
| `emits_redstone_power` | `(&self, state_id: BlockStateId) -> bool` | Khai báo liệu block có phát năng lượng redstone cho các block lân cận. |
| `get_weak_redstone_power` | `(&self, ...) -> u8` | Trả về mức năng lượng yếu được phát (0–15). |
| `get_strong_redstone_power` | `(&self, ...) -> u8` | Trả về mức năng lượng mạnh trực tiếp được phát (0–15). |

### Hook Đồ thực vật & Bonemeal

| Hook | Chữ ký | Mô tả |
| :--- | :--- | :--- |
| `is_valid_bonemeal_target` | `(&self, args: BonemealArgs<'_>) -> bool` | Kiểm tra xem bonemeal có thể áp dụng (ví dụ: cây trồng chưa trưởng thành). |
| `is_bonemeal_success` | `(&self, args: BonemealArgs<'_>) -> bool` | Đánh giá ngẫu nhiên thành công bonemeal. |
| `perform_bonemeal` | `(&self, args: BonemealArgs<'_>)` | Tiến hành các giai đoạn tăng trưởng hoặc tạo thực vật lân cận. |

---

## Bước 3: Thay đổi Trạng thái Block

Tất cả thuộc tính block được định kiểu mạnh trong `pumpkin_data::block_properties`:

```rust
use pumpkin_data::block_properties::{BedLikeProperties, Part};

// 1. Đọc thuộc tính được định kiểu từ BlockStateId dạng số
let part = BedLikeProperties::part(state_id); // Part::Head hoặc Part::Foot
let is_occupied = BedLikeProperties::occupied(state_id);

// 2. Tạo BlockStateId mới với thuộc tính đã cập nhật
let updated_state = BedLikeProperties::with_occupied(state_id, true);

// 3. Áp dụng trạng thái đã cập nhật vào thế giới
world.set_block_state(pos, updated_state).await;
```

---

## Bước 4: Thêm một Block Entity (Tile Entity)

Nếu block của bạn cần lưu trữ trạng thái tùy chỉnh liên tục (kho, văn bản tùy chỉnh, bộ đếm thời gian):

1. Tạo một struct block entity trong `crates/pumpkin/src/block/entities/`:
   ```rust
   use pumpkin_util::math::position::BlockPos;
   use crate::block::entities::BlockEntity;

   pub struct CustomBlockEntity {
       pub pos: BlockPos,
       pub custom_counter: u32,
   }

   impl BlockEntity for CustomBlockEntity {
       fn to_nbt(&self) -> pumpkin_nbt::compound::NbtCompound {
           let mut compound = pumpkin_nbt::compound::NbtCompound::new();
           compound.put_int("Counter", self.custom_counter as i32);
           compound
       }

       fn from_nbt(&mut self, tag: &pumpkin_nbt::compound::NbtCompound) {
           if let Some(val) = tag.get_int("Counter") {
               self.custom_counter = val as u32;
           }
       }

       fn tick(&mut self, world: &std::sync::Arc<crate::world::World>, pos: &BlockPos) {
           // Logic định kỳ mỗi tick game
       }
   }
   ```

2. Liên kết block entity trong `BlockBehaviour` của bạn:
   ```rust
   impl BlockBehaviour for CustomBlock {
       fn create_block_entity(&self, pos: BlockPos) -> Option<Arc<Mutex<dyn BlockEntity>>> {
           Some(Arc::new(Mutex::new(CustomBlockEntity::new(pos))))
       }
   }
   ```

---

## Bước 5: Đăng ký Block

1. Xuất module của bạn trong `crates/pumpkin/src/block/blocks/mod.rs`:
   ```rust
   pub mod doors;
   ```

2. Đăng ký struct hành vi trong `crates/pumpkin/src/block/registry.rs`:
   ```rust
   manager.register(DoorBlock);
   ```

Khi khởi động, `manager.register` tự động đọc các ID block được khai báo trong `#[pumpkin_block(...)]` và định tuyến các tương tác đến triển khai của bạn.
