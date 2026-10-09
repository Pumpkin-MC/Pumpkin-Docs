# Events

The server fires an event for most of what happens in the game: a player joins, chats, breaks a block, dies. A plugin can listen to any of them, look at the event, change it, or cancel it.

## Listening to events

Events are listed in `pub const events`, with the event's name on the left and the handler on the right:

```zig [src/main.zig]
const std = @import("std");
const pumpkin = @import("pumpkin");

const MyPlugin = struct {
    pub const metadata: pumpkin.Metadata = .{
        .name = "my-zig-plugin",
        .version = "0.1.0",
    };

    pub const events = .{
        .player_join_event = onJoin,
        .player_chat_event = onChat,
        .block_break_event = onBreak,
    };

    fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
        std.log.info("{s} joined", .{ev.player.getName()});
    }

    fn onChat(_: pumpkin.Server, ev: *pumpkin.EventData(.player_chat_event)) void {
        if (std.mem.indexOf(u8, ev.message, "spoiler") != null) ev.cancelled = true;
    }

    fn onBreak(_: pumpkin.Server, ev: *pumpkin.EventData(.block_break_event)) void {
        ev.should_drop = false;
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

Each handler receives the server and a pointer to the event. `pumpkin.EventData(.player_chat_event)` is the type of that event's data, so the compiler knows which fields it has, and a misspelled event name doesn't compile. The events and their fields are generated into `pumpkin.event`, and completion on `pumpkin.EventData(.` is a quick way to look through them.

## Changing and cancelling events

Because the handler gets the event by pointer, whatever it changes is passed back to the server. Most events have a `cancelled` field. Setting it stops the event from happening: the chat message above is never sent, and a cancelled block break leaves the block where it was. Other fields work the same way. The `onBreak` handler above lets the block break but stops it from dropping anything, and `player_join_event` has a `join_message` you can replace.

## Priority and blocking

A handler can be given options by pairing it with `pumpkin.EventOptions`:

```zig
pub const events = .{
    .player_chat_event = .{ onChat, pumpkin.EventOptions{ .priority = .high } },
    .player_join_event = .{ onJoin, pumpkin.EventOptions{ .blocking = false } },
};
```

`priority` is one of `.highest`, `.high`, `.normal`, `.low` and `.lowest`, with `.normal` as the default.

`blocking` decides whether the server waits for the handler. By default it does, which is what allows a handler to change or cancel the event. A non-blocking handler doesn't hold the server up, but any changes it makes are thrown away, so it only suits handlers that just watch, like logging or statistics.

## Registering handlers at runtime

The handlers in `pub const events` are registered before `onLoad` runs. To register one later, or only under some condition, call `pumpkin.on` with the plugin's context:

```zig
pub fn onLoad(ctx: pumpkin.Context) !void {
    pumpkin.on(ctx, .player_death_event, onDeath, .{});
}

fn onDeath(_: pumpkin.Server, ev: *pumpkin.EventData(.player_death_event)) void {
    std.log.info("{s} died", .{ev.player.getName()});
}
```

The last argument takes the same `EventOptions`.
