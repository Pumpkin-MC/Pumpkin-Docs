# 方块架构与状态系统

方块构成了 Minecraft 世界的静态与动态基础。在 Pumpkin 中，方块处理被清晰地划分为两个不同的层级：

1. **静态数据层（[`pumpkin-data`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-data)）**：由 [`pumpkin-codegen`](/zh_cn/developer/codegen) 在编译期生成的元数据，包括数字方块 ID、方块状态 ID、硬度、爆炸抗性、发光等级、不透明度、碰撞形状和方块状态属性。
2. **动态行为层（[`pumpkin::block`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/block)）**：服务端行为钩子，例如打开容器、切换红石信号、作物生长、破坏触发和碰撞效果，均通过 `BlockBehaviour` trait 处理。

---

## 静态方块与交互行为

由于 Minecraft 包含数千种方块状态组合，Pumpkin 不会为简单的非交互方块分配运行时行为结构体：

| 类别 | 说明 | 示例 | 是否需要运行时行为？ |
| :--- | :--- | :--- | :--- |
| **静态方块** | 没有交互逻辑或自定义物理的坚固固体体素 | `stone`、`dirt`、`cobblestone`、`bedrock`、`obsidian` | 否——放置、破坏时间和工具要求完全由 `pumpkin-data` 处理。 |
| **交互方块** | 由右键点击或工具操作触发的方块 | `door`、`trapdoor`、`lever`、`button`、`crafting_table` | 是——实现 `BlockBehaviour::normal_use` 或 `use_with_item`。 |
| **碰撞方块** | 修改实体移动或施加作用力的方块 | `honey_block`、`slime_block`、`soul_sand`、`powder_snow` | 是——实现 `on_entity_collision` 或 `on_landed_upon`。 |
| **红石元件** | 电源、导体和逻辑门 | `redstone_wire`、`repeater`、`comparator`、`observer` | 是——实现 `emits_redstone_power` 和 `on_neighbor_update`。 |
| **方块实体** | 具有持久化、可序列化自定义状态的方块 | `chest`、`furnace`、`sign`、`decorated_pot`、`spawner` | 是——实现 `create_block_entity` 并关联一个 `BlockEntity`。 |

---

## 方块 ID、状态与属性

Minecraft 区分**方块**类型和具体的**方块状态**：

### 1. `BlockId` 与 `BlockStateId`

- **`BlockId`**：表示基础方块类型的标识符（例如 `minecraft:oak_door`）。
- **`BlockStateId`**：表示方块属性唯一组合的 16 位整数（例如 `minecraft:oak_door[facing=north,half=lower,hinge=left,open=false,powered=false]`）。

在 Pumpkin 中，方块数据通过 `pumpkin-data` 中预先计算的查找表获取：

```rust
use pumpkin_data::Block;
use pumpkin_data::BlockStateId;

// 直接从生成的数据访问静态属性
let door_block = Block::OAK_DOOR;
let default_state_id: BlockStateId = door_block.default_state_id;

let hardness = door_block.hardness;
let blast_resistance = door_block.blast_resistance;
let is_air = door_block.is_air;
```

### 2. 生成的状态属性辅助工具

[`pumpkin-codegen`](/zh_cn/developer/codegen) 会在 `pumpkin_data::block_properties` 中生成强类型属性辅助工具，无需手动解析原始字符串或位掩码：

```rust
use pumpkin_data::block_properties::{DoorLikeProperties, DoubleBlockHalf, Facing};

// 从数字 BlockStateId 读取类型化属性
let is_open = DoorLikeProperties::open(state_id);
let half = DoorLikeProperties::half(state_id);
let facing = DoorLikeProperties::facing(state_id);

// 生成属性已修改的新 BlockStateId
let toggled_state_id = DoorLikeProperties::with_open(state_id, !is_open);
```

---

## 物理、边界框与射线检测

Pumpkin 直接使用 `pumpkin-data` 中预先烘焙的形状来计算碰撞和射线检测边界框：

- **固体碰撞**：在physics tick 更新期间，将实体的轴对齐边界框（AABB）与周围方块的碰撞体素进行检测。
- **射线检测**：当玩家瞄准方块以放置或破坏时，会根据服务端方块轮廓形状验证客户端的射线检测结果。
- **自定义移动钩子**：黏液块或蜂蜜块等方块会覆盖垂直反弹或水平速度：
  - `bounce_entity_after_fall`：减轻摔落伤害并乘以反弹速度。
  - `stop_vertical_movement_after_fall`：接触时将下落速度清零。

---

## 方块实体（Tile Entity）

当方块必须存储无法放入标准方块状态位中的任意动态数据（例如容器物品栏、自定义告示牌文本、酿造计时器或刷怪笼延迟）时，就会使用**方块实体**：

| 组件 | 职责 | 实现文件 |
| :--- | :--- | :--- |
| `BlockEntity` Trait | 定义 NBT 序列化（`to_nbt`、`from_nbt`）和 tick 执行 | [`crates/pumpkin/src/block/entities/`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/block/entities) |
| `create_block_entity` | 放置方块时调用的 `BlockBehaviour` 钩子 | 附加到相关的方块行为 |
| 区块实体存储 | 管理区块段内活动的方块实体及坐标 | [`crates/pumpkin-world`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-world) |

---

## 方块注册表与分派系统

方块交互事件通过 [`crates/pumpkin/src/block/registry.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/block/registry.rs) 中的中央 `BlockRegistry` 路由：

1. **注册**：服务器初始化时，所有行为结构体都会注册到 `BlockManager` 中。
2. **映射**：管理器将数字 `BlockId` 键映射到线程安全的行为实例（`Arc<dyn BlockBehaviour>`）。
3. **分派**：当网络层收到方块操作数据包（例如 `CUseItemOn` 或方块挖掘数据包）时，服务器会以 $O(1)$ 时间复杂度查找行为并调用相应的钩子。

---

## 后续步骤

要实现新的交互方块行为，请继续阅读实践指南：

- **[添加方块](/zh_cn/developer/blocks/adding-blocks)**：完整介绍如何声明属性、实现交互钩子、创建方块实体和注册行为。
