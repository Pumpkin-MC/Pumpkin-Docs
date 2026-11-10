# Các Kiểu Đối số & Gợi ý

Pumpkin cung cấp một bộ các đối số lệnh an toàn kiểu toàn diện thông qua `pumpkin-command` và crate máy chủ `pumpkin` chính. Các đối số giải tuần tự hóa các luồng token thô thành các kiểu Rust có cấu trúc, xác thực phạm vi, và cung cấp các gợi ý hoàn thành tab cho client.

---

## Các Kiểu Đối số Tiêu chuẩn

Các bộ phân tích đối số triển khai trait [`ArgumentType<S>`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-command/src/argument_types/argument_type.rs). Các kiểu tích hợp sau có sẵn cho các builder lệnh:

### 1. Các Kiểu Nguyên thủy & Vô hướng

| Kiểu Đối số | Đường dẫn Import | Kiểu Đã giải tuần tự hóa | Mô tả |
| :--- | :--- | :--- | :--- |
| **`IntegerArgumentType`** | `...::core::integer` | `i32` | Số nguyên 32-bit tiêu chuẩn với giới hạn `[min, max]` tùy chọn. |
| **`FloatArgumentType`** | `...::core::float` | `f32` | Số dấu chấm động 32-bit với giới hạn. |
| **`DoubleArgumentType`** | `...::core::double` | `f64` | Số dấu chấm động 64-bit với giới hạn. |
| **`LongArgumentType`** | `...::core::long` | `i64` | Số nguyên 64-bit với giới hạn. |
| **`BoolArgumentType`** | `...::core::bool` | `bool` | Giá trị boolean (`true` hoặc `false`). |
| **`StringArgumentType`** | `...::core::string` | `String` | Các token chuỗi dựa trên quy tắc trích dẫn. |

#### Hành vi Đối số Chuỗi
- **`StringArgumentType::Word`**: Phân tích một từ đơn không có khoảng trắng.
- **`StringArgumentType::Quotable`**: Phân tích một từ đơn hoặc cụm từ được trích dẫn (`"hello world"`).
- **`StringArgumentType::Greedy`**: Tiêu thụ tất cả các ký tự còn lại trong luồng đầu vào (lý tưởng cho các lệnh trò chuyện/phát sóng như `/say` và `/me`).

---

## Các Kiểu Đối số Tọa độ

Tọa độ Minecraft hỗ trợ vị trí tuyệt đối, độ dịch chuyển tương đối (`~`), và hướng Caret cục bộ (`^`):

```rust
use crate::command::argument_builder::argument;
use crate::command::argument_types::coordinates::block_pos::BlockPosArgumentType;
use crate::command::argument_types::coordinates::vec3::Vec3ArgumentType;

// Vị trí khối (số nguyên BlockPos)
argument("pos", BlockPosArgumentType)

// Tọa độ thực thể chính xác (f64 Vector3)
argument("location", Vec3ArgumentType)
```

### Lấy Tọa độ Đã Phân tích
Bên trong một bộ thực thi, các đối số tọa độ giải quyết các độ dịch chuyển tương đối so với vị trí và hướng hiện tại của người gửi trong [`CommandSource`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/command/context/command_source.rs):

```rust
// Trích xuất tọa độ f64 đã căn giữa (xử lý ~ và ^ tương đối so với người gửi)
let pos: Vector3<f64> = Vec3ArgumentType::get_coordinates(context, "location")?;

// Trích xuất vị trí khối số nguyên
let block_pos: BlockPos = BlockPosArgumentType::get_block_pos(context, "pos")?;
```

---

## Bộ chọn Thực thể (`EntityArgumentType`)

Bộ chọn thực thể cho phép người chơi và các khối lệnh nhắm mục tiêu các thực thể bằng tên người chơi, UUID, hoặc bộ chọn mục tiêu vanilla (`@p`, `@r`, `@a`, `@e`, `@s`).

Trong Pumpkin, bộ chọn thực thể được truy cập qua [`EntityArgumentType`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/command/argument_types/entity.rs):

```rust
pub enum EntityArgumentType {
    /// Khớp chính xác một người chơi
    Player,
    /// Khớp không hoặc nhiều người chơi
    Players,
    /// Khớp chính xác một thực thể
    Entity,
    /// Khớp không hoặc nhiều thực thể
    Entities,
}
```

### Giải quyết trong Bộ thực thi

```rust
// 1. Nhắm mục tiêu một người chơi đơn
let player: Arc<Player> = EntityArgumentType::get_player(context, "target")?;

// 2. Nhắm mục tiêu nhiều người chơi
let players: Vec<Arc<Player>> = EntityArgumentType::get_players(context, "targets")?;

// 3. Nhắm mục tiêu một thực thể sống hoặc sinh vật đơn
let entity: Arc<dyn EntityBase> = EntityArgumentType::get_entity(context, "target")?;

// 4. Nhắm mục tiêu nhiều thực thể
let entities: Vec<Arc<dyn EntityBase>> = EntityArgumentType::get_entities(context, "targets")?;
```

### Các Cú pháp Bộ chọn Được Hỗ trợ
Bộ phân tích bộ chọn thực thể của Pumpkin (`crates/pumpkin/src/command/argument_types/entity_selector/`) phân tích và xác thực:
- `@p`: Người chơi gần nhất so với tọa độ thực thi.
- `@r`: Người chơi ngẫu nhiên.
- `@a`: Tất cả người chơi trực tuyến.
- `@e`: Tất cả thực thể trong các chunk thế giới đã tải.
- `@s`: Thực thể đang thực thi (`context.source.entity`).
- **Đối số trong Dấu ngoặc**: Lọc các truy vấn như `@e[type=zombie,distance=..10,limit=5,sort=nearest]`.

---

## Các Kiểu Registry & Cơ chế Game

Pumpkin cung cấp các bộ phân tích đối số chuyên biệt cho các kiểu dữ liệu Minecraft:

- **`GameModeArgumentType`**: Giải quyết `survival`, `creative`, `adventure`, `spectator` hoặc ID số `0`–`3`.
- **`BlockArgumentType`**: Phân tích định danh khối và các trạng thái khối (ví dụ: `minecraft:chest[facing=north]`).
- **`ItemArgumentType`**: Phân tích định danh vật phẩm và các thành phần dữ liệu tùy chọn (ví dụ: `minecraft:diamond_sword`).
- **`NbtArgumentType`**: Phân tích các tag SNBT (Stringified NBT) thành biểu diễn NBT của Pumpkin.
- **`TimeArgumentType`**: Phân tích các khoảng thời gian với hậu tố (ví dụ: `10s`, `20t`, `1d`).

---

## Các Nhà cung cấp Gợi ý & Hoàn thành Tab

Các đối số có thể cung cấp các ứng viên hoàn thành tab động cho người chơi được kết nối bằng trait [`SuggestionProvider`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-command/src/suggestion/mod.rs):

```rust
use crate::command::context::command_context::CommandContext;
use crate::command::suggestion::provider::SuggestionProvider;
use pumpkin_command::suggestion::suggestions::{Suggestions, SuggestionsBuilder};

struct CustomSuggestionProvider;

impl SuggestionProvider for CustomSuggestionProvider {
    fn suggest(
        &self,
        context: &CommandContext,
        mut builder: SuggestionsBuilder,
    ) -> Suggestions {
        // Lấy tiền tố token đã nhập
        let remaining = builder.remaining();

        let candidates = ["alpha", "bravo", "charlie"];
        for candidate in candidates {
            if candidate.starts_with(remaining) {
                builder.suggest(candidate);
            }
        }

        builder.build()
    }
}
```

### Đính kèm Gợi ý vào Đối số
Sử dụng phương thức `.suggests(...)` trên `RequiredArgumentBuilder`:

```rust
argument("code", StringArgumentType::Word)
    .suggests(CustomSuggestionProvider)
    .executes(MyExecutor)
```

### Giao thức Hoàn thành Client
- **Java Edition**: Khi người chơi nhấn `Tab`, client truyền gói tin `ServerboundCommandSuggestion`. Pumpkin khớp vị trí con trỏ trong `CommandDispatcher`, thực thi `SuggestionProvider` của node mục tiêu, và phản hồi với `ClientboundCommandSuggestions` chứa các phạm vi hoàn thành và chú giải công cụ.
- **Bedrock Edition**: Các tùy chọn gợi ý cho các từ khóa theo nghĩa đen và enum được tuần tự hóa trước trong gói tin `CAvailableCommands` dưới dạng các bảng giá trị enum động.
