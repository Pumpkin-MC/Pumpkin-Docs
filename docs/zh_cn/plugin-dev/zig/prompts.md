# 聊天提示

`pumpkin.prompt` 可以在聊天中向玩家提问，或显示可点击的选项。插件决定哪些消息算作答案、如何验证答案以及问题何时结束。

## 提出问题

在 `onLoad` 中调用一次 `prompt.listen(ctx, .{})`。它会注册聊天和离开事件，以及可点击选项使用的命令。

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

答案对应的聊天事件会被取消，因此不会广播给其他玩家。`Answer` 包含 `server`、`player`、原始 `text` 和问题的 `data`。`number(T)` 读取整数或浮点数，忽略两端空格，无法读取时返回 `null`。

## 显示选项

`choose` 消息可以按任意顺序混合文本片段和选项。每个选项都有自己的标签、处理函数和 `data`：

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

标签接受[文本片段](./text)的样式和悬停文本。点击行为由提示提供。`word` 还允许玩家键入选项，这是基岩版玩家所必需的，因为他们的聊天不支持可点击命令。不匹配任何选项的聊天消息会继续作为普通聊天处理。

在循环中构建的标签需要有自己的后备数组，并保持到 `choose` 返回。循环内临时的 `&.{ ... }` 可能复用上一个标签的内存。[提示示例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/prompt.zig)为其套件使用了独立的标签数组。

## 结束或保留问题

答案和选项处理函数都返回 `prompt.Reply`：

- `prompt.done()` 结束问题。
- `prompt.keep()` 让问题保持打开，包括其可点击选项。
- `prompt.retry(spans)` 让问题保持打开并发送另一条消息。

`timeout` 默认为 60 秒[游戏时间](./scheduling)。`keep()` 和 `retry()` 保留原始截止时间，不会重新开始超时。将其设置为 `null`，可让问题一直保持打开，直到处理函数结束它或插件调用 `prompt.cancel(player)`。`prompt.isAsking(player)` 表示玩家是否有尚未结束的问题。

每个玩家同时只有一个问题。新问题会替换上一个问题，包括在答案处理函数中提出新问题的情况。旧的可点击选项携带旧问题的令牌，无法回答新问题。

问题在没有完成答案的情况下结束时，会调用 `on_end`。它接收 `(Server, Player, prompt.End, data)`，结束原因为 `.timeout`、`.cancelled`、`.left` 或 `.replaced`。处理函数以 `done()` 完成时不会运行它。

## 选择行为

`ask` 接受一个 `capture` 回调，其 `Answer` 与 `on_answer` 相同。返回 `false` 可让消息继续作为普通聊天。默认捕获所有消息。除非更改，否则 `cancel_word` 为 `"cancel"`；`null` 会将其关闭。系统会先检查捕获，因此如果过滤器对取消词返回 `false`，该消息也会作为聊天通过。

`ask` 和 `choose` 都接受 `match` 函数，用于比较聊天消息和单词。默认的 `prompt.sameWord` 会修剪两端空格并忽略大小写。原始 `Answer.text` 不会被更改。

传给 `listen` 的选项可设置选项 `command` 及其 `permission` 和 `description`，以及 `chat` 事件的优先级和阻塞模式。默认命令为 `<plugin>-choose`，权限为 `<plugin>:command.choose`。如果必须在答案广播前将其取消，请让聊天处理函数保持阻塞。

`prompt.texts.not_a_player` 和 `prompt.texts.question_over` 可以替换辅助函数自身的错误消息。问题、选项、验证和结束消息均由插件提供。

## 会话数据和清理

`Ask.data` 会传给答案和结束处理函数。`Choose.data` 用于 `on_end`；每个选项都有单独的 `data`，会传给 `on_pick`。它们是整数值，不是应用程序状态的自有副本。对于多步骤表单，请将较大的状态保存在以玩家 UUID 为键的映射中，并将 `data` 用作索引或其他小型标识符。

在答案成功时，以及 `on_end` 报告超时、取消、离开或替换时，都要移除该状态。成功的 `done()` 不会调用 `on_end`。如果处理函数打开下一个问题，请返回 `done()` 来结束旧问题；新会话会保持打开。

辅助函数会复制选项词和取消词，供之后的回调使用。问题和标签片段会立即构建，因此栈上的数组只需在 `ask` 或 `choose` 返回前保持有效。存储在你自己的映射中的文本仍需要[自有内存](./memory)。
