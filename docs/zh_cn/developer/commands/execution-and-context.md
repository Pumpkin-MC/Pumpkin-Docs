# 执行与上下文

在 Pumpkin 中，命令执行将命令的**物理来源**与其**运行时上下文**分离。此设计支持复杂的命令路由、维度切换、条件执行以及符合原版行为的 `/execute` 链式调用。

---

## `CommandSender` 与 `CommandSource`

理解 `CommandSender` 与 `CommandSource` 的区别，是开发 Pumpkin 命令的基础：

| 属性 | `CommandSender` | `CommandSource` |
| :--- | :--- | :--- |
| **概念** | 物理来源和网络目标 | 可变的运行时执行环境 |
| **可变性** | 在命令执行期间不可变 | 在 `/execute` 分支之间被克隆和修改 |
| **关键字段** | 终端套接字、连接句柄、RCON 缓冲区 | 世界、位置坐标、朝向、实体、静默标志 |
| **创建方式** | 在网络连接或终端输入时实例化 | 通过 `sender.into_source(&server)` 构造 |

### 1. `CommandSender`（物理调用方）

表示发起命令并接收其输出的实体或套接字：

```rust
pub enum CommandSender {
    Console,
    Rcon(Arc<std::sync::Mutex<Vec<String>>>),
    Player(Arc<Player>),
    CommandBlock(Arc<CommandBlockEntity>, Arc<World>),
    Dummy,
}
```

- **输出目标**：决定使用 `send_message` 格式化的消息发送到哪里（例如标准输出、RCON 缓冲区、玩家数据包或方块实体 NBT）。
- **固定权限**：保存固定的基础权限（例如控制台具有 4 级绕过权限；命令方块具有 2 级权限）。

### 2. `CommandSource`（执行环境）

表示命令求值期间的可变运行时状态：

```rust
pub struct CommandSource {
    pub output: CommandSender,
    pub world: Option<Arc<World>>,
    pub entity: Option<Arc<dyn EntityBase>>,
    pub position: Vector3<f64>,
    pub rotation: Vector2<f32>,
    pub name: String,
    pub display_name: TextComponent,
    pub server: Option<Arc<Server>>,
    pub silent: bool,
    pub command_result_taker: ResultValueTaker,
    pub entity_anchor: EntityAnchor,
}
```

发送者通过 `sender.into_source(&server)` 转换为 `CommandSource`。

---

## `/execute` 命令与上下文重定向

`/execute` 命令会在把控制权交给下游命令前修改 `CommandSource` 属性。

### 分支修饰符
- **`as <targets>`**：将 `context.source.entity` 更改为目标实体，不改变位置或朝向。
- **`at <targets>`**：更新 `context.source.world`、`position` 和 `rotation`，使其匹配目标实体。
- **`positioned <pos>`**：将 `context.source.position` 修改为新坐标。
- **`in <dimension>`**：将 `context.source.world` 更改为指定维度（主世界、下界、末地）。
- **`anchored (feet|eyes)`**：调整用于视线和朝向检查的坐标偏移。

### 上下文分叉与链式调用

当 `/execute` 匹配多个目标（例如 `/execute as @e run ...`）时，`pumpkin-command` 会使用**分叉**：

1. 分派器为每个匹配目标分叉一次执行上下文。
2. 子命令针对每个克隆出的 `CommandSource` 独立执行。
3. 所有执行的累计成功计数会被聚合。

---

## 结果值与成功计数

原版命令通过整数退出码和返回值传回结果。

### 返回值回调

执行器返回 `CommandExecutorResult`（`Result<i32, CommandSyntaxError>`）。返回的整数表示：

- **0**：失败或未影响任何实体。
- **> 0**：受影响的实体、已更改方块或已清除物品的数量。

对于命令方块，此值会持久化到方块实体的 `SuccessCount` 中：

```rust
pub fn set_success_count(&self, count: u32) {
    if let Self::CommandBlock(c, _) = self {
        c.success_count.store(count, Ordering::SeqCst);
    }
}
```

### `/execute store`

与 `/execute store (result|success) ...` 链式调用时，Pumpkin 会通过 `ReturnValueCallback` 拦截返回值，并将其写入记分板、Boss 栏或实体 NBT 标签。

---

## 反馈与游戏规则集成

向命令发送者发送输出受服务器配置和世界游戏规则控制：

```rust
context.source.send_feedback(
    TextComponent::text("Command executed successfully!"),
    true, // 广播给服务器管理员
);
```

### 输出规则矩阵

| 条件 | 反馈行为 |
| :--- | :--- |
| `silent == true` | 输出被完全抑制。 |
| `send_command_feedback == false` | 玩家发送者不会收到成功反馈（仍会显示错误）。 |
| `command_block_output == false` | 命令方块的执行输出不会广播给在线管理员。 |
| `broadcast_console_to_ops == true` | 服务器控制台和 RCON 命令会向所有在线的 2 级及以上 OP 玩家发送一份反馈副本。 |
