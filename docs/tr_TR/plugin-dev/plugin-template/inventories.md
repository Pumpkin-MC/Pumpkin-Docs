# Özel bir envanteri açma

## Genel Bakış

Pumpkin'deki envanter sistemi, öğe depolama ve yönetimi için esnek bir yol sunar. Bu rehber, özel envanterlerin nasıl oluşturulacağını ve uygulanacağını açıklar.

## İçindekiler

- [Özel bir envanteri açma](#özel-bir-envanteri-açma)
  - [Genel Bakış](#genel-bakış)
  - [İçindekiler](#içindekiler)
  - [Temel Envanter Uygulaması](#temel-envanter-uygulaması)
  - [Gerekli Trait'ler](#gerekli-traitler)
    - [Inventory Trait](#inventory-trait)
    - [Clearable Trait](#clearable-trait)
  - [Screen Handler'lar](#screen-handlerlar)
    - [Genel Screen Handler'ları Kullanma](#genel-screen-handlerları-kullanma)
    - [Özel Screen Handler'lar Oluşturma](#özel-screen-handlerlar-oluşturma)
  - [En İyi Uygulamalar](#en-iyi-uygulamalar)
  - [Örnekler](#örnekler)
    - [Temel Envanter Kullanımı](#temel-envanter-kullanımı)

## Temel Envanter Uygulaması

`BasicInventory` struct'ı, 27 slotlu standard bir envanter uygulaması sunar. İşte kendi envanterinizi nasıl uygulayacağınız:

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

## Gerekli Trait'ler

### Inventory Trait

`Inventory` trait'i, tüm envanterlerin uygulaması gereken temel işlevselliği tanımlar:

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

`Clearable` trait'i, bir envanteri boşaltmak için işlevsellik sağlar. Bu, `Inventory` trait'i için uygulanması gerekir:

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

## Screen Handler'lar

Screen handler'lar, envanterler için kullanıcı arayüzünü oluşturmak ve yönetmek için kullanılır. Öğelerin slotlar arasında nasıl taşınacağını ve envanterin oyuncunun envanteriyle nasıl etkileşime gireceğini tanımlarlar.

### Genel Screen Handler'ları Kullanma

Pumpkin, yaygın envanter düzenleri için genel bir screen handler sağlar. İşte nasıl kullanacağınız:

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

### Özel Screen Handler'lar Oluşturma

`ScreenHandler` trait'ini uygulayarak özel screen handler'lar oluşturabilirsiniz. Bu size daha fazla esneklik sağlar ve sadece envanter olmak dışında amaçlar için ekranlar oluşturmanıza olanak tanır.

Özel bir screen handler oluşturmak için, `Slot` trait'ini uygulayan yeni bir struct oluşturabilirsiniz. `NormalSlot`, Pumpkin ile gelen ve yalnızca bir envanterin indeksine karşılık gelen, kısıtlaması olmayan bir slottur.

TODO: Özel slot örneği

Genel screen handler'ın kaynak kodundan bir örnek:

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

## En İyi Uygulamalar

1. **İş Parçacığı Güvenliği**
   - Slot sınırı kontrolü için doğru hata yönetimi uygulayın
   - Deadlock'ları önlemek için `inventory.set_stack()` veya `slot.get_cloned_stack()` kullanmadan önce stack kilitlerini bırakmayı unutmayın

2. **Envanter Yönetimi**
   - Slotları temizlemek veya boş envanterleri başlatmak için `ItemStack::EMPTY` sabitini kullanın

3. **Screen Handler Uygulaması**
   - Eşya kaybını önlemek için envanter kapanışını doğru şekilde yönetin
   - Slot sayısının o pencere türündeki slot sayısıyla uyuştuğundan emin olun

## Örnekler

### Temel Envanter Kullanımı

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
