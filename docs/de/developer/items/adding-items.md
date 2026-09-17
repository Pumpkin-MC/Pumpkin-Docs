# Adding an Item Behavior

This guide details how to implement custom interactive mechanics for an item in Pumpkin.

---

## When Is an Item Behavior Needed?

- **Passive Items** (e.g., diamonds, gold ingots, sticks): Do **not** require custom Rust code. Their stack sizes, tool categories, and crafting recipes are handled automatically by `pumpkin-data` and `pumpkin-inventory`.
- **Interactive Items** (e.g., snowballs, ender pearls, hoes, bows, potions): Require an implementation of `ItemBehaviour` to handle right-click events, cooldowns, animations, and entity spawns.

---

## Step 1: Define the Item Struct & Metadata

Create a new file under `crates/pumpkin/src/item/items/<item_name>.rs` (e.g., `items/snowball.rs`):

```rust
use std::sync::Arc;
use pumpkin_data::entity::EntityType;
use pumpkin_data::item::Item;
use pumpkin_data::sound::{Sound, SoundCategory};
use crate::entity::Entity;
use crate::entity::player::Player;
use crate::entity::projectile::snowball::SnowballEntity;
use crate::item::{ItemBehaviour, ItemMetadata};

pub struct SnowBallItem;

// 1. Declare the associated numeric Item ID(s)
impl ItemMetadata for SnowBallItem {
    fn ids() -> Box<[u16]> {
        [Item::SNOWBALL.id].into()
    }
}

// 2. Implement the interaction behavior
impl ItemBehaviour for SnowBallItem {
    fn normal_use(&self, _item: &Item, player: &Player) {
        let position = player.position();
        let world = player.world();

        // Play throw sound effect
        world.play_sound(
            Sound::EntitySnowballThrow,
            SoundCategory::Neutral,
            &position,
        );

        // Construct and launch the projectile entity
        let entity = Entity::new(world.clone(), position, &EntityType::SNOWBALL);
        let snowball = SnowballEntity::new_shot(entity, player.get_entity());
        let (yaw, pitch) = player.rotation();
        snowball.thrown.set_velocity_from(pitch, yaw, 0.0, 1.5, 1.0);
        world.spawn_entity(Arc::new(snowball));

        // Safely decrement held item unless in Creative mode
        let mut held = player.inventory.held_item();
        held.decrement_unless_creative(player.gamemode.load(), 1);
        player.inventory.set_held_item(held);
    }
}
```

---

## Step 2: `ItemBehaviour` Hook Reference

The `ItemBehaviour` trait provides comprehensive hooks for different interaction models:

### Instant Single-Use Hooks

| Hook | Signature | Description |
| :--- | :--- | :--- |
| `normal_use` | `(&self, item: &Item, player: &Player)` | Triggered on right-clicking into open air. |
| `normal_use_with_rotation` | `(&self, item: &Item, player: &Player, yaw: f32, pitch: f32)` | Provides client-reported view angles for precise raycasting and aiming. |
| `use_on_block` | `(&self, item: &mut ItemStack, player: &Player, location: BlockPos, face: BlockDirection, cursor_pos: Vector3<f32>, block: &Block, server: &Server) -> BlockActionResult` | Triggered when right-clicking a block face (e.g., stripping logs with an axe, tilling farmland with a hoe). |
| `use_on_entity` | `(&self, item: &mut ItemStack, player: &Player, entity: Arc<dyn EntityBase>)` | Triggered when right-clicking another living entity (e.g., shearing sheep, nametags). |

### Channeled & Timed Hooks

| Hook | Signature | Description |
| :--- | :--- | :--- |
| `get_use_duration` | `(&self) -> i32` | Duration in game ticks required to complete the action (e.g., `32` ticks for food, `72000` ticks for bows). |
| `on_use_tick` | `(&self, stack: &ItemStack, player: &Player, remaining_use_ticks: i32)` | Executed on each tick while right-click is held. |
| `on_stopped_using` | `(&self, stack: &ItemStack, player: &Player)` | Triggered when the player releases right-click (e.g., firing a charged bow). |

---

## Step 3: Durability & Cooldowns

### Decrementing Stacks Safely
Always use `decrement_unless_creative` to ensure survival players consume items while creative players retain them:

```rust
item_stack.decrement_unless_creative(player.gamemode.load(), 1);
```

### Applying Cooldowns
To prevent action spamming (e.g., Ender Pearls, Chorus Fruit):

```rust
// Start a 20-tick (1-second) cooldown on Ender Pearls
player.start_cooldown(Item::ENDER_PEARL.registry_key.to_string(), 20);
```

---

## Step 4: Registering the Item

1. Export your module in `crates/pumpkin/src/item/items/mod.rs`:
   ```rust
   pub mod snowball;
   ```

2. Register the struct in `crates/pumpkin/src/item/registry.rs`:
   ```rust
   items.register(SnowBallItem);
   ```

When the server initializes, `items.register` maps the IDs declared in `ItemMetadata::ids()` to your behavior instance.
