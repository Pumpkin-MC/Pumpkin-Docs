# Bukkit'ten Olayları Taşıma

Bukkit'te olaylar, `Listener` arayüzünü uygulayan sınıflar oluşturularak ve metotlara `@EventHandler` ek açıklaması (annotation) eklenerek işlenir.

Pumpkin'da olay işleyicileri (event handlers), `context.register_event_handler(...)` aracılığıyla açıkça kaydedilen yapılar (structs) veya nesnelerdir. Pumpkin ayrıca sunucu eşzamanlılığını maksimize etmek için **Bloklayan (Blocking)** ve **Bloklamayan (Non-blocking)** olaylar arasında ayrım yapar.

---

## Temel Farklar

| Özellik | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Dinleyici Bildirimi** | Metotlar üzerinde `@EventHandler` ek açıklaması | `EventHandler<E>` trait / arayüz uygulaması |
| **Kayıt** | `pm.registerEvents(listener, plugin)` | `context.register_event_handler(handler, priority, is_blocking)` |
| **Yürütme Modeli** | Ana iş parçacığında yürütme (`EventPriority`) | **Bloklayan** (sıralı/iptal edilebilir) ve **Bloklamayan** (eşzamanlı) arasında seçim |
| **İptal Etme** | `event.setCancelled(true)` | Bloklayan olaylarda `event.cancel()` |

---

## Pumpkin'da Bloklayan ve Bloklamayan Olaylar

Tüm olay işleyicilerinin ana sunucu iş parçacığında sıralı olarak çalıştığı Bukkit'in aksine Pumpkin, bir olay işleyicisinin **bloklayan** olup olmadığını belirlemenize olanak tanır:

```rust
// Registration signature in Rust:
context.register_event_handler(handler, priority, is_blocking)?;
```

- **Bloklayan (`is_blocking = true`)**: Sıralı öncelik sırasına göre yürütülür. Olay verilerini değiştirebilir (ör. giriş mesajını düzenleme) veya olayı iptal edebilir.
- **Bloklamayan (`is_blocking = false`)**: Çalışan iş parçacıkları (worker threads) arasında eşzamanlı olarak yürütülür. İptal işleminin gerekmediği günlük kaydı (logging), metrikler veya harici bildirimler için idealdir.

---

## Kod Karşılaştırması: Oyuncu Giriş Olayı

### 1. Bukkit Uygulaması (Java)

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

### 2. Pumpkin Uygulamaları

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
