# 編寫指令處理器

在 Minecraft 中，指令是普通玩家和伺服器管理員與遊戲進行底層互動的主要方式。
指令可用於執行各種任務，從簡單的聊天訊息到複雜的伺服器管理指令。
在本教程中，我們將建立一個基本的石頭剪刀布指令處理器，讓玩家可以與伺服器對局。

Pumpkin 擁有自己的指令處理系統，其核心是每個指令都有一棵“樹”，
用於定義指令及其引數的確切結構。樹中的每個節點代表一個指令或引數，
系統透過遍歷這棵樹來確定要執行的指令及其引數。

我們還要感謝 [ploxxxy](https://github.com/ploxxxy) 編寫了本教程所依據的原始
[石頭剪刀布插件](https://github.com/ploxxxy/rock-paper-scissors-mc)。

## 新增基礎功能

Pumpkin 中的每個指令都定義為一個實現 `CommandHandler` trait 的結構。
該 trait 要求實現 `handle` 方法，該方法以傳送者、伺服器和已消費的引數為引數，
並返回 `-> Result<(), CommandError>`。現在我們來定義這個結構：

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

這段程式碼定義了一個空結構 `RockPaperScissorsExecutor`，它實現了
`CommandExecutor` trait。其 `handler` 方法被定義為在呼叫時返回 `Ok(1)`。

## 新增輔助列舉

首先透過以下指令安裝 `rand` crate：

```bash
cargo add rand
```

為了簡化開發，我們還將定義兩個列舉來表示遊戲中可能的選擇和結果，
並定義幾個函式來生成隨機選擇和檢查結果。將這些內容新增到你的插件程式碼中。

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

現在，我們需要修改 `RockPaperScissorsExecutor` 結構，使其接受一個 `Choice` 引數，
並實現遊戲邏輯。

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

這段程式碼使我們能夠稍後傳入玩家的選擇並在遊戲邏輯中使用它，
還能將其與計算機的選擇進行比較，以確定遊戲結果。

## 實現遊戲邏輯

現在，我們可以著手實際實現遊戲邏輯，並向玩家展示結果。

首先，我們將向玩家展示其本人和計算機的選擇。將以下程式碼新增到你的插件中：

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

接下來，我們可以計算遊戲結果並將其展示給玩家。將以下程式碼新增到你的插件中：

```rust
impl CommandHandler for RockPaperScissorsExecutor {
    fn handle(
        &self,
        sender: CommandSender,
        _server: Server,
        _args: ConsumedArgs,
    ) -> Result<i32, CommandError> {
        // 現有程式碼

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

就是這樣！核心邏輯已完成。現在我們只剩最後一件事要做。

## 建構並註冊指令樹

如前所述，我們需要建構一棵指令樹並將其註冊到伺服器。
這樣，玩家就能執行我們插件的指令。

建構指令樹並不困難，但你必須瞭解指令及其引數的確切結構。
在本例中，我們有一個名為 `rock-paper-scissors` 的指令，
它接受一個必需引數（玩家的選擇）。

指令樹使用 `Command::new()` 函式初始化。該函式接受兩個引數：
一個名稱列表，其中第一個是主指令名稱，其餘是指令別名；
以及一個用於在幫助選單中描述該指令的指令描述。
然後，我們可以使用 `.then()` 方法向樹中新增“分支”。此方法接受一個“葉節點”，
該節點可以使用 `CommandNode::literal()`、`CommandNode::argument()` 或
`CommandNode::require()` 函式建構。

對於石頭剪刀布指令，我們將建立 3 個獨立分支，
每個分支都有一個代表玩家選擇的 `CommandNode::literal()` 葉節點。
我們還會向伺服器註冊該指令樹，並將 `permission` 設為
`hello-pumpkin:command.rockpaperscisors`，允許擁有該權限的任何人執行此指令。
將以下程式碼新增到你的 `on_load()` 方法中：

```rust
struct HelloPlugin;
impl Plugin for HelloPlugin {
    fn new() -> Self {
        HelloPlugin
    }

    fn metadata(&self) -> PluginMetadata {
        // 現有程式碼
    }

    fn on_load(&self, context: Context) -> pumpkin_plugin_api::Result<()> {
        // 現有程式碼

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

就是這樣！編譯插件後，你可以透過執行以下指令來測試它：

```bash
/rps rock
```
