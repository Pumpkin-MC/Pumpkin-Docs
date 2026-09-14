# NetherNet WebRTC Transport

**NetherNet** is Mojang's modern, WebRTC-based transport protocol for Minecraft: Bedrock Edition. Designed for high-resilience peer-to-peer and relayed communication, NetherNet enables seamless cross-platform multiplayer (mobile, console, desktop) without requiring server operators or players to configure router port-forwarding.

Pumpkin provides a native, zero-dependency NetherNet implementation in [`crates/pumpkin/src/net/bedrock/nethernet.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/bedrock/nethernet.rs).

---

## Architectural Layers

| Layer | Implementation | Responsibility |
| :--- | :--- | :--- |
| **HTTP Signaling** | Axum HTTP Router (`ice_router.rs`) | Handles SDP Offer (`POST /offer`), SDP Answer (`GET /answer`), and ICE Candidates (`POST /candidate`) |
| **NAT Traversal** | ICE Agent | Coordinates STUN/TURN binding discovery and hole punching |
| **Transport Security** | DTLS Handshake | Generates ephemeral session keys and secures the WebRTC transport using ECDSA P-384 keys |
| **Data Delivery** | WebRTC DataChannels | Unordered/ordered datagram channels streaming standard Bedrock game batches to the dispatcher |

---

## Core Components in Pumpkin

Pumpkin's NetherNet subsystem is divided into four distinct modules:

### 1. Cryptographic Identity (`nethernet-key.der`)
- Pumpkin generates and loads a **NIST P-384 ECDSA private key** (`nethernet-key.der`).
- Used to cryptographically sign session descriptions (SDP offers and answers), authenticating the server's identity to connecting clients.
- Encoded using standard PKCS#8 DER formatting.

### 2. HTTP Signaling Router (`ice_router.rs`)
Signaling is handled over HTTP via an [Axum](https://github.com/tokio-rs/axum) router:

- **`POST /offer`**: The client submits an SDP offer describing its WebRTC codecs, transport profiles, and network interfaces.
- **`GET /answer`**: Pumpkin generates a corresponding local SDP answer containing its negotiated capabilities.
- **`POST /candidate`**: Both endpoints exchange trickle ICE candidates to discover the fastest direct network path (host, server-reflexive, or relay).

### 3. Local Network Discovery (`discovery.rs`)
- Listens and broadcasts availability on the local subnet via UDP multicast.
- Allows Bedrock clients on the same Wi-Fi or LAN to discover and connect to the Pumpkin server automatically without entering an IP address.

### 4. DataChannel Packet Streaming
- Once the WebRTC peer connection transitions to the `Connected` state, an ordered, reliable **WebRTC DataChannel** is opened.
- Bedrock batch packets (`0xfe`) flow bidirectionally through the DataChannel directly into Pumpkin's `incoming_game_packet_send` channel.

---

## Configuration in `pumpkin.toml`

NetherNet is configured under `[networking.bedrock.nethernet]` in `pumpkin.toml`:

```toml
[networking.bedrock]
enabled = true
address = "0.0.0.0:19132"

[networking.bedrock.nethernet]
enabled = true
signaling_address = "0.0.0.0:19133"
ice_servers = [
    "stun:stun.l.google.com:19302"
]
```
