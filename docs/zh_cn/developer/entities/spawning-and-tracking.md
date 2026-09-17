# Spawning & Network Tracking

To maintain high tick rates with hundreds of active entities, Pumpkin utilizes a chunk-based entity tracking and streaming system.

Entities are held in chunk-level collections inside [`crates/pumpkin-world`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-world) and synchronized across clients via edition-specific network packets.

---

## The Spawning Pipeline

Spawning an entity involves creating an instance, allocating its network IDs, registering it with the world, and broadcasting spawn packets to chunk observers:

1. **Construct Entity Instance**: Instantiate the specific entity struct (such as `ZombieEntity`, `ArrowEntity`, or `ItemEntity`) initialized with its starting world and spatial coordinates.
2. **Allocate Unique Network Identifiers**: Assign an atomic 32-bit `entity_id` for network protocol packets and a 128-bit persistent UUID.
3. **Register in World & Chunk Map**: Insert the entity into the world's entity storage and index it within its corresponding chunk coordinate entry.
4. **Query Chunk Observers**: Look up all connected players within tracking range whose view distance includes the containing chunk.
5. **Broadcast Edition-Specific Spawn Packets**: Transmit the relevant spawn and metadata packets tailored to each observing client's edition (Java or Bedrock).

### Spawning via the World API

```rust
use std::sync::Arc;
use pumpkin_data::entity::EntityType;
use pumpkin_util::math::vector3::Vector3;
use crate::entity::Entity;
use crate::entity::mob::zombie::ZombieEntity;

// 1. Create base entity with target world and position
let position = Vector3::new(100.5, 64.0, -200.5);
let base_entity = Entity::new(world.clone(), position, &EntityType::ZOMBIE);

// 2. Wrap in specific entity implementation
let zombie = Arc::new(ZombieEntity::new(base_entity));

// 3. Register into the world
world.spawn_entity(zombie);
```

---

## Network Packet Synchronization

When a player enters a chunk containing entities—or when an entity moves into an observed chunk—Pumpkin dispatches spawn packets tailored to the client's edition:

### Java Edition Spawning
1. **`CSpawnEntity`**: Declares the entity ID, UUID, entity type, position, and initial pitch/yaw.
2. **`CSetEntityMetadata`**: Sends initial visual states (custom name tags, burning flags, baby/adult state).
3. **`CEntityVelocity`**: Synchronizes initial momentum.
4. **`CUpdateEntityRot` & `CHeadRot`**: Synchronizes head orientation independently from body yaw.

### Bedrock Edition Spawning
1. **`CAddActor`**: Declares the runtime ID, actor type identifier, position, rotation, and embedded `SyncedActorDataList`.
2. **`CSetActorMotion`**: Sets initial velocity vector.

---

## Movement & Position Synchronization

Transmitting absolute 64-bit coordinates every tick would congest network bandwidth. Instead, Pumpkin dynamically switches between compact relative delta updates and authoritative full synchronization based on movement distance:

| Metric / Scenario | Threshold | Java Protocol Packet | Bedrock Protocol Packet | Bandwidth Impact |
| :--- | :--- | :--- | :--- | :--- |
| **Incremental Movement** | $\Delta < 8$ blocks per tick | `CUpdateEntityPos` / `CUpdateEntityPosRot` | `CMoveActorDelta` | Minimal (fixed-point byte deltas) |
| **Teleport / Long Distance** | $\Delta \ge 8$ blocks or chunk warp | `CTeleportEntity` / `CEntityPositionSync` | `CMoveActorAbsolute` | Full 64-bit float coordinate payload |
| **Rotation Only** | Position unchanged | `CUpdateEntityRot` & `CHeadRot` | `CMoveActorDelta` (rot flags only) | Minimal (byte angles) |

### 1. Relative Delta Movement
If the entity moved less than 8 blocks in a single tick, Pumpkin sends delta packets using fixed-point encoded increments:
- **Java**: `CUpdateEntityPos` (XYZ delta), `CUpdateEntityRot` (yaw/pitch delta), or `CUpdateEntityPosRot` (both).
- **Bedrock**: `CMoveActorDelta` with bitflags indicating which coordinates changed (`MOVE_ACTOR_DELTA_FLAG_HAS_X`, `HAS_Y`, `HAS_Z`).

### 2. Full Position Synchronization
When an entity teleports, crosses chunk boundaries, or accumulates floating-point drift:
- **Java**: Sends `CEntityPositionSync` containing absolute coordinates, velocities, and on-ground flags.
- **Bedrock**: Sends `CMoveActorAbsolute`.

---

## Passenger & Vehicle Mounting

When an entity mounts another entity (e.g., a player mounting a horse, boat, or minecart):

- **Java Edition**: Sends `CSetPassengers` containing the vehicle's `VarInt` entity ID and an array of passenger entity IDs.
- **Bedrock Edition**: Sends `CSetActorLink` defining the rider and vehicle runtime IDs and link type (`Rider`, `Passenger`).

---

## Despawning & Entity Removal

When an entity dies, is removed from the world, or steps out of a player's tracking radius:

- **Java Edition**: Sends `CRemoveEntities` with an array of entity IDs.
- **Bedrock Edition**: Sends `CRemoveActor` with the entity's runtime ID.

The client immediately frees its local rendering and audio memory for the removed entity.
