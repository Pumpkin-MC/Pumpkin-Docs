# 自定义背包界面系统指南

## 概述
Pumpkin中的背包界面系统提供了一种灵活的方式来管理物品存储和操作。本指南将解释如何创建和实现自定义背包界面。

## 目录
- [打开自定义背包界面](#打开自定义背包界面)
  - [概述](#概述)
  - [目录](#目录)
  - [基础背包界面实现](#基础背包界面实现)
  - [需要的接口](#需要的接口)
    - [背包界面接口](#背包界面接口)
    - [可清空接口](#可清空接口)
  - [玩家界面接口](#玩家界面接口)
    - [使用通用玩家界面接口](#使用通用玩家界面接口)
    - [创建自定义玩家界面接口](#创建自定义玩家界面接口)
    - [支持的窗口类型](#支持的窗口类型)
  - [最佳实践](#最佳实践)
  - [示例](#示例)
    - [基础背包界面使用](#基础背包界面使用)

## 基础背包界面实现

`BasicInventory`结构体提供了一个标准实现，包含27个物品槽位。以下是实现自定义背包界面的方法：

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

## 需要的接口

### 背包界面接口

`Inventory`接口定义了所有背包界面必须实现的核心功能：

```rust
impl Inventory for BasicInventory {
    // 获取背包界面中的总槽位数
    fn size(&self) -> usize {
        self.items.len()
    }

    // 检查背包界面是否完全为空
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

    // 获取特定槽位中物品堆栈的引用
    fn get_stack(&self, slot: usize) -> InventoryFuture<'_, Arc<Mutex<ItemStack>>> {
        Box::pin(async move { self.items[slot].clone() })
    }

    // 移除并返回槽位中的整个物品堆栈
    fn remove_stack(&self, slot: usize) -> InventoryFuture<'_, ItemStack> {
        Box::pin(async move {
            let mut removed = ItemStack::EMPTY.clone();
            let mut guard = self.items[slot].lock().await;
            std::mem::swap(&mut removed, &mut *guard);
            removed
        })
    }

    // 从堆栈中移除特定数量的物品
    fn remove_stack_specific(&self, slot: usize, amount: u8) -> InventoryFuture<'_, ItemStack> {
        Box::pin(async move { split_stack(&self.items, slot, amount).await })
    }

    // 设置特定槽位的内容
    fn set_stack(&self, slot: usize, stack: ItemStack) -> InventoryFuture<'_, ()> {
        Box::pin(async move {
            *self.items[slot].lock().await = stack;
        })
    }
}
```

### 可清空接口

`Clearable`接口提供了清空背包界面的功能，这是实现`Inventory`接口所需要的：

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

## 玩家界面接口

玩家界面接口用于创建和管理背包界面的用户界面。它们定义了物品如何在槽位之间移动以及背包界面如何与玩家背包界面交互。

### 使用通用玩家界面接口

Pumpkin为常见的背包界面布局提供了通用玩家界面接口。以下是使用方法：

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

// 创建界面
let factory = MyScreenFactory {
    inventory: inventory.clone(),
};

// 为玩家打开背包界面
player.open_handled_screen(factory).await;

// 屏幕将自动处理：
// - 槽位间的物品移动
// - 快速移动功能
// - 玩家背包界面交互
// - 界面关闭
```

### 创建自定义玩家界面接口

您可以通过实现`ScreenHandler`接口来创建自定义玩家界面接口。这提供了更大的灵活性，并允许您创建不仅仅是背包界面的屏幕。

要创建自定义玩家界面接口，您可以创建一个实现`Slot`接口的新结构体。`NormalSlot`是Pumpkin提供的一个槽位，它只是作为背包界面的索引，没有任何限制。

TODO: 自定义槽位示例

以下是通用玩家界面接口的源代码示例：

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

## 最佳实践

1. **线程安全**
   - 为槽位边界检查实现适当的错误处理
   - 在使用`inventory.set_stack()`或`slot.get_cloned_stack()`之前记得释放堆栈锁，以防止死锁

2. **背包界面管理**
   - 使用`ItemStack::EMPTY`常量来清空槽位或初始化空背包界面

3. **玩家界面接口实现**
   - 正确处理背包界面关闭以防止物品丢失
   - 确保槽位数量与窗口类型中的槽位总数一致

## 示例

### 基础背包界面使用

```rust
// 创建新背包界面
let inventory = BasicInventory {
    items: [(); 27].map(|_| Arc::new(Mutex::new(ItemStack::EMPTY))),
};

// 向槽位添加物品
inventory.set_stack(0, ItemStack::new(1, &Items::OAK_LOG)).await;

// 从槽位移除物品
let removed = inventory.remove_stack(0).await;

// 检查背包界面是否为空
let is_empty = inventory.is_empty().await;
```
