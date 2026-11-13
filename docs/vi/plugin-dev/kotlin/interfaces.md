# Bản Đồ Giao Diện Kotlin

[`plugin` world](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/plugin.wit) nhập các giao diện máy chủ này. Kotlin hiển thị chúng trong `pumpkin`; ví dụ, WIT `boss-bar` trở thành `pumpkin.BossBar`. Mỗi liên kết WIT mở định nghĩa nguồn của nó.

| Định nghĩa WIT | Namespace Kotlin đã tạo | Mục đích |
| --- | --- | --- |
| [`logging`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/log.wit) | `Logging` | Ghi nhật ký máy chủ. |
| [`gui`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/gui.wit) | `Gui` | Tài nguyên GUI và kho của chúng. |
| [`scoreboard`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/scoreboard.wit) | `Scoreboard` | Tài nguyên bảng điểm. |
| [`server`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/server.wit) | `Server` | Tra cứu máy chủ và người chơi toàn cầu. |
| [`text`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/text.wit) | `Text` | Thành phần văn bản. |
| [`command`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/command.wit) | `Command` | Cây lệnh, người gửi, đối số, thực thi và gợi ý. `commands` quản lý các ID callback. |
| [`context`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/context.wit) | `Context` | Đăng ký `Context.Context`, truy cập máy chủ và thư mục dữ liệu plugin. |
| [`i18n`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/i18n.wit) | `I18n` | Dịch và hỗ trợ ngôn ngữ. |
| [`scheduler`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/scheduler.wit) | `Scheduler` | Nhiệm vụ trễ/lặp và hủy. `PumpkinPlugin.tasks` quản lý cả hai hình thức callback. |
| [`world`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/world.wit) | `World` | Thế giới, khối, thực thể, chunk và tạo. AI tùy chỉnh và bộ tạo gọi lại vào `PumpkinPlugin`. |
| [`entity`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/entity.wit) | `Entity` | Các loại liên quan đến thực thể được hiển thị trên toàn API. |
| [`boss-bar`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/boss-bar.wit) | `BossBar` | Các loại và tài nguyên thanh boss. |
| [`forms`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/forms.wit) | `Forms` | Biểu mẫu Bedrock. |
| [`java-dialogs`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/java-dialogs.wit) | `JavaDialogs` | Hộp thoại Java Edition. |
| [`status-effect`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/status-effect.wit) | `StatusEffect` | Các loại và instance hiệu ứng trạng thái. |
| [`block-entity`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/block-entity.wit) | `BlockEntity` | Các loại và tài nguyên thực thể khối. |
| [`ipc`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/ipc.wit) | `Ipc` | Gửi tin nhắn đến plugin khác; tin nhắn đến sử dụng `handleIpcMessage`. |
| [`attributes`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/attributes.wit) | `Attributes` | Thuộc tính và sửa đổi thực thể. |
| [`player`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/player.wit) | `Player` | Tài nguyên và thao tác người chơi, bao gồm truy cập kho. |
| [`advancement`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/advancement.wit) | `Advancement` | Định nghĩa và tiến trình thành tựu. |
| [`recipe`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/recipe.wit) | `Recipe` | Định nghĩa và đăng ký công thức. |
| [`inventory`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/inventory.wit) | `Inventory` | Kho và thao tác tài nguyên kho người chơi. |
| [`datapack`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/datapack.wit) | `Datapack` | Kiểm tra và quản lý datapack. |
| [`enchantments`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/enchantments.wit) | `Enchantments` | Các loại phù phép. |
| [`damage-types`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/damage-types.wit) | `DamageTypes` | Các loại sát thương. |
| [`screens`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/screens.wit) | `Screens` | Các loại màn hình và container. |
| [`statistics`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/statistics.wit) | `Statistics` | Các loại và danh mục thống kê người chơi. |
| [`display`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/display.wit) | `Display` | Hiển thị và thực thể tương tác. |
| [`game-rules`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/game-rules.wit) | `GameRules` | Định nghĩa và giá trị quy tắc game. |
| [`game-events`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/game-events.wit) | `GameEvents` | Các loại sự kiện game. |
| [`potions`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/potions.wit) | `Potions` | Các loại potion. |
| [`entity-statuses`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/entity-statuses.wit) | `EntityStatuses` | Trạng thái thực thể và các loại hoạt hình. |

## Tên WIT dưới dạng định nghĩa Kotlin

Tên và loại Kotlin đã tạo tuân theo định nghĩa WIT:

| WIT | Kotlin |
| --- | --- |
| tài nguyên `context` `context` | `Context.Context`; cũng được alias là `PluginContext` bởi API viết tay |
| tài nguyên `inventory` `inventory` | `Inventory.Inventory` |
| biến thể `event` `event` | `Event.Event` |
| tài nguyên `world` `world` | `World.World` |
| `u8`, `u16`, `u32`, `u64` | `UByte`, `UShort`, `UInt`, `ULong` |
| `s32`, `bool`, `string` | `Int`, `Boolean`, `String` |
| `list<u8>`, `option<T>` | `List<UByte>`, `T?` nullable |
| `result<T, E>` | Kotlin `Result<T>` tại ranh giới gọi đã tạo |

WIT `register-event-with-handle` trở thành `context.registerEventWithHandle(handlerId, eventType, priority, blocking)` và trả về một `ULong`. WIT `get-item: func(slot: u32) -> option<item-stack>` trở thành `inventory.getItem(slot: UInt): ItemStack.ItemStack?`. Hoàn thành IDE hiển thị các thành phần trong phiên bản API của bạn.

Các thao tác này kết nối các gọi WIT đã tạo với các API đăng ký Kotlin:

| Thao tác WIT | Gọi Kotlin đã tạo | API Kotlin |
| --- | --- | --- |
| `context.register-event-with-handle` và `unregister-event` | `context.registerEventWithHandle(id, type, priority, blocking)` và `context.unregisterEvent(registrationId)` | `events.listen(...)` và `EventSubscription.unregister()` |
| `command.execute-with-handler-id` và `context.register-command` | `command.executeWithHandlerId(id)` sau đó `context.registerCommand(command, permission)` | `commands.register(...)` |
| `command-node.suggest-with-handler-id` | `node.suggestWithHandlerId(id)` | `commands.onSuggestions(...)` |
| `scheduler.schedule-delayed-task` | `Scheduler.scheduleDelayedTask(id, delayTicks)` | `tasks.afterTicks(...)` |
| `scheduler.schedule-repeating-task` và `cancel-task` | `Scheduler.scheduleRepeatingTask(id, delayTicks, periodTicks)` và `Scheduler.cancelTask(taskId)` | `tasks.everyTicks(...)` và `ScheduledTask.cancel()` |
| `mob.add-custom-ai-goal` | `mob.addCustomAiGoal(priority, goalId)` | `aiGoals.register(...)` |
| `world.set-chunk-generator` | `world.setChunkGenerator(generatorId)` | `chunkGenerators.set(...)` |
| `ipc.send-ipc-message` | `Ipc.sendIpcMessage(recipient, message)` | IPC đi; người nhận sử dụng `ipc.onMessage(...)` |

API Kotlin gán các ID bộ xử lý cho các phương thức đăng ký của nó. Các gọi trực tiếp thông qua các binding đã tạo yêu cầu bạn quản lý các ID đó.

## Giao diện loại chia sẻ

Các giao diện này định nghĩa các loại được sử dụng bởi các nhập máy chủ và xuất plugin. Chúng không phải là các nhập riêng biệt trong `plugin` world:

| Định nghĩa WIT | Namespace Kotlin |
| --- | --- |
| [`common`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/common.wit), [`uuid`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/uuid.wit) | `Common`, `Uuid` |
| [`biomes`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/biomes.wit), [`sounds`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/sounds.wit), [`particles`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/particles.wit) | `Biomes`, `Sounds`, `Particles` |
| [`java-packets`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/java-packets.wit), [`bedrock-packets`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/bedrock-packets.wit) | `JavaPackets`, `BedrockPackets` |
| [`item-stack`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/item-stack.wit), [`data-components`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/data-components.wit) | `ItemStack`, `DataComponents` |
| [`permission`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/permission.wit), [`event`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/event.wit), [`metadata`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/metadata.wit), [`entity-types`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/entity-types.wit) | `Permission`, `Event`, `Metadata`, `EntityTypes` |

Các phương thức tài nguyên như `Inventory.Inventory.getItem` và `setItem` không cần callback hay ID bộ xử lý. [Tham khảo callback](./callbacks) bao gồm các thao tác có cần.
