# Java Edition Networking Overview

The Java Edition network stack handles standard Minecraft PC clients connecting over TCP. Wire-level structures and serialization logic reside in `pumpkin-protocol::java`, while connection management and gameplay packet handlers reside in `pumpkin::net::java`.

---

## The Five Protocol States

The Minecraft Java protocol operates as an explicit finite state machine. Every connection begins in the `Handshake` state and transitions according to client requests and server responses:

| State | Transition Trigger | Purpose & Next State |
| :--- | :--- | :--- |
| **Handshake** | Client initiates connection | Inspects protocol version and transitions to `Status`, `Login`, or `Transfer` |
| **Status** | `NextState = 1` | Streams MOTD, active player counts, favicon, and ping response |
| **Login** | `NextState = 2` | Authenticates account (Yggdrasil), negotiates encryption (AES-128), transitions to `Config` |
| **Transfer** | `NextState = 3` | Modern proxy / server-transfer negotiation |
| **Config** | Authentication success | Exchanges dynamic registries, data tags, feature flags, and resource packs |
| **Play** | Configuration acknowledged | Primary bidirectional gameplay loop (chunks, movement, combat, chat) |

1. **Handshake (`0x00`)**: Always the first packet sent by the client. It declares the client's protocol version, server address, port, and desired next state (`Status`, `Login`, or `Transfer`).
2. **Status**: Lightweight query state. The client requests a server list ping, and Pumpkin responds with the server version, player counts, favicon, and MOTD.
3. **Login**: Authenticates the player. If `online_mode` is enabled, Pumpkin performs an encryption handshake (AES-128/CFB8) and verifies the player's account with Mojang's Yggdrasil session servers.
4. **Config**: Introduced in modern Minecraft (1.20.2+). The server sends feature flags, known registries, resource packs, and custom server links before the player joins the physical world.
5. **Play**: The primary gameplay state. Used for all in-game actions including block breaking, entity movement, combat, chat, and chunk streaming.

---

## Connection Representation: `JavaClient` vs. `Player`

To keep memory usage minimal and prevent unnecessary allocations, Pumpkin cleanly separates pre-play connections from active players:

### `JavaClient`
- **Scope**: Exists across `Handshake`, `Status`, `Login`, and `Config` states.
- **Location**: `crates/pumpkin/src/net/java/mod.rs`.
- **Characteristics**:
  - Contains connection metadata: client protocol version, remote address, encryption/compression state.
  - Has no world coordinates, no physics, no inventory, and no living entity.
  - Very low memory footprint.

### `Player`
- **Scope**: Exists solely during the `Play` state.
- **Location**: `crates/pumpkin/src/entity/player/`.
- **Characteristics**:
  - Implements `EntityBase`, representing a living entity inside a `World` and `Level`.
  - Holds inventory screens, health, hunger, velocities, and chunk view subscription queues.
  - Contains an `Arc<JavaClient>` reference for network transmission.

---

## Multi-Version Support (`JavaMinecraftVersion`)

Pumpkin supports multiple Minecraft client versions. Protocol differences are handled cleanly via `pumpkin_util::version::JavaMinecraftVersion`:

- Packet IDs may differ across Minecraft versions. The `#[java_packet(ID)]` macro works with `pumpkin-data` to resolve the correct ID for the target version.
- When reading or writing packets, methods accept a `&JavaMinecraftVersion` reference to conditionally include or omit fields that changed in specific Minecraft updates.

```rust
if *version <= JavaMinecraftVersion::V_1_7_6 {
    // Read legacy stance coordinate present in early Minecraft versions
    let _stance = bytebuf.get_f64_be()?;
}
```

---

## The Packet Pipeline

Incoming Java packets pass through a structured pipeline:

1. **Length Framing**: `tokio_util::codec` decodes VarInt frame lengths.
2. **Decompression & Decryption**: If enabled, the raw buffer is decrypted via AES/CFB8 and decompressed via ZLib.
3. **Plugin Event Interception**: A `PacketReceivedEvent` is dispatched to the plugin manager. Plugins can inspect or cancel the packet before server processing.
4. **ID Dispatching**: The packet ID is matched against version-specific constants in `crates/pumpkin/src/net/java/mod.rs` (or the respective state module).
5. **Handling**: The packet struct is deserialized and processed by state-specific handler functions.
