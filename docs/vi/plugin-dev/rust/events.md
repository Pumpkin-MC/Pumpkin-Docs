# Viết một Event Handler

Event handler là một trong những chức năng chính của plugin. Chúng cho phép plugin can thiệp vào cách hoạt động bên trong của máy chủ và thay đổi hành vi của nó để thực hiện một hành động khác. Đối với một ví dụ đơn giản, chúng ta sẽ triển khai một handler cho `PlayerJoinEvent` và `PlayerLeaveEvent`.

## Triển khai một Event

Các event handler riêng lẻ chỉ là các struct triển khai trait `EventHandler<E>` (trong đó `E` là dữ liệu event cụ thể).

### Blocking event là gì?

Hệ thống event của plugin Pumpkin phân biệt giữa hai loại event: blocking và non-blocking. Mỗi loại đều có những ưu điểm riêng:

#### Blocking event

```diff
Ưu điểm:
+ Có thể sửa đổi sự kiện (ví dụ: chỉnh sửa tin nhắn khi tham gia)
+ Có thể hủy sự kiện
+ Có hệ thống phân cấp ưu tiên
Nhược điểm:
- Được thực thi tuần tự (lần lượt từng sự kiện)
- Có thể làm chậm máy chủ nếu không được triển khai tối ưu
```

#### Non-blocking event

```diff
Ưu điểm:
+ Được thực thi đồng thời (Concurrency)
+ Được thực thi sau khi tất cả các sự kiện chặn đã hoàn tất
+ Vẫn có thể thực hiện một số sửa đổi (với bất kỳ dữ liệu nào được bảo vệ bởi Mutex hoặc RwLock)
Nhược điểm:
- Không thể hủy sự kiện
- Không có hệ thống phân cấp ưu tiên
- Khả năng kiểm soát sự kiện bị hạn chế hơn
```

### Viết một handler

Vì mục tiêu chính của chúng ta ở đây là thay đổi thông điệp chào mừng mà người chơi nhìn thấy khi họ tham gia vào máy chủ, chúng ta sẽ chọn loại blocking event với độ ưu tiên bình thường (normal priority).

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
        event.join_message = TextComponent::text("Hello, world!");
        event
    }
}
```

:::

**Giải thích**:

- `struct MyJoinHandler;`: Struct cho event handler của chúng ta
- Nếu event là non-blocking, chúng ta vẫn sử dụng hàm handle, và trả về dữ liệu event. Dữ liệu event vẫn sẽ bị bỏ qua.

### Đăng ký handler

Bây giờ chúng ta đã viết xong event handler, chúng ta cần báo cho plugin sử dụng nó. Chúng ta có thể làm điều đó bằng cách thêm một dòng duy nhất vào phương thức `on_load`:
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

    fn on_load(&mut self, context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("Hello from the example plugin!");
        context.register_event_handler(MyJoinHandler, EventPriority::Normal, true)?;
        Ok(())
    }

    fn on_unload(&mut self, _context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("Example plugin unloaded. Goodbye!");
        Ok(())
    }
}
```

:::
Bây giờ nếu chúng ta build plugin và tham gia máy chủ, chúng ta sẽ thấy thông điệp "Hello, World!"!

## Thêm một leave event

Như một bài tập dành cho bạn đọc, hãy thử thêm một `PlayerLeaveEvent`