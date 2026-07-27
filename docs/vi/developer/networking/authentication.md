# Xác thực

## Tại sao cần xác thực

Các tài khoản ngoại tuyến (offline accounts), tức là các tài khoản được tạo từ tên người dùng của người chơi mà không cần liên hệ với máy chủ ủy quyền hoặc xác thực, có thể chọn bất kỳ biệt danh nào. Điều này, nếu không có các plugin bổ sung, có nghĩa là người chơi có thể mạo danh người chơi khác, bao gồm cả những người có quyền quản trị viên (operator).

## Máy chủ ngoại tuyến

Theo mặc định, `online_mode` được bật trong cấu hình (`[networking.java.online_mode]` / `[networking.bedrock.online_mode]`). Điều này sẽ bật tính năng xác thực và tắt các tài khoản ngoại tuyến. Nếu bạn muốn cho phép các tài khoản ngoại tuyến, bạn có thể tắt `online_mode` trong `pumpkin.toml`.

## Cách hoạt động của Yggdrasil Auth

1. Client nhận token xác thực và UUID từ launcher.
2. Trong quá trình tải, client sẽ lấy dữ liệu từ máy chủ ủy quyền/xác thực bằng token xác thực, chẳng hạn như các khóa ký khác nhau và danh sách các máy chủ bị chặn.
3. Khi tham gia máy chủ, client gửi một yêu cầu tham gia đến các máy chủ ủy quyền/xác thực. Các máy chủ Mojang có thể từ chối yêu cầu này nếu tài khoản bị cấm.
4. Client gửi thông tin định danh của mình đến máy chủ trong một gói tin (packet).
5. Máy chủ, dựa trên thông tin định danh này, gửi một yêu cầu `hasJoined` đến các máy chủ ủy quyền/xác thực. Nếu thành công, nó sẽ nhận được thông tin người chơi, chẳng hạn như trang phục (skin).

## Máy chủ xác thực tùy chỉnh

Pumpkin hỗ trợ các máy chủ xác thực tùy chỉnh. Bạn có thể thay thế URL xác thực trong `features.toml`.

### Cách hoạt động của xác thực Pumpkin

1. **Yêu cầu GET:** Pumpkin gửi một yêu cầu GET đến URL xác thực được chỉ định.
2. **Mã trạng thái 200:** Nếu xác thực thành công, máy chủ sẽ phản hồi với mã trạng thái là 200.
3. **Phân tích JSON Game Profile:** Pumpkin phân tích hồ sơ trò chơi (game profile) dạng JSON được trả về trong phản hồi.

### Game Profile

```rust
struct GameProfile {
    id: UUID,
    name: String,
    properties: Vec<Property>,
    profile_actions: Option<Vec<ProfileAction>>, // Optional, only present when actions are applied
}
```

#### Property

```rust
struct Property {
    name: String,
    value: String, // Base64 encoded
    signature: Option<String>, // Optional, Base64 encoded
}
```

#### Profile Action

```rust
enum ProfileAction {
    FORCED_NAME_CHANGE,
    USING_BANNED_SKIN,
}
```