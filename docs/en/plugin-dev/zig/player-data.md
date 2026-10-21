# Player Data

`pumpkin.store` keeps data a plugin has for each player, such as coins, homes or statistics. It also works for anything else with a name, like towns or warps. Every entry is a file in the plugin's data folder, JSON by default, so it needs the `fs.read.data` and `fs.write.data` permissions.

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

`profiles.player(player)` returns a pointer to the player's entry. Change it like any other struct. No save call is needed for normal autosaving: the store detects changed content at its save checks. Use an explicit save when the caller must observe a disk-write failure.

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
- `idle` controls unused autosave checks before eviction. With the default `1`, the first unused check marks an entry idle and the next can drop it after saving. Each `get` or `player` call resets that counter. `null` keeps entries until the plugin unloads. Looking up an evicted entry reads the file again.
- A save writes a temporary file and then renames it over the old file, avoiding a partly written replacement. Unsaved changes in memory can still be lost if the server stops unexpectedly.
- Fields a file lacks get their defaults, so new fields can be added to the struct later. Fields the struct no longer has are dropped the next time the entry is written.

## Errors

`player` and `get` return an error instead of the entry when its file can't be used. `error.InvalidData` means the file cannot be decoded into the struct with the selected codec, for example after a bad edit by hand. The error is logged with the file's path, and the file is left as it is instead of being reset to the defaults, so fixing the file brings the data back. `error.ReadFailed` usually means a missing `fs` permission.

## File formats and limits

The store's `codec` decides the file extension and how entries are written and read. `pumpkin.store.json(Profile, .indent_2)` is the default. Other JSON layouts, such as `.indent_4` and `.minified`, use the same format with different whitespace. `pumpkin.store.toml(Profile)` stores entries in `.toml` files.

```zig
var profiles: pumpkin.store.Store(Profile) = .{
    .dir = "players",
    .codec = pumpkin.store.toml(Profile),
    .idle = 3,
    .max_size = 4 * 1024 * 1024,
};
```

`max_size` limits each file read to 16 MiB unless changed. A custom `store.Codec(Profile)` supplies an `extension`, an `encode` function and a `decode` function. The decoder must allocate strings and slices with its supplied allocator, which lives as long as the entry. Changing a codec does not migrate existing files.

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

`profiles.get(key)` returns the entry for any key, such as a town name. Keys may contain letters, digits, `-`, `_` and `.`, and can't be empty or start with a `.`, which keeps them inside the store's folder. `player(p)` is `get` with the player's UUID. The default check is also public as `store.isValidKey`. Replace `valid_key` to accept different keys; a custom check must keep the resulting path inside the store's folder.

`exists(key)` tells whether a key has an entry, `save(key)` writes one right away, `flush()` writes every changed entry, and `remove(key)` deletes an entry and its file.

Entries of players who are offline can be read with their UUID. The server only finds online players by name, though, so a plugin that looks up offline players by name has to keep its own list of names and UUIDs.

[The `store` example](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/store.zig) counts visits and keeps homes that players set with `/sethome` and teleport back to with `/home`.

## Explicit saves and cached files

```zig
fn saveProfile(player: pumpkin.Player) !void {
    const key = pumpkin.uuid.toString(player.getId());
    try profiles.save(key);
}
```

`save(key)` reports a write failure to its caller and only writes entries already loaded into this store. `flush()` and autosave log failures instead of returning them; failed entries remain dirty for another save attempt. A successful save is not a transaction with a player's inventory or another store.

While an entry is cached, changing its file on disk does not refresh it. Stop the plugin before editing a live store file, or it can overwrite your changes at the next save. Switching from JSON to TOML changes which files are read; it does not migrate old data.

The [vault example](./menus#a-vault-with-pages) snapshots its current menu into store data before navigation and on close. Its normal autosave still controls when that changed data reaches disk.
