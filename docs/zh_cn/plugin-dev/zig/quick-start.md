# 快速入门

可以使用 [Zig](https://ziglang.org/) 和 [`pumpkin-api-zig`](https://github.com/Pumpkin-MC/pumpkin-api-zig) 绑定编写 Pumpkin 插件。插件会编译为 WebAssembly 组件，由服务器从其 `plugins` 文件夹加载。

绑定从插件 API 生成，因此 API 提供的所有功能都可以在 Zig 中使用。此外，绑定还为几乎每个插件都会执行的操作提供了辅助函数：监听[事件](./events)、声明[命令](./commands)、构建[文本](./text)、显示[菜单](./menus)、在聊天中[提问](./prompts)、发放[物品](./items)、[调度](./scheduling)工作、读取[配置文件](./files)、保存[玩家数据](./player-data)以及进行[网络](./networking)通信。

这些指南涵盖 `pumpkin-api-zig` 0.2.0。[更新日志](./changelog)列出了自 0.1.0 以来的更改。插件自己的 `metadata.version` 独立于绑定版本。

## 前置要求

你需要在 `PATH` 中安装 [Zig](https://ziglang.org/download/) 0.16.0 和 [`wasm-tools`](https://github.com/bytecodealliance/wasm-tools)。构建过程使用 `wasm-tools` 将插件 API 附加到你的代码，并将其打包为组件。

## 设置项目

为插件创建一个目录：

```bash
mkdir my-zig-plugin
cd my-zig-plugin
```

将绑定添加为依赖：

```bash
zig fetch --save git+https://github.com/Pumpkin-MC/pumpkin-api-zig#v0.2.0
```

[发布页面](https://github.com/Pumpkin-MC/pumpkin-api-zig/releases)列出了每个已发布版本。若要更新，请使用新版本再次运行该命令。

然后创建 `build.zig`：

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

`addPlugin` 会针对 `wasm32-wasi` 编译 `src/main.zig`，将 API 作为 `pumpkin` 模块提供给它，并将结果转换为组件。

如果你在开发绑定本身，也可以改为依赖本地检出的副本。路径相对于你的项目：

```zig [build.zig.zon]
.dependencies = .{
    .pumpkin_api_zig = .{ .path = "../pumpkin-api-zig" },
},
```

## 编写插件

将以下内容放入 `src/main.zig`：

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

插件是传给 `pumpkin.register` 的结构体，后者会生成服务器调用插件所需的一切。结构体的声明描述插件。只有 `metadata` 是必需的：它保存服务器显示的名称、版本、作者和描述，还可以列出对其他插件的 `dependencies` 以及插件需要的 `permissions`，后者在[文件与配置](./files)中介绍。`events` 列出要监听的事件。`onLoad` 在插件的事件和命令注册后运行，`onUnload` 在插件卸载前运行。

将 `std_options.logFn` 设置为 `pumpkin.logFn` 会把 `std.log` 输出发送到服务器控制台；如果使用 `std.log.scoped`，输出前还会带上作用域。

API 提供的一切（包括事件的 `player`）都只存活到回调返回。[句柄与内存](./memory)介绍了如何延长其保留时间。

## 构建和运行

```bash
zig build
cp zig-out/my-zig-plugin.wasm /path/to/pumpkin/plugins/
```

启动或重启服务器，日志中应显示插件的消息：

```text
[INFO] Hello from Zig!
```

> [!WARNING]
> 每个发布版本都会指明其构建所针对的插件 API 修订。服务器和插件需要兼容的修订；否则服务器会拒绝插件并提示 `Plugin was built against a different iteration of the API`。更新任一方之前，请检查[你的发布版本对应的 WIT 提交](./changelog)。

## 示例

绑定仓库为 API 的每个部分都提供了一个小型插件。使用 `zig build` 构建仓库会将它们全部构建到 `zig-out/` 中。

| 示例 | 展示内容 |
| --- | --- |
| [`hello`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/hello.zig) | 事件、命令和带样式的文本 |
| [`heal`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/heal.zig) | 使用 `cmd.typed` 读取命令参数 |
| [`menu`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/menu.zig) | 带按钮和自由槽位的物品栏菜单 |
| [`prompt`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/prompt.zig) | 在聊天中回答的问题和可点击的选项 |
| [`vault`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/vault.zig) | 支持页面选择、使用情况指示和可配置容量的个人存储 |
| [`items`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/items.zig) | 构建、编辑和识别物品，以及给予和收取物品 |
| [`tasks`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/tasks.zig) | 携带一个值的延迟任务和重复任务 |
| [`config`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/config.zig) | 可重新加载的 TOML 配置文件 |
| [`store`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/store.zig) | 在独立文件中保存每个玩家的数据 |
| [`https`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/https.zig) | 使用 `pumpkin.http` 发起 Web 请求 |
| [`tcp-server`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/tcp-server.zig) | 桥接聊天的 TCP 服务器 |
| [`udp`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/udp.zig) | 接收和回复 UDP 数据报 |
| [`dns`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/dns.zig) | 查询主机名的地址 |
| [`http`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/http.zig) | 建立带超时的 TCP 连接并发送纯 HTTP 请求 |
| [`nettest`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/nettest.zig) | 通过 `/nettest` 运行所有网络路径并报告各项结果 |

## 从 0.1.1 更新

更改依赖后，使用 `zig build` 重新构建插件，并将新的 `.wasm` 复制到服务器。替换可正常工作的安装前，请确认其插件 API 修订与服务器匹配。

新辅助函数和选项在各自页面中介绍：

| 方面 | 0.2.0 中的用法 |
| --- | --- |
| [聊天提示](./prompts) | 问题、可点击选项、验证、超时和自定义匹配。 |
| [菜单](./menus) | `free` 槽位、现有 `stacks`、`menu.items` 和可配置的仓库示例。 |
| [命令](./commands) | `cmd.bad_argument` 和 `register_permission`。 |
| [物品](./items) | 斜体样式、显式修饰符 ID、共享数据命名空间和容量检查。 |
| [配置](./files) | 格式选择、文件大小限制，以及文件创建和重写控制。 |
| [玩家数据](./player-data) | 编解码器、键检查、闲置驱逐和有界读取。 |
| [网络](./networking) | 接收缓冲区大小和 HTTPS 证书包路径。 |
