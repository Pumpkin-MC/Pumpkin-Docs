# Mở một túi đồ (inventory) tùy chỉnh

## Tổng quan (Overview)

Hệ thống túi đồ (inventory) trong Pumpkin cung cấp một phương pháp linh hoạt để quản lý và thao tác sự vận chuyển các vật phẩm chứa trong nó. Hướng dẫn này giải thích cách để tạo và triển khai các túi đồ tùy chỉnh.

## Mục lục (Table of Contents)

- [Mở một túi đồ (inventory) tùy chỉnh](#mở-một-túi-đồ-inventory-tùy-chỉnh)
  - [Tổng quan (Overview)](#tổng-quan-overview)
  - [Mục lục (Table of Contents)](#mục-lục-table-of-contents)
  - [Khởi tạo (Implement) túi đồ cơ bản](#implement-túi-đồ-inventory-cơ-bản)
  - [Các Trait yêu cầu phải có](#các-trait-yêu-cầu-phải-có)
    - [Inventory Trait](#inventory-trait)
    - [Clearable Trait](#clearable-trait)
  - [Các Screen Handlers](#các-screen-handlers)
    - [Sử dụng Generic Screen Handlers](#sử-dụng-generic-screen-handlers)
    - [Tạo Screen Handlers tùy chỉnh riêng](#tạo-screen-handlers-tùy-chỉnh-riêng)
  - [Phương pháp hiệu quả (Best Practices)](#phương-pháp-hiệu-quả-best-practices)
  - [Ví dụ (Examples)](#ví-dụ-examples)
    - [Cách dùng inventory cơ bản](#cách-dùng-inventory-cơ-bản)

## Implement túi đồ (inventory) cơ bản

Struct `BasicInventory` cung cấp một phương pháp implement tiêu chuẩn cho một túi đồ gồm 27 slot. Dưới đây là cách implement túi đồ của riêng bạn:

```rust
use pumpkin_world::{
    inventory::{
        split_stack, {Clearable, Inventory},
    },
    item::ItemStack,
};

#[derive(Debug)]
pub struct BasicInventory {
    pub items: [Arc<Mutex<ItemStack>>; 27],
}
```

## Các Trait yêu cầu phải có

### Inventory Trait

Trait tên là `Inventory` định nghĩa một số hàm (functionality) cốt lõi mà tất cả mọi inventory bắt buộc phải implement:

```rust
impl Inventory for BasicInventory {
    // Lấy tổng số lượng các slot của một inventory
    fn size(&self) -> usize {
        self.items.len()
    }

    // Kiểm tra liệu một inventory có trống rỗng hoàn toàn hay không
     fn is_empty(&self) -> InventoryFuture<'_, bool> {
        Box::pin(async move {
            for slot in self.items.iter() {
                if !slot.lock().await.is_empty() {
                    return false;
                }
            }

            true
        })
    }

    // Lấy object tham chiếu cho một danh mục vật phẩm (item stack) ở tại một slot cụ thể
    fn get_stack(&self, slot: usize) -> InventoryFuture<'_, Arc<Mutex<ItemStack>>> {
        Box::pin(async move { self.items[slot].clone() })
    }

    // Xóa và trả lại toàn bộ item stack ra khỏi một slot
  fn remove_stack(&self, slot: usize) -> InventoryFuture<'_, ItemStack> {
        Box::pin(async move {
            let mut removed = ItemStack::EMPTY.clone();
            let mut guard = self.items[slot].lock().await;
            std::mem::swap(&mut removed, &mut *guard);
            removed
        })
    }

    // Lấy một lượng vật phẩm nhất định ra khỏi một stack
   fn remove_stack_specific(&self, slot: usize, amount: u8) -> InventoryFuture<'_, ItemStack> {
        Box::pin(async move { split_stack(&self.items, slot, amount).await })
    }

    // Cài đặt đồ đạc (contents) cho một slot cụ thể
    fn set_stack(&self, slot: usize, stack: ItemStack) -> InventoryFuture<'_, ()> {
        Box::pin(async move {
            *self.items[slot].lock().await = stack;
        })
    }
}
```

### Clearable Trait

Trait `Clearable` cung cấp tính năng dọn sạch đồ của inventory. Điều này là bắt buộc phải được implement cho trait `Inventory`:

```rust
impl Clearable for YourInventory {
    fn clear(&self) -> Pin<Box<dyn Future<Output = ()> + Send + '_>> {
        Box::pin(async move {
            for item in self.items.iter() {
                *item.lock().await = ItemStack::EMPTY.clone();
            }
        })
    }
}
```

## Các Screen Handlers

Screen handlers (trình xử lý màn hình) được sử dụng để tạo và quản lý giao diện đồ họa người dùng của kho đồ (inventories). Chúng chịu trách nhiệm cho các công việc có thể kể tới như cho phép vật phẩm di chuyển giữa các ô slot ngàm lưới và quy định cách thức inventory tương tác với chính inventory gốc của người chơi.

### Sử dụng Generic Screen Handlers

Pumpkin cung cấp giao diện screen handler mang tính generic (tổng quát) dành cho đa số kiểu layout sắp xếp của kho túi đồ phổ thông. Đây là cách để sử dụng chúng:

```rust
use pumpkin_inventory::generic_container_screen_handler::create_generic_9x3;
use pumpkin_inventory::player::player_inventory::PlayerInventory;
use pumpkin_inventory::screen_handler::{InventoryPlayer, ScreenHandler, ScreenHandlerFactory};

struct MyScreenFactory {
    inventory: Arc<dyn Inventory>,
}

impl ScreenHandlerFactory for MyScreenFactory {
    fn create_screen_handler(
        &self,
        sync_id: u8,
        player_inventory: &Arc<PlayerInventory>,
        _player: &dyn InventoryPlayer,
    ) -> Option<Arc<Mutex<dyn ScreenHandler>>> {
        Some(Arc::new(Mutex::new(create_generic_9x3(
            sync_id,
            player_inventory,
            self.inventory.clone(),
        ))))
    }

    fn get_display_name(&self) -> TextComponent {
        TextComponent::translate("container.barrel", vec![])
    }
}

// Tạo một screen factory (hệ quy chuẩn)
let factory = MyScreenFactory {
    inventory: inventory.clone(),
};

// Mở kho túi đồ này cho một người chơi bất kỳ
player.open_handled_screen(factory).await;

// Screen này sẽ tự động handle các thao tác:
// - Vận chuyển vật dụng đi qua lại các ô ngàm slots
// - Cung cấp khả năng vận chuyển nhanh (quick move logic)
// - Cùng khả năng làm việc với kho đồ của chính người chơi sở hữu
// - Và cũng như việc ngắt hoạt động (tiến trình đóng) screen (giao diện)
```

### Tạo Screen Handlers tùy chỉnh riêng

Bạn có thể tự tạo cho mình các hạng mục screen handler tùy chỉnh (custom) bằng cách implement trait tên `ScreenHandler`. Nó mang lại cho bạn sự tự do linh hoạt hơn và mở đường giúp bạn code màn hình dùng cho các tiện ích bổ ích thay vì cứ gò bó chúng với vai trò là một túi chứa hàng Inventory cục mịch.

Để mà tạo ra được cho mình một custom screen handler, bạn có thể triển khai một struct mới và gán ghép với trait `Slot`. Ở đây có một ví dụ cấu trúc tên `NormalSlot`, đó là một trait mặc định sẵn được giao nhượng bởi Pumpkin. Mục tiêu là để đóng vai trò index chiếu vào inventory và không có bất kỳ rào cản hạn chế ngăn nào được cắm vào nó.

TODO: Cung cấp ví dụ về Custom slot (slot tùy chỉnh)

Dưới đây là ví dụ về source code (mã nguồn tham khảo nguyên bản) cho generic screen handler:

```rust
use std::{any::Any, sync::Arc};


use pumpkin_data::screen::WindowType;
use pumpkin_world::{inventory::Inventory, item::ItemStack};

use pumpkin_world::{
    player::player_inventory::PlayerInventory,
    screen_handler::{InventoryPlayer, ScreenHandler, ScreenHandlerBehaviour},
    slot::NormalSlot,
};

pub fn create_generic_9x3(
    sync_id: u8,
    player_inventory: &Arc<PlayerInventory>,
    inventory: Arc<dyn Inventory>,
) -> GenericContainerScreenHandler {
    GenericContainerScreenHandler::new(
        WindowType::Generic9x3,
        sync_id,
        player_inventory,
        inventory,
        3,
    )
}

pub struct GenericContainerScreenHandler {
    pub inventory: Arc<dyn Inventory>,
    pub rows: u8,
    behaviour: ScreenHandlerBehaviour,
}

impl GenericContainerScreenHandler {
    fn new(
        screen_type: WindowType,
        sync_id: u8,
        player_inventory: &Arc<PlayerInventory>,
        inventory: Arc<dyn Inventory>,
        rows: u8,
    ) -> Self {
        let mut handler = Self {
            inventory,
            rows,
            behaviour: ScreenHandlerBehaviour::new(sync_id, Some(screen_type)),
        };

        handler.add_inventory_slots();
        let player_inventory: Arc<dyn Inventory> = player_inventory.clone();
        handler.add_player_slots(&player_inventory);

        handler
    }

    fn add_inventory_slots(&mut self) {
        for i in 0..self.rows {
            for j in 0..9 {
                self.add_slot(Arc::new(NormalSlot::new(
                    self.inventory.clone(),
                    (j + i * 9) as usize,
                )));
            }
        }
    }
}

impl ScreenHandler for GenericContainerScreenHandler {
    fn on_closed<'a>(&'a mut self, player: &'a dyn InventoryPlayer) -> ScreenHandlerFuture<'a, ()> {
        Box::pin(async move {
            self.default_on_closed(player).await;
            self.inventory.on_close().await;
        })
    }

    fn as_any(&self) -> &dyn Any {
        self
    }

    fn get_behaviour(&self) -> &ScreenHandlerBehaviour {
        &self.behaviour
    }

    fn get_behaviour_mut(&mut self) -> &mut ScreenHandlerBehaviour {
        &mut self.behaviour
    }

    fn quick_move<'a>(
        &'a mut self,
        _player: &'a dyn InventoryPlayer,
        slot_index: i32,
    ) -> ItemStackFuture<'a> {
        Box::pin(async move {
            let mut stack_left = ItemStack::EMPTY.clone();
            // Lấy giả định vòng kiểm tra bounds check dành cho slot_index (index ô túi đồ) truyền bởi caller hoặc nằm trong đặc điểm quick_move được thông qua
            let slot = self.get_behaviour().slots[slot_index as usize].clone();

            if slot.has_stack().await {
                let slot_stack_lock = slot.get_stack().await;
                let slot_stack_guard = slot_stack_lock.lock().await;
                stack_left = slot_stack_guard.clone();
                // Phóng thích guard bảo hộ trước khi kích hoạt insert_item, thứ mà cần khóa cấu hình nội hàm (lock) của riêng nó
                drop(slot_stack_guard);

                // Yêu cầu (Request) cấp lại khóa bảo hộ nhằm gọi hàm insert_item (vốn chờ cấu trúc dạng &mut ItemStack)
                let mut slot_stack_mut = slot_stack_lock.lock().await;

                if slot_index < (self.rows * 9) as i32 {
                    // Mệnh lệnh di chuyển vật liệu từ trong inventory đến khu vực đồ người chơi (điểm đến)
                    if !self
                        .insert_item(
                            &mut slot_stack_mut,
                            (self.rows * 9).into(),
                            self.get_behaviour().slots.len() as i32,
                            true,
                        )
                        .await
                    {
                        return ItemStack::EMPTY.clone();
                    }
                } else if !self
                    .insert_item(&mut slot_stack_mut, 0, (self.rows * 9).into(), false)
                    .await
                {
                    // Di chuyển vật thể từ khu trải đồ của người chơi lên kho diện inventory (vị trí đầu của màn di dời)
                    return ItemStack::EMPTY.clone();
                }

                // Chấm kiểm tra lại các cấu trúc trạng thái kết quả của một vật phẩm ở ô slot ngay sau khoảng thời gian kết thúc khởi động lệnh gọi lệnh insert_item
                if slot_stack_mut.is_empty() {
                    drop(slot_stack_mut); // Release lại khóa (lock) cho vật phẩm này
                    slot.set_stack(ItemStack::EMPTY.clone()).await;
                } else {
                    drop(slot_stack_mut); // Release lại khóa (lock)
                    slot.mark_dirty().await;
                }
            }

            stack_left
        })
    }
}
```

## Phương pháp hiệu quả (Best Practices)

1. **Bảo toàn luồng xử lý (Thread Safety)**
   - Hãy triển khai bắt xử lý lỗi (error handling) cẩn thận khi đối mặt với hàm check giới hạn slot index để tránh sai sót.
   - Luôn nhớ lệnh thả (drop) stack locks trước khi dở trò dùng tham lệnh như kiểu `inventory.set_stack()` hay với kiểu gọi `slot.get_cloned_stack()` với mục tiêu ngăn phần mềm bị dính trạng thái đơ chặn (deadlocks).

2. **Quản lý Inventory (Inventory Management)**
   - Hãy dùng hệ đồ họa hằng số của `ItemStack::EMPTY` nếu có bất kỳ dự định thao tác như là tống khứ hay làm sạch loạt slot (clearing) hoặc khởi định làm sạch tạo nên túi (initialize) dành riêng cho các túi đồ trống rỗng khác.

3. **Gắn nối tính năng Screen Handler (Screen Handler Implementation)**
   - Setup kịch bản đóng thoát Inventory một cách tinh anh thận trọng vì mục tiêu tránh các trường hợp sự cố bay đồ trớ trêu.
   - Nhớ đảm bảo là hãy check lại tổng số lượng slot này cộng chéo lên sẽ vừa đúng bằng tổng số slot cho sẵn tương đương trên kiểu Window type màn chiếu đã chọn.

## Ví dụ (Examples)

### Cách dùng inventory cơ bản

```rust
// Khởi tạo một inventory mới
let inventory = BasicInventory {
    items: [(); 27].map(|_| Arc::new(Mutex::new(ItemStack::EMPTY))),
};

// Đặt item mới cho một vị trí slot đang nhắm tới
inventory.set_stack(0, ItemStack::new(1, &Items::OAK_LOG)).await;

// Xóa vật phẩm vừa rồi ra khỏi slot đó
let removed = inventory.remove_stack(0).await;

// Check xem kho đồ đã không còn vật phẩm gì đúng ko
let is_empty = inventory.is_empty().await;
```
