# Einen Kommando-Handler schreiben (Schere-Stein-Papier)

In Minecraft sind Befehle der Hauptweg für Spieler und Operatoren, mit dem Spiel auf niedriger Ebene zu interagieren. Dieses Tutorial erstellt einen einfachen Schere‑Stein‑Papier‑Befehl.

Pumpkin verwendet ein eigenes System mit einem Befehlsbaum (`CommandTree`). Jeder Knoten repräsentiert einen Teil des Befehls oder ein Argument.

## Basis hinzufügen

`CommandExecutor`‑Trait implementieren:

```rs
use pumpkin::{
    command::{
        args::ConsumedArgs, dispatcher::CommandError, tree::builder::literal, tree::CommandTree,
        CommandExecutor, CommandSender,
    },
    server::Server,
};

struct RockPaperScissorsExecutor;

#[async_trait]
impl CommandExecutor for RockPaperScissorsExecutor {
    async fn execute<'a>(
        &self,
        sender: &mut CommandSender,
        _: &Server,
        _: &ConsumedArgs<'a>,
    ) -> Result<(), CommandError> {
        Ok(())
    }
}
```

## Hilfs-Enums

```rs
use rand::{rng, Rng};

#[derive(PartialEq, Debug, Clone, Copy)]
enum Choice { Rock, Paper, Scissors }

enum Outcome { Win, Lose, Draw }

impl Choice {
    pub fn beats(&self, other: &Choice) -> Outcome {
        if self == other { return Outcome::Draw; }
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

Struktur erweitern:

```rs
struct RockPaperScissorsExecutor(Choice);
```

## Logik implementieren

```rs
#[async_trait]
impl CommandExecutor for RockPaperScissorsExecutor {
    async fn execute<'a>(
        &self,
        sender: &mut CommandSender,
        _: &Server,
        _: &ConsumedArgs<'a>,
    ) -> Result<(), CommandError> {
        let player_choice = self.0;
        let computer_choice = get_random_choice();
        sender
            .send_message(TextComponent::text("Du wählst: ").add_text(format!("{:?}", player_choice)).color_named(NamedColor::Aqua))
            .await;
        sender
            .send_message(TextComponent::text("Ich wähle: ").add_text(format!("{:?}", computer_choice)).color_named(NamedColor::Gold))
            .await;
        match player_choice.beats(&computer_choice) {
            Outcome::Win => sender.send_message(TextComponent::text("Du gewinnst!").color_named(NamedColor::Green)).await,
            Outcome::Lose => sender.send_message(TextComponent::text("Du verlierst!").color_named(NamedColor::Red)).await,
            Outcome::Draw => sender.send_message(TextComponent::text("Unentschieden!").color_named(NamedColor::Yellow)).await,
        };
        Ok(())
    }
}
```

## Befehl registrieren

```rs
use pumpkin_util::PermissionLvl;
const NAMES: [&str; 2] = ["rps", "rockpaperscissors"];
const DESCRIPTION: &str = "Schere Stein Papier gegen den Server spielen.";

#[plugin_method]
async fn on_load(&mut self, server: Arc<Context>) -> Result<(), String> {
    let command = CommandTree::new(NAMES, DESCRIPTION)
        .then(literal("rock").execute(RockPaperScissorsExecutor(Choice::Rock)))
        .then(literal("paper").execute(RockPaperScissorsExecutor(Choice::Paper)))
        .then(literal("scissors").execute(RockPaperScissorsExecutor(Choice::Scissors)));
    server.register_command(command, PermissionLvl::Zero).await;
    Ok(())
}
```

Test:

```bash
/rps rock
```
