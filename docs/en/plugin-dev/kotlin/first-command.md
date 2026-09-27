# Creating Your First Command

Add `/hello` to the plugin from the [Quick Start](./quick-start). `commands.register` binds the command to its Kotlin execution callback.

```kotlin [src/wasmWasiMain/kotlin/example/ExamplePlugin.kt]
package example

import plugin.PluginContext
import plugin.PluginMetadata
import plugin.PumpkinPlugin
import pumpkin.Command
import pumpkin.Permission
import pumpkin.Text

class ExamplePlugin : PumpkinPlugin() {
    override fun metadata() = PluginMetadata(
        name = "my-kotlin-plugin",
        version = "0.1.0",
        authors = listOf("Your name"),
        description = "A Kotlin plugin with a command",
        dependencies = emptyList(),
        permissions = emptyList(),
    )

    override fun onLoad(context: PluginContext): Result<Unit> = runCatching {
        context.registerPermission(
            Permission.Permission(
                node = "example:hello",
                description = "Allows using /hello",
                default = Permission.PermissionDefault.Allow,
                children = emptyList(),
            )
        ).getOrThrow()

        val command = Command.Command(
            names = listOf("hello"),
            description = "Greets the sender",
        )
        commands.register(context, command, "example:hello") { sender, _, _ ->
            sender.sendMessage(Text.TextComponent.text("Hello from Kotlin!"))
            Result.success(1)
        }
        Unit
    }
}
```

`onLoad` registers the permission and command. `commands.register` manages the handler ID and sends execution to the lambda; the plugin does not override `handleCommand`.

The callback returns `Result<Int>`; `Result.success(1)` signals success. Build and load the plugin as described in the Quick Start.

For suggestions and underlying WIT exports, see the [callback reference](./callbacks#kotlin-callback-layer).
