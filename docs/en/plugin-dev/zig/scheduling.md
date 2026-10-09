# Scheduling

A plugin can run code later, or repeatedly on a timer. Time is measured in game ticks, and the server runs 20 ticks per second.

## Delayed and repeating tasks

```zig
pub fn onLoad(_: pumpkin.Context) !void {
    _ = pumpkin.runLater(announce, 20 * 60);
    _ = pumpkin.runEvery(autosave, 20 * 60 * 5, 20 * 60 * 5);
}

fn announce(srv: pumpkin.Server) void {
    srv.broadcast("The server has been up for a minute.");
}

fn autosave(_: pumpkin.Server) void {
    std.log.info("saving", .{});
}
```

`pumpkin.runLater(handler, delay)` runs the handler once, `delay` ticks from now. `pumpkin.runEvery(handler, delay, period)` runs it for the first time after `delay` ticks and then every `period` ticks. Here the announcement goes out after a minute, and the autosave runs every five minutes.

A task is a `fn (pumpkin.Server) void` that has to be known at compile time, so you pass the function itself rather than a pointer to it.

## Cancelling a task

Both functions return a task id, which `pumpkin.scheduler.cancelTask` takes to stop the task:

```zig
var autosave_task: ?u32 = null;

pub fn onLoad(_: pumpkin.Context) !void {
    autosave_task = pumpkin.runEvery(autosave, 0, 20 * 60);
}

pub fn onUnload(_: pumpkin.Context) !void {
    if (autosave_task) |id| pumpkin.scheduler.cancelTask(id);
}
```

## Passing information to a task

A task only receives the server. Anything else it needs has to be stored somewhere it can find it, such as a global variable. When the task is about a player, store the player's UUID rather than the `Player` handle: the handle is released when the callback that scheduled the task returns, as [Handles and Memory](./memory) explains.

```zig
var pending_teleport: ?pumpkin.uuid.Uuid = null;

fn scheduleTeleport(player: pumpkin.Player) void {
    pending_teleport = player.getId();
    _ = pumpkin.runLater(teleportNow, 20 * 5);
}

fn teleportNow(srv: pumpkin.Server) void {
    const id = pending_teleport orelse return;
    pending_teleport = null;
    const player = srv.getPlayerByUuid(id) orelse return;
    player.sendSystemMessage(pumpkin.msg.plain("Whoosh!"), false);
}
```

`getPlayerByUuid` returns `null` if the player has left in the meantime, which the task has to be ready for.
