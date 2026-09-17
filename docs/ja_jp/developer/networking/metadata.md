# Entity Metadata & Synced Data

Minecraft synchronizes persistent entity visual states, animation flags, poses, and properties via **Entity Metadata** (historically called *DataWatchers* in Java Edition and *Actor Data* in Bedrock Edition).

Instead of transmitting full state packets whenever an entity crouches, catches fire, or takes damage, the server broadcasts compact metadata updates to nearby observers.

---

## Edition Comparison

| Feature | Minecraft: Java Edition | Minecraft: Bedrock Edition |
| :--- | :--- | :--- |
| **Packet Name** | `CSetEntityMetadata` (`SET_ENTITY_DATA`) | `CSetActorData` (Packet ID `39`) |
| **Storage Structure** | `TrackedData` list terminating with `0xFF` | `SyncedActorDataList` (`HashMap<u32, MetadataValue>`) |
| **Key Type** | Index (`u8`) mapped to typed `MetaDataType` | Enum keys (`entity_data_key::*`) |
| **Flags** | Bitfield byte (fire, crouching, sprinting, glowing) | Bitfield int64 (`entity_data_flag::*`) |
| **Dynamic Properties** | N/A (baked into tracked indices) | `PropertySyncData` (client/server sync) |
| **Crate Location** | `crates/pumpkin-protocol/src/java/client/play/entity_metadata.rs` | `crates/pumpkin-protocol/src/bedrock/client/set_actor_data.rs` |

---

## 1. Java Edition: `CSetEntityMetadata`

In Java Edition, entity metadata consists of numbered index entries. Each entry defines an index, a `MetaDataType` ID, and the encoded value. The list terminates with a single `0xFF` byte.

### Key Index Hierarchy

Entity metadata follows an object-oriented inheritance model:

1. **Entity (Base)**:
   - `0`: State bitfield (flags: bit `0` = on fire, bit `1` = crouching, bit `3` = sprinting, bit `5` = invisible, bit `6` = glowing).
   - `1`: Air supply (`VarInt`).
   - `2`: Custom name (optional `TextComponent`).
   - `3`: Custom name visible (`bool`).
   - `4`: Silent (`bool`).
   - `5`: No gravity (`bool`).
   - `6`: Pose (`Standing`, `FallFlying`, `Sleeping`, `Swimming`, `SpinAttack`, `Crouching`, `Dying`).
2. **LivingEntity (extends Entity)**:
   - `8`: Hand states (using item, active hand).
   - `9`: Health (`f32`).
   - `10`: Potion effect ambient color.
3. **Player (extends LivingEntity)**:
   - Additional hearts, skin customization bitmask, main hand indicator.

### Sending Metadata Updates in Pumpkin

Pumpkin encodes entity metadata in `pumpkin-protocol`:

```rust
use pumpkin_protocol::VarInt;
use pumpkin_protocol::java::client::play::CSetEntityMetadata;

// Construct metadata update for entity with ID 42
let packet = CSetEntityMetadata::new(
    VarInt(entity.entity_id),
    serialized_metadata_bytes,
);

// Broadcast to chunk observers
world.broadcast_packet_all(&packet).await;
```

---

## 2. Bedrock Edition: `CSetActorData`

Bedrock Edition uses `CSetActorData` (`packet(39)`), storing properties in a dictionary mapping `u32` keys to strongly-typed `MetadataValue` variants.

### Key & Flag Constants

Bedrock exposes flags as a 64-bit integer bitfield under `entity_data_key::FLAGS`:

- `entity_data_flag::ON_FIRE` (`0`): Entity is burning.
- `entity_data_flag::SNEAKING` (`1`): Player is sneaking.
- `entity_data_flag::RIDING` (`2`): Entity is mounted on a vehicle.
- `entity_data_flag::SPRINTING` (`3`): Player is sprinting.
- `entity_data_flag::USING_ITEM` (`4`): Player is actively charging a bow, eating food, or using a shield.
- `entity_data_flag::INVISIBLE` (`5`): Entity is invisible.
- `entity_data_flag::GLOWING` (`26`): Entity has the glowing effect outline.

### Constructing and Updating Actor Data in Pumpkin

In `crates/pumpkin/src/entity/living.rs`:

```rust
use pumpkin_protocol::bedrock::client::set_actor_data::{
    CSetActorData, MetadataValue, PropertySyncData, SyncedActorDataList,
    entity_data_flag, entity_data_key,
};

let mut actor_data = SyncedActorDataList::new();

// Set entity flags (e.g. actively using an item)
let mut flags: i64 = 0;
if is_using_item {
    flags |= 1i64 << entity_data_flag::USING_ITEM;
}
actor_data.set(entity_data_key::FLAGS, MetadataValue::Int64(flags));

// Set air supply
actor_data.set(entity_data_key::AIR_SUPPLY, MetadataValue::Short(air as i16));

// Set custom name tag
actor_data.set(entity_data_key::NAME, MetadataValue::String(name));

let packet = CSetActorData {
    target_runtime_id: VarULong(entity_id),
    actor_data,
    synced_properties: PropertySyncData::default(),
    tick: VarULong(current_tick),
};

client.try_enqueue_client_packet(&packet);
```

---

## Multi-Version Compatibility

Because Mojang frequently shifts metadata indices between Minecraft releases, `pumpkin-protocol` leverages translation tables from `pumpkin-data`:

- For Java Edition, `pumpkin_data::meta_data_type::MetaDataType` remaps indices dynamically based on the client's `JavaMinecraftVersion`.
- For Bedrock Edition, `SyncedActorDataList` validates keys against the active Bedrock protocol version to prevent client crashes.
