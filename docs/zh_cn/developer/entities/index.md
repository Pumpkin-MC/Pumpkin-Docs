# 实体架构与层次结构

Minecraft 中的实体表示存在于世界里的所有动态生物和非生物对象——从掉落的物品堆叠和箭，到僵尸、村民和玩家。

在 Pumpkin 中，实体系统实现于 [`crates/pumpkin/src/entity/`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/entity)。该架构在并发安全、缓存友好的数据结构之上，利用面向对象的 trait 组合。

---

## 实体 Trait 层次结构

Pumpkin 使用 Rust trait 将实体组织成继承层次结构：

| Trait/类型 | 父 Trait | 核心能力与状态 |
| :--- | :--- | :--- |
| `Entity` | *（无/基础结构体）* | 实体 ID、UUID、原子位置与速度向量、边界框、姿势 |
| `EntityBase` | *（根 Trait）* | 动态运行时向下转型（`get_living_entity` 等）、world tick 更新、伤害、传送 |
| `LivingEntity` | `EntityBase` | 生命值、伤害吸收、药水效果、装备槽位、属性容器 |
| `Mob` | `LivingEntity` | AI 目标选择器、导航、路径寻找、目标追踪、死亡战利品 |
| `Player` | `LivingEntity` | 网络客户端会话、物品栏、合成界面、饥饿值、进度 |

### 1. `Entity`（基础结构体）
包含所有实体共有的基础物理、几何和空间状态：
- **`entity_id`**：用于网络数据包的快速 32 位唯一整数标识符。
- **`uuid`**：128 位持久化 UUID。
- **`position` 与 `velocity`**：线程安全向量（`AtomicCell<Vector3<f64>>`），支持无锁竞争的并发读取。
- **`bounding_box`**：用于碰撞解析和射线瞄准的 3D 轴对齐边界框（AABB）。
- **`pose`**：当前姿势（`Standing`、`Crouching`、`Sleeping`、`FallFlying` 等）。

### 2. `EntityBase`（基础 Trait）
服务器中每个实体都实现的根动态 trait：
- 通过辅助方法（`get_living_entity()`、`get_mob()`、`get_player()`）支持安全的运行时向下转型。
- 提供世界交互钩子：`tick()`、`damage()`、`teleport()`、`on_lightning_strike()`、`is_immune_to_explosion()`。

### 3. `LivingEntity`（生物 Trait）
扩展 `EntityBase`，用于具有生命值、战斗和动画状态的实体：
- 管理生命条、伤害吸收、无敌 tick 和摔落伤害。
- 追踪生效中的药水效果（`crates/pumpkin/src/entity/effect/`）。
- 处理装备槽位（`MainHand`、`OffHand`、`Helmet`、`Chestplate`、`Leggings`、`Boots`）。
- 封装属性容器（最大生命值、移动速度、击退抗性）。

### 4. `Mob`（AI Trait）
扩展 `LivingEntity`，用于由计算机控制的生物：
- 管理 AI 目标选择器（攻击、游荡、逃跑、环顾）。
- 控制方块间的导航和路径寻找。
- 死亡时生成配置的战利品表。

### 5. `Player`（人类客户端）
表示通过游戏客户端连接的人类玩家：
- 关联网络套接字处理器（`JavaClient` 或 `BedrockClient`）。
- 管理容器界面处理器、末影箱、玩家物品栏和合成。
- 追踪饥饿值、饱和度、消耗度、经验等级和进度条件。

---

## 物理与移动模拟

在每个server tick，Pumpkin 都会按照确定性顺序模拟实体物理：

1. **应用速度与重力**：计算当前速度并添加向下的重力加速度，除非 `has_gravity()` 为 false 或实体正在飞行。
2. **解析方块碰撞**：将实体的 3D 轴对齐边界框（`bounding_box`）与周围区块中的固体方块体素进行检测；碰撞轴上的速度会衰减或清零。
3. **应用流体阻力与浮力**：判断实体是否与水和熔岩流体相交，并应用阻力系数和向上的浮力。
4. **同步与广播**：将更新后的坐标持久化到原子位置单元中，并向观察该实体的玩家广播相对增量移动数据包。
5. **虚空死亡**：低于 $Y = -128$ 的非玩家实体会自动消失。

---

## 战斗与伤害系统

伤害计算位于 [`crates/pumpkin/src/entity/combat.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/entity/combat.rs)：

1. **伤害类型**：伤害按 `DamageType` 分类（例如 `GENERIC`、`PLAYER_ATTACK`、`FALL`、`FIRE`、`MAGIC`、`EXPLOSION`、`LIGHTNING_BOLT`）。
2. **伤害缩放**：
   - 盔甲防御点根据原版公式减轻受到的物理伤害：
     $$\text{damage} = \text{damage} \times \left(1 - \frac{\min(20, \max(\text{armor} / 5, \text{armor} - \frac{\text{damage}}{2 + \text{toughness} / 4}))}{25}\right)$$
   - 抗性提升状态效果和保护附魔会进一步减免伤害。
3. **击退**：造成伤害时，会向受害者的速度添加一个方向冲量向量，并受其击退抗性属性调节。
4. **受伤动画**：触发受伤音效，并向所有观察者广播红色闪烁元数据。
