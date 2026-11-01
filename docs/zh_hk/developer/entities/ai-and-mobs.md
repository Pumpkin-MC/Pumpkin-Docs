# 生物 AI 與目標系統

Pumpkin 為計算機控制的生物實現了模組化、優先順序驅動的人工智慧（AI）目標系統，位於 [`crates/pumpkin/src/entity/ai/`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/entity/ai) 和 [`crates/pumpkin/src/entity/mob/`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/entity/mob)。

---

## 目標系統架構

生物行為被分解為稱為**目標（Goal）**的獨立模組化任務。每種生物都擁有一個 **GoalSelector**，其中維護著一個有序的目標集合，並在每個server tick 對這些目標進行評估。

### 目標優先順序層次結構

每個目標都會被分配一個整數優先順序（數字越小，優先順序越高）。在每個 tick，高優先順序操作會搶佔低優先順序的後臺任務：

| 優先順序 | 目標類型 | 評估條件 | 行為 |
| :--- | :--- | :--- | :--- |
| **1（最高）** | `SwimGoal` | 實體浸沒在水中 | 反覆跳躍以游到水面，避免溺水。 |
| **2** | `MeleeAttackGoal` | 視野/範圍內存在有效的敵對目標 | 向目標實體導航並執行近戰攻擊。 |
| **3** | `WanderAroundGoal` | 沒有活動的戰鬥目標 | 隨機選取附近一個可導航體素並走向它。 |
| **4（最低）** | `LookAtEntityGoal` | 觀察半徑內有玩家或生物 | 轉動頭部和身體，使其俯仰角/偏航角朝向目標實體。 |

### 執行流程

1. **評估**：在每個 tick，`GoalSelector::tick()` 按優先順序順序遍歷已註冊的目標。
2. **啟用**：如果未啟用的目標滿足 `can_start()`，則透過 `start()` 啟用它。
3. **執行**：已啟用的目標在 `tick()` 中執行每 tick 邏輯。
4. **搶佔與終止**：如果 `should_continue()` 返回 `false`，或者互斥的更高優先順序目標啟用，則會調用 `stop()` 並重置目標。

### `Goal` 生命週期

每個 AI 行為都實現 `Goal` trait：

```rust
pub trait Goal: Send + Sync {
    /// 評估前置條件，確定此目標是否可以啟用。
    fn can_start(&self) -> bool;

    /// 目標從未啟用轉為啟用時呼叫一次。
    fn start(&mut self) {}

    /// 評估目標是否應在後續 tick 繼續執行。
    fn should_continue(&self) -> bool {
        self.can_start()
    }

    /// 在每個server tick 執行持續行為。
    fn tick(&mut self) {}

    /// 目標完成、失敗或被更高優先順序目標搶佔時呼叫。
    fn stop(&mut self) {}
}
```

---

## 標準內建目標

Pumpkin 在 `crates/pumpkin/src/entity/ai/` 中提供了標準的原版 AI 行為：

| 目標 | 說明 | 適用生物 |
| :--- | :--- | :--- |
| **`SwimGoal`** | 浸沒在水中時反覆跳躍，防止溺水。 | 幾乎所有陸地生物 |
| **`MeleeAttackGoal`** | 向攻擊目標導航，並在目標進入攻擊範圍後發動攻擊。 | 殭屍、蜘蛛、鐵傀儡 |
| **`RangedAttackGoal`** | 保持距離並發射彈射物（箭、雪球）。 | 骷髏、掠奪者、烈焰人 |
| **`FleeSunGoal`** | 白天尋找陰涼處或水源，防止燃燒。 | 殭屍、骷髏 |
| **`PanicGoal`** | 受到傷害時向隨機方向疾跑。 | 牛、豬、綿羊、雞 |
| **`WanderAroundGoal`** | 空閒時隨機選擇附近可到達的座標。 | 被動型與中立型生物 |
| **`LookAtEntityGoal`** | 轉動頭部，面向感知範圍內的附近玩家。 | 村民、生物 |

---

## 導航與路徑尋找

生物使用 Pumpkin 的 3D 網格尋路器在方塊世界中導航：

1. **路徑計算**：使用針對 Minecraft 方塊幾何結構優化的 A* 演算法，計算從生物起點到目標座標的路徑。
2. **障礙物規避**：
   - 避開危險方塊（熔岩、火、甜漿果叢）。
   - 防止從高於生物跌落閾值的邊緣走下去。
   - 計算越過 1 格高障礙物的跳躍步進。
3. **路徑點轉向**：導航引擎每 tick 更新生物的速度向量，使實體沿路徑點平滑移動。

---

## 實體屬性系統

生物的能力和數值由 [`crates/pumpkin/src/entity/attributes.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/entity/attributes.rs) 中的**屬性**系統控制：

```rust
use pumpkin_data::entity::attribute::EntityAttribute;

// 常見的原版屬性
EntityAttribute::GENERIC_MAX_HEALTH;          // 基礎生命值（例如殭屍為 20.0）
EntityAttribute::GENERIC_MOVEMENT_SPEED;      // 基礎行走速度（例如 0.23）
EntityAttribute::GENERIC_ATTACK_DAMAGE;       // 近戰攻擊傷害（例如 3.0）
EntityAttribute::GENERIC_FOLLOW_RANGE;        // 以方塊為單位的感知探測範圍（例如 35.0）
EntityAttribute::GENERIC_KNOCKBACK_RESISTANCE; // 擊退抗性（0.0 到 1.0）
```

### 修飾符
屬性支援採用加法或乘法計算的動態修飾符（例如迅捷藥水提供的速度加成或盔甲屬性加成）。

---

## 可成長與被動型實體

被動型動物（牛、綿羊、豬）實現 `Ageable` trait：

- **幼年狀態**：使用更小的碰撞箱和比例更大的頭部進行渲染。
- **成長年齡**：一個向 `0` 遞增的負數 tick 計時器。達到 `0` 時，實體成長為成年個體。
- **繁殖冷卻**：一個正數 tick 計時器，用於追蹤成功繁殖後的冷卻時間。
