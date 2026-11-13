# 新增物品行為

本指南詳細介紹如何在 Pumpkin 中為物品實現自訂互動機制。

---

## 何時需要物品行為？

- **被動物品**（例如鑽石、金錠、木棍）：**不**需要自訂 Rust 程式碼。它們的堆疊數量、工具類別和合成配方由 `pumpkin-data` 與 `pumpkin-inventory` 自動處理。
- **互動物品**（例如雪球、終界珍珠、鋤、弓、藥水）：需要實現 `ItemBehaviour`，以處理右鍵事件、冷卻時間、動畫和實體生成。

---

## 第 1 步：定義物品結構與元資料

在 `crates/pumpkin/src/item/items/<item_name>.rs` 下建立新檔案（例如 `items/snowball.rs`）：

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

// 1. 宣告關聯的數字物品 ID
impl ItemMetadata for SnowBallItem {
    fn ids() -> Box<[u16]> {
        [Item::SNOWBALL.id].into()
    }
}

// 2. 實現互動行為
impl ItemBehaviour for SnowBallItem {
    fn normal_use(&self, _item: &Item, player: &Player) {
        let position = player.position();
        let world = player.world();

        // 播放投擲音效
        world.play_sound(
            Sound::EntitySnowballThrow,
            SoundCategory::Neutral,
            &position,
        );

        // 構造併發射彈射物實體
        let entity = Entity::new(world.clone(), position, &EntityType::SNOWBALL);
        let snowball = SnowballEntity::new_shot(entity, player.get_entity());
        let (yaw, pitch) = player.rotation();
        snowball.thrown.set_velocity_from(pitch, yaw, 0.0, 1.5, 1.0);
        world.spawn_entity(Arc::new(snowball));

        // 除非處於創造模式，否則安全減少手持物品
        let mut held = player.inventory.held_item();
        held.decrement_unless_creative(player.gamemode.load(), 1);
        player.inventory.set_held_item(held);
    }
}
```

---

## 第 2 步：`ItemBehaviour` 鉤子參考

`ItemBehaviour` trait 為不同互動模型提供完整的鉤子：

### 即時單次使用鉤子

| 鉤子 | 簽名 | 說明 |
| :--- | :--- | :--- |
| `normal_use` | `(&self, item: &Item, player: &Player)` | 對著空氣右鍵時觸發。 |
| `normal_use_with_rotation` | `(&self, item: &Item, player: &Player, yaw: f32, pitch: f32)` | 提供用戶端上報的視角角度，用於精確射線檢測和瞄準。 |
| `use_on_block` | `(&self, item: &mut ItemStack, player: &Player, location: BlockPos, face: BlockDirection, cursor_pos: Vector3<f32>, block: &Block, server: &Server) -> BlockActionResult` | 右鍵方塊某個面時觸發（例如用斧給原木去皮、用鋤耕地）。 |
| `use_on_entity` | `(&self, item: &mut ItemStack, player: &Player, entity: Arc<dyn EntityBase>)` | 右鍵另一個生物實體時觸發（例如剪羊毛、使用命名牌）。 |

### 持續使用與計時鉤子

| 鉤子 | 簽名 | 說明 |
| :--- | :--- | :--- |
| `get_use_duration` | `(&self) -> i32` | 完成動作所需的 tick 時長（例如食物為 `32` tick，弓為 `72000` tick）。 |
| `on_use_tick` | `(&self, stack: &ItemStack, player: &Player, remaining_use_ticks: i32)` | 按住右鍵期間每 tick 執行。 |
| `on_stopped_using` | `(&self, stack: &ItemStack, player: &Player)` | 玩家鬆開右鍵時觸發（例如發射蓄力後的弓）。 |

---

## 第 3 步：耐久度與冷卻時間

### 安全減少堆疊數量

始終使用 `decrement_unless_creative`，確保生存模式玩家消耗物品，而創造模式玩家保留物品：

```rust
item_stack.decrement_unless_creative(player.gamemode.load(), 1);
```

### 應用冷卻時間

用於防止動作刷屏（例如終界珍珠、紫頌果）：

```rust
// 為終界珍珠開始 20 tick（1 秒）冷卻
player.start_cooldown(Item::ENDER_PEARL.registry_key.to_string(), 20);
```

---

## 第 4 步：註冊物品

1. 在 `crates/pumpkin/src/item/items/mod.rs` 中匯出模組：

   ```rust
   pub mod snowball;
   ```

2. 在 `crates/pumpkin/src/item/registry.rs` 中註冊結構：

   ```rust
   items.register(SnowBallItem);
   ```

伺服器初始化時，`items.register` 會把 `ItemMetadata::ids()` 中宣告的 ID 對映到你的行為實例。
