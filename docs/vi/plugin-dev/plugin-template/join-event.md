# Viết một trình xử lý sự kiện (Event Handler)

Các trình xử lý sự kiện là một trong những chức năng chính của plugin. Chúng cho phép plugin có thể khai thác và can thiệp sâu vào các hoạt động nội bộ của server và thay đổi hành vi của nó để thực hiện một số hành động khác. Để cho có một ví dụ đơn giản nhất, chúng ta sẽ implement một handler dành cho sự kiện `player_join`.

Hệ thống plugin event của Pumpkin cố gắng bắt chước hệ thống Event của Bukkit/Spigot, để các developer xuất thân từ đó có thể dễ thở hơn trong việc làm quen với Pumpkin.
Tuy nhiên, Rust lại có những khái niệm và quy luật khác nhau, vậy nên nó không hoàn toàn giống như trong Bukkit/Spigot.
Rust không có khái niệm kế thừa (inheritance); thay vào đó nó chỉ có khái niệm cấu thành (composition).

Hệ thống sự kiện (event system) sử dụng các trait để xử lý động (dynamically) một vài event: `Event`, `Cancellable`, `PlayerEvent` và v.v...
Cancellable cũng có thể là một Event, bởi vì nó là một trait. (TODO: xác minh điều này)

## Implement sự kiện tham gia server (Join Event)

Các event handler cá nhân chỉ là các struct có implement trait `EventHandler<T>` (nơi `T` là một cấu trúc event nhất định).

### Blocking events là gì?

Hệ thống sự kiện plugin trong Pumpkin giúp phân biệt rạch ròi giữa hai loại sự kiện: blocking và non-blocking. Mỗi loại đều có những lợi ích riêng:

#### Các blocking events

```diff
Ưu điểm:
+ Có thể chỉnh sửa bản thân event đó (như chỉnh sửa message khi người chơi vào server)
+ Có thể từ chối event (hủy bỏ hoàn toàn)
+ Phân loại hệ thống các quyền ưu tiên
Nhược điểm:
- Được thi hành theo trình tự
- Có thể làm chậm server nếu không implement đúng cách
```

#### Các non-blocking events

```diff
Ưu điểm:
+ Có thể thi hành cùng một lúc
+ Được thi hành ngay sau khi toàn bộ blocking events kết thúc hoàn thành tác vụ
+ Vẫn có thể thực hiện một vài thay đổi nhỏ (bất cứ thứ gì nằm đằng sau Mutex hoặc RwLock)
Nhược điểm:
- Không thể hủy hoàn toàn event
- Không có hệ thống phân quyền ưu tiên
- Cấp ít quyền kiểm soát hơn tới sự kiện
```

### Viết một trình xử lý (handler)

Mục đích chính của chúng ta tại đây là điều chỉnh thông tin message chào mừng đập vào mắt người chơi lúc họ vừa join server, chúng ta sẽ chọn loại blocking event với quyền ưu tiên thấp.

Hãy thêm dòng code này lên trên `on_load` method:
:::code-group

```rs [lib.rs]
 // [!code ++:7]
use pumpkin_api_macros::with_runtime;
use pumpkin::{
    plugin::{player::player_join::PlayerJoinEvent, Context, EventHandler, EventPriority},
    server::Server,
};
use pumpkin_util::text::{color::NamedColor, TextComponent};

struct MyJoinHandler; // [!code ++:12]

#[with_runtime(global)]
impl EventHandler<PlayerJoinEvent> for MyJoinHandler {
    fn handle_blocking(&self, _server: &Arc<Server>, event: &mut PlayerJoinEvent) -> BoxFuture<'_, ()> {
        Box::pin(async move {
        event.join_message =
            TextComponent::text(format!("Welcome, {}!", event.player.gameprofile.name))
                .color_named(NamedColor::Green);
        })
    }
}
```

:::

**Giải thích**:

- `struct MyJoinHandler;`: Struct cho event handler của chúng ta
- `#[with_runtime(global)]`: Pumpkin sử dụng hệ sinh thái tokio async runtime, thứ thỉnh thoảng sẽ hoạt động một cách kì quặc thông qua ranh giới của plugin. Dù trong ví dụ này nó không cần thiết, nhưng việc gói tất cả các async `impl` tương tác với async code bằng macro này là một phương pháp rất tốt.
- `fn handle_blocking()`: Do chúng ta đã chọn để event này mang thuộc tính blocking, chúng ta bắt buộc phải implement phương thức `handle_blocking()` thay vì method `handle()`.

### Đăng ký (Registering) trình xử lý này

Giờ chúng ta đã viết xong một event handler, chúng ta cần phải bảo hệ thống plugin hãy sử dụng nó. Chúng ta có thể làm như vậy bằng việc dán đoạn dòng kẻ mã đơn giản vào method `on_load`:
:::code-group

```rs [lib.rs]
use pumpkin::{
    plugin::{player::player_join::PlayerJoinEvent, Context, EventHandler, EventPriority}, // [!code ++]
    server::Server,
};
use pumpkin::{
    plugin::{player::player_join::PlayerJoinEvent, Context, EventHandler}, // [!code --]
    server::Server,
};

#[plugin_method]
async fn on_load(&mut self, server: Arc<Context>) -> Result<(), String> {
    server.init_log();

    log::info!("Hello, Pumpkin!");

    server.register_event(Arc::new(MyJoinHandler), EventPriority::Lowest, true).await; // [!code ++]

    Ok(())
}
```

:::
Và giờ nếu chúng ta build lại cái plugin này và vào server để thử, chúng ta sẽ thấy một dòng "Welcome" màu xanh cùng với tên đăng nhập của chúng ta!
