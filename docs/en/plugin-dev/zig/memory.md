# Handles and Memory

Your callbacks receive strings, lists, records and handles from the plugin API. A handle refers to something that lives in the server, such as a `Player`, a `World` or an `ItemStack`. All of these are cleaned up automatically when the callback returns, so a plugin doesn't leak memory or handles by accident.

## How long things live

Anything the API gives you during a callback stays valid until that callback returns. That includes event data, command arguments, return values of API calls, strings such as `player.getName()`, slices such as `server.getAllPlayers()`, and handles.

Inside the callback you can use all of it freely. What doesn't work is saving it in a global and using it in a later callback, because by then the memory has been reused and the handle released.

## Keeping a handle

To use a handle in a later callback, call `keep()` on it. The handle is then yours until you release it with `deinit()`:

```zig
var host: ?pumpkin.Player = null;

fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
    if (host == null) {
        ev.player.keep();
        host = ev.player;
    }
}

fn onLeave(_: pumpkin.Server, ev: *pumpkin.EventData(.player_leave_event)) void {
    const current = host orelse return;
    if (std.meta.eql(current.getId(), ev.player.getId())) {
        current.deinit();
        host = null;
    }
}
```

Storing an id and looking the handle up again when you need it is often simpler, for example a player's UUID together with `server.getPlayerByUuid`.

Some functions take ownership of a handle you pass in, `player.openGui(gui)` for example. Their documentation says "Consumes", and the handle shouldn't be used or released after the call.

## Keeping data

Strings and slices from the API live in a memory arena that is reset after every callback. To keep one, copy it into memory that outlives the callback. `pumpkin.abi.heap` is an allocator for that:

```zig
var last_message: ?[]const u8 = null;

fn onChat(_: pumpkin.Server, ev: *pumpkin.EventData(.player_chat_event)) void {
    const copy = pumpkin.abi.heap.dupe(u8, ev.message) catch return;
    if (last_message) |old| pumpkin.abi.heap.free(old);
    last_message = copy;
}
```

For memory you only need during the callback, use `pumpkin.abi.arena()`. It is reset together with everything else when the callback returns, so you never free it yourself.

## Callbacks during API calls

An API call can run another callback of your plugin before it returns. `player.openGui`, for example, first closes the screen the player has open, and that fires `inventory_close_event` while `openGui` is still running.

Memory and handles stay correct when this happens, because the inner callback only cleans up what it received itself. Your own state, however, can change during the call. Don't hold on to a pointer into one of your own maps or lists across an API call if one of your callbacks could change that map or list in the meantime.
