# Chuyển tiếp Hiện đại Velocity

[Velocity](https://papermc.io/software/velocity) là một proxy hiệu suất cao được tạo bởi PaperMC. Nó sử dụng nhắn tin plugin hiện đại trong trạng thái `Login` để truyền dữ liệu người chơi một cách an toàn với mã xác thực tin nhắn **HMAC-SHA256**.

Pumpkin triển khai chuyển tiếp hiện đại Velocity trong [`crates/pumpkin/src/net/proxy/velocity.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/proxy/velocity.rs).

---

## Cách Chuyển tiếp Velocity Hoạt động

Khác với BungeeCord, vốn chèn dữ liệu không xác thực vào chuỗi handshake, Velocity hoạt động trong trạng thái **Login** qua một kênh plugin chuyên dụng:

1. **Handshake & Login**: Người chơi xác thực với Velocity. Velocity khởi tạo kết nối TCP tiêu chuẩn đến Pumpkin và truyền `SHandshake` và `SLoginStart`.
2. **Truy vấn Kênh**: Nhận ra rằng chuyển tiếp hiện đại Velocity được bật, Pumpkin tạm dừng chuỗi đăng nhập và gửi `CLoginPluginRequest` trên kênh `velocity:player_info`.
3. **Tạo Payload**: Velocity đóng gói địa chỉ từ xa, UUID, tên người dùng và kết cấu skin của người chơi. Nó tính toán chữ ký HMAC-SHA256 32 byte trên toàn bộ payload này bằng bí mật chia sẻ.
4. **Xác thực Chữ ký**: Velocity gửi `SLoginPluginResponse`. Pumpkin xác thực digest HMAC-SHA256 so với bí mật đã cấu hình của nó. Nếu hợp lệ, Pumpkin ghi đè địa chỉ mạng và GameProfile của kết nối và chuyển sang `Config` / `Play`.

---

## Cấu trúc Payload Dây

Payload trong `SLoginPluginResponse` được cấu trúc như sau:

```text
┌─────────────────────────────────────────────────────────────┐
│ Chữ ký HMAC-SHA256 32 byte                                  │
├─────────────────────────────────────────────────────────────┤
│ Phiên bản Giao thức Chuyển tiếp (VarInt: 1 - 4)             │
├─────────────────────────────────────────────────────────────┤
│ Địa chỉ IP Từ xa Client (String / IPv4 / IPv6)              │
├─────────────────────────────────────────────────────────────┤
│ UUID Người chơi (128-bit / UUID)                            │
├─────────────────────────────────────────────────────────────┤
│ Tên người dùng Người chơi (String)                          │
├─────────────────────────────────────────────────────────────┤
│ Số Thuộc tính Profile (VarInt)                              │
│  ├─ Tên Thuộc tính (String)                                 │
│  ├─ Giá trị Thuộc tính (String)                             │
│  └─ Chữ ký Tùy chọn (String)                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Xác thực Mật mã trong Pumpkin

Bên trong `crates/pumpkin/src/net/proxy/velocity.rs`:

```rust
use hmac::{Hmac, KeyInit, Mac};
use sha2::Sha256;

type HmacSha256 = Hmac<Sha256>;

// Trích xuất chữ ký và payload
let (signature, data_to_verify) = data.split_at(32);

// Khởi tạo HMAC với bí mật từ pumpkin.toml
let mut mac = HmacSha256::new_from_slice(secret.as_bytes())
    .map_err(|_| VelocityError::FailedVerifyIntegrity)?;

mac.update(data_to_verify);

// Xác thực thời gian không đổi ngăn chặn tấn công thời gian
mac.verify_slice(signature)
    .map_err(|_| VelocityError::FailedVerifyIntegrity)?;
```

Nếu chữ ký không khớp (ví dụ: nếu kẻ tấn công cố gắng kết nối trực tiếp đến backend mà không biết bí mật), Pumpkin ngắt kết nối ngay lập tức.

---

## Cấu hình trong `pumpkin.toml`

1. Mở `velocity.toml` trên proxy Velocity của bạn và đặt:
   ```toml
   player-info-forwarding-mode = "modern"
   forwarding-secret-file = "forwarding.secret"
   ```
2. Sao chép chuỗi bí mật đã tạo từ `forwarding.secret` vào `pumpkin.toml`:
   ```toml
   [networking.proxy]
   enabled = true

   [networking.proxy.velocity]
   enabled = true
   secret = "YOUR_VELOCITY_FORWARDING_SECRET_HERE"
   ```
