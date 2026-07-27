### Mạng

Hầu hết mã nguồn xử lý mạng trong Pumpkin có thể được tìm thấy trong crate [pumpkin-protocol](https://github.com/Pumpkin-MC/Pumpkin/tree/master/pumpkin-protocol).

Serverbound: Client→Server

Clientbound: Server→Client

### Cấu trúc

Các packet trong giao thức Pumpkin được tổ chức theo chức năng và trạng thái.

`server`: Chứa các định nghĩa cho các packet serverbound.

`client`: Chứa các định nghĩa cho các packet clientbound.

### Trạng thái (States)

**Handshake**: Luôn là packet đầu tiên được gửi từ client. Packet này cũng xác định trạng thái tiếp theo, thường là để chỉ ra liệu người chơi muốn thực hiện yêu cầu trạng thái (status request), tham gia máy chủ (join) hay muốn chuyển máy chủ (transfer).

**Status**: Cho biết client muốn xem phản hồi trạng thái (MOTD).

**Login**: Chuỗi đăng nhập. Cho biết client muốn tham gia máy chủ.

**Config**: Chuỗi các packet cấu hình hầu hết được gửi từ server đến client (tính năng, resource pack, liên kết máy chủ, v.v.).

**Play**: Trạng thái cuối cùng, cho biết người chơi hiện đã sẵn sàng tham gia, cũng được sử dụng để xử lý tất cả các packet gameplay khác.

### Giao thức Minecraft

Bạn có thể tìm thấy tất cả các packet Minecraft Java tại <https://minecraft.wiki/w/Minecraft_Wiki:Projects/wiki.vg_merge/Protocol>. Tại đó, bạn cũng có thể xem chúng đang ở [trạng thái](#states) nào.
Bạn cũng có thể xem tất cả thông tin mà các packet có, những thông tin mà chúng ta có thể đọc hoặc ghi tùy thuộc vào việc chúng là serverbound hay clientbound.

### Thêm một Packet

1. Thêm một packet rất dễ dàng. Đầu tiên, derive:

```rust
// For clientbound packets:
#[derive(Serialize)]

// For serverbound packets:
#[derive(Deserialize)]
```

2. Tiếp theo, bạn phải khai báo để hệ thống biết rằng struct của bạn đại diện cho một packet. Việc này sẽ tự động lấy packet ID từ file JSON chứa các packet.

```rust
use pumpkin_data::packet::clientbound::PLAY_DISCONNECT;

#[packet(PLAY_DISCONNECT)]
```

3. Bây giờ bạn có thể tạo `struct`.

> [!IMPORTANT]
> Vui lòng bắt đầu tên packet bằng "C" hoặc "S" đại diện cho "Clientbound" hoặc "Serverbound".
> Ngoài ra, nếu đó là packet có thể được gửi trong nhiều [trạng thái](#states), vui lòng thêm trạng thái đó vào tên. Ví dụ, có 3 packet disconnect khác nhau.
>
> - `CLoginDisconnect`
> - `CConfigDisconnect`
> - `CPlayDisconnect`

Tạo các field bên trong cấu trúc packet của bạn để đại diện cho dữ liệu sẽ được gửi.

> [!IMPORTANT]
> Sử dụng tên field có tính mô tả và kiểu dữ liệu phù hợp.

Ví dụ:

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

4. (Chỉ áp dụng cho packet Clientbound) `impl` một hàm `new` để chúng ta có thể thực sự tạo chúng bằng cách truyền các giá trị vào.

```rust
impl CPlayDisconnect {
    pub fn new(reason: TextComponent) -> Self {
        Self { reason }
    }
}
```

5. Cuối cùng, mọi thứ sẽ kết hợp lại với nhau như sau.

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

6. Bạn cũng có thể serialize/deserialize packet thủ công, điều này có ích nếu packet phức tạp hơn.

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

7. Giờ đây bạn có thể gửi packet clientbound (xem [Gửi Packet](#sending-packets)) hoặc lắng nghe packet serverbound (xem [Nhận Packet](#receiving-packets)).

### Client

Pumpkin phân loại `Client` và `Player` riêng biệt. Mọi thứ không ở trạng thái play đều là một `Client` đơn thuần. Dưới đây là các điểm khác biệt:

#### Client

- Chỉ có thể ở các trạng thái: Status, Login, Transfer, Config
- Không phải là một thực thể sống (living entity)
- Mức tiêu thụ tài nguyên nhỏ

#### Player

- Chỉ có thể ở trạng thái Play
- Là một thực thể sống trong thế giới
- Có nhiều dữ liệu hơn và tiêu tốn nhiều tài nguyên hơn

#### Gửi Packet

Ví dụ:

```rust
// Works only in the Status state
client.send_packet(&CStatusResponse::new("{ description: "A Description"}"));
```

#### Nhận Packet

Dành cho `Client`:
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

Dành cho `Player`:
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

### Nén dữ liệu

Các packet Minecraft **có thể** sử dụng nén ZLib cho việc giải mã/mã hóa. Thường có một ngưỡng (threshold) được thiết lập khi áp dụng nén; điều này thường ảnh hưởng nhiều nhất đến các packet chunk.

### Porting (Chuyển đổi phiên bản)

Để port sang một phiên bản Minecraft mới, bạn có thể so sánh sự khác biệt trong giao thức tại [minecraft.wiki Protocol reference](https://minecraft.wiki/w/Java_Edition_protocol).

Ngoài ra, hãy thay đổi `CURRENT_MC_PROTOCOL` trong `src/lib.rs`.