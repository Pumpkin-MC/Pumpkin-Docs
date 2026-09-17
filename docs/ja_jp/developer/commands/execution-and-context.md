# Execution & Context

In Pumpkin, command execution separates the **physical origin** of a command from its **runtime context**. This design enables complex command routing, dimension shifts, conditional execution, and vanilla-compliant `/execute` chaining.

---

## `CommandSender` vs. `CommandSource`

Understanding the distinction between `CommandSender` and `CommandSource` is fundamental to developing commands in Pumpkin:

| Attribute | `CommandSender` | `CommandSource` |
| :--- | :--- | :--- |
| **Concept** | The physical origin and network destination | The mutable runtime execution environment |
| **Mutability** | Immutable throughout command execution | Cloned and modified across `/execute` branches |
| **Key Fields** | Terminal socket, connection handle, RCON buffer | World, position coordinates, rotation, entity, silent flag |
| **Creation** | Instantiated on network connection or terminal input | Constructed via `sender.into_source(&server)` |

### 1. `CommandSender` (Physical Caller)
Represents the entity or socket that initiated the command and receives its output:

```rust
pub enum CommandSender {
    Console,
    Rcon(Arc<std::sync::Mutex<Vec<String>>>),
    Player(Arc<Player>),
    CommandBlock(Arc<CommandBlockEntity>, Arc<World>),
    Dummy,
}
```

- **Output Target**: Determines where messages formatted with `send_message` are routed (e.g., standard out, RCON buffer, player packet, or block entity NBT).
- **Hard Permissions**: Holds fixed base permissions (e.g., Console has level 4 bypass; Command Blocks have level 2).

### 2. `CommandSource` (Execution Environment)
Represents the mutable runtime state during command evaluation:

```rust
pub struct CommandSource {
    pub output: CommandSender,
    pub world: Option<Arc<World>>,
    pub entity: Option<Arc<dyn EntityBase>>,
    pub position: Vector3<f64>,
    pub rotation: Vector2<f32>,
    pub name: String,
    pub display_name: TextComponent,
    pub server: Option<Arc<Server>>,
    pub silent: bool,
    pub command_result_taker: ResultValueTaker,
    pub entity_anchor: EntityAnchor,
}
```

A sender converts into a `CommandSource` via `sender.into_source(&server)`.

---

## The `/execute` Command & Context Redirection

The `/execute` command manipulates `CommandSource` properties before passing control to a downstream command.

### Branching Modifiers
- **`as <targets>`**: Changes `context.source.entity` to target entities without altering position or rotation.
- **`at <targets>`**: Updates `context.source.world`, `position`, and `rotation` to match the target entity.
- **`positioned <pos>`**: Modifies `context.source.position` to new coordinates.
- **`in <dimension>`**: Changes `context.source.world` to the specified dimension (Overworld, Nether, The End).
- **`anchored (feet|eyes)`**: Adjusts coordinate offsets for line-of-sight and facing checks.

### Context Forking & Chaining
When `/execute` matches multiple targets (e.g., `/execute as @e run ...`), `pumpkin-command` uses **forking**:
1. The dispatcher forks the execution context once per matched target.
2. The child command executes independently for each cloned `CommandSource`.
3. The cumulative success count is aggregated across all executions.

---

## Result Values & Success Counts

Vanilla commands communicate results back through integer exit codes and return values.

### The Return Value Callback
Executors return `CommandExecutorResult` (`Result<i32, CommandSyntaxError>`). The returned integer signifies:
- **0**: Failure or zero entities affected.
- **> 0**: Number of entities affected, blocks changed, or items cleared.

For Command Blocks, this value is persisted into the block entity's `SuccessCount`:

```rust
pub fn set_success_count(&self, count: u32) {
    if let Self::CommandBlock(c, _) = self {
        c.success_count.store(count, Ordering::SeqCst);
    }
}
```

### `/execute store`
When chained with `/execute store (result|success) ...`, Pumpkin intercepts the return value via `ReturnValueCallback` and writes it to scoreboards, bossbars, or entity NBT tags.

---

## Feedback & GameRules Integration

Sending output to the command sender is governed by server configuration and world game rules:

```rust
context.source.send_feedback(
    TextComponent::text("Command executed successfully!"),
    true, // Broadcast to server operators
);
```

### Output Rules Matrix

| Condition | Feedback Behavior |
| :--- | :--- |
| `silent == true` | Output is suppressed completely. |
| `send_command_feedback == false` | Player senders do not receive success feedback (errors are still displayed). |
| `command_block_output == false` | Command block execution output is not broadcast to online operators. |
| `broadcast_console_to_ops == true` | Server console and RCON commands emit a copy of their feedback to all online OP level 2+ players. |
