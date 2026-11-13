# 事件

在 `onLoad(context)` 中呼叫 `events.listen`，並傳入事件型別、優先順序、阻塞標誌和監聽器。

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

`Event.EventType` 用於選擇事件。監聽器接收一個 `Event.Event` 變體，並且必須返回該變體，可以附帶修改。此範例原樣返回事件。

當 `blocking = true` 時，Pumpkin 會等待回呼完成後再繼續處理事件。需要讓返回的事件影響處理過程時，請使用此設定。處理器 ID 由 API 分配。

`events.listen` 返回一個 `EventSubscription`。如果 `unregister()` 移除了註冊，則返回 `true`；如果註冊已不存在，則返回 `false`。正在進行的回呼仍可能執行完畢。剩餘訂閱會在插件卸載時移除。

有關資料欄位，請參閱[事件型別](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/event.wit)；有關 `events.listen` 背後的 WIT 呼叫，請參閱[回呼參考](./callbacks#kotlin-回呼層)。
