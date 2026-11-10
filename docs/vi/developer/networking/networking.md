# Mạng & Giao thức

Pumpkin bao gồm một ngăn xếp mạng hiệu suất cao hỗ trợ cả **Minecraft: Java Edition** và **Minecraft: Bedrock Edition**.

Hầu hết các định nghĩa giao thức, codec và logic tuần tự hóa nằm trong crate [`pumpkin-protocol`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin-protocol), trong khi xử lý kết nối và điều phối gói gameplay nằm trong crate [`pumpkin`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/net).

> [!NOTE]
> Các hướng dẫn chi tiết có sẵn trong các danh mục con riêng:
> - **[Giới thiệu Mạng](/developer/networking/)**
> - **Java Edition**: **[Kiến trúc](/developer/networking/java/overview)**, **[Thêm Gói Java](/developer/networking/java/adding-packets)** và **[Xác thực](/developer/networking/java/authentication)**
> - **Bedrock Edition**: **[Kiến trúc](/developer/networking/bedrock/overview)** và **[Thêm Gói Bedrock](/developer/networking/bedrock/adding-packets)**

---

## Thuật ngữ Hướng & Giao thức

- **Serverbound (Client → Server)**: Các gói được gửi bởi client trò chơi và nhận bởi Pumpkin. Có tiền tố `S` (ví dụ: `SChatMessage`, `SPlayerPosition`).
- **Clientbound (Server → Client)**: Các gói được gửi bởi Pumpkin đến client trò chơi. Có tiền tố `C` (ví dụ: `CPlayDisconnect`, `CBlockUpdate`).

---

## Các Trạng thái Giao thức

Giao thức Minecraft Java hoạt động như một máy trạng thái hữu hạn với năm trạng thái riêng biệt:

1. **Handshake**: Gói ban đầu được gửi khi một client kết nối. Nó chỉ định phiên bản giao thức, địa chỉ máy chủ và trạng thái tiếp theo (`Status`, `Login` hoặc `Transfer`).
2. **Status**: Trạng thái truy vấn nhẹ được sử dụng cho danh sách máy chủ multiplayer (MOTD, số lượng người chơi trực tuyến, ping độ trễ).
3. **Login**: Xác thực người chơi (thông qua Mojang Yggdrasil hoặc chế độ ngoại tuyến), thiết lập mã hóa (AES-128/CFB8) và kích hoạt nén gói nếu được bật.
4. **Config**: Được giới thiệu trong các phiên bản Minecraft hiện đại để cấu hình cài đặt client, đàm phán tính năng, resource pack và liên kết máy chủ trước khi gameplay.
5. **Play**: Trạng thái gameplay chính nơi các entity, chunk thế giới, tương tác inventory, chat và di chuyển được xử lý.

---

## Định nghĩa Gói trong `pumpkin-protocol`

Các gói trong `pumpkin-protocol` được tổ chức theo phiên bản (`java`, `bedrock`), hướng (`client`, `server`) và trạng thái (`handshake`, `status`, `login`, `config`, `play`).

### 1. Gói Clientbound (`ClientPacket`)

Để tạo một gói clientbound:

1. Lấy hằng số ID gói từ `pumpkin-data`.
2. Annotate struct với `#[java_packet(PACKET_CONSTANT)]`.
3. Triển khai `ClientPacket`, ghi các trường gói vào luồng byte sử dụng `NetworkWriteExt`.

```rust
use std::io::Write;
use pumpkin_data::packet::clientbound::play::DISCONNECT;
use pumpkin_macros::java_packet;
use pumpkin_protocol::ClientPacket;
use pumpkin_protocol::ser::{NetworkWriteExt, WritingError};
use pumpkin_util::text::TextComponent;
use pumpkin_util::version::JavaMinecraftVersion;

/// Ngắt kết nối người chơi khi ở trạng thái Play.
#[java_packet(DISCONNECT)]
pub struct CPlayDisconnect<'a> {
    pub reason: &'a TextComponent,
}

impl<'a> CPlayDisconnect<'a> {
    pub const fn new(reason: &'a TextComponent) -> Self {
        Self { reason }
    }
}

impl ClientPacket for CPlayDisconnect<'_> {
    fn write_packet_data(
        &self,
        mut write: impl Write,
        version: &JavaMinecraftVersion,
    ) -> Result<(), WritingError> {
        // Ghi text component được định dạng cho phiên bản client mục tiêu
        write.write_component(self.reason, version)
    }
}
```

### 2. Gói Serverbound (`ServerPacket`)

Để tạo một gói serverbound:

1. Lấy hằng số ID gói từ `pumpkin-data`.
2. Annotate struct với `#[java_packet(PACKET_CONSTANT)]`.
3. Triển khai `ServerPacket<'a>`, đọc các trường từ slice byte đến với `NetworkReadExt`.

```rust
use pumpkin_data::packet::serverbound::play::MOVE_PLAYER_POS;
use pumpkin_macros::java_packet;
use pumpkin_protocol::ServerPacket;
use pumpkin_protocol::ser::{NetworkReadExt, ReadingError};
use pumpkin_util::math::vector3::Vector3;
use pumpkin_util::version::JavaMinecraftVersion;

#[java_packet(MOVE_PLAYER_POS)]
pub struct SPlayerPosition {
    pub position: Vector3<f64>,
    pub collision: u8,
}

impl<'a> ServerPacket<'a> for SPlayerPosition {
    fn read(bytebuf: &mut &'a [u8], version: &JavaMinecraftVersion) -> Result<Self, ReadingError> {
        let x = bytebuf.get_f64_be()?;
        let y = bytebuf.get_f64_be()?;
        if *version <= JavaMinecraftVersion::V_1_7_6 {
            let _stance = bytebuf.get_f64_be()?;
        }
        let z = bytebuf.get_f64_be()?;
        let collision = bytebuf.get_u8()?;

        Ok(Self {
            position: Vector3::new(x, y, z),
            collision,
        })
    }
}
```

### Các Hỗ trợ Tuần tự hóa Hữu ích (`NetworkWriteExt` & `NetworkReadExt`)

Pumpkin cung cấp các trait mở rộng trên luồng byte cho các kiểu nguyên thủy Minecraft tiêu chuẩn:

- `write_var_int(i32)` / `get_var_int()`: Số nguyên 32-bit độ dài thay đổi.
- `write_var_long(i64)` / `get_var_long()`: Số nguyên 64-bit độ dài thay đổi.
- `write_string(&str)` / `get_string()`: Chuỗi UTF-8 có tiền tố độ dài VarInt.
- `write_uuid(&Uuid)` / `get_uuid()`: UUID người chơi hoặc entity 128-bit.
- `write_component(&TextComponent)`: Tuần tự hóa văn bản chat/UI được định dạng.
- `write_nbt(&NBTTag)` / `get_nbt()`: Tuần tự hóa/giải tuần tự hóa các thẻ NBT nhị phân.

---

## Luồng Gói & Xử lý trong `pumpkin`

Các gói đến trải qua nhiều giai đoạn trước khi sửa đổi trạng thái trò chơi:

1. **Giải mã Khung**: Luồng TCP Tokio giải mã tiền tố độ dài VarInt và giải mã khung nếu mã hóa được bật.
2. **Chặn Sự kiện**: Phát `PacketReceivedEvent` đến các plugin đã đăng ký. Nếu bị hủy, gói bị loại bỏ ngay lập tức.
3. **Điều phối Theo Phiên bản**: Ánh xạ ID gói trên dây theo phiên bản giao thức đã đàm phán của client.
4. **Xử lý Trạng thái**: Định tuyến struct gói đã phân tích cú pháp đến trình xử lý tương ứng (ví dụ: `handle_play_packet`).
5. **Đột biến Trạng thái**: Thay đổi phiên người chơi, chunk thế giới hoặc trạng thái entity.

### 1. `Client` vs `Player`

Pumpkin duy trì sự phân biệt nghiêm ngặt giữa các kết nối trước khi chơi và người chơi hoạt động:

- **`Client`**: Đại diện cho một kết nối ở trạng thái `Handshake`, `Status`, `Login` hoặc `Config`. Nhẹ, không liên kết với một thế giới và không có entity vật lý. Được xử lý trong `crates/pumpkin/src/net/java/mod.rs`.
- **`Player`**: Đại diện cho một entity sống trong một `World` hoạt động trong trạng thái `Play`. Giữ inventory, sức khỏe, vận tốc và hàng đợi đăng ký chunk. Được xử lý trong `crates/pumpkin/src/entity/player/`.

### 2. Điều phối Gói (`handle_play_packet`)

Bên trong `crates/pumpkin/src/net/java/mod.rs`, các gói được điều phối bằng cách khớp với các ID gói theo phiên bản:

```rust
pub fn handle_play_packet(
    &self,
    player: &Arc<Player>,
    server: &Arc<Server>,
    packet: &RawPacket,
) -> Result<(), Box<dyn PumpkinError>> {
    let version = self.version.load();

    // Kích hoạt sự kiện plugin để cho phép plugin quan sát hoặc hủy gói
    let mut event = PacketReceivedEvent::new(player.clone(), packet.id, packet.payload.clone());
    server.plugin_manager.fire_blocking(server, &mut event);
    if event.cancelled {
        return Ok(());
    }

    let mut payload = &event.payload[..];
    match event.packet_id {
        id if id == SConfirmTeleport::to_id(version) => {
            self.handle_confirm_teleport(player, &SConfirmTeleport::read(&mut payload, &version)?);
        }
        id if id == SChatCommand::to_id(version) => {
            let packet = SChatCommand::read(&mut payload, &version)?;
            self.handle_chat_command(player, server, &packet);
        }
        id if id == SPlayerPosition::to_id(version) => {
            let packet = SPlayerPosition::read(&mut payload, &version)?;
            self.handle_player_position(player, &packet);
        }
        _ => {
            trace!("Unhandled play packet id: {:#04x}", event.packet_id);
        }
    }
    Ok(())
}
```

### 3. Gửi Gói

Để gửi một gói đến client:

```rust
// Gửi trực tiếp đến một người chơi
player.client.send_packet(&CPlayDisconnect::new(&reason));

// Phát đến người chơi gần đó trong thế giới
world.broadcast_packet_except(
    &[player.gameprofile.id],
    &CBlockUpdate::new(block_pos, block_id),
).await;
```

---

## Nén & Mã hóa

- **Nén**: Khi một client vượt qua trạng thái Login, nếu `compression_threshold` được bật trong `pumpkin.toml`, các gói vượt quá kích thước ngưỡng được nén bằng ZLib/nén nhanh.
- **Mã hóa**: Trong chế độ trực tuyến, mã hóa AES/CFB8 128-bit được kích hoạt ngay sau khi trao đổi khóa chung trong trạng thái Login.
