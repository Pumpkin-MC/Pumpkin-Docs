# 任务调度

插件可以使用 `pumpkin.tasks` 稍后运行代码，或按计时器重复运行。辅助函数按每秒 20 tick 换算秒和分钟。任务在 tick 上运行，因此 tick 速率变化或服务器延迟会改变它们的实际时间。

## 延迟任务和重复任务

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

`tasks.after(delay, handler, data)` 会在距当前 `delay` 后运行一次处理函数。`tasks.every(period, handler, data)` 每隔 `period` 运行一次，首次运行从一个周期后开始。`tasks.repeat(delay, period, handler, data)` 的作用相同，但首次在 `delay` 后运行，因此 `.fromTicks(0)` 会让它在下一个 tick 开始运行。

时长写作 `.fromTicks(n)`、`.milliseconds(n)`、`.seconds(n)` 或 `.minutes(n)`。毫秒会向上取整为完整 tick。重复周期为零时会被限制为一个 tick。

插件卸载时仍在调度中的任务会被取消，因此插件不必自行清理它们。

## 向任务传递值

最后一个参数是任务携带的值。调度任务时会复制该值，处理函数通过其第二个参数接收它：

```zig
fn scheduleTeleport(player: pumpkin.Player) void {
    _ = tasks.after(.seconds(5), teleport, player.getId());
}

fn teleport(srv: pumpkin.Server, id: pumpkin.uuid.Uuid) void {
    const player = srv.getPlayerByUuid(id) orelse return;
    player.sendSystemMessage(pumpkin.msg.plain("Whoosh!"), false);
}
```

请存储玩家的 UUID，而不是 `Player` 句柄。调度任务的回调返回时，该句柄就会被释放，如[句柄与内存](./memory)中所述；如果玩家在此期间离开，`getPlayerByUuid` 会返回 `null`。

该值可以是任意类型，例如包含多个字段的结构体。但其中的切片不会被复制，因此任务稍后需要的字符串必须先复制到 `pumpkin.abi.heap`，再由任务在使用完毕后释放。取消任务会释放它保存的值副本，但不会释放该值指向的内容，因此如果任务可能在运行前被取消，还应在取消任务的位置释放字符串。因插件卸载而取消的任务不需要这样做。

无需携带值的任务传入 `{}`，处理函数只接收服务器，如上面的 `announce`。

## 修改值和停止任务

处理函数还可以接收指向该值的指针以及 `tasks.Task` 本身。对值的修改会保留到下一次运行，`task.cancel()` 则可以从任务内部停止任务：

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

## 从外部取消

`after`、`every` 和 `repeat` 会返回 `Task`，可以保留它并在稍后取消：

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

`task.pending()` 表示任务是否仍在调度中。取消已经运行或已经取消的任务不会产生任何影响，因此保留的 `Task` 可以随时取消。

## 不携带值的任务

`pumpkin.runLater(handler, delay_ticks)` 和 `pumpkin.runEvery(handler, delay_ticks, period_ticks)` 会直接在服务器的调度器上调度 `fn (pumpkin.Server) void`。它们接受 tick 数，并返回服务器原始任务 ID，供 `pumpkin.scheduler.cancelTask` 使用，而不是返回拥有复制值的 `tasks.Task`。如果需要携带值、跟踪取消状态或由辅助函数自动清理，请优先使用 `pumpkin.tasks`。

[`tasks` 示例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/tasks.zig)包含本页的倒计时和一个只运行一次的提醒。

## 其他辅助函数使用的超时

提示接受相同的 `tasks.Duration`，例如 `.timeout = .seconds(30)`。存储将其用于 `.autosave = .minutes(1)`。使用 `timeout = null` 可让提示无限期保持打开，使用 `idle = null` 可让存储条目一直保留在缓存中；这两个选项属于不同的生命周期。

将工作调度到稍后运行并不会让它并行执行。任务回调仍会像事件或命令一样一直运行到完成。任务中的 HTTP 请求或阻塞式套接字读取仍会延迟其他回调。请将耗时工作拆分为多个短任务，或使用[网络](./networking)中介绍的轮询回调。
