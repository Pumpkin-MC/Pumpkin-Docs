# Writing a Command Handler

In Minecraft, commands are the primary way for both regular players and server operators to interact with the game on a lower level. They can be used to perform a wide range of tasks, from simple chat messages to complex server management commands. In this tutorial, we will create a basic Rock-Paper-Scissors command handler that allows players to play the game against the server.

Pumpkin has its own system for handling commands, which is based around each command having a 'tree', which defines the exact structure of the command and its arguments. Each node in the tree represents a command or argument, and the tree is traversed to determine the command to execute and its parameters.

Commands in Pumpkin are asynchronous, meaning that they do not block the main thread while they are executing. This allows for more efficient use of resources and a smoother user experience.

We would also like to thank [ploxxxy](https://github.com/ploxxxy) for writing the original [Rock-Paper-Scissors plugin](https://github.com/ploxxxy/rock-paper-scissors-mc) from which this tutorial is based.

## Adding the basics

Each command in Pumpkin is defined as a structure that implements the `CommandExecutor` trait. This trait requires the implementation of a `execute` method, which takes the sender, server, and consumed arguments as parameters, and returns a `-> Result<(), CommandError>`. Let's define this structure now:

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

This code defines an empty structure `RockPaperScissorsExecutor` that implements the `CommandExecutor` trait. The `execute` method is defined to return `Ok(())` when called.

## Adding helper enums

To make our lives easier, we will also define a couple of enums to represent the possible choices and outcomes of the game, as well as well as a couple functions to generate random choices and check the outcome. Add these to your plugin's code.

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

Now we need to modify the `RockPaperScissorsExecutor` struct to accept a `Choice` parameter and implement the game logic.

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

This code will allow us to later pass in the player's choice and use it in the game logic, as well as compare it with the computer's choice to determine the outcome of the game.

## Implementing the Game Logic

Now we can move on to actually implementing the game logic, and showing the outcome to the players.

First we will show the player their and the computer's choice. Add this code to your plugin:

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

Next we can compute the game outcome and show it to the player. Add this code to your plugin:

```rs
impl CommandExecutor for RockPaperScissorsExecutor {
    fn execute<'a>(
        &self,
        sender: &mut CommandSender,
        _: &Server,
        _: &ConsumedArgs<'a>,
    ) -> Result<(), CommandError> {
        Box::pin(async move {
            // Existing code
            

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

And that's it! The core logic is done. Now we only have one last thing to do.

## Building and registering a command tree

As stated earlier, we need to build a command tree and register it with the server. This will allow players to execute our plugin's commands.

Building a command tree isn't very hard, but you have to know the exact structure of the command and its arguments. In this case, we have a command named `rock-paper-scissors`, which will take one required argument (the player's choice).

The command tree is initialized using the `CommandTree::new()` function. This function takes two arguments: a list of names, where the first is the main command name, and the others are aliases for the command; and a command description which is used to describe the command in the help menu. We can then add 'branches' to the tree using the `.then()` method. This method accepts a 'leaf' which can be built with the `literal()`, `argument()`, or `require()` functions.

For the rock-paper-scissors command, we'll create 3 separate branches, each with a `literal()` leaf node for the player's choice. We will also register the command tree with the server and with a `PermissionLvl` of `Zero` which will allow anyone to execute the command. Add the following code to your `on_load()` method:

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

And that's it! If you compile the plugin, you can test it by running the following command:

```bash
/rps rock
```
