# Viết một Trình xử lý Lệnh (Command Handler)

Trong Minecraft, các câu lệnh (commands) là phương thức chính để cả những người chơi thông thường và những quản trị viên (server operators) có thể tương tác với trò chơi ở một cấp độ thấp hơn. Chúng có thể được sử dụng để thực thi một loạt các tác vụ khác nhau, từ các câu lệnh gửi tin nhắn chat đơn giản cho đến các lệnh quản lý server phức tạp. Trong bài hướng dẫn này, chúng ta sẽ tạo một trình xử lý lệnh oẳn tù tì (Rock-Paper-Scissors) cơ bản cho phép người chơi tham gia trò chơi này với server.

Pumpkin có một hệ thống thao tác các lệnh (handling commands) riêng biệt, được xây dựng xoay quanh việc mỗi command sở hữu một 'cây lệnh' (tree), thứ giúp định nghĩa vị trí cấu trúc chính xác của lệnh và các đối số (arguments) của nó. Mỗi một nhánh phụ bên trong cây đại diện cho một command hoặc một argument, và cây được duyệt qua để thu thập kết quả và quyết định command nào sẽ được đưa vào thực thi cùng các tham số (parameters) của nó.

Các commands trong Pumpkin được xử lý bất đồng bộ (asynchronous), có nghĩa là chúng không bao giờ gây chặn (block) thread chính giữa lúc chúng đang được thực thi. Điều này giúp tối ưu hóa hiệu quả khi sử dụng tài nguyên hệ thống và đem lại một trải nghiệm sử dụng mượt mà hơn.

Chúng tôi cũng muốn gửi lời cảm ơn tới [ploxxxy](https://github.com/ploxxxy) vì đã viết [plugin Rock-Paper-Scissors](https://github.com/ploxxxy/rock-paper-scissors-mc) gốc mà bài hướng dẫn này được dựa trên.

## Thêm những thứ cơ bản

Mỗi lệnh trong Pumpkin được định nghĩa là một cấu trúc (structure) dùng để implement cho trait `CommandExecutor`. Trait này bắt buộc phải implement method tên `execute`, thứ sẽ đón nhận các parameters bao gồm sender, server và consumed arguments đi theo, và sau đó trả về một `-> Result<(), CommandError>`. Bây giờ chúng ta hãy cùng xác định structure này:

```rs
use pumpkin::{
    command::{ // [!code ++:4]
        args::ConsumedArgs, dispatcher::CommandError, tree::builder::literal, tree::CommandTree,
        CommandExecutor, CommandSender,
    },
    plugin::{player::player_join::PlayerJoinEvent, Context, EventHandler, EventPriority},
    server::Server,
};

struct RockPaperScissorsExecutor; // [!code ++]

impl CommandExecutor for RockPaperScissorsExecutor {
    fn execute<'a>(
        &self,
        sender: &mut CommandSender,
        _: &Server,
        _: &ConsumedArgs<'a>,
    ) -> Result<(), CommandError> {
        Box::pin(async {
            Ok(())
        })
    }
}
```

Mã trên chỉ định ra một phần cấu trúc trống `RockPaperScissorsExecutor` chịu trách nhiệm implement trait `CommandExecutor`. Method `execute` được định nghĩa sẵn để trả về giá trị `Ok(())` mỗi khi được gọi tới.

## Bổ sung các enums trợ giúp (helper enums)

Nhằm làm cho thao tác phần này dễ thở hơn chút, chúng ta cũng sẽ tiến hành định nghĩa một vài enum đại diện cho các lựa chọn và kết quả của trò chơi, cũng như thiết lập một vài hàm (functions) tiện ích có công dụng trích suất các lựa chọn ngẫu nhiên và theo dõi kết quả. Trực tiếp thêm những đoạn mã này vào trong code plugin của bạn.

```rs
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

Và tiếp theo chúng ta cần sửa đổi lại cho struct `RockPaperScissorsExecutor` để có thể nhận thêm parameter `Choice` và thực thi lôgic (logic) của trò chơi.

```rs
struct RockPaperScissorsExecutor(Choice); // [!code ++]
struct RockPaperScissorsExecutor; // [!code --]

impl CommandExecutor for RockPaperScissorsExecutor {
    fn execute<'a>(
        &self,
        sender: &mut CommandSender,
        _: &Server,
        _: &ConsumedArgs<'a>,
    ) -> Result<(), CommandError> {
        Box::pin(async move { // [!code ++:3]
            let player_choice = self.0; 
            let computer_choice = get_random_choice();
            Ok(())
        })
    }
}
```

Đoạn mã này sẽ trao cho chúng ta được quyền chèn lựa chọn của người chơi vào và tái sử dụng nó bên trong game logic, cũng như việc tính toán so sánh nó với lựa chọn của máy tính xem để đoạt được kết quả của trò chơi ra làm sao.

## Triển khai quy luật (Game Logic) của trò chơi

Bây giờ chúng ta sẽ đi vào phần quan trọng nhất - Triển khai game logic của trò chơi, ngoài ra cũng trình chiếu kết xuất của trận đấu đó để cho người chơi có thể xem.

Đầu tiên chúng ta sẽ show phía người chơi chi tiết những thứ mà họ và máy tính đang thao tác chọn. Hãy dán mã code này vào plugin của bạn:

```rs
impl CommandExecutor for RockPaperScissorsExecutor {
    fn execute<'a>(
        &self,
        sender: &mut CommandSender,
        _: &Server,
        _: &ConsumedArgs<'a>,
    ) -> Result<(), CommandError> {
        Box::pin(async move {
            let player_choice = self.0;
            let computer_choice = get_random_choice();
            
            sender // [!code ++:15]
                .send_message(
                    TextComponent::text("You chose: ")
                        .add_text(format!("{:?}", player_choice))
                        .color_named(NamedColor::Aqua),
                )
                .await;

            sender
                .send_message(
                    TextComponent::text("I chose: ")
                        .add_text(format!("{:?}", computer_choice))
                        .color_named(NamedColor::Gold),
                )
                .await;
            
            Ok(())
        })
    }
}
```

Phần kế tiếp là tính toán kết quả cuối cùng để hiển thị cho người chơi thông qua chat. Tiếp tục thêm đoạn này vào plugin:

```rs
impl CommandExecutor for RockPaperScissorsExecutor {
    fn execute<'a>(
        &self,
        sender: &mut CommandSender,
        _: &Server,
        _: &ConsumedArgs<'a>,
    ) -> Result<(), CommandError> {
        Box::pin(async move {
            // Bao gồm những code đã nạp tại đây
            

            match player_choice.beats(&computer_choice) { // [!code ++:19]
                Outcome::Win => {
                    sender
                        .send_message(TextComponent::text("You win!").color_named(NamedColor::Green))
                        .await;
                }
                Outcome::Lose => {
                    sender
                        .send_message(TextComponent::text("You lose!").color_named(NamedColor::Red))
                        .await;
                }
                Outcome::Draw => {
                    sender
                        .send_message(
                            TextComponent::text("It's a tie!").color_named(NamedColor::Yellow),
                        )
                        .await;
                }
            }
            
            Ok(())
        })
    }
}
```

Đó là tất cả! Các logic lõi (core logic) chính coi như đã làm xong. Hiện tại chúng ta mới chỉ còn lại duy nhất một thứ cần phải làm trước khi dứt.

## Đóng gói Build và đăng ký (register) cơ sở command tree

Giống như đã nói trước lúc nãy, chúng ta đòi hỏi phải xây dựng một cây mệnh lệnh (command tree) và chốt đăng ký nó với phía server. Điều đó sẽ cấp phép cho lượng người chơi khả năng thi hành câu lệnh do plugin thao túng.

Việc thiết đặt cho command tree không khó cho lắm, tuy vậy đòi hỏi rằng ít nhất phải am hiểu chắc cấu trúc của bản thân lệnh là cái gì cùng với danh sách arguments đầu vào của nó. Nằm trong số lần ví dụ này, chúng ta hiện tại có sẵn lệnh mang danh là `rock-paper-scissors` rồi, cái lệnh đó sẽ cần sử dụng tới duy nhất một argument yêu cầu (lựa chọn của người chơi).

Nhánh phả hệ mang định dạng command tree được khai tạo bằng việc sử dụng function `CommandTree::new()`. Function này sẽ đòi hỏi 2 argument: mảng danh sách tên, với phần tử đầu tiên chính là tên gọi gốc (main command name), cùng một vài bí danh (alias) cho cái lệnh đó nữa; một nhóm nói thêm là phần command description là nơi dùng để gắn chuỗi dữ liệu miêu tả tính năng trong bảng help menu. Chúng ta có thể bổ sung các phụ tùng nhánh (branches) cho cây này bằng cách sử dụng lệnh `.then()`. Method này đồng thời chấp nhận các cấu trúc mang chức năng 'lá' (leaf) cấu thành và sinh trưởng thông qua các hàm built với `literal()`, `argument()`, hay `require()`.

Đến với mệnh lệnh rock-paper-scissors, chúng ta tiến hành chia 3 nhánh rời rạc rải rác, và dĩ nhiên mỗi nhánh mang theo lá mộc được thêu dệt theo định chuẩn mang nốt tên là `literal()` dành cho mỗi lựa chọn của người tham chơi. Ta đăng ký command tree trên server với `PermissionLvl` được quy thành `Zero` để mấu chốt là bất kỳ đối tượng nào cũng có thể gọi command được. Hãy dán đoạn code đó vào lòng `on_load()` method:

```rs
use pumpkin_util::PermissionLvl; // [!code ++]

const NAMES: [&str; 2] = ["rps", "rockpaperscissors"]; // [!code ++:2]
const DESCRIPTION: &str = "Play Rock Paper Scissors with the server.";

#[plugin_method]
async fn on_load(&mut self, server: Arc<Context>) -> Result<(), String> {
    server.init_log();

    log::info!("Hello, Pumpkin!");

    server.register_event(Arc::new(MyJoinHandler), EventPriority::Lowest, true).await;
    
    let command = CommandTree::new(NAMES, DESCRIPTION) // [!code ++:6]
        .then(literal("rock").execute(RockPaperScissorsExecutor(Choice::Rock)))
        .then(literal("paper").execute(RockPaperScissorsExecutor(Choice::Paper)))
        .then(literal("scissors").execute(RockPaperScissorsExecutor(Choice::Scissors)));

    server.register_command(command, PermissionLvl::Zero).await;

    Ok(())
}
```

Vậy đó! Tất cả thế là xong rồi. Nếu bạn tiến hành compile cái phần plugin, thì hãy vào dùng để mở cơ trải nghiệm chạy thử bằng việc gọi dòng lệnh này xem:

```bash
/rps rock
```
