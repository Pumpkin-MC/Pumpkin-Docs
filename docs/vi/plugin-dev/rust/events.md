# Viết Event Handler

Event handler là một trong những chức năng chính của plugin. Chúng cho phép một plugin can thiệp vào hoạt động nội bộ của server và thay đổi hành vi của nó để thực hiện một số hành động khác. Đối với một ví dụ đơn giản, chúng ta sẽ triển khai một handler cho `PlayerJoinEvent` và `PlayerLeaveEvent`.

## Triển khai một Event

Các event handler riêng lẻ chỉ là các struct triển khai trait `EventHandler<E>` (trong đó `E` là dữ liệu sự kiện cụ thể).

### Blocking event là gì?

Hệ thống event plugin Pumpkin phân biệt giữa hai loại event: blocking và non-blocking. Mỗi loại đều có lợi ích riêng:

#### Blocking events

```diff
Ưu điểm:
+ Có thể sửa đổi event (như chỉnh sửa thông điệp tham gia)
+ Có thể hủy event
+ Có hệ thống độ ưu tiên
Nhược điểm:
- Được thực thi tuần tự
- Có thể làm chậm server nếu không được triển khai tốt
```

#### Non-blocking events

```diff
Ưu điểm:
+ Được thực thi đồng thời
+ Được thực thi sau khi tất cả blocking event hoàn tất
+ Vẫn có thể thực hiện một số sửa đổi (bất cứ thứ gì nằm sau Mutex hoặc RwLock)
Nhược điểm:
- Không thể hủy event
- Không có hệ thống độ ưu tiên
- Cho phép ít kiểm soát hơn đối với event
```

### Viết một handler

Vì mục tiêu chính của chúng ta ở đây là thay đổi thông điệp chào mừng mà người chơi nhìn thấy khi họ tham gia server, chúng ta sẽ chọn loại blocking event với độ ưu tiên bình thường.

:::code-group

```rust [lib.rs]
// [!code ++:20]
use pumpkin_plugin_api::{
    Context, Plugin, PluginMetadata, Server,
    events::{EventData, EventHandler, EventPriority, PlayerJoinEvent},
    text::TextComponent,
};
use tracing::*;

struct MyJoinHandler;
impl EventHandler<PlayerJoinEvent> for MyJoinHandler {
    fn handle<'a>(
        &'a self,
        server: Server,
        mut event: EventData<PlayerJoinEvent>,
    ) -> EventData<PlayerJoinEvent> { 
        event.join_message = TextComponent::text("Xin chào, thế giới!");
        event
    }
}
```

:::

**Giải thích**:

- `struct MyJoinHandler;`: Struct cho event handler của chúng ta
- Nếu event là non-blocking, chúng ta vẫn sử dụng hàm handle, và trả về dữ liệu event. Dữ liệu event vẫn sẽ bị bỏ qua.

### Đăng ký handler

Bây giờ khi chúng ta đã viết event handler, chúng ta cần báo cho plugin biết để sử dụng nó. Chúng ta có thể làm điều đó bằng cách thêm một dòng duy nhất vào phương thức `on_load`:
:::code-group

```rust [lib.rs]
struct HelloPlugin;
impl Plugin for HelloPlugin {
    fn new() -> Self {
        HelloPlugin
    }

    fn metadata(&self) -> PluginMetadata {
        // ...
    }

    fn on_load(&self, context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("Xin chào từ plugin ví dụ!");
        context.register_event_handler(MyJoinHandler, EventPriority::Normal, true)?;
        Ok(())
    }

    fn on_unload(&self, _context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("Plugin ví dụ đã được gỡ bỏ. Tạm biệt!");
        Ok(())
    }
}
```

:::
Bây giờ nếu chúng ta build plugin và tham gia server, chúng ta sẽ thấy thông báo "Xin chào, Thế giới!"

## Thêm một leave event

Như một bài tập cho người đọc, hãy thử thêm một PlayerLeaveEvent
