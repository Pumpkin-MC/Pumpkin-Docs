# Ein benutzerdefiniertes Inventar öffnen

## Überblick

Das Inventarsystem in Pumpkin bietet einen flexiblen Weg zur Verwaltung und Manipulation von Items. Dieses Dokument erklärt, wie du eigene Inventare erstellst und implementierst.

## Inhaltsverzeichnis

- [Ein benutzerdefiniertes Inventar öffnen](#ein-benutzerdefiniertes-inventar-öffnen)
  - [Überblick](#überblick)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [Einfache Inventar-Implementierung](#einfache-inventar-implementierung)
  - [Erforderliche Traits](#erforderliche-traits)
    - [Inventory Trait](#inventory-trait)
    - [Clearable Trait](#clearable-trait)
  - [Screen Handler](#screen-handler)
    - [Generische Screen Handler verwenden](#generische-screen-handler-verwenden)
    - [Eigene Screen Handler erstellen](#eigene-screen-handler-erstellen)
  - [Best Practices](#best-practices)
  - [Beispiele](#beispiele)
    - [Einfacher Inventar-Einsatz](#einfacher-inventar-einsatz)

## Einfache Inventar-Implementierung

Die Struktur `BasicInventory` bietet eine Standard‑Implementierung mit 27 Slots:

```rust
use pumpkin_world::{
    inventory::{
        split_stack, {Clearable, Inventory},
    },
    item::ItemStack,
};

#[derive(Debug)]
pub struct BasicInventory {
    pub items: [Arc<Mutex<ItemStack>>; 27],
}
```

## Erforderliche Traits

### Inventory Trait

Das Trait `Inventory` definiert Kernfunktionalitäten:

```rust
#[async_trait]
impl Inventory for BasicInventory {
    fn size(&self) -> usize { self.items.len() }
    async fn is_empty(&self) -> bool { /* ... */ }
    async fn get_stack(&self, slot: usize) -> Arc<Mutex<ItemStack>> { self.items[slot].clone() }
    async fn remove_stack(&self, slot: usize) -> ItemStack { /* ... */ }
    async fn remove_stack_specific(&self, slot: usize, amount: u8) -> ItemStack { /* ... */ }
    async fn set_stack(&self, slot: usize, stack: ItemStack) { /* ... */ }
}
```

### Clearable Trait

```rust
#[async_trait]
impl Clearable for YourInventory {
    async fn clear(&self) {
        for slot in self.items.iter() {
            *slot.lock().await = ItemStack::EMPTY;
        }
    }
}
```

## Screen Handler

Screen Handler erzeugen/steuern die UI für Inventare.

### Generische Screen Handler verwenden

```rust
use pumpkin_inventory::generic_container_screen_handler::create_generic_9x3;
use pumpkin_inventory::player::player_inventory::PlayerInventory;
use pumpkin_inventory::screen_handler::{InventoryPlayer, ScreenHandler, ScreenHandlerFactory};

struct MyScreenFactory { inventory: Arc<dyn Inventory> }

impl ScreenHandlerFactory for MyScreenFactory {
    fn create_screen_handler(&self, sync_id: u8, player_inventory: &Arc<PlayerInventory>, _player: &dyn InventoryPlayer) -> Option<Arc<Mutex<dyn ScreenHandler>>> {
        Some(Arc::new(Mutex::new(create_generic_9x3(sync_id, player_inventory, self.inventory.clone()))))
    }
    fn get_display_name(&self) -> TextComponent { TextComponent::translate("container.barrel", vec![]) }
}

let factory = MyScreenFactory { inventory: inventory.clone() };
player.open_handled_screen(factory).await;
```

### Eigene Screen Handler erstellen

Implementiere das Trait `ScreenHandler` für volle Kontrolle (siehe generisches Beispiel im Original).

## Best Practices

1. Thread‑Sicherheit: Locks rechtzeitig freigeben (Deadlocks vermeiden)
2. Nutzung von `ItemStack::EMPTY` für leere Slots
3. Korrektes Schließen von Inventaren verhindern Item‑Verlust
4. Slot‑Anzahl muss zum Fenstertyp passen

## Beispiele

```rust
let inventory = BasicInventory { items: [(); 27].map(|_| Arc::new(Mutex::new(ItemStack::EMPTY))) };
inventory.set_stack(0, ItemStack::new(1, &Items::OAK_LOG)).await;
let removed = inventory.remove_stack(0).await;
let is_empty = inventory.is_empty().await;
```
