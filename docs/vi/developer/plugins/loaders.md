# Thêm một Plugin Loader

Kiến trúc plugin của Pumpkin không phụ thuộc vào runtime. Máy chủ không giả định tất cả plugin chạy trong WebAssembly hoặc thư viện dùng chung gốc; thay vào đó, tất cả các runtime thực thi đều triển khai trait [`PluginLoader`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/plugin/loader/mod.rs) thống nhất.

Hướng dẫn này giải thích cách `PluginLoader` hoạt động và trình diễn cách triển khai một loader tùy chỉnh cho các runtime kịch bản hoặc máy ảo mới (như Lua, JavaScript/Boa hoặc GraalVM).

---

## Trait `PluginLoader`

Tất cả các plugin loader đều triển khai trait `PluginLoader` nằm trong `crates/pumpkin/src/plugin/loader/mod.rs`:

```rust
use std::{any::Any, path::Path, pin::Pin, sync::Arc};
use crate::plugin::{PluginMetadata, api::Plugin};

pub type PluginLoadFuture<'a> = Pin<
    Box<
        dyn Future<
                Output = Result<
                    (Arc<dyn Plugin>, PluginMetadata, Box<dyn Any + Send + Sync>),
                    LoaderError,
                >,
            > + Send
            + 'a,
    >,
>;

pub type PluginUnloadFuture<'a> =
    Pin<Box<dyn Future<Output = Result<(), LoaderError>> + Send + 'a>>;

pub trait PluginLoader: Send + Sync {
    /// Xác định xem loader này có xử lý tệp đích hay không.
    fn can_load(&self, path: &Path) -> bool;

    /// Tải, phân tích cú pháp và khởi tạo một instance plugin một cách bất đồng bộ.
    fn load<'a>(&'a self, path: &'a Path) -> PluginLoadFuture<'a>;

    /// Gỡ bỏ plugin và thu hồi các tài nguyên liên quan.
    fn unload(&self, data: Box<dyn Any + Send + Sync>) -> PluginUnloadFuture<'_>;

    /// Cho biết runtime có hỗ trợ gỡ bỏ an toàn mà không bị rò rỉ bộ nhớ hay không.
    fn can_unload(&self) -> bool;
}
```

---

## Các Loader hiện có trong Pumpkin

Pumpkin hiện cung cấp hai loader chính thức:

1. **`NativePluginLoader` (`loader/native.rs`)**:
   - Khớp với các tệp thư viện động (`.so` trên Linux, `.dll` trên Windows, `.dylib` trên macOS).
   - Liên kết động thư viện bằng [`libloading`](https://docs.rs/libloading/).
   - Định vị và gọi hàm entrypoint extern (`pumpkin_plugin_init`).
   - `can_unload()` trả về `false` do các nguy cơ gỡ bỏ thư viện dùng chung cấp độ hệ điều hành.
2. **`WasmPluginLoader` (`loader/wasm/mod.rs`)**:
   - Khớp với các tệp `.wasm`.
   - Xác minh các chữ ký mật mã (xem [Ký WASM](/developer/plugins/wasm-signing)).
   - Biên dịch JIT các thành phần WebAssembly bằng [Wasmtime](https://wasmtime.dev/).
   - Liên kết các export WIT của host (`pumpkin-host-bindings`).
   - `can_unload()` trả về `true` vì Wasmtime có thể drop bộ nhớ guest một cách an toàn.

---

## Từng Bước: Thêm một Plugin Loader Tùy chỉnh

Dưới đây là cách tạo một loader tùy chỉnh (ví dụ: cho một runtime kịch bản):

### Bước 1: Định nghĩa Struct Loader
Tạo một tệp mới trong `crates/pumpkin/src/plugin/loader/my_loader.rs`:

```rust
use std::{any::Any, path::Path, sync::Arc};
use crate::plugin::loader::{LoaderError, PluginLoadFuture, PluginLoader, PluginUnloadFuture};
use crate::plugin::{PluginMetadata, api::Plugin};

pub struct MyCustomLoader;

impl MyCustomLoader {
    #[must_use]
    pub fn new() -> Self {
        Self
    }
}
```

### Bước 2: Triển khai Nhận diện Tệp (`can_load`)
Kiểm tra đuôi tệp hoặc kiểm tra các byte header:

```rust
impl PluginLoader for MyCustomLoader {
    fn can_load(&self, path: &Path) -> bool {
        path.extension()
            .and_then(|ext| ext.to_str())
            .is_some_and(|ext| ext.eq_ignore_ascii_case("script"))
    }
```

### Bước 3: Triển khai Tải Bất đồng bộ (`load`)
Phương thức `load` đọc kịch bản, khởi tạo VM, đăng ký các callback host server và trả về một tuple chứa:
1. `Arc<dyn Plugin>`: Handle plugin generic.
2. `PluginMetadata`: Tên, tác giả, phiên bản, mô tả.
3. `Box<dyn Any + Send + Sync>`: Context cụ thể của loader (ví dụ: trạng thái VM) được giữ lại để gỡ bỏ.

```rust
    fn load<'a>(&'a self, path: &'a Path) -> PluginLoadFuture<'a> {
        Box::pin(async move {
            let script_content = tokio::fs::read_to_string(path).await
                .map_err(|e| LoaderError::InitializationFailed(e.to_string()))?;

            // 1. Phân tích cú pháp metadata plugin từ header hoặc manifest kèm theo
            let metadata = PluginMetadata {
                name: "ExampleScript".into(),
                version: "1.0.0".into(),
                authors: vec!["Author".into()],
                description: Some("Custom script plugin".into()),
            };

            // 2. Khởi tạo instance runtime
            let plugin_instance = Arc::new(MyScriptPluginWrapper::new(script_content));
            let runtime_state: Box<dyn Any + Send + Sync> = Box::new(());

            Ok((plugin_instance, metadata, runtime_state))
        })
    }
```

### Bước 4: Triển khai Gỡ bỏ Sạch (`unload` & `can_unload`)
Nếu runtime của bạn có thể kết thúc sạch mà không rò rỉ tài nguyên:

```rust
    fn can_unload(&self) -> bool {
        true
    }

    fn unload(&self, data: Box<dyn Any + Send + Sync>) -> PluginUnloadFuture<'_> {
        Box::pin(async move {
            // Drop trạng thái runtime và ngắt kết nối các event listener
            drop(data);
            Ok(())
        })
    }
}
```

### Bước 5: Đăng ký Loader trong `PluginManager`

Mở `crates/pumpkin/src/plugin/mod.rs` và đăng ký loader của bạn trong `PluginManager::new()`:

```rust
// Trong crates/pumpkin/src/plugin/mod.rs
let mut loaders: Vec<Box<dyn PluginLoader>> = Vec::new();

loaders.push(Box::new(NativePluginLoader::new()));
loaders.push(Box::new(WasmPluginLoader::new()));
loaders.push(Box::new(MyCustomLoader::new())); // Thêm loader tùy chỉnh
```

Trong quá trình khởi động máy chủ, Pumpkin lặp qua tất cả các loader đã đăng ký theo trình tự khi quét thư mục `plugins/`, gửi mỗi tệp đến loader đầu tiên mà `can_load` trả về `true`.
