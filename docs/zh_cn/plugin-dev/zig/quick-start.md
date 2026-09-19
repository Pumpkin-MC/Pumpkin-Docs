# 快速入门

本指南将帮助你开始使用 [Zig 语言](https://ziglang.org/)编写 Pumpkin 服务器插件。

针对 Pumpkin 的 Zig 语言插件通过官方提供的 [`pumpkin-api-zig`](https://github.com/Pumpkin-MC/pumpkin-api-zig) 绑定编译为 WebAssembly（Wasm）组件。

---

## 前置要求

在构建 Zig 语言插件之前，请确保已安装以下工具：

- **[Zig](https://ziglang.org/download/)**：0.16.0 或更高版本。
- **[`wasm-tools`](https://github.com/bytecodealliance/wasm-tools)**：确保已存在于系统的 `PATH` 环境变量中（构建脚本使用它来嵌入 WIT 元数据并生成 WebAssembly 组件）。

---

## 1. 初始化项目

为你的插件项目创建一个新目录：

```bash
mkdir my-zig-plugin
cd my-zig-plugin
```

获取并添加 `pumpkin-api-zig` 依赖：

```bash
zig fetch --save git+https://github.com/Pumpkin-MC/pumpkin-api-zig
```

在项目根目录下创建 `build.zig`：

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

## 2. 编写插件代码

创建 `src` 目录并在 `src/main.zig` 中添加代码：

```zig [src/main.zig]
const std = @import("std");
const pumpkin = @import("pumpkin");

pub const std_options: std.Options = .{ .logFn = pumpkin.logFn };

const MyPlugin = struct {
    pub const metadata: pumpkin.Metadata = .{
        .name = "my-zig-plugin",
        .version = "0.1.0",
        .authors = &.{"你的名字"},
        .description = "Zig 语言编写的示例插件。",
    };

    pub const events = .{
        .player_join_event = onJoin,
    };

    pub fn onLoad(_: pumpkin.Context) !void {
        std.log.info("来自 Zig 插件的问候！", .{});
    }

    fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
        std.log.info("{s} 加入了游戏", .{ev.player.getName()});
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

### 关键要素：
- **`std_options`**：通过 `pumpkin.logFn` 将标准 Zig 日志（`std.log`）重定向到 Pumpkin 的日志系统。
- **`pub const metadata`**：定义组件加载时 Pumpkin 所需的插件元数据（名称、版本、作者、描述）。
- **`pub const events`**：定义插件注册的事件处理函数（例如 `.player_join_event`）。
- **`pub fn onLoad`**：Pumpkin 初始化插件时调用的入口点。
- **`pumpkin.register(MyPlugin)`**：在编译期生成所需的 WebAssembly 组件导出项与入口点。

> [!NOTE]
> API 返回的所有对象（包括句柄）仅在当前回调执行期间有效。若需保留句柄，请调用 `keep()`，并在使用完毕后通过 `deinit()` 释放。

---

## 3. 构建插件

将插件编译为 WebAssembly 组件：

```bash
zig build
```

编译完成后，会在项目根目录生成 `zig-out/my-zig-plugin.wasm` 文件。

---

## 4. 运行插件

1. 将生成的 `.wasm` 文件复制到 Pumpkin 服务器的 `plugins/` 目录中：
   ```bash
   cp zig-out/my-zig-plugin.wasm /path/to/pumpkin/plugins/
   ```
2. 启动或重启 Pumpkin 服务器：
   ```bash
   ./pumpkin
   ```
3. 查看控制台日志确认插件已成功加载：
   ```text
   [INFO] 来自 Zig 插件的问候！
   ```
