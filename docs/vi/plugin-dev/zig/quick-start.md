# Bắt Đầu Nhanh

Plugin Pumpkin có thể được viết bằng [Zig](https://ziglang.org/) với các binding [`pumpkin-api-zig`](https://github.com/Pumpkin-MC/pumpkin-api-zig). Một plugin được biên dịch thành một WebAssembly component, mà server tải từ thư mục `plugins` của nó.

Các binding được tạo ra từ plugin API, nên mọi thứ API cung cấp đều có sẵn từ Zig. Ngoài ra còn có các helper cho những việc mà hầu hết mọi plugin đều làm: lắng nghe [sự kiện](./events), khai báo [lệnh](./commands), xây dựng [văn bản](./text), hiển thị [menu](./menus), đặt [câu hỏi trong chat](./prompts), phân phối [vật phẩm](./items), [lên lịch](./scheduling) công việc, đọc [file cấu hình](./files), lưu trữ [dữ liệu người chơi](./player-data) và giao tiếp với [mạng](./networking).

Các hướng dẫn này bao phủ `pumpkin-api-zig` 0.2.0. [Changelog](./changelog) liệt kê các thay đổi từ 0.1.0. `metadata.version` của chính plugin là độc lập với phiên bản binding.

## Yêu cầu

Bạn cần [Zig](https://ziglang.org/download/) 0.16.0 và [`wasm-tools`](https://github.com/bytecodealliance/wasm-tools) trong `PATH` của bạn. Quá trình build sử dụng `wasm-tools` để đính kèm plugin API vào code của bạn và đóng gói nó thành một component.

## Thiết lập dự án

Tạo một thư mục cho plugin:

```bash
mkdir my-zig-plugin
cd my-zig-plugin
```

Thêm các binding như một dependency:

```bash
zig fetch --save git+https://github.com/Pumpkin-MC/pumpkin-api-zig#v0.2.0
```

Các [release](https://github.com/Pumpkin-MC/pumpkin-api-zig/releases) liệt kê mọi phiên bản đã xuất bản. Để cập nhật, chạy lại lệnh với phiên bản mới.

Sau đó tạo `build.zig`:

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

`addPlugin` biên dịch `src/main.zig` cho `wasm32-wasi`, làm cho API có sẵn cho nó như module `pumpkin` và biến kết quả thành một component.

Nếu bạn đang làm việc trên chính các binding, bạn có thể phụ thuộc vào một checkout cục bộ thay thế. Đường dẫn là tương đối so với dự án của bạn:

```zig [build.zig.zon]
.dependencies = .{
    .pumpkin_api_zig = .{ .path = "../pumpkin-api-zig" },
},
```

## Viết plugin

Đặt đoạn sau vào `src/main.zig`:

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

Một plugin là một struct được chuyển cho `pumpkin.register`, cái này tạo ra mọi thứ server cần để gọi vào nó. Các khai báo của struct mô tả plugin. `metadata` là cái duy nhất bắt buộc: nó giữ tên, phiên bản, tác giả và mô tả mà server hiển thị, và cũng có thể liệt kê `dependencies` trên các plugin khác và `permissions` mà plugin cần, [Files and Configuration](./files) sẽ đề cập. `events` liệt kê các sự kiện để lắng nghe. `onLoad` chạy sau khi các sự kiện và lệnh của plugin đã được đăng ký, và `onUnload` chạy trước khi nó được gỡ bỏ.

Thiết lập `std_options.logFn` thành `pumpkin.logFn` gửi output của `std.log` đến console server, với scope ở phía trước nếu bạn sử dụng `std.log.scoped`.

Mọi thứ API cung cấp cho bạn, bao gồm `player` của sự kiện, chỉ tồn tại cho đến khi callback trả về. [Handles and Memory](./memory) giải thích cách giữ các thứ lâu hơn.

## Biên dịch và chạy

```bash
zig build
cp zig-out/my-zig-plugin.wasm /path/to/pumpkin/plugins/
```

Khởi động hoặc khởi động lại server, và log sẽ hiển thị thông báo của plugin:

```text
[INFO] Hello from Zig!
```

> [!WARNING]
> Mỗi release đặt tên cho plugin API revision mà nó được build dựa trên. Server và plugin cần các revision tương thích; nếu không server sẽ từ chối plugin với `Plugin was built against a different iteration of the API`. Kiểm tra [WIT commit cho release của bạn](./changelog) trước khi cập nhật một trong hai.

## Ví dụ

Repository binding có một plugin nhỏ cho mỗi phần của API. Building repository với `zig build` build tất cả chúng vào `zig-out/`.

| Ví dụ | Hiển thị |
| --- | --- |
| [`hello`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/hello.zig) | Sự kiện, một lệnh và văn bản được định dạng |
| [`heal`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/heal.zig) | Đọc đối số lệnh với `cmd.typed` |
| [`menu`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/menu.zig) | Menu kho đồ với các nút và slot tự do |
| [`prompt`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/prompt.zig) | Câu hỏi được trả lời trong chat và lựa chọn để click |
| [`vault`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/vault.zig) | Kho lưu trữ cá nhân với lựa chọn trang, chỉ báo sử dụng và sức chứa có thể cấu hình |
| [`items`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/items.zig) | Xây dựng, chỉnh sửa và nhận diện vật phẩm, cũng như cấp phát và thu hồi chúng |
| [`tasks`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/tasks.zig) | Công việc bị trì hoãn và lặp lại mang theo một giá trị |
| [`config`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/config.zig) | Một file cấu hình TOML có thể được tải lại |
| [`store`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/store.zig) | Dữ liệu được giữ cho mỗi người chơi trong một file riêng |
| [`https`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/https.zig) | Yêu cầu web với `pumpkin.http` |
| [`tcp-server`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/tcp-server.zig) | Một server TCP cầu nối chat |
| [`udp`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/udp.zig) | Nhận và trả lời các datagram UDP |
| [`dns`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/dns.zig) | Tra cứu địa chỉ của một tên host |
| [`http`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/http.zig) | Một kết nối TCP với timeout, gửi một yêu cầu HTTP đơn giản |
| [`nettest`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/nettest.zig) | Chạy mọi đường dẫn mạng với `/nettest` và báo cáo từng cái |

## Cập nhật từ 0.1.1

Sau khi thay đổi dependency, rebuild plugin của bạn với `zig build` và copy file `.wasm` mới đến server. Xác nhận rằng plugin API revision của nó khớp với server trước khi thay thế một installation đang hoạt động.

Các helper và option mới được mô tả trên các trang riêng của chúng:

| Lĩnh vực | Cái gì để dùng trong 0.2.0 |
| --- | --- |
| [Chat prompts](./prompts) | Câu hỏi, lựa chọn có thể click, xác thực, timeout và khớp tùy chỉnh. |
| [Menus](./menus) | Các slot `free`, các `stacks` hiện có, `menu.items` và ví dụ vault có thể cấu hình. |
| [Commands](./commands) | `cmd.bad_argument` và `register_permission`. |
| [Items](./items) | Định dạng nghiêng, ID modifier rõ ràng, namespace dữ liệu được chia sẻ và kiểm tra sức chứa. |
| [Configuration](./files) | Lựa chọn định dạng, giới hạn kích thước file và kiểm soát việc tạo hoặc ghi đè file. |
| [Player data](./player-data) | Codec, kiểm tra key, eviction nhàn rỗi và đọc giới hạn. |
| [Networking](./networking) | Kích thước buffer nhận và đường dẫn bundle chứng chỉ HTTPS. |
