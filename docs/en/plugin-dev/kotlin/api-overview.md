# Kotlin API Overview

The [plugin world](../wit/plugin) defines calls between a plugin and the server. Its [package summary](../wit/) lists the interfaces and their members.

| Direction | Kotlin API | Plugin code |
| --- | --- | --- |
| Exports: server calls into the plugin | `PumpkinPlugin` callbacks and `PluginMetadata` | Extend `PumpkinPlugin`, configure `pumpkin.pluginClass`, and override the callbacks you need. |
| Imports: plugin calls into the server | Generated types under `pumpkin.*`, such as `Context.Context`, `Inventory.Inventory`, and `World.World` | Call the generated bindings directly. |

The [callback reference](./callbacks) maps exports to Kotlin methods. The [interface map](./interfaces) lists generated namespaces.

## Callback registration

The Gradle plugin uses `pumpkin.pluginClass` to instantiate your `PumpkinPlugin` subclass. The API implements the WIT exports, including lifecycle and metadata calls.

Use `events`, `commands`, `tasks`, `ipc`, `aiGoals`, and `chunkGenerators` to register callbacks. The API assigns handler IDs and dispatches calls. `events.listen(...)` returns an `EventSubscription` with `unregister()`; task methods return a `ScheduledTask` with `cancel()`.

You can still override `PumpkinPlugin` methods for direct WIT handling. Generated resource calls such as `inventory.getItem(slot)` need no callback registration.

## Generated bindings

Kotlin helpers manage callbacks; generated bindings carry the server data. For example, `Event.Event` is the event variant, `Command.ConsumedArgs` holds parsed arguments, `Inventory.Inventory` operates on slots, and `World.ChunkBuffer` is the generation resource.

The API version determines the bundled WIT bindings. The plugin and server must use compatible WIT contracts; an operation in the bindings may be absent from an older server. IDE completion shows the members in the selected release.
