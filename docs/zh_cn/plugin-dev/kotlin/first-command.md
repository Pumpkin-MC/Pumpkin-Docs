# 创建你的第一个命令

为[快速入门](./quick-start)中的插件添加 `/hello`。`commands.register` 会将命令绑定到其 Kotlin 执行回调。

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

`onLoad` 注册权限和命令。`commands.register` 管理处理器 ID，并将执行请求发送给 lambda；插件无需重写 `handleCommand`。

回调返回 `Result<Int>`；`Result.success(1)` 表示成功。按照快速入门中的说明构建并加载插件。

有关命令建议和底层 WIT 导出的信息，请参阅[回调参考](./callbacks#kotlin-回调层)。
