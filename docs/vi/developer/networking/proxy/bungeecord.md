# Chuyển tiếp BungeeCord

Pumpkin cung cấp hỗ trợ gốc cho các mạng proxy BungeeCord và Waterfall, bao gồm xác thực token **BungeeGuard**.

Việc triển khai nằm trong [`crates/pumpkin/src/net/proxy/bungeecord.rs`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/net/proxy/bungeecord.rs).

---

## Cách Chuyển tiếp BungeeCord Hoạt động

Khác với các giao thức hiện đại sử dụng kênh đăng nhập tùy chỉnh, BungeeCord hoạt động bằng cách mã hóa metadata client trực tiếp vào trường `server_address` của gói `SHandshake` ban đầu.

Chuỗi sử dụng các ký tự phân cách null (`\0`):

```text
[original_host]\0[player_ip:port]\0[player_uuid]\0[properties_json]
```

1. **`original_host`**: Tên miền người chơi đã gõ ban đầu vào client của họ.
2. **`player_ip:port`**: Địa chỉ IP thực và cổng nguồn tạm thời của client.
3. **`player_uuid`**: UUID Mojang của người chơi (32 ký tự hex không có dấu gạch ngang hoặc 36 ký tự có dấu gạch ngang).
4. **`properties_json`**: Một mảng JSON chứa các kết cấu skin, kết cấu áo choàng và chữ ký mã hóa Mojang.

---

## Rủi ro Bảo mật: Bỏ qua Proxy

Vì chuỗi handshake của BungeeCord là văn bản thuần không được xác thực, kẻ tấn công có thể kết nối trực tiếp đến một cổng backend bị lộ, chèn một UUID tùy ý và tên người dùng operator, và giành quyền kiểm soát máy chủ đầy đủ.

Truyền thống, điều này yêu cầu các quy tắc tường lửa Linux nghiêm ngặt (`iptables` / `ufw`) để hạn chế quyền truy cập cổng chỉ đến IP proxy.

---

## Bảo vệ BungeeGuard

Để loại bỏ bỏ qua proxy mà không chỉ dựa vào tường lửa mạng, Pumpkin tích hợp xác thực token **BungeeGuard**:

1. Proxy BungeeCord chèn một bí mật chia sẻ vào thuộc tính profile của người chơi dưới khóa `bungeeguard-token`.
2. Khi Pumpkin xử lý handshake trong `bungeecord_login`:
   - Nó kiểm tra xem `secret` có được cấu hình trong `pumpkin.toml` không.
   - Nó kiểm tra các thuộc tính được chuyển tiếp cho `bungeeguard-token`.
   - Nếu token khớp, Pumpkin **loại bỏ thuộc tính bí mật** khỏi profile của người chơi (để các plugin khác không thể đọc nó) và hoàn tất đăng nhập.
   - Nếu token bị thiếu hoặc không chính xác, Pumpkin từ chối kết nối với `BungeeCordError::MissingToken` hoặc `BungeeCordError::InvalidToken`.

```rust
// Trong crates/pumpkin/src/net/proxy/bungeecord.rs
if !secret.is_empty() {
    let Some(token_index) = properties.iter().position(|p| p.name == BUNGEEGUARD_TOKEN_PROPERTY) else {
        return Err(BungeeCordError::MissingToken);
    };

    if properties[token_index].value != secret {
        return Err(BungeeCordError::InvalidToken);
    }
    properties.remove(token_index);
}
```

---

## Cấu hình trong `pumpkin.toml`

Để bật chuyển tiếp BungeeCord với BungeeGuard:

```toml
[networking.proxy]
enabled = true

[networking.proxy.bungeecord]
enabled = true
# Tùy chọn: Cấu hình bí mật chia sẻ BungeeGuard để chặn kết nối trực tiếp
secret = "YOUR_BUNGEEGUARD_SECRET_HERE"
```
