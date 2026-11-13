# 生成與網路追蹤

為了在數百個活動實體的情況下保持高 tick 速率，Pumpkin 採用基於區塊的實體追蹤和流式傳輸系統。

實體儲存在 [`crates/pumpkin-world`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-world) 內的區塊級集合中，並透過特定版本的網路封包在用戶端之間同步。

---

## 生成管線

生成實體包括建立實例、分配網路 ID、將其註冊到世界中，以及向區塊觀察者廣播生成封包：

1. **構造實體實例**：實例化特定的實體結構（例如 `ZombieEntity`、`ArrowEntity` 或 `ItemEntity`），並初始化其起始世界和空間座標。
2. **分配唯一網路識別符號**：為網路協定封包分配原子 32 位 `entity_id`，並分配 128 位持久化 UUID。
3. **註冊到世界與區塊對映**：將實體插入世界的實體儲存，並在相應的區塊座標條目中建立索引。
4. **查詢區塊觀察者**：查詢追蹤範圍內、視距包含該實體所在區塊的所有已連線玩家。
5. **廣播特定版本的生成封包**：根據每個觀察用戶端的版本（Java 版或基岩版），傳輸相應的生成和元資料封包。

### 透過世界 API 生成實體

```rust
use std::sync::Arc;
use pumpkin_data::entity::EntityType;
use pumpkin_util::math::vector3::Vector3;
use crate::entity::Entity;
use crate::entity::mob::zombie::ZombieEntity;

// 1. 使用目標世界和位置建立基礎實體
let position = Vector3::new(100.5, 64.0, -200.5);
let base_entity = Entity::new(world.clone(), position, &EntityType::ZOMBIE);

// 2. 封裝為特定的實體實現
let zombie = Arc::new(ZombieEntity::new(base_entity));

// 3. 註冊到世界中
world.spawn_entity(zombie);
```

---

## 網路封包同步

當玩家進入包含實體的區塊，或實體移動到被觀察的區塊時，Pumpkin 會分派適合用戶端版本的生成封包：

### Java 版實體生成
1. **`CSpawnEntity`**：宣告實體 ID、UUID、實體型別、位置和初始俯仰角/偏航角。
2. **`CSetEntityMetadata`**：傳送初始視覺狀態（自訂名稱標籤、燃燒標誌、幼年/成年狀態）。
3. **`CEntityVelocity`**：同步初始動量。
4. **`CUpdateEntityRot` 與 `CHeadRot`**：獨立於身體偏航角同步頭部朝向。

### 基岩版實體生成
1. **`CAddActor`**：宣告執行階段 ID、Actor 型別識別符號、位置、旋轉和內嵌的 `SyncedActorDataList`。
2. **`CSetActorMotion`**：設定初始速度向量。

---

## 移動與位置同步

每 tick 傳輸絕對 64 位座標會佔用大量網路頻寬。因此，Pumpkin 會根據移動距離，在緊湊的相對增量更新與權威完整同步之間動態切換：

| 指標/場景 | 閾值 | Java 協定封包 | 基岩協定封包 | 頻寬影響 |
| :--- | :--- | :--- | :--- | :--- |
| **增量移動** | 每 tick $\Delta < 8$ 格 | `CUpdateEntityPos`/`CUpdateEntityPosRot` | `CMoveActorDelta` | 最小（定點位元組增量） |
| **傳送/長距離移動** | $\Delta \ge 8$ 格或跨區塊躍遷 | `CTeleportEntity`/`CEntityPositionSync` | `CMoveActorAbsolute` | 完整的 64 位浮點座標載荷 |
| **僅旋轉** | 位置不變 | `CUpdateEntityRot` 與 `CHeadRot` | `CMoveActorDelta`（僅旋轉標誌） | 最小（位元組角度） |

### 1. 相對增量移動
如果實體在單個 tick 內移動不足 8 格，Pumpkin 會使用定點編碼的增量傳送差量封包：
- **Java 版**：`CUpdateEntityPos`（XYZ 增量）、`CUpdateEntityRot`（偏航角/俯仰角增量）或 `CUpdateEntityPosRot`（兩者兼有）。
- **基岩版**：帶有位標誌的 `CMoveActorDelta`，用於指示哪些座標發生了變化（`MOVE_ACTOR_DELTA_FLAG_HAS_X`、`HAS_Y`、`HAS_Z`）。

### 2. 完整位置同步
當實體傳送、跨越區塊邊界或累積浮點誤差時：
- **Java 版**：傳送包含絕對座標、速度和著地標誌的 `CEntityPositionSync`。
- **基岩版**：傳送 `CMoveActorAbsolute`。

---

## 乘客與載具騎乘

當一個實體騎乘另一個實體時（例如玩家騎乘馬、船或礦車）：

- **Java 版**：傳送 `CSetPassengers`，其中包含載具的 `VarInt` 實體 ID 和乘客實體 ID 陣列。
- **基岩版**：傳送 `CSetActorLink`，定義騎乘者與載具的執行階段 ID 及連結型別（`Rider`、`Passenger`）。

---

## 消失與實體移除

當實體死亡、從世界中移除或離開玩家的追蹤半徑時：

- **Java 版**：傳送包含實體 ID 陣列的 `CRemoveEntities`。
- **基岩版**：傳送包含實體執行階段 ID 的 `CRemoveActor`。

用戶端會立即釋放已移除實體佔用的本地渲染和音訊記憶體。
