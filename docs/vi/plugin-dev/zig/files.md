# File và Cấu hình

Plugin Zig được build cho `wasm32-wasi`, vì vậy các hàm file `std.Io` tiêu chuẩn hoạt động trong chúng. Tuy nhiên, plugin chạy trong một sandbox. Một plugin chỉ nhận quyền truy cập vào những gì nó yêu cầu trong metadata của mình, và admin server vẫn có thể lấy quyền truy cập đó đi.

## Yêu cầu quyền truy cập

Các permission mà plugin cần đi vào `metadata.permissions`:

```zig
pub const metadata: pumpkin.Metadata = .{
    .name = "my-zig-plugin",
    .version = "0.1.0",
    .permissions = &.{ "fs.read.data", "fs.write.data" },
};
```

| Permission | Cấp cho |
| --- | --- |
| `fs.read.data` | Đọc file trong thư mục dữ liệu của plugin |
| `fs.write.data` | Đọc và ghi file trong thư mục dữ liệu của plugin |
| `sys.env` | Biến môi trường của server |

[Networking](./networking#permissions) liệt kê các permission cho truy cập mạng.

Khi server tải một plugin yêu cầu permission, nó hỏi admin trong console liệu có cấp chúng không, và nhớ câu trả lời. Các permission này kiểm soát những gì chính plugin có thể làm. Chúng riêng biệt với các permission node kiểm soát người chơi nào có thể chạy [lệnh](./commands) của bạn.

## Một file cấu hình

`pumpkin.config` giữ các cài đặt của một plugin trong một file trong thư mục dữ liệu của nó. Các cài đặt là một struct, và mặc định của các trường của nó là cấu hình mặc định:

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

Lần đầu tiên plugin tải, `load` ghi `plugins/data/my-zig-plugin/config.toml` với các mặc định:

```toml
message = "Welcome to the server!"
color = "gold"

[title]
enabled = true
text = "Welcome"
stay = 60
```

Sau đó, `load` đọc file vào `config.value`. Struct lồng nhau trở thành table, enum được ghi theo tên, và slice trở thành mảng. `/welcome reload` ở trên áp dụng các thay đổi cho file mà không cần khởi động lại.

File và struct không cần khớp chính xác:

- Các cài đặt mà file thiếu lấy mặc định của chúng, và `load` thêm chúng vào file. Đó là cách cài đặt được thêm trong phiên bản mới của plugin đến các cấu hình hiện có. Trường tùy chọn có thể được bỏ qua mà không được thêm.
- Các cài đặt mà struct không có được báo cáo trong log. Chúng vẫn còn trong file cho đến khi save hoặc rewrite missing-setting tuần tự hóa cấu hình được gõ, cái này bỏ qua các trường không xác định.
- Một lỗi cú pháp được log với vị trí của nó; một cài đặt sai kiểu được log như một conversion error. Cả hai đều trả về lỗi và bảo toàn `config.value` trước đó.
- Thêm cài đặt thiếu có thể yêu cầu một ghi sau khi giá trị mới được tải. Nếu ghi đó thất bại, `load` trả về lỗi mặc dù `config.value` đã chứa các cài đặt mới.

`config.save()` ghi `config.value` ngược lại file, và `config.deinit()` giải phóng các giá trị đã tải. File có `path` kết thúc bằng `.json` được đọc và ghi như JSON thay vì TOML.

Các chuỗi trong `config.value` vẫn hợp lệ cho đến khi `load` cài đặt một giá trị đã phân tích khác hoặc `deinit` giải phóng chúng. Cài đặt một giá trị có thể xảy ra ngay cả khi ghi mặc định thiếu sau đó thất bại. Cho dữ liệu thay đổi trong khi server chạy, như coin của người chơi, sử dụng [Player Data](./player-data) thay thế.

## Chọn hành vi file

`File(T)` có mặc định cho mỗi phần của việc tải cấu hình:

| Trường | Hành vi |
| --- | --- |
| `format` | `.toml` hoặc `.json`; `null` chọn từ tên file. |
| `create` | `false` trả về `error.FileNotFound` thay vì tạo một file thiếu. |
| `add_missing` | `false` sử dụng mặc định cho cài đặt thiếu mà không ghi chúng vào file. |
| `report_unknown` | `false` chặn cảnh báo về các cài đặt mà struct không có. |
| `max_size` | File lớn nhất được chấp nhận, 16 MiB theo mặc định. |

Ví dụ, `.{ .path = "settings", .format = .toml, .create = false, .add_missing = false }` đọc một file TOML hiện có mà không tạo nó hoặc thêm mặc định vào nó. `save()` vẫn ghi giá trị hiện tại khi được gọi rõ ràng.

`pumpkin.config.toml` hiển thị parser và writer TOML cho các file khác. `parse(allocator, text, diagnostics)` trả về một tree `std.json.Value`, và `stringify(allocator, value)` biến một giá trị thành TOML. `Diagnostics` báo cáo dòng, cột và thông báo cho một parse error.

## Các file khác

Với permission `fs` bất kỳ, plugin thấy thư mục dữ liệu của nó như thư mục hiện tại, vì vậy file trong nó được mở qua `std.Io.Dir.cwd()`. Các hàm file cũng cần một `std.Io`, mà `pumpkin.io()` trả về:

```zig
const io = pumpkin.io();
const dir = std.Io.Dir.cwd();

try dir.writeFile(io, .{ .sub_path = "notes.txt", .data = "hello" });
const notes = try dir.readFileAlloc(io, "notes.txt", pumpkin.abi.heap, .limited(64 * 1024));
defer pumpkin.abi.heap.free(notes);
```

File bên ngoài thư mục dữ liệu không thể được truy cập. `notes` được cấp phát với `pumpkin.abi.heap`, vì vậy nó vẫn hợp lệ sau khi callback trả về. Sử dụng `pumpkin.abi.arena()` cho dữ liệu bạn chỉ cần trong callback. [Handles and Memory](./memory) có thêm về sự khác biệt.

[Ví dụ `config`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/config.zig) chào người chơi với một tin nhắn và tiêu đề từ cấu hình của nó, và tải lại nó với `/welcome reload`.

## Cấu hình với mảng

TOML writer hỗ trợ struct và tuple trong mảng. Một cấu hình có thể giữ một danh sách các đích có tên mà không cần chuyển sang JSON:

```zig
const Config = struct {
    destinations: []const struct { name: []const u8, x: i32, z: i32 } = &.{
        .{ .name = "spawn", .x = 0, .z = 0 },
        .{ .name = "market", .x = 100, .z = -20 },
    },
};
```

Writer tuần tự hóa mỗi đích như một TOML inline table. `load()` không xác thực các quy tắc ứng dụng như số trang tối thiểu hoặc phạm vi tọa độ cho phép; kiểm tra những cái đó sau khi đọc `config.value`, như [ví dụ vault](./menus#a-vault-with-pages) làm cho sức chứa.
