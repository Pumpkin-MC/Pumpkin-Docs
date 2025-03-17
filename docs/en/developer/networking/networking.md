### Networking

Most of the networking code in Pumpkin can be found in the [pumpkin-protocol](https://github.com/Pumpkin-MC/Pumpkin/tree/master/pumpkin-protocol) crate.

Serverbound: Client→Server

Clientbound: Server→Client

### Structure

Packets in the Pumpkin protocol are organized by functionality and state.

`server`: Contains definitions for serverbound packets.

`client`: Contains definitions for clientbound packets.

### States

**Handshake**: Always the first packet being sent from the client. This also determines the next state, usually to indicate if the player wants to perform a status request, join the server, or wants to be transferred.

**Status**: Indicates the client wants to see a status response (MOTD).

**Login**: The login sequence. Indicates the client wants to join the server.

**Config**: A sequence of configuration packets is mostly sent from the server to the client (features, resource pack, server links, etc.).

**Play**: The final state, which indicates the player is now ready to join, is also used to handle all other gameplay packets.

### Minecraft Protocol

You can find all Minecraft Java packets at https://minecraft.wiki/w/Minecraft_Wiki:Projects/wiki.vg_merge/Protocol. There you also can see which [state](#States) they are in.
You can also can see all the information the packets have, which we can either read or write depending on whether they are serverbound or clientbound.

### Adding a Packet

1. Adding a packet is easy. First, derive:

```rust
// For clientbound packets:
#[derive(Serialize)]

// For serverbound packets:
#[derive(Deserialize)]
```

2. Next, you have to make it known that your struct represents a packet. This automatically gets the packet ID from the JSON packets file.

```rust
// For clientbound packets:
#[client_packet("play:disconnect")]

// For serverbound packets:
#[server_packet("login:move_player_pos")]
```

3. Now you can create the `struct`.

> [!IMPORTANT]
> Please start the packet name with "C" or "S" for "Clientbound" or "Serverbound".
> Also, if it's a packet that can be sent in multiple [states](#States), please add the state to the name. For example, there are 3 different disconnect packets.
>
> -   `CLoginDisconnect`
> -   `CConfigDisconnect`
> -   `CPlayDisconnect`

Create fields within your packet structure to represent the data that will be sent.

> [!IMPORTANT]
> Use descriptive field names and appropriate data types.

Examples:

```rust
pub struct CPlayDisconnect {
    reason: TextComponent,
    // more fields...
}

pub struct SPlayerPosition {
    pub x: f64,
    pub feet_y: f64,
    pub z: f64,
    pub ground: bool,
}
```

4. (Clientbound packets only) `impl` a `new` function so we can actually create them by putting in the values.

```rust
impl CPlayDisconnect {
    pub fn new(reason: TextComponent) -> Self {
        Self { reason }
    }
}
```

5. In the end, everything should come together.

```rust
#[derive(Serialize)]
#[client_packet("play:disconnect")]
pub struct CPlayDisconnect {
    reason: TextComponent,
}

impl CPlayDisconnect {
    pub fn new(reason: TextComponent) -> Self {
        Self { reason }
    }
}

#[derive(Deserialize)]
#[server_packet("login:move_player_pos")]
pub struct SPlayerPosition {
    pub x: f64,
    pub feet_y: f64,
    pub z: f64,
    pub ground: bool,
}
```

6. You can also serialize/deserialize the packet manually, which can be useful if the packet is more complex.

```diff
-#[derive(Serialize)]

+ impl ClientPacket for CPlayDisconnect {
+    fn write(&self, bytebuf: &mut BytesMut) {
+       bytebuf.put_slice(&self.reason.encode());
+    }

-#[derive(Deserialize)]

+ impl ServerPacket for SPlayerPosition {
+    fn read(bytebuf: &mut Bytes) -> Result<Self, ReadingError> {
+       Ok(Self {
+           x: bytebuf.try_get_f64()?,
+           feet_y: bytebuf.try_get_f64()?,
+           z: bytebuf.try_get_f64()?,
+           ground: bytebuf.try_get_bool()?,
+       })
+    }
```

7. You can now send the clientbound packet (see [Sending Packets](#sending-packets)) or listen for the serverbound packet (see [Receiving Packets](#receiving-packets)).

### Client

Pumpkin categorizes `Client`s and `Player`s separately. Everything that is not in the play state is a simple `Client`. Here are the differences:

**Client**

-   Can only be the states: Status, Login, Transfer, Config
-   Is not a living entity
-   Has small resource consumption

**Player**

-   Can only be in the Play state
-   Is a living entity in a world
-   Has more data and consumes more resources

#### Sending Packets

Example:

```rust
// Works only in the Status state
client.send_packet(&CStatusResponse::new("{ description: "A Description"}"));
```

#### Receiving Packets

For `Client`s:
`src/client/mod.rs`

```diff
// Put the packet into the right state
 fn handle_mystate_packet(
  &self,
    server: &Arc<Server>,
    packet: &mut RawPacket,
) -> Result<(), ReadingError> {
    let bytebuf = &mut packet.bytebuf;
    match packet.id.0 {
        SStatusRequest::PACKET_ID => {
                self.handle_status_request(server, SStatusRequest::read(bytebuf)?)
                    .await;
            }
+            MyPacket::PACKET_ID => {
+                self.handle_my_packet(MyPacket::read(bytebuf)?)
+                    .await;
            }
            _ => {
            log::error!(
                "Failed to handle packet id {} while in ... state",
                packet.id.0
            );
            }
    };
    Ok(())
}
```

For `Player`s:
`src/entity/player.rs`

```diff
// Players only have the Play state
 fn handle_play_packet(
  &self,
    server: &Arc<Server>,
    packet: &mut RawPacket,
) -> Result<(), ReadingError> {
    let bytebuf = &mut packet.bytebuf;
    match packet.id.0 {
        SChatMessage::PACKET_ID => {
            self.handle_chat_message(SChatMessage::read(bytebuf)?).await;
        }
       MyPacket::PACKET_ID => {
+           self.handle_mypacket(server, MyPacket::read(bytebuf)?).await;
        }
        _ => {
            log::error!(
                "Failed to handle packet id {} while in ... state",
                packet.id.0
            );
        }
    };
    Ok(())
}
```

### Compression

Minecraft packets **can** use ZLib compression for decoding/encoding. There is usually a threshold set when compression is applied; this most often affects chunk packets.

### Porting

To port to a new minecraft version, you can compare differences in the protocol on the [minecraft.wiki Protocol reference](https://minecraft.wiki/w/Java_Edition_protocol).

Also, change the `CURRENT_MC_PROTOCOL` in `src/lib.rs`.
