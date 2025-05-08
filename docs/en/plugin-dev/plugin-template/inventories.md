# Opening a custom inventory

## Overview
The inventory system in Pumpkin provides a flexible way to manage item storage and manipulation. This guide explains how to create and implement custom inventories.

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

## Required Trait Implementations

### Inventory Trait

The `Inventory` trait defines the core functionality that all inventories must implement:

```rust
#[async_trait]
impl Inventory for BasicInventory {
    // Get the total number of slots in the inventory
    fn size(&self) -> usize {
        self.items.len()
    }

    // Check if the inventory is completely empty
    async fn is_empty(&self) -> bool {
        for slot in self.items.iter() {
            if !slot.lock().await.is_empty() {
                return false;
            }
        }
        true
    }

    // Get a reference to an item stack in a specific slot
    async fn get_stack(&self, slot: usize) -> Arc<Mutex<ItemStack>> {
        self.items[slot].clone()
    }

    // Remove and return the entire stack from a slot
    async fn remove_stack(&self, slot: usize) -> ItemStack {
        let mut removed = ItemStack::EMPTY;
        let mut guard = self.items[slot].lock().await;
        std::mem::swap(&mut removed, &mut *guard);
        removed
    }

    // Remove a specific amount of items from a stack
    async fn remove_stack_specific(&self, slot: usize, amount: u8) -> ItemStack {
        split_stack(&self.items, slot, amount).await
    }

    // Set the contents of a specific slot
    async fn set_stack(&self, slot: usize, stack: ItemStack) {
        *self.items[slot].lock().await = stack;
    }
}
```

### Clearable Trait

The `Clearable` trait provides functionality to empty an inventory, this is required to be implemented for Inventory to be implemented:

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

## Key Features

1. **Thread Safety**: All inventory operations are thread-safe using `Arc<Mutex<>>` for item stacks.
2. **Async Operations**: All inventory operations are asynchronous to prevent blocking.
3. **Stack Management**: Built-in support for splitting and managing item stacks.
4. **Empty State Handling**: Easy checking for empty inventories and slots.

## Best Practices

1. Always use the provided `split_stack` function for removing partial stacks to ensure proper item handling.
2. Implement proper error handling for slot bounds checking in your inventory implementation.
3. Always remember to drop a stack lock before using something like inventory.set_stack(), otherwise you will end up with a deadlock
4. Use the `ItemStack::EMPTY` constant for clearing slots or initializing empty inventories.

## Example Usage

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

## Screen Handlers

Screen handlers are used to create and manage the user interface for inventories. They define how items can be moved between slots and how the inventory interacts with the player's inventory.

### Using Generic Screen Handlers

Pumpkin provides a generic screen handler for common inventory layouts. Here's how to use it:

```rust
use pumpkin_inventory::generic_container_screen_handler::create_generic_9x3;
use pumpkin_inventory::player::player_inventory::PlayerInventory;
use pumpkin_inventory::screen_handler::{InventoryPlayer, ScreenHandler, ScreenHandlerFactory};

struct MyScreenFactory;

impl ScreenHandlerFactory for MyScreenFactory {
    fn create_screen_handler(
        &self,
        sync_id: u8,
        player_inventory: &Arc<PlayerInventory>,
        _player: &dyn InventoryPlayer,
        inventory: Option<Arc<dyn Inventory>>,
    ) -> Option<Arc<Mutex<dyn ScreenHandler>>> {
        if let Some(inventory) = inventory {
            Some(Arc::new(Mutex::new(create_generic_9x3(
                sync_id,
                player_inventory,
                inventory,
            ))))
        } else {
            None
        }
    }

    fn get_display_name(&self) -> TextComponent {
        TextComponent::text("container.barrel")
    }
}
```

To open the inventory screen for a player:

```rust
player.open_handled_screen(MyScreenFactory, Some(inventory)).await;
```

### Creating Custom Screen Handlers

You can create custom screen handlers by implementing the `ScreenHandler` trait.

Implementing a custom `ScreenHandler` gives you more flexability and gives you the ability to create screens for other purposes than just being a inventory. To do this you could make a new struct that implements the Slot trait, `NormalSlot` is a slot that comes with pumpkin that just acts as a index into a inventory and has no restrictions.

TODO: Custom slot example

Here's an example the source code of the generic screen handler.

```rust
use std::{any::Any, sync::Arc};

use async_trait::async_trait;
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

        //inventory.onOpen(player);
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

#[async_trait]
impl ScreenHandler for GenericContainerScreenHandler {
    async fn on_closed(&mut self, player: &dyn InventoryPlayer) {
        self.default_on_closed(player).await;
        //TODO: self.inventory.on_closed(player).await;
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

    async fn quick_move(&mut self, _player: &dyn InventoryPlayer, slot_index: i32) -> ItemStack {
        let mut stack_left = ItemStack::EMPTY;
        let slot = self.get_behaviour().slots[slot_index as usize].clone();

        if slot.has_stack().await {
            let slot_stack = slot.get_stack().await;
            stack_left = *slot_stack.lock().await;

            if slot_index < (self.rows * 9) as i32 {
                if !self
                    .insert_item(
                        &mut *slot_stack.lock().await,
                        (self.rows * 9).into(),
                        self.get_behaviour().slots.len() as i32,
                        true,
                    )
                    .await
                {
                    return ItemStack::EMPTY;
                }
            } else if !self
                .insert_item(
                    &mut *slot_stack.lock().await,
                    0,
                    (self.rows * 9).into(),
                    false,
                )
                .await
            {
                return ItemStack::EMPTY;
            }

            if stack_left.is_empty() {
                slot.set_stack(ItemStack::EMPTY).await;
            } else {
                slot.mark_dirty().await;
            }
        }

        return stack_left;
    }
}
```

### Key Components

1. **ScreenHandlerFactory**: Defines how to create screen handlers for your inventory
2. **ScreenHandler**: Implements the behavior of the inventory screen
3. **ScreenHandlerBehaviour**: Manages the state and slots of the screen, this is used internally to implement more defaults for the ScreenHandler trait
4. **WindowType**: Defines the type of window to display

You can only open inventories that are supported by the client, currently these are

```rust
pub enum WindowType {
    Generic9x1,
    Generic9x2,
    Generic9x3,
    Generic9x4,
    Generic9x5,
    Generic9x6,
    Generic3x3,
    Crafter3x3,
    Anvil,
    Beacon,
    BlastFurnace,
    BrewingStand,
    Crafting,
    Enchantment,
    Furnace,
    Grindstone,
    Hopper,
    Lectern,
    Loom,
    Merchant,
    ShulkerBox,
    Smithing,
    Smoker,
    CartographyTable,
    Stonecutter,
}
```

### Best Practices

1. Use the generic screen handlers when possible for standard inventory layouts
2. Implement proper error handling for slot operations
3. Consider the player's inventory when implementing quick move functionality
4. Handle inventory closing properly to prevent item loss
5. Use appropriate window types for different inventory sizes

### Example Usage

```rust
// Create a screen factory
let factory = MyScreenFactory;

// Open the inventory for a player
player.open_handled_screen(factory, Some(inventory)).await;

// The screen will automatically handle:
// - Item movement between slots
// - Quick move functionality
// - Player inventory interaction
// - Screen closing
```