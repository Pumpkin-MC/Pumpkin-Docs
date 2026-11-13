# Nhiệm vụ

`PumpkinPlugin.tasks` chạy các hành động sau một độ trễ hoặc tại một khoảng cố định. Pumpkin thường chạy 20 tick mỗi giây.

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
        authors = listOf("Tên của bạn"),
        description = "Một plugin với một nhiệm vụ trễ",
        dependencies = emptyList(),
        permissions = emptyList(),
    )

    override fun onLoad(context: PluginContext): Result<Unit> {
        tasks.afterTicks(20uL) { server ->
            Logging.log(Logging.Level.INFO, "Một giây đã trôi qua")
        }
        return Result.success(Unit)
    }
}
```

Lambda nhận `Server.Server`. Lưu `ScheduledTask` được trả về để hủy một hành động đang chờ:

```kotlin
val reminder = tasks.afterTicks(100uL) { server ->
    Logging.log(Logging.Level.INFO, "Nhắc nhở")
}

// Gọi từ một callback khác nếu nhắc nhở không còn cần thiết.
reminder.cancel()
```

`cancel()` không có tác dụng sau khi một nhiệm vụ một lần bắt đầu hoặc đã bị hủy. API xóa các bộ xử lý đã hoàn thành và hủy các nhiệm vụ đang chờ khi tải xuống. Các nhiệm vụ được đăng ký thông qua `tasks` không yêu cầu ghi đè `handleTask`.

`everyTicks` nhận một độ trễ ban đầu và một khoảng lặp:

```kotlin
val heartbeat = tasks.everyTicks(0uL, 20uL) { server ->
    Logging.log(Logging.Level.INFO, "Một giây đã trôi qua")
}

// Gọi từ một callback khác khi công việc lặp không còn cần thiết.
heartbeat.cancel()
```

Hủy bộ xử lý cũng giải phóng callback Kotlin của nó. Các nhiệm vụ lặp bị hủy khi tải xuống. Đối với các gọi WIT trực tiếp, xem [định nghĩa WIT `scheduler`](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/scheduler.wit); [tham khảo callback](./callbacks#kotlin-callback-layer) liệt kê các thao tác được sử dụng bởi `tasks`.
