# 物品架构与数据组件

物品是玩家物品栏、快捷栏、盔甲槽和世界容器中存放的便携式游戏对象。在 Pumpkin 中，物品处理分为两个主要子系统：

1. **静态数据层（[`pumpkin-data`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-data)）**：编译期生成的元数据，包括物品 ID、最大堆叠数量、最大耐久度、工具等级属性、食物营养值，以及由 [`pumpkin-codegen`](/zh_cn/developer/codegen) 生成的数据组件。
2. **动态行为层（[`pumpkin::item`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/item)）**：通过 `ItemBehaviour` trait 处理的交互式右键动作、弹射物发射、进食时长、弓蓄力和方块交互。

---

## 静态物品与可操作物品

| 物品类型 | 说明 | 示例 | 是否需要运行时行为结构体 |
| :--- | :--- | :--- | :--- |
| **被动物品** | 没有主动右键效果的物品 | `diamond`、`stick`、`iron_ingot`、`feather` | 否——堆叠、移动、合成和丢弃由 `pumpkin-inventory` 自动处理。 |
| **标准方块物品** | 直接对应可放置方块的物品 | `stone`、`oak_planks`、`glass` | 否——放置逻辑会查询目标方块的数据。 |
| **弹射物与投掷物** | 投掷时生成物理实体的物品 | `snowball`、`egg`、`ender_pearl`、`splash_potion` | 是——实现 `ItemBehaviour::normal_use`。 |
| **持续使用 / 蓄力物品** | 具有使用时长或蓄力动画的物品 | `bow`、`crossbow`、`spyglass`、`trident` | 是——实现 `get_use_duration`、`on_use_tick`、`on_stopped_using`。 |
| **具有方块交互的工具** | 会修改世界中现有方块的物品 | `hoe`（耕地）、`axe`（去皮）、`shovel`（压路径） | 是——实现 `ItemBehaviour::use_on_block`。 |

---

## `ItemStack` 结构

`ItemStack` 表示物品栏容器中的一个物品实例。它封装：

- **`item`**：对静态 [`Item`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-data/src/item.rs) 定义的引用。
- **`item_count`**：当前堆叠数量（$1 \le \text{count} \le \text{max\_stack\_size}$）。
- **数据组件**：附加到物品堆叠上的动态属性（自定义名称、描述、伤害值、魔咒、药水效果）。

```rust
use pumpkin_data::item::Item;
use pumpkin_data::item_stack::ItemStack;

// 创建新的物品堆叠
let mut stack = ItemStack::new(1, Item::DIAMOND_SWORD);

// 在尊重创造模式的情况下安全减少堆叠数量
stack.decrement_unless_creative(player.gamemode.load(), 1);
```

---

## 数据组件系统

现代 Minecraft 通过模块化**数据组件**表示物品属性：

| 组件 | 职责 | 说明 |
| :--- | :--- | :--- |
| `FoodImpl` | 营养与饱和度 | 控制恢复的饥饿值和饱和度比例。 |
| `ConsumableImpl` | 消耗机制 | 控制进食时长、音效和动画类型。 |
| `Damageable` | 耐久度 | 跟踪当前损坏值，并在达到最大耐久度时损坏。 |
| `UseCooldown` | 冷却组 | 在指定 tick 内阻止物品再次使用。 |
| `Enchantments` | 魔咒等级 | 已应用魔咒与等级的键值映射。 |

---

## 物品注册表与分派架构

物品交互由 [`crates/pumpkin/src/item/registry.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/item/registry.rs) 中的 `ItemRegistry` 管理：

1. **注册**：服务器启动时，所有 `ItemBehaviour` 实现都会与目标数字物品 ID 一起注册。
2. **交互路由**：客户端发送使用数据包（`CUseItem`、`CUseItemOn`）时，Pumpkin 会评估冷却时间，并将执行路由到已注册的 `ItemBehaviour`。
3. **冷却系统**：玩家会跟踪按冷却组字符串键控的激活冷却。如果物品处于冷却中，交互会在调用行为前取消。

---

## 后续步骤

若要为新物品实现交互机制，请继续阅读实践指南：

- **[添加物品行为](/zh_cn/developer/items/adding-items)**：关于实现 `ItemMetadata`、`ItemBehaviour`、管理冷却时间以及注册物品的分步说明。
