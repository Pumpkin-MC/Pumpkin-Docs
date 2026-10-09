# Files and Configuration

Zig plugins are built for `wasm32-wasi`, so the standard `std.Io` file functions work in them. Plugins run in a sandbox, though. A plugin only gets access to what it asks for in its metadata, and server admins can still take that access away.

## Asking for access

The permissions a plugin needs go in `metadata.permissions`:

```zig
pub const metadata: pumpkin.Metadata = .{
    .name = "my-zig-plugin",
    .version = "0.1.0",
    .permissions = &.{ "fs.read.data", "fs.write.data" },
};
```

| Permission | Grants |
| --- | --- |
| `fs.read.data` | Reading files in the plugin's data folder |
| `fs.write.data` | Reading and writing files in the plugin's data folder |
| `network.dns` | DNS lookups |
| `http.outbound` | Outgoing HTTP requests |
| `sys.env` | The server's environment variables |

These permissions control what the plugin itself can do. They are separate from the permission nodes that control which players can run your [commands](./commands).

## The data folder

Each plugin has a data folder at `plugins/data/<plugin name>/`. With either `fs` permission, the plugin sees this folder as its current directory, so files in it are opened through `std.Io.Dir.cwd()`. The file functions also need an `std.Io`, which `pumpkin.io()` returns:

```zig
const io = pumpkin.io();
const dir = std.Io.Dir.cwd();

try dir.writeFile(io, .{ .sub_path = "notes.txt", .data = "hello" });
const notes = try dir.readFileAlloc(io, "notes.txt", pumpkin.abi.heap, .limited(64 * 1024));
```

Files outside the data folder can't be reached.

## A config file

Plugins usually read their config in `onLoad`, and write a default config the first time they run. This one keeps its config in a JSON file:

```zig [src/main.zig]
const std = @import("std");
const pumpkin = @import("pumpkin");
const msg = pumpkin.msg;

pub const std_options: std.Options = .{ .logFn = pumpkin.logFn };

const Config = struct {
    welcome: []const u8 = "Welcome to the server!",
    max_homes: u32 = 3,
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

    var config: Config = .{};

    pub fn onLoad(_: pumpkin.Context) !void {
        config = try loadConfig();
        std.log.info("players can have {d} homes", .{config.max_homes});
    }

    fn loadConfig() !Config {
        const io = pumpkin.io();
        const dir = std.Io.Dir.cwd();
        const text = dir.readFileAlloc(io, "config.json", pumpkin.abi.heap, .limited(64 * 1024)) catch |err| switch (err) {
            error.FileNotFound => {
                const default = try std.json.Stringify.valueAlloc(pumpkin.abi.arena(), Config{}, .{ .whitespace = .indent_2 });
                try dir.writeFile(io, .{ .sub_path = "config.json", .data = default });
                return .{};
            },
            else => return err,
        };
        return std.json.parseFromSliceLeaky(Config, pumpkin.abi.heap, text, .{ .ignore_unknown_fields = true });
    }

    fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
        ev.player.sendSystemMessage(msg.plain(config.welcome), false);
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

The example uses two allocators. The config is parsed into `pumpkin.abi.heap`, because it has to stay around after `onLoad` returns. The text of the default config is only needed until the file is written, so it goes into `pumpkin.abi.arena()`, which is freed when `onLoad` returns. [Handles and Memory](./memory) has more on the difference.
