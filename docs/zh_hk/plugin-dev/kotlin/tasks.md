# 任務

`PumpkinPlugin.tasks` 可在延遲後或按固定間隔執行操作。Pumpkin 通常每秒執行 20 個 tick。

```kotlin [src/wasmWasiMain/kotlin/example/ExamplePlugin.kt]
package example

import plugin.PluginContext
import plugin.PluginMetadata
import plugin.PumpkinPlugin
import pumpkin.Logging

class ExamplePlugin : PumpkinPlugin() {
    override fun metadata() = PluginMetadata(
        name = "my-kotlin-plugin",
        version = "0.1.0",
        authors = listOf("Your name"),
        description = "A plugin with a delayed task",
        dependencies = emptyList(),
        permissions = emptyList(),
    )

    override fun onLoad(context: PluginContext): Result<Unit> {
        tasks.afterTicks(20uL) { server ->
            Logging.log(Logging.Level.INFO, "One second has passed")
        }
        return Result.success(Unit)
    }
}
```

lambda 接收 `Server.Server`。儲存返回的 `ScheduledTask`，即可取消待執行的操作：

```kotlin
val reminder = tasks.afterTicks(100uL) { server ->
    Logging.log(Logging.Level.INFO, "Reminder")
}

// 如果不再需要提醒，請在另一個回呼中呼叫。
reminder.cancel()
```

一次性任務開始執行或已經取消後，`cancel()` 不會產生效果。API 會移除已完成的處理器，並在插件卸載時取消待執行的任務。透過 `tasks` 註冊的任務不需要重寫 `handleTask`。

`everyTicks` 接收初始延遲和重複間隔：

```kotlin
val heartbeat = tasks.everyTicks(0uL, 20uL) { server ->
    Logging.log(Logging.Level.INFO, "A second has passed")
}

// 不再需要重複執行階段，請在另一個回呼中呼叫。
heartbeat.cancel()
```

取消句柄也會釋放其 Kotlin 回調。重複任務會在插件卸載時取消。有關直接 WIT 調用的資訊，請參閱 [`scheduler` WIT 定義](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/scheduler.wit)；[回調參考](./callbacks#kotlin-回調層)列出了 `tasks` 使用的操作。
