# 网络

插件可以发起 Web 请求、运行 TCP 服务器、连接其他服务以及发送 UDP 数据报。`pumpkin.http` 负责 Web 请求，`pumpkin.net` 负责每个 tick 处理一次且不阻塞游戏的套接字，标准的 `std.Io.net` 函数同样可用。

## 权限

| 权限 | 允许的操作 |
| --- | --- |
| `network.dns` | 查询主机名 |
| `network.tcp.connect` | 连接 TCP 服务器，Web 请求也需要此权限 |
| `network.tcp.bind` | 监听 TCP 连接 |
| `network.udp` | UDP 套接字 |

向主机名发起请求需要 `network.dns` 和 `network.tcp.connect` 两种权限。服务器管理员还可以通过 `pumpkin.toml` 的 `[plugins]` 部分中的 `loopback_only`，将插件限制为仅使用回环接口。

## Web 请求

```zig
const http = pumpkin.http;

const Status = struct { online: bool, players: u32 };

fn checkStatus(sender: cmd.Sender, _: pumpkin.Server, _: cmd.Args) cmd.Result {
    const res = http.get("https://api.example.com/status", .{}) catch |err| return cmd.fail(@errorName(err));
    if (!res.ok()) return cmd.fail("the API answered with an error");
    const status = res.json(Status) catch return cmd.fail("the API sent something unexpected");
    sender.sendMessage(msg.fmt(.green, "{d} players online", .{status.players}));
    return cmd.ok(1);
}
```

`http.get`、`head` 和 `delete` 接受 URL，`post`、`put` 和 `patch` 接受 URL 和请求体。`http.sendJson(method, url, value, options)` 将任意值作为 JSON 发送。选项可设置 `headers`、`content_type`、`authorization`、`user_agent` 和 `max_body`，后者是接受的最长响应体，除非另行设置，否则为 8 MiB。

响应包含 `status`、`body` 和两个辅助函数：`ok()` 表示状态是否处于 2xx 范围，`json(T)` 解析响应体。响应体和解析值仅在回调返回前有效。

请求会阻塞到响应到达，因此应从命令或很少触发的事件中发送请求，不要从每个 tick 都会触发的事件中发送。

HTTPS 需要证书来验证服务器。请将系统的证书包复制到插件数据文件夹，例如 Linux 上的 `/etc/ssl/certs/ca-certificates.crt`，并添加 `fs.read.data` 权限。没有证书时，HTTPS 请求会失败并返回 `error.NoCertificates`，同时在日志中记录一条消息。

默认文件为 `ca-certificates.crt`。在首次 HTTPS 请求前设置 `http.ca_file`，即可使用相对于数据文件夹的其他路径：

```zig
http.ca_file = "certs/roots.pem";
```

共享客户端只加载一次证书包。若要在发起请求后替换它，请先调用 `http.deinit()`，再设置 `ca_file`；下一次 HTTPS 请求会加载新的证书包。

## TCP 服务器

`net.listen` 启动一个 TCP 服务器，将收到的每一行交给回调：

```zig
const net = pumpkin.net;

var server: *net.Listener = undefined;
var game: pumpkin.Server = undefined;

pub fn onLoad(ctx: pumpkin.Context) !void {
    game = ctx.getServer();
    game.keep();
    pumpkin.on(ctx, .player_chat_event, onChat, .{});
    server = try net.listen(.{
        .port = 25580,
        .on_connect = onConnect,
        .callbacks = .{ .on_line = onLine },
    });
}

pub fn onUnload(_: pumpkin.Context) !void {
    server.close();
    game.deinit();
}

fn onConnect(conn: *net.Connection) void {
    conn.send("connected to the Minecraft chat\n") catch {};
}

fn onLine(_: *net.Connection, line: []const u8) void {
    game.broadcast(std.fmt.allocPrint(pumpkin.abi.arena(), "[tcp] {s}", .{line}) catch return);
}

fn onChat(_: pumpkin.Server, ev: *pumpkin.EventData(.player_chat_event)) void {
    server.broadcast(std.fmt.allocPrint(pumpkin.abi.arena(), "<{s}> {s}\n", .{ ev.player.getName(), ev.message }) catch return);
}
```

`onChat` 注册用于 `player_chat_event`，因此聊天消息会发送给每个已连接的客户端。除非 `host` 另有指定，否则服务器监听 `127.0.0.1`，只有同一台机器上的程序可以连接。设置 `.host = "0.0.0.0"` 可接受其他机器的连接。

套接字每个 tick 检查一次，在套接字上有事情发生之前不会运行任何内容，因此空闲套接字几乎不消耗资源，也绝不会阻碍游戏。`on_connect` 在服务器接受连接时运行，每个连接都有以下回调：

- `on_line`：收到一行时，每次传入一行，不含行尾。这是默认分帧方式。
- `on_data`：`framing` 为 `.raw` 时，按字节到达的分块传入字节。
- `on_close`：连接从任一端关闭时运行。

在这些连接上，`conn.send` 和 `conn.print` 永远不会阻塞。对端尚未准备好接收的数据会在之后的 tick 发送；如果连接等待发送的数据超过 `max_outgoing` 字节（默认为 1 MiB），则会因读取过慢而关闭。`listener.broadcast` 向每个连接发送数据，`close` 结束一个连接或整个服务器。`conn.data` 是插件可用于区分连接的数字。

`read_buffer_size` 设置监听器接受的每个连接的接收缓冲区容量，或 `net.connect` 中传出连接的接收缓冲区容量。默认为 4096 字节。在行分帧中，包括行尾在内的整行都必须能放入缓冲区。缓冲区已满但没有换行符时，会关闭轮询连接；`readLine()` 返回 `error.LineTooLong`。大小为零时，`listen` 或 `connect` 返回 `error.InvalidBufferSize`。

```zig
server = try net.listen(.{
    .port = 25580,
    .read_buffer_size = 16 * 1024,
    .callbacks = .{ .on_line = onLine },
});
```

插件卸载时仍打开的套接字会自动关闭。

## 连接服务器

```zig
const conn = try net.connect("chat.example.com", 4000, .{ .callbacks = .{ .on_line = onReply } });
try conn.send("hello\n");
```

`net.connect` 接受主机名或 IP 地址，并按顺序尝试其地址，直到有一个接受连接。主机查询和连接尝试会阻塞发起调用的回调。`timeout_ms` 默认为 10 秒，用于设置连接截止时间，但此处的 DNS 查询没有单独的有界超时，可能耗时更长。使用 IP 地址可避免该查询；在对响应速度有要求的位置，请设置较短的连接截止时间。

连接后，带回调的连接会像服务器连接一样每个 tick 检查一次。不带回调时，插件通过 `conn.readLine()` 自行读取，它最多等待 `read_timeout_ms` 以接收一行；`conn.send` 会阻塞，直到所有字节都写入套接字或发生错误。

## UDP

```zig
pub fn onLoad(_: pumpkin.Context) !void {
    _ = try net.udp(.{ .port = 25581, .on_datagram = onDatagram });
}

fn onDatagram(socket: *net.Udp, from: net.Address, data: []const u8) void {
    std.log.info("{f} sent {d} bytes", .{ from, data.len });
    socket.sendTo(from, "got it\n") catch {};
}
```

## 直接使用 `std.Io.net`

`pumpkin.io()` 返回支持网络的 `std.Io`，因此 `std.Io.net` 可以像在任何 Zig 程序中一样使用，例如查询主机名或建立带超时的连接：

```zig
const io = pumpkin.io();
const host: std.Io.net.HostName = try .init("example.com");
const stream = try host.connect(io, 80, .{
    .mode = .stream,
    .timeout = .{ .duration = .{ .raw = .fromSeconds(5), .clock = .awake } },
});
defer stream.close(io);
```

这些调用会阻塞到完成，因此游戏也会等待它们。`net.ready(handle)` 表示原始套接字是否有连接、数据或数据报等待处理，插件借此可以从任务中检查自己的套接字而不阻塞。

示例涵盖了上述每种用法：[`https`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/https.zig) 用于 Web 请求，[`tcp-server`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/tcp-server.zig) 用于 TCP 服务器，[`udp`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/udp.zig) 用于 UDP，[`dns`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/dns.zig) 和 [`http`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/http.zig) 用于 `std.Io.net`，[`nettest`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/nettest.zig) 则通过 `/nettest` 运行所有网络路径。

## 缓冲区所有权和交付

每个 TCP 连接都拥有自己的接收缓冲区。监听器的 `read_buffer_size` 会应用于每个已接受的连接，因此增大它会增加每个客户端的内存占用。使用原始分帧时，回调分块是任意字节范围，而不是完整消息；如果一条消息跨越多个回调，请自行维护分帧状态。

`readLine()` 会移除换行符和末尾回车符，并返回在当前回调结束前有效的副本。若要保留套接字回调切片，也需要复制。`close()` 会使连接不可用；其指针可能在下一次轮询时释放，因此不要继续使用它。

轮询 `send` 成功表示数据已在本地接受或排队，并不确认已交付给远端。`close()` 会尝试刷新可以立即发送的内容，并可能丢弃队列中的其余内容。`read_timeout_ms` 适用于手动 `readLine()` 调用，而不是空闲连接计时器。

若要有界接收 HTTP 响应，请设置 `max_body`；更大的响应会返回 `error.BodyTooLong`。在 0.2.0 中，`http.Options` 没有请求超时选项。在调度任务中运行请求只会延迟其开始时间，并不会使其变为非阻塞。

[`nettest` 示例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/nettest.zig)包含 22 项服务器端检查，包括大型自定义接收缓冲区，以及未终止行填满缓冲区时关闭连接。授予其请求的网络权限，运行 `/nettest`，并检查各项结果。
