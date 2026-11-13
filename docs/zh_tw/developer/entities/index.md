# 實體架構與層次結構

Minecraft 中的實體表示存在於世界裡的所有動態生物和非生物物件——從掉落的物品堆疊和箭，到殭屍、村民和玩家。

在 Pumpkin 中，實體系統實現於 [`crates/pumpkin/src/entity/`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/entity)。該架構在併發安全、快取友好的資料結構之上，利用物件導向的 trait 組合。

---

## 實體 Trait 層次結構

Pumpkin 使用 Rust trait 將實體組織成繼承層次結構：

| Trait/型別 | 父 Trait | 核心能力與狀態 |
| :--- | :--- | :--- |
| `Entity` | *（無/基礎結構）* | 實體 ID、UUID、原子位置與速度向量、邊界框、姿勢 |
| `EntityBase` | *（根 Trait）* | 動態執行階段向下轉型（`get_living_entity` 等）、world tick 更新、傷害、傳送 |
| `LivingEntity` | `EntityBase` | 生命值、傷害吸收、藥水效果、裝備欄位、屬性容器 |
| `Mob` | `LivingEntity` | AI 目標選擇器、導航、路徑尋找、目標追蹤、死亡戰利品 |
| `Player` | `LivingEntity` | 網路用戶端會話、物品欄、合成介面、飢餓值、進度 |

### 1. `Entity`（基礎結構）
包含所有實體共有的基礎物理、幾何和空間狀態：
- **`entity_id`**：用於網路封包的快速 32 位唯一整數識別符號。
- **`uuid`**：128 位持久化 UUID。
- **`position` 與 `velocity`**：執行緒安全向量（`AtomicCell<Vector3<f64>>`），支援無鎖競爭的併發讀取。
- **`bounding_box`**：用於碰撞解析和射線瞄準的 3D 軸對齊邊界框（AABB）。
- **`pose`**：目前姿勢（`Standing`、`Crouching`、`Sleeping`、`FallFlying` 等）。

### 2. `EntityBase`（基礎 Trait）
伺服器中每個實體都實現的根動態 trait：
- 透過輔助方法（`get_living_entity()`、`get_mob()`、`get_player()`）支援安全的執行階段向下轉型。
- 提供世界互動鉤子：`tick()`、`damage()`、`teleport()`、`on_lightning_strike()`、`is_immune_to_explosion()`。

### 3. `LivingEntity`（生物 Trait）
擴充 `EntityBase`，用於具有生命值、戰鬥和動畫狀態的實體：
- 管理生命條、傷害吸收、無敵 tick 和摔落傷害。
- 追蹤生效中的藥水效果（`crates/pumpkin/src/entity/effect/`）。
- 處理裝備欄位（`MainHand`、`OffHand`、`Helmet`、`Chestplate`、`Leggings`、`Boots`）。
- 封裝屬性容器（最大生命值、移動速度、擊退抗性）。

### 4. `Mob`（AI Trait）
擴充 `LivingEntity`，用於由計算機控制的生物：
- 管理 AI 目標選擇器（攻擊、遊蕩、逃跑、環顧）。
- 控制方塊間的導航和路徑尋找。
- 死亡時生成設定的戰利品表。

### 5. `Player`（人類用戶端）
表示透過遊戲用戶端連線的人類玩家：
- 關聯網路通訊端處理器（`JavaClient` 或 `BedrockClient`）。
- 管理容器介面處理器、終界箱、玩家物品欄和合成。
- 追蹤飢餓值、飽食度、消耗度、經驗等級和進度條件。

---

## 物理與移動模擬

在每個server tick，Pumpkin 都會按照確定性順序模擬實體物理：

1. **應用速度與重力**：計算目前速度並新增向下的重力加速度，除非 `has_gravity()` 為 false 或實體正在飛行。
2. **解析方塊碰撞**：將實體的 3D 軸對齊邊界框（`bounding_box`）與周圍區塊中的固體方塊體素進行檢測；碰撞軸上的速度會衰減或清零。
3. **應用流體阻力與浮力**：判斷實體是否與水和熔岩流體相交，並應用阻力系數和向上的浮力。
4. **同步與廣播**：將更新後的座標持久化到原子位置單元中，並向觀察該實體的玩家廣播相對增量行動封包。
5. **虛空死亡**：低於 $Y = -128$ 的非玩家實體會自動消失。

---

## 戰鬥與傷害系統

傷害計算位於 [`crates/pumpkin/src/entity/combat.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/entity/combat.rs)：

1. **傷害型別**：傷害按 `DamageType` 分類（例如 `GENERIC`、`PLAYER_ATTACK`、`FALL`、`FIRE`、`MAGIC`、`EXPLOSION`、`LIGHTNING_BOLT`）。
2. **傷害縮放**：
   - 盔甲防禦點根據原版公式減輕受到的物理傷害：
     $$\text{damage} = \text{damage} \times \left(1 - \frac{\min(20, \max(\text{armor} / 5, \text{armor} - \frac{\text{damage}}{2 + \text{toughness} / 4}))}{25}\right)$$
   - 抗性提升狀態效果和保護附魔會進一步減免傷害。
3. **擊退**：造成傷害時，會向受害者的速度新增一個方向衝量向量，並受其擊退抗性屬性調節。
4. **受傷動畫**：觸發受傷音效，並向所有觀察者廣播紅色閃爍元資料。
