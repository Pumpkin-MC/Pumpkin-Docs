# Lên lịch

Một plugin có thể chạy code sau, hoặc lặp lại trên một timer, với `pumpkin.tasks`. Helper chuyển đổi giây và phút tại 20 tick mỗi giây. Task chạy trên game tick, vì vậy tốc độ tick đã thay đổi hoặc lag server thay đổi thời gian đồng hồ tường của chúng.

## Task bị trì hoãn và lặp lại

```zig
const tasks = pumpkin.tasks;

pub fn onLoad(_: pumpkin.Context) !void {
    _ = tasks.after(.minutes(1), announce, {});
    _ = tasks.every(.minutes(5), autosave, {});
}

fn announce(srv: pumpkin.Server) void {
    srv.broadcast("The server has been up for a minute.");
}

fn autosave(_: pumpkin.Server) void {
    std.log.info("saving", .{});
}
```

`tasks.after(delay, handler, data)` chạy handler một lần, `delay` từ bây giờ. `tasks.every(period, handler, data)` chạy nó mỗi `period`, bắt đầu một period từ bây giờ. `tasks.repeat(delay, period, handler, data)` làm tương tự nhưng chạy lần đầu tiên sau `delay`, vì vậy `.fromTicks(0)` khởi động nó trên tick tiếp theo.

Duration được viết như `.fromTicks(n)`, `.milliseconds(n)`, `.seconds(n)` hoặc `.minutes(n)`. Mili giây được làm tròn lên thành whole tick. Một period lặp lại bằng không được kẹp thành một tick.

Task vẫn được lên lịch khi plugin unload được hủy, vì vậy một plugin không phải tự dọn dẹp chúng.

## Chuyển một giá trị đến một task

Đối số cuối cùng là một giá trị task mang theo nó. Nó được copy khi task được lên lịch, và handler nhận nó như tham số thứ hai:

```zig
fn scheduleTeleport(player: pumpkin.Player) void {
    _ = tasks.after(.seconds(5), teleport, player.getId());
}

fn teleport(srv: pumpkin.Server, id: pumpkin.uuid.Uuid) void {
    const player = srv.getPlayerByUuid(id) orelse return;
    player.sendSystemMessage(pumpkin.msg.plain("Whoosh!"), false);
}
```

Lưu trữ UUID của người chơi thay vì handle `Player`. Handle được giải phóng khi callback đã lên lịch task trả về, như [Handles and Memory](./memory) giải thích, và `getPlayerByUuid` trả về `null` nếu người chơi đã rời đi trong khi đó.

Giá trị có thể là bất kỳ kiểu nào, như một struct với vài trường. Tuy nhiên, slice trong nó không được copy, vì vậy một string task cần sau phải được copy đến `pumpkin.abi.heap` đầu tiên và được giải phóng bởi task khi nó xong với nó. Hủy một task giải phóng copy của giá trị, nhưng không phải cái mà giá trị trỏ đến, vì vậy nếu task có thể bị hủy trước khi nó chạy, giải phóng string nơi bạn hủy nó cũng như vậy. Task bị hủy vì plugin unload không cần điều này.

Một task không có gì để mang chuyển `{}` và chỉ nhận server, như `announce` trên làm.

## Thay đổi giá trị và dừng một task

Một handler cũng có thể nhận một con trỏ đến giá trị và `tasks.Task` chính nó. Thay đổi giá trị được giữ cho lần chạy tiếp theo, và `task.cancel()` dừng task từ bên trong:

```zig
const Countdown = struct {
    player: pumpkin.uuid.Uuid,
    left: u32,
};

fn startCountdown(player: pumpkin.Player) void {
    _ = tasks.repeat(.fromTicks(0), .seconds(1), tick, Countdown{ .player = player.getId(), .left = 10 });
}

fn tick(srv: pumpkin.Server, countdown: *Countdown, task: tasks.Task) void {
    const player = srv.getPlayerByUuid(countdown.player) orelse return task.cancel();
    if (countdown.left == 0) {
        player.showTitle(pumpkin.msg.fmt(.green, "Go!", .{}));
        return task.cancel();
    }
    player.showTitle(pumpkin.msg.fmt(.gold, "{d}", .{countdown.left}));
    countdown.left -= 1;
}
```

## Hủy từ bên ngoài

`after`, `every` và `repeat` trả về `Task`, cái này có thể được giữ và hủy sau:

```zig
var restart: ?tasks.Task = null;

fn scheduleRestart() void {
    restart = tasks.after(.minutes(10), doRestart, {});
}

fn abortRestart() void {
    if (restart) |task| task.cancel();
    restart = null;
}
```

`task.pending()` cho biết liệu task vẫn đang được lên lịch. Hủy một task đã chạy hoặc đã bị hủy không làm gì, vì vậy một `Task` được giữ có thể bị hủy bất cứ lúc nào.

## Task không có giá trị

`pumpkin.runLater(handler, delay_ticks)` và `pumpkin.runEvery(handler, delay_ticks, period_ticks)` lên lịch một `fn (pumpkin.Server) void` trực tiếp trên scheduler của server. Chúng nhận tick và trả về raw task ID của server cho `pumpkin.scheduler.cancelTask`, thay vì một `tasks.Task` sở hữu một giá trị được copy. Ưu tiên `pumpkin.tasks` khi bạn cần giá trị đó, cancellation tracking hoặc automatic helper cleanup.

[Ví dụ `tasks`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/tasks.zig) có countdown từ trang này và một lời nhắc chạy một lần.

## Timeout được sử dụng bởi helper khác

Prompt chấp nhận cùng `tasks.Duration`, như `.timeout = .seconds(30)`. Một store sử dụng nó cho `.autosave = .minutes(1)`. Giữ một prompt mở vô thời hạn với `timeout = null`, và giữ các entry store được cache với `idle = null`; những option đó thuộc về lifetime khác nhau.

Lên lịch công việc cho sau không chạy nó song song. Một callback task vẫn chạy đến hoàn thành, giống như một sự kiện hoặc lệnh. Một yêu cầu HTTP hoặc đọc socket chặn trong một task vẫn có thể trì hoãn các callback khác. Chia công việc dài thành các task ngắn hoặc sử dụng các polled callback được mô tả trong [Networking](./networking).
