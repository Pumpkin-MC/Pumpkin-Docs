# Viết các lôgic (logic) cơ bản

## Plugin base

Ngay cả trong một plugin cơ bản, có rất nhiều thứ diễn ra dưới mui xe, vì vậy để đơn giản hóa quá trình phát triển plugin, chúng ta sẽ sử dụng crate `pumpkin-api-macros` để tạo một plugin trống.

:::code-group

```rs:line-numbers [lib.rs]
use pumpkin_api_macros::plugin_impl;

#[plugin_impl]
pub struct MyPlugin {}

impl MyPlugin {
    pub fn new() -> Self {
        MyPlugin {}
    }
}

impl Default for MyPlugin {
    fn default() -> Self {
        Self::new()
    }
}
```

:::

Điều này sẽ tạo ra một plugin trống và triển khai tất cả các phương thức cần thiết để Pumpkin có thể tải nó.

Bây giờ chúng ta có thể thử biên dịch plugin của mình lần đầu tiên. Để làm như vậy, hãy chạy lệnh này trong thư mục dự án của bạn:

```bash
cargo build --release
```

::: tip LƯU Ý
Nếu bạn đang sử dụng Windows, bạn **bắt buộc** phải sử dụng cờ `--release`, nếu không bạn sẽ gặp sự cố thất bại. Nếu bạn dùng nền tảng khác, bạn không cần phải sử dụng nó nếu bạn muốn tiết kiệm thời gian biên soạn mã (compile time).
:::
Lần biên dịch đầu tiên sẽ mất một chút thời gian, nhưng đừng lo lắng, các lần biên dịch sau sẽ nhanh hơn.

Nếu mọi việc suôn sẻ, bạn sẽ nhận được một thông báo như thế này:

```log
╰─ cargo build --release
   Compiling hello-pumpkin v0.1.0 (/home/vypal/Dokumenty/GitHub/hello-pumpkin)
    Finished `release` profile [optimized] target(s) in 0.68s
```

Giờ bạn có thể điều hướng tới thư mục `./target/release` (hoặc `./target/debug` nếu bạn không dùng cờ `--release`) và định vị tệp nhị phân plugin.

Tùy vào hệ điều hành của bạn, file nhị phân sẽ có một trong ba cái tên sau:

- Đối với Windows: `hello-pumpkin.dll`
- Đối với MacOS: `libhello-pumpkin.dylib`
- Đối với Linux: `libhello-pumpkin.so`

::: info CHÚ Ý
Nếu bạn đã dùng tên project khác bên trong file `Cargo.toml`, hãy tìm file có chứa tên project tương ứng của bạn.
:::

Bạn có quyền tùy chỉnh đổi tên tệp này thành bất kỳ tên nào bạn muốn, tuy nhiên bạn bắt buộc phải giữ nguyên phần mở rộng của tệp (`.dll`, `.dylib`, hoặc `.so`).

## Thử nghiệm plugin

Bây giờ chúng ta đã có tệp nhị phân plugin có thể sử dụng được, chúng ta có thể tiến hành và kiểm tra nó trên server Pumpkin. Việc cài đặt hoàn toàn đơn giản chỉ dưới hình thức đặt tệp nhị phân plugin mà chúng ta vừa tạo vào thư mục `plugins/` của server Pumpkin của bạn!

Nhờ có macro `#[plugin_impl]`, plugin sẽ đính sẵn các thông tin chi tiết (như tên, tác giả, phiên bản và mô tả) được tích hợp trong tệp nhị phân để server có thể đọc được.

Khi bạn khởi động server và chạy lệnh `/plugins`, bạn sẽ thấy output như thế này:

```text
There is 1 plugin loaded:
hello-pumpkin
```

## Các phương thức (Methods) cơ bản

Server Pumpkin hiện được triển khai thông qua hai "phương thức" (methods) để cho plugin biết về trạng thái thiết đặt của nó. Các phương thức này là `on_load` và `on_unload`.

Các methods này không bắt buộc phải được triển khai (implement), nhưng bạn thường sẽ implement ít nhất là phương thức `on_load`. Trong phương thức này, bạn có quyền truy cập vào một object tên là `Context`, object này có thể cung cấp cho plugin quyền truy cập vào thông tin chi tiết về server, nhưng cũng cho phép plugin đăng ký (register) các command handlers và events.

Để làm cho việc triển khai các method này dễ dàng hơn một cách đáng kể, có một macro khác được cung cấp bởi crate tên là `pumpkin-api-macros`.
:::code-group

```rs [lib.rs]
use std::sync::Arc; // [!code ++:4]

use pumpkin_api_macros::{plugin_impl, plugin_method};
use pumpkin::plugin::Context;
use pumpkin_api_macros::plugin_impl; // [!code --]

#[plugin_method] // [!code ++:4]
async fn on_load(&mut self, server: Arc<Context>) -> Result<(), String> {
    Ok(())
}

#[plugin_impl]
pub struct MyPlugin {}

impl MyPlugin {
    pub fn new() -> Self {
        MyPlugin {}
    }
}

impl Default for MyPlugin {
    fn default() -> Self {
        Self::new()
    }
}
```

:::

::: warning QUAN TRỌNG
Điều quan trọng là bạn phải định nghĩa trước bất kỳ lệnh plugin method nào trước khối `#[plugin_impl]`.
:::

Method này nhận được một mutable reference trỏ đến object chứa liên kết (trong trường hợp này là struct `MyPlugin`), struct mà nó có thể sử dụng tiếp để khởi tạo bất kỳ dữ liệu nào được đặt cùng trong struct chính của plugin và một tham chiếu bổ sung đến object thuộc tính hệ thống `Context`. Object này được xây dựng dành riêng cho plugin này dựa trên metadata của chính plugin đó.

### Những phương thức (Methods) được implement trên the `Context` object

```rs
fn init_log()
```

Kích hoạt logging thông qua `log` crate.

```rs
fn get_data_folder() -> String
```

Hồi đáp (Returns) vị trí đường dẫn thư mục chuyên dụng cho plugin này, thứ mà sau này nên được tận dụng cho persistent data storage

```rs
async fn get_player_by_name(player_name: String) -> Option<Arc<Player>>
```

Nếu một người chơi có tên `player_name` đã được tìm thấy (yêu cầu người chơi đó cần phải tham gia server vào lúc đấy), hàm này sẽ trả về reference của họ.

```rs
async fn register_command(tree: CommandTree, permission: PermissionLvl)
```

Đăng ký (Registers) command handler cho lệnh mới sinh, đi đôi với cấp độ quyền (permission level) tối thiểu được yêu cầu.

```rs
async fn register_event(handler: Arc<H>, priority: EventPriority, blocking: bool)
```

Registers một cấu trúc sự kiện (event handler) mới với mức độ ưu tiên xác định đi sau đó là việc liệu nó có ngăn chặn gì không (blocking) hay không.
Bên cạnh đó, `handler` thực chất là `Arc<T>`, điều này có nghĩa là bạn hoàn toàn có thể implement rất nhiều sự kiện trên cùng một handler, và đăng ký (register) nó chỉ tại đó.

## Lệnh on-load method cơ bản

Vì để kiểm chứng là plugin có đang hoạt động, giờ chúng ta sẽ chỉ implement một hàm method `on_load` cực kỳ cơ bản.

Nằm tại đây, chúng ta sẽ thiết lập công cụ logger nội bộ của Pumpkin và thiết lập thông báo text "Hello, Pumpkin!" để chúng ta có thể kiểm duyệt plugin của mình có đang hoạt động hay không.

Hãy thêm cái này vào `on_load` method:
:::code-group

```rs [lib.rs]
#[plugin_method]
async fn on_load(&mut self, server: Arc<Context>) -> Result<(), String> {
    server.init_log(); // [!code ++:3]

    log::info!("Hello, Pumpkin!");

    Ok(())
}
```

:::

Nếu chúng ta build lại plugin một lần nữa và khởi động server, giờ đây bạn sẽ thấy dòng chữ text "Hello, Pumpkin!" hiển thị ở một nơi nào đó dọc trong thanh cuộn log.
