# Events

Call `events.listen` from `onLoad(context)` with an event type, priority, blocking flag, and listener.

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

`Event.EventType` selects the event. The listener receives an `Event.Event` variant and must return it, with any changes. This example returns it unchanged.

With `blocking = true`, Pumpkin waits for the callback before continuing the event. Use it when the returned event must affect processing. The API assigns the handler ID.

`events.listen` returns an `EventSubscription`. `unregister()` returns `true` if it removed the registration and `false` if the registration was already gone. An in-progress callback may still finish. Remaining subscriptions are removed on unload.

See the [event types](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/event.wit) for data fields and the [callback reference](./callbacks#kotlin-callback-layer) for the WIT calls behind `events.listen`.
