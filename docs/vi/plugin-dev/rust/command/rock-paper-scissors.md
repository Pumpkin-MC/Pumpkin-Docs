# Viết một Command Handler

Trong Minecraft, các lệnh (command) là phương thức chính để cả người chơi thông thường và quản trị viên máy chủ (server operator) tương tác với trò chơi ở cấp độ thấp hơn. Chúng có thể được sử dụng để thực hiện nhiều nhiệm vụ khác nhau, từ tin nhắn trò chuyện đơn giản đến các lệnh quản lý máy chủ phức tạp. Trong bài hướng dẫn này, chúng ta sẽ tạo một command handler Oẳn Tù Tì (Rock-Paper-Scissors) cơ bản cho phép người chơi chơi trò chơi này với máy chủ.

Pumpkin có hệ thống xử lý lệnh riêng, dựa trên việc mỗi lệnh có một 'cây' (tree), định nghĩa cấu trúc chính xác của lệnh và các đối số (argument) của nó. Mỗi nút (node) trong cây đại diện cho một lệnh hoặc đối số, và cây sẽ được duyệt để xác định lệnh cần thực thi cùng các tham số của nó.

Chúng tôi cũng muốn gửi lời cảm ơn đến [ploxxxy](https://github.com/ploxxxy) vì đã viết [plugin Rock-Paper-Scissors](https://github.com/ploxxxy/rock-paper-scissors-mc) gốc mà bài hướng dẫn này dựa trên.

## Thêm các phần cơ bản

Mỗi lệnh trong Pumpkin được định nghĩa dưới dạng một struct triển khai (implement) trait `CommandHandler`. Trait này yêu cầu triển khai một phương thức `handle`, phương thức này nhận sender, server và các argument đã tiêu thụ (consumed arguments) làm tham số, và trả về `-> Result<(), CommandError>`. Hãy định nghĩa struct này ngay bây giờ:

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

Đoạn mã này định nghĩa một struct rỗng `RockPaperScissorsExecutor` triển khai trait `CommandExecutor`. Phương thức `handler` được định nghĩa để trả về `Ok(1)` khi được gọi.

## Thêm các enum hỗ trợ

Trước tiên, hãy cài đặt crate `rand` thông qua

```bash
cargo add rand
```

Để thuận tiện hơn, chúng ta cũng sẽ định nghĩa một vài enum đại diện cho các lựa chọn và kết quả có thể có của trò chơi, cũng như một vài hàm để tạo lựa chọn ngẫu nhiên và kiểm tra kết quả. Thêm những nội dung này vào mã nguồn plugin của bạn.

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

Bây giờ chúng ta cần chỉnh sửa struct `RockPaperScissorsExecutor` để nhận một tham số `Choice` và triển khai logic trò chơi.

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

Đoạn mã này sẽ cho phép chúng ta truyền lựa chọn của người chơi vào sau đó và sử dụng nó trong logic trò chơi, cũng như so sánh nó với lựa chọn của máy tính để xác định kết quả trò chơi.

## Triển khai Logic Trò chơi

Bây giờ chúng ta có thể chuyển sang phần thực sự triển khai logic trò chơi và hiển thị kết quả cho người chơi.

Đầu tiên, chúng ta sẽ hiển thị cho người chơi thấy lựa chọn của họ và của máy tính. Thêm đoạn mã này vào plugin của bạn:

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
        let you_chose = TextComponent::text("You chose: ");
        you_chose.add_child(TextComponent::text(&format!("{:?}", player_choice)));
        you_chose.color_named(NamedColor::Aqua);
        sender.send_message(you_chose);

        let i_chose = TextComponent::text("I chose: ");
        i_chose.add_child(TextComponent::text(&format!("{:?}", computer_choice)));
        i_chose.color_named(NamedColor::Gold);
        sender.send_message(i_chose);
    }
}
```

Tiếp theo, chúng ta có thể tính toán kết quả trò chơi và hiển thị nó cho người chơi. Thêm đoạn mã này vào plugin của bạn:

```rust
impl CommandHandler for RockPaperScissorsExecutor {
    fn handle(
        &self,
        sender: CommandSender,
        _server: Server,
        _args: ConsumedArgs,
    ) -> Result<i32, CommandError> {
        // Existing Code

        match player_choice.beats(&computer_choice) { // [!code ++:17]
            Outcome::Win => {
                let message = TextComponent::text("You win!");
                message.color_named(NamedColor::Green);
                sender.send_message(message);
            }
            Outcome::Lose => {
                let message = TextComponent::text("You lose!");
                message.color_named(NamedColor::Red);
                sender.send_message(message);
            }
            Outcome::Draw => {
                let message = TextComponent::text("It's a tie!");
                message.color_named(NamedColor::Yellow);
                sender.send_message(message);
            }
        }
        
        Ok(1)
    }
}
```

Và vậy là xong! Logic cốt lõi đã hoàn tất. Giờ chúng ta chỉ còn một việc cuối cùng phải làm.

## Xây dựng và đăng ký cây lệnh

Như đã trình bày ở trên, chúng ta cần xây dựng một cây lệnh (command tree) và đăng ký nó với máy chủ. Điều này sẽ cho phép người chơi thực thi các lệnh của plugin.

Việc xây dựng một cây lệnh không quá khó, nhưng bạn phải biết cấu trúc chính xác của lệnh và các đối số của nó. Trong trường hợp này, chúng ta có một lệnh tên là `rock-paper-scissors`, nhận một đối số bắt buộc (lựa chọn của người chơi).

Cây lệnh được khởi tạo bằng hàm `Command::new()`. Hàm này nhận hai đối số: một danh sách các tên, trong đó tên đầu tiên là tên lệnh chính và các tên còn lại là tên thay thế (alias) cho lệnh; và một mô tả lệnh được sử dụng để mô tả lệnh trong menu trợ giúp (help menu). Sau đó, chúng ta có thể thêm các 'nhánh' (branch) vào cây bằng phương thức `.then()`. Phương thức này chấp nhận một 'lá' (leaf) có thể được tạo bằng các hàm `CommandNode::literal()`, `CommandNode::argument()`, hoặc `CommandNode::require()`.

Đối với lệnh rock-paper-scissors, chúng ta sẽ tạo 3 nhánh riêng biệt, mỗi nhánh có một nút lá `CommandNode::literal()` cho lựa chọn của người chơi. Chúng ta cũng sẽ đăng ký cây lệnh với máy chủ cùng một `permission` là `hello-pumpkin:command.rockpaperscisors`, cho phép bất kỳ ai có quyền đó đều có thể thực thi lệnh. Thêm đoạn mã sau vào phương thức `on_load()` của bạn:

```rust
struct HelloPlugin;
impl Plugin for HelloPlugin {
    fn new() -> Self {
        HelloPlugin
    }

    fn metadata(&self) -> PluginMetadata {
        // Existing Code
    }

    fn on_load(&mut self, context: Context) -> pumpkin_plugin_api::Result<()> {
        // Existing Code

        let command = Command::new( // [!code ++:20]
            &["rps".to_string(), "rockpaperscissors".to_string()],
            "Play Rock Paper Scissors with the server.",
        );
        command.then(CommandNode::literal("rock").execute(RockPaperScissorsExecutor(Choice::Rock)));
        command
            .then(CommandNode::literal("paper").execute(RockPaperScissorsExecutor(Choice::Paper)));
        command.then(
            CommandNode::literal("scissors").execute(RockPaperScissorsExecutor(Choice::Scissors)),
        );

        let permission = Permission {
            node: "hello-pumpkin:command.rockpaperscisors".to_string(),
            description: "Allows the player to play rock paper scisors".to_string(),
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