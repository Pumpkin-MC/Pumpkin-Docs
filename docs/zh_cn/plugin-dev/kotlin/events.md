# 事件

在 `onLoad(context)` 中调用 `events.listen`，并传入事件类型、优先级、阻塞标志和监听器。

```kotlin [src/wasmWasiMain/kotlin/example/ExamplePlugin.kt]
package example

import plugin.PluginContext
import plugin.PluginMetadata
import plugin.PumpkinPlugin
import pumpkin.Event
import pumpkin.Logging

class ExamplePlugin : PumpkinPlugin() {
    override fun metadata() = PluginMetadata(
        name = "my-kotlin-plugin",
        version = "0.1.0",
        authors = listOf("Your name"),
        description = "A plugin that listens for player joins",
        dependencies = emptyList(),
        permissions = emptyList(),
    )

    override fun onLoad(context: PluginContext): Result<Unit> {
        events.listen(
            context,
            Event.EventType.PLAYER_JOIN_EVENT,
            Event.EventPriority.NORMAL,
            true,
        ) { _, event ->
            if (event is Event.Event.PlayerJoinEvent) {
                Logging.log(Logging.Level.INFO, "A player joined")
            }
            event
        }
        return Result.success(Unit)
    }
}
```

`Event.EventType` 用于选择事件。监听器接收一个 `Event.Event` 变体，并且必须返回该变体，可以附带修改。此示例原样返回事件。

当 `blocking = true` 时，Pumpkin 会等待回调完成后再继续处理事件。需要让返回的事件影响处理过程时，请使用此设置。处理器 ID 由 API 分配。

`events.listen` 返回一个 `EventSubscription`。如果 `unregister()` 移除了注册，则返回 `true`；如果注册已不存在，则返回 `false`。正在进行的回调仍可能执行完毕。剩余订阅会在插件卸载时移除。

有关数据字段，请参阅[事件类型](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/event.wit)；有关 `events.listen` 背后的 WIT 调用，请参阅[回调参考](./callbacks#kotlin-回调层)。
