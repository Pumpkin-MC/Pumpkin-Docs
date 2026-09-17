# Networking Overview

Pumpkin is built with a high-performance, asynchronous networking stack capable of servicing both **Minecraft: Java Edition** and **Minecraft: Bedrock Edition** clients simultaneously.

All protocol definitions, serialization traits, and wire-level codecs are isolated in the [`pumpkin-protocol`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-protocol) crate, while client connection management, session state machines, and gameplay packet dispatching are managed in [`pumpkin/src/net`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/net).

---

## Supported Editions

Pumpkin separates network implementations by edition due to their fundamentally distinct transport layers, packet encodings, and state models:

| Feature | Minecraft: Java Edition | Minecraft: Bedrock Edition |
| :--- | :--- | :--- |
| **Transport Layer** | TCP socket streams | UDP via RakNet & NetherNet |
| **Framing** | VarInt length-prefixed frames | Batched packets encapsulated in `0xfe` headers |
| **Encryption** | AES-128 / CFB8 stream cipher | Cryptographic session handshake |
| **Compression** | Per-packet ZLib (above configurable threshold) | Per-batch Deflate / ZLib compression |
| **State Model** | Explicit states: Handshake, Status, Login, Config, Play | Packet-driven state progression |
| **Protocol Crate** | `pumpkin-protocol::java` | `pumpkin-protocol::bedrock` |
| **Server Net Module** | `pumpkin::net::java` | `pumpkin::net::bedrock` |

---

## Networking Architecture

The networking pipeline routes incoming connections through specialized transport and codec layers before delegating to the unified server game loop:

1. **Transport Listeners**: Independent listeners bind to their respective ports—Tokio TCP for Java Edition (`:25565`) and UDP/RakNet/NetherNet for Bedrock Edition (`:19132`).
2. **Session Abstraction**: Each accepted connection spawns an isolated session task (`JavaClient` or `BedrockClient`) managing wire framing and encryption.
3. **Codec Deserialization**: Wire bytes are deserialized into typed packet structs via `pumpkin-protocol::java` (`ClientPacket`/`ServerPacket`) and `pumpkin-protocol::bedrock` (`PacketWrite`/`PacketRead`).
4. **Unified Gameplay Dispatch**: Decoded packets are dispatched into the unified game loop, updating player entity states and streaming world chunks.

---

## Navigating the Networking Docs

Explore the documentation for each edition:

- **[Entity Metadata & Synced Data](/developer/networking/metadata)**: Synchronization of visual entity states (DataWatchers in Java, Actor Data in Bedrock).
- **[Java Edition](/developer/networking/java/overview)**:
  - **[Architecture & Lifecycle](/developer/networking/java/overview)**: State machine, `JavaClient` vs. `Player`, and multi-version negotiation.
  - **[How to Add a Packet](/developer/networking/java/adding-packets)**: Guide to defining, serializing, and dispatching Java Edition packets.
  - **[Authentication](/developer/networking/java/authentication)**: Mojang Yggdrasil validation, GameProfiles, and proxy forwarding.
- **[Bedrock Edition](/developer/networking/bedrock/overview)**:
  - **[Architecture & Transports](/developer/networking/bedrock/overview)**: RakNet and NetherNet integration, batching, and session handling.
  - **[How to Add a Packet](/developer/networking/bedrock/adding-packets)**: Guide to defining and handling Bedrock Edition packets.
  - **[Authentication & NetherNet](/developer/networking/bedrock/authentication)**: JWT certificate chain verification, WebRTC DataChannels, P-384 keys, and signaling.
- **[RCON](/developer/networking/rcon)**: Implementation of Valve's Remote Console protocol for administrative management.
