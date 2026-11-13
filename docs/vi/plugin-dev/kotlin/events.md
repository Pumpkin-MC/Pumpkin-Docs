# Sự kiện

Gọi `events.listen` từ `onLoad(context)` với một loại sự kiện, mức độ ưu tiên, cờ chặn và bộ lắng nghe.

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
        authors = listOf("Tên của bạn"),
        description = "Một plugin lắng nghe người chơi tham gia",
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
                Logging.log(Logging.Level.INFO, "Một người chơi đã tham gia")
            }
            event
        }
        return Result.success(Unit)
    }
}
```

`Event.EventType` chọn sự kiện. Bộ lắng nghe nhận một biến thể `Event.Event` và phải trả về nó, với bất kỳ thay đổi nào. Ví dụ này trả về nó không thay đổi.

Với `blocking = true`, Pumpkin đợi callback trước khi tiếp tục sự kiện. Sử dụng nó khi sự kiện được trả về phải ảnh hưởng đến việc xử lý. API gán ID bộ xử lý.

`events.listen` trả về một `EventSubscription`. `unregister()` trả về `true` nếu nó đã xóa đăng ký và `false` nếu đăng ký đã bị xóa trước đó. Một callback đang thực thi có thể vẫn hoàn thành. Các đăng ký còn lại bị xóa khi tải xuống.

Xem [các loại sự kiện](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/event.wit) cho các trường dữ liệu và [tham khảo callback](./callbacks#kotlin-callback-layer) cho các gọi WIT đằng sau `events.listen`.
