# 命令

命令通过 `pumpkin.cmd` 声明为树。服务器会将这棵树发送给客户端，客户端用它补全命令，并在玩家输入时检查参数。只有输入解析完成后，处理函数才会运行。

## 第一个命令

`pub const commands` 中列出的命令会在 `onLoad` 运行之前注册：

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

`names` 中的第一个条目是命令名称，其余为别名，因此 `/hello` 和 `/hi` 都能触发此命令。

每个命令都需要一个权限节点，且该节点必须以插件名称加冒号开头。`cmd` 会向服务器注册该节点；当服务器的权限配置未提及该节点时，`default` 决定谁拥有它。除非另行设置，否则默认值为 `.allow`。`.deny` 默认不授予任何人，`.{ .op = .two }` 则授予二级及以上的管理员。如果你自行注册节点（例如注册带子节点的命令），请设置 `register_permission = false`；此时 `description` 和 `default` 不会注册或更改该节点。

根权限适用于整棵命令树。子节点没有单独的权限字段；请在它们的处理函数中检查任何额外的访问规则。

处理函数以 `cmd.ok(n)` 结束，其中 `n` 是命令结果；也可以以 `cmd.fail("...")` 结束，将消息作为错误显示给发送者。

也可以在之后通过 `try cmd.register(ctx, spec)` 注册命令，例如在 `onLoad` 中或任何具有插件上下文的位置。

## 参数

参数和固定单词放在 `then` 中，每个节点又可以有自己的 `then`。任何带有 `run` 的节点都是一条完整命令：

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

这棵树接受 `/heal <target>`、`/heal <target> <amount>` 和 `/heal all`。单独的 `/heal` 会被拒绝，因为根节点没有 `run`。

`.argument` 的第二个参数是参数类型。最常见的类型如下：

| 类型 | 接受内容 |
| --- | --- |
| `.players` | 玩家名称，或 `@a`、`@p` 等选择器 |
| `.{ .integer = .{ min, max } }` | 整数。任一界限都可以为 `null`；`.long` 接受 64 位整数。 |
| `.{ .float = .{ min, max } }` | 小数。`.double` 接受范围更宽的浮点值。 |
| `.bool` | `true` 或 `false` |
| `.{ .string = .single_word }` | 单个单词。`.quotable` 还接受带引号的字符串，`.greedy` 则接收该行的剩余部分。 |
| `.block_pos`、`.position3d` | 坐标，包括 `~ ~1 ~` 这样的相对坐标 |
| `.gamemode` | 游戏模式 |
| `.item`、`.block_state` | 物品或方块 |

玩家输入时，客户端会检查界限；解析命令时，服务器也会检查。`heal` 处理函数永远不会收到小于 0.5 的数量。

`pumpkin.command.ArgumentType` 中的类型并非都能使用。`cmd.isSupported` 会指出哪些类型可用，在 `pub const commands` 中使用任何其他类型都会造成编译错误。运行时注册时，`cmd.register` 会改为返回 `error.UnsupportedArgument`；权限注册被拒绝时则返回 `error.PermissionRejected`。若要读取该行的剩余部分，请使用 `.{ .string = .greedy }`。

## 使用 `cmd.typed` 读取参数

`cmd.typed` 包装第三个参数为结构体的处理函数，并从同名参数填充每个字段：

```zig
fn heal(sender: cmd.Sender, _: pumpkin.Server, args: struct { target: pumpkin.Player, amount: ?f32 }) cmd.Result {
    if (args.amount) |amount| args.target.heal(amount) else args.target.setHealth(args.target.getMaxHealth());
    sender.sendMessage(msg.fmt(.green, "Healed {s}.", .{args.target.getName()}));
    return cmd.ok(1);
}
```

未提供对应参数时，可选字段为 `null`；具有默认值的字段（例如 `amount: f32 = 4`）则采用默认值。因此，在上面的命令树中，一个处理函数可以同时处理 `/heal <target>` 和 `/heal <target> <amount>`。

字段按类型与参数匹配。整数字段读取整数或长整数参数，浮点字段可以读取整数或浮点参数。即使浮点参数的值是整数（例如 `2.0`），整数字段也会拒绝它；请改用 `.integer` 或 `.long` 节点。无法装入字段的值会导致命令失败。`pumpkin.Player` 字段要求参数恰好匹配一名玩家。由于 `.players` 也接受选择器，在有多名玩家在线时，`/heal @a` 会失败并提示 `'target' has to be exactly one player`。若要接受任意数量的玩家，请使用 `[]const pumpkin.Player`。其他所有类型也同样按类型匹配：`bool`、用于文本的 `[]const u8`、`pumpkin.common.BlockPos`、`pumpkin.common.GameMode` 等等。如果没有任何参数能生成某字段的类型，就会造成编译错误。

如果非可选字段没有对应参数，命令会失败并提示 `missing argument 'name'`。在正确的命令树中不会发生这种情况，因此看到该错误通常意味着字段与参数的名称不同。

## 手动读取参数

处理函数也可以接受 `cmd.Args` 并自行读取参数：

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

`cmd.get(args, name, kind)` 在参数按指定类型解析时返回该参数，否则返回 `null`。`cmd.int` 和 `cmd.float` 将任意数字参数分别读取为 `i64` 或 `f64`。

## 参数错误

当必需字段缺失或参数无法填充字段时，`cmd.typed` 会调用 `cmd.bad_argument`。替换此钩子即可翻译错误消息或更改其样式。它接收发送者、参数名称和一个 `cmd.Problem`：`.missing`、`.out_of_range`、`.not_whole` 或 `.not_one_player`。

```zig
pub fn onLoad(_: pumpkin.Context) !void {
    cmd.bad_argument = argumentError;
}

fn argumentError(_: cmd.Sender, name: []const u8, problem: cmd.Problem) cmd.Result {
    return cmd.failWith(msg.fmt(.red, "Invalid {s}: {s}", .{ name, @tagName(problem) }));
}
```

该钩子返回 `cmd.Result`。`cmd.failWith` 接受带样式的文本组件，而 `cmd.fail` 接受纯文本。只需自定义处理部分错误时，仍可使用 `cmd.defaultBadArgument`。

## 建议

客户端已经可以补全玩家名称等内置参数类型。对于只有插件知道的值，请为参数提供 `suggest` 函数：

```zig
.argument("kit", .{ .string = .single_word }, .{ .run = giveKit, .suggest = suggestKits }),

fn suggestKits(_: cmd.Sender, _: pumpkin.Server, request: pumpkin.command.SuggestionRequest) pumpkin.command.CommandSuggestions {
    return cmd.suggestions(request, &.{ "starter", "builder", "warrior" });
}
```

`cmd.suggestions` 会提供与玩家目前输入内容前缀匹配的值，匹配时区分大小写。

[`heal` 示例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/heal.zig)包含一棵通过 `cmd.typed` 读取参数的命令树。

## 带参数和不带参数的命令

当命令有实用的无参数形式时，请将 `run` 放在根节点，并将其他形式的 `run` 放在参数节点上。在[治疗示例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/heal.zig)中，`/heal` 治疗发送者，而 `/heal <target> [amount]` 选择另一名玩家。根处理函数会检查 `sender.asPlayer()`，因为命令也可能来自控制台。

对于自定义参数错误钩子未处理的情况，请使用 `cmd.defaultBadArgument(sender, name, problem)`。该钩子会改变类型化参数的错误；命令自身逻辑中的失败仍直接返回 `cmd.fail` 或 `cmd.failWith`。
