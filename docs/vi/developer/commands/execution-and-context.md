# Thực thi & Ngữ cảnh

Trong Pumpkin, việc thực thi lệnh tách biệt **nguồn gốc vật lý** của một lệnh khỏi **ngữ cảnh thời gian chạy** của nó. Thiết kế này cho phép điều phối lệnh phức tạp, thay đổi kích thước, thực thi có điều kiện, và chuỗi `/execute` tuân thủ vanilla.

---

## `CommandSender` vs. `CommandSource`

Hiểu sự khác biệt giữa `CommandSender` và `CommandSource` là cơ bản để phát triển lệnh trong Pumpkin:

| Thuộc tính | `CommandSender` | `CommandSource` |
| :--- | :--- | :--- |
| **Khái niệm** | Nguồn gốc vật lý và đích mạng | Môi trường thực thi thời gian chạy có thể thay đổi |
| **Khả thay đổi** | Bất biến trong suốt thực thi lệnh | Được sao chép và sửa đổi qua các nhánh `/execute` |
| **Các trường Chính** | Socket terminal, handle kết nối, bộ đệm RCON | Thế giới, tọa độ vị trí, xoay, thực thể, cờ silent |
| **Tạo lập** | Được khởi tạo khi kết nối mạng hoặc đầu vào terminal | Được xây dựng qua `sender.into_source(&server)` |

### 1. `CommandSender` (Người gọi Vật lý)
Đại diện cho thực thể hoặc socket đã khởi tạo lệnh và nhận đầu ra của nó:

```rust
pub enum CommandSender {
    Console,
    Rcon(Arc<std::sync::Mutex<Vec<String>>>),
    Player(Arc<Player>),
    CommandBlock(Arc<CommandBlockEntity>, Arc<World>),
    Dummy,
}
```

- **Đích đầu ra**: Xác định nơi các tin nhắn được định dạng với `send_message` được định tuyến (ví dụ: standard out, bộ đệm RCON, gói tin người chơi, hoặc NBT thực thể khối).
- **Quyền Cứng**: Giữ các quyền cơ sở cố định (ví dụ: Console có cấp 4 bỏ qua; Các khối lệnh có cấp 2).

### 2. `CommandSource` (Môi trường Thực thi)
Đại diện cho trạng thái thời gian chạy có thể thay đổi trong quá trình đánh giá lệnh:

```rust
pub struct CommandSource {
    pub output: CommandSender,
    pub world: Option<Arc<World>>,
    pub entity: Option<Arc<dyn EntityBase>>,
    pub position: Vector3<f64>,
    pub rotation: Vector2<f32>,
    pub name: String,
    pub display_name: TextComponent,
    pub server: Option<Arc<Server>>,
    pub silent: bool,
    pub command_result_taker: ResultValueTaker,
    pub entity_anchor: EntityAnchor,
}
```

Một người gửi chuyển đổi thành `CommandSource` qua `sender.into_source(&server)`.

---

## Lệnh `/execute` & Chuyển hướng Ngữ cảnh

Lệnh `/execute` thao tác các thuộc tính `CommandSource` trước khi chuyển điều khiển đến một lệnh hạ nguồn.

### Các Bộ sửa đổi Phân nhánh
- **`as <targets>`**: Thay đổi `context.source.entity` thành các thực thể mục tiêu mà không thay đổi vị trí hoặc xoay.
- **`at <targets>`**: Cập nhật `context.source.world`, `position`, và `rotation` để khớp với thực thể mục tiêu.
- **`positioned <pos>`**: Sửa đổi `context.source.position` thành tọa độ mới.
- **`in <dimension>`**: Thay đổi `context.source.world` thành kích thước được chỉ định (Overworld, Nether, The End).
- **`anchored (feet|eyes)`**: Điều chỉnh các độ dịch chuyển tọa độ cho đường ngắm và các kiểm tra hướng mặt.

### Rẽ nhánh Ngữ cảnh & Chaining
Khi `/execute` khớp nhiều mục tiêu (ví dụ: `/execute as @e run ...`), `pumpkin-command` sử dụng **forking**:
1. Bộ điều phối rẽ nhánh ngữ cảnh thực thi một lần cho mỗi mục tiêu được khớp.
2. Lệnh con thực thi độc lập cho mỗi `CommandSource` được sao chép.
3. Số lượng thành công tích lũy được tổng hợp qua tất cả các lần thực thi.

---

## Các Giá trị Kết quả & Số lượng Thành công

Các lệnh vanilla giao tiếp kết quả lại qua các mã thoát số nguyên và giá trị trả về.

### Callback Giá trị Trả về
Các bộ thực thi trả về `CommandExecutorResult` (`Result<i32, CommandSyntaxError>`). Số nguyên được trả về biểu thị:
- **0**: Thất bại hoặc không có thực thể nào bị ảnh hưởng.
- **> 0**: Số lượng thực thể bị ảnh hưởng, khối đã thay đổi, hoặc vật phẩm đã xóa.

Đối với Các khối Lệnh, giá trị này được lưu vào `SuccessCount` của thực thể khối:

```rust
pub fn set_success_count(&self, count: u32) {
    if let Self::CommandBlock(c, _) = self {
        c.success_count.store(count, Ordering::SeqCst);
    }
}
```

### `/execute store`
Khi được kết nối với `/execute store (result|success) ...`, Pumpkin chặn giá trị trả về qua `ReturnValueCallback` và ghi nó vào bảng điểm, bossbar, hoặc tag NBT thực thể.

---

## Phản hồi & Tích hợp GameRules

Gửi đầu ra cho người gửi lệnh được quản lý bởi cấu hình máy chủ và luật game thế giới:

```rust
context.source.send_feedback(
    TextComponent::text("Command executed successfully!"),
    true, // Phát sóng đến vận hành viên máy chủ
);
```

### Ma trận Quy tắc Đầu ra

| Điều kiện | Hành vi Phản hồi |
| :--- | :--- |
| `silent == true` | Đầu ra bị ngăn chặn hoàn toàn. |
| `send_command_feedback == false` | Người gửi người chơi không nhận phản hồi thành công (lỗi vẫn được hiển thị). |
| `command_block_output == false` | Đầu ra thực thi khối lệnh không được phát sóng đến các vận hành viên trực tuyến. |
| `broadcast_console_to_ops == true` | Các lệnh bảng điều khiển máy chủ và RCON phát một bản sao phản hồi của họ đến tất cả người chơi cấp OP 2+ trực tuyến. |
