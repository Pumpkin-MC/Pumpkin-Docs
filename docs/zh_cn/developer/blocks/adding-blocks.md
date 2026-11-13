# 添加方块行为

本指南介绍如何在 Pumpkin 中为方块实现交互行为。

---

## 何时需要行为？

- **非交互方块**（例如石头、泥土、陶瓦）：**不需要**任何自定义 Rust 代码。它们的破坏速度、硬度和放置属性会自动从 `pumpkin-data` 派生。
- **交互或功能方块**（例如门、箱子、拉杆、作物、营火、TNT）：需要实现 `BlockBehaviour` trait，以响应玩家点击、红石信号、物理步进或计时器 tick 更新。

---

## 第 1 步：创建行为结构体

在 `crates/pumpkin/src/block/blocks/<category>/<block_name>.rs` 下创建新文件（也可直接放在 `crates/pumpkin/src/block/blocks/` 中）。

使用 `#[pumpkin_block(...)]` 宏将行为结构体与一个或多个原版方块标识符关联：

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

/// 将此行为结构体与一个或多个方块 ID 关联。
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

        // 铁门需要红石信号，无法徒手打开
        if args.block.id == pumpkin_data::Block::IRON_DOOR.id {
            return BlockActionResult::Pass;
        }

        // 切换开启状态
        let is_open = DoorLikeProperties::open(state_id);
        let new_state = DoorLikeProperties::with_open(state_id, !is_open);
        args.world.set_block_state(args.location, new_state).await;

        BlockActionResult::Consume
    }

    fn on_neighbor_update(&self, args: OnNeighborUpdateArgs<'_>) {
        // 处理相邻方块的红石信号或支撑方块破坏
    }
}
```

---

## 第 2 步：`BlockBehaviour` 钩子参考

`BlockBehaviour` trait 公开了以原版机制为模型的生命周期钩子：

### 玩家与物品交互钩子

| 钩子 | 签名 | 说明 |
| :--- | :--- | :--- |
| `normal_use` | `(&self, args: NormalUseArgs<'_>) -> BlockActionResult` | 空手右键点击方块时触发。 |
| `use_with_item` | `(&self, args: UseWithItemArgs<'_>) -> BlockActionResult` | 手持物品右键点击方块时触发。 |
| `get_screen_handler_factory` | `(&self, args: GetScreenHandlerFactoryArgs<'_>) -> Option<Box<dyn ScreenHandlerFactory>>` | 返回用于打开 UI 界面的物品栏容器工厂（例如箱子、工作台）。 |

### 世界生命周期与物理钩子

| 钩子 | 签名 | 说明 |
| :--- | :--- | :--- |
| `placed` | `(&self, args: PlacedArgs<'_>)` | 方块放置到世界中后立即触发。 |
| `broken` | `(&self, args: BrokenArgs<'_>)` | 被玩家或游戏机制破坏时触发。 |
| `on_entity_collision` | `(&self, args: OnEntityCollisionArgs<'_>)` | 实体走进、踩到或落入方块时触发。 |
| `on_neighbor_update` | `(&self, args: OnNeighborUpdateArgs<'_>)` | 相邻方块状态更新或被破坏时触发。 |
| `on_projectile_hit` | `(&self, args: OnProjectileHitArgs<'_>)` | 箭、雪球或其他弹射物击中方块时触发。 |

### 红石与能量钩子

| 钩子 | 签名 | 说明 |
| :--- | :--- | :--- |
| `emits_redstone_power` | `(&self, state_id: BlockStateId) -> bool` | 声明方块是否向相邻方块输出红石信号。 |
| `get_weak_redstone_power` | `(&self, ...) -> u8` | 返回输出的弱充能等级（0–15）。 |
| `get_strong_redstone_power` | `(&self, ...) -> u8` | 返回输出的强直接充能等级（0–15）。 |

### 植物与骨粉钩子

| 钩子 | 签名 | 说明 |
| :--- | :--- | :--- |
| `is_valid_bonemeal_target` | `(&self, args: BonemealArgs<'_>) -> bool` | 检查是否可以使用骨粉（例如作物尚未完全成熟）。 |
| `is_bonemeal_success` | `(&self, args: BonemealArgs<'_>) -> bool` | 计算骨粉是否成功的随机概率。 |
| `perform_bonemeal` | `(&self, args: BonemealArgs<'_>)` | 推进生长阶段或在相邻位置生成植物。 |

---

## 第 3 步：修改方块状态

`pumpkin_data::block_properties` 中的所有方块属性都是强类型的：

```rust
use pumpkin_data::block_properties::{BedLikeProperties, Part};

// 1. 从数字 BlockStateId 读取类型化属性
let part = BedLikeProperties::part(state_id); // Part::Head 或 Part::Foot
let is_occupied = BedLikeProperties::occupied(state_id);

// 2. 生成属性已更新的新 BlockStateId
let updated_state = BedLikeProperties::with_occupied(state_id, true);

// 3. 将更新后的状态提交到世界
world.set_block_state(pos, updated_state).await;
```

---

## 第 4 步：添加方块实体（Tile Entity）

如果你的方块需要存储持久化的自定义状态（物品栏、自定义文本、计时器）：

1. 在 `crates/pumpkin/src/block/entities/` 中创建方块实体结构体：
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
           // 每 tick 执行一次的周期逻辑
       }
   }
   ```

2. 在你的 `BlockBehaviour` 中关联方块实体：
   ```rust
   impl BlockBehaviour for CustomBlock {
       fn create_block_entity(&self, pos: BlockPos) -> Option<Arc<Mutex<dyn BlockEntity>>> {
           Some(Arc::new(Mutex::new(CustomBlockEntity::new(pos))))
       }
   }
   ```

---

## 第 5 步：注册方块

1. 在 `crates/pumpkin/src/block/blocks/mod.rs` 中导出你的模块：
   ```rust
   pub mod doors;
   ```

2. 在 `crates/pumpkin/src/block/registry.rs` 中注册行为结构体：
   ```rust
   manager.register(DoorBlock);
   ```

启动时，`manager.register` 会自动读取 `#[pumpkin_block(...)]` 中声明的方块 ID，并将交互路由到你的实现。
