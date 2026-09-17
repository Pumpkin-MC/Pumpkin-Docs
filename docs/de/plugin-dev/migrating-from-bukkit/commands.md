# Befehle von Bukkit migrieren

In Bukkit werden Befehle in der `plugin.yml` definiert und über `CommandExecutor`-Klassen oder die Brigadier-Bibliothek verarbeitet.

In Pumpkin werden Befehle mithilfe eines **von Brigadier inspirierten Befehlsbaums** erstellt und programmatisch über `context.register_command` registriert. Es werden keine YAML-Konfigurationsdateien verwendet.

---

## Wesentliche Unterschiede

| Merkmal | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Deklaration** | In der `plugin.yml` unter `commands:` deklariert | Im Code über `Command::new(...)` erstellt |
| **Berechtigungen** | In `plugin.yml` verknüpft oder via `player.hasPermission()` geprüft | Expliziter Berechtigungsknoten bei `register_command()` gebunden |
| **Tab-Vervollständigung** | Manuelles String-Matching in `TabCompleter` | Automatische baumbasierte clientseitige Tab-Vervollständigung |
| **Unterbefehle (Subcommands)** | Manuelles `if (args[0].equalsIgnoreCase("..."))` | Verschachtelte `Command`-Baumknoten |

---

## Code-Vergleich: Einfacher Befehl

Vergleich der Registrierung eines `/feed`-Befehls in Bukkit vs. Pumpkin:

### 1. Bukkit-Implementierung (Java)

```java [FeedCommand.java]
// 1. Registered in plugin.yml:
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

### 2. Pumpkin-Implementierungen

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

    fn on_load(&mut self, context: Context) -> pumpkin_plugin_api::Result<()> {
        // 1. Register permission node (Replaces plugin.yml permission)
        context.register_permission(&Permission {
            node: "feed_plugin:feed".to_string(),
            description: "Allows executing /feed".to_string(),
            default: PermissionDefault::Allow,
            children: Vec::new(),
        })?;

        // 2. Build command tree
        let command = Command::new(&["feed".to_string(), "eat".to_string()], "Feeds the player")
            .execute(FeedExecutor);

        // 3. Register with context
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
