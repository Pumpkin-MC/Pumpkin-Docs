# Xác thực (Authentication)

## Tại sao cần xác thực

Các tài khoản ngoại tuyến (offline), tức là các tài khoản được tạo từ tên người dùng của người chơi mà không cần liên hệ với server cấp quyền hoặc xác thực, có thể chọn bất kỳ biệt danh nào. Điều này có nghĩa là, nếu không có các plugin bổ sung, người chơi có thể mạo danh những người chơi khác, bao gồm cả những người có quyền điều hành (operator).

## Server ngoại tuyến (Offline server)

Theo mặc định, `online_mode` được bật trong cấu hình. Điều này bật xác thực, vô hiệu hóa các tài khoản ngoại tuyến. Nếu bạn muốn cho phép tài khoản ngoại tuyến, bạn có thể tắt `online_mode` trong tệp `configuration.toml`.

## Cách thức hoạt động của Yggdrasil Auth

1. Client nhận token xác thực và UUID từ launcher.
2. Trong quá trình tải, client lấy dữ liệu từ server cấp quyền/xác thực bằng token xác thực, chẳng hạn như các khóa ký khác nhau và danh sách các server bị chặn.
3. Khi tham gia server, client gửi yêu cầu tham gia đến các server cấp quyền/xác thực. Các server Mojang có thể từ chối yêu cầu này nếu tài khoản bị cấm (banned).
4. Client gửi thông tin nhận dạng của nó đến server trong một packet.
5. Server, dựa trên thông tin nhận dạng này, gửi yêu cầu `hasJoined` đến các server cấp quyền/xác thực. Nếu thành công, nó sẽ nhận được thông tin người chơi, chẳng hạn như skin.

## Server xác thực tùy chỉnh

Pumpkin hỗ trợ server xác thực tùy chỉnh. Bạn có thể thay thế URL xác thực trong `features.toml`.

### Cách xác thực của Pumpkin hoạt động

1. **Yêu cầu GET:** Pumpkin gửi một yêu cầu GET đến URL xác thực được chỉ định.
2. **Mã trạng thái thứ 200:** Nếu xác thực thành công, server sẽ phản hồi bằng mã trạng thái 200.
3. **Phân tích cú pháp Hồ sơ trò chơi bằng JSON:** Pumpkin phân tích cú pháp (parse) cấu hình game JSON được trả về trong phản hồi.

### Hồ sơ trò chơi (Game Profile)

```rust
struct GameProfile {
    id: UUID,
    name: String,
    properties: Vec<Property>,
    profile_actions: Option<Vec<ProfileAction>>, // Tùy chọn, chỉ xuất hiện khi các actions được áp dụng
}
```

#### Thuộc tính (Property)

```rust
struct Property {
    name: String,
    value: String, // Mã hóa Base64
    signature: Option<String>, // Tùy chọn, Mã hóa Base64
}
```

#### Hồ sơ Action (Profile Action)

```rust
enum ProfileAction {
    FORCED_NAME_CHANGE,
    USING_BANNED_SKIN,
}
```
