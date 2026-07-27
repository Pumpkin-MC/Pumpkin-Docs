# RCON (Remote Console)

## RCON là gì

RCON (Remote Console) là một giao thức được thiết kế bởi Valve nhằm cho phép các quản trị viên điều khiển và quản lý máy chủ trò chơi (game server) từ xa. Nó cung cấp một phương thức để thực thi các lệnh trên máy chủ từ một vị trí khác, chẳng hạn như từ điện thoại hoặc một máy tính riêng biệt.

## Tại sao nên sử dụng RCON

- **Tiện lợi:** Quản lý máy chủ của bạn từ bất kỳ đâu có kết nối internet.
- **Linh hoạt:** Thực thi các lệnh mà không cần phải có mặt trực tiếp tại vị trí đặt máy chủ.
- **Hiệu quả:** Tự động hóa các tác vụ và tối ưu hóa quá trình quản lý máy chủ.

## SSH và RCON

### SSH

- Cung cấp cơ chế mã hóa mạnh mẽ để bảo vệ dữ liệu truyền giữa client và server.
- Chủ yếu được thiết kế cho việc đăng nhập từ xa an toàn và thực thi các lệnh trên máy từ xa.
- Thường được sử dụng để quản lý các hệ thống Linux/Unix, cấu hình mạng và chạy các script.
- Cung cấp môi trường tương tự shell, cho phép bạn thực thi nhiều lệnh khác nhau và tương tác với hệ thống từ xa.

### RCON

- Được thiết kế đặc biệt cho việc quản trị từ xa các máy chủ game, cho phép bạn điều khiển và quản lý các thiết lập cũng như hoạt động của máy chủ.
- Thường ít an toàn hơn SSH, do thường phụ thuộc vào mật khẩu dạng văn bản thuần túy (plain text).
- Chủ yếu được sử dụng bởi các quản trị viên máy chủ game để quản lý máy chủ game.
- Có một tập hợp các lệnh giới hạn dành riêng cho từng game.

### Gói tin (Packets)

RCON là một giao thức rất đơn giản với chỉ một vài gói tin. Cấu trúc của một gói tin RCON như sau:

| Trường | Mô tả |
| ----- | ----------------------------------------------- |
| ID    | Được sử dụng để chỉ ra xác thực thành công hay thất bại |
| Type  | Xác định loại gói tin |
| Body  | Một thông điệp (String), ví dụ: một lệnh hoặc mật khẩu |

#### Gói tin Serverbound <sub><sub>(Client→Server)</sub></sub>

| Type | Packet      |
| ---- | ----------- |
| 2    | Auth        |
| 3    | ExecCommand |

#### Gói tin Clientbound <sub><sub>(Server→Client)</sub></sub>

| Type | Packet       |
| ---- | ------------ |
| 2    | AuthResponse |
| 0    | Output       |

### Cách RCON hoạt động

1. **Xác thực:**

   - RCON client gửi một gói tin xác thực chứa mật khẩu tương ứng.
   - Server xác minh mật khẩu và phản hồi lại bằng một gói tin phản hồi xác thực.
   - Nếu thành công, gói tin phản hồi sẽ chứa ID trùng với ID mà client đã gửi. Nếu thất bại, ID sẽ là -1.

2. **Thực thi lệnh:**

   - Client sau khi đã xác thực có thể gửi các gói tin thực thi lệnh, trong đó mỗi gói tin chứa lệnh cần chạy.
   - Server xử lý lệnh và gửi lại một gói tin đầu ra (output packet) chứa kết quả hoặc các thông báo lỗi nếu có.