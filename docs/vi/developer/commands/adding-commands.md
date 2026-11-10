# Thêm một Lệnh

Hướng dẫn này giải thích cách triển khai và đăng ký một lệnh mới trong mã nguồn máy chủ Pumpkin.

Các lệnh trong Pumpkin được triển khai trong thư mục `crates/pumpkin/src/command/commands/` và đăng ký vào [`CommandDispatcher`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-command/src/node/dispatcher.rs) trung tâm trong quá trình khởi tạo máy chủ.

---

## Cấu trúc của một Lệnh Pumpkin

Một tệp lệnh điển hình chứa:
1. **Các Hằng số Siêu dữ liệu**: Mô tả lệnh, định danh node quyền, và tên đối số.
2. **Đăng ký Quyền**: Khai báo các yêu cầu OP mặc định trong [`PermissionRegistry`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-util/src/permission.rs) của máy chủ.
3. **Các Bộ thực thi Lệnh**: Các struct triển khai trait [`CommandExecutor`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-command/src/node/mod.rs) cho mỗi node cuối hoặc lệnh con.
4. **Hàm Đăng ký**: Xây dựng cây đối số bằng các builder trôi chảy (`command`, `literal`, `argument`).

---

## Triển khai Từng bước: Tạo `/heal`

Hãy triển khai một lệnh `/heal` hoàn chỉnh có thể hồi máu cho người chơi đang thực thi hoặc một tập hợp các người chơi mục tiêu:

```
/heal                 -> Hồi máu cho người gửi đang thực thi
/heal <targets>       -> Hồi máu cho người chơi mục tiêu
/heal <targets> <amount> -> Hồi máu cho người chơi mục tiêu với lượng chỉ định
```

### 1. Tạo Tệp

Tạo `crates/pumpkin/src/command/commands/heal.rs`:

```rust
use std::sync::Arc;

use crate::command::argument_builder::{ArgumentBuilder, argument, command};
use crate::command::argument_types::core::float::FloatArgumentType;
use crate::command::argument_types::entity::EntityArgumentType;
use crate::command::context::command_context::CommandContext;
use crate::command::errors::error_types::CommandErrorType;
use crate::command::node::dispatcher::CommandDispatcher;
use crate::command::node::{CommandExecutor, CommandExecutorResult};
use crate::entity::EntityBase;
use pumpkin_data::translation;
use pumpkin_util::PermissionLvl;
use pumpkin_util::permission::{Permission, PermissionDefault, PermissionRegistry};
use pumpkin_util::text::TextComponent;

const DESCRIPTION: &str = "Restores health to target entities.";
const PERMISSION: &str = "pumpkin:command.heal";

const ARG_TARGETS: &str = "targets";
const ARG_AMOUNT: &str = "amount";

const ERROR_NOT_PLAYER: CommandErrorType<0> = CommandErrorType::new(
    translation::java::PERMISSIONS_REQUIRES_PLAYER,
    translation::java::PERMISSIONS_REQUIRES_PLAYER,
);
```

### 2. Triển khai các Bộ thực thi

Logic thực thi lệnh được đóng gói trong các struct triển khai [`CommandExecutor`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-command/src/node/mod.rs):

```rust
/// Hồi máu cho người chơi đang thực thi đến mức máu tối đa.
struct SelfHealExecutor;

impl CommandExecutor for SelfHealExecutor {
    fn execute(&self, context: &CommandContext) -> CommandExecutorResult {
        let player = context
            .source
            .output
            .as_player()
            .ok_or_else(|| ERROR_NOT_PLAYER.create_without_context())?;

        // Khôi phục máu người chơi
        player.living_entity.set_health(20.0);

        context.source.send_feedback(
            TextComponent::text("Fully restored your health!"),
            true, // Phát sóng đến vận hành viên nếu được cấu hình
        );

        // Trả về số lượng thực thể bị ảnh hưởng
        Ok(1)
    }
}

/// Hồi máu cho các người chơi mục tiêu được chỉ định.
struct TargetsHealExecutor {
    has_amount: bool,
}

impl CommandExecutor for TargetsHealExecutor {
    fn execute(&self, context: &CommandContext) -> CommandExecutorResult {
        let targets = EntityArgumentType::get_players(context, ARG_TARGETS)?;

        let amount = if self.has_amount {
            FloatArgumentType::get(context, ARG_AMOUNT)?
        } else {
            20.0
        };

        let count = targets.len();
        for target in &targets {
            let current = target.living_entity.health.load();
            target.living_entity.set_health((current + amount).min(20.0));
        }

        let msg = if count == 1 {
            TextComponent::text(format!("Healed {} by {} HP", targets[0].gameprofile.name, amount))
        } else {
            TextComponent::text(format!("Healed {} players by {} HP", count, amount))
        };

        context.source.send_feedback(msg, true);

        Ok(count as i32)
    }
}
```

### 3. Xây dựng Cây Lệnh

Sử dụng các hàm builder trôi chảy `command`, `literal`, và `argument` để lắp ráp cây cú pháp và đăng ký quyền:

```rust
pub fn register(dispatcher: &mut CommandDispatcher, registry: &PermissionRegistry) {
    // 1. Đăng ký node quyền với yêu cầu mặc định (cấp OP 2)
    registry.register_permission_or_panic(Permission::new(
        PERMISSION,
        DESCRIPTION,
        PermissionDefault::Op(PermissionLvl::Two),
    ));

    // 2. Lắp ráp cây lệnh
    dispatcher.register(
        command("heal", DESCRIPTION)
            .requires(PERMISSION)
            .executes(SelfHealExecutor)
            .then(
                argument(ARG_TARGETS, EntityArgumentType::Players)
                    .executes(TargetsHealExecutor { has_amount: false })
                    .then(
                        argument(ARG_AMOUNT, FloatArgumentType::new(1.0, 100.0))
                            .executes(TargetsHealExecutor { has_amount: true }),
                    ),
            ),
    );
}
```

---

## Các Mẫu Cấu trúc Lệnh

### Thêm các Từ khóa Lệnh con
Sử dụng `literal("subcommand_name")` để tạo các nhánh từ khóa:

```rust
use crate::command::argument_builder::{argument, command, literal};

dispatcher.register(
    command("weather", "Set the world weather")
        .requires("minecraft:command.weather")
        .then(literal("clear").executes(ClearWeatherExecutor))
        .then(literal("rain").executes(RainWeatherExecutor))
        .then(literal("thunder").executes(ThunderWeatherExecutor))
);
```

### Phản hồi Dịch thuật Đa nền tảng
Các máy chủ Pumpkin phục vụ cả người chơi Java và Bedrock Edition đồng thời. Khi có thể, sử dụng các khóa dịch vanilla với `TextComponent::translate_cross` để tin nhắn hiển thị địa phương hóa trên client:

```rust
use pumpkin_data::translation;
use pumpkin_util::text::TextComponent;

let msg = TextComponent::translate_cross(
    translation::java::COMMANDS_KILL_SUCCESS_SINGLE,
    translation::bedrock::COMMANDS_KILL_SUCCESSFUL,
    [target.get_display_name()],
);

context.source.send_feedback(msg, true);
```

### Xử lý Lỗi trong Bộ thực thi
Các bộ thực thi phải trả về `CommandExecutorResult`, giải thành `Result<i32, CommandSyntaxError>`. Nếu xác thực thất bại, trả về lỗi một cách sạch sẽ mà không panic:

```rust
use crate::command::errors::error_types::CommandErrorType;

const ERROR_INVALID_VALUE: CommandErrorType<0> = CommandErrorType::new(
    "Amount must be greater than zero.",
    "Amount must be greater than zero.",
);

if amount <= 0.0 {
    return Err(ERROR_INVALID_VALUE.create_without_context());
}
```

---

## Đăng ký trong `default_dispatcher`

Sau khi lệnh của bạn được triển khai, đăng ký nó trong `crates/pumpkin/src/command/commands/mod.rs`:

1. **Khai báo Module**:
   ```rust
   // Trong crates/pumpkin/src/command/commands/mod.rs
   mod heal;
   ```

2. **Gọi `register` trong `default_dispatcher`**:
   ```rust
   pub fn default_dispatcher(
       permission_manager: &PermissionManager,
       commands_config: &CommandsConfig,
   ) -> CommandDispatcher {
       let registry = &permission_manager.registry;
       let mut dispatcher = CommandDispatcher::new();

       // ... các đăng ký hiện có ...
       heal::register(&mut dispatcher, registry);

       dispatcher
   }
   ```

---

## Danh sách Kiểm tra Thực hành Tốt nhất

- [ ] **Không Panic hoặc Unwrap**: Sử dụng `?` hoặc trả về `CommandSyntaxError` mô tả khi các đối số không hợp lệ.
- [ ] **Node Quyền**: Tiền tố các chuỗi quyền với các không gian tên thích hợp (`minecraft:command.<name>` cho lệnh vanilla, `pumpkin:command.<name>` cho lệnh đặc thù máy chủ).
- [ ] **Trả về Số lượng Thành công**: `i32` được trả về đại diện cho mã thoát của lệnh hoặc số lượng đối tượng bị ảnh hưởng cho các khối lệnh redstone và `/execute store result`.
- [ ] **Tôn trọng GameRules**: Khi thông báo cho người chơi khác ngoài người gửi, kiểm tra xem `send_command_feedback` có được bật không:
  ```rust
  let server = context.source.server();
  if server.level_info.load().game_rules.send_command_feedback {
      target.send_system_message(&feedback);
  }
  ```
