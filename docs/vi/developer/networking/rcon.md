# RCON (Server điều khiển từ xa)

## RCON là gì

RCON (Remote Console) là một giao thức được thiết kế bởi Valve để cho phép các quản trị viên điều khiển và quản lý server trò chơi từ xa. Nó cung cấp một cách để thực thi các lệnh trên server từ một vị trí khác, chẳng hạn như điện thoại hoặc máy tính riêng biệt.

## Tại sao sử dụng RCON

- **Tiện lợi:** Quản lý server của bạn từ bất cứ vị trí địa lý nào có kết nối internet.
- **Tính linh động:** Điều khiển server qua mọi kết nối bằng cách sử dụng tập lệnh từ xa mà không cần phải hiện diện hoặc tốn chi phí đi lại.
- **Tính hiệu quả:** Tự động hóa các tác vụ và hợp lý hóa quản lý server.

## Điểm khác biệt giữa SSH và RCON

### SSH

- Cung cấp mã hóa mạnh mẽ để bảo vệ dữ liệu được truyền giữa  và server.
- Được thiết kế chủ yếu để đăng nhập từ xa an toàn và thực thi lệnh trên cấu trúc máy từ xa.
- Thường được sử dụng để quản lý các hệ thống dựa trên nền tảng của Linux/Unix, cấu hình mạng và chạy các tệp kịch bản hệ thống (scripts).
- Cung cấp một môi trường tương tự như shell, cho phép bạn thực hiện nhiều lệnh khác nhau và tương tác thẳng với hệ thống từ xa.

### RCON

- Mọi tuỳ chỉnh và thiết kế của nó đều là vì mục đích quản trị server chơi game từ xa, cho phép bạn kiểm soát cũng như quản lý các cài đặt và hoạt động của server đó.
- Thông thường sẽ kém an toàn hơn SSH, vì nó thường dựa vào mật khẩu là kiểu văn bản thuần túy.
- Chủ yếu được sử dụng bởi các admin trong các server riêng của từng loại game mà nó được tích hợp.
- Có một bộ lệnh giới hạn dành riêng cho mỗi trò chơi.

### Packets

RCON là một giao thức rất đơn giản với một vài packets. Dưới đây là diện mạo của một RCON packet:

| Field | Mô tả                                     |
| ----- | ----------------------------------------------- |
| ID    | Được sử dụng để cho biết lỗi hoặc thành công trong quá trình xác thực |
| Type  | Xác định loại packet                      |
| Body  | Một tin nhắn (Dạng chữ - String), tức là lệnh (command) hoặc cái mật khẩu |

#### Serverbound Packets <sub><sub>(Client→Server)</sub></sub>

| Type | Packet      |
| ---- | ----------- |
| 2    | Auth        |
| 3    | ExecCommand |

#### Clientbound Packets <sub><sub>(Server→Client)</sub></sub>

| Type | Packet       |
| ---- | ------------ |
| 2    | AuthResponse |
| 0    | Output       |

### Cách RCON hoạt động

1. **Xác thực:**

   - Client RCON gửi một packet xác thực với mật khẩu mong muốn.
   - Server xác minh mật khẩu và phản hồi bằng một packet phản hồi xác thực.
   - Nếu thành công, packet phản hồi bao gồm cùng số ID với số ID mà client đã gửi lúc đầu. Nếu không thành công, mã ID trả về sẽ mang giá trị -1.

2. **Thực thi lệnh:**

   - Client đã xác thực giờ đây có thể gửi các command execution packets (packet khởi yêu cầu thực thi lệnh), mỗi gói chứa lệnh sẽ được thực thi.
   - Server xử lý lệnh và gửi lại một output packet trong đó chứa kết quả hoặc bất kỳ thông báo lỗi sinh ra.
