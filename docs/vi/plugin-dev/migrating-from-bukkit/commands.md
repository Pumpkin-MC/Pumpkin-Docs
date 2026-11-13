# Di chuyển Lệnh từ Bukkit

Trong Bukkit, các lệnh được định nghĩa trong `plugin.yml` và xử lý thông qua các class `CommandExecutor` hoặc thư viện Brigadier.

Trong Pumpkin, các lệnh được xây dựng bằng **cây lệnh mô phỏng Brigadier** và đăng ký theo chương trình qua `context.register_command`. Không sử dụng file cấu hình YAML.

---

## Các Khác biệt Chính

| Tính năng | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Khai báo** | Khai báo trong `plugin.yml` dưới `commands:` | Xây dựng trong code dùng `Command::new(...)` |
| **Quyền hạn** | Liên kết trong `plugin.yml` hoặc kiểm tra qua `player.hasPermission()` | Node quyền hạn được liên kết rõ ràng trong `register_command()` |
| **Hoàn thành Tab** | Khớp chuỗi thủ công trong `TabCompleter` | Hoàn thành tab tự động phía client dựa trên cây |
| **Lệnh con** | Thủ công `if (args[0].equalsIgnoreCase("..."))` | Các node cây `Command` lồng nhau |

---

## So sánh Code: Lệnh Đơn giản

So sánh việc đăng ký lệnh `/feed` trong Bukkit và Pumpkin:

### 1. Triển khai Bukkit (Java)

```java [FeedCommand.java]
// 1. Đăng ký trong plugin.yml:
// commands:
//   feed:
//     description: Feeds the player
//     permission: myplugin.feed

public class FeedCommand implements CommandExecutor {
    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (!(sender instanceof Player)) {
            sender.sendMessage("Only players can execute this command!");
            return true;
        }
        Player player = (Player) sender;
        if (!player.hasPermission("myplugin.feed")) {
            player.sendMessage("No permission!");
            return true;
        }
        player.setFoodLevel(20);
        player.sendMessage("Your hunger has been satisfied!");
        return true;
    }
}
```

### 2. Triển khai Pumpkin

::: code-group

```rust [Rust]
use pumpkin_plugin_api::{
    command::{CommandHandler, CommandSender, ConsumedArgs, CommandError, Command},
    permission::{Permission, PermissionDefault},
    Context, Plugin, PluginMetadata, Server,
};

struct FeedExecutor;

impl CommandHandler for FeedExecutor {
    fn handle(&self, sender: CommandSender, _server: Server, _args: ConsumedArgs) -> Result<i32, CommandError> {
        sender.send_message("Your hunger has been satisfied!");
        Ok(1)
    }
}

pub struct MyPlugin;

impl Plugin for MyPlugin {
    fn new() -> Self { MyPlugin }

    fn metadata(&self) -> PluginMetadata {
        PluginMetadata {
            name: "feed_plugin".into(),
            version: "1.0.0".into(),
            authors: vec!["Developer".into()],
            description: "Feed command plugin".into(),
        }
    }

    fn on_load(&self, context: Context) -> pumpkin_plugin_api::Result<()> {
        // 1. Đăng ký node quyền hạn (Thay thế quyền plugin.yml)
        context.register_permission(&Permission {
            node: "feed_plugin:feed".to_string(),
            description: "Allows executing /feed".to_string(),
            default: PermissionDefault::Allow,
            children: Vec::new(),
        })?;

        // 2. Xây dựng cây lệnh
        let command = Command::new(&["feed".to_string(), "eat".to_string()], "Feeds the player")
            .execute(FeedExecutor);

        // 3. Đăng ký với context
        context.register_command(command, "feed_plugin:feed")?;

        Ok(())
    }
}
```

```python [Python]
from pumpkin_api import (
    Plugin, PluginMetadata, register_plugin,
    permission, command, context, server
)

class FeedExecutor:
    def handle(self, sender: command.CommandSender, srv: server.Server, args: command.ConsumedArgs) -> int:
        sender.send_message("Your hunger has been satisfied!")
        return 1

class FeedPlugin(Plugin):
    def metadata(self) -> PluginMetadata:
        return PluginMetadata(name="feed_plugin", version="1.0.0", authors=["Dev"], description="Feed command")

    def on_load(self, ctx: context.Context) -> None:
        ctx.register_permission(permission.Permission(
            node="feed_plugin:feed",
            description="Allows executing /feed",
            default=permission.PermissionDefault.ALLOW,
            children=[]
        ))

        cmd = command.Command(["feed", "eat"], "Feeds the player")
        cmd.execute(FeedExecutor())
        ctx.register_command(cmd, "feed_plugin:feed")

register_plugin(FeedPlugin)
```

```kotlin [Kotlin]
package plugin

import pumpkin.plugin.context.Context
import pumpkin.plugin.command.Command
import pumpkin.plugin.command.CommandSender
import pumpkin.plugin.permission.Permission
import pumpkin.plugin.permission.PermissionDefault

class FeedPlugin {
    fun onLoad(ctx: Context) {
        ctx.registerPermission(
            Permission(
                node = "feed_plugin:feed",
                description = "Allows executing /feed",
                default = PermissionDefault.ALLOW,
                children = emptyList()
            )
        )

        val cmd = Command(
            names = listOf("feed", "eat"),
            description = "Feeds the player"
        )
        ctx.registerCommand(cmd, "feed_plugin:feed")
    }

    fun handleCommand(sender: CommandSender): Int {
        sender.sendMessage("Your hunger has been satisfied!")
        return 1
    }
}
```

:::
