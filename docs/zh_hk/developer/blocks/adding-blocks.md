# 新增方塊行為

本指南介紹如何在 Pumpkin 中為方塊實現互動行為。

---

## 何時需要行為？

- **非互動方塊**（例如石頭、泥土、陶瓦）：**不需要**任何自訂 Rust 程式碼。它們的破壞速度、硬度和放置屬性會自動從 `pumpkin-data` 派生。
- **互動或功能方塊**（例如門、箱子、拉桿、作物、營火、TNT）：需要實現 `BlockBehaviour` trait，以回應玩家點選、紅石信號、物理步進或計時器 tick 更新。

---

## 第 1 步：建立行為結構

在 `crates/pumpkin/src/block/blocks/<category>/<block_name>.rs` 下建立新檔案（也可直接放在 `crates/pumpkin/src/block/blocks/` 中）。

使用 `#[pumpkin_block(...)]` 巨集將行為結構與一個或多個原版方塊識別符號關聯：

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

/// 將此行為結構與一個或多個方塊 ID 關聯。
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

        // 鐵門需要紅石訊號，無法徒手開啟
        if args.block.id == pumpkin_data::Block::IRON_DOOR.id {
            return BlockActionResult::Pass;
        }

        // 切換開啟狀態
        let is_open = DoorLikeProperties::open(state_id);
        let new_state = DoorLikeProperties::with_open(state_id, !is_open);
        args.world.set_block_state(args.location, new_state).await;

        BlockActionResult::Consume
    }

    fn on_neighbor_update(&self, args: OnNeighborUpdateArgs<'_>) {
        // 處理相鄰方塊的紅石訊號或支撐方塊破壞
    }
}
```

---

## 第 2 步：`BlockBehaviour` 鉤子參考

`BlockBehaviour` trait 公開了以原版機制為模型的生命週期鉤子：

### 玩家與物品互動鉤子

| 鉤子 | 簽名 | 說明 |
| :--- | :--- | :--- |
| `normal_use` | `(&self, args: NormalUseArgs<'_>) -> BlockActionResult` | 空手右鍵點選方塊時觸發。 |
| `use_with_item` | `(&self, args: UseWithItemArgs<'_>) -> BlockActionResult` | 手持物品右鍵點選方塊時觸發。 |
| `get_screen_handler_factory` | `(&self, args: GetScreenHandlerFactoryArgs<'_>) -> Option<Box<dyn ScreenHandlerFactory>>` | 返回用於開啟 UI 界面的物品欄容器工廠（例如箱子、工作臺）。 |

### 世界生命週期與物理鉤子

| 鉤子 | 簽名 | 說明 |
| :--- | :--- | :--- |
| `placed` | `(&self, args: PlacedArgs<'_>)` | 方塊放置到世界中後立即觸發。 |
| `broken` | `(&self, args: BrokenArgs<'_>)` | 被玩家或遊戲機制破壞時觸發。 |
| `on_entity_collision` | `(&self, args: OnEntityCollisionArgs<'_>)` | 實體走進、踩到或落入方塊時觸發。 |
| `on_neighbor_update` | `(&self, args: OnNeighborUpdateArgs<'_>)` | 相鄰方塊狀態更新或被破壞時觸發。 |
| `on_projectile_hit` | `(&self, args: OnProjectileHitArgs<'_>)` | 箭、雪球或其他彈射物擊中方塊時觸發。 |

### 紅石與能量鉤子

| 鉤子 | 簽名 | 說明 |
| :--- | :--- | :--- |
| `emits_redstone_power` | `(&self, state_id: BlockStateId) -> bool` | 宣告方塊是否向相鄰方塊輸出紅石信號。 |
| `get_weak_redstone_power` | `(&self, ...) -> u8` | 返回輸出的弱充能等級（0–15）。 |
| `get_strong_redstone_power` | `(&self, ...) -> u8` | 返回輸出的強直接充能等級（0–15）。 |

### 植物與骨粉鉤子

| 鉤子 | 簽名 | 說明 |
| :--- | :--- | :--- |
| `is_valid_bonemeal_target` | `(&self, args: BonemealArgs<'_>) -> bool` | 檢查是否可以使用骨粉（例如作物尚未完全成熟）。 |
| `is_bonemeal_success` | `(&self, args: BonemealArgs<'_>) -> bool` | 計算骨粉是否成功的隨機機率。 |
| `perform_bonemeal` | `(&self, args: BonemealArgs<'_>)` | 推進生長階段或在相鄰位置生成植物。 |

---

## 第 3 步：修改方塊狀態

`pumpkin_data::block_properties` 中的所有方塊屬性都是強類型的：

```rust
use pumpkin_data::block_properties::{BedLikeProperties, Part};

// 1. 從數字 BlockStateId 讀取型別化屬性
let part = BedLikeProperties::part(state_id); // Part::Head 或 Part::Foot
let is_occupied = BedLikeProperties::occupied(state_id);

// 2. 生成屬性已更新的新 BlockStateId
let updated_state = BedLikeProperties::with_occupied(state_id, true);

// 3. 將更新後的狀態提交到世界
world.set_block_state(pos, updated_state).await;
```

---

## 第 4 步：新增方塊實體（Tile Entity）

如果你的方塊需要儲存持久化的自訂狀態（物品欄、自訂文字、計時器）：

1. 在 `crates/pumpkin/src/block/entities/` 中建立方塊實體結構：
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
           // 每 tick 執行一次的週期邏輯
       }
   }
   ```

2. 在你的 `BlockBehaviour` 中關聯方塊實體：
   ```rust
   impl BlockBehaviour for CustomBlock {
       fn create_block_entity(&self, pos: BlockPos) -> Option<Arc<Mutex<dyn BlockEntity>>> {
           Some(Arc::new(Mutex::new(CustomBlockEntity::new(pos))))
       }
   }
   ```

---

## 第 5 步：註冊方塊

1. 在 `crates/pumpkin/src/block/blocks/mod.rs` 中匯出你的模組：
   ```rust
   pub mod doors;
   ```

2. 在 `crates/pumpkin/src/block/registry.rs` 中註冊行為結構：
   ```rust
   manager.register(DoorBlock);
   ```

啟動時，`manager.register` 會自動讀取 `#[pumpkin_block(...)]` 中宣告的方塊 ID，並將互動路由到你的實現。
