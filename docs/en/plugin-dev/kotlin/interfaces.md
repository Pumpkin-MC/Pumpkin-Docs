# Kotlin Interface Map

The [`plugin` world](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/plugin.wit) imports these host interfaces. Kotlin exposes them in `pumpkin`; for example, WIT `boss-bar` becomes `pumpkin.BossBar`. Each WIT link opens its source definition.

| WIT definition | Generated Kotlin namespace | Purpose |
| --- | --- | --- |
| [`logging`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/log.wit) | `Logging` | Server logging. |
| [`gui`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/gui.wit) | `Gui` | GUI resources and their inventories. |
| [`scoreboard`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/scoreboard.wit) | `Scoreboard` | Scoreboard resources. |
| [`server`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/server.wit) | `Server` | Global server and player lookup. |
| [`text`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/text.wit) | `Text` | Text components. |
| [`command`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/command.wit) | `Command` | Command trees, senders, arguments, execution, and suggestions. `commands` manages callback IDs. |
| [`context`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/context.wit) | `Context` | `Context.Context` registration, server access, and plugin data folder. |
| [`i18n`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/i18n.wit) | `I18n` | Translation and locale support. |
| [`scheduler`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/scheduler.wit) | `Scheduler` | Delayed/repeating tasks and cancellation. `PumpkinPlugin.tasks` manages both callback forms. |
| [`world`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/world.wit) | `World` | Worlds, blocks, entities, chunks, and generation. Custom AI and generators call back into `PumpkinPlugin`. |
| [`entity`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/entity.wit) | `Entity` | Entity-related types exposed across the API. |
| [`boss-bar`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/boss-bar.wit) | `BossBar` | Boss bar types and resources. |
| [`forms`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/forms.wit) | `Forms` | Bedrock forms. |
| [`java-dialogs`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/java-dialogs.wit) | `JavaDialogs` | Java Edition dialogs. |
| [`status-effect`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/status-effect.wit) | `StatusEffect` | Status effect types and instances. |
| [`block-entity`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/block-entity.wit) | `BlockEntity` | Block entity types and resources. |
| [`ipc`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/ipc.wit) | `Ipc` | Send messages to another plugin; inbound messages use `handleIpcMessage`. |
| [`attributes`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/attributes.wit) | `Attributes` | Entity attributes and modifiers. |
| [`player`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/player.wit) | `Player` | Player resources and operations, including inventory access. |
| [`advancement`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/advancement.wit) | `Advancement` | Advancement definitions and progress. |
| [`recipe`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/recipe.wit) | `Recipe` | Recipe definitions and registration. |
| [`inventory`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/inventory.wit) | `Inventory` | Inventory and player-inventory resource operations. |
| [`datapack`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/datapack.wit) | `Datapack` | Datapack inspection and management. |
| [`enchantments`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/enchantments.wit) | `Enchantments` | Enchantment types. |
| [`damage-types`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/damage-types.wit) | `DamageTypes` | Damage types. |
| [`screens`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/screens.wit) | `Screens` | Screen and container types. |
| [`statistics`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/statistics.wit) | `Statistics` | Player statistics categories and types. |
| [`display`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/display.wit) | `Display` | Display and interaction entities. |
| [`game-rules`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/game-rules.wit) | `GameRules` | Game rule definitions and values. |
| [`game-events`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/game-events.wit) | `GameEvents` | Game event types. |
| [`potions`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/potions.wit) | `Potions` | Potion types. |
| [`entity-statuses`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/entity-statuses.wit) | `EntityStatuses` | Entity status and animation types. |

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
| [`common`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/common.wit), [`uuid`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/uuid.wit) | `Common`, `Uuid` |
| [`biomes`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/biomes.wit), [`sounds`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/sounds.wit), [`particles`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/particles.wit) | `Biomes`, `Sounds`, `Particles` |
| [`java-packets`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/java-packets.wit), [`bedrock-packets`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/bedrock-packets.wit) | `JavaPackets`, `BedrockPackets` |
| [`item-stack`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/item-stack.wit), [`data-components`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/data-components.wit) | `ItemStack`, `DataComponents` |
| [`permission`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/permission.wit), [`event`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/event.wit), [`metadata`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/metadata.wit), [`entity-types`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/entity-types.wit) | `Permission`, `Event`, `Metadata`, `EntityTypes` |

Resource methods such as `Inventory.Inventory.getItem` and `setItem` need no callback or handler ID. The [callback reference](./callbacks) covers operations that do.
