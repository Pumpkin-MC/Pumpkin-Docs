# Event‑Handler schreiben (Join Event)

Event‑Handler sind eine zentrale Funktion von Plugins. Sie erlauben es, in das Verhalten des Servers einzugreifen. Als Beispiel implementieren wir hier einen Handler für das `player_join`‑Event.

Das Event‑System von Pumpkin orientiert sich an Bukkit/Spigot, hat aber rust‑typische Unterschiede (z. B. keine Vererbung, dafür Komposition und Traits).

## Implementierung des Join‑Events

Event‑Handler sind einfache Structs, die das Trait `EventHandler<T>` implementieren (wobei `T` das konkrete Event ist).

### Was sind blockierende Events?

Es gibt zwei Event‑Arten: blockierende und nicht‑blockierende Events.

Blockierende Events:
- Können das Event modifizieren (z. B. Join‑Message ändern)
- Können das Event abbrechen
- Haben ein Prioritätssystem
- Werden sequentiell ausgeführt (können bei falscher Implementierung den Server verlangsamen)

Nicht‑blockierende Events:
- Werden gleichzeitig ausgeführt
- Werden nach Abschluss der blockierenden Events ausgeführt
- Können nur eingeschränkt Änderungen vornehmen (nur über Mutex/RwLock geschützte Daten)
- Können das Event nicht abbrechen und haben keine Priorität

### Handler schreiben

Um die Willkommensnachricht beim Join zu ändern, wählen wir ein blockierendes Event mit niedriger Priorität.

Füge folgenden Code oberhalb von `on_load` ein:

:::code-group

```rs [lib.rs]
use async_trait::async_trait;
use pumpkin_api_macros::with_runtime;
use pumpkin::{
    plugin::{player::player_join::PlayerJoinEvent, Context, EventHandler, EventPriority},
    server::Server,
};
use pumpkin_util::text::{color::NamedColor, TextComponent};

struct MyJoinHandler;

#[with_runtime(global)]
#[async_trait]
impl EventHandler<PlayerJoinEvent> for MyJoinHandler {
    async fn handle_blocking(&self, _server: &Arc<Server>, event: &mut PlayerJoinEvent) {
        event.join_message =
            TextComponent::text(format!("Welcome, {}!", event.player.gameprofile.name))
                .color_named(NamedColor::Green);
    }
}
```

:::

Erläuterungen:
- `#[with_runtime(global)]`: Wickelt async‑Impls, die mit dem Tokio‑Runtime interagieren. Achte auf die Reihenfolge der Makros.
- `#[async_trait]`: Ermöglicht async‑Methoden in Traits.
- `handle_blocking`: Wird für blockierende Events implementiert.

### Handler registrieren

Registriere den Handler in `on_load` mit einer Zeile:

:::code-group

```rs [lib.rs]
server.register_event(Arc::new(MyJoinHandler), EventPriority::Lowest, true).await;
```

:::

Baue das Plugin und trete dem Server bei — die Willkommensnachricht sollte nun grün und personalisiert erscheinen.
