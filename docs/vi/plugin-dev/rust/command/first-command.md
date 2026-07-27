# Tạo lệnh đầu tiên của bạn

Trước khi đăng ký lệnh, bạn nên chọn một tên. Trong ví dụ này, chúng ta định nghĩa nó dưới dạng một mảng hằng số. Việc sử dụng mảng cho phép bạn dễ dàng thêm các biệt hiệu (alias)

```rust
let names = ["test".to_string()]; 
// OR with aliases 
let names = ["test".to_string(), "testcommand".to_string()];
```

Bạn cũng nên định nghĩa một mô tả, phần này sẽ được hiển thị khi người chơi sử dụng lệnh `/help`

```rust
let description = "My first Command!";
```

Command API của Pumpkin lấy cảm hứng mạnh mẽ từ [Brigadier](https://github.com/Mojang/brigadier) của Mojang. Hệ thống này cho phép bạn dễ dàng quản lý cú pháp lệnh và cung cấp tính năng tự động hoàn thành bằng phím Tab cho người chơi.

#### Triển khai Cây Lệnh (Command Tree)

```rust
use pumpkin_plugin_api::command::Command;

pub fn init_command_tree() -> Command {
    let names = ["test".to_string(), "testcommand".to_string()];
    let description = "My first Command!";

    Command::new(&names, description)
}
```

#### Đăng ký và Quyền hạn (Permissions)

Để lệnh có thể sử dụng được, bạn phải đăng ký cả Permission và chính Command đó trong context plugin của bạn.

Đầu tiên, đăng ký Permission. Trong ví dụ này, chúng ta thiết lập `PermissionDefault::Allow` để mặc định tất cả mọi người đều có thể sử dụng lệnh

```rust
struct MyPlugin;
impl Plugin for MyPlugin {
    fn new() -> Self {
        MyPlugin
    }

    fn metadata(&self) -> PluginMetadata {
        PluginMetadata {
            name: "plugin_docs_plugin".into(),
            version: env!("CARGO_PKG_VERSION").into(),
            authors: vec!["Bjorn".into()],
            description: "A simple example plugin".into(),
        }
    }

    fn on_load(&mut self, context: Context) -> pumpkin_plugin_api::Result<()> {
        tracing::info!("Hello, Pumpkin!");

        context.register_permission(&Permission { // [!code ++:7]
            // This has to have the same name space as provided in your PluginMetadata
            node: "plugin_docs_plugin:test".to_string(),
            description: "Important Test Permission".to_string(),
            default: PermissionDefault::Allow,
            children: Vec::new(),
        })?;

        Ok(())
    }
}
```

Tiếp theo, đăng ký lệnh bằng chuỗi permission đã tạo ở trên:

```rust
struct MyPlugin;
impl Plugin for MyPlugin {
    // ...

    fn on_load(&mut self, context: Context) -> pumpkin_plugin_api::Result<()> {
        tracing::info!("Hello, Pumpkin!");

        context.register_permission(&Permission {
            // This has to have the same name space as provided in your PluginMetadata
            node: "plugin_docs_plugin:test".to_string(),
            description: "Important Test Permission".to_string(),
            default: PermissionDefault::Allow,
            children: Vec::new(),
        })?;
        
         context.register_command(init_command_tree(), "plugin_docs_plugin:test"); // [!code ++:1]

        Ok(())
    }
}
```

Build lại plugin của bạn, di chuyển tệp plugin vào thư mục plugins và khởi động lại máy chủ

**Chúc mừng!**, Lệnh hiện đã được đăng ký và sẽ được tô sáng trong trò chơi cũng như trong console

<img src="/assets/plugin-dev/first_command_preview.png" alt="drawing" width="1000"/>

Việc thực thi lệnh vào lúc này có thể sẽ báo lỗi Cú pháp (Syntax error) do chưa có Command Executor nào được triển khai và lệnh chưa thực hiện hành động nào

```
$ test
$ Invalid Syntax. Usage: /test
```

### Thêm một Executor

Hãy tạo một Command Executor cực kỳ đơn giản mà không yêu cầu bất kỳ tham số (arguments) nào

```rust
struct MyCommandExecutor;

impl CommandHandler for MyCommandExecutor {
    fn handle(
        &self,
        sender: pumpkin_plugin_api::command::CommandSender,
        server: pumpkin_plugin_api::Server,
        args: pumpkin_plugin_api::command::ConsumedArgs,
    ) -> pumpkin_plugin_api::Result<i32, CommandError> {
        Ok(1)
    }
}
```

### Gắn Executor

Giờ đây để gắn executor, tất cả những gì bạn cần làm là cung cấp nó cho Command.

```rust
pub fn init_command_tree() -> Command {
    let names = ["test".to_string(), "testcommand".to_string()];
    let description = "My first Command!";

    Command::new(&names, description).execute(MyCommandExecutor) // [!code ++:1]
}
```

Bây giờ bạn sẽ không gặp lỗi cú pháp khi chạy `/test`.