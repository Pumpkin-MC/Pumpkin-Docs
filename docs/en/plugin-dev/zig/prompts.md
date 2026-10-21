# Chat Prompts

`pumpkin.prompt` asks a player a question in chat or shows choices to click. The plugin decides which messages count as answers, how to validate them and when the question ends.

## Asking a question

Call `prompt.listen(ctx, .{})` once in `onLoad`. It registers the chat and leave events and a command used by clickable choices.

```zig [src/main.zig]
const pumpkin = @import("pumpkin");
const cmd = pumpkin.cmd;
const msg = pumpkin.msg;
const prompt = pumpkin.prompt;

const MyPlugin = struct {
    pub const metadata: pumpkin.Metadata = .{
        .name = "my-zig-plugin",
        .version = "0.1.0",
    };

    pub const commands: []const cmd.Spec = &.{.{
        .names = &.{"quantity"},
        .permission = "my-zig-plugin:command.quantity",
        .run = askQuantity,
    }};

    pub fn onLoad(ctx: pumpkin.Context) !void {
        try prompt.listen(ctx, .{});
    }

    fn askQuantity(sender: cmd.Sender, _: pumpkin.Server, _: cmd.Args) cmd.Result {
        const player = sender.asPlayer() orelse return cmd.fail("only players can answer");
        prompt.ask(player, .{
            .question = &.{.{ .text = "How many? Enter 1 to 64, or cancel.", .color = .aqua }},
            .on_answer = gotQuantity,
            .timeout = .seconds(30),
        });
        return cmd.ok(1);
    }

    fn gotQuantity(answer: prompt.Answer) prompt.Reply {
        const amount = answer.number(u32) orelse 0;
        if (amount < 1 or amount > 64) return prompt.retry(&.{.{ .text = "Enter a number from 1 to 64.", .color = .red }});
        answer.player.sendSystemMessage(msg.fmt(.green, "You chose {d}.", .{amount}), false);
        return prompt.done();
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

An answer is cancelled as a chat event, so it is not broadcast to other players. `Answer` contains the `server`, `player`, the raw `text` and the question's `data`. `number(T)` reads an integer or float, ignoring surrounding spaces, and returns `null` if it cannot.

## Showing choices

A `choose` message mixes text spans and choices in any order. Each choice has its own label, handler and `data`:

```zig
fn confirm(player: pumpkin.Player) void {
    prompt.choose(player, .{
        .message = &.{
            .{ .text = .{ .text = "Continue? " } },
            .{ .choice = .{
                .label = &.{.{ .text = "[Continue]", .color = .green }},
                .word = "continue",
                .on_pick = confirmed,
            } },
        },
    });
}

fn confirmed(_: pumpkin.Server, player: pumpkin.Player, _: usize) prompt.Reply {
    player.sendSystemMessage(msg.plain("Confirmed."), false);
    return prompt.done();
}
```

The label accepts the styles and hover text of [text spans](./text). The prompt supplies its click action. `word` also lets the player type a choice, which Bedrock players need because their chat does not support clickable commands. Chat messages that match no choice continue as normal chat.

Labels built in a loop need their own backing arrays until `choose` returns. A temporary `&.{ ... }` inside the loop can reuse the previous label's memory. The [prompt example](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/prompt.zig) shows separate label arrays for its kits.

## Ending or keeping a question

Both answer and choice handlers return a `prompt.Reply`:

- `prompt.done()` ends the question.
- `prompt.keep()` leaves it open, including its clickable choices.
- `prompt.retry(spans)` leaves it open and sends another message.

`timeout` defaults to 60 seconds of [game time](./scheduling). `keep()` and `retry()` retain the original deadline; they do not restart the timeout. Set it to `null` to keep a question open until the handler ends it or the plugin calls `prompt.cancel(player)`. `prompt.isAsking(player)` tells whether the player has a question open.

There is one question per player. A new question replaces the previous one, including when asked from an answer handler. Old clickable choices carry the old question's token and cannot answer the new one.

`on_end` is called when a question ends without a completed answer. It receives `(Server, Player, prompt.End, data)`, with `.timeout`, `.cancelled`, `.left` or `.replaced`. It does not run when a handler finishes with `done()`.

## Choosing the behavior

`ask` accepts a `capture` callback with the same `Answer` as `on_answer`. Return `false` to let a message continue as ordinary chat. The default captures every message. `cancel_word` is `"cancel"` unless changed; `null` turns it off. Capture is checked first, so a filter that returns `false` for the cancel word also lets that message pass through as chat.

Both `ask` and `choose` accept a `match` function that compares a chat message with a word. The default, `prompt.sameWord`, trims surrounding spaces and ignores case. The raw `Answer.text` is not changed.

The options passed to `listen` set the choice `command`, its `permission` and `description`, and the `chat` event's priority and blocking mode. The default command is `<plugin>-choose`, and its permission is `<plugin>:command.choose`. Keep the chat handler blocking when it must cancel answers before they are broadcast.

`prompt.texts.not_a_player` and `prompt.texts.question_over` replace the helper's own error messages. The questions, choices, validation and end messages are supplied by the plugin.

## Session data and cleanup

`Ask.data` is passed to its answer and end handlers. `Choose.data` is for `on_end`; each choice has separate `data` passed to `on_pick`. These are integer values, not owned copies of application state. For a multi-step form, keep larger state in a map keyed by the player's UUID, and use `data` as an index or other small identifier.

Remove that state both when an answer succeeds and when `on_end` reports timeout, cancellation, leaving or replacement. A successful `done()` does not call `on_end`. If a handler opens the next question, return `done()` to finish the old one; the new session stays open.

The helper copies choice words and the cancel word for later callbacks. Question and label spans are built immediately, so stack-backed arrays only need to remain valid until `ask` or `choose` returns. Text stored in your own map still needs [owned memory](./memory).
