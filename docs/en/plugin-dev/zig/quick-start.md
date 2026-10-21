# Quick Start

Pumpkin plugins can be written in [Zig](https://ziglang.org/) with the [`pumpkin-api-zig`](https://github.com/Pumpkin-MC/pumpkin-api-zig) bindings. A plugin is compiled to a WebAssembly component, which the server loads from its `plugins` folder.

The bindings are generated from the plugin API, so everything the API offers is available from Zig. On top of that there are helpers for the things almost every plugin does: listening to [events](./events), declaring [commands](./commands), building [text](./text), showing [menus](./menus), asking [questions in chat](./prompts), handing out [items](./items), [scheduling](./scheduling) work, reading [config files](./files), keeping [player data](./player-data) and talking to the [network](./networking).

These guides cover `pumpkin-api-zig` 0.2.0. The [changelog](./changelog) lists the changes since 0.1.0. Your plugin's own `metadata.version` is independent of the bindings version.

## Prerequisites

You need [Zig](https://ziglang.org/download/) 0.16.0 and [`wasm-tools`](https://github.com/bytecodealliance/wasm-tools) in your `PATH`. The build uses `wasm-tools` to attach the plugin API to your code and to package it as a component.

## Setting up a project

Create a directory for the plugin:

```bash
mkdir my-zig-plugin
cd my-zig-plugin
```

Add the bindings as a dependency:

```bash
zig fetch --save git+https://github.com/Pumpkin-MC/pumpkin-api-zig#v0.2.0
```

The [releases](https://github.com/Pumpkin-MC/pumpkin-api-zig/releases) list every published version. To update, run the command again with the new one.

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
> Each release names the plugin API revision it was built against. The server and plugin need compatible revisions; otherwise the server rejects the plugin with `Plugin was built against a different iteration of the API`. Check the [WIT commit for your release](./changelog) before updating either one.

## Examples

The bindings repository has a small plugin for each part of the API. Building the repository with `zig build` builds them all into `zig-out/`.

| Example | Shows |
| --- | --- |
| [`hello`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/hello.zig) | Events, a command and styled text |
| [`heal`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/heal.zig) | Command arguments read with `cmd.typed` |
| [`menu`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/menu.zig) | Inventory menus with buttons and free slots |
| [`prompt`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/prompt.zig) | Questions answered in chat and choices to click |
| [`vault`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/vault.zig) | Personal storage with page selection, usage indicators and configurable capacity |
| [`items`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/items.zig) | Building, editing and recognizing items, and giving and taking them |
| [`tasks`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/tasks.zig) | Delayed and repeating tasks that carry a value |
| [`config`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/config.zig) | A TOML config file that can be reloaded |
| [`store`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/store.zig) | Data kept for every player in a file of its own |
| [`https`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/https.zig) | Web requests with `pumpkin.http` |
| [`tcp-server`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/tcp-server.zig) | A TCP server that bridges the chat |
| [`udp`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/udp.zig) | Receiving and answering UDP datagrams |
| [`dns`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/dns.zig) | Looking up the addresses of a host name |
| [`http`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/http.zig) | A TCP connection with a timeout, sending a plain HTTP request |
| [`nettest`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/nettest.zig) | Runs every networking path with `/nettest` and reports each one |

## Updating from 0.1.1

After changing the dependency, rebuild your plugin with `zig build` and copy the new `.wasm` to the server. Confirm that its plugin API revision matches the server before replacing a working installation.

The new helpers and options are described on their own pages:

| Area | What to use in 0.2.0 |
| --- | --- |
| [Chat prompts](./prompts) | Questions, clickable choices, validation, timeouts and custom matching. |
| [Menus](./menus) | `free` slots, existing `stacks`, `menu.items` and the configurable vault example. |
| [Commands](./commands) | `cmd.bad_argument` and `register_permission`. |
| [Items](./items) | Italic styling, explicit modifier IDs, shared data namespaces and capacity inspection. |
| [Configuration](./files) | Format selection, file size limits and control over creating or rewriting files. |
| [Player data](./player-data) | Codecs, key checks, idle eviction and bounded reads. |
| [Networking](./networking) | Receive buffer sizes and the HTTPS certificate bundle path. |
