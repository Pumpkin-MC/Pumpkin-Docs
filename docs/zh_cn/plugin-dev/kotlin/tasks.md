# 任务

`PumpkinPlugin.tasks` 可在延迟后或按固定间隔执行操作。Pumpkin 通常每秒运行 20 个 tick。

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

lambda 接收 `Server.Server`。保存返回的 `ScheduledTask`，即可取消待执行的操作：

```kotlin
val reminder = tasks.afterTicks(100uL) { server ->
    Logging.log(Logging.Level.INFO, "Reminder")
}

// 如果不再需要提醒，请在另一个回调中调用。
reminder.cancel()
```

一次性任务开始执行或已经取消后，`cancel()` 不会产生效果。API 会移除已完成的处理器，并在插件卸载时取消待执行的任务。通过 `tasks` 注册的任务不需要重写 `handleTask`。

`everyTicks` 接收初始延迟和重复间隔：

```kotlin
val heartbeat = tasks.everyTicks(0uL, 20uL) { server ->
    Logging.log(Logging.Level.INFO, "A second has passed")
}

// 不再需要重复执行时，请在另一个回调中调用。
heartbeat.cancel()
```

取消句柄也会释放其 Kotlin 回调。重复任务会在插件卸载时取消。有关直接 WIT 调用的信息，请参阅 [`scheduler` WIT 定义](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/scheduler.wit)；[回调参考](./callbacks#kotlin-回调层)列出了 `tasks` 使用的操作。
