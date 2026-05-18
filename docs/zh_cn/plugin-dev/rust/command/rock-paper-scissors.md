# 编写命令处理器

在 Minecraft 中，命令是普通玩家和服务器管理员在更底层与游戏进行交互的主要方式。
它们可用于执行各种各样的任务，
从简单的聊天消息到复杂的服务器管理命令。
在本教程中，我们将创建一个基本的“石头剪刀布”命令处理器，
让玩家可以与服务器进行游戏。

Pumpkin 有自己的命令处理系统，
该系统基于每个命令都拥有一个“树”结构，该结构定义了命令及其参数的精确语法。
树中的每个节点代表一个命令或参数，
通过遍历这棵树来确定要执行的命令及其参数。

我们还要感谢 [ploxxxy](https://github.com/ploxxxy) 
编写了本教程所基于的原始 
[石头剪刀布插件](https://github.com/ploxxxy/rock-paper-scissors-mc)。

## 添加基础内容

在 Pumpkin 中，每个命令都被定义为一个实现 `CommandHandler` trait 的结构体。
该 trait 要求实现一个 `handle` 方法，
该方法以发送者、服务器和已消耗的参数作为参数，并返回一个 `-> Result<(), CommandError>`。
现在让我们定义这个结构体：

```rs
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

这段代码定义了一个空结构体 `RockPaperScissorsExecutor`，它实现了 `CommandExecutor` trait。
`handler` 方法被定义为在调用时返回 `Ok(1)`。

## 添加辅助枚举

首先通过以下命令安装 `rand` crate

```bash
cargo add rand
```

为了简化操作，我们还将定义几个枚举来表示游戏中可能的选择和结果，
以及几个用于生成随机选择和检查结果的函数。
请将这些添加到您的插件代码中。

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

现在我们需要修改 `RockPaperScissorsExecutor` 结构体，
使其接受一个 `Choice` 参数并实现游戏逻辑。

```rs
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

这段代码将使我们稍后能够传入玩家的选择并在游戏逻辑中使用它，
并将其与电脑的选择进行比较以确定游戏结果。

## 实现游戏逻辑

现在我们就可以继续实际实现游戏逻辑，
并向玩家展示结果了。

首先，我们将向玩家展示他们自己的选择和电脑的选择。请将以下代码添加到您的插件中：

```rs
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
        let you_chose = TextComponent::text("你选择了：");
        you_chose.add_child(TextComponent::text(&format!("{:?}", player_choice)));
        you_chose.color_named(NamedColor::Aqua);
        sender.send_message(you_chose);

        let i_chose = TextComponent::text("我选择了：");
        i_chose.add_child(TextComponent::text(&format!("{:?}", computer_choice)));
        i_chose.color_named(NamedColor::Gold);
        sender.send_message(i_chose);
    }
}
```

接下来，我们可以计算游戏结果并向玩家展示。请将以下代码添加到您的插件中：

```rs
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
                let message = TextComponent::text("你赢了！");
                message.color_named(NamedColor::Green);
                sender.send_message(message);
            }
            Outcome::Lose => {
                let message = TextComponent::text("你输了！");
                message.color_named(NamedColor::Red);
                sender.send_message(message);
            }
            Outcome::Draw => {
                let message = TextComponent::text("平局！");
                message.color_named(NamedColor::Yellow);
                sender.send_message(message);
            }
        }
        
        Ok(1)
    }
}
```

就这样！核心逻辑完成了。现在我们只剩最后一件事情要做。

## 构建并注册命令树

如前所述，我们需要构建一个命令树并将其注册到服务器。
这将允许玩家执行我们插件的命令。

构建命令树并不难，但您必须知道命令及其参数的确切结构。
在本例中，我们有一个名为 `rock-paper-scissors` 的命令，
它将接受一个必需参数（玩家的选择）。

命令树使用 `Command::new()` 函数进行初始化。
该函数接受两个参数：
一个名称列表（其中第一个是主命令名，其余是该命令的别名）
以及一个命令描述（用于在帮助菜单中描述该命令）。
然后，我们可以使用 `.then()` 方法向该树添加“分支”。
此方法接受一个“叶节点”，该叶节点可以使用 `CommandNode::literal()`、`CommandNode::argument()` 或 `CommandNode::require()` 函数构建。

对于石头剪刀布命令，我们将创建 3 个独立的分支，
每个分支都包含一个用于表示玩家选择的 `CommandNode::literal()` 叶节点。
我们还将向服务器注册该命令树，并设置权限为 `hello-pumpkin:command.rockpaperscisors`，以便拥有该权限的任何人都可以执行该命令。
请将以下代码添加到您的 `on_load()` 方法中：

```rs
struct HelloPlugin;
impl Plugin for HelloPlugin {
    fn new() -> Self {
        HelloPlugin
    }

    fn metadata(&self) -> PluginMetadata {
        // 现有代码
    }

    fn on_load(&mut self, context: Context) -> pumpkin_plugin_api::Result<()> {
        // 现有代码

        let command = Command::new( // [!code ++:20]
            &["rps".to_string(), "rockpaperscissors".to_string()],
            "与服务器玩石头剪刀布游戏。",
        );
        command.then(CommandNode::literal("石头").execute(RockPaperScissorsExecutor(Choice::Rock)));
        command
            .then(CommandNode::literal("布").execute(RockPaperScissorsExecutor(Choice::Paper)));
        command.then(
            CommandNode::literal("剪刀").execute(RockPaperScissorsExecutor(Choice::Scissors)),
        );

        let permission = Permission {
            node: "hello-pumpkin:command.rockpaperscisors".to_string(),
            description: "允许玩家玩石头剪刀布游戏".to_string(),
            default: PermissionDefault::Allow,
            children: Vec::new(),
        };
        
        context.register_permission(&permission)?;
        context.register_command(command, "hello-pumpkin:command.rockpaperscisors");
        Ok(())
    }
}
```

就这样！如果您编译插件，可以通过运行以下命令来测试它：

```bash
/rps rock
```
