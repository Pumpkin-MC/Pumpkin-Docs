# Tạo Lệnh Đầu Tiên Của Bạn

Thêm `/hello` vào plugin từ [Bắt Đầu Nhanh](./quick-start). `commands.register` liên kết lệnh với callback thực thi Kotlin của nó.

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
        authors = listOf("Tên của bạn"),
        description = "Một plugin Kotlin với một lệnh",
        dependencies = emptyList(),
        permissions = emptyList(),
    )

    override fun onLoad(context: PluginContext): Result<Unit> = runCatching {
        context.registerPermission(
            Permission.Permission(
                node = "example:hello",
                description = "Cho phép sử dụng /hello",
                default = Permission.PermissionDefault.Allow,
                children = emptyList(),
            )
        ).getOrThrow()

        val command = Command.Command(
            names = listOf("hello"),
            description = "Chào người gửi",
        )
        commands.register(context, command, "example:hello") { sender, _, _ ->
            sender.sendMessage(Text.TextComponent.text("Xin chào từ Kotlin!"))
            Result.success(1)
        }
        Unit
    }
}
```

`onLoad` đăng ký quyền và lệnh. `commands.register` quản lý ID bộ xử lý và gửi việc thực thi đến lambda; plugin không ghi đè `handleCommand`.

Callback trả về `Result<Int>`; `Result.success(1)` báo hiệu thành công. Xây dựng và tải plugin như được mô tả trong Bắt Đầu Nhanh.

Để biết gợi ý và các xuất WIT cơ bản, xem [tham khảo callback](./callbacks#kotlin-callback-layer).
