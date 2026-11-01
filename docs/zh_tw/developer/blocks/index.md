# 方塊架構與狀態系統

方塊構成了 Minecraft 世界的靜態與動態基礎。在 Pumpkin 中，方塊處理被清晰地劃分為兩個不同的層級：

1. **靜態資料層（[`pumpkin-data`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-data)）**：由 [`pumpkin-codegen`](/zh_tw/developer/codegen) 在編譯階段生成的元資料，包括數字方塊 ID、方塊狀態 ID、硬度、爆炸抗性、發光等級、不透明度、碰撞形狀和方塊狀態屬性。
2. **動態行為層（[`pumpkin::block`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/block)）**：服務端行為鉤子，例如開啟容器、切換紅石訊號、作物生長、破壞觸發和碰撞效果，均透過 `BlockBehaviour` trait 處理。

---

## 靜態方塊與互動行為

由於 Minecraft 包含數千種方塊狀態組合，Pumpkin 不會為簡單的非互動方塊分配執行階段行為結構：

| 類別 | 說明 | 範例 | 是否需要執行階段行為？ |
| :--- | :--- | :--- | :--- |
| **靜態方塊** | 沒有互動邏輯或自訂物理的堅固固體體素 | `stone`、`dirt`、`cobblestone`、`bedrock`、`obsidian` | 否——放置、破壞時間和工具要求完全由 `pumpkin-data` 處理。 |
| **互動方塊** | 由右鍵點選或工具操作觸發的方塊 | `door`、`trapdoor`、`lever`、`button`、`crafting_table` | 是——實現 `BlockBehaviour::normal_use` 或 `use_with_item`。 |
| **碰撞方塊** | 修改實體移動或施加作用力的方塊 | `honey_block`、`slime_block`、`soul_sand`、`powder_snow` | 是——實現 `on_entity_collision` 或 `on_landed_upon`。 |
| **紅石元件** | 電源、導體和邏輯閘 | `redstone_wire`、`repeater`、`comparator`、`observer` | 是——實現 `emits_redstone_power` 和 `on_neighbor_update`。 |
| **方塊實體** | 具有持久化、可序列化自訂狀態的方塊 | `chest`、`furnace`、`sign`、`decorated_pot`、`spawner` | 是——實現 `create_block_entity` 並關聯一個 `BlockEntity`。 |

---

## 方塊 ID、狀態與屬性

Minecraft 區分**方塊**型別和具體的**方塊狀態**：

### 1. `BlockId` 與 `BlockStateId`

- **`BlockId`**：表示基礎方塊型別的識別符號（例如 `minecraft:oak_door`）。
- **`BlockStateId`**：表示方塊屬性唯一組合的 16 位整數（例如 `minecraft:oak_door[facing=north,half=lower,hinge=left,open=false,powered=false]`）。

在 Pumpkin 中，方塊資料透過 `pumpkin-data` 中預先計算的查詢表獲取：

```rust
use pumpkin_data::Block;
use pumpkin_data::BlockStateId;

// 直接從生成的資料存取靜態屬性
let door_block = Block::OAK_DOOR;
let default_state_id: BlockStateId = door_block.default_state_id;

let hardness = door_block.hardness;
let blast_resistance = door_block.blast_resistance;
let is_air = door_block.is_air;
```

### 2. 生成的狀態屬性輔助工具

[`pumpkin-codegen`](/zh_tw/developer/codegen) 會在 `pumpkin_data::block_properties` 中生成強型別屬性輔助工具，無需手動解析原始字串或位掩碼：

```rust
use pumpkin_data::block_properties::{DoorLikeProperties, DoubleBlockHalf, Facing};

// 從數字 BlockStateId 讀取型別化屬性
let is_open = DoorLikeProperties::open(state_id);
let half = DoorLikeProperties::half(state_id);
let facing = DoorLikeProperties::facing(state_id);

// 生成屬性已修改的新 BlockStateId
let toggled_state_id = DoorLikeProperties::with_open(state_id, !is_open);
```

---

## 物理、邊界框與射線檢測

Pumpkin 直接使用 `pumpkin-data` 中預先烘焙的形狀來計算碰撞和射線檢測邊界框：

- **固體碰撞**：在physics tick 更新期間，將實體的軸對齊邊界框（AABB）與周圍方塊的碰撞體素進行檢測。
- **射線檢測**：當玩家瞄準方塊以放置或破壞時，會根據服務端方塊輪廓形狀驗證用戶端的射線檢測結果。
- **自訂移動鉤子**：黏液塊或蜂蜜塊等方塊會覆蓋垂直反彈或水平速度：
  - `bounce_entity_after_fall`：減輕摔落傷害並乘以反彈速度。
  - `stop_vertical_movement_after_fall`：接觸時將下落速度清零。

---

## 方塊實體（Tile Entity）

當方塊必須儲存無法放入標準方塊狀態位中的任意動態資料（例如容器物品欄、自訂告示牌文字、釀造計時器或刷怪籠延遲）時，就會使用**方塊實體**：

| 元件 | 職責 | 實現檔案 |
| :--- | :--- | :--- |
| `BlockEntity` Trait | 定義 NBT 序列化（`to_nbt`、`from_nbt`）和 tick 執行 | [`crates/pumpkin/src/block/entities/`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/block/entities) |
| `create_block_entity` | 放置方塊時呼叫的 `BlockBehaviour` 鉤子 | 附加到相關的方塊行為 |
| 區塊實體儲存 | 管理區塊段內活動的方塊實體及座標 | [`crates/pumpkin-world`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-world) |

---

## 方塊註冊表與分派系統

方塊互動事件透過 [`crates/pumpkin/src/block/registry.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/block/registry.rs) 中的中央 `BlockRegistry` 路由：

1. **註冊**：伺服器初始化時，所有行為結構都會註冊到 `BlockManager` 中。
2. **對映**：管理器將數字 `BlockId` 鍵對映到執行緒安全的行為例項（`Arc<dyn BlockBehaviour>`）。
3. **分派**：當網路層收到方塊操作封包（例如 `CUseItemOn` 或方塊挖掘封包）時，伺服器會以 $O(1)$ 時間複雜度查詢行為並呼叫相應的鉤子。

---

## 後續步驟

要實現新的互動方塊行為，請繼續閱讀實踐指南：

- **[新增方塊](/zh_tw/developer/blocks/adding-blocks)**：完整介紹如何宣告屬性、實現互動鉤子、建立方塊實體和註冊行為。
