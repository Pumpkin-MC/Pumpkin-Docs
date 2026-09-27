# Tasks

`PumpkinPlugin.tasks` runs actions after a delay or at a fixed interval. Pumpkin normally runs 20 ticks per second.

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

The lambda receives `Server.Server`. Save the returned `ScheduledTask` to cancel a pending action:

```kotlin
val reminder = tasks.afterTicks(100uL) { server ->
    Logging.log(Logging.Level.INFO, "Reminder")
}

// Call from another callback if the reminder is no longer needed.
reminder.cancel()
```

`cancel()` has no effect after a one-shot task starts or has already been cancelled. The API removes finished handlers and cancels pending tasks on unload. Tasks registered through `tasks` do not require a `handleTask` override.

`everyTicks` takes an initial delay and a repeat interval:

```kotlin
val heartbeat = tasks.everyTicks(0uL, 20uL) { server ->
    Logging.log(Logging.Level.INFO, "A second has passed")
}

// Call from another callback when the repeating work is no longer needed.
heartbeat.cancel()
```

Cancelling the handle also releases its Kotlin callback. Repeating tasks are cancelled on unload. For direct WIT calls, see the [`scheduler` WIT definition](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/scheduler.wit); the [callback reference](./callbacks#kotlin-callback-layer) lists the operations used by `tasks`.
