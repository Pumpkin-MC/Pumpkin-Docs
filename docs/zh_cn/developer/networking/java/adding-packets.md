# Adding a Java Edition Packet

This guide walks you through implementing, serializing, dispatching, and sending a new Java Edition packet in Pumpkin.

---

## Naming Conventions

To keep packet definitions uniform across the codebase, follow these naming conventions:

- **Clientbound packets** (Server → Client) must start with **`C`** (e.g., `CBlockUpdate`, `CPlayDisconnect`).
- **Serverbound packets** (Client → Server) must start with **`S`** (e.g., `SChatCommand`, `SPlayerPosition`).
- If a packet exists in multiple states, prefix the state name before the packet action (e.g., `CLoginDisconnect`, `CConfigDisconnect`, and `CPlayDisconnect`).

---

## Step 1: Find the Packet ID in `pumpkin-data`

Packet IDs across all supported Minecraft versions are maintained in `pumpkin-data`. Import the corresponding constant:

```rust
// Clientbound Play state disconnect
use pumpkin_data::packet::clientbound::play::DISCONNECT;

// Serverbound Play state player position
use pumpkin_data::packet::serverbound::play::MOVE_PLAYER_POS;
```

---

## Step 2: Implementing a Clientbound Packet

Clientbound packets are sent from Pumpkin to the Minecraft client. They implement the `ClientPacket` trait from `pumpkin-protocol`.

### 1. Create the Struct File
Place the file in `crates/pumpkin-protocol/src/java/client/<state>/<packet_name>.rs` (e.g., `play/disconnect.rs`):

```rust
use std::io::Write;
use pumpkin_data::packet::clientbound::play::DISCONNECT;
use pumpkin_macros::java_packet;
use pumpkin_protocol::ClientPacket;
use pumpkin_protocol::ser::{NetworkWriteExt, WritingError};
use pumpkin_util::text::TextComponent;
use pumpkin_util::version::JavaMinecraftVersion;

/// Displays a disconnect screen with a message to the player in Play state.
#[java_packet(DISCONNECT)]
pub struct CPlayDisconnect<'a> {
    pub reason: &'a TextComponent,
}

impl<'a> CPlayDisconnect<'a> {
    #[must_use]
    pub const fn new(reason: &'a TextComponent) -> Self {
        Self { reason }
    }
}

impl ClientPacket for CPlayDisconnect<'_> {
    fn write_packet_data(
        &self,
        mut write: impl Write,
        version: &JavaMinecraftVersion,
    ) -> Result<(), WritingError> {
        // Use NetworkWriteExt methods to serialize fields
        write.write_component(self.reason, version)
    }
}
```

### 2. Export the Module
In `crates/pumpkin-protocol/src/java/client/<state>/mod.rs`:

```rust
mod disconnect;
pub use disconnect::*;
```

---

## Step 3: Implementing a Serverbound Packet

Serverbound packets are received by Pumpkin from the game client. They implement the `ServerPacket` trait from `pumpkin-protocol`.

### 1. Create the Struct File
Place the file in `crates/pumpkin-protocol/src/java/server/<state>/<packet_name>.rs` (e.g., `play/player_position.rs`):

```rust
use pumpkin_data::packet::serverbound::play::MOVE_PLAYER_POS;
use pumpkin_macros::java_packet;
use pumpkin_protocol::ServerPacket;
use pumpkin_protocol::ser::{NetworkReadExt, ReadingError};
use pumpkin_util::math::vector3::Vector3;
use pumpkin_util::version::JavaMinecraftVersion;

#[java_packet(MOVE_PLAYER_POS)]
pub struct SPlayerPosition {
    pub position: Vector3<f64>,
    pub collision: u8,
}

impl<'a> ServerPacket<'a> for SPlayerPosition {
    fn read(bytebuf: &mut &'a [u8], version: &JavaMinecraftVersion) -> Result<Self, ReadingError> {
        let x = bytebuf.get_f64_be()?;
        let y = bytebuf.get_f64_be()?;
        
        // Handle version-specific fields if necessary
        if *version <= JavaMinecraftVersion::V_1_7_6 {
            let _stance = bytebuf.get_f64_be()?;
        }
        
        let z = bytebuf.get_f64_be()?;
        let collision = bytebuf.get_u8()?;

        Ok(Self {
            position: Vector3::new(x, y, z),
            collision,
        })
    }
}
```

### 2. Export the Module
In `crates/pumpkin-protocol/src/java/server/<state>/mod.rs`:

```rust
mod player_position;
pub use player_position::*;
```

---

## Step 4: Network Codec Extension Helpers

`NetworkWriteExt` and `NetworkReadExt` provide helper methods for standard Minecraft types:

| Data Type | Reading Method | Writing Method |
| :--- | :--- | :--- |
| **`VarInt`** | `bytebuf.get_var_int()?` | `write.write_var_int(val)?` |
| **`VarLong`** | `bytebuf.get_var_long()?` | `write.write_var_long(val)?` |
| **`String`** | `bytebuf.get_string()?` | `write.write_string(val)?` |
| **`UUID`** | `bytebuf.get_uuid()?` | `write.write_uuid(&val)?` |
| **`TextComponent`** | `bytebuf.get_component()?` | `write.write_component(val, version)?` |
| **`Position`** | `bytebuf.get_block_pos()?` | `write.write_block_pos(val)?` |
| **`NBT`** | `bytebuf.get_nbt()?` | `write.write_nbt(&val)?` |

---

## Step 5: Handling Incoming Packets in `pumpkin`

Incoming serverbound packets must be handled in the appropriate state handler in `crates/pumpkin/src/net/java/`.

For packets in the **Play state**, open `crates/pumpkin/src/net/java/mod.rs` and update `handle_play_packet`:

```rust
// In crates/pumpkin/src/net/java/mod.rs
pub fn handle_play_packet(
    &self,
    player: &Arc<Player>,
    server: &Arc<Server>,
    packet: &RawPacket,
) -> Result<(), Box<dyn PumpkinError>> {
    let version = self.version.load();
    let mut payload = &packet.payload[..];

    match packet.id {
        // Match against version-specific packet ID
        id if id == SPlayerPosition::to_id(version) => {
            let packet = SPlayerPosition::read(&mut payload, &version)?;
            self.handle_player_position(player, &packet);
        }
        _ => {}
    }
    Ok(())
}
```

Then implement the handler function:

```rust
impl JavaClient {
    pub fn handle_player_position(&self, player: &Arc<Player>, packet: &SPlayerPosition) {
        // Validate coordinates, update player position, check collisions
        player.set_position(packet.position);
    }
}
```

---

## Step 6: Sending Outgoing Packets

To send a clientbound packet to a player:

```rust
// 1. Send directly to a player's connection
player.client.send_packet(&CPlayDisconnect::new(&reason));

// 2. Broadcast to all players watching a chunk
world.broadcast_packet_except(
    &[player.gameprofile.id],
    &CBlockUpdate::new(block_pos, block_id),
).await;
```
