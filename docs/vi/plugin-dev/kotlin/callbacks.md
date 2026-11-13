# Tham Khảo Callback Kotlin

Máy chủ gọi các xuất trong [`plugin` world](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/plugin.wit). Trang này hiển thị các phương thức Kotlin và API đăng ký của chúng. Đối với các nhập máy chủ, xem [bản đồ giao diện](./interfaces).

`pumpkin.pluginClass` đặt tên cho subclass `PumpkinPlugin` không tham số để khởi tạo. API triển khai `PluginRootFunctions.Exports` và `Metadata`.

## Vòng đời và metadata

| Xuất WIT | Phương thức Kotlin | Cách sử dụng |
| --- | --- | --- |
| `init-plugin()` | `open fun initPlugin(): Unit` | Hook khởi động tùy chọn. Bootstrap gọi nó. |
| `on-load(context)` | `open fun onLoad(context: PluginContext): Result<Unit>` | Đăng ký lệnh, sự kiện, hoặc thiết lập khác. Mặc định là thành công. |
| `on-unload(context)` | `open fun onUnload(context: PluginContext): Result<Unit>` | Dọn dẹp tùy chọn. Cầu nối cũng đóng các đăng ký và nhiệm vụ được quản lý. Mặc định là thành công. |
| `metadata.get-metadata()` | `abstract fun metadata(): PluginMetadata` | Bắt buộc: trả về tên, phiên bản, tác giả, mô tả, dependency và quyền. |

`PluginContext` alias `pumpkin.Context.Context`; `PluginMetadata` alias `pumpkin.Metadata.PluginMetadata`. WIT `result<_, string>` được trả về bởi các hàm vòng đời xuất hiện dưới dạng Kotlin `Result<Unit>`.

## Callback điều phối

Đây là các chữ ký cầu nối xuất. `Server.Server` là tài nguyên máy chủ. Các API đăng ký gán các ID bộ xử lý; sử dụng WIT trực tiếp yêu cầu bạn gán chúng.

| Xuất WIT → Ghi đè Kotlin | Tham số và trả về Kotlin | API đăng ký Kotlin |
| --- | --- | --- |
| `handle-event` → `handleEvent` | `(eventId: UInt, server: Server.Server, event: Event.Event): Event.Event` | `events.listen(...)` |
| `handle-command` → `handleCommand` | `(commandId: UInt, sender: Command.CommandSender, server: Server.Server, args: Command.ConsumedArgs): Result<Int>` | `commands.register(...)` |
| `handle-command-suggestion` → `handleCommandSuggestion` | `(handlerId: UInt, sender: Command.CommandSender, server: Server.Server, request: Command.SuggestionRequest): Command.CommandSuggestions` | `commands.onSuggestions(...)` |
| `handle-task` → `handleTask` | `(handlerId: UInt, server: Server.Server): Unit` | `tasks.afterTicks(...)` hoặc `tasks.everyTicks(...)` |
| `handle-ipc-message` → `handleIpcMessage` | `(sender: String, message: List<UByte>): Result<List<UByte>>` | `ipc.onMessage(...)` |
| `handle-ai-goal-can-start` → `handleAiGoalCanStart` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Boolean` | `aiGoals.register(...)` |
| `handle-ai-goal-should-continue` → `handleAiGoalShouldContinue` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Boolean` | Cùng `CustomAiGoal` đã đăng ký. |
| `handle-ai-goal-start` → `handleAiGoalStart` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Unit` | Cùng `CustomAiGoal` đã đăng ký. |
| `handle-ai-goal-tick` → `handleAiGoalTick` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Unit` | Cùng `CustomAiGoal` đã đăng ký. |
| `handle-ai-goal-stop` → `handleAiGoalStop` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Unit` | Cùng `CustomAiGoal` đã đăng ký. |
| `handle-generate-phase` → `handleGeneratePhase` | `(generatorId: UInt, phase: World.GenerationPhase, chunk: World.ChunkBuffer): Unit` | `chunkGenerators.set(...)` |

API cung cấp các triển khai mặc định. Chỉ ghi đè một phương thức cầu nối khi xử lý điều phối WIT của nó trực tiếp.

Các ID task thô dưới `0x8000_0000u` có sẵn cho các bộ xử lý WIT trực tiếp; các helper task sở hữu phạm vi trên. Khoảng đặt này áp dụng cho các callback **task**. Các API được quản lý giữ ID của chúng bên trong lớp Kotlin.

## Lớp callback Kotlin

Các phương thức đăng ký chấp nhận các loại callback này:

```kotlin
// Trích đoạn các loại callback của Kotlin API.
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

Các callback sử dụng các loại WIT đã tạo. Một bộ lắng nghe sự kiện nhận và trả về `Event.Event`; một `CustomAiGoal` triển khai năm callback dưới một ID mục tiêu.

| Tính năng | Đăng ký Kotlin | Thao tác WIT | Hành vi API |
| --- | --- | --- | --- |
| Sự kiện | `events.listen(context, type, priority, blocking) { server, event -> event }` trả về `EventSubscription` | `context.register-event-with-handle`, `context.unregister-event`, `handle-event` | Cấp phát một ID, điều phối sự kiện, giữ sự kiện được trả về, và xóa đăng ký máy chủ khi `unregister()` được gọi. |
| Lệnh | `commands.register(context, command, permission) { sender, server, args -> Result.success(1) }`; `commands.onSuggestions(node) { sender, server, request -> ... }` | `command.execute-with-handler-id`, `command-node.suggest-with-handler-id`, `context.register-command`, `handle-command`, `handle-command-suggestion` | Cấp phát các ID thực thi và gợi ý riêng biệt, điều phối cả hai callback, và giải phóng các bộ xử lý Kotlin khi tải xuống. |
| Nhiệm vụ | `tasks.afterTicks(delayTicks) { server -> ... }` hoặc `tasks.everyTicks(delayTicks, periodTicks) { server -> ... }` trả về `ScheduledTask` | `scheduler.schedule-delayed-task`, `schedule-repeating-task`, `cancel-task`, `handle-task` | Cấp phát và nghỉ hưu các ID bộ xử lý, hủy các task máy chủ, và dọn dẹp khi tải xuống. |
| IPC đến | `ipc.onMessage { sender, message -> Result.success(response) }` | `handle-ipc-message` | Định tuyến một callback tin nhắn đến. `Ipc.sendIpcMessage(...)` đi sử dụng binding đã tạo của nó. |
| Mục tiêu AI tùy chỉnh | `aiGoals.register(mob, priority, goal)` chấp nhận một object `CustomAiGoal` | `mob.add-custom-ai-goal` và năm xuất `handle-ai-goal-*` | Đưa tất cả năm callback một ID mục tiêu và điều phối chúng đến cùng một object Kotlin. |
| Tạo chunk | `chunkGenerators.set(world) { phase, chunk -> ... }` | `world.set-chunk-generator` và `handle-generate-phase` | Cấp phát một ID bộ tạo và điều phối các pha đến callback Kotlin. |

Các thao tác kho, người chơi, thế giới và văn bản có sẵn thông qua các binding đã tạo.

Nút lệnh WIT khai báo `require-with-handler-id`, nhưng plugin world không có callback yêu cầu khớp nào. Quyền lệnh sử dụng `context.registerCommand(command, permission)` và hệ thống quyền của máy chủ.
