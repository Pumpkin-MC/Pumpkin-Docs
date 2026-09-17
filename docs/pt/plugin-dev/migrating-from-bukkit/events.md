# Migrando Eventos do Bukkit

No Bukkit, os eventos são manipulados criando classes que implementam `Listener` e anotando métodos com `@EventHandler`.

No Pumpkin, manipuladores de eventos (event handlers) são structs ou objetos registrados explicitamente via `context.register_event_handler(...)`. O Pumpkin também diferencia entre eventos **Bloqueantes** (Blocking) e **Não Bloqueantes** (Non-blocking) para maximizar a concorrência do servidor.

---

## Principais Diferenças

| Recurso | Bukkit / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **Declaração do Listener** | Anotação `@EventHandler` em métodos | Implementação de trait / interface `EventHandler<E>` |
| **Registro** | `pm.registerEvents(listener, plugin)` | `context.register_event_handler(handler, priority, is_blocking)` |
| **Modelo de Execução** | Execução na thread principal (`EventPriority`) | Escolha entre **Bloqueante** (sequencial/cancelável) e **Não Bloqueante** (concorrente) |
| **Cancelamento** | `event.setCancelled(true)` | `event.cancel()` em eventos bloqueantes |

---

## Eventos Bloqueantes vs. Não Bloqueantes no Pumpkin

Ao contrário do Bukkit, onde todos os manipuladores de eventos são executados sequencialmente na thread principal do servidor, o Pumpkin permite especificar se um manipulador de eventos é **bloqueante**:

```rust
// Assinatura de registro em Rust:
context.register_event_handler(handler, priority, is_blocking)?;
```

- **Bloqueante (`is_blocking = true`)**: Executa em ordem de prioridade sequencial. Pode modificar dados de eventos (por exemplo, editar mensagem de entrada) ou cancelar o evento.
- **Não Bloqueante (`is_blocking = false`)**: Executa concorrentemente através de worker threads. Ideal para logging, métricas ou notificações externas onde o cancelamento não é necessário.

---

## Comparação de Código: Evento de Entrada de Jogador (Player Join)

### 1. Implementação no Bukkit (Java)

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

### 2. Implementações no Pumpkin

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
