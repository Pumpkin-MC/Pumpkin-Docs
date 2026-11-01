# 從 Bukkit 遷移事件

在 Bukkit 中，事件透過建立實現 `Listener` 的類並使用 `@EventHandler` 註解方法來處理。

在 Pumpkin 中，事件處理器是透過 `context.register_event_handler(...)` 顯式註冊的結構或物件。Pumpkin 還區分**阻塞**和**非阻塞**事件，以最大限度提高伺服器並發性。

---

## 主要區別

| 功能 | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **監聽器宣告** | 方法上的 `@EventHandler` 註解 | 實現 `EventHandler<E>` trait / 界面 |
| **註冊** | `pm.registerEvents(listener, plugin)` | `context.register_event_handler(handler, priority, is_blocking)` |
| **執行模型** | 主線程執行（`EventPriority`） | 可選擇**阻塞**（順序執行/可取消）或**非阻塞**（並發執行） |
| **取消** | `event.setCancelled(true)` | 對阻塞事件調用 `event.cancel()` |

---

## Pumpkin 中的阻塞與非阻塞事件

Bukkit 的所有事件處理器都在伺服器主線程上順序執行，而 Pumpkin 允許你指定事件處理器是否為**阻塞**處理器：

```rust
// Rust 中的註冊簽名：
context.register_event_handler(handler, priority, is_blocking)?;
```

- **阻塞（`is_blocking = true`）**：按優先順序順序依次執行。可以修改事件資料（例如編輯加入訊息）或取消事件。
- **非阻塞（`is_blocking = false`）**：在工作線程上並發執行。非常適合日誌記錄、指標收集或無需取消事件的外部通知。

---

## 程式碼對比：玩家加入事件

### 1. Bukkit 實現（Java）

```java [JoinListener.java]
public class JoinListener implements Listener {
    @EventHandler(priority = EventPriority.NORMAL)
    public void onPlayerJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();
        event.setJoinMessage("Welcome " + player.getName() + " to the server!");
    }
}

// 在 JavaPlugin 中：
// getServer().getPluginManager().registerEvents(new JoinListener(), this);
```

### 2. Pumpkin 實現

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

    fn on_load(&self, context: Context) -> pumpkin_plugin_api::Result<()> {
        // 註冊具有普通優先順序的阻塞事件處理器
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
