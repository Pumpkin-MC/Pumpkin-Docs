# Kotlin 回调参考

服务器会调用 [`plugin` world](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/plugin.wit) 中的导出。本页介绍对应的 Kotlin 方法和注册 API。有关宿主导入，请参阅[接口对照表](./interfaces)。

`pumpkin.pluginClass` 指定要实例化的无参数 `PumpkinPlugin` 子类。API 实现 `PluginRootFunctions.Exports` 和 `Metadata`。

## 生命周期和元数据

| WIT 导出 | Kotlin 方法 | 用途 |
| --- | --- | --- |
| `init-plugin()` | `open fun initPlugin(): Unit` | 可选的启动钩子，由引导代码调用。 |
| `on-load(context)` | `open fun onLoad(context: PluginContext): Result<Unit>` | 注册命令、事件或执行其他设置。默认返回成功。 |
| `on-unload(context)` | `open fun onUnload(context: PluginContext): Result<Unit>` | 可选的清理操作。桥接层还会关闭受管理的注册和任务。默认返回成功。 |
| `metadata.get-metadata()` | `abstract fun metadata(): PluginMetadata` | 必需：返回名称、版本、作者、描述、依赖项和权限。 |

`PluginContext` 是 `pumpkin.Context.Context` 的别名；`PluginMetadata` 是 `pumpkin.Metadata.PluginMetadata` 的别名。生命周期函数返回的 WIT `result<_, string>` 在 Kotlin 中表现为 `Result<Unit>`。

## 分发回调

以下是导出桥接层的签名。`Server.Server` 是服务器资源。注册 API 会分配处理器 ID；直接使用 WIT 时，则需要自行分配。

| WIT 导出 → Kotlin 重写方法 | Kotlin 参数和返回值 | Kotlin 注册 API |
| --- | --- | --- |
| `handle-event` → `handleEvent` | `(eventId: UInt, server: Server.Server, event: Event.Event): Event.Event` | `events.listen(...)` |
| `handle-command` → `handleCommand` | `(commandId: UInt, sender: Command.CommandSender, server: Server.Server, args: Command.ConsumedArgs): Result<Int>` | `commands.register(...)` |
| `handle-command-suggestion` → `handleCommandSuggestion` | `(handlerId: UInt, sender: Command.CommandSender, server: Server.Server, request: Command.SuggestionRequest): Command.CommandSuggestions` | `commands.onSuggestions(...)` |
| `handle-task` → `handleTask` | `(handlerId: UInt, server: Server.Server): Unit` | `tasks.afterTicks(...)` 或 `tasks.everyTicks(...)` |
| `handle-ipc-message` → `handleIpcMessage` | `(sender: String, message: List<UByte>): Result<List<UByte>>` | `ipc.onMessage(...)` |
| `handle-ai-goal-can-start` → `handleAiGoalCanStart` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Boolean` | `aiGoals.register(...)` |
| `handle-ai-goal-should-continue` → `handleAiGoalShouldContinue` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Boolean` | 同一个已注册的 `CustomAiGoal`。 |
| `handle-ai-goal-start` → `handleAiGoalStart` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Unit` | 同一个已注册的 `CustomAiGoal`。 |
| `handle-ai-goal-tick` → `handleAiGoalTick` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Unit` | 同一个已注册的 `CustomAiGoal`。 |
| `handle-ai-goal-stop` → `handleAiGoalStop` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Unit` | 同一个已注册的 `CustomAiGoal`。 |
| `handle-generate-phase` → `handleGeneratePhase` | `(generatorId: UInt, phase: World.GenerationPhase, chunk: World.ChunkBuffer): Unit` | `chunkGenerators.set(...)` |

API 提供默认实现。仅在直接处理相应的 WIT 分发时，才需要重写桥接方法。

低于 `0x8000_0000u` 的原始任务 ID 可供直接 WIT 处理器使用；任务辅助方法使用较高的范围。此保留规则适用于**任务**回调。受管理 API 的 ID 保留在 Kotlin 层内。

## Kotlin 回调层

注册方法接受以下回调类型：

```kotlin
// Kotlin API 回调类型摘录。
fun interface EventListener {
    fun onEvent(server: Server.Server, event: Event.Event): Event.Event
}

interface EventSubscription {
    fun unregister(): Boolean
}

fun interface CommandExecutor {
    fun execute(
        sender: Command.CommandSender,
        server: Server.Server,
        args: Command.ConsumedArgs,
    ): Result<Int>
}

fun interface SuggestionProvider {
    fun suggest(
        sender: Command.CommandSender,
        server: Server.Server,
        request: Command.SuggestionRequest,
    ): Command.CommandSuggestions
}

fun interface TaskAction {
    fun run(server: Server.Server)
}

fun interface IpcMessageHandler {
    fun onMessage(sender: String, message: List<UByte>): Result<List<UByte>>
}

interface CustomAiGoal {
    fun canStart(server: Server.Server, entity: World.Entity): Boolean
    fun shouldContinue(server: Server.Server, entity: World.Entity): Boolean
    fun start(server: Server.Server, entity: World.Entity)
    fun tick(server: Server.Server, entity: World.Entity)
    fun stop(server: Server.Server, entity: World.Entity)
}

fun interface ChunkGenerator {
    fun generate(phase: World.GenerationPhase, chunk: World.ChunkBuffer)
}
```

回调使用生成的 WIT 类型。事件监听器接收并返回 `Event.Event`；一个 `CustomAiGoal` 在同一个目标 ID 下实现五个回调。

| 功能 | Kotlin 注册 | WIT 操作 | API 行为 |
| --- | --- | --- | --- |
| 事件 | `events.listen(context, type, priority, blocking) { server, event -> event }` 返回 `EventSubscription` | `context.register-event-with-handle`、`context.unregister-event`、`handle-event` | 分配 ID、分发事件、保留返回的事件，并在调用 `unregister()` 时移除宿主注册。 |
| 命令 | `commands.register(context, command, permission) { sender, server, args -> Result.success(1) }`；`commands.onSuggestions(node) { sender, server, request -> ... }` | `command.execute-with-handler-id`、`command-node.suggest-with-handler-id`、`context.register-command`、`handle-command`、`handle-command-suggestion` | 分配不同的执行和建议 ID，分发两个回调，并在卸载时释放 Kotlin 处理器。 |
| 任务 | `tasks.afterTicks(delayTicks) { server -> ... }` 或 `tasks.everyTicks(delayTicks, periodTicks) { server -> ... }` 返回 `ScheduledTask` | `scheduler.schedule-delayed-task`、`schedule-repeating-task`、`cancel-task`、`handle-task` | 分配并回收处理器 ID、取消宿主任务，并在卸载时清理。 |
| 传入 IPC | `ipc.onMessage { sender, message -> Result.success(response) }` | `handle-ipc-message` | 路由唯一的传入消息回调。传出的 `Ipc.sendIpcMessage(...)` 使用其生成的绑定。 |
| 自定义 AI 目标 | `aiGoals.register(mob, priority, goal)` 接受一个 `CustomAiGoal` 对象 | `mob.add-custom-ai-goal` 和五个 `handle-ai-goal-*` 导出 | 为五个回调分配同一个目标 ID，并将它们分发到同一个 Kotlin 对象。 |
| 区块生成 | `chunkGenerators.set(world) { phase, chunk -> ... }` | `world.set-chunk-generator` 和 `handle-generate-phase` | 分配生成器 ID，并将各阶段分发给 Kotlin 回调。 |

物品栏、玩家、世界和文本操作可通过生成的绑定使用。

WIT 命令节点声明了 `require-with-handler-id`，但插件 world 没有匹配的条件检查回调导出。命令权限使用 `context.registerCommand(command, permission)` 和服务器的权限系统。
