### Ağ

Pumpkin'deki ağ kodunun çoğu [pumpkin-protocol](https://github.com/Pumpkin-MC/Pumpkin/tree/master/pumpkin-protocol) crate'inde bulunabilir.

Sunucuya giden: İstemci→Sunucu

İstemciye giden: Sunucu→İstemci

### Yapı

Pumpkin protokolündeki packets, işlev ve duruma göre düzenlenir.

`server`: Sunucuya giden packet tanımlarını içerir.

`client`: İstemciye giden packet tanımlarını içerir.

### Durumlar

**Handshake**: İstemciden gönderilen ilk packet. Bu aynı zamanda bir sonraki durumu belirler; genellikle oyuncunun durum isteği yapmak, sunucuya katılmak veya transfer olmak isteyip istemediğini belirtir.

**Status**: İstemcinin bir durum yanıtı (MOTD) görmek istediğini belirtir.

**Login**: Oturum açma sırası. İstemcinin sunucuya katılmak istediğini belirtir.

**Config**: Çoğunlukla sunucudan istemciye gönderilen bir yapılandırma packets dizisi (features, resource pack, server links vb.).

**Play**: Son durumdur; oyuncunun artık katılmaya hazır olduğunu belirtir ve diğer tüm oyun içi packets işlemek için kullanılır.

### Minecraft Protokolü

Tüm Minecraft Java packets <https://minecraft.wiki/w/Minecraft_Wiki:Projects/wiki.vg_merge/Protocol> adresinde bulabilirsiniz. Orada ayrıca hangi [durumda](#durumlar) olduklarını da görebilirsiniz.
Ayrıca packets sahip olduğu tüm bilgileri görebilirsiniz; bunları sunucuya giden ya da istemciye giden olmalarına bağlı olarak okuyabilir veya yazabiliriz.

### packet Ekleme

1. packet eklemek kolaydır. Önce, şunları türetin:

```rust
// For clientbound packets:
#[derive(Serialize)]

// For serverbound packets:
#[derive(Deserialize)]
```

2. Ardından, yapınızın bir packet temsil ettiğini belirtmelisiniz. Bu, packet kimliğini JSON packets dosyasından otomatik olarak alır.

```rust
use pumpkin_data::packet::clientbound::PLAY_DISCONNECT;

#[packet(PLAY_DISCONNECT)]
```

3. Şimdi `struct` oluşturabilirsiniz.

> [!IMPORTANT]
> Lütfen packet adını "Clientbound" veya "Serverbound" için "C" ya da "S" ile başlatın.
> Ayrıca, birden fazla [durumda](#durumlar) gönderilebilen bir packet ise, durumu ada ekleyin. Örneğin, 3 farklı disconnect packet vardır.
>
> - `CLoginDisconnect`
> - `CConfigDisconnect`
> - `CPlayDisconnect`

packet yapınızın içine, gönderilecek verileri temsil eden alanlar ekleyin.

> [!IMPORTANT]
> Açıklayıcı alan adları ve uygun veri türleri kullanın.

Örnekler:

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

4. (Sadece clientbound packets) değerleri gerçekten koyup oluşturabilmek için bir `new` fonksiyonu `impl` edin.

```rust
impl CPlayDisconnect {
    pub fn new(reason: TextComponent) -> Self {
        Self { reason }
    }
}
```

5. Sonunda her şey bir araya gelmelidir.

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

6. packet elle serialize/deserialize edebilirsiniz; bu, packet daha karmaşıksa faydalı olabilir.

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

7. Artık clientbound packet gönderebilir ([packet Gönderme](#packet-gönderme) bölümüne bakın) veya serverbound packet dinleyebilirsiniz ([packet Alma](#packet-alma) bölümüne bakın).

### İstemci

Pumpkin, `Client` ve `Player`'ı ayrı kategorilere ayırır. Play durumunda olmayan her şey basit bir `Client`'tır. Farklar şunlardır:

#### Client

- Yalnızca şu durumlarda olabilir: Status, Login, Transfer, Config
- Canlı bir varlık değildir
- Düşük kaynak tüketimi vardır

#### Player

- Yalnızca Play durumunda olabilir
- Bir dünyada yaşayan bir varlıktır
- Daha fazla veriye sahiptir ve daha fazla kaynak tüketir

#### packet Gönderme

Örnek:

```rust
// Works only in the Status state
client.send_packet(&CStatusResponse::new("{ description: "A Description"}"));
```

#### packet Alma

`Client`'lar için:
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

`Player`'lar için:
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

### Sıkıştırma

Minecraft packets çözme/kodlama için ZLib sıkıştırması kullanabilir. Genellikle sıkıştırma uygulandığında bir eşik belirlenir; bu çoğunlukla chunk packets etkiler.

### Portlama

Yeni bir Minecraft sürümüne portlamak için protokoldeki farkları [minecraft.wiki protokol referansı](https://minecraft.wiki/w/Java_Edition_protocol) üzerinden karşılaştırabilirsiniz.

Ayrıca `src/lib.rs` içindeki `CURRENT_MC_PROTOCOL` değerini değiştirin.

