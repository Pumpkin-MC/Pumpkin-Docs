# Kotlin Callback Reference

The server calls the exports in the [`plugin` world](../wit/plugin). This page shows their Kotlin methods and registration APIs. For host imports, see the [interface map](./interfaces).

`pumpkin.pluginClass` names the no-argument `PumpkinPlugin` subclass to instantiate. The API implements `PluginRootFunctions.Exports` and `Metadata`.

## Lifecycle and metadata

| WIT export | Kotlin method | Use |
| --- | --- | --- |
| `init-plugin()` | `open fun initPlugin(): Unit` | Optional startup hook. The bootstrap calls it. |
| `on-load(context)` | `open fun onLoad(context: PluginContext): Result<Unit>` | Register commands, events, or other setup. Defaults to success. |
| `on-unload(context)` | `open fun onUnload(context: PluginContext): Result<Unit>` | Optional cleanup. The bridge also closes managed registrations and tasks. Defaults to success. |
| `metadata.get-metadata()` | `abstract fun metadata(): PluginMetadata` | Required: return name, version, authors, description, dependencies, and permissions. |

`PluginContext` aliases `pumpkin.Context.Context`; `PluginMetadata` aliases `pumpkin.Metadata.PluginMetadata`. The WIT `result<_, string>` returned by lifecycle functions appears as Kotlin `Result<Unit>`.

## Dispatch callbacks

These are the export bridge signatures. `Server.Server` is the server resource. The registration APIs assign handler IDs; direct WIT use requires you to assign them.

| WIT export → Kotlin override | Kotlin parameters and return | Kotlin registration API |
| --- | --- | --- |
| `handle-event` → `handleEvent` | `(eventId: UInt, server: Server.Server, event: Event.Event): Event.Event` | `events.listen(...)` |
| `handle-command` → `handleCommand` | `(commandId: UInt, sender: Command.CommandSender, server: Server.Server, args: Command.ConsumedArgs): Result<Int>` | `commands.register(...)` |
| `handle-command-suggestion` → `handleCommandSuggestion` | `(handlerId: UInt, sender: Command.CommandSender, server: Server.Server, request: Command.SuggestionRequest): Command.CommandSuggestions` | `commands.onSuggestions(...)` |
| `handle-task` → `handleTask` | `(handlerId: UInt, server: Server.Server): Unit` | `tasks.afterTicks(...)` or `tasks.everyTicks(...)` |
| `handle-ipc-message` → `handleIpcMessage` | `(sender: String, message: List<UByte>): Result<List<UByte>>` | `ipc.onMessage(...)` |
| `handle-ai-goal-can-start` → `handleAiGoalCanStart` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Boolean` | `aiGoals.register(...)` |
| `handle-ai-goal-should-continue` → `handleAiGoalShouldContinue` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Boolean` | Same registered `CustomAiGoal`. |
| `handle-ai-goal-start` → `handleAiGoalStart` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Unit` | Same registered `CustomAiGoal`. |
| `handle-ai-goal-tick` → `handleAiGoalTick` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Unit` | Same registered `CustomAiGoal`. |
| `handle-ai-goal-stop` → `handleAiGoalStop` | `(goalId: UInt, server: Server.Server, entity: World.Entity): Unit` | Same registered `CustomAiGoal`. |
| `handle-generate-phase` → `handleGeneratePhase` | `(generatorId: UInt, phase: World.GenerationPhase, chunk: World.ChunkBuffer): Unit` | `chunkGenerators.set(...)` |

The API supplies default implementations. Override a bridge method only when handling its WIT dispatch directly.

Raw task IDs below `0x8000_0000u` are available for direct WIT handlers; the task helpers own the upper range. This reservation applies to **task** callbacks. The managed APIs keep their IDs inside the Kotlin layer.

## Kotlin callback layer

Registration methods accept these callback types:

```kotlin
// Excerpts of the Kotlin API's callback types.
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

Callbacks use generated WIT types. An event listener receives and returns `Event.Event`; one `CustomAiGoal` implements five callbacks under one goal ID.

| Feature | Kotlin registration | WIT operations | API behavior |
| --- | --- | --- | --- |
| Events | `events.listen(context, type, priority, blocking) { server, event -> event }` returns `EventSubscription` | `context.register-event-with-handle`, `context.unregister-event`, `handle-event` | Allocate an ID, dispatch the event, preserve the returned event, and remove the host registration when `unregister()` is called. |
| Commands | `commands.register(context, command, permission) { sender, server, args -> Result.success(1) }`; `commands.onSuggestions(node) { sender, server, request -> ... }` | `command.execute-with-handler-id`, `command-node.suggest-with-handler-id`, `context.register-command`, `handle-command`, `handle-command-suggestion` | Allocate distinct execution and suggestion IDs, dispatch both callbacks, and release Kotlin handlers on unload. |
| Tasks | `tasks.afterTicks(delayTicks) { server -> ... }` or `tasks.everyTicks(delayTicks, periodTicks) { server -> ... }` returns `ScheduledTask` | `scheduler.schedule-delayed-task`, `schedule-repeating-task`, `cancel-task`, `handle-task` | Allocate and retire handler IDs, cancel host tasks, and clean up on unload. |
| Incoming IPC | `ipc.onMessage { sender, message -> Result.success(response) }` | `handle-ipc-message` | Route the one inbound message callback. Outbound `Ipc.sendIpcMessage(...)` uses its generated binding. |
| Custom AI goals | `aiGoals.register(mob, priority, goal)` accepts a `CustomAiGoal` object | `mob.add-custom-ai-goal` and the five `handle-ai-goal-*` exports | Give all five callbacks one goal ID and dispatch them to the same Kotlin object. |
| Chunk generation | `chunkGenerators.set(world) { phase, chunk -> ... }` | `world.set-chunk-generator` and `handle-generate-phase` | Allocate a generator ID and dispatch phases to the Kotlin callback. |

Inventory, player, world, and text operations are available through the generated bindings.

The WIT command node declares `require-with-handler-id`, but the plugin world has no matching requirement callback export. Command permissions use `context.registerCommand(command, permission)` and the server's permission system.
