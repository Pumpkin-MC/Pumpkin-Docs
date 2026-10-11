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
| `sys.env` | The server's environment variables |

[Networking](./networking#permissions) lists the permissions for network access.

When the server loads a plugin that asks for permissions, it asks the admin in the console whether to grant them, and remembers the answer. These permissions control what the plugin itself can do. They are separate from the permission nodes that control which players can run your [commands](./commands).

## A config file

`pumpkin.config` keeps a plugin's settings in a file in its data folder. The settings are a struct, and the defaults of its fields are the default config:

```zig [src/main.zig]
const std = @import("std");
const pumpkin = @import("pumpkin");
const cmd = pumpkin.cmd;
const msg = pumpkin.msg;

pub const std_options: std.Options = .{ .logFn = pumpkin.logFn };

const Config = struct {
    message: []const u8 = "Welcome to the server!",
    color: msg.Color = .gold,
    title: struct {
        enabled: bool = true,
        text: []const u8 = "Welcome",
        stay: i32 = 60,
    } = .{},
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

    pub const commands: []const cmd.Spec = &.{.{
        .names = &.{"welcome"},
        .permission = "my-zig-plugin:command.welcome",
        .default = .{ .op = .two },
        .then = &.{.literal("reload", .{ .run = reload })},
    }};

    var config: pumpkin.config.File(Config) = .{ .path = "config.toml" };

    pub fn onLoad(_: pumpkin.Context) !void {
        try config.load();
    }

    fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
        const c = config.value;
        ev.player.sendSystemMessage(msg.fmt(c.color, "{s}", .{c.message}), false);
        if (c.title.enabled) {
            ev.player.sendTitleAnimation(10, c.title.stay, 20);
            ev.player.showTitle(msg.plain(c.title.text));
        }
    }

    fn reload(_: cmd.Sender, _: pumpkin.Server, _: cmd.Args) cmd.Result {
        config.load() catch return cmd.fail("the config has an error, see the server log");
        return cmd.ok(1);
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

The first time the plugin loads, `load` writes `plugins/data/my-zig-plugin/config.toml` with the defaults:

```toml
message = "Welcome to the server!"
color = "gold"

[title]
enabled = true
text = "Welcome"
stay = 60
```

After that, `load` reads the file into `config.value`. Nested structs become tables, enums are written by name, and slices become arrays. `/welcome reload` above applies changes to the file without a restart.

The file and the struct don't have to match exactly:

- Settings the file lacks get their defaults, and `load` adds them to the file. That's how settings added in a new version of the plugin reach existing configs. Optional fields can be left out without being added.
- Settings the struct doesn't have are reported in the log and left in the file.
- If the file can't be parsed, or a setting has the wrong type, `load` logs the error with its line and column, returns an error, and `config.value` keeps the values it had. A typo in the config doesn't reset the plugin to its defaults.

`config.save()` writes `config.value` back to the file, and `config.deinit()` frees the loaded values. Files whose `path` ends in `.json` are read and written as JSON instead of TOML.

The strings in `config.value` stay valid until the next successful `load`. For data that changes while the server runs, such as a player's coins, use [Player Data](./player-data) instead.

## Other files

With either `fs` permission, the plugin sees its data folder as its current directory, so files in it are opened through `std.Io.Dir.cwd()`. The file functions also need an `std.Io`, which `pumpkin.io()` returns:

```zig
const io = pumpkin.io();
const dir = std.Io.Dir.cwd();

try dir.writeFile(io, .{ .sub_path = "notes.txt", .data = "hello" });
const notes = try dir.readFileAlloc(io, "notes.txt", pumpkin.abi.heap, .limited(64 * 1024));
```

Files outside the data folder can't be reached. `notes` is allocated with `pumpkin.abi.heap`, so it stays valid after the callback returns. Use `pumpkin.abi.arena()` for data you only need during the callback. [Handles and Memory](./memory) has more on the difference.

[The `config` example](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.1.0/examples/config.zig) greets players with a message and a title from its config, and reloads it with `/welcome reload`.
