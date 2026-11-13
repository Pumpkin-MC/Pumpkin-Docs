# Bedrock & NetherNet

Pumpkin bao gồm hỗ trợ原生 cho các client Minecraft Bedrock Edition, bao gồm truyền tải NetherNet WebRTC/ICE và tùy chỉnh tên người dùng.

## Cấu hình

:::code-group

```toml [pumpkin.toml]
[networking.bedrock]
enabled = true
online_mode = true
max_players = 1000
view_distance = 16
simulation_distance = 10
motd = "A blazingly fast Pumpkin server!"
username_prefix = ""
replace_username_spaces = true
chunk_caching = true

[networking.bedrock.nethernet]
enabled = true
address = "0.0.0.0:19132"
external_ip = ""
identity_key = "nethernet-key.der"
stun_servers = []
```

:::

### Các Tùy chọn Bedrock

- **`enabled`**: Có chấp nhận kết nối từ client Bedrock Edition hay không (mặc định: `true`).
- **`online_mode`**: Có thực thi xác thực Xbox Live cho người chơi Bedrock hay không (mặc định: `true`).
- **`max_players`**: Số lượng người chơi Bedrock đồng thời tối đa (`0` tắt giới hạn, mặc định: `1000`).
- **`view_distance`**: Khoảng cách xem chunk tối đa được gửi đến client Bedrock (`2` đến `64`, mặc định: `16`).
- **`simulation_distance`**: Khoảng cách mô phỏng tick tối đa cho người chơi Bedrock (mặc định: `10`).
- **`motd`**: Thông điệp của Ngày được hiển thị trong danh sách máy chủ Bedrock.
- **`username_prefix`**: Tiền tố tùy chọn được thêm vào gamertag của người chơi Bedrock (ví dụ: `"."` hoặc `"*"`), ngăn xung đột tên với tài khoản Java Edition trên máy chủ cross-play (mặc định: `""`).
- **`replace_username_spaces`**: Có tự động thay thế khoảng trắng trong gamertag Bedrock bằng dấu gạch dưới `_`, đảm bảo tên người chơi có thể được tham chiếu trong lệnh slash Minecraft hay không (mặc định: `true`).
- **`chunk_caching`**: Có bật bộ đệm blob chunk phía client để tiết kiệm băng thông mạng hay không (mặc định: `true`).

### Cài đặt Truyền tải NetherNet

NetherNet là truyền tải mạng WebRTC/ICE hiện đại của Minecraft Bedrock:

- **`enabled`**: Client có thể kết nối bằng NetherNet hay không (mặc định: `true`).
- **`address`**: Địa chỉ socket mạng cho tín hiệu TCP và ghép kênh ICE UDP (mặc định: `"0.0.0.0:19132"`).
- **`external_ip`**: Địa chỉ IP công khai tùy chọn được quảng cáo khi máy chủ được lưu trữ sau NAT (mặc định: `""` để tự động phát hiện).
- **`identity_key`**: Đường dẫn tệp đến tệp khóa định danh P-384 PKCS#8 được giữ lại qua các lần khởi động lại cho client Trust On First Use (TOFU) (mặc định: `"nethernet-key.der"`).
- **`stun_servers`**: Danh sách tùy chọn các URL máy chủ STUN cho xuyên NAT ICE.
