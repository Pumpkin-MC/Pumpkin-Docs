# Networking & Protocol

Pumpkin includes a high-performance network stack supporting both **Minecraft: Java Edition** and **Minecraft: Bedrock Edition**.

Most protocol definitions, codecs, and serialization logic reside in the [`pumpkin-protocol`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-protocol) crate, while connection handling and gameplay packet dispatching reside in the [`pumpkin`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/net) crate.

> [!NOTE]
> Detailed guides are available in the dedicated subcategories:
> - **[Networking Introduction](/developer/networking/)**
> - **Java Edition**: **[Architecture](/developer/networking/java/overview)**, **[Adding a Java Packet](/developer/networking/java/adding-packets)**, and **[Authentication](/developer/networking/java/authentication)**
> - **Bedrock Edition**: **[Architecture](/developer/networking/bedrock/overview)** and **[Adding a Bedrock Packet](/developer/networking/bedrock/adding-packets)**

---

## Direction & Protocol Terminology

- **Serverbound (Client → Server)**: Packets sent by the game client and received by Pumpkin. Prefixed with `S` (e.g., `SChatMessage`, `SPlayerPosition`).
- **Clientbound (Server → Client)**: Packets sent by Pumpkin to the game client. Prefixed with `C` (e.g., `CPlayDisconnect`, `CBlockUpdate`).

---

## Protocol States

The Minecraft Java protocol operates as a finite state machine with five distinct states:

1. **Handshake**: The initial packet sent when a client connects. It specifies the protocol version, server address, and the target next state (`Status`, `Login`, or `Transfer`).
2. **Status**: Lightweight query state used for the multiplayer server list (MOTD, online player count, latency ping).
3. **Login**: Authenticates the player (via Mojang Yggdrasil or offline mode), sets up encryption (AES-128/CFB8), and activates packet compression if enabled.
4. **Config**: Introduced in modern Minecraft versions to configure client settings, negotiation of features, resource packs, and server links prior to gameplay.
5. **Play**: The primary gameplay state where entities, world chunks, inventory interactions, chat, and movement are processed.

---

## Defining Packets in `pumpkin-protocol`

Packets in `pumpkin-protocol` are organized by edition (`java`, `bedrock`), direction (`client`, `server`), and state (`handshake`, `status`, `login`, `config`, `play`).

### 1. Clientbound Packets (`ClientPacket`)

To create a clientbound packet:

1. Retrieve the packet ID constant from `pumpkin-data`.
2. Annotate the struct with `#[java_packet(PACKET_CONSTANT)]`.
3. Implement `ClientPacket`, writing the packet fields into the byte stream using `NetworkWriteExt`.

```rust
use std::io::Write;
use pumpkin_data::packet::clientbound::play::DISCONNECT;
use pumpkin_macros::java_packet;
use pumpkin_protocol::ClientPacket;
use pumpkin_protocol::ser::{NetworkWriteExt, WritingError};
use pumpkin_util::text::TextComponent;
use pumpkin_util::version::JavaMinecraftVersion;

/// Disconnects the player while in the Play state.
#[java_packet(DISCONNECT)]
pub struct CPlayDisconnect<'a> {
    pub reason: &'a TextComponent,
}

impl<'a> CPlayDisconnect<'a> {
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
        // Write the text component formatted for the target client version
        write.write_component(self.reason, version)
    }
}
```

### 2. Serverbound Packets (`ServerPacket`)

To create a serverbound packet:

1. Retrieve the packet ID constant from `pumpkin-data`.
2. Annotate the struct with `#[java_packet(PACKET_CONSTANT)]`.
3. Implement `ServerPacket<'a>`, reading fields from the incoming byte slice with `NetworkReadExt`.

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

### Useful Serialization Helpers (`NetworkWriteExt` & `NetworkReadExt`)

Pumpkin provides extension traits on byte streams for standard Minecraft primitives:

- `write_var_int(i32)` / `get_var_int()`: Variable-length 32-bit integers.
- `write_var_long(i64)` / `get_var_long()`: Variable-length 64-bit integers.
- `write_string(&str)` / `get_string()`: UTF-8 string prefixed with a VarInt length.
- `write_uuid(&Uuid)` / `get_uuid()`: 128-bit player or entity UUID.
- `write_component(&TextComponent)`: Serializes formatted chat/UI text.
- `write_nbt(&NBTTag)` / `get_nbt()`: Serializes/deserializes binary NBT tags.

---

## Packet Flow & Handling in `pumpkin`

Incoming packets pass through several stages before modifying game state:

1. **Frame Decoding**: The Tokio TCP stream decodes the VarInt length prefix and decrypts the frame if encryption is enabled.
2. **Event Interception**: Emits `PacketReceivedEvent` to registered plugins. If cancelled, the packet is immediately dropped.
3. **Version-Aware Dispatch**: Maps the wire packet ID according to the client's negotiated protocol version.
4. **State Handling**: Routes the parsed packet struct to its corresponding handler (e.g., `handle_play_packet`).
5. **State Mutation**: Mutates player session, world chunks, or entity states.

### 1. `Client` vs `Player`

Pumpkin maintains a strict distinction between pre-play connections and active players:

- **`Client`**: Represents a connection in `Handshake`, `Status`, `Login`, or `Config` state. Lightweight, not linked to a world, and has no physical entity. Handled in `crates/pumpkin/src/net/java/mod.rs`.
- **`Player`**: Represents a living entity in an active `World` during the `Play` state. Holds inventory, health, velocity, and chunk subscription queues. Handled in `crates/pumpkin/src/entity/player/`.

### 2. Packet Dispatching (`handle_play_packet`)

Inside `crates/pumpkin/src/net/java/mod.rs`, packets are dispatched by matching against their version-specific packet IDs:

```rust
pub fn handle_play_packet(
    &self,
    player: &Arc<Player>,
    server: &Arc<Server>,
    packet: &RawPacket,
) -> Result<(), Box<dyn PumpkinError>> {
    let version = self.version.load();

    // Fire plugin event to allow plugins to observe or cancel packets
    let mut event = PacketReceivedEvent::new(player.clone(), packet.id, packet.payload.clone());
    server.plugin_manager.fire_blocking(server, &mut event);
    if event.cancelled {
        return Ok(());
    }

    let mut payload = &event.payload[..];
    match event.packet_id {
        id if id == SConfirmTeleport::to_id(version) => {
            self.handle_confirm_teleport(player, &SConfirmTeleport::read(&mut payload, &version)?);
        }
        id if id == SChatCommand::to_id(version) => {
            let packet = SChatCommand::read(&mut payload, &version)?;
            self.handle_chat_command(player, server, &packet);
        }
        id if id == SPlayerPosition::to_id(version) => {
            let packet = SPlayerPosition::read(&mut payload, &version)?;
            self.handle_player_position(player, &packet);
        }
        _ => {
            trace!("Unhandled play packet id: {:#04x}", event.packet_id);
        }
    }
    Ok(())
}
```

### 3. Sending Packets

To send a packet to a client:

```rust
// Directly send to a single player
player.client.send_packet(&CPlayDisconnect::new(&reason));

// Broadcast to nearby players in the world
world.broadcast_packet_except(
    &[player.gameprofile.id],
    &CBlockUpdate::new(block_pos, block_id),
).await;
```

---

## Compression & Encryption

- **Compression**: Once a client passes the Login state, if `compression_threshold` is enabled in `pumpkin.toml`, packets exceeding the threshold size are compressed using ZLib/fast compression.
- **Encryption**: In online mode, 128-bit AES/CFB8 encryption is activated immediately after shared secret exchange in the Login state.
