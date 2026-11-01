# Kotlin 介面對照表

[`plugin` world](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/plugin.wit)匯入以下主機介面。Kotlin 在 `pumpkin` 中提供這些介面；例如，WIT `boss-bar` 會變為 `pumpkin.BossBar`。每個 WIT 連結都會開啟其源定義。

| WIT 定義 | 生成的 Kotlin 名稱空間 | 用途 |
| --- | --- | --- |
| [`logging`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/log.wit) | `Logging` | 伺服器日誌記錄。 |
| [`gui`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/gui.wit) | `Gui` | GUI 資源及其物品欄。 |
| [`scoreboard`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/scoreboard.wit) | `Scoreboard` | 記分板資源。 |
| [`server`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/server.wit) | `Server` | 全域性伺服器和玩家查詢。 |
| [`text`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/text.wit) | `Text` | 文字元件。 |
| [`command`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/command.wit) | `Command` | 指令樹、傳送者、引數、執行和建議。`commands` 管理回呼 ID。 |
| [`context`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/context.wit) | `Context` | `Context.Context` 註冊、伺服器存取和插件資料資料夾。 |
| [`i18n`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/i18n.wit) | `I18n` | 翻譯和區域設定支援。 |
| [`scheduler`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/scheduler.wit) | `Scheduler` | 延遲/重複任務和取消。`PumpkinPlugin.tasks` 管理兩種回呼形式。 |
| [`world`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/world.wit) | `World` | 世界、方塊、實體、區塊和生成。自訂 AI 和生成器會回呼到 `PumpkinPlugin`。 |
| [`entity`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/entity.wit) | `Entity` | 在整個 API 中提供的實體相關型別。 |
| [`boss-bar`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/boss-bar.wit) | `BossBar` | Boss 欄型別和資源。 |
| [`forms`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/forms.wit) | `Forms` | 基岩版表單。 |
| [`java-dialogs`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/java-dialogs.wit) | `JavaDialogs` | Java 版對話方塊。 |
| [`status-effect`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/status-effect.wit) | `StatusEffect` | 狀態效果型別和例項。 |
| [`block-entity`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/block-entity.wit) | `BlockEntity` | 方塊實體型別和資源。 |
| [`ipc`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/ipc.wit) | `Ipc` | 向另一個插件傳送訊息；傳入訊息使用 `handleIpcMessage`。 |
| [`attributes`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/attributes.wit) | `Attributes` | 實體屬性和修飾符。 |
| [`player`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/player.wit) | `Player` | 玩家資源和操作，包括物品欄存取。 |
| [`advancement`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/advancement.wit) | `Advancement` | 進度定義和進展。 |
| [`recipe`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/recipe.wit) | `Recipe` | 配方定義和註冊。 |
| [`inventory`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/inventory.wit) | `Inventory` | 物品欄和玩家物品欄資源操作。 |
| [`datapack`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/datapack.wit) | `Datapack` | 資料包檢查和管理。 |
| [`enchantments`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/enchantments.wit) | `Enchantments` | 附魔型別。 |
| [`damage-types`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/damage-types.wit) | `DamageTypes` | 傷害型別。 |
| [`screens`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/screens.wit) | `Screens` | 介面和容器型別。 |
| [`statistics`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/statistics.wit) | `Statistics` | 玩家統計類別和型別。 |
| [`display`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/display.wit) | `Display` | 展示實體和互動實體。 |
| [`game-rules`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/game-rules.wit) | `GameRules` | 遊戲規則定義和值。 |
| [`game-events`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/game-events.wit) | `GameEvents` | 遊戲事件型別。 |
| [`potions`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/potions.wit) | `Potions` | 藥水型別。 |
| [`entity-statuses`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/entity-statuses.wit) | `EntityStatuses` | 實體狀態和動畫型別。 |

## WIT 名稱對應的 Kotlin 定義

生成的 Kotlin 名稱和型別遵循 WIT 定義：

| WIT | Kotlin |
| --- | --- |
| `context` 資源 `context` | `Context.Context`；在手寫 API 中也別名為 `PluginContext` |
| `inventory` 資源 `inventory` | `Inventory.Inventory` |
| `event` 變體 `event` | `Event.Event` |
| `world` 資源 `world` | `World.World` |
| `u8`、`u16`、`u32`、`u64` | `UByte`、`UShort`、`UInt`、`ULong` |
| `s32`、`bool`、`string` | `Int`、`Boolean`、`String` |
| `list<u8>`、`option<T>` | `List<UByte>`、可空的 `T?` |
| `result<T, E>` | 生成的呼叫邊界處為 Kotlin `Result<T>` |

WIT `register-event-with-handle` 變為 `context.registerEventWithHandle(handlerId, eventType, priority, blocking)`，並返回一個 `ULong`。WIT `get-item: func(slot: u32) -> option<item-stack>` 變為 `inventory.getItem(slot: UInt): ItemStack.ItemStack?`。IDE 自動完成會顯示你的 API 版本中的成員。

以下操作將生成的 WIT 呼叫與 Kotlin 註冊 API 連線起來：

| WIT 操作 | 生成的 Kotlin 呼叫 | Kotlin API |
| --- | --- | --- |
| `context.register-event-with-handle` 和 `unregister-event` | `context.registerEventWithHandle(id, type, priority, blocking)` 和 `context.unregisterEvent(registrationId)` | `events.listen(...)` 和 `EventSubscription.unregister()` |
| `command.execute-with-handler-id` 和 `context.register-command` | 先呼叫 `command.executeWithHandlerId(id)`，再呼叫 `context.registerCommand(command, permission)` | `commands.register(...)` |
| `command-node.suggest-with-handler-id` | `node.suggestWithHandlerId(id)` | `commands.onSuggestions(...)` |
| `scheduler.schedule-delayed-task` | `Scheduler.scheduleDelayedTask(id, delayTicks)` | `tasks.afterTicks(...)` |
| `scheduler.schedule-repeating-task` 和 `cancel-task` | `Scheduler.scheduleRepeatingTask(id, delayTicks, periodTicks)` 和 `Scheduler.cancelTask(taskId)` | `tasks.everyTicks(...)` 和 `ScheduledTask.cancel()` |
| `mob.add-custom-ai-goal` | `mob.addCustomAiGoal(priority, goalId)` | `aiGoals.register(...)` |
| `world.set-chunk-generator` | `world.setChunkGenerator(generatorId)` | `chunkGenerators.set(...)` |
| `ipc.send-ipc-message` | `Ipc.sendIpcMessage(recipient, message)` | 傳出 IPC；接收方使用 `ipc.onMessage(...)` |

Kotlin API 會為其註冊方法分配處理器 ID。透過生成的綁定直接呼叫時，需要自行管理這些 ID。

## 共享型別介面

這些介面定義主機匯入和插件匯出使用的型別。它們不是 `plugin` world 中單獨的匯入：

| WIT 定義 | Kotlin 名稱空間 |
| --- | --- |
| [`common`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/common.wit)、[`uuid`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/uuid.wit) | `Common`、`Uuid` |
| [`biomes`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/biomes.wit)、[`sounds`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/sounds.wit)、[`particles`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/particles.wit) | `Biomes`、`Sounds`、`Particles` |
| [`java-packets`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/java-packets.wit)、[`bedrock-packets`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/bedrock-packets.wit) | `JavaPackets`、`BedrockPackets` |
| [`item-stack`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/item-stack.wit)、[`data-components`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/data-components.wit) | `ItemStack`、`DataComponents` |
| [`permission`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/permission.wit)、[`event`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/event.wit)、[`metadata`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/metadata.wit)、[`entity-types`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/entity-types.wit) | `Permission`、`Event`、`Metadata`、`EntityTypes` |

`Inventory.Inventory.getItem` 和 `setItem` 等資源方法不需要回呼或處理器 ID。[回呼參考](./callbacks)介紹了需要它們的操作。
