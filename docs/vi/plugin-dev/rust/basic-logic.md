# Viết logic cơ bản

## Plugin cơ bản

Ngay cả trong một plugin cơ bản, có rất nhiều thứ diễn ra ở bên dưới hệ thống, vì vậy để đơn giản hóa việc phát triển plugin, chúng ta sẽ sử dụng crate `pumpkin-plugin-api` để tạo một plugin rỗng cơ bản.

:::code-group

```rust:line-numbers [lib.rs]
use pumpkin_plugin_api::{Context, Plugin, PluginMetadata};
use tracing::*;

struct HelloPlugin;
impl Plugin for HelloPlugin {
    fn new() -> Self {
        HelloPlugin
    }

    fn metadata(&self) -> PluginMetadata {
        PluginMetadata {
            name: "Hello Plugin".into(),
            version: env!("CARGO_PKG_VERSION").into(),
            authors: vec!["Bjorn".into()],
            description: "A simple example plugin".into(),
        }
    }

    fn on_load(&mut self, _context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("Hello from the example plugin!");
        Ok(())
    }

    fn on_unload(&mut self, _context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("Example plugin unloaded. Goodbye!");
        Ok(())
    }
}

pumpkin_plugin_api::register_plugin!(HelloPlugin);
```

:::

Đoạn mã này sẽ tạo một plugin rỗng và triển khai tất cả các phương thức cần thiết để Pumpkin có thể tải nó.

Bây giờ chúng ta có thể thử biên dịch plugin của mình lần đầu tiên. Để làm điều đó, hãy chạy lệnh này trong thư mục dự án của bạn:

```bash
cargo build --release
```

Bạn không bắt buộc phải biên dịch ở chế độ release, nhưng nó sẽ giảm đáng kể kích thước của plugin wasm và giảm thời gian khởi động.

Nếu mọi thứ diễn ra tốt đẹp, bạn sẽ nhận được một thông báo như thế này:

```log
╰─ cargo build --release
   Compiling hello-pumpkin-wasm v0.1.0 (/home/bjorn/Documents/GitHub/Hello-Pumpkin-Wasm)
    Finished `release` profile [optimized] target(s) in 0.05s
```

Bây giờ bạn có thể đi tới thư mục `./target/wasm32-wasip2/release` (hoặc `./target/wasm32-wasip2/debug` nếu bạn không dùng `--release`) và tìm file nhị phân của plugin. Tên file sẽ có dạng như sau:

```
hello_pumpkin_wasm.wasm
```

::: info LƯU Ý
Nếu bạn sử dụng một tên dự án khác trong file `Cargo.toml`, hãy tìm file có chứa tên dự án của bạn.
:::

Bạn có thể đổi tên file này thành bất kỳ tên nào bạn muốn, tuy nhiên bạn phải giữ nguyên phần mở rộng file (`.wasm`).

## Thử nghiệm plugin

Bây giờ chúng ta đã có file nhị phân của plugin, chúng ta có thể tiến hành kiểm thử nó trên máy chủ Pumpkin. Việc cài đặt plugin rất đơn giản: chỉ cần đặt file nhị phân của plugin vừa xây dựng vào thư mục `plugins/` trên máy chủ Pumpkin của bạn!

Khi bạn khởi chạy máy chủ và chạy lệnh `/plugins`, bạn sẽ thấy kết quả như thế này:

```text
There is 1 plugin loaded:
hello-pumpkin-wasm
```

## Các phương thức được triển khai trên đối tượng `Context`

```rust
fn get_server(&self) -> Server
```

Trả về một thể hiện (instance) của máy chủ.

```rust
fn register_command(&self, command: Command, permission: &str)
```

Đăng ký một bộ xử lý lệnh (command handler) mới, cùng với quyền hạn dành cho lệnh đó.

```rust
fn register_event_handler<E, H>(&self, handler: H, event_priority: EventPriority, blocking: bool) -> Result<u32>
```

Đăng ký một bộ xử lý sự kiện (event handler) mới với mức độ ưu tiên được thiết lập và xác định xem nó có chặn (blocking) hay không.