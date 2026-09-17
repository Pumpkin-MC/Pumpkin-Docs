# Events migreren van Bukkit

In Bukkit worden events afgehandeld door klassen te maken die `Listener` implementeren en methoden te annoteren met `@EventHandler`.

In Pumpkin zijn event-handlers structs of objecten die expliciet worden geregistreerd via `context.register_event_handler(...)`. Pumpkin maakt bovendien onderscheid tussen **blokkerende (blocking)** en **niet-blokkerende (non-blocking)** events om de gelijktijdigheid (concurrency) van de server te maximaliseren.

---

## Belangrijkste verschillen

| Functie | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Listener-declaratie** | `@EventHandler`-annotatie op methoden | `EventHandler<E>` trait- / interface-implementatie |
| **Registratie** | `pm.registerEvents(listener, plugin)` | `context.register_event_handler(handler, priority, is_blocking)` |
| **Uitvoeringsmodel** | Uitvoering op hoofdthread (`EventPriority`) | Keuze tussen **Blokkerend** (sequentieel/annuleerbaar) en **Niet-blokkerend** (gelijktijdig) |
| **Annulering** | `event.setCancelled(true)` | `event.cancel()` op blokkerende events |

---

## Blokkerende vs. niet-blokkerende events in Pumpkin

In tegenstelling tot Bukkit, waar alle event-handlers sequentieel op de hoofdserverthread draaien, kun je in Pumpkin aangeven of een event-handler **blokkerend** is:

```rust
// Registratiesignatuur in Rust:
context.register_event_handler(handler, priority, is_blocking)?;
```

- **Blokkerend (`is_blocking = true`)**: Wordt uitgevoerd in sequentiële prioriteitsvolgorde. Kan eventgegevens wijzigen (bijv. join-bericht aanpassen) of het event annuleren.
- **Niet-blokkerend (`is_blocking = false`)**: Wordt gelijktijdig uitgevoerd over workerthreads. Ideaal voor logging, metrics of externe notificaties waarbij annulering niet nodig is.

---

## Codevergelijking: Speler-join-event

### 1. Bukkit-implementatie (Java)

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

### 2. Pumpkin-implementaties

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
