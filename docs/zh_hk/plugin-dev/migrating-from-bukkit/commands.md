# 從 Bukkit 遷移指令

在 Bukkit 中，指令在 `plugin.yml` 中定義，並透過 `CommandExecutor` 類或 Brigadier 庫處理。

在 Pumpkin 中，指令使用**受 Brigadier 啟發的指令樹**構建，並透過 `context.register_command` 以程式設計方式註冊。無需使用 YAML 設定檔案。

---

## 主要區別

| 功能 | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **宣告** | 在 `plugin.yml` 的 `commands:` 下宣告 | 在程式碼中使用 `Command::new(...)` 構建 |
| **權限** | 在 `plugin.yml` 中關聯，或透過 `player.hasPermission()` 檢查 | 在 `register_command()` 期間顯式綁定權限節點 |
| **Tab 自動完成** | 在 `TabCompleter` 中手動匹配字符串 | 基於指令樹自動進行客戶端 Tab 自動完成 |
| **子指令** | 手動編寫 `if (args[0].equalsIgnoreCase("..."))` | 巢狀的 `Command` 樹節點 |

---

## 程式碼對比：簡單指令

對比在 Bukkit 與 Pumpkin 中註冊 `/feed` 指令的方式：

### 1. Bukkit 實現（Java）

```java [FeedCommand.java]
// 1. 在 plugin.yml 中註冊：
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

### 2. Pumpkin 實現

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
        // 1. 註冊權限節點（替換 plugin.yml 權限）
        context.register_permission(&Permission {
            node: "feed_plugin:feed".to_string(),
            description: "Allows executing /feed".to_string(),
            default: PermissionDefault::Allow,
            children: Vec::new(),
        })?;

        // 2. 建構指令樹
        let command = Command::new(&["feed".to_string(), "eat".to_string()], "Feeds the player")
            .execute(FeedExecutor);

        // 3. 透過 context 註冊
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
