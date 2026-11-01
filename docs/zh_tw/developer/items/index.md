# 物品架構與資料元件

物品是玩家物品欄、快捷欄、盔甲槽和世界容器中存放的行動式遊戲物件。在 Pumpkin 中，物品處理分為兩個主要子系統：

1. **靜態資料層（[`pumpkin-data`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-data)）**：編譯階段生成的元資料，包括物品 ID、最大堆疊數量、最大耐久度、工具等級屬性、食物營養值，以及由 [`pumpkin-codegen`](/zh_tw/developer/codegen) 生成的資料元件。
2. **動態行為層（[`pumpkin::item`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/item)）**：透過 `ItemBehaviour` trait 處理的互動式右鍵動作、彈射物發射、進食時長、弓蓄力和方塊互動。

---

## 靜態物品與可操作物品

| 物品型別 | 說明 | 範例 | 是否需要執行階段行為結構 |
| :--- | :--- | :--- | :--- |
| **被動物品** | 沒有主動右鍵效果的物品 | `diamond`、`stick`、`iron_ingot`、`feather` | 否——堆疊、移動、合成和丟棄由 `pumpkin-inventory` 自動處理。 |
| **標準方塊物品** | 直接對應可放置方塊的物品 | `stone`、`oak_planks`、`glass` | 否——放置邏輯會查詢目標方塊的資料。 |
| **彈射物與投擲物** | 投擲時生成物理實體的物品 | `snowball`、`egg`、`ender_pearl`、`splash_potion` | 是——實現 `ItemBehaviour::normal_use`。 |
| **持續使用 / 蓄力物品** | 具有使用時長或蓄力動畫的物品 | `bow`、`crossbow`、`spyglass`、`trident` | 是——實現 `get_use_duration`、`on_use_tick`、`on_stopped_using`。 |
| **具有方塊互動的工具** | 會修改世界中現有方塊的物品 | `hoe`（耕地）、`axe`（去皮）、`shovel`（壓路徑） | 是——實現 `ItemBehaviour::use_on_block`。 |

---

## `ItemStack` 結構

`ItemStack` 表示物品欄容器中的一個物品例項。它封裝：

- **`item`**：對靜態 [`Item`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-data/src/item.rs) 定義的引用。
- **`item_count`**：目前堆疊數量（$1 \le \text{count} \le \text{max\_stack\_size}$）。
- **資料元件**：附加到物品堆疊上的動態屬性（自訂名稱、描述、傷害值、附魔、藥水效果）。

```rust
use pumpkin_data::item::Item;
use pumpkin_data::item_stack::ItemStack;

// 建立新的物品堆疊
let mut stack = ItemStack::new(1, Item::DIAMOND_SWORD);

// 在尊重創造模式的情況下安全減少堆疊數量
stack.decrement_unless_creative(player.gamemode.load(), 1);
```

---

## 資料元件系統

現代 Minecraft 透過模組化**資料元件**表示物品屬性：

| 元件 | 職責 | 說明 |
| :--- | :--- | :--- |
| `FoodImpl` | 營養與飽食度 | 控制恢復的飢餓值和飽食度比例。 |
| `ConsumableImpl` | 消耗機制 | 控制進食時長、音效和動畫型別。 |
| `Damageable` | 耐久度 | 跟蹤目前損壞值，並在達到最大耐久度時損壞。 |
| `UseCooldown` | 冷卻組 | 在指定 tick 內阻止物品再次使用。 |
| `Enchantments` | 附魔等級 | 已應用附魔與等級的鍵值對映。 |

---

## 物品註冊表與分派架構

物品互動由 [`crates/pumpkin/src/item/registry.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/item/registry.rs) 中的 `ItemRegistry` 管理：

1. **註冊**：伺服器啟動時，所有 `ItemBehaviour` 實現都會與目標數字物品 ID 一起註冊。
2. **互動路由**：用戶端傳送使用封包（`CUseItem`、`CUseItemOn`）時，Pumpkin 會評估冷卻時間，並將執行路由到已註冊的 `ItemBehaviour`。
3. **冷卻系統**：玩家會跟蹤按冷卻組字串鍵控的啟用冷卻。如果物品處於冷卻中，互動會在呼叫行為前取消。

---

## 後續步驟

若要為新物品實現互動機制，請繼續閱讀實踐指南：

- **[新增物品行為](/zh_tw/developer/items/adding-items)**：關於實現 `ItemMetadata`、`ItemBehaviour`、管理冷卻時間以及註冊物品的分步說明。
