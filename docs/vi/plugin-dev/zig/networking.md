# Mạng

Plugin có thể thực hiện yêu cầu web, chạy TCP server, kết nối đến các service khác và gửi UDP datagram. `pumpkin.http` bao gồm yêu cầu web, `pumpkin.net` bao gồm socket được xử lý một lần mỗi tick mà không chặn game, và các hàm `std.Io.net` tiêu chuẩn cũng hoạt động.

## Permission

| Permission | Cấp cho |
| --- | --- |
| `network.dns` | Tra cứu tên host |
| `network.tcp.connect` | Kết nối đến TCP server, mà yêu cầu web cũng cần |
| `network.tcp.bind` | Lắng nghe kết nối TCP |
| `network.udp` | Socket UDP |

Một yêu cầu đến một tên host cần cả `network.dns` và `network.tcp.connect`. Admin server cũng có thể hạn chế plugin chỉ giao diện loopback với `loopback_only` trong section `[plugins]` của `pumpkin.toml`.

## Yêu cầu web

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

`http.get`, `head` và `delete` nhận một URL, và `post`, `put` và `patch` một URL và một body. `http.sendJson(method, url, value, options)` gửi bất kỳ giá trị nào như JSON. Các option thiết lập `headers`, `content_type`, `authorization`, `user_agent`, và `max_body`, body phản hồi dài nhất được chấp nhận, cái này là 8 MiB trừ khi bạn thiết lập.

Một phản hồi có một `status`, một `body` và hai helper: `ok()` cho biết liệu status có trong range 2xx, và `json(T)` phân tích body. Body và giá trị đã phân tích chỉ hợp lệ cho đến khi callback trả về.

Một yêu cầu chặn cho đến khi phản hồi đến, vì vậy gửi yêu cầu từ lệnh hoặc sự kiện hiếm, không phải từ sự kiện kích hoạt mỗi tick.

HTTPS cần chứng chỉ để kiểm tra server chống lại. Copy bundle chứng chỉ của hệ thống vào thư mục dữ liệu plugin, ví dụ từ `/etc/ssl/certs/ca-certificates.crt` trên Linux, và thêm permission `fs.read.data`. Không có nó, yêu cầu HTTPS thất bại với `error.NoCertificates` và một thông báo trong log.

File mặc định là `ca-certificates.crt`. Thiết lập `http.ca_file` trước yêu cầu HTTPS đầu tiên để sử dụng một đường dẫn khác tương đối so với thư mục dữ liệu:

```zig
http.ca_file = "certs/roots.pem";
```

Client được chia sẻ tải bundle một lần. Để thay thế nó sau khi thực hiện yêu cầu, gọi `http.deinit()` đầu tiên, sau đó thiết lập `ca_file`; yêu cầu HTTPS tiếp theo tải bundle mới.

## Một TCP server

`net.listen` khởi động một TCP server chuyển mỗi dòng nó nhận đến một callback:

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

`onChat` được đăng ký cho `player_chat_event`, vì vậy tin nhắn chat đi ra đến mọi client đã kết nối. Server lắng nghe trên `127.0.0.1` trừ khi `host` nói khác, vì vậy chỉ các chương trình trên cùng máy có thể kết nối. Thiết lập `.host = "0.0.0.0"` để chấp nhận kết nối từ máy khác.

Socket được kiểm tra một lần mỗi tick, và không có gì chạy cho một socket cho đến khi có điều gì đó xảy ra trên nó, vì vậy một socket yên tĩnh tốn kém gần như không có gì và không bao giờ giữ game chờ. `on_connect` chạy khi server chấp nhận một kết nối, và mỗi kết nối có các callback này:

- `on_line`, với một dòng tại một thời điểm không có kết thúc dòng, khi một cái đến. Đây là framing mặc định.
- `on_data`, với các byte trong chunk chúng đến, khi `framing` là `.raw`.
- `on_close`, khi kết nối đóng từ một trong hai bên.

Trên các kết nối này, `conn.send` và `conn.print` không bao giờ chặn. Dữ liệu bên kia chưa sẵn sàng được gửi trong tick sau, và một kết nối với nhiều hơn `max_outgoing` byte đang chờ, 1 MiB theo mặc định, bị đóng vì đọc quá chậm. `listener.broadcast` gửi đến mọi kết nối, và `close` kết thúc một kết nối hoặc toàn bộ server. `conn.data` là một số plugin có thể sử dụng để phân biệt các kết nối.

`read_buffer_size` thiết lập dung lượng buffer nhận cho mọi kết nối được chấp nhận bởi một listener, hoặc cho một kết nối đi trong `net.connect`. Mặc định là 4096 byte. Trong line framing, toàn bộ dòng bao gồm kết thúc của nó phải vừa. Một buffer đầy mà không có newline đóng một polled connection; `readLine()` trả về `error.LineTooLong`. Kích thước bằng không trả về `error.InvalidBufferSize` từ `listen` hoặc `connect`.

```zig
server = try net.listen(.{
    .port = 25580,
    .read_buffer_size = 16 * 1024,
    .callbacks = .{ .on_line = onLine },
});
```

Socket vẫn mở khi plugin unload được đóng tự động.

## Kết nối đến một server

```zig
const conn = try net.connect("chat.example.com", 4000, .{ .callbacks = .{ .on_line = onReply } });
try conn.send("hello\n");
```

`net.connect` nhận một tên host hoặc một địa chỉ IP và thử các địa chỉ của nó theo thứ tự cho đến khi một cái chấp nhận. Tra cứu host và thử kết nối chặn callback gọi. `timeout_ms`, 10 giây theo mặc định, thiết lập deadline kết nối, nhưng DNS lookup không có timeout giới hạn riêng ở đây và có thể mất lâu hơn. Một địa chỉ IP tránh lookup đó; giữ deadline kết nối ngắn ở đâu responsiveness quan trọng.

Sau khi kết nối, một kết nối với callback được kiểm tra mỗi tick như các kết nối của một server. Không có callback, plugin tự đọc nó với `conn.readLine()`, cái này chờ tối đa `read_timeout_ms` cho một dòng, và `conn.send` chặn cho đến khi tất cả byte đã được ghi vào socket hoặc một lỗi xảy ra.

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

## Sử dụng `std.Io.net` trực tiếp

`pumpkin.io()` trả về một `std.Io` với networking, vì vậy `std.Io.net` hoạt động như nó làm trong bất kỳ chương trình Zig nào, ví dụ để tra cứu một tên host hoặc để tạo một kết nối với một timeout:

```zig
const io = pumpkin.io();
const host: std.Io.net.HostName = try .init("example.com");
const stream = try host.connect(io, 80, .{
    .mode = .stream,
    .timeout = .{ .duration = .{ .raw = .fromSeconds(5), .clock = .awake } },
});
defer stream.close(io);
```

Các gọi này chặn cho đến khi chúng hoàn thành, vì vậy game chờ chúng. `net.ready(handle)` cho biết liệu một raw socket có kết nối, dữ liệu hoặc datagram đang chờ, cái này cho phép một plugin kiểm tra socket riêng của nó từ một task mà không chặn.

Các ví dụ bao gồm mỗi cái trong số này: [`https`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/https.zig) cho yêu cầu web, [`tcp-server`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/tcp-server.zig) cho một TCP server, [`udp`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/udp.zig) cho UDP, [`dns`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/dns.zig) và [`http`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/http.zig) cho `std.Io.net`, và [`nettest`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/nettest.zig) chạy mọi đường dẫn mạng với `/nettest`.

## Quyền sở hữu buffer và giao hàng

Mỗi kết nối TCP sở hữu buffer nhận của nó. `read_buffer_size` của listener được áp dụng cho mỗi kết nối được chấp nhận, vì vậy tăng nó tăng bộ nhớ mỗi client. Với raw framing, chunk callback là các range byte tùy ý, không phải message hoàn chỉnh; giữ state framing riêng của bạn nếu một message span nhiều callback.

`readLine()` loại bỏ newline và carriage return theo sau, và trả về một bản sao hợp lệ cho đến khi callback hiện tại kết thúc. Socket callback slice cũng cần copy nếu được giữ. `close()` làm cho một kết nối không sử dụng được; con trỏ của nó có thể được giải phóng trong poll tiếp theo, vì vậy không tiếp tục sử dụng nó.

Một polled `send` thành công có nghĩa là dữ liệu đã được chấp nhận cục bộ hoặc xếp hàng. Nó không xác nhận giao hàng từ xa. `close()` cố gắng flush những gì có thể được gửi ngay lập tức và có thể loại bỏ phần còn lại của queue. `read_timeout_ms` áp dụng cho các gọi `readLine()` thủ công, không phải một timer idle-connection.

Cho phản hồi HTTP giới hạn, thiết lập `max_body`; một phản hồi lớn hơn trả về `error.BodyTooLong`. `http.Options` không có tùy chọn request-timeout trong 0.2.0. Chạy yêu cầu trong một scheduled task trì hoãn khi nó bắt đầu nhưng không làm cho nó non-blocking.

[Ví dụ `nettest`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/nettest.zig) chứa 22 kiểm tra server-side, bao gồm buffer nhận tùy chỉnh lớn và một kết nối đóng khi một dòng không kết thúc lấp đầy buffer của nó. Cấp các permission mạng được yêu cầu của nó, chạy `/nettest`, và kiểm tra các kết quả riêng lẻ.
