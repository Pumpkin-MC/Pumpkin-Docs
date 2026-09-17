# Adding a Block Behavior

This guide walks through implementing interactive behavior for a block in Pumpkin.

---

## When Is a Behavior Needed?

- **Non-Interactive Blocks** (e.g., stone, dirt, terracotta): Do **not** require any custom Rust code. Their breaking speeds, hardness, and placement properties are automatically derived from `pumpkin-data`.
- **Interactive or Functional Blocks** (e.g., doors, chests, levers, crops, campfires, TNT): Require an implementation of the `BlockBehaviour` trait to respond to player clicks, redstone signals, physics steps, or timer ticks.

---

## Step 1: Create the Behavior Struct

Create a new file under `crates/pumpkin/src/block/blocks/<category>/<block_name>.rs` (or directly in `crates/pumpkin/src/block/blocks/`).

Use the `#[pumpkin_block(...)]` macro to associate your behavior struct with one or more vanilla block identifiers:

```rust
use std::sync::Arc;
use pumpkin_data::Block;
use pumpkin_data::block_properties::{DoorLikeProperties, Facing};
use pumpkin_macros::pumpkin_block;
use pumpkin_util::math::position::BlockPos;
use crate::block::registry::BlockActionResult;
use crate::block::{
    BlockBehaviour, NormalUseArgs, OnNeighborUpdateArgs, PlacedArgs, UseWithItemArgs,
};
use crate::world::World;

/// Associates this behavior struct with one or multiple block IDs.
#[pumpkin_block([
    "minecraft:oak_door",
    "minecraft:iron_door",
    "minecraft:spruce_door",
    "minecraft:birch_door"
])]
pub struct DoorBlock;

impl BlockBehaviour for DoorBlock {
    fn normal_use(&self, args: NormalUseArgs<'_>) -> BlockActionResult {
        let state_id = args.world.get_block_state(args.location).await;

        // Iron doors require redstone power and cannot be opened manually by hand
        if args.block.id == pumpkin_data::Block::IRON_DOOR.id {
            return BlockActionResult::Pass;
        }

        // Toggle open state
        let is_open = DoorLikeProperties::open(state_id);
        let new_state = DoorLikeProperties::with_open(state_id, !is_open);
        args.world.set_block_state(args.location, new_state).await;

        BlockActionResult::Consume
    }

    fn on_neighbor_update(&self, args: OnNeighborUpdateArgs<'_>) {
        // Handle neighbor redstone signals or support block destruction
    }
}
```

---

## Step 2: `BlockBehaviour` Hook Reference

The `BlockBehaviour` trait exposes lifecycle hooks modeled on vanilla mechanics:

### Player & Item Interaction Hooks

| Hook | Signature | Description |
| :--- | :--- | :--- |
| `normal_use` | `(&self, args: NormalUseArgs<'_>) -> BlockActionResult` | Triggered when right-clicking the block with an empty hand. |
| `use_with_item` | `(&self, args: UseWithItemArgs<'_>) -> BlockActionResult` | Triggered when right-clicking the block while holding an item. |
| `get_screen_handler_factory` | `(&self, args: GetScreenHandlerFactoryArgs<'_>) -> Option<Box<dyn ScreenHandlerFactory>>` | Returns an inventory container factory to open a UI screen (e.g., Chests, Crafting Tables). |

### World Lifecycle & Physics Hooks

| Hook | Signature | Description |
| :--- | :--- | :--- |
| `placed` | `(&self, args: PlacedArgs<'_>)` | Triggered immediately after the block is placed in the world. |
| `broken` | `(&self, args: BrokenArgs<'_>)` | Triggered when broken by a player or game mechanics. |
| `on_entity_collision` | `(&self, args: OnEntityCollisionArgs<'_>)` | Triggered when an entity walks inside, steps on, or falls into the block. |
| `on_neighbor_update` | `(&self, args: OnNeighborUpdateArgs<'_>)` | Triggered when an adjacent block state updates or is destroyed. |
| `on_projectile_hit` | `(&self, args: OnProjectileHitArgs<'_>)` | Triggered when an arrow, snowball, or projectile strikes the block. |

### Redstone & Power Hooks

| Hook | Signature | Description |
| :--- | :--- | :--- |
| `emits_redstone_power` | `(&self, state_id: BlockStateId) -> bool` | Declares whether the block emits redstone power to neighbors. |
| `get_weak_redstone_power` | `(&self, ...) -> u8` | Returns emitted weak power level (0–15). |
| `get_strong_redstone_power` | `(&self, ...) -> u8` | Returns emitted strong direct power level (0–15). |

### Foliage & Bonemeal Hooks

| Hook | Signature | Description |
| :--- | :--- | :--- |
| `is_valid_bonemeal_target` | `(&self, args: BonemealArgs<'_>) -> bool` | Checks if bone meal can be applied (e.g., crop not fully grown). |
| `is_bonemeal_success` | `(&self, args: BonemealArgs<'_>) -> bool` | Evaluates random chance roll for bone meal success. |
| `perform_bonemeal` | `(&self, args: BonemealArgs<'_>)` | Advances growth stages or spawns adjacent flora. |

---

## Step 3: Modifying Block States

All block properties are strongly typed in `pumpkin_data::block_properties`:

```rust
use pumpkin_data::block_properties::{BedLikeProperties, Part};

// 1. Read typed properties from the numeric BlockStateId
let part = BedLikeProperties::part(state_id); // Part::Head or Part::Foot
let is_occupied = BedLikeProperties::occupied(state_id);

// 2. Generate a new BlockStateId with updated properties
let updated_state = BedLikeProperties::with_occupied(state_id, true);

// 3. Commit the updated state to the world
world.set_block_state(pos, updated_state).await;
```

---

## Step 4: Adding a Block Entity (Tile Entity)

If your block needs to store persistent custom state (inventories, custom text, timers):

1. Create a block entity struct in `crates/pumpkin/src/block/entities/`:
   ```rust
   use pumpkin_util::math::position::BlockPos;
   use crate::block::entities::BlockEntity;

   pub struct CustomBlockEntity {
       pub pos: BlockPos,
       pub custom_counter: u32,
   }

   impl BlockEntity for CustomBlockEntity {
       fn to_nbt(&self) -> pumpkin_nbt::compound::NbtCompound {
           let mut compound = pumpkin_nbt::compound::NbtCompound::new();
           compound.put_int("Counter", self.custom_counter as i32);
           compound
       }

       fn from_nbt(&mut self, tag: &pumpkin_nbt::compound::NbtCompound) {
           if let Some(val) = tag.get_int("Counter") {
               self.custom_counter = val as u32;
           }
       }

       fn tick(&mut self, world: &std::sync::Arc<crate::world::World>, pos: &BlockPos) {
           // Periodic logic per game tick
       }
   }
   ```

2. Link the block entity in your `BlockBehaviour`:
   ```rust
   impl BlockBehaviour for CustomBlock {
       fn create_block_entity(&self, pos: BlockPos) -> Option<Arc<Mutex<dyn BlockEntity>>> {
           Some(Arc::new(Mutex::new(CustomBlockEntity::new(pos))))
       }
   }
   ```

---

## Step 5: Registering the Block

1. Export your module in `crates/pumpkin/src/block/blocks/mod.rs`:
   ```rust
   pub mod doors;
   ```

2. Register the behavior struct in `crates/pumpkin/src/block/registry.rs`:
   ```rust
   manager.register(DoorBlock);
   ```

At startup, `manager.register` automatically reads the block IDs declared in `#[pumpkin_block(...)]` and routes interactions to your implementation.
