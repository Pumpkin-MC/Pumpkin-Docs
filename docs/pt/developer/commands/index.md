# Commands Architecture & Dispatcher

Pumpkin features a high-performance, pure-Rust implementation of the **Brigadier** command tree specification through the dedicated `pumpkin-command` crate. It coordinates command parsing, requirement resolution, type-safe argument deserialization, execution branching, and dual-edition client tree synchronization for both **Minecraft: Java Edition** and **Minecraft: Bedrock Edition**.

### Command Processing Pipeline

Every command executed in Pumpkin flows through the following discrete stages:

1. **Input Normalization**: Strips single leading slashes while preserving plugin multi-slash conventions (such as `//set`).
2. **Availability Check**: Rejects commands disabled via server configuration with standard `unknown command` syntax errors.
3. **Permission Evaluation**: Validates requirements (`PermissionLvl` or custom registry nodes) against the executing sender.
4. **Tokenization & Parsing**: `StringReader` recursively walks the `Tree<S>`, matching literal keywords and parsing typed argument parameters.
5. **Context Dispatch**: Invokes the matched `CommandExecutor` callback with a typed `CommandContext<S>`.
6. **Feedback & Result Consumption**: Formats cross-platform translation components, notifies observers, and writes exit codes back to the caller.

---

## The `pumpkin-command` Crate

Pumpkin decouples command parsing and tree representation from the main server runtime into the modular `pumpkin-command` crate (`crates/pumpkin-command`).

Key components of `pumpkin-command` include:
- **`Tree<S>`**: Contiguous vector-backed storage of attached command nodes (`AttachedNode`).
- **`CommandDispatcher<S>`**: The central registry and dispatch engine. It processes raw command strings, parses tokens with `StringReader`, traverses the command tree, and executes target callbacks.
- **`ArgumentBuilder`**: Fluent builder API (`command`, `literal`, `argument`) modeled after Mojang's Brigadier library.
- **`CommandSource`**: Generic execution state representing the current position, rotation, dimension, entity, and feedback output stream.

---

## The Command Node Hierarchy

Commands in Pumpkin are modeled as directed graphs of nodes. To optimize memory allocations and avoid circular reference issues during building, the system separates nodes into **detached** and **attached** states:

### 1. Detached Nodes (`DetachedNode`)
Constructed using fluent builders (`CommandArgumentBuilder`, `LiteralArgumentBuilder`, `RequiredArgumentBuilder`) before registration:
- **`CommandDetachedNode`**: Represents a root command entrypoint with an identifier and a description.
- **`LiteralDetachedNode`**: Represents a literal keyword in a subcommand branch (e.g., `set` in `/gamemode creative`).
- **`ArgumentDetachedNode`**: Represents a typed parameter parsed by an `ArgumentType` (e.g., coordinates, entity selectors, integer ranges).

### 2. Attached Nodes (`AttachedNode`)
Once registered into the `CommandDispatcher`, detached trees are flattened into an indexed `Tree<S>` structure:
```rust
pub enum AttachedNode<S: CommandSource = DummySource> {
    Root(RootAttachedNode<S>),
    Literal(LiteralAttachedNode<S>),
    Argument(ArgumentAttachedNode<S>),
    Command(CommandAttachedNode<S>),
}
```
Each attached node has:
- **`NodeId`**: A zero-cost typed index (`NonZero<usize>`) into the contiguous node arena.
- **`children`**: Fast lookup map (`FxHashMap<String, NodeId>`) for literals and child arguments.
- **`requirements`**: Predicates determining whether a sender has permission to view or execute the node.
- **`command`**: Optional `CommandExecutor` callback invoked when parsing terminates on this node.
- **`redirect`**: Optional `Redirection` pointer to loop back or redirect to another sub-tree (used heavily by `/execute`).

---

## Dispatch & Execution Pipeline

When a command arrives at the server, `CommandDispatcher::handle_command` processes it through several stages:

```rust
pub fn handle_command<'a>(&'a self, source: &S, mut input: &'a str) {
    // 1. Strip single leading slash (preserving double-slash commands like //set)
    if let Some(sliced) = input.strip_prefix('/') {
        let first_token = input.split_whitespace().next().unwrap_or("");
        let sliced_token = sliced.split_whitespace().next().unwrap_or("");
        if !self.has_command(first_token)
            && (self.has_command(sliced_token) || !first_token.starts_with("//"))
        {
            input = sliced;
        }
    }

    // 2. Check disabled commands from configuration
    if self.is_disabled(Self::command_name(input)) {
        let reader = StringReader::new(input);
        Self::send_error_to_source(source, DISPATCHER_UNKNOWN_COMMAND.create(&reader), input);
        return;
    }

    // 3. Parse and execute
    let output = self.execute_input(input, source);
    if let Err(error) = output {
        Self::send_error_to_source(source, error, input);
    }
}
```

### Syntax Error Formatting
When parsing encounters invalid syntax, unexpected tokens, or out-of-range arguments, Pumpkin constructs a `CommandSyntaxError`. If context is available, the dispatcher formats a visual pointer highlighting exactly where the parser failed:

```
Unknown or incomplete command, see below for error
/gamemode creatve<--[HERE]
```

In the Java Edition client, this error text is annotated with a `ClickEvent::SuggestCommand`, allowing the player to click the error in chat to copy the failed command into their input box for quick editing.

---

## Dual-Edition Network Synchronization

Unlike vanilla servers which only serialize command graphs for Java Edition, Pumpkin dynamically synchronizes the registered command tree across both Java and Bedrock clients:

### 1. Java Edition: `CCommands` Packet
When a player joins or their permission level updates (e.g., via `/op` or `/deop`), Pumpkin builds and sends a `CCommands` packet (`pumpkin_protocol::java::client::play::CCommands`):
- Converts `AttachedNode`s into a flat array of `ProtoNode` entries.
- Filters out disabled commands and nodes where `requirements.evaluate(source)` returns `false`.
- Serializes argument parsers (`brigadier:string`, `brigadier:integer`, `minecraft:entity`, etc.) and client-side suggestion identifiers.

### 2. Bedrock Edition: `CAvailableCommands` Packet
Bedrock Edition uses an overload-and-enum format rather than Brigadier's recursive graph. In `client_suggestions.rs`, Pumpkin traverses the `AttachedNode` tree to synthesize:
- **`CommandData`**: Root command name, description, permission flags, and aliases.
- **`OverloadData`**: Flattened permutations of argument chains leading to executable endpoints.
- **`ParamData`**: Bedrock parameter types, bitflags (`ARG_FLAG_VALID`, `ARG_FLAG_ENUM`), and dynamically collected enum value tables.

---

## Universal Execution Targets

Pumpkin commands can be executed across diverse senders:

| Sender | Source Representation | Output Destination | Default Permission |
| :--- | :--- | :--- | :--- |
| **Player** | `CommandSender::Player(Arc<Player>)` | Client system chat packet | Loaded from permission level / permissions file |
| **Server Console** | `CommandSender::Console` | Standard stdout (`tracing::info!`) | Level 4 (Full administrative bypass) |
| **RCON Console** | `CommandSender::Rcon(Arc<Mutex<Vec<String>>>)` | Network response packet payload | Level 4 |
| **Command Block** | `CommandSender::CommandBlock(Arc<CommandBlockEntity>, Arc<World>)` | NBT `LastOutput` field | Level 2 |
| **Datapack Function** | `CommandSender` inherited from caller | Inherited | Inherited |
| **WASM Plugin** | Invoked through WIT `execute_command` host call | Captured via `ResultDeferrer` | Configurable |

---

## Command Configuration & Disabling

Pumpkin allows server administrators to disable individual commands via `config/commands.toml` (`CommandsConfig`). When a command is disabled:
1. It is omitted from the `CCommands` packet for Java clients.
2. It is omitted from the `CAvailableCommands` packet for Bedrock clients.
3. Tab completion ignores the command entirely.
4. Any attempt to invoke the command returns `DISPATCHER_UNKNOWN_COMMAND`.
