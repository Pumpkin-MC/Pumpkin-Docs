# Chuyển tiếp Hiện đại Vine

**Vine** là một proxy Minecraft thế hệ tiếp theo hiệu suất cao được viết bằng Rust. Được thiết kế cho độ trễ cực thấp, đa luồng và bảo mật cấp độ enterprise, Vine giới thiệu chuyển tiếp mật mã hiện đại dựa trên **chữ ký bất đối xứng Ed25519** và **bảo vệ tấn công phát lại**.

Pumpkin cung cấp hỗ trợ gốc cho chuyển tiếp Vine trong [`crates/pumpkin/src/net/proxy/vine.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/proxy/vine.rs).

---

## Tại sao dùng Chuyển tiếp Vine?

Trong khi chuyển tiếp HMAC-SHA256 của Velocity đại diện cho một cải tiến so với BungeeCord kế thừa, nó dựa vào một **bí mật chia sẻ đối xứng**. Nếu một máy chủ backend trong một mạng bị xâm phạm, kẻ tấn công có được bí mật chia sẻ và có thể giả mạo các đăng nhập người chơi đã xác thực trên toàn bộ cụm máy chủ.

Vine giải quyết điều này với:
1. **Mật mã Khóa công khai Bất đối xứng (Ed25519)**: Proxy ký dữ liệu người chơi bằng khóa riêng của nó. Các máy chủ backend chỉ lưu trữ **Khóa công khai** của proxy (`public_key`). Ngay cả khi một máy chủ backend bị xâm phạm, kẻ tấn công không thể giả mạo danh tính đến các máy chủ khác.
2. **Bảo vệ Tấn công Phát lại (Nonce Thử thách 16 byte)**: Pumpkin tạo một nonce ngẫu nhiên mật mã 16 byte cho mỗi kết nối. Proxy phải ký và trả về nonce này. Phát lại một gói đăng nhập đã chụp là không thể.
3. **Cửa sổ Độ lệch Dấu thời gian**: Truyền một dấu thời gian Unix phải nằm trong khoảng ±30 giây so với đồng hồ hệ thống của backend (`MAX_TIMESTAMP_DRIFT_SECS = 30`).

---

## Chuỗi Handshake

1. **Kết nối**: Người chơi kết nối và xác thực với Vine. Vine mở một kết nối backend đến Pumpkin và gửi `SHandshake` và `SLoginStart`.
2. **Truy vấn Thử thách**: Pumpkin tạo một nonce ngẫu nhiên mật mã 16 byte và gửi `CLoginPluginRequest` trên kênh `vine:player_info`.
3. **Ký Bất đối xứng**: Vine tuần tự hóa phiên bản, dấu thời gian, nonce 16 byte đã trả về, địa chỉ IP client và GameProfile người chơi. Nó ký luồng byte này bằng khóa riêng Ed25519 của mình.
4. **Xác thực Ba tầng**: Vine phản hồi với `SLoginPluginResponse`. Pumpkin xác minh:
   - **Độ lệch Đồng hồ**: Dấu thời gian được nhúng nằm trong khoảng ±30 giây so với thời gian UTC.
   - **Kiểm tra Nonce**: Nonce đã ký khớp chính xác với thử thách 16 byte được tạo trong bước 2.
   - **Chữ ký Ed25519**: Chữ ký hợp lệ mật mã so với `public_key` đã cấu hình.
5. **Thành công Phiên**: Nếu cả ba kiểm tra vượt qua, Pumpkin áp dụng danh tính đã xác minh và phát `CLoginSuccess`.

---

## Cấu trúc Payload Dây

Bố cục dữ liệu `SLoginPluginResponse`:

```text
┌─────────────────────────────────────────────────────────────┐
│ Chữ ký Kỹ thuật số Ed25519 64 byte                          │
├─────────────────────────────────────────────────────────────┤
│ Phiên bản Giao thức Chuyển tiếp (i32: 1)                     │
├─────────────────────────────────────────────────────────────┤
│ Dấu thời gian Unix theo Giây (i64)                          │
├─────────────────────────────────────────────────────────────┤
│ Nonce Thử thách 16 byte                                      │
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

## Xác minh trong Pumpkin

Trong `crates/pumpkin/src/net/proxy/vine.rs`:

```rust
use ed25519_dalek::{Signature, Verifier, VerifyingKey};

// 1. Xác thực độ dài payload (chữ ký 64 byte + header tối thiểu 25 byte)
if data.len() < 89 {
    return Err(VineError::DataTooShort);
}

// 2. Trích xuất chữ ký và payload đã ký
let (sig_bytes, signed_data) = data.split_at(64);
let signature = Signature::from_slice(sig_bytes)
    .map_err(|_| VineError::InvalidSignature)?;

// 3. Xác minh độ lệch dấu thời gian (độ trôi tối đa 30 giây)
let skew = (server_now - timestamp).abs();
if skew > MAX_TIMESTAMP_DRIFT_SECS {
    return Err(VineError::TimestampExpired(skew, MAX_TIMESTAMP_DRIFT_SECS));
}

// 4. Xác minh nonce thử thách khớp với trạng thái kết nối
if received_nonce != expected_nonce {
    return Err(VineError::ChallengeMismatch);
}

// 5. Xác minh chữ ký Ed25519 với khóa công khai của proxy
verifying_key.verify(signed_data, &signature)
    .map_err(|_| VineError::InvalidSignature)?;
```

---

## Cấu hình trong `pumpkin.toml`

Cấu hình chuyển tiếp Vine trong `pumpkin.toml`:

```toml
[networking.proxy]
enabled = true

[networking.proxy.vine]
enabled = true
# Khóa công khai Ed25519 được mã hóa hex 64 ký tự của proxy Vine
public_key = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"

# Ngoài ra, nếu bí mật được cung cấp, khóa công khai được suy ra tự động
secret = ""
```
