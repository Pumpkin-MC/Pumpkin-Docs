# Di chuyển Sự kiện từ Bukkit

Trong Bukkit, các sự kiện được xử lý bằng cách tạo các class triển khai `Listener` và chú thích các phương thức bằng `@EventHandler`.

Trong Pumpkin, các event handler là các struct hoặc object được đăng ký rõ ràng qua `context.register_event_handler(...)`. Pumpkin cũng phân biệt giữa sự kiện **Blocking** và **Non-blocking** để tối đa hóa đồng thời của server.

---

## Các Khác biệt Chính

| Tính năng | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Khai báo Listener** | Chú thích `@EventHandler` trên các phương thức | Triển khai trait / interface `EventHandler<E>` |
| **Đăng ký** | `pm.registerEvents(listener, plugin)` | `context.register_event_handler(handler, priority, is_blocking)` |
| **Mô hình Thực thi** | Thực thi luồng chính (`EventPriority`) | Lựa chọn giữa **Blocking** (tuần tự/có thể hủy) và **Non-blocking** (đồng thời) |
| **Hủy bỏ** | `event.setCancelled(true)` | `event.cancel()` trên các sự kiện blocking |

---

## Sự kiện Blocking vs. Non-blocking trong Pumpkin

Khác với Bukkit nơi tất cả event handler chạy tuần tự trên luồng server chính, Pumpkin cho phép bạn chỉ định liệu một event handler có phải là **blocking**:

```rust
// Chữ ký đăng ký trong Rust:
context.register_event_handler(handler, priority, is_blocking)?;
```

- **Blocking (`is_blocking = true`)**: Thực thi theo thứ tự ưu tiên tuần tự. Có thể sửa đổi dữ liệu sự kiện (ví dụ: chỉnh sửa tin nhắn tham gia) hoặc hủy sự kiện.
- **Non-blocking (`is_blocking = false`)**: Thực thi đồng thời trên các worker thread. Lý tưởng cho logging, metrics, hoặc thông báo bên ngoài nơi không cần hủy bỏ.

---

## So sánh Code: Sự kiện Người chơi Tham gia

### 1. Triển khai Bukkit (Java)

```java [JoinListener.java]
public class JoinListener implements Listener {
    @EventHandler(priority = EventPriority.NORMAL)
    public void onPlayerJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();
        event.setJoinMessage("Welcome " + player.getName() + " to the server!");
    }
}

// Trong JavaPlugin:
// getServer().getPluginManager().registerEvents(new JoinListener(), this);
```

### 2. Triển khai Pumpkin

::: code-group

```rust [Rust]
use pumpkin_plugin_api::{
    Context, Plugin, PluginMetadata, Server,
    events::{EventData, EventHandler, EventPriority, PlayerJoinEvent},
    text::TextComponent,
};

struct JoinHandler;

impl EventHandler<PlayerJoinEvent> for JoinHandler {
    fn handle<\'a>(
        &\'a self,
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
        // Đăng ký blocking event handler với ưu tiên Normal
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
