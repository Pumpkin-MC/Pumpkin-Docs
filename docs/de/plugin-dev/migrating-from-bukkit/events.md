# Events von Bukkit migrieren

In Bukkit werden Events verarbeitet, indem Klassen erstellt werden, die `Listener` implementieren, und Methoden mit `@EventHandler` annotiert werden.

In Pumpkin sind Event-Handler Strukturen (Structs) oder Objekte, die explizit über `context.register_event_handler(...)` registriert werden. Zudem unterscheidet Pumpkin zwischen **blockierenden** und **nicht-blockierenden** Events, um die Nebenläufigkeit (Concurrency) des Servers zu maximieren.

---

## Wesentliche Unterschiede

| Merkmal | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Listener-Deklaration** | `@EventHandler`-Annotation an Methoden | Implementierung des Traits / Interface `EventHandler<E>` |
| **Registrierung** | `pm.registerEvents(listener, plugin)` | `context.register_event_handler(handler, priority, is_blocking)` |
| **Ausführungsmodell** | Ausführung auf dem Haupt-Thread (`EventPriority`) | Wahl zwischen **blockierend** (sequenziell/abbrechbar) und **nicht-blockierend** (nebenläufig) |
| **Abbrechen von Events** | `event.setCancelled(true)` | `event.cancel()` bei blockierenden Events |

---

## Blockierende vs. Nicht-blockierende Events in Pumpkin

Im Gegensatz zu Bukkit, wo alle Event-Handler sequenziell auf dem Haupt-Server-Thread laufen, kannst du in Pumpkin festlegen, ob ein Event-Handler **blockierend** ist:

```rust
// Registrierungssignatur in Rust:
context.register_event_handler(handler, priority, is_blocking)?;
```

- **Blockierend (`is_blocking = true`)**: Wird in sequenzieller Prioritätsreihenfolge ausgeführt. Kann Event-Daten ändern (z. B. die Beitrittsnachricht bearbeiten) oder das Event abbrechen.
- **Nicht-blockierend (`is_blocking = false`)**: Wird nebenläufig über Worker-Threads hinweg ausgeführt. Ideal für Logging, Metriken oder externe Benachrichtigungen, bei denen kein Abbruch des Events erforderlich ist.

---

## Code-Vergleich: Spieler-Beitritts-Event

### 1. Bukkit-Implementierung (Java)

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

### 2. Pumpkin-Implementierungen

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
        // Registriere blockierenden Event-Handler mit Normal-Priorität
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
