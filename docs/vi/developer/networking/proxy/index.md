# Tổng quan Chuyển tiếp Proxy

Trong các mạng Minecraft đa máy chủ, người chơi kết nối thông qua một proxy ngược đối mặt (như Velocity, BungeeCord hoặc Vine) định tuyến các kết nối giữa các sảnh và máy chủ con mà không yêu cầu người chơi kết nối lại.

Vì các máy chủ backend nhận kết nối TCP trực tiếp từ máy proxy thay vì người chơi, máy chủ phải được thông báo về **địa chỉ IP**, **UUID**, **tên người dùng** và **thuộc tính skin** thực sự của người chơi.

Pumpkin cung cấp hỗ trợ gốc cho cả ba giao thức chuyển tiếp proxy chính trong [`crates/pumpkin/src/net/proxy/`](https://github.com/Pumpkin-MC/Pumpkin/tree/master/crates/pumpkin/src/net/proxy).

---

## Vấn đề Chuyển tiếp Proxy

Nếu không có chuyển tiếp proxy an toàn:
1. **Mất IP**: Mọi người chơi đã kết nối xuất hiện với IP loopback hoặc nội bộ của proxy (làm hỏng cấm IP và định vị địa lý).
2. **Giả mạo UUID & Bỏ qua**: Người dùng độc hại có thể kết nối trực tiếp đến cổng máy chủ backend với bất kỳ tên người dùng hoặc danh tính operator nào đã bị giả mạo.

Để ngăn chặn bỏ qua proxy, Pumpkin xác thực các bí mật mã hóa, token hoặc chữ ký số được gửi bởi proxy.

---

## So sánh Các Giao thức Được Hỗ trợ

| Giao thức | Vận tải Giao thức | Bảo mật / Mật mã | Bảo vệ Phát lại | Module Crate |
| :--- | :--- | :--- | :--- | :--- |
| **[BungeeCord](/developer/networking/proxy/bungeecord)** | Chuỗi địa chỉ máy chủ `SHandshake` | Token tùy chọn trong thuộc tính profile (`bungeeguard-token`) | Không có | `pumpkin::net::proxy::bungeecord` |
| **[Velocity](/developer/networking/proxy/velocity)** | Thông điệp plugin login (`velocity:player_info`) | Chữ ký HMAC-SHA256 đối xứng | Không có | `pumpkin::net::proxy::velocity` |
| **[Vine](/developer/networking/proxy/vine)** | Thông điệp plugin login (`vine:player_info`) | Chữ ký số **Ed25519** bất đối xứng | Thử thách nonce 16 byte + cửa sổ dấu thời gian 30s | `pumpkin::net::proxy::vine` |

---

## Kiến trúc Vòng đời

1. **Xác thực Người chơi**: Người chơi kết nối đến proxy (BungeeCord, Velocity hoặc Vine) và xác thực với các máy chủ phiên Mojang.
2. **Kết nối Backend**: Proxy kết nối đến Pumpkin qua TCP và gửi `SHandshake`.
3. **Chuyển tiếp Dữ liệu**:
   - **Chế độ BungeeCord**: Proxy chèn IP từ xa, UUID và thuộc tính của người chơi trực tiếp vào chuỗi hostname `SHandshake` (phân cách bằng byte null `\0`).
   - **Chế độ Hiện đại (Velocity / Vine)**: Pumpkin gửi `CLoginPluginRequest` trên một kênh chuyên dụng (`velocity:player_info` hoặc `vine:player_info`). Proxy ký profile người chơi bằng HMAC-SHA256 (Velocity) hoặc Ed25519 (Vine) và phản hồi với `SLoginPluginResponse`.
4. **Xác thực & Khởi tạo Phiên**: Pumpkin xác thực chữ ký, liên kết IP thật và GameProfile với `JavaClient` và gửi `CLoginSuccess`.

---

## Tài liệu Proxy

- **[BungeeCord](/developer/networking/proxy/bungeecord)**: Chèn chuỗi host kế thừa và xác thực token BungeeGuard tùy chọn.
- **[Chuyển tiếp Hiện đại Velocity](/developer/networking/proxy/velocity)**: Thông tin người chơi được ký HMAC-SHA256 trong trạng thái Login.
- **[Chuyển tiếp Hiện đại Vine](/developer/networking/proxy/vine)**: Chuyển tiếp proxy thế hệ tiếp theo với chữ ký Ed25519 và ngăn chặn tấn công phát lại.
