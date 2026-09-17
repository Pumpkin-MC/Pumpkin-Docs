# Bedrock Edition Networking Overview

Pumpkin features native support for **Minecraft: Bedrock Edition** clients (iOS, Android, Windows, Xbox, PlayStation, Switch).

Bedrock protocol structures and wire codecs reside in `pumpkin-protocol::bedrock`, while connection management and gameplay handlers reside in `pumpkin::net::bedrock`.

---

## Transport Layers: RakNet & NetherNet

Unlike Java Edition, which communicates exclusively over TCP streams, Bedrock Edition operates over UDP using two primary transport layers:

1. **RakNet (Port 19132)**:
   - A reliable, sequenced UDP networking library originally developed by Jenkins Software.
   - Provides connection handshakes, packet acknowledgment (ACK/NACK), MTU negotiation, and packet splitting for payloads larger than the network MTU.
2. **NetherNet**:
   - Modern peer-to-peer and relayed transport protocol used by modern Bedrock versions.
   - Integrated in Pumpkin via `crates/pumpkin/src/net/bedrock/nethernet.rs`.

---

## Packet Framing & Batching (`0xfe`)

Bedrock does not send individual game packets over the network directly. Instead, multiple game packets are bundled into a single **batch packet**:

1. **Header Byte**: Every Bedrock game packet batch starts with `0xfe`.
2. **Compression**: The payload following `0xfe` is compressed using **Deflate** (or ZLib) above a negotiated threshold.
3. **Sub-packet Framing**: When decompressed, the batch contains one or more sequential game packets, each prefixed by its length encoded as a `VarUInt`.

In Pumpkin, batch decoding and assembly are managed by `BedrockBatchDecoder` and `BedrockBatchEncoder` in `crates/pumpkin-protocol/src/bedrock/`.

---

## Connection Lifecycle & State Progression

Bedrock does not have explicit protocol states like Java Edition. Instead, it follows a strict sequence of packets:

| Step | Packet Exchanged | Purpose |
| :--- | :--- | :--- |
| **1. Network Settings** | `SRequestNetworkSettings` -> `CNetworkSettings` | Negotiates compression algorithm (Deflate/Snappy) and payload threshold |
| **2. Authentication** | `SLogin` -> `CPlayStatus` | Transmits JWT identity chain and client hardware data; verifies Xbox Live tokens |
| **3. Resource Negotiation** | `CResourcePacksInfo` -> `SResourcePackClientResponse` | Negotiates server resource packs and download behavior |
| **4. World Initialization** | `CStartGame` + `CItemRegistry` + `CCreativeContent` | Streams world spawn position, dimension settings, runtime player entity ID, and item palettes |
| **5. Ready to Spawn** | `SSetLocalPlayerAsInitialized` -> `CPlayStatus` | Signals client loading completion and transitions to active in-game play |

---

## Packet Dispatching in `pumpkin`

Inside `crates/pumpkin/src/net/bedrock/mod.rs`, decompressed sub-packets are dispatched based on their numeric packet ID:

```rust
match packet.id {
    SPlayerAuthInput::PACKET_ID => {
        let packet = SPlayerAuthInput::read(reader)?;
        self.handle_player_auth_input(player, packet, server);
    }
    SRequestChunkRadius::PACKET_ID => {
        let packet = SRequestChunkRadius::read(reader)?;
        self.handle_request_chunk_radius(player, &packet);
    }
    SInventoryTransaction::PACKET_ID => {
        let packet = SInventoryTransaction::read(reader)?;
        self.handle_inventory_action(player, packet);
    }
    _ => {
        trace!("Unhandled Bedrock packet ID: {}", packet.id);
    }
}
```

---

## Authentication & NetherNet

- **JWT Authentication**: Bedrock verifies player identities via certificate chains signed by Microsoft / Xbox Live root authorities.
- **NetherNet WebRTC**: High-performance peer-to-peer transport using WebRTC DataChannels, ICE NAT traversal, and P-384 ECDSA keys.

For complete implementation details, see **[Bedrock Authentication & NetherNet](/developer/networking/bedrock/authentication)**.

