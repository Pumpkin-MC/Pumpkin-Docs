# Tạo Lệnh Đầu Tiên Của Bạn

Đăng ký và xử lý các lệnh tùy chỉnh trong Pumpkin được thiết kế để thân thiện với nhà phát triển, nhanh chóng và có cấu trúc như hệ thống Brigadier của Mojang.

---

## 1. Ví dụ Nhanh

Dưới đây là một plugin Rust hoàn chỉnh và tối thiểu đăng ký lệnh `/hello` với kiểm tra permission và gửi phản hồi lại cho người chơi.

```rust [src/lib.rs]
use pumpkin_plugin_api::{
    command::{CommandHandler, CommandSender, ConsumedArgs, CommandError, Command},
    permission::{Permission, PermissionDefault},
    text::TextComponent,
    Context, Plugin, PluginMetadata, Server,
};

struct HelloExecutor;

impl CommandHandler for HelloExecutor {
    fn handle(
        &self,
        sender: CommandSender,
        _server: Server,
        _args: ConsumedArgs,
    ) -> Result<i32, CommandError> {
        sender.send_message(TextComponent::text("Xin chào từ Pumpkin!"));
        Ok(1)
    }
}

pub struct MyPlugin;

impl Plugin for MyPlugin {
    fn new() -> Self {
        MyPlugin
    }

    fn metadata(&self) -> PluginMetadata {
        PluginMetadata {
            name: "my_plugin".into(),
            version: env!("CARGO_PKG_VERSION").into(),
            authors: vec!["Nhà phát triển".into()],
            description: "Plugin Pumpkin đầu tiên của tôi".into(),
        }
    }

    fn on_load(&self, context: Context) -> pumpkin_plugin_api::Result<()> {
        // 1. Đăng ký node permission
        context.register_permission(&Permission {
            node: "my_plugin:hello".to_string(),
            description: "Cho phép thực thi lệnh /hello".to_string(),
            default: PermissionDefault::Allow,
            children: Vec::new(),
        })?;

        // 2. Xây dựng cây lệnh với alias & executor
        let names = ["hello".to_string(), "hi".to_string()];
        let command = Command::new(&names, "Chào người chơi").execute(HelloExecutor);

        // 3. Đăng ký lệnh
        context.register_command(command, "my_plugin:hello")?;

        Ok(())
    }
}
```

---

## 2. Xem trước Trong Game

Sau khi đăng ký, lệnh của bạn tự động có tính năng tự động hoàn thành phía client, xác thực cú pháp và tô sáng màu trong Minecraft:

<img src="/assets/first_command_preview.png" alt="Xem trước Tự động hoàn thành Lệnh Trong Game" width="500"/>

---

## 3. Cách Thức Hoạt động

::: details Phân tích Từng bước

### Bước 1: Định nghĩa Permission
Các lệnh trong Pumpkin yêu cầu một node permission. Sử dụng `PermissionDefault::Allow` cho phép tất cả người chơi thực thi nó theo mặc định:
```rust
context.register_permission(&Permission {
    node: "my_plugin:hello".to_string(),
    description: "Cho phép thực thi lệnh /hello".to_string(),
    default: PermissionDefault::Allow,
    children: Vec::new(),
})?;
```

### Bước 2: Xây dựng Cây Lệnh
Sử dụng `Command::new` để định nghĩa tên chính và alias, sau đó gắn struct `CommandHandler` của bạn với `.execute(...)`:
```rust
let names = ["hello".to_string(), "hi".to_string()];
let command = Command::new(&names, "Chào người chơi")
    .execute(HelloExecutor);
```

### Bước 3: Đăng ký với Context
Truyền cây lệnh và chuỗi node permission cho `context.register_command`:
```rust
context.register_command(command, "my_plugin:hello")?;
```

:::

---

## Các bước tiếp theo

- Khám phá các lệnh con phức tạp và phân tích đối số trong [Hướng dẫn Oẳn-Tù-TÌ](./rock-paper-scissors).
- Tìm hiểu cách xử lý inventory và tương tác GUI trong logic plugin.
