# Quick Start

This guide will help you get started with writing Pumpkin server plugins using the [Zig programming language](https://ziglang.org/).

Zig plugins for Pumpkin compile to WebAssembly (Wasm) components using the official [`pumpkin-api-zig`](https://github.com/Pumpkin-MC/pumpkin-api-zig) bindings.

---

## Prerequisites

Before building Zig plugins for Pumpkin, ensure you have the following installed:

- **[Zig](https://ziglang.org/download/)**: Version 0.16.0 or later.
- **[`wasm-tools`](https://github.com/bytecodealliance/wasm-tools)**: Available in your `PATH` (used by the build script to embed WIT metadata and generate the WebAssembly component).

---

## 1. Setting Up the Project

Create a new directory for your plugin project:

```bash
mkdir my-zig-plugin
cd my-zig-plugin
```

Fetch and add `pumpkin-api-zig` as a dependency:

```bash
zig fetch --save git+https://github.com/Pumpkin-MC/pumpkin-api-zig
```

Create `build.zig` in the project root:

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

---

## 2. Writing the Plugin

Create a `src` directory and add your plugin code in `src/main.zig`:

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

### Key Elements:
- **`std_options`**: Routes standard Zig logging (`std.log`) to Pumpkin's logger using `pumpkin.logFn`.
- **`pub const metadata`**: Defines plugin metadata (name, version, authors, description) required by Pumpkin when loading the component.
- **`pub const events`**: Defines event handlers registered by the plugin (such as `.player_join_event`).
- **`pub fn onLoad`**: Entry point invoked when Pumpkin initializes the plugin.
- **`pumpkin.register(MyPlugin)`**: Generates the necessary WebAssembly component exports and entry points at compile time.

> [!NOTE]
> Everything the API returns (handles included) is only valid until the current callback returns. Call `keep()` on a handle to hold on to it, then release it with `deinit()` when you're done.

---

## 3. Building the Plugin

Compile your plugin into a WebAssembly component:

```bash
zig build
```

This will produce `zig-out/my-zig-plugin.wasm` in your project root.

---

## 4. Running Your Plugin

1. Copy the compiled `.wasm` file to your server's `plugins/` directory:
   ```bash
   cp zig-out/my-zig-plugin.wasm /path/to/pumpkin/plugins/
   ```
2. Start or restart Pumpkin:
   ```bash
   ./pumpkin
   ```
3. Check the server logs to verify your plugin loaded:
   ```text
   [INFO] Hello from Zig!
   ```
