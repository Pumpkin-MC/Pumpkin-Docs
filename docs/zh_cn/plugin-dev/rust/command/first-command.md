# 制作您的第一个命令

在注册您的命令之前，您需要为其选择一个名称。在本示例中，我们将其定义为常量数组。使用数组可以方便地添加别名

```rust
let names = ["test".to_string()]; 
// 或者使用别名
let names = ["test".to_string(), "测试命令".to_string()];
```

您还应该定义一个描述，当玩家使用 /help 命令时，该描述将会被显示。

```rust
let description = "我的第一个命令！";
```

Pumpkin 的命令 API 深受 Mojang 的 [Brigadier](https://github.com/Mojang/brigadier) 启发。该系统使您能够轻松管理命令语法，并为玩家提供自动补全功能。

#### 实现命令树

```rust
use pumpkin_plugin_api::command::Command;

pub fn init_command_tree() -> Command {
    let names = ["test".to_string(), "测试命令".to_string()];
    let description = "我的第一个命令！";

    Command::new(&names, description)
}
```

#### 注册与权限

要使该命令可用，您必须在插件上下文中同时注册权限和命令本身。

首先，注册权限。在此示例中，我们设置 `PermissionDefault::Allow`，以便默认情况下所有玩家都能使用该命令。

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
            description: "一个简单的示例插件".into(),
        }
    }

    fn on_load(&mut self, context: Context) -> pumpkin_plugin_api::Result<()> {
        tracing::info!("你好, Pumpkin!");

        context.register_permission(&Permission { // [!code ++:7]
            // 这必须与您在 PluginMetadata 中提供的命名空间相同。
            node: "plugin_docs_plugin:test".to_string(),
            description: "重要测试权限.to_string(),
            default: PermissionDefault::Allow,
            children: Vec::new(),
        })?;

        Ok(())
    }
}
```

接下来，使用上面创建的权限字符串来注册命令：

```rust
struct MyPlugin;
impl Plugin for MyPlugin {
    // ...

    fn on_load(&mut self, context: Context) -> pumpkin_plugin_api::Result<()> {
        tracing::info!("Hello, Pumpkin!");

        context.register_permission(&Permission {
            // 这必须与您在 PluginMetadata 中提供的命名空间相同。
            node: "plugin_docs_plugin:test".to_string(),
            description: "重要测试权限".to_string(),
            default: PermissionDefault::Allow,
            children: Vec::new(),
        })?;
        
         context.register_command(init_command_tree(), "plugin_docs_plugin:test"); // [!code ++:1]

        Ok(())
    }
}
```

重新构建您的插件，将插件文件移动到 plugins 文件夹中，然后重启服务器。

**恭喜！** 该命令现已注册，并应在游戏内和控制台中高亮显示。

<img src="/assets/plugin-dev/first_command_preview.png" alt="drawing" width="1000"/>

由于尚未实现命令执行器，且该命令当前不执行任何操作，立即执行该命令很可能会抛出语法错误。

```
$ test
$ 无效的语法。使用方法: /test
```

### 添加执行器

让我们创建一个不需要任何参数的超级简单的命令执行器。

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

### 附加执行器

现在，为了附加执行器，我们只需将其提供给命令即可。

```rust
pub fn init_command_tree() -> Command {
    let names = ["test".to_string(), "测试命令".to_string()];
    let description = "我的第一个命令！";

    Command::new(&names, description).execute(MyCommandExecutor) // [!code ++:1]
}
```

现在，当运行 `/test` 命令时，您应该不会再收到语法错误。
