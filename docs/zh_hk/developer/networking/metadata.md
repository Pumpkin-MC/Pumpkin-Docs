# 實體元資料與同步資料

Minecraft 透過**實體元資料**同步實體的持久視覺狀態、動畫標誌、姿勢和屬性（在 Java 版中歷史上稱為 *DataWatchers*，在基岩版中稱為 *Actor Data*）。

當實體潛行、著火或受到傷害時，伺服器不會每次都傳輸完整的狀態封包，而是向附近的觀察者廣播緊湊的元資料更新。

---

## 版本對比

| 功能 | Minecraft：Java 版 | Minecraft：基岩版 |
| :--- | :--- | :--- |
| **封包名稱** | `CSetEntityMetadata`（`SET_ENTITY_DATA`） | `CSetActorData`（封包 ID `39`） |
| **儲存結構** | 以 `0xFF` 結尾的 `TrackedData` 列表 | `SyncedActorDataList`（`HashMap<u32, MetadataValue>`） |
| **鍵類型** | 對映到強類型 `MetaDataType` 的索引（`u8`） | 列舉鍵（`entity_data_key::*`） |
| **標誌** | 位域位元組（著火、潛行、疾跑、發光） | 位域 int64（`entity_data_flag::*`） |
| **動態屬性** | 不適用（內置於被跟蹤的索引中） | `PropertySyncData`（客戶端/伺服器同步） |
| **Crate 位置** | `crates/pumpkin-protocol/src/java/client/play/entity_metadata.rs` | `crates/pumpkin-protocol/src/bedrock/client/set_actor_data.rs` |

---

## 1. Java 版：`CSetEntityMetadata`

在 Java 版中，實體元資料由帶編號的索引條目組成。每個條目定義一個索引、一個 `MetaDataType` ID 和編碼後的值。列表以單個 `0xFF` 位元組結束。

### 鍵索引層次結構

實體元資料遵循物件導向的繼承模型：

1. **Entity（基類）**：
   - `0`：狀態位域（標誌：位 `0` = 著火，位 `1` = 潛行，位 `3` = 疾跑，位 `5` = 隱身，位 `6` = 發光）。
   - `1`：空氣值（`VarInt`）。
   - `2`：自訂名稱（可選 `TextComponent`）。
   - `3`：自訂名稱可見（`bool`）。
   - `4`：靜音（`bool`）。
   - `5`：無重力（`bool`）。
   - `6`：姿勢（`Standing`、`FallFlying`、`Sleeping`、`Swimming`、`SpinAttack`、`Crouching`、`Dying`）。
2. **LivingEntity（繼承 Entity）**：
   - `8`：手部狀態（正在使用物品、活動手）。
   - `9`：生命值（`f32`）。
   - `10`：藥水效果的環境粒子顏色。
3. **Player（繼承 LivingEntity）**：
   - 額外的紅心、皮膚自訂位掩碼、主手指示器。

### 在 Pumpkin 中傳送元資料更新

Pumpkin 在 `pumpkin-protocol` 中編碼實體元資料：

```rust
use pumpkin_protocol::VarInt;
use pumpkin_protocol::java::client::play::CSetEntityMetadata;

// 為 ID 為 42 的實體構造元資料更新
let packet = CSetEntityMetadata::new(
    VarInt(entity.entity_id),
    serialized_metadata_bytes,
);

// 廣播給區塊觀察者
world.broadcast_packet_all(&packet).await;
```

---

## 2. 基岩版：`CSetActorData`

基岩版使用 `CSetActorData`（`packet(39)`），將屬性儲存在把 `u32` 鍵對映到強類型 `MetadataValue` 變體的字典中。

### 鍵與標誌常量

基岩版在 `entity_data_key::FLAGS` 下以 64 位整數位域的形式提供標誌：

- `entity_data_flag::ON_FIRE`（`0`）：實體正在燃燒。
- `entity_data_flag::SNEAKING`（`1`）：玩家正在潛行。
- `entity_data_flag::RIDING`（`2`）：實體正在騎乘坐騎。
- `entity_data_flag::SPRINTING`（`3`）：玩家正在疾跑。
- `entity_data_flag::USING_ITEM`（`4`）：玩家正在拉弓、進食或使用盾牌。
- `entity_data_flag::INVISIBLE`（`5`）：實體處於隱身狀態。
- `entity_data_flag::GLOWING`（`26`）：實體具有發光效果的輪廓。

### 在 Pumpkin 中構造和更新 Actor Data

位於 `crates/pumpkin/src/entity/living.rs`：

```rust
use pumpkin_protocol::bedrock::client::set_actor_data::{
    CSetActorData, MetadataValue, PropertySyncData, SyncedActorDataList,
    entity_data_flag, entity_data_key,
};

let mut actor_data = SyncedActorDataList::new();

// 設定實體標誌（例如正在使用物品）
let mut flags: i64 = 0;
if is_using_item {
    flags |= 1i64 << entity_data_flag::USING_ITEM;
}
actor_data.set(entity_data_key::FLAGS, MetadataValue::Int64(flags));

// 設定空氣值
actor_data.set(entity_data_key::AIR_SUPPLY, MetadataValue::Short(air as i16));

// 設定自訂名稱標籤
actor_data.set(entity_data_key::NAME, MetadataValue::String(name));

let packet = CSetActorData {
    target_runtime_id: VarULong(entity_id),
    actor_data,
    synced_properties: PropertySyncData::default(),
    tick: VarULong(current_tick),
};

client.try_enqueue_client_packet(&packet);
```

---

## 多版本相容性

由於 Mojang 經常在 Minecraft 的不同版本之間調整元資料索引，`pumpkin-protocol` 會利用 `pumpkin-data` 中的轉換表：

- 對於 Java 版，`pumpkin_data::meta_data_type::MetaDataType` 會根據客戶端的 `JavaMinecraftVersion` 動態重新對映索引。
- 對於基岩版，`SyncedActorDataList` 會根據目前基岩版協定版本驗證鍵，以防止客戶端崩潰。
