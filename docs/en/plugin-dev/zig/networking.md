# Networking

Plugins can make web requests, run TCP servers, connect to other services and send UDP datagrams. `pumpkin.http` covers web requests, `pumpkin.net` covers sockets that are handled once per tick without blocking the game, and the standard `std.Io.net` functions work as well.

## Permissions

| Permission | Grants |
| --- | --- |
| `network.dns` | Looking up host names |
| `network.tcp.connect` | Connecting to TCP servers, which web requests need too |
| `network.tcp.bind` | Listening for TCP connections |
| `network.udp` | UDP sockets |

A request to a host name needs both `network.dns` and `network.tcp.connect`. Server admins can also restrict plugins to the loopback interface with `loopback_only` in the `[plugins]` section of `pumpkin.toml`.

## Web requests

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

`http.get`, `head` and `delete` take a URL, and `post`, `put` and `patch` a URL and a body. `http.sendJson(method, url, value, options)` sends any value as JSON. The options set `headers`, `content_type`, `authorization`, `user_agent`, and `max_body`, the longest response body accepted, which is 8 MiB unless you set it.

A response has a `status`, a `body` and two helpers: `ok()` tells whether the status is in the 2xx range, and `json(T)` parses the body. The body and the parsed value are only valid until the callback returns.

A request blocks until the response arrives, so send requests from commands or rare events, not from events that fire every tick.

HTTPS needs certificates to check the server against. Copy the system's certificate bundle into the plugin's data folder, for example from `/etc/ssl/certs/ca-certificates.crt` on Linux, and add the `fs.read.data` permission. Without it, HTTPS requests fail with `error.NoCertificates` and a message in the log.

The default file is `ca-certificates.crt`. Set `http.ca_file` before the first HTTPS request to use another path relative to the data folder:

```zig
http.ca_file = "certs/roots.pem";
```

The shared client loads the bundle once. To replace it after making requests, call `http.deinit()` first, then set `ca_file`; the next HTTPS request loads the new bundle.

## A TCP server

`net.listen` starts a TCP server that hands each line it receives to a callback:

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

`onChat` is registered for `player_chat_event`, so chat messages go out to every connected client. The server listens on `127.0.0.1` unless `host` says otherwise, so only programs on the same machine can connect. Set `.host = "0.0.0.0"` to accept connections from other machines.

Sockets are checked once per tick, and nothing runs for a socket until something happens on it, so a quiet socket costs almost nothing and never holds up the game. `on_connect` runs when the server accepts a connection, and each connection has these callbacks:

- `on_line`, with one line at a time without its line ending, when one arrives. This is the default framing.
- `on_data`, with the bytes in the chunks they arrive in, when `framing` is `.raw`.
- `on_close`, when the connection closes from either side.

On these connections, `conn.send` and `conn.print` never block. Data the other side isn't ready for is sent on later ticks, and a connection with more than `max_outgoing` bytes waiting, 1 MiB by default, is closed for reading too slowly. `listener.broadcast` sends to every connection, and `close` ends a connection or the whole server. `conn.data` is a number the plugin can use to tell connections apart.

`read_buffer_size` sets the receive buffer capacity for every connection accepted by a listener, or for an outgoing connection in `net.connect`. The default is 4096 bytes. In line framing, the whole line including its ending has to fit. A full buffer without a newline closes a polled connection; `readLine()` returns `error.LineTooLong`. A size of zero returns `error.InvalidBufferSize` from `listen` or `connect`.

```zig
server = try net.listen(.{
    .port = 25580,
    .read_buffer_size = 16 * 1024,
    .callbacks = .{ .on_line = onLine },
});
```

Sockets still open when the plugin unloads are closed automatically.

## Connecting to a server

```zig
const conn = try net.connect("chat.example.com", 4000, .{ .callbacks = .{ .on_line = onReply } });
try conn.send("hello\n");
```

`net.connect` takes a host name or an IP address and tries its addresses in order until one accepts. Host lookup and connection attempts block the calling callback. `timeout_ms`, 10 seconds by default, sets the connection deadline, but DNS lookup does not have a separate bounded timeout here and can take longer. An IP address avoids that lookup; keep connection deadlines short where responsiveness matters.

Once connected, a connection with callbacks is checked every tick like the ones of a server. Without callbacks, the plugin reads it itself with `conn.readLine()`, which waits up to `read_timeout_ms` for a line, and `conn.send` blocks until all bytes have been written to the socket or an error occurs.

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

## Using `std.Io.net` directly

`pumpkin.io()` returns an `std.Io` with networking, so `std.Io.net` works as it does in any Zig program, for example to look up a host name or to make a connection with a timeout:

```zig
const io = pumpkin.io();
const host: std.Io.net.HostName = try .init("example.com");
const stream = try host.connect(io, 80, .{
    .mode = .stream,
    .timeout = .{ .duration = .{ .raw = .fromSeconds(5), .clock = .awake } },
});
defer stream.close(io);
```

These calls block until they finish, so the game waits for them. `net.ready(handle)` tells whether a raw socket has a connection, data or a datagram waiting, which lets a plugin check its own sockets from a task without blocking.

The examples cover each of these: [`https`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/https.zig) for web requests, [`tcp-server`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/tcp-server.zig) for a TCP server, [`udp`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/udp.zig) for UDP, [`dns`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/dns.zig) and [`http`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/http.zig) for `std.Io.net`, and [`nettest`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/nettest.zig) runs every networking path with `/nettest`.

## Buffer ownership and delivery

Each TCP connection owns its receive buffer. The listener's `read_buffer_size` is applied to each accepted connection, so increasing it increases memory per client. With raw framing, callback chunks are arbitrary byte ranges, not complete messages; keep your own framing state if a message spans several callbacks.

`readLine()` removes the newline and trailing carriage returns, and returns a copy valid until the current callback ends. Socket callback slices also need copying if retained. `close()` makes a connection unusable; its pointer can be freed on the next poll, so do not keep using it.

A successful polled `send` means the data was accepted locally or queued. It does not confirm remote delivery. `close()` attempts to flush what can be sent immediately and can discard the rest of the queue. `read_timeout_ms` applies to manual `readLine()` calls, not an idle-connection timer.

For bounded HTTP responses, set `max_body`; a larger response returns `error.BodyTooLong`. `http.Options` has no request-timeout option in 0.2.0. Running the request in a scheduled task delays when it starts but does not make it non-blocking.

The [`nettest` example](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/nettest.zig) contains 22 server-side checks, including large custom receive buffers and a connection closed when an unterminated line fills its buffer. Grant its requested networking permissions, run `/nettest`, and inspect the individual results.
