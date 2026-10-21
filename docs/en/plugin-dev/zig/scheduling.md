# Scheduling

A plugin can run code later, or repeatedly on a timer, with `pumpkin.tasks`. The helpers convert seconds and minutes at 20 ticks per second. Tasks run on game ticks, so a changed tick rate or server lag changes their wall-clock timing.

## Delayed and repeating tasks

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

`tasks.after(delay, handler, data)` runs the handler once, `delay` from now. `tasks.every(period, handler, data)` runs it every `period`, starting one period from now. `tasks.repeat(delay, period, handler, data)` does the same but runs the first time after `delay`, so `.fromTicks(0)` starts it on the next tick.

Durations are written as `.fromTicks(n)`, `.milliseconds(n)`, `.seconds(n)` or `.minutes(n)`. Milliseconds are rounded up to whole ticks. A repeating period of zero is clamped to one tick.

Tasks that are still scheduled when the plugin unloads are cancelled, so a plugin doesn't have to clean them up itself.

## Passing a value to a task

The last argument is a value the task carries with it. It is copied when the task is scheduled, and the handler gets it as its second parameter:

```zig
fn scheduleTeleport(player: pumpkin.Player) void {
    _ = tasks.after(.seconds(5), teleport, player.getId());
}

fn teleport(srv: pumpkin.Server, id: pumpkin.uuid.Uuid) void {
    const player = srv.getPlayerByUuid(id) orelse return;
    player.sendSystemMessage(pumpkin.msg.plain("Whoosh!"), false);
}
```

Store the player's UUID rather than the `Player` handle. The handle is released when the callback that scheduled the task returns, as [Handles and Memory](./memory) explains, and `getPlayerByUuid` returns `null` if the player has left in the meantime.

The value can be any type, such as a struct with several fields. Slices inside it aren't copied, though, so a string the task needs later has to be copied to `pumpkin.abi.heap` first and freed by the task when it is done with it. Cancelling a task frees its copy of the value, but not what the value points to, so if the task can be cancelled before it runs, free the string where you cancel it as well. Tasks that are cancelled because the plugin unloads don't need this.

A task with nothing to carry passes `{}` and takes only the server, as `announce` above does.

## Changing the value and stopping a task

A handler can also take a pointer to the value and the `tasks.Task` itself. Changes to the value are kept for the next run, and `task.cancel()` stops the task from inside:

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

## Cancelling from outside

`after`, `every` and `repeat` return the `Task`, which can be kept and cancelled later:

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

`task.pending()` tells whether the task is still scheduled. Cancelling a task that has already run or been cancelled does nothing, so a kept `Task` can be cancelled at any time.

## Tasks without a value

`pumpkin.runLater(handler, delay_ticks)` and `pumpkin.runEvery(handler, delay_ticks, period_ticks)` schedule a `fn (pumpkin.Server) void` directly on the server's scheduler. They take ticks and return the server's raw task ID for `pumpkin.scheduler.cancelTask`, rather than a `tasks.Task` that owns a copied value. Prefer `pumpkin.tasks` when you need that value, cancellation tracking or automatic helper cleanup.

[The `tasks` example](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/tasks.zig) has the countdown from this page and a reminder that runs once.

## Timeouts used by other helpers

Prompts accept the same `tasks.Duration`, such as `.timeout = .seconds(30)`. A store uses it for `.autosave = .minutes(1)`. Keep a prompt open indefinitely with `timeout = null`, and keep store entries cached with `idle = null`; those options belong to different lifetimes.

Scheduling work for later does not run it in parallel. A task callback still runs to completion, just like an event or command. An HTTP request or blocking socket read inside a task can still delay other callbacks. Split long work across short tasks or use the polled callbacks described in [Networking](./networking).
