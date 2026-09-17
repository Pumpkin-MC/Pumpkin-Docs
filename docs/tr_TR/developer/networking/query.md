# GameSpy4 Query Protocol

Pumpkin includes native support for the **GameSpy4 Query** protocol over UDP. External monitoring systems, Discord bots, and server listing platforms use Query to poll real-time player counts, MOTD, server versions, and active player lists with minimal network overhead.

Query wire encoding is implemented in [`crates/pumpkin-protocol/src/query.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-protocol/src/query.rs), and the asynchronous UDP listener is implemented in [`crates/pumpkin/src/net/query.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/query.rs).

---

## Why Query? (UDP vs. Status Ping)

While standard Minecraft clients ping servers via the TCP `Status` state (SLP), Query operates over stateless **UDP**:

- **No TCP Handshake**: Avoids TCP connection overhead and connection state tables.
- **Detailed Server State**: Returns comprehensive key-value metadata and a full list of connected player usernames (not available via basic TCP ping).
- **Amplification Attack Protection**: Enforces cryptographic challenge tokens so malicious actors cannot abuse the UDP port for denial-of-service reflection attacks.

---

## The Handshake & Challenge Token Flow

To prevent UDP spoofing and reflection DDoS attacks, Query requires a two-step handshake:

1. **Handshake Challenge**: The client transmits `SHandshake` (`0xFEFD`, type `0x09`, and a 32-bit session ID). Pumpkin generates a cryptographic 32-bit integer challenge token tied to the client's `SocketAddr` and responds with `CHandshake`.
2. **Status Query**: The client sends `SStatusRequest` containing the received challenge token:
   - **Basic Status** (no padding): Returns MOTD, game type (`SMP`), map name, online player count, and max player capacity.
   - **Full Status** (4-byte padding): Returns detailed server metadata key-value pairs (`hostname`, `gametype`, `game_id`, `version`, `plugins`, `map`, `numplayers`, `maxplayers`, `hostport`, `hostip`) followed by an array of online player usernames.

### Challenge Token Invalidation
In `crates/pumpkin/src/net/query.rs`, challenge tokens are stored in a thread-safe map (`Arc<RwLock<HashMap<SocketAddr, i32>>>`). A background Tokio timer purges all challenge tokens every 30 seconds to prevent replay abuse:

```rust
// Tokens are strictly bound to the client's IP and port
let valid_challenge_tokens = Arc::new(RwLock::new(HashMap::new()));

// Background expiration loop
tokio::spawn(async move {
    let mut interval = time::interval(Duration::from_secs(30));
    loop {
        interval.tick().await;
        valid_challenge_tokens.write().await.clear();
    }
});
```

---

## Packet Formats

Every incoming Query packet starts with the 2-byte magic header `0xFEFD` followed by a 1-byte packet type:

| Type Byte | Name | Direction | Description |
| :--- | :--- | :--- | :--- |
| `0x09` | Handshake Request | Client → Server | Client asks for a challenge token. |
| `0x09` | Handshake Response | Server → Client | Returns the numeric token encoded as an ASCII string. |
| `0x00` | Stat Request | Client → Server | Requests basic or full status with challenge token. |
| `0x00` | Basic Stat Response | Server → Client | 11-byte short summary. |
| `0x00` | Full Stat Response | Server → Client | Key-value dictionary + null-separated player list. |

---

## Response Payloads

### 1. Basic Status (`CBasicStatus`)
Contains essential server fields:
- **`motd`**: Server message of the day (stripped of color codes).
- **`gametype`**: Fixed string `"SMP"`.
- **`map`**: Active world/level name (e.g., `"world"`).
- **`numplayers`**: Online player count.
- **`maxplayers`**: Maximum configured player capacity.
- **`hostport`**: Port number (`u16` Little Endian).
- **`hostip`**: Server IP string.

### 2. Full Status (`CFullStatus`)
Returns two null-terminated sections:

1. **Key-Value Metadata Map**:
   - `hostname`: Server description / MOTD.
   - `gametype`: `"SMP"`.
   - `game_id`: `"MINECRAFT"`.
   - `version`: Server protocol / Minecraft version string.
   - `plugins`: Installed server software and plugin names.
   - `map`: Level name.
   - `numplayers` / `maxplayers`: Capacity stats.
   - `hostport` / `hostip`: Network bindings.
2. **Player List**:
   - An array of null-terminated UTF-8 strings containing the usernames of all currently connected players.
   - Concludes with a terminal null byte (`\0`).

---

## Configuration in `pumpkin.toml`

```toml
[networking.query]
enabled = true
address = "0.0.0.0:25565"
```
