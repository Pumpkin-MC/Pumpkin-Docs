# 命令架构与分派器

Pumpkin 通过专用的 `pumpkin-command` crate，提供了高性能、纯 Rust 实现的 **Brigadier** 命令树规范。它协调命令解析、需求解析、类型安全的参数反序列化、执行分支，以及面向 **Minecraft: Java Edition** 和 **Minecraft: Bedrock Edition** 的双版本客户端命令树同步。

### 命令处理流程

Pumpkin 中执行的每个命令都会经过以下独立阶段：

1. **输入规范化**：移除单个前导斜杠，同时保留插件的多斜杠约定（例如 `//set`）。
2. **可用性检查**：以标准的 `unknown command` 语法错误拒绝通过服务器配置禁用的命令。
3. **权限评估**：根据执行命令的发送者验证需求（`PermissionLvl` 或自定义注册表节点）。
4. **分词与解析**：`StringReader` 递归遍历 `Tree<S>`，匹配字面量关键字并解析带类型的参数。
5. **上下文分派**：使用带类型的 `CommandContext<S>` 调用匹配的 `CommandExecutor` 回调。
6. **反馈与结果消费**：格式化跨平台翻译组件、通知观察者，并将退出码写回调用方。

---

## `pumpkin-command` Crate

Pumpkin 将命令解析和命令树表示从主服务器运行时解耦到模块化的 `pumpkin-command` crate（`crates/pumpkin-command`）中。

`pumpkin-command` 的关键组件包括：

- **`Tree<S>`**：基于连续向量存储的已挂载命令节点（`AttachedNode`）。
- **`CommandDispatcher<S>`**：中央注册表与分派引擎。它处理原始命令字符串、使用 `StringReader` 解析标记、遍历命令树并执行目标回调。
- **`ArgumentBuilder`**：仿照 Mojang Brigadier 库的流式构建器 API（`command`、`literal`、`argument`）。
- **`CommandSource`**：表示当前位置、朝向、维度、实体和反馈输出流的通用执行状态。

---

## 命令节点层级

Pumpkin 中的命令被建模为有向节点图。为优化内存分配并避免构建期间的循环引用问题，系统将节点分为**分离**和**挂载**两种状态：

### 1. 分离节点（`DetachedNode`）

注册前使用流式构建器（`CommandArgumentBuilder`、`LiteralArgumentBuilder`、`RequiredArgumentBuilder`）构造：

- **`CommandDetachedNode`**：表示带有标识符和描述的根命令入口。
- **`LiteralDetachedNode`**：表示子命令分支中的字面量关键字（例如 `/gamemode creative` 中的 `set`）。
- **`ArgumentDetachedNode`**：表示由 `ArgumentType` 解析的带类型参数（例如坐标、实体选择器、整数范围）。

### 2. 挂载节点（`AttachedNode`）

注册到 `CommandDispatcher` 后，分离的命令树会被扁平化为带索引的 `Tree<S>` 结构：

```rust
pub enum AttachedNode<S: CommandSource = DummySource> {
    Root(RootAttachedNode<S>),
    Literal(LiteralAttachedNode<S>),
    Argument(ArgumentAttachedNode<S>),
    Command(CommandAttachedNode<S>),
}
```

每个挂载节点都具有：

- **`NodeId`**：指向连续节点区域的零成本类型化索引（`NonZero<usize>`）。
- **`children`**：用于字面量和子参数的快速查找表（`FxHashMap<String, NodeId>`）。
- **`requirements`**：决定发送者是否有权查看或执行该节点的谓词。
- **`command`**：当解析在此节点终止时调用的可选 `CommandExecutor` 回调。
- **`redirect`**：用于回环或重定向到另一棵子树的可选 `Redirection` 指针（`/execute` 大量使用）。

---

## 分派与执行流程

命令到达服务器时，`CommandDispatcher::handle_command` 会通过多个阶段处理它：

```rust
pub fn handle_command<'a>(&'a self, source: &S, mut input: &'a str) {
    // 1. 移除单个前导斜杠（保留 //set 这类双斜杠命令）
    if let Some(sliced) = input.strip_prefix('/') {
        let first_token = input.split_whitespace().next().unwrap_or("");
        let sliced_token = sliced.split_whitespace().next().unwrap_or("");
        if !self.has_command(first_token)
            && (self.has_command(sliced_token) || !first_token.starts_with("//"))
        {
            input = sliced;
        }
    }

    // 2. 检查配置中禁用的命令
    if self.is_disabled(Self::command_name(input)) {
        let reader = StringReader::new(input);
        Self::send_error_to_source(source, DISPATCHER_UNKNOWN_COMMAND.create(&reader), input);
        return;
    }

    // 3. 解析并执行
    let output = self.execute_input(input, source);
    if let Err(error) = output {
        Self::send_error_to_source(source, error, input);
    }
}
```

### 语法错误格式化

当解析遇到无效语法、意外标记或超出范围的参数时，Pumpkin 会构造 `CommandSyntaxError`。如果上下文可用，分派器会格式化一个可视化指针，准确标出解析器失败的位置：

```
Unknown or incomplete command, see below for error
/gamemode creatve<--[HERE]
```

在 Java 版客户端中，这段错误文本会附带 `ClickEvent::SuggestCommand`，玩家可以点击聊天中的错误，将失败的命令复制到输入框中快速编辑。

---

## 双版本网络同步

与只为 Java 版序列化命令图的原版服务器不同，Pumpkin 会动态地向 Java 版和基岩版客户端同步已注册的命令树：

### 1. Java 版：`CCommands` 数据包

当玩家加入或权限等级更新（例如通过 `/op` 或 `/deop`）时，Pumpkin 会构建并发送 `CCommands` 数据包（`pumpkin_protocol::java::client::play::CCommands`）：

- 将 `AttachedNode` 转换为扁平的 `ProtoNode` 条目数组。
- 过滤掉禁用的命令以及 `requirements.evaluate(source)` 返回 `false` 的节点。
- 序列化参数解析器（`brigadier:string`、`brigadier:integer`、`minecraft:entity` 等）和客户端建议标识符。

### 2. 基岩版：`CAvailableCommands` 数据包

基岩版使用重载与枚举格式，而不是 Brigadier 的递归图。在 `client_suggestions.rs` 中，Pumpkin 会遍历 `AttachedNode` 树以合成：

- **`CommandData`**：根命令名称、描述、权限标志和别名。
- **`OverloadData`**：通往可执行终点的参数链扁平排列组合。
- **`ParamData`**：基岩版参数类型、位标志（`ARG_FLAG_VALID`、`ARG_FLAG_ENUM`）以及动态收集的枚举值表。

---

## 通用执行目标

Pumpkin 命令可由多种发送者执行：

| 发送者 | 来源表示 | 输出目标 | 默认权限 |
| :--- | :--- | :--- | :--- |
| **玩家** | `CommandSender::Player(Arc<Player>)` | 客户端系统聊天数据包 | 从权限等级 / 权限文件加载 |
| **服务器控制台** | `CommandSender::Console` | 标准输出（`tracing::info!`） | 4 级（完整管理绕过） |
| **RCON 控制台** | `CommandSender::Rcon(Arc<Mutex<Vec<String>>>)` | 网络响应数据包负载 | 4 级 |
| **命令方块** | `CommandSender::CommandBlock(Arc<CommandBlockEntity>, Arc<World>)` | NBT `LastOutput` 字段 | 2 级 |
| **数据包函数** | 从调用方继承的 `CommandSender` | 继承 | 继承 |
| **WASM 插件** | 通过 WIT `execute_command` 宿主调用调用 | 通过 `ResultDeferrer` 捕获 | 可配置 |

---

## 命令配置与禁用

Pumpkin 允许服务器管理员通过 `config/commands.toml`（`CommandsConfig`）禁用单个命令。命令被禁用后：

1. 会从 Java 客户端的 `CCommands` 数据包中省略。
2. 会从基岩客户端的 `CAvailableCommands` 数据包中省略。
3. Tab 补全会完全忽略该命令。
4. 任何调用该命令的尝试都会返回 `DISPATCHER_UNKNOWN_COMMAND`。
