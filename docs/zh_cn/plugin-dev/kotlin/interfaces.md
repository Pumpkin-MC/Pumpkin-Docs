# Kotlin 接口对照表

[`plugin` world](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/plugin.wit)导入以下宿主接口。Kotlin 在 `pumpkin` 中提供这些接口；例如，WIT `boss-bar` 会变为 `pumpkin.BossBar`。每个 WIT 链接都会打开其源定义。

| WIT 定义 | 生成的 Kotlin 命名空间 | 用途 |
| --- | --- | --- |
| [`logging`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/log.wit) | `Logging` | 服务器日志记录。 |
| [`gui`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/gui.wit) | `Gui` | GUI 资源及其物品栏。 |
| [`scoreboard`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/scoreboard.wit) | `Scoreboard` | 记分板资源。 |
| [`server`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/server.wit) | `Server` | 全局服务器和玩家查询。 |
| [`text`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/text.wit) | `Text` | 文本组件。 |
| [`command`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/command.wit) | `Command` | 命令树、发送者、参数、执行和建议。`commands` 管理回调 ID。 |
| [`context`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/context.wit) | `Context` | `Context.Context` 注册、服务器访问和插件数据文件夹。 |
| [`i18n`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/i18n.wit) | `I18n` | 翻译和区域设置支持。 |
| [`scheduler`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/scheduler.wit) | `Scheduler` | 延迟/重复任务和取消。`PumpkinPlugin.tasks` 管理两种回调形式。 |
| [`world`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/world.wit) | `World` | 世界、方块、实体、区块和生成。自定义 AI 和生成器会回调到 `PumpkinPlugin`。 |
| [`entity`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/entity.wit) | `Entity` | 在整个 API 中提供的实体相关类型。 |
| [`boss-bar`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/boss-bar.wit) | `BossBar` | Boss 栏类型和资源。 |
| [`forms`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/forms.wit) | `Forms` | 基岩版表单。 |
| [`java-dialogs`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/java-dialogs.wit) | `JavaDialogs` | Java 版对话框。 |
| [`status-effect`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/status-effect.wit) | `StatusEffect` | 状态效果类型和实例。 |
| [`block-entity`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/block-entity.wit) | `BlockEntity` | 方块实体类型和资源。 |
| [`ipc`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/ipc.wit) | `Ipc` | 向另一个插件发送消息；传入消息使用 `handleIpcMessage`。 |
| [`attributes`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/attributes.wit) | `Attributes` | 实体属性和修饰符。 |
| [`player`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/player.wit) | `Player` | 玩家资源和操作，包括物品栏访问。 |
| [`advancement`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/advancement.wit) | `Advancement` | 进度定义和进展。 |
| [`recipe`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/recipe.wit) | `Recipe` | 配方定义和注册。 |
| [`inventory`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/inventory.wit) | `Inventory` | 物品栏和玩家物品栏资源操作。 |
| [`datapack`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/datapack.wit) | `Datapack` | 数据包检查和管理。 |
| [`enchantments`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/enchantments.wit) | `Enchantments` | 魔咒类型。 |
| [`damage-types`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/damage-types.wit) | `DamageTypes` | 伤害类型。 |
| [`screens`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/screens.wit) | `Screens` | 界面和容器类型。 |
| [`statistics`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/statistics.wit) | `Statistics` | 玩家统计类别和类型。 |
| [`display`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/display.wit) | `Display` | 展示实体和交互实体。 |
| [`game-rules`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/game-rules.wit) | `GameRules` | 游戏规则定义和值。 |
| [`game-events`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/game-events.wit) | `GameEvents` | 游戏事件类型。 |
| [`potions`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/potions.wit) | `Potions` | 药水类型。 |
| [`entity-statuses`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/entity-statuses.wit) | `EntityStatuses` | 实体状态和动画类型。 |

## WIT 名称对应的 Kotlin 定义

生成的 Kotlin 名称和类型遵循 WIT 定义：

| WIT | Kotlin |
| --- | --- |
| `context` 资源 `context` | `Context.Context`；在手写 API 中也别名为 `PluginContext` |
| `inventory` 资源 `inventory` | `Inventory.Inventory` |
| `event` 变体 `event` | `Event.Event` |
| `world` 资源 `world` | `World.World` |
| `u8`、`u16`、`u32`、`u64` | `UByte`、`UShort`、`UInt`、`ULong` |
| `s32`、`bool`、`string` | `Int`、`Boolean`、`String` |
| `list<u8>`、`option<T>` | `List<UByte>`、可空的 `T?` |
| `result<T, E>` | 生成的调用边界处为 Kotlin `Result<T>` |

WIT `register-event-with-handle` 变为 `context.registerEventWithHandle(handlerId, eventType, priority, blocking)`，并返回一个 `ULong`。WIT `get-item: func(slot: u32) -> option<item-stack>` 变为 `inventory.getItem(slot: UInt): ItemStack.ItemStack?`。IDE 补全会显示你的 API 版本中的成员。

以下操作将生成的 WIT 调用与 Kotlin 注册 API 连接起来：

| WIT 操作 | 生成的 Kotlin 调用 | Kotlin API |
| --- | --- | --- |
| `context.register-event-with-handle` 和 `unregister-event` | `context.registerEventWithHandle(id, type, priority, blocking)` 和 `context.unregisterEvent(registrationId)` | `events.listen(...)` 和 `EventSubscription.unregister()` |
| `command.execute-with-handler-id` 和 `context.register-command` | 先调用 `command.executeWithHandlerId(id)`，再调用 `context.registerCommand(command, permission)` | `commands.register(...)` |
| `command-node.suggest-with-handler-id` | `node.suggestWithHandlerId(id)` | `commands.onSuggestions(...)` |
| `scheduler.schedule-delayed-task` | `Scheduler.scheduleDelayedTask(id, delayTicks)` | `tasks.afterTicks(...)` |
| `scheduler.schedule-repeating-task` 和 `cancel-task` | `Scheduler.scheduleRepeatingTask(id, delayTicks, periodTicks)` 和 `Scheduler.cancelTask(taskId)` | `tasks.everyTicks(...)` 和 `ScheduledTask.cancel()` |
| `mob.add-custom-ai-goal` | `mob.addCustomAiGoal(priority, goalId)` | `aiGoals.register(...)` |
| `world.set-chunk-generator` | `world.setChunkGenerator(generatorId)` | `chunkGenerators.set(...)` |
| `ipc.send-ipc-message` | `Ipc.sendIpcMessage(recipient, message)` | 传出 IPC；接收方使用 `ipc.onMessage(...)` |

Kotlin API 会为其注册方法分配处理器 ID。通过生成的绑定直接调用时，需要自行管理这些 ID。

## 共享类型接口

这些接口定义宿主导入和插件导出使用的类型。它们不是 `plugin` world 中单独的导入：

| WIT 定义 | Kotlin 命名空间 |
| --- | --- |
| [`common`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/common.wit)、[`uuid`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/uuid.wit) | `Common`、`Uuid` |
| [`biomes`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/biomes.wit)、[`sounds`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/sounds.wit)、[`particles`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/particles.wit) | `Biomes`、`Sounds`、`Particles` |
| [`java-packets`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/java-packets.wit)、[`bedrock-packets`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/bedrock-packets.wit) | `JavaPackets`、`BedrockPackets` |
| [`item-stack`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/item-stack.wit)、[`data-components`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/data-components.wit) | `ItemStack`、`DataComponents` |
| [`permission`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/permission.wit)、[`event`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/event.wit)、[`metadata`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/metadata.wit)、[`entity-types`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/entity-types.wit) | `Permission`、`Event`、`Metadata`、`EntityTypes` |

`Inventory.Inventory.getItem` 和 `setItem` 等资源方法不需要回调或处理器 ID。[回调参考](./callbacks)介绍了需要它们的操作。
