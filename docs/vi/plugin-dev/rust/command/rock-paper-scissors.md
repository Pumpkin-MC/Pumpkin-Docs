# Viết Command Handler

Trong Minecraft, lệnh là cách chính để cả người chơi thông thường và người vận hành server tương tác với game ở mức thấp hơn. Chúng có thể được sử dụng để thực hiện nhiều nhiệm vụ, từ tin nhắn chat đơn giản đến các lệnh quản lý server phức tạp. Trong hướng dẫn này, chúng ta sẽ tạo một command handler Oẳn-Tù-Tì cơ bản cho phép người chơi chơi trò chơi với server.

Pumpkin có hệ thống riêng để xử lý lệnh, dựa trên mỗi lệnh có một 'cây', định nghĩa chính xác cấu trúc của lệnh và các đối số của nó. Mỗi nút trong cây đại diện cho một lệnh hoặc đối số, và cây được duyệt để xác định lệnh để thực thi và các tham số của nó.

Chúng tôi cũng muốn cảm ơn [ploxxxy](https://github.com/ploxxxy) vì đã viết [plugin Oẳn-Tù-Tì gốc](https://github.com/ploxxxy/rock-paper-scissors-mc) mà hướng dẫn này dựa trên.

## Thêm các phần cơ bản

Mỗi lệnh trong Pumpkin được định nghĩa là một cấu trúc triển khai trait `CommandHandler`. Trait này yêu cầu triển khai phương thức `handle`, nhận sender, server và các đối số đã tiêu thụ làm tham số, và trả về `-> Result<(), CommandError>`. Hãy định nghĩa cấu trúc này ngay bây giờ:

```rust
use pumpkin_plugin_api::{
    Server,
    command::{CommandError, CommandSender, ConsumedArgs},
    commands::CommandHandler,
};

struct RockPaperScissorsExecutor;
impl CommandHandler for RockPaperScissorsExecutor {
    fn handle(
        &self,
        _sender: CommandSender,
        _server: Server,
        _args: ConsumedArgs,
    ) -> Result<i32, CommandError> {
        Ok(1)
    }
}
```

Mã này định nghĩa một cấu trúc rỗng `RockPaperScissorsExecutor` triển khai trait `CommandExecutor`. Phương thức `handler` được định nghĩa để trả về `Ok(1)` khi được gọi.

## Thêm enum hỗ trợ

Đầu tiên hãy cài đặt crate `rand` qua

```bash
cargo add rand
```

Để làm cho cuộc sống của chúng ta dễ dàng hơn, chúng ta cũng sẽ định nghĩa một vài enum để đại diện cho các lựa chọn và kết quả có thể có của trò chơi, cũng như một vài hàm để tạo lựa chọn ngẫu nhiên và kiểm tra kết quả. Thêm những thứ này vào mã plugin của bạn.

```rust
use rand::{rng, Rng};

#[derive(PartialEq, Debug, Clone, Copy)]
enum Choice {
    Rock,
    Paper,
    Scissors,
}

enum Outcome {
    Win,
    Lose,
    Draw,
}

impl Choice {
    pub fn beats(&self, other: &Choice) -> Outcome {
        if self == other {
            return Outcome::Draw;
        }

        match (self, other) {
            (Choice::Rock, Choice::Scissors) => Outcome::Win,
            (Choice::Paper, Choice::Rock) => Outcome::Win,
            (Choice::Scissors, Choice::Paper) => Outcome::Win,
            _ => Outcome::Lose,
        }
    }
}

fn get_random_choice() -> Choice {
    let choices = [Choice::Rock, Choice::Paper, Choice::Scissors];
    let index = rng().random_range(0..3);
    choices[index]
}
```

Bây giờ chúng ta cần sửa đổi struct `RockPaperScissorsExecutor` để chấp nhận tham số `Choice` và triển khai logic trò chơi.

```rust
struct RockPaperScissorsExecutor(Choice); // [!code ++]
struct RockPaperScissorsExecutor; // [!code --]

impl CommandHandler for RockPaperScissorsExecutor {
    fn handle(
        &self,
        sender: CommandSender,
        _server: Server,
        _args: ConsumedArgs,
    ) -> Result<i32, CommandError> {
        let player_choice = self.0; // [!code ++:3]
        let computer_choice = get_random_choice();
        Ok(1)
    }
}
```

Mã này sẽ cho phép chúng ta sau này truyền vào lựa chọn của người chơi và sử dụng nó trong logic trò chơi, cũng như so sánh nó với lựa chọn của máy tính để xác định kết quả của trò chơi.

## Triển khai Logic Trò chơi

Bây giờ chúng ta có thể tiến hành triển khai logic trò chơi thực tế, và hiển thị kết quả cho người chơi.

Đầu tiên chúng ta sẽ cho người chơi thấy lựa chọn của họ và của máy tính. Thêm mã này vào plugin của bạn:

```rust
impl CommandHandler for RockPaperScissorsExecutor {
    fn handle(
        &self,
        sender: CommandSender,
        _server: Server,
        _args: ConsumedArgs,
    ) -> Result<i32, CommandError> {
        let player_choice = self.0;
        let computer_choice = get_random_choice();
        
        // [!code ++:9]
        let you_chose = TextComponent::text("Bạn chọn: ");
        you_chose.add_child(TextComponent::text(&format!("{:?}", player_choice)));
        you_chose.color_named(NamedColor::Aqua);
        sender.send_message(you_chose);

        let i_chose = TextComponent::text("Tôi chọn: ");
        i_chose.add_child(TextComponent::text(&format!("{:?}", computer_choice)));
        i_chose.color_named(NamedColor::Gold);
        sender.send_message(i_chose);
    }
}
```

Tiếp theo chúng ta có thể tính toán kết quả trò chơi và hiển thị cho người chơi. Thêm mã này vào plugin của bạn:

```rust
impl CommandHandler for RockPaperScissorsExecutor {
    fn handle(
        &self,
        sender: CommandSender,
        _server: Server,
        _args: ConsumedArgs,
    ) -> Result<i32, CommandError> {
        // Mã hiện có

        match player_choice.beats(&computer_choice) { // [!code ++:17]
            Outcome::Win => {
                let message = TextComponent::text("Bạn thắng!");
                message.color_named(NamedColor::Green);
                sender.send_message(message);
            }
            Outcome::Lose => {
                let message = TextComponent::text("Bạn thua!");
                message.color_named(NamedColor::Red);
                sender.send_message(message);
            }
            Outcome::Draw => {
                let message = TextComponent::text("Hòa!");
                message.color_named(NamedColor::Yellow);
                sender.send_message(message);
            }
        }
        
        Ok(1)
    }
}
```

Và thế là xong! Logic cốt lõi đã hoàn tất. Bây giờ chúng ta chỉ còn một việc cuối cùng phải làm.

## Xây dựng và đăng ký cây lệnh

Như đã nói ở trên, chúng ta cần xây dựng một cây lệnh và đăng ký nó với server. Điều này sẽ cho phép người chơi thực thi các lệnh của plugin.

Xây dựng một cây lệnh không khó lắm, nhưng bạn phải biết cấu trúc chính xác của lệnh và các đối số của nó. Trong trường hợp này, chúng ta có một lệnh có tên `rock-paper-scissors`, lệnh này sẽ nhận một đối số bắt buộc (lựa chọn của người chơi).

Cây lệnh được khởi tạo bằng hàm `Command::new()`. Hàm này nhận hai đối số: một danh sách các tên, trong đó tên đầu tiên là tên lệnh chính, và các tên khác là alias cho lệnh; và mô tả lệnh được sử dụng để mô tả lệnh trong menu trợ giúp. Sau đó chúng ta có thể thêm các 'nhánh' vào cây bằng phương thức `.then()`. Phương thức này chấp nhận một 'lá' có thể được xây dựng bằng các hàm `CommandNode::literal()`, `CommandNode::argument()`, hoặc `CommandNode::require()`.

Đối với lệnh oẳn-tù-tì, chúng ta sẽ tạo 3 nhánh riêng biệt, mỗi nhánh có một nút lá `CommandNode::literal()` cho lựa chọn của người chơi. Chúng ta cũng sẽ đăng ký cây lệnh với server và với một `permission` là `hello-pumpkin:command.rockpaperscisors` điều này sẽ cho phép bất kỳ ai có permission đó thực thi lệnh. Thêm mã sau vào phương thức `on_load()` của bạn:

```rust
struct HelloPlugin;
impl Plugin for HelloPlugin {
    fn new() -> Self {
        HelloPlugin
    }

    fn metadata(&self) -> PluginMetadata {
        // Mã hiện có
    }

    fn on_load(&self, context: Context) -> pumpkin_plugin_api::Result<()> {
        // Mã hiện có

        let command = Command::new( // [!code ++:20]
            &["rps".to_string(), "rockpaperscissors".to_string()],
            "Chơi Oẳn Tù Tì với server.",
        );
        command.then(CommandNode::literal("rock").execute(RockPaperScissorsExecutor(Choice::Rock)));
        command
            .then(CommandNode::literal("paper").execute(RockPaperScissorsExecutor(Choice::Paper)));
        command.then(
            CommandNode::literal("scissors").execute(RockPaperScissorsExecutor(Choice::Scissors)),
        );

        let permission = Permission {
            node: "hello-pumpkin:command.rockpaperscisors".to_string(),
            description: "Cho phép người chơi chơi oẳn tù tì".to_string(),
            default: PermissionDefault::Allow,
            children: Vec::new(),
        };
        
        context.register_permission(&permission)?;
        context.register_command(command, "hello-pumpkin:command.rockpaperscisors");
        Ok(())
    }
}
```

Và thế là xong! Nếu bạn biên dịch plugin, bạn có thể kiểm tra nó bằng cách chạy lệnh sau:

```bash
/rps rock
```
