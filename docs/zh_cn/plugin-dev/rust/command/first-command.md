# 创建您的第一个命令

在 Pumpkin 中注册和处理自定义命令的设计对开发者友好、速度快，并采用类似 Mojang Brigadier 系统的结构。

---

## 1. 快速示例

下面是一个完整的最小 Rust 插件，它注册一个带有权限检查的 `/hello` 命令，并向玩家发送响应。

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
        sender.send_message(TextComponent::text("Hello from Pumpkin!"));
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
            authors: vec!["Developer".into()],
            description: "My first Pumpkin plugin".into(),
        }
    }

    fn on_load(&self, context: Context) -> pumpkin_plugin_api::Result<()> {
        // 1. 注册权限节点
        context.register_permission(&Permission {
            node: "my_plugin:hello".to_string(),
            description: "Allows executing the /hello command".to_string(),
            default: PermissionDefault::Allow,
            children: Vec::new(),
        })?;

        // 2. 构建带有别名和执行器的命令树
        let names = ["hello".to_string(), "hi".to_string()];
        let command = Command::new(&names, "Greets the player").execute(HelloExecutor);

        // 3. 注册命令
        context.register_command(command, "my_plugin:hello")?;

        Ok(())
    }
}
```

---

## 2. 游戏内预览

注册后，您的命令会自动在 Minecraft 中获得客户端自动补全、语法验证和颜色高亮功能：

<img src="/assets/first_command_preview.png" alt="游戏内命令自动补全预览" width="500"/>

---

## 3. 工作原理

::: details 分步解析

### 第 1 步：定义权限
Pumpkin 中的命令需要权限节点。使用 `PermissionDefault::Allow` 可默认允许所有玩家执行该命令：
```rust
context.register_permission(&Permission {
    node: "my_plugin:hello".to_string(),
    description: "Allows executing the /hello command".to_string(),
    default: PermissionDefault::Allow,
    children: Vec::new(),
})?;
```

### 第 2 步：构建命令树
使用 `Command::new` 定义主名称和别名，然后通过 `.execute(...)` 附加您的 `CommandHandler` 结构体：
```rust
let names = ["hello".to_string(), "hi".to_string()];
let command = Command::new(&names, "Greets the player")
    .execute(HelloExecutor);
```

### 第 3 步：通过 Context 注册
将命令树和权限节点字符串传递给 `context.register_command`：
```rust
context.register_command(command, "my_plugin:hello")?;
```

:::

---

## 后续步骤

- 在[石头剪刀布教程](./rock-paper-scissors)中探索复杂的子命令和参数解析。
- 学习如何在插件逻辑中处理物品栏和 GUI 交互。
