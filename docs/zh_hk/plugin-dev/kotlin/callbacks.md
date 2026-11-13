# Kotlin 回調參考

伺服器會調用 [`plugin` world](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/plugin.wit) 中的匯出。本頁介紹對應的 Kotlin 方法和註冊 API。有關主機匯入，請參閱[界面對照表](./interfaces)。

`pumpkin.pluginClass` 指定要實例化的無參數 `PumpkinPlugin` 子類。API 實現 `PluginRootFunctions.Exports` 和 `Metadata`。

## 生命週期和元資料

| WIT 匯出 | Kotlin 方法 | 用途 |
| --- | --- | --- |
| `init-plugin()` | `open fun initPlugin(): Unit` | 可選的啟動鉤子，由引導程式碼調用。 |
| `on-load(context)` | `open fun onLoad(context: PluginContext): Result<Unit>` | 註冊指令、事件或執行其他設定。預設返回成功。 |
| `on-unload(context)` | `open fun onUnload(context: PluginContext): Result<Unit>` | 可選的清理操作。橋接層還會關閉受管理的註冊和任務。預設返回成功。 |
| `metadata.get-metadata()` | `abstract fun metadata(): PluginMetadata` | 必需：返回名稱、版本、作者、描述、依賴項和權限。 |

`PluginContext` 是 `pumpkin.Context.Context` 的別名；`PluginMetadata` 是 `pumpkin.Metadata.PluginMetadata` 的別名。生命週期函數返回的 WIT `result<_, string>` 在 Kotlin 中表現為 `Result<Unit>`。

## 分發回調

以下是匯出橋接層的簽名。`Server.Server` 是伺服器資源。註冊 API 會分配處理器 ID；直接使用 WIT 時，則需要自行分配。

| WIT 匯出 → Kotlin 重寫方法 | Kotlin 參數和返回值 | Kotlin 註冊 API |
| --- | --- | --- |
| `handle-event` → `handleEvent` | `(eventId: UInt, server: Server.Server, event: Event.Event): Event.Event` | `events.listen(...)` |
| `handle-command` → `handleCommand` | `(commandId: UInt, sender: Command.CommandSender, server: Server.Server, args: Command.ConsumedArgs): Result<Int>` | `commands.register(...)` |
| `handle-command-suggestion` → `handleCommandSuggestion` | `(handlerId: UInt, sender: Command.CommandSender, server: Server.Server, request: Command.SuggestionRequest): Command.CommandSuggestions` | `commands.onSuggestions(...)` |
| `handle-task` → `handleTask` | `(handlerId: UInt, server: Server.Server): Unit` | `tasks.afterTicks(...)` 或 `tasks.everyTicks(...)` |
| `handle-ipc-message` → `handleIpcMessage` | `(sender: String, message: List<UByte>): Result<List<UByte>>` | `ipc.onMessage(...)` |
| `handle-ai-goal-can-start` → `handleAiGoalCanStart` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Boolean` | `aiGoals.register(...)` |
| `handle-ai-goal-should-continue` → `handleAiGoalShouldContinue` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Boolean` | 同一個已註冊的 `CustomAiGoal`。 |
| `handle-ai-goal-start` → `handleAiGoalStart` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Unit` | 同一個已註冊的 `CustomAiGoal`。 |
| `handle-ai-goal-tick` → `handleAiGoalTick` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Unit` | 同一個已註冊的 `CustomAiGoal`。 |
| `handle-ai-goal-stop` → `handleAiGoalStop` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Unit` | 同一個已註冊的 `CustomAiGoal`。 |
| `handle-generate-phase` → `handleGeneratePhase` | `(generatorId: UInt, phase: World.GenerationPhase, chunk: World.ChunkBuffer): Unit` | `chunkGenerators.set(...)` |

API 提供預設實現。僅在直接處理相應的 WIT 分發時，才需要重寫橋接方法。

低於 `0x8000_0000u` 的原始任務 ID 可供直接 WIT 處理器使用；任務輔助方法使用較高的範圍。此保留規則適用於**任務**回調。受管理 API 的 ID 保留在 Kotlin 層內。

## Kotlin 回調層

註冊方法接受以下回調類型：

```kotlin
// Kotlin API 回呼型別摘錄。
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

回調使用生成的 WIT 類型。事件監聽器接收並返回 `Event.Event`；一個 `CustomAiGoal` 在同一個目標 ID 下實現五個回調。

| 功能 | Kotlin 註冊 | WIT 操作 | API 行為 |
| --- | --- | --- | --- |
| 事件 | `events.listen(context, type, priority, blocking) { server, event -> event }` 返回 `EventSubscription` | `context.register-event-with-handle`、`context.unregister-event`、`handle-event` | 分配 ID、分發事件、保留返回的事件，並在調用 `unregister()` 時移除主機註冊。 |
| 指令 | `commands.register(context, command, permission) { sender, server, args -> Result.success(1) }`；`commands.onSuggestions(node) { sender, server, request -> ... }` | `command.execute-with-handler-id`、`command-node.suggest-with-handler-id`、`context.register-command`、`handle-command`、`handle-command-suggestion` | 分配不同的執行和建議 ID，分發兩個回調，並在卸載時釋放 Kotlin 處理器。 |
| 任務 | `tasks.afterTicks(delayTicks) { server -> ... }` 或 `tasks.everyTicks(delayTicks, periodTicks) { server -> ... }` 返回 `ScheduledTask` | `scheduler.schedule-delayed-task`、`schedule-repeating-task`、`cancel-task`、`handle-task` | 分配並回收處理器 ID、取消主機任務，並在卸載時清理。 |
| 傳入 IPC | `ipc.onMessage { sender, message -> Result.success(response) }` | `handle-ipc-message` | 路由唯一的傳入訊息回調。傳出的 `Ipc.sendIpcMessage(...)` 使用其生成的綁定。 |
| 自訂 AI 目標 | `aiGoals.register(mob, priority, goal)` 接受一個 `CustomAiGoal` 物件 | `mob.add-custom-ai-goal` 和五個 `handle-ai-goal-*` 匯出 | 為五個回調分配同一個目標 ID，並將它們分發到同一個 Kotlin 物件。 |
| 區塊生成 | `chunkGenerators.set(world) { phase, chunk -> ... }` | `world.set-chunk-generator` 和 `handle-generate-phase` | 分配生成器 ID，並將各階段分發給 Kotlin 回調。 |

物品欄、玩家、世界和文字操作可透過生成的綁定使用。

WIT 指令節點聲明瞭 `require-with-handler-id`，但插件 world 沒有匹配的條件檢查回調匯出。指令權限使用 `context.registerCommand(command, permission)` 和伺服器的權限系統。
