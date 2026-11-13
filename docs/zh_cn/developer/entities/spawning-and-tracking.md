# 生成与网络追踪

为了在数百个活动实体的情况下保持高 tick 速率，Pumpkin 采用基于区块的实体追踪和流式传输系统。

实体保存在 [`crates/pumpkin-world`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-world) 内的区块级集合中，并通过特定版本的网络数据包在客户端之间同步。

---

## 生成管线

生成实体包括创建实例、分配网络 ID、将其注册到世界中，以及向区块观察者广播生成数据包：

1. **构造实体实例**：实例化特定的实体结构体（例如 `ZombieEntity`、`ArrowEntity` 或 `ItemEntity`），并初始化其起始世界和空间坐标。
2. **分配唯一网络标识符**：为网络协议数据包分配原子 32 位 `entity_id`，并分配 128 位持久化 UUID。
3. **注册到世界与区块映射**：将实体插入世界的实体存储，并在相应的区块坐标条目中建立索引。
4. **查询区块观察者**：查找追踪范围内、视距包含该实体所在区块的所有已连接玩家。
5. **广播特定版本的生成数据包**：根据每个观察客户端的版本（Java 版或基岩版），传输相应的生成和元数据数据包。

### 通过世界 API 生成实体

```rust
use std::sync::Arc;
use pumpkin_data::entity::EntityType;
use pumpkin_util::math::vector3::Vector3;
use crate::entity::Entity;
use crate::entity::mob::zombie::ZombieEntity;

// 1. 使用目标世界和位置创建基础实体
let position = Vector3::new(100.5, 64.0, -200.5);
let base_entity = Entity::new(world.clone(), position, &EntityType::ZOMBIE);

// 2. 封装为特定的实体实现
let zombie = Arc::new(ZombieEntity::new(base_entity));

// 3. 注册到世界中
world.spawn_entity(zombie);
```

---

## 网络数据包同步

当玩家进入包含实体的区块，或实体移动到被观察的区块时，Pumpkin 会分派适合客户端版本的生成数据包：

### Java 版实体生成
1. **`CSpawnEntity`**：声明实体 ID、UUID、实体类型、位置和初始俯仰角/偏航角。
2. **`CSetEntityMetadata`**：发送初始视觉状态（自定义名称标签、燃烧标志、幼年/成年状态）。
3. **`CEntityVelocity`**：同步初始动量。
4. **`CUpdateEntityRot` 与 `CHeadRot`**：独立于身体偏航角同步头部朝向。

### 基岩版实体生成
1. **`CAddActor`**：声明运行时 ID、Actor 类型标识符、位置、旋转和内嵌的 `SyncedActorDataList`。
2. **`CSetActorMotion`**：设置初始速度向量。

---

## 移动与位置同步

每 tick 传输绝对 64 位坐标会占用大量网络带宽。因此，Pumpkin 会根据移动距离，在紧凑的相对增量更新与权威完整同步之间动态切换：

| 指标/场景 | 阈值 | Java 协议数据包 | 基岩协议数据包 | 带宽影响 |
| :--- | :--- | :--- | :--- | :--- |
| **增量移动** | 每 tick $\Delta < 8$ 格 | `CUpdateEntityPos`/`CUpdateEntityPosRot` | `CMoveActorDelta` | 最小（定点字节增量） |
| **传送/长距离移动** | $\Delta \ge 8$ 格或跨区块跃迁 | `CTeleportEntity`/`CEntityPositionSync` | `CMoveActorAbsolute` | 完整的 64 位浮点坐标载荷 |
| **仅旋转** | 位置不变 | `CUpdateEntityRot` 与 `CHeadRot` | `CMoveActorDelta`（仅旋转标志） | 最小（字节角度） |

### 1. 相对增量移动
如果实体在单个 tick 内移动不足 8 格，Pumpkin 会使用定点编码的增量发送差量数据包：
- **Java 版**：`CUpdateEntityPos`（XYZ 增量）、`CUpdateEntityRot`（偏航角/俯仰角增量）或 `CUpdateEntityPosRot`（两者兼有）。
- **基岩版**：带有位标志的 `CMoveActorDelta`，用于指示哪些坐标发生了变化（`MOVE_ACTOR_DELTA_FLAG_HAS_X`、`HAS_Y`、`HAS_Z`）。

### 2. 完整位置同步
当实体传送、跨越区块边界或累积浮点误差时：
- **Java 版**：发送包含绝对坐标、速度和着地标志的 `CEntityPositionSync`。
- **基岩版**：发送 `CMoveActorAbsolute`。

---

## 乘客与载具骑乘

当一个实体骑乘另一个实体时（例如玩家骑乘马、船或矿车）：

- **Java 版**：发送 `CSetPassengers`，其中包含载具的 `VarInt` 实体 ID 和乘客实体 ID 数组。
- **基岩版**：发送 `CSetActorLink`，定义骑乘者与载具的运行时 ID 及链接类型（`Rider`、`Passenger`）。

---

## 消失与实体移除

当实体死亡、从世界中移除或离开玩家的追踪半径时：

- **Java 版**：发送包含实体 ID 数组的 `CRemoveEntities`。
- **基岩版**：发送包含实体运行时 ID 的 `CRemoveActor`。

客户端会立即释放已移除实体占用的本地渲染和音频内存。
