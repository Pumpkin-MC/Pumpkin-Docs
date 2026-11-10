# Tổng Quan Kotlin API

[Plugin world](https://github.com/Pumpkin-MC/Pumpkin/blob/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1/plugin.wit) định nghĩa các cuộc gọi giữa một plugin và máy chủ. [Thư mục nguồn WIT](https://github.com/Pumpkin-MC/Pumpkin/tree/60b808ec89e05911c7b33aa3f58f78459105bf30/crates/pumpkin-plugin-wit/v0.1) chứa các định nghĩa giao diện.

| Hướng | Kotlin API | Mã plugin |
| --- | --- | --- |
| Xuất: máy chủ gọi vào plugin | Các callback `PumpkinPlugin` và `PluginMetadata` | Kế thừa `PumpkinPlugin`, cấu hình `pumpkin.pluginClass`, và ghi đè các callback bạn cần. |
| Nhập: plugin gọi vào máy chủ | Các loại đã tạo trong `pumpkin.*`, như `Context.Context`, `Inventory.Inventory`, và `World.World` | Gọi trực tiếp các binding đã tạo. |

[Tham khảo callback](./callbacks) ánh xạ các xuất đến các phương thức Kotlin. [Bản đồ giao diện](./interfaces) liệt kê các namespace đã tạo.

## Đăng ký callback

Plugin Gradle sử dụng `pumpkin.pluginClass` để khởi tạo subclass `PumpkinPlugin` của bạn. API triển khai các xuất WIT, bao gồm các gọi vòng đời và metadata.

Sử dụng `events`, `commands`, `tasks`, `ipc`, `aiGoals`, và `chunkGenerators` để đăng ký các callback. API gán các ID bộ xử lý và điều phối các cuộc gọi. `events.listen(...)` trả về một `EventSubscription` với `unregister()`; các phương thức task trả về một `ScheduledTask` với `cancel()`.

Bạn vẫn có thể ghi đè các phương thức `PumpkinPlugin` để xử lý WIT trực tiếp. Các gọi tài nguyên đã tạo như `inventory.getItem(slot)` không cần đăng ký callback.

## Các binding đã tạo

Các helper Kotlin quản lý các callback; các binding đã tạo mang dữ liệu máy chủ. Ví dụ, `Event.Event` là biến thể sự kiện, `Command.ConsumedArgs` giữ các đối số đã phân tích, `Inventory.Inventory` thao tác trên các slot, và `World.ChunkBuffer` là tài nguyên tạo.

Phiên bản API xác định các binding WIT đi kèm. Plugin và máy chủ phải sử dụng các hợp đồng WIT tương thích; một thao tác trong các binding có thể vắng mặt trên một máy chủ cũ hơn. Hoàn thành IDE hiển thị các thành phần trong bản phát hành đã chọn.
