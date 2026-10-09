# Commands

Commands are declared as a tree with `pumpkin.cmd`. The server sends the tree to the client, which uses it to complete commands and check arguments while the player types. A handler only runs once the input has been parsed.

## A first command

Commands listed in `pub const commands` are registered before `onLoad` runs:

```zig [src/main.zig]
const pumpkin = @import("pumpkin");
const cmd = pumpkin.cmd;
const msg = pumpkin.msg;

const MyPlugin = struct {
    pub const metadata: pumpkin.Metadata = .{
        .name = "my-zig-plugin",
        .version = "0.1.0",
    };

    pub const commands: []const cmd.Spec = &.{.{
        .names = &.{ "hello", "hi" },
        .description = "Says hello.",
        .permission = "my-zig-plugin:command.hello",
        .run = hello,
    }};

    fn hello(sender: cmd.Sender, _: pumpkin.Server, _: cmd.Args) cmd.Result {
        sender.sendMessage(msg.fmt(.gold, "Hello, {s}!", .{sender.getName()}));
        return cmd.ok(1);
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

The first entry in `names` is the command's name and the rest are aliases, so this command answers to both `/hello` and `/hi`.

Every command needs a permission node, and the node has to start with the plugin's name followed by a colon. `cmd` registers the node with the server, and `default` decides who has it when the server's permission config doesn't mention it. It is `.allow` unless you set it. `.deny` gives it to no one by default, and `.{ .op = .two }` gives it to operators of level two and above.

A handler finishes with `cmd.ok(n)`, where `n` is the command's result, or with `cmd.fail("...")`, which shows the message to the sender as an error.

Commands can also be registered later, from `onLoad` or anywhere else that has the plugin's context, with `try cmd.register(ctx, spec)`.

## Arguments

Arguments and fixed words go in `then`, and each of them can have a `then` of its own. Any node with a `run` is a complete command:

```zig
.{
    .names = &.{"heal"},
    .permission = "my-zig-plugin:command.heal",
    .default = .{ .op = .two },
    .then = &.{
        .argument("target", .players, .{
            .run = cmd.typed(heal),
            .then = &.{
                .argument("amount", .{ .float = .{ 0.5, null } }, .{ .run = cmd.typed(heal) }),
            },
        }),
        .literal("all", .{ .run = healAll }),
    },
}
```

This tree accepts `/heal <target>`, `/heal <target> <amount>` and `/heal all`. A bare `/heal` is rejected, since the root has no `run`.

The second parameter of `.argument` is the argument's type. These are the most common ones, and `pumpkin.command.ArgumentType` has the full list:

| Type | Accepts |
| --- | --- |
| `.players` | A player name, or a selector such as `@a` or `@p` |
| `.{ .integer = .{ min, max } }` | A whole number. Either bound can be `null`. |
| `.{ .float = .{ min, max } }` | A decimal number. `.double` and `.long` work the same way. |
| `.bool` | `true` or `false` |
| `.{ .string = .single_word }` | A single word. `.quotable` also accepts a quoted string, and `.greedy` takes the rest of the line. |
| `.message` | The rest of the line, as a chat message |
| `.block_pos`, `.position3d` | Coordinates, including relative ones like `~ ~1 ~` |
| `.gamemode` | A game mode |
| `.item`, `.block_state` | An item or a block |

Bounds are checked by the client as the player types and by the server when it parses the command. The `heal` handler never sees an amount below 0.5.

## Reading arguments with `cmd.typed`

`cmd.typed` wraps a handler whose third parameter is a struct, and fills each field from the argument of the same name:

```zig
fn heal(sender: cmd.Sender, _: pumpkin.Server, args: struct { target: pumpkin.Player, amount: ?f32 }) cmd.Result {
    if (args.amount) |amount| args.target.heal(amount) else args.target.setHealth(args.target.getMaxHealth());
    sender.sendMessage(msg.fmt(.green, "Healed {s}.", .{args.target.getName()}));
    return cmd.ok(1);
}
```

Optional fields are `null` when their argument wasn't given, and fields with a default value, such as `amount: f32 = 4`, take the default. That's why one handler can serve both `/heal <target>` and `/heal <target> <amount>` in the tree above.

Fields are matched to arguments by type. Integer and float fields of any size read number arguments, and a value that doesn't fit the field fails the command. A `pumpkin.Player` field needs the argument to match exactly one player. Since `.players` also accepts selectors, `/heal @a` with several players online fails with `'target' has to be exactly one player`. To accept any number of players, use `[]const pumpkin.Player`. Everything else is matched by its type as well: `bool`, `[]const u8` for text, `pumpkin.common.BlockPos`, `pumpkin.common.GameMode` and so on. A field whose type no argument produces is a compile error.

If a field that isn't optional has no argument, the command fails with `missing argument 'name'`. In a correct tree this can't happen, so seeing it usually means a field is named differently from its argument.

## Reading arguments by hand

A handler can also take `cmd.Args` and read the arguments itself:

```zig
fn healAll(sender: cmd.Sender, srv: pumpkin.Server, _: cmd.Args) cmd.Result {
    const players = srv.getAllPlayers();
    for (players) |player| player.setHealth(player.getMaxHealth());
    sender.sendMessage(msg.fmt(.green, "Healed {d} players.", .{players.len}));
    return cmd.ok(@intCast(players.len));
}

fn give(_: cmd.Sender, _: pumpkin.Server, args: cmd.Args) cmd.Result {
    const targets = cmd.get(args, "targets", .players) orelse return cmd.fail("nobody to give to");
    const amount = cmd.int(args, "amount") orelse 1;
    _ = targets;
    _ = amount;
    return cmd.ok(1);
}
```

`cmd.get(args, name, kind)` returns the argument if it was parsed as that kind, and `null` otherwise. `cmd.int` and `cmd.float` read any number argument as an `i64` or an `f64`.

## Suggestions

The client already completes built-in argument types such as player names. For values only your plugin knows about, give the argument a `suggest` function:

```zig
.argument("kit", .{ .string = .single_word }, .{ .run = giveKit, .suggest = suggestKits }),

fn suggestKits(_: cmd.Sender, _: pumpkin.Server, request: pumpkin.command.SuggestionRequest) pumpkin.command.CommandSuggestions {
    return cmd.suggestions(request, &.{ "starter", "builder", "warrior" });
}
```

`cmd.suggestions` offers the values that start with what the player has typed so far.
