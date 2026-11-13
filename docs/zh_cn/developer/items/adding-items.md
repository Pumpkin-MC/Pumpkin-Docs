# 添加物品行为

本指南详细介绍如何在 Pumpkin 中为物品实现自定义交互机制。

---

## 何时需要物品行为？

- **被动物品**（例如钻石、金锭、木棍）：**不**需要自定义 Rust 代码。它们的堆叠数量、工具类别和合成配方由 `pumpkin-data` 与 `pumpkin-inventory` 自动处理。
- **交互物品**（例如雪球、末影珍珠、锄、弓、药水）：需要实现 `ItemBehaviour`，以处理右键事件、冷却时间、动画和实体生成。

---

## 第 1 步：定义物品结构体与元数据

在 `crates/pumpkin/src/item/items/<item_name>.rs` 下创建新文件（例如 `items/snowball.rs`）：

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

// 1. 声明关联的数字物品 ID
impl ItemMetadata for SnowBallItem {
    fn ids() -> Box<[u16]> {
        [Item::SNOWBALL.id].into()
    }
}

// 2. 实现交互行为
impl ItemBehaviour for SnowBallItem {
    fn normal_use(&self, _item: &Item, player: &Player) {
        let position = player.position();
        let world = player.world();

        // 播放投掷音效
        world.play_sound(
            Sound::EntitySnowballThrow,
            SoundCategory::Neutral,
            &position,
        );

        // 构造并发射弹射物实体
        let entity = Entity::new(world.clone(), position, &EntityType::SNOWBALL);
        let snowball = SnowballEntity::new_shot(entity, player.get_entity());
        let (yaw, pitch) = player.rotation();
        snowball.thrown.set_velocity_from(pitch, yaw, 0.0, 1.5, 1.0);
        world.spawn_entity(Arc::new(snowball));

        // 除非处于创造模式，否则安全减少手持物品
        let mut held = player.inventory.held_item();
        held.decrement_unless_creative(player.gamemode.load(), 1);
        player.inventory.set_held_item(held);
    }
}
```

---

## 第 2 步：`ItemBehaviour` 钩子参考

`ItemBehaviour` trait 为不同交互模型提供完整的钩子：

### 即时单次使用钩子

| 钩子 | 签名 | 说明 |
| :--- | :--- | :--- |
| `normal_use` | `(&self, item: &Item, player: &Player)` | 对着空气右键时触发。 |
| `normal_use_with_rotation` | `(&self, item: &Item, player: &Player, yaw: f32, pitch: f32)` | 提供客户端上报的视角角度，用于精确射线检测和瞄准。 |
| `use_on_block` | `(&self, item: &mut ItemStack, player: &Player, location: BlockPos, face: BlockDirection, cursor_pos: Vector3<f32>, block: &Block, server: &Server) -> BlockActionResult` | 右键方块某个面时触发（例如用斧给原木去皮、用锄耕地）。 |
| `use_on_entity` | `(&self, item: &mut ItemStack, player: &Player, entity: Arc<dyn EntityBase>)` | 右键另一个生物实体时触发（例如剪羊毛、使用命名牌）。 |

### 持续使用与计时钩子

| 钩子 | 签名 | 说明 |
| :--- | :--- | :--- |
| `get_use_duration` | `(&self) -> i32` | 完成动作所需的 tick 时长（例如食物为 `32` tick，弓为 `72000` tick）。 |
| `on_use_tick` | `(&self, stack: &ItemStack, player: &Player, remaining_use_ticks: i32)` | 按住右键期间每 tick 执行。 |
| `on_stopped_using` | `(&self, stack: &ItemStack, player: &Player)` | 玩家松开右键时触发（例如发射蓄力后的弓）。 |

---

## 第 3 步：耐久度与冷却时间

### 安全减少堆叠数量

始终使用 `decrement_unless_creative`，确保生存模式玩家消耗物品，而创造模式玩家保留物品：

```rust
item_stack.decrement_unless_creative(player.gamemode.load(), 1);
```

### 应用冷却时间

用于防止动作刷屏（例如末影珍珠、紫颂果）：

```rust
// 为末影珍珠开始 20 tick（1 秒）冷却
player.start_cooldown(Item::ENDER_PEARL.registry_key.to_string(), 20);
```

---

## 第 4 步：注册物品

1. 在 `crates/pumpkin/src/item/items/mod.rs` 中导出模块：

   ```rust
   pub mod snowball;
   ```

2. 在 `crates/pumpkin/src/item/registry.rs` 中注册结构体：

   ```rust
   items.register(SnowBallItem);
   ```

服务器初始化时，`items.register` 会把 `ItemMetadata::ids()` 中声明的 ID 映射到你的行为实例。
