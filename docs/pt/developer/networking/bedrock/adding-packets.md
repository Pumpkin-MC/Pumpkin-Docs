# Adding a Bedrock Edition Packet

This guide explains how to implement, encode, decode, and handle a new Minecraft: Bedrock Edition packet in Pumpkin.

---

## Naming Conventions

- **Clientbound packets** (Server → Client) must start with **`C`** (e.g., `CChunkRadiusUpdated`, `CContainerOpen`).
- **Serverbound packets** (Client → Server) must start with **`S`** (e.g., `SRequestChunkRadius`, `SPlayerAction`).

---

## Step 1: Identifying the Packet ID

In the Bedrock protocol, packet IDs are fixed integer constants assigned by Mojang. Verify the numeric ID from the official protocol documentation or network packet traces.

For example:
- `Disconnect` packet ID: `5`
- `RequestChunkRadius` packet ID: `69`

---

## Step 2: Implementing a Clientbound Packet

Clientbound packets implement the `PacketWrite` trait from `pumpkin-protocol::serial`.

### 1. Create the Packet File
Place the file in `crates/pumpkin-protocol/src/bedrock/client/<packet_name>.rs`:

```rust
use std::io::{Error, Write};
use pumpkin_macros::packet;
use crate::{codec::var_int::VarInt, serial::PacketWrite};

#[packet(5)]
pub struct CDisconnect {
    pub reason: VarInt,
    pub skip_message: bool,
    pub message: String,
    pub filtered_message: String,
}

impl CDisconnect {
    #[must_use]
    pub const fn new(reason: i32, message: String) -> Self {
        Self {
            reason: VarInt(reason),
            skip_message: message.is_empty(),
            message,
            filtered_message: String::new(),
        }
    }
}

impl PacketWrite for CDisconnect {
    fn write<W: Write>(&self, writer: &mut W) -> Result<(), Error> {
        self.reason.write(writer)?;
        self.skip_message.write(writer)?;
        if !self.skip_message {
            self.message.write(writer)?;
            self.filtered_message.write(writer)?;
        }
        Ok(())
    }
}
```

### 2. Export the Module
In `crates/pumpkin-protocol/src/bedrock/client/mod.rs`:

```rust
pub mod disconnect;
pub use disconnect::*;
```

---

## Step 3: Implementing a Serverbound Packet

Serverbound packets implement the `PacketRead` trait. Pumpkin provides a procedural derive macro `#[derive(PacketRead)]` for automatic deserialization when fields implement `PacketRead`.

### 1. Create the Packet File
Place the file in `crates/pumpkin-protocol/src/bedrock/server/<packet_name>.rs`:

```rust
use pumpkin_macros::packet;
use crate::{codec::var_int::VarInt, serial::PacketRead};

#[derive(PacketRead, Debug)]
#[packet(69)]
pub struct SRequestChunkRadius {
    pub chunk_radius: VarInt,
    pub max_chunk_radius: u8,
}
```

If a packet requires custom parsing logic, implement `PacketRead` manually:

```rust
use std::io::{Error, Read};
use crate::serial::PacketRead;

impl PacketRead for SMyCustomPacket {
    fn read<R: Read>(reader: &mut R) -> Result<Self, Error> {
        let chunk_radius = VarInt::read(reader)?;
        let max_chunk_radius = u8::read(reader)?;
        Ok(Self { chunk_radius, max_chunk_radius })
    }
}
```

### 2. Export the Module
In `crates/pumpkin-protocol/src/bedrock/server/mod.rs`:

```rust
pub mod request_chunk_radius;
pub use request_chunk_radius::*;
```

---

## Step 4: Dispatching Incoming Packets in `pumpkin`

Incoming packets are dispatched in `crates/pumpkin/src/net/bedrock/mod.rs`:

```rust
// Inside BedrockClient::handle_game_packet
match packet.id {
    SRequestChunkRadius::PACKET_ID => {
        let packet = SRequestChunkRadius::read(reader)?;
        self.handle_request_chunk_radius(player, &packet);
    }
    _ => {}
}
```

---

## Step 5: Implementing the Handler Function

Implement the handler logic in `crates/pumpkin/src/net/bedrock/play/<packet_name>.rs`:

```rust
use super::*;
use pumpkin_protocol::bedrock::server::request_chunk_radius::SRequestChunkRadius;

impl BedrockClient {
    pub fn handle_request_chunk_radius(&self, player: &Arc<Player>, packet: &SRequestChunkRadius) {
        let requested_radius = packet.chunk_radius.0;
        
        // Clamp view distance within server configuration limits
        let clamped = requested_radius.clamp(2, 16);

        // Notify client that view radius was accepted
        self.try_enqueue_client_packet(&CChunkRadiusUpdated {
            chunk_radius: VarInt(clamped),
        });
    }
}
```

Remember to register the new module in `crates/pumpkin/src/net/bedrock/play/mod.rs`:

```rust
pub mod request_chunk_radius;
```

---

## Step 6: Sending Outgoing Packets

To send a Bedrock packet to a connected client:

```rust
// Enqueues the packet into the client's outgoing batch queue
self.try_enqueue_client_packet(&CChunkRadiusUpdated {
    chunk_radius: VarInt(view_distance),
});
```

Batched packets are automatically compressed, framed with `0xfe`, and transmitted over the RakNet/NetherNet socket.
