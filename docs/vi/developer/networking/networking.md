### Networking

Hầu hết code network trong Pumpkin có thể được tìm thấy trong crate [pumpkin-protocol](https://github.com/Pumpkin-MC/Pumpkin/tree/master/pumpkin-protocol).

Serverbound: Client→Server

Clientbound: Server→Client

### Cấu trúc (Structure)

Các packet trong giao thức Pumpkin được tổ chức theo chức năng và trạng thái (state).

`server`: Chứa các định nghĩa cho serverbound packet.

`client`: Chứa các định nghĩa cho clientbound packet.

### Trạng thái (States)

**Handshake**: Luôn là packet đầu tiên được gửi từ client. Điều này cũng xác định trạng thái tiếp theo, thường là để chỉ ra xem người chơi muốn thực hiện yêu cầu trạng thái, tham gia server hay muốn được chuyển hướng (transfer).

**Status**: Chỉ ra rằng client muốn xem phản hồi trạng thái (MOTD).

**Login**: Quá trình đăng nhập. Cho biết client muốn tham gia vào server.

**Config**: Một chuỗi các packet cấu hình chủ yếu được gửi từ server đến client (tính năng, resource pack, server links, v.v.).

**Play**: Trạng thái cuối cùng, biểu thị quá trình chuẩn bị đã xong và người chơi đã sẵn sàng tham gia trò chơi, cũng được sử dụng để xử lý tất cả các packet lối chơi (gameplay) khác.

### Giao thức Minecraft (Minecraft Protocol)

Bạn có thể tìm thấy tất cả thư viện packet của Minecraft Java tại <https://minecraft.wiki/w/Minecraft_Wiki:Projects/wiki.vg_merge/Protocol>. Ở đó bạn cũng có thể xem chúng đang ở [trạng thái](#trạng-thái-states) nào.
Bạn cũng có thể xem mọi thông tin mà packet sở hữu, thứ mà chúng ta có thể đọc hoặc ghi đè tùy thuộc vào việc chúng là serverbound hay clientbound.

### Thêm một Packet

1. Việc thêm một packet rất dễ dàng. Đầu tiên, hãy derive:

```rust
// Đối với clientbound packets:
#[derive(Serialize)]

// Đối với serverbound packets:
#[derive(Deserialize)]
```

2. Tiếp theo, bạn phải làm cho nó hiểu struct của bạn đại diện cho một packet. Điều này sẽ tự động lấy ID packet từ tệp packet JSON.

```rust
use pumpkin_data::packet::clientbound::PLAY_DISCONNECT;

#[packet(PLAY_DISCONNECT)]
```

3. Giờ thì bạn có thể tạo `struct`.

> [!IMPORTANT] QUAN TRỌNG
> Vui lòng bắt đầu tên packet bằng "C" hoặc "S" cho "Clientbound" hoặc "Serverbound".
> Ngoài ra, nếu đó là packet có thể được gửi ở nhiều [trạng thái (states)](#trạng-thái-states), vui lòng thêm tên trạng thái vào tên. Ví dụ, có 3 packet disconnect khác nhau.
>
> - `CLoginDisconnect`
> - `CConfigDisconnect`
> - `CPlayDisconnect`

Tạo các trường trong cấu trúc packet của bạn để đại diện cho dữ liệu sẽ được gửi.

> [!IMPORTANT] QUAN TRỌNG
> Hãy sử dụng các tên trường mô tả mang tính ngắn gọn dễ hiểu và các kiểu dữ liệu phù hợp.

Ví dụ:

```rust
pub struct CPlayDisconnect {
    reason: TextComponent,
    // các field khác...
}

pub struct SPlayerPosition {
    pub x: f64,
    pub feet_y: f64,
    pub z: f64,
    pub ground: bool,
}
```

4. (Chỉ định clientbound packets) dùng `impl` trong `new` function để chúng ta có thể thực sự tạo nó bằng cách đặt các giá trị bên trong.

```rust
impl CPlayDisconnect {
    pub fn new(reason: TextComponent) -> Self {
        Self { reason }
    }
}
```

5. Cuối cùng, mọi thứ sẽ kết hợp lại với nhau.

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

6. Bạn cũng có thể Serialize/Deserialize tự động bằng phương pháp thủ công, điều này có thể hữu ích cho các packet phức tạp hơn.

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

7. Lúc này thì bạn đã có thể gửi clientbound packet (xem [Sending Packets](#nhận-gửi-sending-packets)) hoặc lắng nghe lệnh serverbound packet từ client (xem [Receiving Packets](#tiếp-nhận-receiving-packets)).

### Client

Pumpkin phân loại cả `Client` và `Player` tách biệt. Mọi thứ không nằm trong trạng thái play là các `Client` đơn giản. Dưới đây là sự khác biệt:

#### Client

- Chỉ có thể nằm ở các trạng thái: Status, Login, Transfer, Config
- Không phải thực thể sống
- Tiêu tốn ít tài nguyên

#### Người chơi (Player)

- Chỉ có thể nằm trong trạng thái Play
- Là thực thể sống trong thế giới
- Cấu thành nhiều dữ liệu hơn và làm tiêu tốn nhiều tài nguyên hơn

#### Nhận gửi (Sending) Packets

Ví dụ:

```rust
// Chỉ hoạt động ở trạng thái Status
client.send_packet(&CStatusResponse::new("{ description: "A Description"}"));
```

#### Tiếp nhận (Receiving) Packets

Với `Client`:
`src/client/mod.rs`

```diff
// Đưa packet vào đúng trạng thái (state)
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

Với người chơi (`Player`):
`src/entity/player.rs`

```diff
// Người chơi chỉ có duy nhất Play state
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

Các Minecraft packet **có thể** sử dụng nén (compression) ZLib cho mục đích decoding/encoding. Thường có một bộ lọc ngữ cảnh khi nén được áp dụng; bộ lọc này thường xuyên ảnh hưởng tới chunk packets nhất.

### Porting

Để chuyển đổi sang phiên bản Minecraft (port) mới, bạn có sự cho phép để so sánh các điểm khác biệt với giao thức cũ, chi tiết xem tại [minecraft.wiki Protocol reference](https://minecraft.wiki/w/Java_Edition_protocol).

Và hãy thay đổi `CURRENT_MC_PROTOCOL` ở mục `src/lib.rs`.
