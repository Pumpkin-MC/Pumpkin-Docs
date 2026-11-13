# 聊天提示

`pumpkin.prompt` 可以在聊天中向玩家提問，或顯示可點選的選項。插件決定哪些訊息算作答案、如何驗證答案以及問題何時結束。

## 提出問題

在 `onLoad` 中調用一次 `prompt.listen(ctx, .{})`。它會註冊聊天和離開事件，以及可點選選項使用的指令。

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

答案對應的聊天事件會被取消，因此不會廣播給其他玩家。`Answer` 包含 `server`、`player`、原始 `text` 和問題的 `data`。`number(T)` 讀取整數或浮點數，忽略兩端空格，無法讀取時返回 `null`。

## 顯示選項

`choose` 訊息可以按任意順序混合文字片段和選項。每個選項都有自己的標籤、處理函數和 `data`：

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

標籤接受[文字片段](./text)的樣式和懸停文字。點選行為由提示提供。`word` 還允許玩家鍵入選項，這是基岩版玩家所必需的，因為他們的聊天不支援可點選指令。不匹配任何選項的聊天訊息會繼續作為普通聊天處理。

在迴圈中構建的標籤需要有自己的後備數組，並保持到 `choose` 返回。迴圈內臨時的 `&.{ ... }` 可能複用上一個標籤的記憶體。[提示範例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/prompt.zig)為其套件使用了獨立的標籤數組。

## 結束或保留問題

答案和選項處理函數都返回 `prompt.Reply`：

- `prompt.done()` 結束問題。
- `prompt.keep()` 讓問題保持開啟，包括其可點選選項。
- `prompt.retry(spans)` 讓問題保持開啟並發送另一條訊息。

`timeout` 預設為 60 秒[遊戲時間](./scheduling)。`keep()` 和 `retry()` 保留原始截止時間，不會重新開始超時。將其設定為 `null`，可讓問題一直保持開啟，直到處理函數結束它或插件調用 `prompt.cancel(player)`。`prompt.isAsking(player)` 表示玩家是否有尚未結束的問題。

每個玩家同時只有一個問題。新問題會替換上一個問題，包括在答案處理函數中提出新問題的情況。舊的可點選選項攜帶舊問題的令牌，無法回答新問題。

問題在沒有完成答案的情況下結束時，會調用 `on_end`。它接收 `(Server, Player, prompt.End, data)`，結束原因為 `.timeout`、`.cancelled`、`.left` 或 `.replaced`。處理函數以 `done()` 完成時不會執行它。

## 選擇行為

`ask` 接受一個 `capture` 回調，其 `Answer` 與 `on_answer` 相同。返回 `false` 可讓訊息繼續作為普通聊天。預設捕獲所有訊息。除非更改，否則 `cancel_word` 為 `"cancel"`；`null` 會將其關閉。系統會先檢查捕獲，因此如果過濾器對取消詞返回 `false`，該訊息也會作為聊天透過。

`ask` 和 `choose` 都接受 `match` 函數，用於比較聊天訊息和單詞。預設的 `prompt.sameWord` 會修剪兩端空格並忽略大小寫。原始 `Answer.text` 不會被更改。

傳給 `listen` 的選項可設定選項 `command` 及其 `permission` 和 `description`，以及 `chat` 事件的優先順序和阻塞模式。預設指令為 `<plugin>-choose`，權限為 `<plugin>:command.choose`。如果必須在答案廣播前將其取消，請讓聊天處理函數保持阻塞。

`prompt.texts.not_a_player` 和 `prompt.texts.question_over` 可以替換輔助函數自身的錯誤訊息。問題、選項、驗證和結束訊息均由插件提供。

## 會話資料和清理

`Ask.data` 會傳給答案和結束處理函數。`Choose.data` 用於 `on_end`；每個選項都有單獨的 `data`，會傳給 `on_pick`。它們是整數值，不是應用程式狀態的自有副本。對於多步驟表單，請將較大的狀態儲存在以玩家 UUID 為鍵的對映中，並將 `data` 用作索引或其他小型識別符號。

在答案成功時，以及 `on_end` 報告超時、取消、離開或替換時，都要移除該狀態。成功的 `done()` 不會調用 `on_end`。如果處理函數開啟下一個問題，請返回 `done()` 來結束舊問題；新會話會保持開啟。

輔助函數會複製選項詞和取消詞，供之後的回調使用。問題和標籤片段會立即構建，因此棧上的數組只需在 `ask` 或 `choose` 返回前保持有效。儲存在你自己的對映中的文字仍需要[自有記憶體](./memory)。
