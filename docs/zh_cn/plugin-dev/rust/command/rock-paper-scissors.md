# 编写命令处理器

在 Minecraft 中，命令是普通玩家和服务器管理员与游戏进行底层交互的主要方式。
命令可用于执行各种任务，从简单的聊天消息到复杂的服务器管理命令。
在本教程中，我们将创建一个基本的石头剪刀布命令处理器，让玩家可以与服务器对局。

Pumpkin 拥有自己的命令处理系统，其核心是每个命令都有一棵“树”，
用于定义命令及其参数的确切结构。树中的每个节点代表一个命令或参数，
系统通过遍历这棵树来确定要执行的命令及其参数。

我们还要感谢 [ploxxxy](https://github.com/ploxxxy) 编写了本教程所依据的原始
[石头剪刀布插件](https://github.com/ploxxxy/rock-paper-scissors-mc)。

## 添加基础功能

Pumpkin 中的每个命令都定义为一个实现 `CommandHandler` trait 的结构体。
该 trait 要求实现 `handle` 方法，该方法以发送者、服务器和已消费的参数为参数，
并返回 `-> Result<(), CommandError>`。现在我们来定义这个结构体：

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

这段代码定义了一个空结构体 `RockPaperScissorsExecutor`，它实现了
`CommandExecutor` trait。其 `handler` 方法被定义为在调用时返回 `Ok(1)`。

## 添加辅助枚举

首先通过以下命令安装 `rand` crate：

```bash
cargo add rand
```

为了简化开发，我们还将定义两个枚举来表示游戏中可能的选择和结果，
并定义几个函数来生成随机选择和检查结果。将这些内容添加到您的插件代码中。

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

现在，我们需要修改 `RockPaperScissorsExecutor` 结构体，使其接受一个 `Choice` 参数，
并实现游戏逻辑。

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

这段代码使我们能够稍后传入玩家的选择并在游戏逻辑中使用它，
还能将其与计算机的选择进行比较，以确定游戏结果。

## 实现游戏逻辑

现在，我们可以着手实际实现游戏逻辑，并向玩家展示结果。

首先，我们将向玩家展示其本人和计算机的选择。将以下代码添加到您的插件中：

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

接下来，我们可以计算游戏结果并将其展示给玩家。将以下代码添加到您的插件中：

```rust
impl CommandHandler for RockPaperScissorsExecutor {
    fn handle(
        &self,
        sender: CommandSender,
        _server: Server,
        _args: ConsumedArgs,
    ) -> Result<i32, CommandError> {
        // 现有代码

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

就是这样！核心逻辑已完成。现在我们只剩最后一件事要做。

## 构建并注册命令树

如前所述，我们需要构建一棵命令树并将其注册到服务器。
这样，玩家就能执行我们插件的命令。

构建命令树并不困难，但您必须了解命令及其参数的确切结构。
在本例中，我们有一个名为 `rock-paper-scissors` 的命令，
它接受一个必需参数（玩家的选择）。

命令树使用 `Command::new()` 函数初始化。该函数接受两个参数：
一个名称列表，其中第一个是主命令名称，其余是命令别名；
以及一个用于在帮助菜单中描述该命令的命令描述。
然后，我们可以使用 `.then()` 方法向树中添加“分支”。此方法接受一个“叶节点”，
该节点可以使用 `CommandNode::literal()`、`CommandNode::argument()` 或
`CommandNode::require()` 函数构建。

对于石头剪刀布命令，我们将创建 3 个独立分支，
每个分支都有一个代表玩家选择的 `CommandNode::literal()` 叶节点。
我们还会向服务器注册该命令树，并将 `permission` 设为
`hello-pumpkin:command.rockpaperscisors`，允许拥有该权限的任何人执行此命令。
将以下代码添加到您的 `on_load()` 方法中：

```rust
struct HelloPlugin;
impl Plugin for HelloPlugin {
    fn new() -> Self {
        HelloPlugin
    }

    fn metadata(&self) -> PluginMetadata {
        // 现有代码
    }

    fn on_load(&self, context: Context) -> pumpkin_plugin_api::Result<()> {
        // 现有代码

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

就是这样！编译插件后，您可以通过运行以下命令来测试它：

```bash
/rps rock
```
