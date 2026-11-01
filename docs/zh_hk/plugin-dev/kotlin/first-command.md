# 建立你的第一個指令

為[快速入門](./quick-start)中的插件新增 `/hello`。`commands.register` 會將指令綁定到其 Kotlin 執行回調。

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

`onLoad` 註冊權限和指令。`commands.register` 管理處理器 ID，並將執行請求傳送給 lambda；插件無需重寫 `handleCommand`。

回調返回 `Result<Int>`；`Result.success(1)` 表示成功。按照快速入門中的說明構建並載入插件。

有關指令建議和底層 WIT 匯出的資訊，請參閱[回調參考](./callbacks#kotlin-回調層)。
