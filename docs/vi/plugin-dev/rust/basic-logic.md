# Viết logic cơ bản

## Cơ sở plugin

Ngay cả trong một plugin cơ bản, có rất nhiều thứ diễn ra bên dưới, vì vậy để đơn giản hóa việc phát triển plugin rất nhiều, chúng ta sẽ sử dụng crate `pumpkin-plugin-api` để tạo một plugin trống cơ bản.

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
            description: "Một plugin ví dụ đơn giản".into(),
        }
    }

    fn on_load(&self, _context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("Xin chào từ plugin ví dụ!");
        Ok(())
    }

    fn on_unload(&self, _context: Context) -> pumpkin_plugin_api::Result<()> {
        info!("Plugin ví dụ đã được gỡ bỏ. Tạm biệt!");
        Ok(())
    }
}

pumpkin_plugin_api::register_plugin!(HelloPlugin);
```

:::

Điều này sẽ tạo ra một plugin trống và triển khai tất cả các phương thức cần thiết để nó có thể được tải bởi Pumpkin.

Bây giờ chúng ta có thể thử biên dịch plugin của mình lần đầu tiên. Để làm điều đó, hãy chạy lệnh này trong thư mục dự án của bạn:

```bash
cargo build --release
```

Bạn không cần build ở chế độ release, nhưng nó làm giảm đáng kể kích thước của wasm plugin và giảm thời gian khởi động.

Nếu mọi việc suôn sẻ, bạn sẽ nhận được một thông báo như thế này:

```log
╰─ cargo build --release
   Compiling hello-pumpkin-wasm v0.1.0 (/home/bjorn/Documents/GitHub/Hello-Pumpkin-Wasm)
    Finished `release` profile [optimized] target(s) in 0.05s
```

Bây giờ bạn có thể đến thư mục `./target/wasm32-wasip2/release` (hoặc `./target/wasm32-wasip2/debug` nếu bạn không sử dụng `--release`) và định vị file plugin binary của bạn. Tên file sẽ như sau.

```
hello_pumpkin_wasm.wasm
```

::: info LƯU Ý
Nếu bạn sử dụng tên dự án khác trong file `Cargo.toml`, hãy tìm file có chứa tên dự án của bạn.
:::

Bạn có thể đổi tên file này thành bất kỳ thứ gì bạn thích, tuy nhiên bạn phải giữ nguyên phần mở rộng file (`.wasm`).

## Kiểm tra plugin

Bây giờ khi chúng ta đã có plugin binary, chúng ta có thể tiếp tục và kiểm tra nó trên server Pumpkin. Cài đặt một plugin đơn giản như đặt plugin binary mà chúng ta vừa build vào thư mục `plugins/` của server Pumpkin của bạn!

Khi bạn khởi động server và chạy lệnh `/plugins`, bạn sẽ thấy một kết quả như thế này:

```text
There is 1 plugin loaded:
hello-pumpkin-wasm
```

## Các phương thức được triển khai trên object `Context`

```rust
fn get_server(&self) -> Server
```

Trả về một instance của server.

```rust
fn register_command(&self, command: Command, permission: &str)
```

Đăng ký một command handler mới, với permission dành cho command đó.

```rust
fn register_event_handler<E, H>(&self, handler: H, event_priority: EventPriority, blocking: bool) -> Result<u32>
```

Đăng ký một event handler mới với mức độ ưu tiên được đặt và xác định xem nó có blocking hay không.
