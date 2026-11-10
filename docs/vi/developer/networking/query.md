# Giao thức Truy vấn GameSpy4

Pumpkin bao gồm hỗ trợ gốc cho giao thức **GameSpy4 Query** qua UDP. Các hệ thống giám sát bên ngoài, bot Discord và nền tảng danh sách máy chủ sử dụng Query để thăm dò số lượng người chơi theo thời gian thực, MOTD, phiên bản máy chủ và danh sách người chơi đang hoạt động với chi phí mạng tối thiểu.

Mã hóa dây query được triển khai trong [`crates/pumpkin-protocol/src/query.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-protocol/src/query.rs), và listener UDP không đồng bộ được triển khai trong [`crates/pumpkin/src/net/query.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/query.rs).

---

## Tại sao dùng Query? (UDP vs. Status Ping)

Trong khi client Minecraft tiêu chuẩn ping máy chủ qua trạng thái TCP `Status` (SLP), Query hoạt động qua **UDP** không trạng thái:

- **Không có Handshake TCP**: Tránh chi phí kết nối TCP và bảng trạng thái kết nối.
- **Trạng thái Máy chủ Chi tiết**: Trả về metadata key-value toàn diện và danh sách đầy đủ các username người chơi đã kết nối (không có qua ping TCP cơ bản).
- **Bảo vệ Tấn Công Khuếch đại**: Thực thi các token thử thách mã hóa để kẻ xấu không thể lạm dụng cổng UDP cho các cuộc tấn công từ chối dịch vụ phản chiếu.

---

## Handshake & Luồng Token Thử thách

Để ngăn chặn giả mạo UDP và tấn công DDoS phản chiếu, Query yêu cầu một handshake hai bước:

1. **Thử thách Handshake**: Client truyền `SHandshake` (`0xFEFD`, type `0x09` và ID phiên 32-bit). Pumpkin tạo một token thử thách số nguyên 32-bit mã hóa được liên kết với `SocketAddr` của client và phản hồi với `CHandshake`.
2. **Truy vấn Trạng thái**: Client gửi `SStatusRequest` chứa token thử thách đã nhận:
   - **Trạng thái Cơ bản** (không có padding): Trả về MOTD, loại trò chơi (`SMP`), tên map, số lượng người chơi trực tuyến và dung lượng người chơi tối đa.
   - **Trạng thái Đầy đủ** (padding 4 byte): Trả về các cặp key-value metadata máy chủ chi tiết (`hostname`, `gametype`, `game_id`, `version`, `plugins`, `map`, `numplayers`, `maxplayers`, `hostport`, `hostip`) theo sau bởi một mảng các username người chơi trực tuyến.

### Hết hạn Token Thử thách
Trong `crates/pumpkin/src/net/query.rs`, các token thử thách được lưu trữ trong một map an toàn luồng (`Arc<RwLock<HashMap<SocketAddr, i32>>>`). Một timer Tokio nền thanh lọc tất cả các token thử thách mỗi 30 giây để ngăn chặn lạm dụng phát lại:

```rust
// Các token được liên kết nghiêm ngặt với IP và cổng của client
let valid_challenge_tokens = Arc::new(RwLock::new(HashMap::new()));

// Vòng lặp hết hạn nền
tokio::spawn(async move {
    let mut interval = time::interval(Duration::from_secs(30));
    loop {
        interval.tick().await;
        valid_challenge_tokens.write().await.clear();
    }
});
```

---

## Định dạng Gói

Mọi gói Query đến đều bắt đầu với header ma thuật 2 byte `0xFEFD` theo sau bởi một loại gói 1 byte:

| Byte Loại | Tên | Hướng | Mô tả |
| :--- | :--- | :--- | :--- |
| `0x09` | Yêu cầu Handshake | Client → Server | Client yêu cầu một token thử thách. |
| `0x09` | Phản hồi Handshake | Server → Client | Trả về token số được mã hóa dưới dạng chuỗi ASCII. |
| `0x00` | Yêu cầu Stat | Client → Server | Yêu cầu trạng thái cơ bản hoặc đầy đủ với token thử thách. |
| `0x00` | Phản hồi Stat Cơ bản | Server → Client | Tóm tắt ngắn 11 byte. |
| `0x00` | Phản hồi Stat Đầy đủ | Server → Client | Từ điển key-value + danh sách người chơi phân cách bằng null. |

---

## Payload Phản hồi

### 1. Trạng thái Cơ bản (`CBasicStatus`)
Chứa các trường máy chủ thiết yếu:
- **`motd`**: Thông điệp ngày của máy chủ (đã loại bỏ mã màu).
- **`gametype`**: Chuỗi cố định `"SMP"`.
- **`map`**: Tên thế giới/level đang hoạt động (ví dụ: `"world"`).
- **`numplayers`**: Số lượng người chơi trực tuyến.
- **`maxplayers`**: Dung lượng người chơi tối đa đã cấu hình.
- **`hostport`**: Số cổng (`u16` Little Endian).
- **`hostip`**: Chuỗi IP máy chủ.

### 2. Trạng thái Đầy đủ (`CFullStatus`)
Trả về hai phân đoạn kết thúc bằng null:

1. **Bản đồ Metadata Key-Value**:
   - `hostname`: Mô tả máy chủ / MOTD.
   - `gametype`: `"SMP"`.
   - `game_id`: `"MINECRAFT"`.
   - `version`: Chuỗi giao thức máy chủ / phiên bản Minecraft.
   - `plugins`: Phần mềm máy chủ đã cài đặt và tên plugin.
   - `map`: Tên level.
   - `numplayers` / `maxplayers`: Thống kê dung lượng.
   - `hostport` / `hostip`: Liên kết mạng.
2. **Danh sách Người chơi**:
   - Một mảng các chuỗi UTF-8 kết thúc bằng null chứa username của tất cả người chơi hiện đang kết nối.
   - Kết thúc với một byte null cuối cùng (`\0`).

---

## Cấu hình trong `pumpkin.toml`

```toml
[networking.query]
enabled = true
address = "0.0.0.0:25565"
```
