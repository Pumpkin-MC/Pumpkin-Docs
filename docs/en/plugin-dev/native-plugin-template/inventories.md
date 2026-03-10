# Opening a custom inventory

## Overview

The inventory system in Pumpkin provides a flexible way to manage item storage and manipulation. This guide explains how to create and implement custom inventories.

## Table of Contents

- [Opening a custom inventory](#opening-a-custom-inventory)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Basic Inventory Implementation](#basic-inventory-implementation)
  - [Required Traits](#required-traits)
    - [Inventory Trait](#inventory-trait)
    - [Clearable Trait](#clearable-trait)
  - [Screen Handlers](#screen-handlers)
    - [Using Generic Screen Handlers](#using-generic-screen-handlers)
    - [Creating Custom Screen Handlers](#creating-custom-screen-handlers)
  - [Best Practices](#best-practices)
  - [Examples](#examples)
    - [Basic Inventory Usage](#basic-inventory-usage)

## Basic Inventory Implementation

The `BasicInventory` struct provides a standard implementation of an inventory with 27 slots. Here's how to implement your own inventory:

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

## Required Traits

### Inventory Trait

The `Inventory` trait defines the core functionality that all inventories must implement:

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

The `Clearable` trait provides functionality to empty an inventory. This is required to be implemented for the `Inventory` trait:

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

## Screen Handlers

Screen handlers are used to create and manage the user interface for inventories. They define how items can be moved between slots and how the inventory interacts with the player's inventory.

### Using Generic Screen Handlers

Pumpkin provides a generic screen handler for common inventory layouts. Here's how to use it:

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

// Create a screen factory
let factory = MyScreenFactory {
    inventory: inventory.clone(),
};

// Open the inventory for a player
player.open_handled_screen(factory).await;

// The screen will automatically handle:
// - Item movement between slots
// - Quick move functionality
// - Player inventory interaction
// - Screen closing
```

### Creating Custom Screen Handlers

You can create custom screen handlers by implementing the `ScreenHandler` trait. This gives you more flexibility and allows you to create screens for purposes other than just being an inventory.

To create a custom screen handler, you can make a new struct that implements the `Slot` trait. `NormalSlot` is a slot that comes with Pumpkin that just acts as an index into an inventory and has no restrictions.

TODO: Custom slot example

Here's an example of the source code for the generic screen handler:

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

1. **Thread Safety**
   - Implement proper error handling for slot bounds checking
   - Remember to drop stack locks before using `inventory.set_stack()` or `slot.get_cloned_stack()` to prevent deadlocks

2. **Inventory Management**
   - Use `ItemStack::EMPTY` constant for clearing slots or initializing empty inventories

3. **Screen Handler Implementation**
   - Handle inventory closing properly to prevent item loss
   - Make sure slots add up to the amount of slots in that window type

## Examples

### Basic Inventory Usage

```rust
// Create a new inventory
let inventory = BasicInventory {
    items: [(); 27].map(|_| Arc::new(Mutex::new(ItemStack::EMPTY))),
};

// Add items to a slot
inventory.set_stack(0, ItemStack::new(1, &Items::OAK_LOG)).await;

// Remove items from a slot
let removed = inventory.remove_stack(0).await;

// Check if inventory is empty
let is_empty = inventory.is_empty().await;
```
