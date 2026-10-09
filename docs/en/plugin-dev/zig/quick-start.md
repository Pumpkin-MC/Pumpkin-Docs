# Quick Start

Pumpkin plugins can be written in [Zig](https://ziglang.org/) with the [`pumpkin-api-zig`](https://github.com/Pumpkin-MC/pumpkin-api-zig) bindings. A plugin is compiled to a WebAssembly component, which the server loads from its `plugins` folder.

The bindings are generated from the plugin API, so everything the API offers is available from Zig. On top of that there are a few helpers for the things almost every plugin does: listening to [events](./events), declaring [commands](./commands), building [text](./text), showing [menus](./menus), [scheduling](./scheduling) work and reading [files](./files).

## Prerequisites

You need [Zig](https://ziglang.org/download/) 0.16.0 and [`wasm-tools`](https://github.com/bytecodealliance/wasm-tools) in your `PATH`. The build uses `wasm-tools` to attach the plugin API to your code and to package it as a component.

## Setting up a project

Create a directory for the plugin and add the bindings as a dependency:

```bash
mkdir my-zig-plugin
cd my-zig-plugin
zig fetch --save git+https://github.com/Pumpkin-MC/pumpkin-api-zig
```

`zig fetch` records the current commit of the bindings in `build.zig.zon`. Running it again later updates them.

Then create `build.zig`:

```zig [build.zig]
const std = @import("std");
const pumpkin_api = @import("pumpkin_api_zig");

pub fn build(b: *std.Build) void {
    _ = pumpkin_api.addPlugin(b, b.dependency("pumpkin_api_zig", .{}), .{
        .name = "my-zig-plugin",
        .root_source_file = b.path("src/main.zig"),
    });
}
```

`addPlugin` compiles `src/main.zig` for `wasm32-wasi`, makes the API available to it as the `pumpkin` module and turns the result into a component.

If you are working on the bindings themselves, you can depend on a local checkout instead. The path is relative to your project:

```zig [build.zig.zon]
.dependencies = .{
    .pumpkin_api_zig = .{ .path = "../pumpkin-api-zig" },
},
```

## Writing the plugin

Put the following in `src/main.zig`:

```zig [src/main.zig]
const std = @import("std");
const pumpkin = @import("pumpkin");

pub const std_options: std.Options = .{ .logFn = pumpkin.logFn };

const MyPlugin = struct {
    pub const metadata: pumpkin.Metadata = .{
        .name = "my-zig-plugin",
        .version = "0.1.0",
        .authors = &.{"You"},
        .description = "An example plugin in Zig.",
    };

    pub const events = .{
        .player_join_event = onJoin,
    };

    pub fn onLoad(_: pumpkin.Context) !void {
        std.log.info("Hello from Zig!", .{});
    }

    fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
        std.log.info("{s} joined", .{ev.player.getName()});
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

A plugin is a struct handed to `pumpkin.register`, which generates everything the server needs to call into it. The struct's declarations describe the plugin. `metadata` is the only one that's required: it holds the name, version, authors and description the server shows, and can also list `dependencies` on other plugins and the `permissions` the plugin needs, which [Files and Configuration](./files) covers. `events` lists the events to listen to. `onLoad` runs after the plugin's events and commands have been registered, and `onUnload` runs before it is unloaded.

Setting `std_options.logFn` to `pumpkin.logFn` sends `std.log` output to the server console, with the scope in front if you use `std.log.scoped`.

Everything the API gives you, the event's `player` included, only lives until the callback returns. [Handles and Memory](./memory) explains how to keep things for longer.

## Building and running

```bash
zig build
cp zig-out/my-zig-plugin.wasm /path/to/pumpkin/plugins/
```

Start or restart the server, and the log should show the plugin's message:

```text
[INFO] Hello from Zig!
```

> [!WARNING]
> When the server loads a plugin, it checks that both were built against the same plugin API. If they weren't, it refuses the plugin with `Plugin was built against a different iteration of the API`. Use a server build from around the same time as your version of the bindings, and rebuild the plugin after updating either.

The [example plugin](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/main/example/src/main.zig) in the bindings repository uses every helper described in these pages.
