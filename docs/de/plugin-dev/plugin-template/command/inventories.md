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

Die Struktur `BasicInventory` bietet eine Standard‑Implementierung mit 27 Slots. So implementieren Sie Ihr eigenes Inventar:

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

Das Trait `Inventory` definiert Kernfunktionalitäten die alle Inventare implementieren müssen:

```rust
impl Inventory for BasicInventory {
    // Get the total number of slots in the inventory
    fn size(&self) -> usize {
        self.items.len()
    }

    // Check if the inventory is completely empty
    fn is_empty(&self) -> InventoryFuture<'_, bool> {
        Box::pin(async move {
            for slot in self.items.iter() {
                if !slot.lock().await.is_empty() {
                    return false;
                }
            }

            true
        })
    }

    // Get a reference to an item stack in a specific slot
    fn get_stack(&self, slot: usize) -> InventoryFuture<'_, Arc<Mutex<ItemStack>>> {
        Box::pin(async move { self.items[slot].clone() })
    }

    // Remove and return the entire stack from a slot
    fn remove_stack(&self, slot: usize) -> InventoryFuture<'_, ItemStack> {
        Box::pin(async move {
            let mut removed = ItemStack::EMPTY.clone();
            let mut guard = self.items[slot].lock().await;
            std::mem::swap(&mut removed, &mut *guard);
            removed
        })
    }

    // Remove a specific amount of items from a stack
    fn remove_stack_specific(&self, slot: usize, amount: u8) -> InventoryFuture<'_, ItemStack> {
        Box::pin(async move { split_stack(&self.items, slot, amount).await })
    }

    // Set the contents of a specific slot
    fn set_stack(&self, slot: usize, stack: ItemStack) -> InventoryFuture<'_, ()> {
        Box::pin(async move {
            *self.items[slot].lock().await = stack;
        })
    }
}
```

### Clearable Trait

Das `Clearable`-Trait bietet die Möglichkeit, ein Inventar zu leeren. Dies muss für das `Inventory`-Trait implementiert werden:

```rust
impl Clearable for YourInventory {
    fn clear(&self) -> Pin<Box<dyn Future<Output = ()> + Send + '_>> {
        Box::pin(async move {
            for item in self.items.iter() {
                *item.lock().await = ItemStack::EMPTY.clone();
            }
        })
    }
}
```

## Screen Handler

Bildschirmhandler dienen der Erstellung und Verwaltung der Benutzeroberfläche für Inventare. Sie definieren, wie Gegenstände zwischen Slots verschoben werden können und wie das Inventar mit dem Inventar des Spielers interagiert.

### Generische Screen Handler verwenden

Pumpkin bietet einen generischen Bildschirmhandler für gängige Inventarlayouts. So verwenden Sie ihn:

```rust
use pumpkin_inventory::generic_container_screen_handler::create_generic_9x3;
use pumpkin_inventory::player::player_inventory::PlayerInventory;
use pumpkin_inventory::screen_handler::{InventoryPlayer, ScreenHandler, ScreenHandlerFactory};

struct MyScreenFactory {
    inventory: Arc<dyn Inventory>,
}

impl ScreenHandlerFactory for MyScreenFactory {
    fn create_screen_handler(
        &self,
        sync_id: u8,
        player_inventory: &Arc<PlayerInventory>,
        _player: &dyn InventoryPlayer,
    ) -> Option<Arc<Mutex<dyn ScreenHandler>>> {
        Some(Arc::new(Mutex::new(create_generic_9x3(
            sync_id,
            player_inventory,
            self.inventory.clone(),
        ))))
    }

    fn get_display_name(&self) -> TextComponent {
        TextComponent::translate("container.barrel", vec![])
    }
}

// Erstellen Sie eine Factory für den Bildschirm
let factory = MyScreenFactory {
    inventory: inventory.clone(),
};

// Öffne das Inventar eines Spieler
player.open_handled_screen(factory).await;

// Der Bildschirm wird folgendes automatisch verarbeiten:
// - Item-Bewegungen zwischen Slots
// - Schnellbewegungsfunktion
// - Spieler Inventar Interaktion
// - Bildschirm schließen
```

### Eigene Screen Handler erstellen

Du kannst benutzerdefinierte Bildschirmhandler erstellen, indem du das `ScreenHandler`-Trait implementierst. Das bietet mehr Flexibilität und ermöglicht es, Bildschirme für andere Zwecke als nur die Inventarverwaltung zu erstellen.

Um einen benutzerdefinierten Bildschirmhandler zu erstellen, kannst du eine neue Struktur anlegen, die das `Slot`-Trait implementiert. `NormalSlot` ist ein Slot, der mit Pumpkin mitgeliefert wird und lediglich als Index für ein Inventar dient und keine Einschränkungen hat.

TODO: Beispiel für einen benutzerdefinierten Slot

Hier ist ein Beispiel für den Quellcode des generischen Bildschirmhandlers:

```rust
use std::{any::Any, sync::Arc};


use pumpkin_data::screen::WindowType;
use pumpkin_world::{inventory::Inventory, item::ItemStack};

use pumpkin_world::{
    player::player_inventory::PlayerInventory,
    screen_handler::{InventoryPlayer, ScreenHandler, ScreenHandlerBehaviour},
    slot::NormalSlot,
};

pub fn create_generic_9x3(
    sync_id: u8,
    player_inventory: &Arc<PlayerInventory>,
    inventory: Arc<dyn Inventory>,
) -> GenericContainerScreenHandler {
    GenericContainerScreenHandler::new(
        WindowType::Generic9x3,
        sync_id,
        player_inventory,
        inventory,
        3,
    )
}

pub struct GenericContainerScreenHandler {
    pub inventory: Arc<dyn Inventory>,
    pub rows: u8,
    behaviour: ScreenHandlerBehaviour,
}

impl GenericContainerScreenHandler {
    fn new(
        screen_type: WindowType,
        sync_id: u8,
        player_inventory: &Arc<PlayerInventory>,
        inventory: Arc<dyn Inventory>,
        rows: u8,
    ) -> Self {
        let mut handler = Self {
            inventory,
            rows,
            behaviour: ScreenHandlerBehaviour::new(sync_id, Some(screen_type)),
        };

        handler.add_inventory_slots();
        let player_inventory: Arc<dyn Inventory> = player_inventory.clone();
        handler.add_player_slots(&player_inventory);

        handler
    }

    fn add_inventory_slots(&mut self) {
        for i in 0..self.rows {
            for j in 0..9 {
                self.add_slot(Arc::new(NormalSlot::new(
                    self.inventory.clone(),
                    (j + i * 9) as usize,
                )));
            }
        }
    }
}

impl ScreenHandler for GenericContainerScreenHandler {
    fn on_closed<'a>(&'a mut self, player: &'a dyn InventoryPlayer) -> ScreenHandlerFuture<'a, ()> {
        Box::pin(async move {
            self.default_on_closed(player).await;
            self.inventory.on_close().await;
        })
    }

    fn as_any(&self) -> &dyn Any {
        self
    }

    fn get_behaviour(&self) -> &ScreenHandlerBehaviour {
        &self.behaviour
    }

    fn get_behaviour_mut(&mut self) -> &mut ScreenHandlerBehaviour {
        &mut self.behaviour
    }

    fn quick_move<'a>(
        &'a mut self,
        _player: &'a dyn InventoryPlayer,
        slot_index: i32,
    ) -> ItemStackFuture<'a> {
        Box::pin(async move {
            let mut stack_left = ItemStack::EMPTY.clone();
            // Assuming bounds check passed for slot_index by caller or within quick_move spec
            let slot = self.get_behaviour().slots[slot_index as usize].clone();

            if slot.has_stack().await {
                let slot_stack_lock = slot.get_stack().await;
                let slot_stack_guard = slot_stack_lock.lock().await;
                stack_left = slot_stack_guard.clone();
                // Release the guard before calling insert_item which needs its own lock
                drop(slot_stack_guard);

                // Re-acquire lock for insert_item (which expects &mut ItemStack)
                let mut slot_stack_mut = slot_stack_lock.lock().await;

                if slot_index < (self.rows * 9) as i32 {
                    // Move from inventory to player area (end)
                    if !self
                        .insert_item(
                            &mut slot_stack_mut,
                            (self.rows * 9).into(),
                            self.get_behaviour().slots.len() as i32,
                            true,
                        )
                        .await
                    {
                        return ItemStack::EMPTY.clone();
                    }
                } else if !self
                    .insert_item(&mut slot_stack_mut, 0, (self.rows * 9).into(), false)
                    .await
                {
                    // Move from player area to inventory (start)
                    return ItemStack::EMPTY.clone();
                }

                // Check the resulting state of the slot stack after insert_item
                if slot_stack_mut.is_empty() {
                    drop(slot_stack_mut); // Release lock
                    slot.set_stack(ItemStack::EMPTY.clone()).await;
                } else {
                    drop(slot_stack_mut); // Release lock
                    slot.mark_dirty().await;
                }
            }

            stack_left
        })
    }
}
```

## Best Practices

1. **Thread-Sicherheit**
    - Implementiere eine korrekte Fehlerbehandlung für die Slot-Grenzenprüfung.
    - Denk daran, Stack-Sperren vor der Verwendung von `inventory.set_stack()` oder `slot.get_cloned_stack()` aufzuheben, um Deadlocks zu vermeiden.

2. **Inventarverwaltung**
    - Verwende die Konstante `ItemStack::EMPTY` zum Leeren von Slots oder zum Initialisieren leerer Inventare.

3. **Implementierung der Bildschirmbehandlung**
    - Behandel das Schließen des Inventars korrekt, um den Verlust von Gegenständen zu verhindern.
    - Stelle sicher, dass die Anzahl der Slots der Anzahl der Slots im jeweiligen Fenstertyp entspricht.

## Beispiele

### Grundlegende Inventarnutzung

```rust
// Erstellt ein neues Inventar
let inventory = BasicInventory {
    items: [(); 27].map(|_| Arc::new(Mutex::new(ItemStack::EMPTY))),
};

// Fügt ein Item dem Slot hinzu
inventory.set_stack(0, ItemStack::new(1, &Items::OAK_LOG)).await;

// Entfernt Items aus einem Slot
let removed = inventory.remove_stack(0).await;

// Prüft ob das Inventar leer ist
let is_empty = inventory.is_empty().await;
```
