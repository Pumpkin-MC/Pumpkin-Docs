# Player Data

`pumpkin.store` keeps data a plugin has for each player, such as coins, homes or statistics. It also works for anything else with a name, like towns or warps. Every entry is a JSON file in the plugin's data folder, so it needs the `fs.read.data` and `fs.write.data` permissions.

## A store

The data is a struct whose fields all have defaults:

```zig [src/main.zig]
const std = @import("std");
const pumpkin = @import("pumpkin");
const msg = pumpkin.msg;

const Profile = struct {
    visits: u32 = 0,
    coins: u64 = 0,
};

const MyPlugin = struct {
    pub const metadata: pumpkin.Metadata = .{
        .name = "my-zig-plugin",
        .version = "0.1.0",
        .permissions = &.{ "fs.read.data", "fs.write.data" },
    };

    pub const events = .{
        .player_join_event = onJoin,
    };

    var profiles: pumpkin.store.Store(Profile) = .{ .dir = "players" };

    fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
        const profile = profiles.player(ev.player) catch return;
        profile.visits += 1;
        ev.player.sendSystemMessage(msg.fmt(.gold, "Welcome! This is visit number {d}.", .{profile.visits}), false);
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

`profiles.player(player)` returns a pointer to the player's entry. Change it like any other struct. There is no save call, because the store notices the change by itself.

Each player gets a file named after their UUID, here `plugins/data/my-zig-plugin/players/<uuid>.json`:

```json
{
  "visits": 3,
  "coins": 0
}
```

## How entries are kept

- An entry is read from its file the first time it is used. A player without a file starts with the defaults, and no file is written until something changes.
- Entries that changed are written every minute and when the plugin unloads. `autosave` sets the interval, for example `.{ .dir = "players", .autosave = .seconds(30) }`.
- An entry that wasn't used for a whole interval is written if needed and then dropped from memory, so players who left don't pile up. Using it again reads it back.
- A file is written to a temporary file first and then renamed over the old one, so a crash halfway through doesn't leave a broken file.
- Fields a file lacks get their defaults, so new fields can be added to the struct later. Fields the struct no longer has are dropped the next time the entry is written.

## Errors

`player` and `get` return an error instead of the entry when its file can't be used. `error.InvalidData` means the file isn't valid JSON for the struct, for example after a bad edit by hand. The error is logged with the file's path, and the file is left as it is instead of being reset to the defaults, so fixing the file brings the data back. `error.ReadFailed` usually means a missing `fs` permission.

## Strings and lists

A string or slice stored in an entry has to live as long as the entry. `allocator` returns memory with exactly that lifetime:

```zig
const Home = struct { name: []const u8, x: f64, y: f64, z: f64 };
const Profile = struct { homes: []const Home = &.{} };

fn addHome(player: pumpkin.Player, name: []const u8) !void {
    const profile = try profiles.player(player);
    const memory = profiles.allocator(profile);
    const x, const y, const z = player.getPosition();
    const home: Home = .{ .name = try memory.dupe(u8, name), .x = x, .y = y, .z = z };
    profile.homes = try std.mem.concat(memory, Home, &.{ profile.homes, &.{home} });
}
```

That memory is freed when the entry is dropped. Since an entry can be dropped between callbacks, look it up again in every callback instead of keeping the pointer.

## Other keys

`profiles.get(key)` returns the entry for any key, such as a town name. Keys may contain letters, digits, `-`, `_` and `.`, and can't be empty or start with a `.`, which keeps them inside the store's folder. `player(p)` is `get` with the player's UUID.

`exists(key)` tells whether a key has an entry, `save(key)` writes one right away, `flush()` writes every changed entry, and `remove(key)` deletes an entry and its file.

Entries of players who are offline can be read with their UUID. The server only finds online players by name, though, so a plugin that looks up offline players by name has to keep its own list of names and UUIDs.

[The `store` example](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.1.0/examples/store.zig) counts visits and keeps homes that players set with `/sethome` and teleport back to with `/home`.
