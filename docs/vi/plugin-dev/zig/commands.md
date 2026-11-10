# Lệnh

Lệnh được khai báo như một tree với `pumpkin.cmd`. Server gửi tree đến client, cái này sử dụng nó để hoàn thành lệnh và kiểm tra đối số trong khi người chơi gõ. Một handler chỉ chạy sau khi input đã được phân tích.

## Lệnh đầu tiên

Các lệnh được liệt kê trong `pub const commands` được đăng ký trước khi `onLoad` chạy:

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

Entry đầu tiên trong `names` là tên của lệnh và phần còn lại là alias, vì vậy lệnh này trả lời cả `/hello` và `/hi`.

Mọi lệnh cần một permission node, và node phải bắt đầu bằng tên plugin theo sau là dấu hai chấm. `cmd` đăng ký node với server, và `default` quyết định ai có nó khi cấu hình permission của server không đề cập đến nó. Nó là `.allow` trừ khi bạn thiết lập. `.deny` cấp nó cho không ai theo mặc định, và `.{ .op = .two }` cấp nó cho operator cấp hai trở lên. Thiết lập `register_permission = false` khi bạn tự đăng ký node, ví dụ với children; `description` và `default` sau đó không đăng ký hoặc thay đổi node đó.

Permission gốc áp dụng cho toàn bộ command tree. Child node không có trường permission riêng; kiểm tra bất kỳ quy tắc truy cập bổ sung nào trong handler của chúng.

Một handler kết thúc với `cmd.ok(n)`, trong đó `n` là kết quả của lệnh, hoặc với `cmd.fail("...")`, cái này hiển thị thông báo cho người gửi như một lỗi.

Lệnh cũng có thể được đăng ký sau, từ `onLoad` hoặc bất kỳ nơi nào khác có context của plugin, với `try cmd.register(ctx, spec)`.

## Đối số

Đối số và từ cố định đi trong `then`, và mỗi cái có thể có `then` của riêng nó. Bất kỳ node nào có `run` là một lệnh hoàn chỉnh:

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

Tree này chấp nhận `/heal <target>`, `/heal <target> <amount>` và `/heal all`. Một `/heal` đơn giản bị từ chối, vì root không có `run`.

Tham số thứ hai của `.argument` là kiểu của đối số. Đây là những kiểu phổ biến nhất:

| Kiểu | Chấp nhận |
| --- | --- |
| `.players` | Một tên người chơi, hoặc một selector như `@a` hoặc `@p` |
| `.{ .integer = .{ min, max } }` | Một số nguyên. Một trong hai bound có thể là `null`; `.long` chấp nhận integer 64-bit. |
| `.{ .float = .{ min, max } }` | Một số thập phân. `.double` chấp nhận giá trị floating-point rộng hơn. |
| `.bool` | `true` hoặc `false` |
| `.{ .string = .single_word }` | Một từ đơn. `.quotable` cũng chấp nhận chuỗi được trích dẫn, và `.greedy` lấy phần còn lại của dòng. |
| `.block_pos`, `.position3d` | Tọa độ, bao gồm cả tương đối như `~ ~1 ~` |
| `.gamemode` | Một chế độ chơi |
| `.item`, `.block_state` | Một vật phẩm hoặc một khối |

Bound được kiểm tra bởi client khi người chơi gõ và bởi server khi nó phân tích lệnh. Handler `heal` không bao giờ thấy amount dưới 0.5.

Không phải mọi kiểu trong `pumpkin.command.ArgumentType` đều có thể sử dụng. `cmd.isSupported` cho biết cái nào có thể, và sử dụng bất kỳ cái nào khác trong `pub const commands` là một compile error. Với runtime registration, `cmd.register` thay vào đó trả về `error.UnsupportedArgument`; một permission registration bị từ chối trả về `error.PermissionRejected`. Để đọc phần còn lại của dòng, sử dụng `.{ .string = .greedy }`.

## Đọc đối số với `cmd.typed`

`cmd.typed` bọc một handler có tham số thứ ba là một struct, và điền mỗi trường từ đối số cùng tên:

```zig
fn heal(sender: cmd.Sender, _: pumpkin.Server, args: struct { target: pumpkin.Player, amount: ?f32 }) cmd.Result {
    if (args.amount) |amount| args.target.heal(amount) else args.target.setHealth(args.target.getMaxHealth());
    sender.sendMessage(msg.fmt(.green, "Healed {s}.", .{args.target.getName()}));
    return cmd.ok(1);
}
```

Trường tùy chọn là `null` khi đối số của chúng không được cung cấp, và trường có giá trị mặc định, như `amount: f32 = 4`, lấy mặc định. Đó là lý do tại sao một handler có thể phục vụ cả `/heal <target>` và `/heal <target> <amount>` trong tree trên.

Trường được khớp với đối số theo kiểu. Trường integer đọc đối số integer hoặc long, và trường float có thể đọc đối số integer hoặc floating-point. Một trường integer từ chối đối số float ngay cả khi giá trị của nó là số nguyên, như `2.0`; sử dụng một node `.integer` hoặc `.long` cho nó. Một giá trị không vừa với trường làm thất bại lệnh. Một trường `pumpkin.Player` cần đối số khớp chính xác một người chơi. Vì `.players` cũng chấp nhận selector, `/heal @a` với nhiều người chơi online sẽ thất bại với `'target' has to be exactly one player`. Để chấp nhận bất kỳ số lượng người chơi nào, sử dụng `[]const pumpkin.Player`. Mọi thứ khác được khớp theo kiểu của nó: `bool`, `[]const u8` cho văn bản, `pumpkin.common.BlockPos`, `pumpkin.common.GameMode` v.v. Một trường có kiểu không đối số nào tạo ra là một compile error.

Nếu một trường không tùy chọn không có đối số, lệnh thất bại với `missing argument 'name'`. Trong một tree đúng, điều này không thể xảy ra, vì vậy nhìn thấy nó thường có nghĩa là một trường được đặt tên khác với đối số của nó.

## Đọc đối số thủ công

Một handler cũng có thể lấy `cmd.Args` và tự đọc đối số:

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

`cmd.get(args, name, kind)` trả về đối số nếu nó được phân tích như kiểu đó, và `null` nếu không. `cmd.int` và `cmd.float` đọc bất kỳ đối số số nào như một `i64` hoặc một `f64`.

## Lỗi đối số

`cmd.typed` gọi `cmd.bad_argument` khi một trường bắt buộc bị thiếu hoặc một đối số không thể điền nó. Thay thế hook này để dịch hoặc định dạng lại lỗi. Nó nhận người gửi, tên đối số và một `cmd.Problem`: `.missing`, `.out_of_range`, `.not_whole` hoặc `.not_one_player`.

```zig
pub fn onLoad(_: pumpkin.Context) !void {
    cmd.bad_argument = argumentError;
}

fn argumentError(_: cmd.Sender, name: []const u8, problem: cmd.Problem) cmd.Result {
    return cmd.failWith(msg.fmt(.red, "Invalid {s}: {s}", .{ name, @tagName(problem) }));
}
```

Hook trả về một `cmd.Result`. `cmd.failWith` nhận một styled text component, trong khi `cmd.fail` nhận văn bản đơn giản. `cmd.defaultBadArgument` vẫn có sẵn khi chỉ một số lỗi cần xử lý tùy chỉnh.

## Gợi ý

Client đã hoàn thành các kiểu đối số built-in như tên người chơi. Cho các giá trị chỉ plugin của bạn biết về, cung cấp cho đối số một hàm `suggest`:

```zig
.argument("kit", .{ .string = .single_word }, .{ .run = giveKit, .suggest = suggestKits }),

fn suggestKits(_: cmd.Sender, _: pumpkin.Server, request: pumpkin.command.SuggestionRequest) pumpkin.command.CommandSuggestions {
    return cmd.suggestions(request, &.{ "starter", "builder", "warrior" });
}
```

`cmd.suggestions` cung cấp các giá trị với một prefix phân biệt hoa thường khớp với những gì người chơi đã gõ cho đến nay.

[Ví dụ `heal`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/heal.zig) có một command tree với đối số được đọc qua `cmd.typed`.

## Lệnh có và không có đối số

Đặt `run` trên root khi một lệnh có một dạng không đối số hữu ích, và trên các node đối số của nó cho các dạng khác. Trong [ví dụ heal](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/heal.zig), `/heal` chữa người gửi, trong khi `/heal <target> [amount]` chọn một người chơi khác. Handler root kiểm tra `sender.asPlayer()` vì lệnh cũng có thể đến từ console.

Sử dụng `cmd.defaultBadArgument(sender, name, problem)` cho các trường hợp mà hook lỗi đối số tùy chỉnh của bạn không xử lý. Hook thay đổi lỗi đối số được gõ; thất bại trong logic chính của lệnh vẫn trả về `cmd.fail` hoặc `cmd.failWith` trực tiếp.
