# 生物 AI 与目标系统

Pumpkin 为计算机控制的生物实现了模块化、优先级驱动的生物智能（AI）目标系统，位于 [`crates/pumpkin/src/entity/ai/`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/entity/ai) 和 [`crates/pumpkin/src/entity/mob/`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/entity/mob)。

---

## 目标系统架构

生物行为被分解为称为**目标（Goal）**的独立模块化任务。每种生物都拥有一个 **GoalSelector**，其中维护着一个有序的目标集合，并在每个server tick 对这些目标进行评估。

### 目标优先级层次结构

每个目标都会被分配一个整数优先级（数字越小，优先级越高）。在每个 tick，高优先级操作会抢占低优先级的后台任务：

| 优先级 | 目标类型 | 评估条件 | 行为 |
| :--- | :--- | :--- | :--- |
| **1（最高）** | `SwimGoal` | 实体浸没在水中 | 反复跳跃以游到水面，避免溺水。 |
| **2** | `MeleeAttackGoal` | 视野/范围内存在有效的敌对目标 | 向目标实体导航并执行近战攻击。 |
| **3** | `WanderAroundGoal` | 没有活动的战斗目标 | 随机选取附近一个可导航体素并走向它。 |
| **4（最低）** | `LookAtEntityGoal` | 观察半径内有玩家或生物 | 转动头部和身体，使其俯仰角/偏航角朝向目标实体。 |

### 执行流程

1. **评估**：在每个 tick，`GoalSelector::tick()` 按优先级顺序遍历已注册的目标。
2. **激活**：如果未激活的目标满足 `can_start()`，则通过 `start()` 激活它。
3. **执行**：已激活的目标在 `tick()` 中运行每 tick 逻辑。
4. **抢占与终止**：如果 `should_continue()` 返回 `false`，或者互斥的更高优先级目标激活，则会调用 `stop()` 并重置目标。

### `Goal` 生命周期

每个 AI 行为都实现 `Goal` trait：

```rust
pub trait Goal: Send + Sync {
    /// 评估前置条件，确定此目标是否可以激活。
    fn can_start(&self) -> bool;

    /// 目标从未激活转为激活时调用一次。
    fn start(&mut self) {}

    /// 评估目标是否应在后续 tick 继续执行。
    fn should_continue(&self) -> bool {
        self.can_start()
    }

    /// 在每个server tick 执行持续行为。
    fn tick(&mut self) {}

    /// 目标完成、失败或被更高优先级目标抢占时调用。
    fn stop(&mut self) {}
}
```

---

## 标准内置目标

Pumpkin 在 `crates/pumpkin/src/entity/ai/` 中提供了标准的原版 AI 行为：

| 目标 | 说明 | 适用生物 |
| :--- | :--- | :--- |
| **`SwimGoal`** | 浸没在水中时反复跳跃，防止溺水。 | 几乎所有陆地生物 |
| **`MeleeAttackGoal`** | 向攻击目标导航，并在目标进入攻击范围后发动攻击。 | 僵尸、蜘蛛、铁傀儡 |
| **`RangedAttackGoal`** | 保持距离并发射弹射物（箭、雪球）。 | 骷髅、掠夺者、烈焰人 |
| **`FleeSunGoal`** | 白天寻找阴凉处或水源，防止燃烧。 | 僵尸、骷髅 |
| **`PanicGoal`** | 受到伤害时向随机方向疾跑。 | 牛、猪、绵羊、鸡 |
| **`WanderAroundGoal`** | 空闲时随机选择附近可到达的坐标。 | 被动型与中立型生物 |
| **`LookAtEntityGoal`** | 转动头部，面向感知范围内的附近玩家。 | 村民、生物 |

---

## 导航与路径寻找

生物使用 Pumpkin 的 3D 网格寻路器在方块世界中导航：

1. **路径计算**：使用针对 Minecraft 方块几何结构优化的 A* 算法，计算从生物起点到目标坐标的路径。
2. **障碍物规避**：
   - 避开危险方块（熔岩、火、甜浆果丛）。
   - 防止从高于生物跌落阈值的边缘走下去。
   - 计算越过 1 格高障碍物的跳跃步进。
3. **路径点转向**：导航引擎每 tick 更新生物的速度向量，使实体沿路径点平滑移动。

---

## 实体属性系统

生物的能力和数值由 [`crates/pumpkin/src/entity/attributes.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/entity/attributes.rs) 中的**属性**系统控制：

```rust
use pumpkin_data::entity::attribute::EntityAttribute;

// 常见的原版属性
EntityAttribute::GENERIC_MAX_HEALTH;           // 基础生命值（例如僵尸为 20.0）
EntityAttribute::GENERIC_MOVEMENT_SPEED;       // 基础行走速度（例如 0.23）
EntityAttribute::GENERIC_ATTACK_DAMAGE;        // 近战攻击伤害（例如 3.0）
EntityAttribute::GENERIC_FOLLOW_RANGE;         // 以方块为单位的感知探测范围（例如 35.0）
EntityAttribute::GENERIC_KNOCKBACK_RESISTANCE; // 击退抗性（0.0 到 1.0）
```

### 修饰符
属性支持采用加法或乘法计算的动态修饰符（例如迅捷药水提供的速度加成或盔甲属性加成）。

---

## 可成长与被动型实体

被动型动物（牛、绵羊、猪）实现 `Ageable` trait：

- **幼年状态**：使用更小的碰撞箱和比例更大的头部进行渲染。
- **成长年龄**：一个向 `0` 递增的负数 tick 计时器。达到 `0` 时，实体成长为成年个体。
- **繁殖冷却**：一个正数 tick 计时器，用于追踪成功繁殖后的冷却时间。
