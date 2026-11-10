# Thêm một Hành vi Vật phẩm

Hướng dẫn này chi tiết cách triển khai các cơ chế tương tác tùy chỉnh cho một vật phẩm trong Pumpkin.

---

## Khi nào Cần một Hành vi Vật phẩm?

- **Vật phẩm Thụ động** (ví dụ: kim cương, thỏi vàng, gậy): **Không** yêu cầu code Rust tùy chỉnh. Kích thước chồng, danh mục công cụ và công thức chế tạo của chúng được xử lý tự động bởi `pumpkin-data` và `pumpkin-inventory`.
- **Vật phẩm Tương tác** (ví dụ: cầu tuyết, ngọc ender, cuốc, cung, thuốc): Yêu cầu triển khai `ItemBehaviour` để xử lý các sự kiện click-phải, hồi chi, hoạt ảnh và sinh thực thể.

---

## Bước 1: Định nghĩa Struct Vật phẩm & Metadata

Tạo một file mới dưới `crates/pumpkin/src/item/items/<tên_vật_phẩm>.rs` (ví dụ: `items/snowball.rs`):

```rust
use std::sync::Arc;
use pumpkin_data::entity::EntityType;
use pumpkin_data::item::Item;
use pumpkin_data::sound::{Sound, SoundCategory};
use crate::entity::Entity;
use crate::entity::player::Player;
use crate::entity::projectile::snowball::SnowballEntity;
use crate::item::{ItemBehaviour, ItemMetadata};

pub struct SnowBallItem;

// 1. Khai báo (các) ID Vật phẩm số liên quan
impl ItemMetadata for SnowBallItem {
    fn ids() -> Box<[u16]> {
        [Item::SNOWBALL.id].into()
    }
}

// 2. Triển khai hành vi tương tác
impl ItemBehaviour for SnowBallItem {
    fn normal_use(&self, _item: &Item, player: &Player) {
        let position = player.position();
        let world = player.world();

        // Phát hiệu ứng âm thanh ném
        world.play_sound(
            Sound::EntitySnowballThrow,
            SoundCategory::Neutral,
            &position,
        );

        // Xây dựng và phóng thực thể vật thể
        let entity = Entity::new(world.clone(), position, &EntityType::SNOWBALL);
        let snowball = SnowballEntity::new_shot(entity, player.get_entity());
        let (yaw, pitch) = player.rotation();
        snowball.thrown.set_velocity_from(pitch, yaw, 0.0, 1.5, 1.0);
        world.spawn_entity(Arc::new(snowball));

        // Giảm an toàn vật phẩm đang giữ trừ khi ở chế độ Sáng tạo
        let mut held = player.inventory.held_item();
        held.decrement_unless_creative(player.gamemode.load(), 1);
        player.inventory.set_held_item(held);
    }
}
```

---

## Bước 2: Tài liệu tham khảo Hook `ItemBehaviour`

Trait `ItemBehaviour` cung cấp các hook toàn diện cho các mô hình tương tác khác nhau:

### Các Hook Sử dụng Đơn tức thì

| Hook | Chữ ký | Mô tả |
| :--- | :--- | :--- |
| `normal_use` | `(&self, item: &Item, player: &Player)` | Được kích hoạt khi click-phải vào khoảng không. |
| `normal_use_with_rotation` | `(&self, item: &Item, player: &Player, yaw: f32, pitch: f32)` | Cung cấp góc nhìn được client báo cáo để raycasting và ngắm chính xác. |
| `use_on_block` | `(&self, item: &mut ItemStack, player: &Player, location: BlockPos, face: BlockDirection, cursor_pos: Vector3<f32>, block: &Block, server: &Server) -> BlockActionResult` | Được kích hoạt khi click-phải vào mặt khối (ví dụ: bark gốc gỗ bằng rìu, làm đất bằng cuốc). |
| `use_on_entity` | `(&self, item: &mut ItemStack, player: &Player, entity: Arc<dyn EntityBase>)` | Được kích hoạt khi click-phải vào một thực thể sống khác (ví dụ: cắt lông cừu, thẻ tên). |

### Các Hook Kênh & Có thời gian

| Hook | Chữ ký | Mô tả |
| :--- | :--- | :--- |
| `get_use_duration` | `(&self) -> i32` | Thời lượng tính bằng tick game để hoàn thành hành động (ví dụ: `32` tick cho thức ăn, `72000` tick cho cung). |
| `on_use_tick` | `(&self, stack: &ItemStack, player: &Player, remaining_use_ticks: i32)` | Được thực thi mỗi tick khi giữ click-phải. |
| `on_stopped_using` | `(&self, stack: &ItemStack, player: &Player)` | Được kích hoạt khi người chơi nhả click-phải (ví dụ: bắn cung đã sạc). |

---

## Bước 3: Độ bền & Hồi chi

### Giảm Chồng an toàn
Luôn sử dụng `decrement_unless_creative` để đảm bảo người chơi sinh tồn tiêu thụ vật phẩm trong khi người chơi sáng tạo giữ chúng:

```rust
item_stack.decrement_unless_creative(player.gamemode.load(), 1);
```

### Áp dụng Hồi chi
Để ngăn spam hành động (ví dụ: Ngọc Ender, Trái Chorus):

```rust
// Bắt đầu hồi chi 20 tick (1 giây) trên Ngọc Ender
player.start_cooldown(Item::ENDER_PEARL.registry_key.to_string(), 20);
```

---

## Bước 4: Đăng ký Vật phẩm

1. Xuất module của bạn trong `crates/pumpkin/src/item/items/mod.rs`:
   ```rust
   pub mod snowball;
   ```

2. Đăng ký struct trong `crates/pumpkin/src/item/registry.rs`:
   ```rust
   items.register(SnowBallItem);
   ```

Khi khởi động server, `items.register` ánh xạ các ID được khai báo trong `ItemMetadata::ids()` đến instance hành vi của bạn.
