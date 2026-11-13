# Chat Prompt

`pumpkin.prompt` hỏi người chơi một câu hỏi trong chat hoặc hiển thị lựa chọn để click. Plugin quyết định tin nhắn nào được tính là câu trả lời, cách xác thực chúng và khi nào câu hỏi kết thúc.

## Đặt một câu hỏi

Gọi `prompt.listen(ctx, .{})` một lần trong `onLoad`. Nó đăng ký các sự kiện chat và leave và một lệnh được sử dụng bởi các lựa chọn có thể click.

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

Một câu trả lời bị hủy như một sự kiện chat, vì vậy nó không được broadcast đến người chơi khác. `Answer` chứa `server`, `player`, `text` thô và `data` của câu hỏi. `number(T)` đọc một integer hoặc float, bỏ qua khoảng trắng xung quanh, và trả về `null` nếu không thể.

## Hiển thị lựa chọn

Một tin nhắn `choose` trộn text span và lựa chọn theo bất kỳ thứ tự. Mỗi lựa chọn có label, handler và `data` riêng:

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

Label chấp nhận các style và hover text của [text span](./text). Prompt cung cấp action click của nó. `word` cũng cho phép người chơi gõ một lựa chọn, mà người chơi Bedrock cần vì chat của họ không hỗ trợ lệnh có thể click. Tin nhắn chat không khớp với lựa chọn nào tiếp tục như chat bình thường.

Label được xây dựng trong một vòng lặp cần backing array riêng của chúng cho đến khi `choose` trả về. Một `&.{ ... }` tạm thời trong vòng lặp có thể tái sử dụng bộ nhớ của label trước. [Ví dụ prompt](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/prompt.zig) hiển thị các mảng label riêng cho kit của nó.

## Kết thúc hoặc giữ một câu hỏi

Cả handler câu trả lời và lựa chọn đều trả về một `prompt.Reply`:

- `prompt.done()` kết thúc câu hỏi.
- `prompt.keep()` để nó mở, bao gồm các lựa chọn có thể click của nó.
- `prompt.retry(spans)` để nó mở và gửi một tin nhắn khác.

`timeout` mặc định là 60 giây [game time](./scheduling). `keep()` và `retry()` giữ deadline ban đầu; chúng không khởi động lại timeout. Thiết lập nó thành `null` để giữ một câu hỏi mở cho đến khi handler kết thúc nó hoặc plugin gọi `prompt.cancel(player)`. `prompt.isAsking(player)` cho biết liệu người chơi có một câu hỏi đang mở.

Có một câu hỏi mỗi người chơi. Một câu hỏi mới thay thế câu hỏi trước, bao gồm khi được hỏi từ một handler câu trả lời. Các lựa chọn có thể click cũ mang token câu hỏi cũ và không thể trả lời cái mới.

`on_end` được gọi khi một câu hỏi kết thúc mà không có một câu trả lời hoàn chỉnh. Nó nhận `(Server, Player, prompt.End, data)`, với `.timeout`, `.cancelled`, `.left` hoặc `.replaced`. Nó không chạy khi một handler kết thúc với `done()`.

## Chọn hành vi

`ask` chấp nhận một callback `capture` với cùng `Answer` như `on_answer`. Trả về `false` để cho phép một tin nhắn tiếp tục như chat bình thường. Mặc định capture mọi tin nhắn. `cancel_word` là `"cancel"` trừ khi được thay đổi; `null` tắt nó. Capture được kiểm tra đầu tiên, vì vậy một filter trả về `false` cho cancel word cũng cho tin nhắn đó đi qua như chat.

Cả `ask` và `choose` chấp nhận một hàm `match` so sánh một tin nhắn chat với một từ. Mặc định, `prompt.sameWord`, cắt khoảng trắng xung quanh và bỏ qua case. `Answer.text` thô không được thay đổi.

Các option được chuyển đến `listen` thiết lập `command` lựa chọn, `permission` và `description` của nó, và priority và blocking mode của sự kiện `chat`. Lệnh mặc định là `<plugin>-choose`, và permission của nó là `<plugin>:command.choose`. Giữ chat handler blocking khi nó phải hủy câu trả lời trước khi chúng được broadcast.

`prompt.texts.not_a_player` và `prompt.texts.question_over` thay thế thông báo lỗi riêng của helper. Các câu hỏi, lựa chọn, xác thực và tin nhắn kết thúc được cung cấp bởi plugin.

## Session data và dọn dẹp

`Ask.data` được chuyển đến handler câu trả lời và kết thúc của nó. `Choose.data` là cho `on_end`; mỗi lựa chọn có `data` riêng được chuyển đến `on_pick`. Đây là các giá trị integer, không phải bản sao sở hữu của trạng thái ứng dụng. Cho một form nhiều bước, giữ trạng thái lớn hơn trong một map được key bởi UUID của người chơi, và sử dụng `data` như một index hoặc định danh nhỏ khác.

Xóa trạng thái đó cả khi một câu trả lời thành công và khi `on_end` báo cáo timeout, hủy bỏ, rời đi hoặc thay thế. Một `done()` thành công không gọi `on_end`. Nếu một handler mở câu hỏi tiếp theo, trả về `done()` để kết thúc cái cũ; session mới vẫn mở.

Helper copy choice word và cancel word cho callback sau. Câu hỏi và label span được xây dựng ngay lập tức, vì vậy stack-backed array chỉ cần vẫn hợp lệ cho đến khi `ask` hoặc `choose` trả về. Văn bản được lưu trữ trong map riêng của bạn vẫn cần [owned memory](./memory).
