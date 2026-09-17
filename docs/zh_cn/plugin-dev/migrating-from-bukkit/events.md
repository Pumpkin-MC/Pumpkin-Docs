# 从 Bukkit 迁移事件

在 Bukkit 中，事件处理通过创建实现 `Listener` 接口的类，并用 `@EventHandler` 注解方法来完成。

而在 Pumpkin 中，事件处理器是结构体或对象，并通过 `context.register_event_handler(...)` 进行显式注册。此外，Pumpkin 还区分了**阻塞（Blocking）**与**非阻塞（Non-blocking）**事件，以最大化服务器的并发性能。

---

## 核心差异

| 特性 | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **监听器声明** | 方法上的 `@EventHandler` 注解 | 实现 `EventHandler<E>` trait / 接口 |
| **事件注册** | `pm.registerEvents(listener, plugin)` | `context.register_event_handler(handler, priority, is_blocking)` |
| **执行模型** | 主线程执行（`EventPriority`） | 可选**阻塞**（顺序执行/可取消）与**非阻塞**（并发执行） |
| **事件取消** | `event.setCancelled(true)` | 在阻塞事件上调用 `event.cancel()` |

---

## Pumpkin 中的阻塞与非阻塞事件

与 Bukkit 中所有事件处理器都在主服务器线程上按顺序执行不同，Pumpkin 允许您指定事件处理器是否为**阻塞**类型：

```rust
// Registration signature in Rust:
context.register_event_handler(handler, priority, is_blocking)?;
```

- **阻塞（`is_blocking = true`）**：按优先级顺序依次执行。可以修改事件数据（例如修改进服消息）或取消事件。
- **非阻塞（`is_blocking = false`）**：在工作线程间并发执行。非常适合日志记录、指标收集或无需取消事件的外部通知。

---

## 代码对比：玩家加入事件

### 1. Bukkit 实现 (Java)

```java [JoinListener.java]
public class JoinListener implements Listener {
    @EventHandler(priority = EventPriority.NORMAL)
    public void onPlayerJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();
        event.setJoinMessage("Welcome " + player.getName() + " to the server!");
    }
}

// In JavaPlugin:
// getServer().getPluginManager().registerEvents(new JoinListener(), this);
```

### 2. Pumpkin 实现

::: code-group

```rust [Rust]
use pumpkin_plugin_api::{
    Context, Plugin, PluginMetadata, Server,
    events::{EventData, EventHandler, EventPriority, PlayerJoinEvent},
    text::TextComponent,
};

struct JoinHandler;

impl EventHandler<PlayerJoinEvent> for JoinHandler {
    fn handle<'a>(
        &'a self,
        _server: Server,
        mut event: EventData<PlayerJoinEvent>,
    ) -> EventData<PlayerJoinEvent> {
        event.join_message = TextComponent::text("Welcome to the Pumpkin server!");
        event
    }
}

pub struct MyPlugin;

impl Plugin for MyPlugin {
    fn new() -> Self { MyPlugin }

    fn metadata(&self) -> PluginMetadata {
        PluginMetadata {
            name: "join_plugin".into(),
            version: "1.0.0".into(),
            authors: vec!["Developer".into()],
            description: "Join event handler".into(),
        }
    }

    fn on_load(&mut self, context: Context) -> pumpkin_plugin_api::Result<()> {
        // Register blocking event handler with Normal priority
        context.register_event_handler(JoinHandler, EventPriority::Normal, true)?;
        Ok(())
    }
}
```

```python [Python]
from pumpkin_api import (
    Plugin, PluginMetadata, register_plugin,
    event, server, context
)

class MyPlugin(Plugin):
    def metadata(self) -> PluginMetadata:
        return PluginMetadata(name="join_plugin", version="1.0.0", authors=["Dev"], description="Join event")

    def on_load(self, ctx: context.Context) -> None:
        self.register_event(ctx, event.EventType.PLAYER_JOIN_EVENT, self.on_player_join)

    def on_player_join(self, srv: server.Server, evt: event.PlayerJoinEventData) -> event.PlayerJoinEventData:
        print(f"Player joined!")
        return evt

register_plugin(MyPlugin)
```

:::
