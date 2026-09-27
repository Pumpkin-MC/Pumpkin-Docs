# Kotlin Interface Map

The [`plugin` world](../wit/plugin) imports these host interfaces. Kotlin exposes them in `pumpkin`; for example, WIT `boss-bar` becomes `pumpkin.BossBar`. Each WIT link lists its types, operations, and signatures.

| WIT definition | Generated Kotlin namespace | Purpose |
| --- | --- | --- |
| [`logging`](../wit/logging) | `Logging` | Server logging. |
| [`gui`](../wit/gui) | `Gui` | GUI resources and their inventories. |
| [`scoreboard`](../wit/scoreboard) | `Scoreboard` | Scoreboard resources. |
| [`server`](../wit/server) | `Server` | Global server and player lookup. |
| [`text`](../wit/text) | `Text` | Text components. |
| [`command`](../wit/command) | `Command` | Command trees, senders, arguments, execution, and suggestions. `commands` manages callback IDs. |
| [`context`](../wit/context) | `Context` | `Context.Context` registration, server access, and plugin data folder. |
| [`i18n`](../wit/i18n) | `I18n` | Translation and locale support. |
| [`scheduler`](../wit/scheduler) | `Scheduler` | Delayed/repeating tasks and cancellation. `PumpkinPlugin.tasks` manages both callback forms. |
| [`world`](../wit/world) | `World` | Worlds, blocks, entities, chunks, and generation. Custom AI and generators call back into `PumpkinPlugin`. |
| [`entity`](../wit/entity) | `Entity` | Entity-related types exposed across the API. |
| [`boss-bar`](../wit/boss-bar) | `BossBar` | Boss bar types and resources. |
| [`forms`](../wit/forms) | `Forms` | Bedrock forms. |
| [`java-dialogs`](../wit/java-dialogs) | `JavaDialogs` | Java Edition dialogs. |
| [`status-effect`](../wit/status-effect) | `StatusEffect` | Status effect types and instances. |
| [`block-entity`](../wit/block-entity) | `BlockEntity` | Block entity types and resources. |
| [`ipc`](../wit/ipc) | `Ipc` | Send messages to another plugin; inbound messages use `handleIpcMessage`. |
| [`attributes`](../wit/attributes) | `Attributes` | Entity attributes and modifiers. |
| [`player`](../wit/player) | `Player` | Player resources and operations, including inventory access. |
| [`advancement`](../wit/advancement) | `Advancement` | Advancement definitions and progress. |
| [`recipe`](../wit/recipe) | `Recipe` | Recipe definitions and registration. |
| [`inventory`](../wit/inventory) | `Inventory` | Inventory and player-inventory resource operations. |
| [`datapack`](../wit/datapack) | `Datapack` | Datapack inspection and management. |
| [`enchantments`](../wit/enchantments) | `Enchantments` | Enchantment types. |
| [`damage-types`](../wit/damage-types) | `DamageTypes` | Damage types. |
| [`screens`](../wit/screens) | `Screens` | Screen and container types. |
| [`statistics`](../wit/statistics) | `Statistics` | Player statistics categories and types. |
| [`display`](../wit/display) | `Display` | Display and interaction entities. |
| [`game-rules`](../wit/game-rules) | `GameRules` | Game rule definitions and values. |
| [`game-events`](../wit/game-events) | `GameEvents` | Game event types. |
| [`potions`](../wit/potions) | `Potions` | Potion types. |
| [`entity-statuses`](../wit/entity-statuses) | `EntityStatuses` | Entity status and animation types. |

## WIT names as Kotlin definitions

The generated Kotlin names and types follow the WIT definitions:

| WIT | Kotlin |
| --- | --- |
| `context` resource `context` | `Context.Context`; also aliased as `PluginContext` by the handwritten API |
| `inventory` resource `inventory` | `Inventory.Inventory` |
| `event` variant `event` | `Event.Event` |
| `world` resource `world` | `World.World` |
| `u8`, `u16`, `u32`, `u64` | `UByte`, `UShort`, `UInt`, `ULong` |
| `s32`, `bool`, `string` | `Int`, `Boolean`, `String` |
| `list<u8>`, `option<T>` | `List<UByte>`, nullable `T?` |
| `result<T, E>` | Kotlin `Result<T>` at the generated call boundary |

WIT `register-event-with-handle` becomes `context.registerEventWithHandle(handlerId, eventType, priority, blocking)` and returns a `ULong`. WIT `get-item: func(slot: u32) -> option<item-stack>` becomes `inventory.getItem(slot: UInt): ItemStack.ItemStack?`. IDE completion shows the members in your API version.

These operations connect generated WIT calls to the Kotlin registration APIs:

| WIT operation | Generated Kotlin call | Kotlin API |
| --- | --- | --- |
| `context.register-event-with-handle` and `unregister-event` | `context.registerEventWithHandle(id, type, priority, blocking)` and `context.unregisterEvent(registrationId)` | `events.listen(...)` and `EventSubscription.unregister()` |
| `command.execute-with-handler-id` and `context.register-command` | `command.executeWithHandlerId(id)` then `context.registerCommand(command, permission)` | `commands.register(...)` |
| `command-node.suggest-with-handler-id` | `node.suggestWithHandlerId(id)` | `commands.onSuggestions(...)` |
| `scheduler.schedule-delayed-task` | `Scheduler.scheduleDelayedTask(id, delayTicks)` | `tasks.afterTicks(...)` |
| `scheduler.schedule-repeating-task` and `cancel-task` | `Scheduler.scheduleRepeatingTask(id, delayTicks, periodTicks)` and `Scheduler.cancelTask(taskId)` | `tasks.everyTicks(...)` and `ScheduledTask.cancel()` |
| `mob.add-custom-ai-goal` | `mob.addCustomAiGoal(priority, goalId)` | `aiGoals.register(...)` |
| `world.set-chunk-generator` | `world.setChunkGenerator(generatorId)` | `chunkGenerators.set(...)` |
| `ipc.send-ipc-message` | `Ipc.sendIpcMessage(recipient, message)` | Outbound IPC; the recipient uses `ipc.onMessage(...)` |

The Kotlin API assigns handler IDs for its registration methods. Direct calls through generated bindings require you to manage those IDs.

## Shared type interfaces

These interfaces define types used by host imports and plugin exports. They are not separate imports in the `plugin` world:

| WIT definitions | Kotlin namespaces |
| --- | --- |
| [`common`](../wit/common), [`uuid`](../wit/uuid) | `Common`, `Uuid` |
| [`biomes`](../wit/biomes), [`sounds`](../wit/sounds), [`particles`](../wit/particles) | `Biomes`, `Sounds`, `Particles` |
| [`java-packets`](../wit/java-packets), [`bedrock-packets`](../wit/bedrock-packets) | `JavaPackets`, `BedrockPackets` |
| [`item-stack`](../wit/item-stack), [`data-components`](../wit/data-components) | `ItemStack`, `DataComponents` |
| [`permission`](../wit/permission), [`event`](../wit/event), [`metadata`](../wit/metadata), [`entity-types`](../wit/entity-types) | `Permission`, `Event`, `Metadata`, `EntityTypes` |

Resource methods such as `Inventory.Inventory.getItem` and `setItem` need no callback or handler ID. The [callback reference](./callbacks) covers operations that do.
