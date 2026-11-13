# 实体元数据与同步数据

Minecraft 通过**实体元数据**同步实体的持久视觉状态、动画标志、姿势和属性（在 Java 版中历史上称为 *DataWatchers*，在基岩版中称为 *Actor Data*）。

当实体潜行、着火或受到伤害时，服务器不会每次都传输完整的状态数据包，而是向附近的观察者广播紧凑的元数据更新。

---

## 版本对比

| 功能 | Minecraft：Java 版 | Minecraft：基岩版 |
| :--- | :--- | :--- |
| **数据包名称** | `CSetEntityMetadata`（`SET_ENTITY_DATA`） | `CSetActorData`（数据包 ID `39`） |
| **存储结构** | 以 `0xFF` 结尾的 `TrackedData` 列表 | `SyncedActorDataList`（`HashMap<u32, MetadataValue>`） |
| **键类型** | 映射到强类型 `MetaDataType` 的索引（`u8`） | 枚举键（`entity_data_key::*`） |
| **标志** | 位域字节（着火、潜行、疾跑、发光） | 位域 int64（`entity_data_flag::*`） |
| **动态属性** | 不适用（内置于被跟踪的索引中） | `PropertySyncData`（客户端/服务器同步） |
| **Crate 位置** | `crates/pumpkin-protocol/src/java/client/play/entity_metadata.rs` | `crates/pumpkin-protocol/src/bedrock/client/set_actor_data.rs` |

---

## 1. Java 版：`CSetEntityMetadata`

在 Java 版中，实体元数据由带编号的索引条目组成。每个条目定义一个索引、一个 `MetaDataType` ID 和编码后的值。列表以单个 `0xFF` 字节结束。

### 键索引层次结构

实体元数据遵循面向对象的继承模型：

1. **Entity（基类）**：
   - `0`：状态位域（标志：位 `0` = 着火，位 `1` = 潜行，位 `3` = 疾跑，位 `5` = 隐身，位 `6` = 发光）。
   - `1`：空气值（`VarInt`）。
   - `2`：自定义名称（可选 `TextComponent`）。
   - `3`：自定义名称可见（`bool`）。
   - `4`：静音（`bool`）。
   - `5`：无重力（`bool`）。
   - `6`：姿势（`Standing`、`FallFlying`、`Sleeping`、`Swimming`、`SpinAttack`、`Crouching`、`Dying`）。
2. **LivingEntity（继承 Entity）**：
   - `8`：手部状态（正在使用物品、活动手）。
   - `9`：生命值（`f32`）。
   - `10`：药水效果的环境粒子颜色。
3. **Player（继承 LivingEntity）**：
   - 额外的红心、皮肤自定义位掩码、主手指示器。

### 在 Pumpkin 中发送元数据更新

Pumpkin 在 `pumpkin-protocol` 中编码实体元数据：

```rust
use pumpkin_protocol::VarInt;
use pumpkin_protocol::java::client::play::CSetEntityMetadata;

// 为 ID 为 42 的实体构造元数据更新
let packet = CSetEntityMetadata::new(
    VarInt(entity.entity_id),
    serialized_metadata_bytes,
);

// 广播给区块观察者
world.broadcast_packet_all(&packet).await;
```

---

## 2. 基岩版：`CSetActorData`

基岩版使用 `CSetActorData`（`packet(39)`），将属性存储在把 `u32` 键映射到强类型 `MetadataValue` 变体的字典中。

### 键与标志常量

基岩版在 `entity_data_key::FLAGS` 下以 64 位整数位域的形式提供标志：

- `entity_data_flag::ON_FIRE`（`0`）：实体正在燃烧。
- `entity_data_flag::SNEAKING`（`1`）：玩家正在潜行。
- `entity_data_flag::RIDING`（`2`）：实体正在骑乘坐骑。
- `entity_data_flag::SPRINTING`（`3`）：玩家正在疾跑。
- `entity_data_flag::USING_ITEM`（`4`）：玩家正在拉弓、进食或使用盾牌。
- `entity_data_flag::INVISIBLE`（`5`）：实体处于隐身状态。
- `entity_data_flag::GLOWING`（`26`）：实体具有发光效果的轮廓。

### 在 Pumpkin 中构造和更新 Actor Data

位于 `crates/pumpkin/src/entity/living.rs`：

```rust
use pumpkin_protocol::bedrock::client::set_actor_data::{
    CSetActorData, MetadataValue, PropertySyncData, SyncedActorDataList,
    entity_data_flag, entity_data_key,
};

let mut actor_data = SyncedActorDataList::new();

// 设置实体标志（例如正在使用物品）
let mut flags: i64 = 0;
if is_using_item {
    flags |= 1i64 << entity_data_flag::USING_ITEM;
}
actor_data.set(entity_data_key::FLAGS, MetadataValue::Int64(flags));

// 设置空气值
actor_data.set(entity_data_key::AIR_SUPPLY, MetadataValue::Short(air as i16));

// 设置自定义名称标签
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

## 多版本兼容性

由于 Mojang 经常在 Minecraft 的不同版本之间调整元数据索引，`pumpkin-protocol` 会利用 `pumpkin-data` 中的转换表：

- 对于 Java 版，`pumpkin_data::meta_data_type::MetaDataType` 会根据客户端的 `JavaMinecraftVersion` 动态重新映射索引。
- 对于基岩版，`SyncedActorDataList` 会根据当前基岩版协议版本验证键，以防止客户端崩溃。
