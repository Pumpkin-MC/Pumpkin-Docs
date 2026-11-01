# 網絡

插件可以發起 Web 請求、執行 TCP 伺服器、連線其他服務以及傳送 UDP 封包。`pumpkin.http` 負責 Web 請求，`pumpkin.net` 負責每個 tick 處理一次且不阻塞遊戲的通訊端，標準的 `std.Io.net` 函數同樣可用。

## 權限

| 權限 | 允許的操作 |
| --- | --- |
| `network.dns` | 查詢主機名 |
| `network.tcp.connect` | 連線 TCP 伺服器，Web 請求也需要此權限 |
| `network.tcp.bind` | 監聽 TCP 連線 |
| `network.udp` | UDP 通訊端 |

向主機名發起請求需要 `network.dns` 和 `network.tcp.connect` 兩種權限。伺服器管理員還可以透過 `pumpkin.toml` 的 `[plugins]` 部分中的 `loopback_only`，將插件限制為僅使用迴環界面。

## Web 請求

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

`http.get`、`head` 和 `delete` 接受 URL，`post`、`put` 和 `patch` 接受 URL 和請求體。`http.sendJson(method, url, value, options)` 將任意值作為 JSON 傳送。選項可設定 `headers`、`content_type`、`authorization`、`user_agent` 和 `max_body`，後者是接受的最長回應體，除非另行設定，否則為 8 MiB。

回應包含 `status`、`body` 和兩個輔助函數：`ok()` 表示狀態是否處於 2xx 範圍，`json(T)` 解析回應體。回應體和解析值僅在回調返回前有效。

請求會阻塞到回應到達，因此應從指令或很少觸發的事件中傳送請求，不要從每個 tick 都會觸發的事件中傳送。

HTTPS 需要證書來驗證伺服器。請將系統的證書包複製到插件資料資料夾，例如 Linux 上的 `/etc/ssl/certs/ca-certificates.crt`，並新增 `fs.read.data` 權限。沒有證書時，HTTPS 請求會失敗並返回 `error.NoCertificates`，同時在日誌中記錄一條訊息。

預設檔案為 `ca-certificates.crt`。在首次 HTTPS 請求前設定 `http.ca_file`，即可使用相對於資料資料夾的其他路徑：

```zig
http.ca_file = "certs/roots.pem";
```

共享客戶端只加載一次證書包。若要在發起請求後替換它，請先調用 `http.deinit()`，再設定 `ca_file`；下一次 HTTPS 請求會載入新的證書包。

## TCP 伺服器

`net.listen` 啟動一個 TCP 伺服器，將收到的每一行交給回調：

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

`onChat` 註冊用於 `player_chat_event`，因此聊天訊息會發送給每個已連線的客戶端。除非 `host` 另有指定，否則伺服器監聽 `127.0.0.1`，只有同一臺機器上的程式可以連線。設定 `.host = "0.0.0.0"` 可接受其他機器的連線。

通訊端每個 tick 檢查一次，在通訊端上有事情發生之前不會執行任何內容，因此空閒通訊端幾乎不消耗資源，也絕不會阻礙遊戲。`on_connect` 在伺服器接受連線時執行，每個連線都有以下回調：

- `on_line`：收到一行時，每次傳入一行，不含行尾。這是預設分幀方式。
- `on_data`：`framing` 為 `.raw` 時，按位元組到達的分塊傳入位元組。
- `on_close`：連線從任一端關閉時執行。

在這些連線上，`conn.send` 和 `conn.print` 永遠不會阻塞。對端尚未準備好接收的資料會在之後的 tick 傳送；如果連線等待發送的資料超過 `max_outgoing` 位元組（預設為 1 MiB），則會因讀取過慢而關閉。`listener.broadcast` 向每個連線傳送資料，`close` 結束一個連線或整個伺服器。`conn.data` 是插件可用於區分連線的數字。

`read_buffer_size` 設定監聽器接受的每個連線的接收緩衝區容量，或 `net.connect` 中傳出連線的接收緩衝區容量。預設為 4096 位元組。在行分幀中，包括行尾在內的整行都必須能放入緩衝區。緩衝區已滿但沒有換行符時，會關閉輪詢連線；`readLine()` 返回 `error.LineTooLong`。大小為零時，`listen` 或 `connect` 返回 `error.InvalidBufferSize`。

```zig
server = try net.listen(.{
    .port = 25580,
    .read_buffer_size = 16 * 1024,
    .callbacks = .{ .on_line = onLine },
});
```

插件解除安裝時仍開啟的通訊端會自動關閉。

## 連線伺服器

```zig
const conn = try net.connect("chat.example.com", 4000, .{ .callbacks = .{ .on_line = onReply } });
try conn.send("hello\n");
```

`net.connect` 接受主機名或 IP 位址，並按順序嘗試其位址，直到有一個接受連線。主機查詢和連線嘗試會阻塞發起調用的回調。`timeout_ms` 預設為 10 秒，用於設定連線截止時間，但此處的 DNS 查詢沒有單獨的有界超時，可能耗時更長。使用 IP 位址可避免該查詢；在對回應速度有要求的位置，請設定較短的連線截止時間。

連線後，帶回調的連線會像伺服器連線一樣每個 tick 檢查一次。不帶回調時，插件透過 `conn.readLine()` 自行讀取，它最多等待 `read_timeout_ms` 以接收一行；`conn.send` 會阻塞，直到所有位元組都寫入通訊端或發生錯誤。

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

`pumpkin.io()` 返回支援網絡的 `std.Io`，因此 `std.Io.net` 可以像在任何 Zig 程式中一樣使用，例如查詢主機名或建立帶超時的連線：

```zig
const io = pumpkin.io();
const host: std.Io.net.HostName = try .init("example.com");
const stream = try host.connect(io, 80, .{
    .mode = .stream,
    .timeout = .{ .duration = .{ .raw = .fromSeconds(5), .clock = .awake } },
});
defer stream.close(io);
```

這些調用會阻塞到完成，因此遊戲也會等待它們。`net.ready(handle)` 表示原始通訊端是否有連線、資料或封包等待處理，插件藉此可以從任務中檢查自己的通訊端而不阻塞。

範例涵蓋了上述每種用法：[`https`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/https.zig) 用於 Web 請求，[`tcp-server`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/tcp-server.zig) 用於 TCP 伺服器，[`udp`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/udp.zig) 用於 UDP，[`dns`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/dns.zig) 和 [`http`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/http.zig) 用於 `std.Io.net`，[`nettest`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/nettest.zig) 則透過 `/nettest` 執行所有網絡路徑。

## 緩衝區所有權和交付

每個 TCP 連線都擁有自己的接收緩衝區。監聽器的 `read_buffer_size` 會應用於每個已接受的連線，因此增大它會增加每個客戶端的記憶體佔用。使用原始分幀時，回調分塊是任意位元組範圍，而不是完整訊息；如果一條訊息跨越多個回調，請自行維護分幀狀態。

`readLine()` 會移除換行符和末尾回車符，並返回在目前回調結束前有效的副本。若要保留通訊端回調切片，也需要複製。`close()` 會使連線不可用；其指標可能在下一次輪詢時釋放，因此不要繼續使用它。

輪詢 `send` 成功表示資料已在本地接受或排隊，並不確認已交付給遠端。`close()` 會嘗試重新整理可以立即傳送的內容，並可能丟棄隊列中的其餘內容。`read_timeout_ms` 適用於手動 `readLine()` 調用，而不是空閒連線計時器。

若要有界接收 HTTP 回應，請設定 `max_body`；更大的回應會返回 `error.BodyTooLong`。在 0.2.0 中，`http.Options` 沒有請求超時選項。在排程任務中執行請求只會延遲其開始時間，並不會使其變為非阻塞。

[`nettest` 範例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/nettest.zig)包含 22 項伺服器端檢查，包括大型自訂接收緩衝區，以及未終止行填滿緩衝區時關閉連線。授予其請求的網絡權限，執行 `/nettest`，並檢查各項結果。
