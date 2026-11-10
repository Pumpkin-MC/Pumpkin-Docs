# RCON (Console Từ xa)

## RCON là gì

RCON (Remote Console) là một giao thức được thiết kế bởi Valve để cho phép quản trị viên điều khiển và quản lý máy chủ trò chơi từ xa. Nó cung cấp một cách để thực thi lệnh trên máy chủ từ một vị trí khác, như điện thoại hoặc máy tính riêng biệt.

## Tại sao dùng RCON

- **Tiện lợi:** Quản lý máy chủ của bạn từ bất cứ đâu với kết nối internet.
- **Linh hoạt:** Thực thi lệnh mà không cần phải hiện diện vật lý tại vị trí máy chủ.
- **Hiệu quả:** Tự động hóa công việc và hợp lý hóa quản lý máy chủ.

## SSH vs RCON

### SSH

- Cung cấp mã hóa mạnh để bảo vệ dữ liệu được truyền giữa client và máy chủ.
- Được thiết kế chủ yếu để đăng nhập từ xa an toàn và thực thi lệnh trên máy từ xa.
- Thường được sử dụng để quản lý hệ thống Linux/Unix, cấu hình mạng và chạy script.
- Cung cấp môi trường giống shell, cho phép bạn thực thi nhiều lệnh và tương tác với hệ thống từ xa.

### RCON

- Được thiết kế đặc biệt cho quản trị từ xa của máy chủ trò chơi, cho phép bạn điều khiển và quản lý cài đặt và hoạt động của máy chủ.
- Thường ít an toàn hơn SSH, vì nó thường dựa vào mật khẩu văn bản thuần.
- Chủ yếu được sử dụng bởi quản trị viên máy chủ trò chơi để quản lý máy chủ trò chơi.
- Có một tập hợp lệnh giới hạn dành riêng cho trò chơi.

### Các Gói

RCON là một giao thức rất đơn giản với một vài gói. Đây là cách một gói RCON trông như thế nào:

| Trường | Mô tả                                     |
| ----- | ----------------------------------------------- |
| ID    | Dùng để chỉ báo việc xác thực thất bại hay thành công |
| Type  | Xác định loại gói                      |
| Body  | Một thông điệp (String), ví dụ: một lệnh hoặc mật khẩu |

#### Gói Serverbound <sub><sub>(Client→Server)</sub></sub>

| Type | Gói      |
| ---- | ----------- |
| 2    | Auth        |
| 3    | ExecCommand |

#### Gói Clientbound <sub><sub>(Server→Client)</sub></sub>

| Type | Gói       |
| ---- | ------------ |
| 2    | AuthResponse |
| 0    | Output       |

### Cách RCON Hoạt động

1. **Xác thực:**

   - Client RCON gửi một gói xác thực với mật khẩu mong muốn.
   - Máy chủ xác minh mật khẩu và phản hồi với một gói phản hồi xác thực.
   - Nếu thành công, gói phản hồi bao gồm cùng ID với ID được gửi bởi client. Nếu không thành công, ID là -1.

2. **Thực thi Lệnh:**

   - Client đã được xác thực giờ có thể gửi các gói thực thi lệnh, với mỗi gói chứa lệnh cần thực thi.
   - Máy chủ xử lý lệnh và gửi lại một gói đầu ra chứa kết quả hoặc bất kỳ thông báo lỗi nào.
