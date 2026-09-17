# Entity Architecture & Hierarchy

Entities in Minecraft represent all dynamic, living and non-living objects that exist within a world—ranging from dropped item stacks and arrows to zombies, villagers, and players.

In Pumpkin, entity systems are implemented in [`crates/pumpkin/src/entity/`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/entity). The architecture leverages object-oriented trait composition on top of concurrency-safe, cache-friendly data structures.

---

## Entity Trait Hierarchy

Pumpkin structures entities into an inheritance hierarchy using Rust traits:

| Trait / Type | Parent Trait | Core Capabilities & State |
| :--- | :--- | :--- |
| `Entity` | *(None / Base Struct)* | Entity ID, UUID, atomic position and velocity vectors, bounding box, pose |
| `EntityBase` | *(Root Trait)* | Dynamic runtime downcasting (`get_living_entity`, etc.), world tick, damage, teleportation |
| `LivingEntity` | `EntityBase` | Health, absorption, potion effects, equipment slots, attribute containers |
| `Mob` | `LivingEntity` | AI goal selector, navigation, pathfinding, target tracking, death loot |
| `Player` | `LivingEntity` | Network client session, inventory, crafting screens, hunger, advancements |

### 1. `Entity` (Base Struct)
Contains fundamental physics, geometry, and spatial state common to all entities:
- **`entity_id`**: Fast 32-bit unique integer identifier used across network packets.
- **`uuid`**: 128-bit persistent UUID.
- **`position` & `velocity`**: Thread-safe vectors (`AtomicCell<Vector3<f64>>`) allowing concurrent reading without lock contention.
- **`bounding_box`**: 3D axis-aligned bounding box (AABB) used for collision resolution and raycast targeting.
- **`pose`**: Current pose (`Standing`, `Crouching`, `Sleeping`, `FallFlying`, etc.).

### 2. `EntityBase` (Foundation Trait)
The root dynamic trait implemented by every entity in the server:
- Supports safe runtime downcasting via helper methods (`get_living_entity()`, `get_mob()`, `get_player()`).
- Provides hooks for world interaction: `tick()`, `damage()`, `teleport()`, `on_lightning_strike()`, `is_immune_to_explosion()`.

### 3. `LivingEntity` (Biological Trait)
Extends `EntityBase` for entities with health, combat, and animation states:
- Manages health bars, absorption, invulnerability ticks, and fall damage.
- Tracks active potion effects (`crates/pumpkin/src/entity/effect/`).
- Handles equipment slots (`MainHand`, `OffHand`, `Helmet`, `Chestplate`, `Leggings`, `Boots`).
- Encapsulates attribute containers (max health, movement speed, knockback resistance).

### 4. `Mob` (AI Trait)
Extends `LivingEntity` for computer-controlled mobs:
- Manages AI goal selectors (attacking, wandering, fleeing, looking around).
- Controls navigation and pathfinding over blocks.
- Spawns configured loot tables upon death.

### 5. `Player` (Human Client)
Represents a human player connected through a game client:
- Links to network socket handlers (`JavaClient` or `BedrockClient`).
- Manages container screen handlers, ender chests, player inventory, and crafting.
- Tracks hunger, saturation, exhaustion, experience levels, and advancement criteria.

---

## Physics & Movement Simulation

On every server tick, Pumpkin simulates entity physics through a deterministic sequence:

1. **Apply Velocity & Gravity**: Evaluates current velocity and adds downward gravitational acceleration unless `has_gravity()` is false or the entity is flying.
2. **Resolve Block Collisions**: Checks the entity's 3D axis-aligned bounding box (`bounding_box`) against solid block voxels in the surrounding chunk; velocity along colliding axes is dampened or zeroed.
3. **Apply Fluid Drag & Buoyancy**: Evaluates whether the entity intersects water or lava fluids, applying drag coefficients and buoyant upward force.
4. **Synchronize & Broadcast**: Persists the updated coordinates in atomic position cells and broadcasts relative delta movement packets to observing players.
5. **Void Death**: Non-player entities falling below $Y = -128$ are automatically despawned.

---

## Combat & Damage System

Damage calculations reside in [`crates/pumpkin/src/entity/combat.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/entity/combat.rs):

1. **Damage Types**: Damage is categorized by `DamageType` (e.g., `GENERIC`, `PLAYER_ATTACK`, `FALL`, `FIRE`, `MAGIC`, `EXPLOSION`, `LIGHTNING_BOLT`).
2. **Damage Scaling**:
   - Armor defense points mitigate incoming physical damage according to the vanilla formula:
     $$\text{damage} = \text{damage} \times \left(1 - \frac{\min(20, \max(\text{armor} / 5, \text{armor} - \frac{\text{damage}}{2 + \text{toughness} / 4}))}{25}\right)$$
   - Resistance status effects and Protection enchantments apply secondary reductions.
3. **Knockback**: When damage is dealt, a directional impulse vector is added to the victim's velocity, modulated by their knockback resistance attribute.
4. **Hurt Animations**: Triggers hurt sounds and broadcasts red-tint flash metadata to all observers.
