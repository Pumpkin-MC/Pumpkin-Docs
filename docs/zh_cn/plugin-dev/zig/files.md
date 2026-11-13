# 文件与配置

Zig 插件针对 `wasm32-wasi` 构建，因此可以在其中使用标准的 `std.Io` 文件函数。不过，插件在沙盒中运行。插件只能访问其元数据中请求的内容，服务器管理员仍可撤销这些访问权限。

## 请求访问权限

插件需要的权限放在 `metadata.permissions` 中：

```zig
pub const metadata: pumpkin.Metadata = .{
    .name = "my-zig-plugin",
    .version = "0.1.0",
    .permissions = &.{ "fs.read.data", "fs.write.data" },
};
```

| 权限 | 允许的操作 |
| --- | --- |
| `fs.read.data` | 读取插件数据文件夹中的文件 |
| `fs.write.data` | 读取和写入插件数据文件夹中的文件 |
| `sys.env` | 读取服务器的环境变量 |

[网络](./networking#权限)列出了网络访问所需的权限。

服务器加载请求权限的插件时，会在控制台询问管理员是否授予这些权限，并记住答案。这些权限控制插件自身可以执行的操作。它们与控制哪些玩家可以运行[命令](./commands)的权限节点相互独立。

## 配置文件

`pumpkin.config` 将插件设置保存在其数据文件夹的文件中。设置由一个结构体表示，其字段默认值就是默认配置：

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

插件首次加载时，`load` 会使用默认值写入 `plugins/data/my-zig-plugin/config.toml`：

```toml
message = "Welcome to the server!"
color = "gold"

[title]
enabled = true
text = "Welcome"
stay = 60
```

之后，`load` 会将文件读取到 `config.value`。嵌套结构体会成为表，枚举按名称写入，切片会成为数组。上面的 `/welcome reload` 无需重启即可应用文件更改。

文件与结构体不必完全一致：

- 文件缺少的设置使用默认值，且 `load` 会将其添加到文件中。插件新版本增加的设置就是通过这种方式进入现有配置的。可选字段可以省略，不会被添加。
- 结构体没有的设置会记录在日志中。它们会保留在文件里，直到保存或缺失设置重写将类型化配置序列化；序列化会省略未知字段。
- 语法错误会连同位置一起记录；类型错误的设置会记录为转换错误。两者都会返回错误并保留先前的 `config.value`。
- 添加缺失设置可能需要在加载新值后写入文件。如果该写入失败，即使 `config.value` 已包含新设置，`load` 也会返回错误。

`config.save()` 将 `config.value` 写回文件，`config.deinit()` 释放已加载的值。`path` 以 `.json` 结尾的文件会按 JSON 而非 TOML 读写。

`config.value` 中的字符串会保持有效，直到 `load` 安装另一个解析值或 `deinit` 释放它们。即使随后写入缺失默认值失败，也可能已经安装了新值。对于服务器运行期间会变化的数据（例如玩家的金币），请改用[玩家数据](./player-data)。

## 选择文件行为

`File(T)` 为配置加载的各个环节提供了默认值：

| 字段 | 行为 |
| --- | --- |
| `format` | `.toml` 或 `.json`；`null` 根据文件名选择。 |
| `create` | `false` 在文件缺失时返回 `error.FileNotFound`，而不是创建文件。 |
| `add_missing` | `false` 为缺失设置使用默认值，但不将其写入文件。 |
| `report_unknown` | `false` 抑制有关结构体没有的设置的警告。 |
| `max_size` | 接受的最大文件大小，默认为 16 MiB。 |

例如，`.{ .path = "settings", .format = .toml, .create = false, .add_missing = false }` 读取现有 TOML 文件，不创建它，也不向其中添加默认值。显式调用 `save()` 时仍会写入当前值。

`pumpkin.config.toml` 公开了供其他文件使用的 TOML 解析器和写入器。`parse(allocator, text, diagnostics)` 返回 `std.json.Value` 树，`stringify(allocator, value)` 将值转换为 TOML。`Diagnostics` 报告解析错误的行、列和消息。

## 其他文件

拥有任一 `fs` 权限后，插件会将其数据文件夹视为当前目录，因此其中的文件通过 `std.Io.Dir.cwd()` 打开。文件函数还需要一个 `std.Io`，可由 `pumpkin.io()` 返回：

```zig
const io = pumpkin.io();
const dir = std.Io.Dir.cwd();

try dir.writeFile(io, .{ .sub_path = "notes.txt", .data = "hello" });
const notes = try dir.readFileAlloc(io, "notes.txt", pumpkin.abi.heap, .limited(64 * 1024));
defer pumpkin.abi.heap.free(notes);
```

无法访问数据文件夹之外的文件。`notes` 使用 `pumpkin.abi.heap` 分配，因此在回调返回后仍然有效。只在回调期间需要的数据请使用 `pumpkin.abi.arena()`。[句柄与内存](./memory)更详细地介绍了两者的区别。

[`config` 示例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/config.zig)使用配置中的消息和标题欢迎玩家，并通过 `/welcome reload` 重新加载配置。

## 包含数组的配置

TOML 写入器支持数组中的结构体和元组。配置可以保存一组命名目的地，而无需改用 JSON：

```zig
const Config = struct {
    destinations: []const struct { name: []const u8, x: i32, z: i32 } = &.{
        .{ .name = "spawn", .x = 0, .z = 0 },
        .{ .name = "market", .x = 100, .z = -20 },
    },
};
```

写入器将每个目的地序列化为 TOML 内联表。`load()` 不会验证最小页数或允许的坐标范围等应用程序规则；读取 `config.value` 后请自行检查，就像[仓库示例](./menus#带页面的仓库)检查容量那样。
