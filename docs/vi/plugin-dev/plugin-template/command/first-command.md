# Khởi tạo Lệnh (Command) đầu tiên của bạn

Trước khi đăng ký command của mình, bạn nên chọn một cái tên. Trong ví dụ này, chúng tôi định nghĩa nó như một mảng hằng số (constant array). Việc sử dụng một mảng sẽ cho phép bạn dễ dàng thêm các bí danh (aliases)

```rust
const NAMES: [&str; 1] = ["test"]; 
// HOẶC dùng với aliases 
const NAMES: [&str; 2] = ["test", "testcommand"]; 
```

Bạn cũng nên xác định phần mô tả, phần này sẽ được hiển thị khi người chơi sử dụng lệnh hiển thị trợ giúp /help

```rust
const DESCRIPTION: &str = "Lệnh (Command) đầu tiên của tôi!";
```

Command API của Pumpkin được truyền cảm hứng sâu sắc từ [Brigadier](https://github.com/Mojang/brigadier) của Mojang. Hệ thống này cho phép bạn dễ dàng quản lý cú pháp command (command syntax) và cung cấp tính năng tự động hoàn thành trên phím tab (tab-completion) nhằm hỗ trợ cho người chơi

#### Implement cho Command Tree

```rust
use pumpkin::command::tree::CommandTree;

pub fn init_command_tree() -> CommandTree {
    CommandTree::new(NAMES, DESCRIPTION)
}
```

#### Đăng ký (Registration) và Cấp quyền (Permissions)

Để giúp cho command có thể sử dụng được, bạn phải đăng ký cả Quyền hạn (Permission) và cả bản thân Command đó vào bên trong plugin context của bạn.

Đầu tiên, hãy đăng ký Quyền hạn (Permission). Trong ví dụ này, chúng tôi thiết lập `PermissionDefault::Allow` nhằm mục đích để mặc định là kể cả mọi người chơi bình thường cũng đều có thể sử dụng lệnh này

```diff
#[plugin_method]
async fn on_load(&mut self, context: Arc<Context>) -> Result<(), String> {
    context.init_log();

    log::info!("Hello, Pumpkin!");

+    context
+        .register_permission(Permission::new(
+            "plugin_docs_plugin:test",
+            "Important Test Permission",
+            PermissionDefault::Allow,
+        ))
+        .await
+        .unwrap();


    Ok(())
}
```

Tiếp theo, tiến hành đăng ký biểu mẫu command bằng cách sử dụng các chuỗi string đã được tạo giống hệt bên trên dành cho quyền (permission):

```diff
#[plugin_method]
async fn on_load(&mut self, context: Arc<Context>) -> Result<(), String> {
    context.init_log();

    log::info!("Hello, Pumpkin!");

    context
        .register_permission(Permission::new(
            "plugin_docs_plugin:test",
            "Important Test Permission",
            PermissionDefault::Allow,
        ))
        .await
        .unwrap();

+    context
+        .register_command(command::init_command_tree(), "plugin_docs_plugin:test")
+        .await;

    Ok(())
}
```

Dừng lại và tiến hành build (biên dịch) lại plugin của bạn, rồi bỏ tệp plugins mới của bạn sang thư mục plugins ở server, và khởi động chạy lại server của bạn

**Chúc mừng!**, Vậy là command bây giờ đã được đăng ký và nó sẽ được đánh dấu làm nổi bật (highlighted) ở in-game trong trò chơi và trên cả ở mục console

<img src="/assets/plugin-dev/first_command_preview.png" alt="drawing" width="1000"/>

Việc trực tiếp thực thi lệnh ngay tại thời điểm này rất có thể sẽ ném ra (thrown an) một bảng lỗi Cú pháp (Syntax error) vì xét tới hiện tại chưa có bất kỳ một Trình thực thi lệnh (Command Executor) nào được triển khai (implemented) vào và Lệnh hiện giờ đơn thuần là chả có tác dụng hay phản hồi gì cả

### Thêm một lệnh thực thi (Executor)

Bây giờ chúng ta sẽ bắt tay vào việc tạo lập một Command Executor siêu đơn giản mà chẳng yêu cầu nhập bất cứ dòng argument phụ trợ đi kèm nào cho lệnh

```rust
struct MyCommandExecutor; 

impl CommandExecutor for MyCommandExecutor {
    fn execute<'a>(
        &self,
        sender: &'a CommandSender,
        server: &'a Server,
        args: &ConsumedArgs<'a>,
    ) -> CommandResult<'a> {
        Box::pin(async {
            Ok((1))
        })
    }
}
```
