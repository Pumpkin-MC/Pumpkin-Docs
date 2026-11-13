# Kiến trúc Lệnh & Bộ điều phối

Pumpkin có một triển khai thuần Rust hiệu năng cao cho đặc tả cây lệnh **Brigadier** thông qua crate chuyên dụng `pumpkin-command`. Nó điều phối phân tích cú pháp lệnh, giải quyết yêu cầu, giải mã hóa đối tượng an toàn kiểu, phân nhánh thực thi, và đồng bộ hóa cây client cho cả hai phiên bản **Minecraft: Java Edition** và **Minecraft: Bedrock Edition**.

### Quy trình Xử lý Lệnh

Mọi lệnh được thực thi trong Pumpkin đều đi qua các giai đoạn sau:

1. **Chuẩn hóa Đầu vào**: Loại bỏ dấu gạch chéo đơn ở đầu trong khi vẫn giữ nguyên quy ước nhiều gạch chéo của plugin (như `//set`).
2. **Kiểm tra Khả dụng**: Từ chối các lệnh bị vô hiệu hóa thông qua cấu hình máy chủ với lỗi cú pháp `unknown command` tiêu chuẩn.
3. **Đánh giá Quyền**: Xác thực các yêu cầu (`PermissionLvl` hoặc các node registry tùy chỉnh) đối với người gửi đang thực thi.
4. **Mã hóa & Phân tích Cú pháp**: `StringReader` duyệt đệ quy qua `Tree<S>`, khớp các từ khóa theo nghĩa đen và phân tích các tham số đối số được định kiểu.
5. **Điều phối Ngữ cảnh**: Gọi callback `CommandExecutor` đã khớp với `CommandContext<S>` được định kiểu.
6. **Phản hồi & Tiêu thụ Kết quả**: Định dạng các thành phần dịch thuật đa nền tảng, thông báo cho các quan sát viên, và ghi lại các mã thoát về cho người gọi.

---

## Crate `pumpkin-command`

Pumpkin tách biệt việc phân tích cú pháp lệnh và biểu diễn cây khỏi thời gian chạy máy chủ chính thành crate mô-đun `pumpkin-command` (`crates/pumpkin-command`).

Các thành phần chính của `pumpkin-command` bao gồm:
- **`Tree<S>`**: Bộ lưu trữ liền mạch dựa trên vector của các node lệnh đã đính kèm (`AttachedNode`).
- **`CommandDispatcher<S>`**: Trung tâm đăng ký và động cơ điều phối. Nó xử lý các chuỗi lệnh thô, phân tích các token với `StringReader`, duyệt qua cây lệnh, và thực thi các callback mục tiêu.
- **`ArgumentBuilder`**: API builder trôi chảy (`command`, `literal`, `argument`) được mô phỏng theo thư viện Brigadier của Mojang.
- **`CommandSource`**: Trạng thái thực thi chung đại diện cho vị trí hiện tại, xoay, kích thước, thực thể, và luồng đầu ra phản hồi.

---

## Phân cấp Node Lệnh

Các lệnh trong Pumpkin được mô hình hóa như các đồ thị có hướng của các node. Để tối ưu hóa việc cấp phát bộ nhớ và tránh các vấn đề tham chiếu vòng trong quá trình xây dựng, hệ thống phân tách các node thành trạng thái **tách biệt** và **đính kèm**:

### 1. Node Tách biệt (`DetachedNode`)
Được xây dựng bằng các builder trôi chảy (`CommandArgumentBuilder`, `LiteralArgumentBuilder`, `RequiredArgumentBuilder`) trước khi đăng ký:
- **`CommandDetachedNode`**: Đại diện cho điểm nhập lệnh gốc với một định danh và mô tả.
- **`LiteralDetachedNode`**: Đại diện cho từ khóa theo nghĩa đen trong nhánh lệnh con (ví dụ: `set` trong `/gamemode creative`).
- **`ArgumentDetachedNode`**: Đại diện cho tham số được định kiểu được phân tích bởi `ArgumentType` (ví dụ: tọa độ, bộ chọn thực thể, phạm vi số nguyên).

### 2. Node Đính kèm (`AttachedNode`)
Sau khi đăng ký vào `CommandDispatcher`, các cây tách biệt được làm phẳng thành cấu trúc `Tree<S>` được lập chỉ mục:
```rust
pub enum AttachedNode<S: CommandSource = DummySource> {
    Root(RootAttachedNode<S>),
    Literal(LiteralAttachedNode<S>),
    Argument(ArgumentAttachedNode<S>),
    Command(CommandAttachedNode<S>),
}
```
Mỗi node đính kèm có:
- **`NodeId`**: Một chỉ mục được định kiểu không tốn chi phí (`NonZero<usize>`) vào arena node liền mạch.
- **`children`**: Bản đồ tra cứu nhanh (`FxHashMap<String, NodeId>`) cho các từ khóa theo nghĩa đen và đối số con.
- **`requirements`**: Các vị từ xác định xem người gửi có quyền xem hoặc thực thi node hay không.
- **`command`**: Callback `CommandExecutor` tùy chọn được gọi khi việc phân tích kết thúc trên node này.
- **`redirect`**: Con trỏ `Redirection` tùy chọn để lặp lại hoặc chuyển hướng đến một cây con khác (được sử dụng nhiều bởi `/execute`).

---

## Quy trình Điều phối & Thực thi

Khi một lệnh đến máy chủ, `CommandDispatcher::handle_command` xử lý nó qua flera giai đoạn:

```rust
pub fn handle_command<'a>(&'a self, source: &S, mut input: &'a str) {
    // 1. Loại bỏ dấu gạch chéo đơn ở đầu (giữ nguyên các lệnh hai gạch chéo như //set)
    if let Some(sliced) = input.strip_prefix('/') {
        let first_token = input.split_whitespace().next().unwrap_or("");
        let sliced_token = sliced.split_whitespace().next().unwrap_or("");
        if !self.has_command(first_token)
            && (self.has_command(sliced_token) || !first_token.starts_with("//"))
        {
            input = sliced;
        }
    }

    // 2. Kiểm tra các lệnh bị vô hiệu hóa từ cấu hình
    if self.is_disabled(Self::command_name(input)) {
        let reader = StringReader::new(input);
        Self::send_error_to_source(source, DISPATCHER_UNKNOWN_COMMAND.create(&reader), input);
        return;
    }

    // 3. Phân tích và thực thi
    let output = self.execute_input(input, source);
    if let Err(error) = output {
        Self::send_error_to_source(source, error, input);
    }
}
```

### Định dạng Lỗi Cú pháp
Khi phân tích gặp cú pháp không hợp lệ, các token không mong đợi, hoặc đối số ngoài phạm vi, Pumpkin tạo ra một `CommandSyntaxError`. Nếu có ngữ cảnh, bộ điều phối định dạng một con trỏ trực quan làm nổi bật chính xác nơi bộ phân tích thất bại:

```
Unknown or incomplete command, see below for error
/gamemode creatve<--[HERE]
```

Trong client Java Edition, văn bản lỗi này được chú thích với `ClickEvent::SuggestCommand`, cho phép người chơi nhấp vào lỗi trong trò chuyện để sao chép lệnh thất bại vào hộp nhập của họ để chỉnh sửa nhanh.

---

## Đồng bộ hóa Mạng Đa Phiên bản

Khác với các máy chủ vanilla chỉ tuần tự hóa đồ thị lệnh cho Java Edition, Pumpkin động đồng bộ hóa cây lệnh đã đăng ký qua cả hai client Java và Bedrock:

### 1. Java Edition: Gói tin `CCommands`
Khi người chơi tham gia hoặc mức quyền của họ được cập nhật (ví dụ: qua `/op` hoặc `/deop`), Pumpkin xây dựng và gửi một gói tin `CCommands` (`pumpkin_protocol::java::client::play::CCommands`):
- Chuyển đổi `AttachedNode` thành một mảng phẳng các mục `ProtoNode`.
- Lọc bỏ các lệnh bị vô hiệu hóa và các node mà `requirements.evaluate(source)` trả về `false`.
- Tuần tự hóa các bộ phân tích đối số (`brigadier:string`, `brigadier:integer`, `minecraft:entity`, v.v.) và các định danh gợi ý client-side.

### 2. Bedrock Edition: Gói tin `CAvailableCommands`
Bedrock Edition sử dụng định dạng nạp chồng và enum thay vì đồ thị đệ quy của Brigadier. Trong `client_suggestions.rs`, Pumpkin duyệt qua cây `AttachedNode` để tổng hợp:
- **`CommandData`**: Tên lệnh gốc, mô tả, cờ quyền, và bí danh.
- **`OverloadData`**: Các hoán vị được làm phẳng của chuỗi đối số dẫn đến các điểm cuối có thể thực thi.
- **`ParamData`**: Các kiểu tham số Bedrock, cờ bit (`ARG_FLAG_VALID`, `ARG_FLAG_ENUM`), và các bảng giá trị enum được thu thập động.

---

## Mục tiêu Thực thi Chung

Các lệnh Pumpkin có thể được thực thi qua nhiều người gửi khác nhau:

| Người gửi | Biểu đại diện Nguồn | Đích đầu ra | Quyền mặc định |
| :--- | :--- | :--- | :--- |
| **Người chơi** | `CommandSender::Player(Arc<Player>)` | Gói tin trò chuyện hệ thống client | Được tải từ cấp quyền / tệp quyền |
| **Bảng điều khiển Máy chủ** | `CommandSender::Console` | stdout tiêu chuẩn (`tracing::info!`) | Cấp 4 (Bỏ qua quản trị đầy đủ) |
| **Bảng điều khiển RCON** | `CommandSender::Rcon(Arc<Mutex<Vec<String>>>)` | Tải trọng gói tin phản hồi mạng | Cấp 4 |
| **Khối Lệnh** | `CommandSender::CommandBlock(Arc<CommandBlockEntity>, Arc<World>)` | Trường NBT `LastOutput` | Cấp 2 |
| **Hàm Datapack** | `CommandSender` kế thừa từ người gọi | Kế thừa | Kế thừa |
| **Plugin WASM** | Được gọi qua host call WIT `execute_command` | Được bắt qua `ResultDeferrer` | Có thể cấu hình |

---

## Cấu hình Lệnh & Vô hiệu hóa

Pumpkin cho phép quản trị viên máy chủ vô hiệu hóa các lệnh riêng lẻ qua `config/commands.toml` (`CommandsConfig`). Khi một lệnh bị vô hiệu hóa:
1. Nó bị loại bỏ khỏi gói tin `CCommands` cho client Java.
2. Nó bị loại bỏ khỏi gói tin `CAvailableCommands` cho client Bedrock.
3. Tự động hoàn thành bỏ qua hoàn toàn lệnh.
4. Bất kỳ nỗ lực nào để gọi lệnh đều trả về `DISPATCHER_UNKNOWN_COMMAND`.
