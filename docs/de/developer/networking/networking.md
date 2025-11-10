### Netzwerk

Ein Großteil des Netzwerk‑Codes von Pumpkin befindet sich in der Crate [pumpkin-protocol](https://github.com/Pumpkin-MC/Pumpkin/tree/master/pumpkin-protocol).

Serverbound: Client→Server

Clientbound: Server→Client

### Struktur

Pakete im Pumpkin‑Protokoll sind nach Funktionalität und Zustand organisiert.

`server`: Definitionen für serverbound‑Pakete.

`client`: Definitionen für clientbound‑Pakete.

### Zustände

**Handshake**: Immer das erste Paket vom Client. Bestimmt auch den nächsten Zustand, z. B. ob Status angefragt wird, ein Beitritt erfolgt oder eine Übertragung gewünscht ist.

**Status**: Der Client möchte eine Status‑Antwort (MOTD) sehen.

**Login**: Login‑Sequenz. Der Client möchte dem Server beitreten.

**Config**: Eine Sequenz von Konfigurationspaketen, meist vom Server zum Client (Features, Ressourcenpaket, Server‑Links, etc.).

**Play**: Finaler Zustand. Der Spieler ist spielbereit; alle Gameplay‑Pakete werden hier verarbeitet.

### Minecraft‑Protokoll

Alle Java‑Pakete findest du unter <https://minecraft.wiki/w/Minecraft_Wiki:Projects/wiki.vg_merge/Protocol>. Dort ist auch ersichtlich, in welchem [Zustand](#zustände) sie liegen und welche Felder ein Paket enthält (je nach Richtung les‑/schreibbar).

### Paket hinzufügen

1. Zuerst die Ableitungen:

```rust
// Für clientbound‑Pakete:
#[derive(Serialize)]

// Für serverbound‑Pakete:
#[derive(Deserialize)]
```

2. Dem Compiler mitteilen, dass die Struktur ein Paket ist. Die Paket‑ID kommt automatisch aus der JSON‑Paketdatei.

```rust
use pumpkin_data::packet::clientbound::PLAY_DISCONNECT;

#[packet(PLAY_DISCONNECT)]
```

3. Nun die `struct` anlegen.

> [!IMPORTANT]
> Beginne den Namen mit „C“ oder „S“ für „Clientbound“ bzw. „Serverbound“. Falls das Paket in mehreren [Zuständen](#zustände) existiert, füge den Zustand an. Beispiel: drei verschiedene Disconnect‑Pakete.
>
> - `CLoginDisconnect`
> - `CConfigDisconnect`
> - `CPlayDisconnect`

Füge Felder hinzu, die die zu sendenden Daten repräsentieren.

> [!IMPORTANT]
> Verwende aussagekräftige Feldnamen und passende Datentypen.

Beispiele:

```rust
pub struct CPlayDisconnect {
    reason: TextComponent,
    // weitere Felder...
}

pub struct SPlayerPosition {
    pub x: f64,
    pub feet_y: f64,
    pub z: f64,
    pub ground: bool,
}
```

4. (Nur clientbound) Implementiere eine `new`‑Funktion, um Werte zu übergeben.

```rust
impl CPlayDisconnect {
    pub fn new(reason: TextComponent) -> Self {
        Self { reason }
    }
}
```

5. Zusammengesetzt sieht es so aus:

```rust
#[derive(Serialize)]
#[packet(PLAY_DISCONNECT)]
pub struct CPlayDisconnect {
    reason: TextComponent,
}

impl CPlayDisconnect {
    pub fn new(reason: TextComponent) -> Self {
        Self { reason }
    }
}

#[derive(Deserialize)]
#[packet(PLAY_MOVE_PLAYER_POS)]
pub struct SPlayerPosition {
    pub x: f64,
    pub feet_y: f64,
    pub z: f64,
    pub ground: bool,
}
```

6. Alternativ kannst du manuell (de)serialisieren, z. B. bei komplexen Paketen.

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

7. Nun kannst du clientbound‑Pakete senden (siehe „Pakete senden“) oder serverbound‑Pakete empfangen (siehe „Pakete empfangen“).

### Client

Pumpkin unterscheidet zwischen `Client` und `Player`. Alles außerhalb des Play‑Zustands ist ein einfacher `Client`.

#### Client

- Zustände: Status, Login, Transfer, Config
- Keine lebende Entität
- Geringer Ressourcenverbrauch

#### Player

- Nur im Play‑Zustand
- Lebende Entität in einer Welt
- Mehr Daten, höherer Ressourcenverbrauch

#### Pakete senden

Beispiel:

```rust
// Funktioniert nur im Status‑Zustand
client.send_packet(&CStatusResponse::new("{ description: "A Description"}"));
```

#### Pakete empfangen

Für `Client`s: `src/client/mod.rs`

```diff
// Paket dem richtigen Zustand zuordnen
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

Für `Player`s: `src/entity/player.rs`

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

### Kompression

Minecraft‑Pakete können ZLib‑Kompression verwenden. Meist gibt es einen Schwellwert, ab dem komprimiert wird (oft Chunk‑Pakete betroffen).

### Portierung

Für eine neue MC‑Version vergleiche die Unterschiede im Protokoll in der [minecraft.wiki Protokollreferenz](https://minecraft.wiki/w/Java_Edition_protocol) und passe `CURRENT_MC_PROTOCOL` in `src/lib.rs` an.
