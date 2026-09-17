# Argument Types & Suggestions

Pumpkin provides a comprehensive suite of type-safe command arguments through `pumpkin-command` and the main `pumpkin` server crate. Arguments deserialize raw token streams into structured Rust types, validate ranges, and furnish tab-completion suggestions to clients.

---

## Standard Argument Types

Argument parsers implement the [`ArgumentType<S>`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-command/src/argument_types/argument_type.rs) trait. The following built-in types are available for command builders:

### 1. Primitive & Scalar Types

| Argument Type | Import Path | Deserialized Type | Description |
| :--- | :--- | :--- | :--- |
| **`IntegerArgumentType`** | `...::core::integer` | `i32` | Standard 32-bit integer with optional `[min, max]` bounds. |
| **`FloatArgumentType`** | `...::core::float` | `f32` | 32-bit floating point number with bounds. |
| **`DoubleArgumentType`** | `...::core::double` | `f64` | 64-bit floating point number with bounds. |
| **`LongArgumentType`** | `...::core::long` | `i64` | 64-bit integer with bounds. |
| **`BoolArgumentType`** | `...::core::bool` | `bool` | Boolean value (`true` or `false`). |
| **`StringArgumentType`** | `...::core::string` | `String` | String tokens based on quoting rules. |

#### String Argument Behaviors
- **`StringArgumentType::Word`**: Parses a single word without whitespace.
- **`StringArgumentType::Quotable`**: Parses either a single word or a quoted phrase (`"hello world"`).
- **`StringArgumentType::Greedy`**: Consumes all remaining characters in the input stream (ideal for chat/broadcast commands like `/say` and `/me`).

---

## Coordinate Argument Types

Minecraft coordinates support absolute positions, relative offsets (`~`), and local caret directions (`^`):

```rust
use crate::command::argument_builder::argument;
use crate::command::argument_types::coordinates::block_pos::BlockPosArgumentType;
use crate::command::argument_types::coordinates::vec3::Vec3ArgumentType;

// Block position (integer BlockPos)
argument("pos", BlockPosArgumentType)

// Precise entity coordinates (f64 Vector3)
argument("location", Vec3ArgumentType)
```

### Retrieving Parsed Coordinates
Inside an executor, coordinate arguments resolve relative offsets against the sender's current position and orientation in the [`CommandSource`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/command/context/command_source.rs):

```rust
// Extracts centered f64 coordinates (handling ~ and ^ relative to sender)
let pos: Vector3<f64> = Vec3ArgumentType::get_coordinates(context, "location")?;

// Extracts integer block position
let block_pos: BlockPos = BlockPosArgumentType::get_block_pos(context, "pos")?;
```

---

## Entity Selectors (`EntityArgumentType`)

Entity selectors allow players and command blocks to target entities using player names, UUIDs, or vanilla target selectors (`@p`, `@r`, `@a`, `@e`, `@s`).

In Pumpkin, entity selectors are accessed via [`EntityArgumentType`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin/src/command/argument_types/entity.rs):

```rust
pub enum EntityArgumentType {
    /// Matches exactly one player
    Player,
    /// Matches zero or more players
    Players,
    /// Matches exactly one entity
    Entity,
    /// Matches zero or more entities
    Entities,
}
```

### Resolution in Executors

```rust
// 1. Target single player
let player: Arc<Player> = EntityArgumentType::get_player(context, "target")?;

// 2. Target multiple players
let players: Vec<Arc<Player>> = EntityArgumentType::get_players(context, "targets")?;

// 3. Target single living entity or mob
let entity: Arc<dyn EntityBase> = EntityArgumentType::get_entity(context, "target")?;

// 4. Target multiple entities
let entities: Vec<Arc<dyn EntityBase>> = EntityArgumentType::get_entities(context, "targets")?;
```

### Supported Selector Syntaxes
Pumpkin's entity selector parser (`crates/pumpkin/src/command/argument_types/entity_selector/`) parses and validates:
- `@p`: Nearest player relative to execution coordinates.
- `@r`: Random player.
- `@a`: All online players.
- `@e`: All entities in loaded world chunks.
- `@s`: Executing entity (`context.source.entity`).
- **Bracket Arguments**: Filter queries like `@e[type=zombie,distance=..10,limit=5,sort=nearest]`.

---

## Registry & Game Mechanic Types

Pumpkin provides specialized argument parsers for Minecraft data types:

- **`GameModeArgumentType`**: Resolves `survival`, `creative`, `adventure`, `spectator` or numeric IDs `0`–`3`.
- **`BlockArgumentType`**: Parses block identifiers and block states (e.g., `minecraft:chest[facing=north]`).
- **`ItemArgumentType`**: Parses item identifiers and optional data components (e.g., `minecraft:diamond_sword`).
- **`NbtArgumentType`**: Parses SNBT (Stringified NBT) tags into Pumpkin's NBT representation.
- **`TimeArgumentType`**: Parses durations with suffixes (e.g., `10s`, `20t`, `1d`).

---

## Suggestion Providers & Tab Completion

Arguments can supply dynamic tab-completion candidates to connected players using the [`SuggestionProvider`](https://github.com/Pumpkin-MC/Pumpkin/blob/master/crates/pumpkin-command/src/suggestion/mod.rs) trait:

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
        // Retrieve already typed token prefix
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

### Attaching Suggestions to Arguments
Use the `.suggests(...)` method on `RequiredArgumentBuilder`:

```rust
argument("code", StringArgumentType::Word)
    .suggests(CustomSuggestionProvider)
    .executes(MyExecutor)
```

### Client Completion Protocol
- **Java Edition**: When a player presses `Tab`, the client transmits a `ServerboundCommandSuggestion` packet. Pumpkin matches the cursor position within the `CommandDispatcher`, executes the target node's `SuggestionProvider`, and responds with `ClientboundCommandSuggestions` containing completion ranges and tooltip tooltips.
- **Bedrock Edition**: Suggestion options for literals and enums are serialized ahead of time in the `CAvailableCommands` packet as dynamic enum value tables.
