# Handle và Bộ nhớ

Callback của bạn nhận string, list, record và handle từ plugin API. Một handle tham chiếu đến một cái gì đó sống trong server, như một `Player`, một `World` hoặc một `ItemStack`. Tất cả những cái này được dọn dẹp tự động khi callback trả về, vì vậy một plugin không rò rỉ bộ nhớ hoặc handle do vô tình.

## Mọi thứ sống bao lâu

Bất cứ thứ gì API cung cấp cho bạn trong một callback đều hợp lệ cho đến khi callback đó trả về. Đó bao gồm dữ liệu sự kiện, đối số lệnh, giá trị trả về của API call, string như `player.getName()`, slice như `server.getAllPlayers()`, và handle.

Trong callback bạn có thể sử dụng tất cả nó tự do. Điều không hoạt động là lưu nó trong một global và sử dụng nó trong callback sau, vì lúc đó bộ nhớ đã được tái sử dụng và handle đã được giải phóng.

## Giữ một handle

Để sử dụng một handle trong callback sau, gọi `keep()` trên nó. Handle sau đó là của bạn cho đến khi bạn giải phóng nó với `deinit()`:

```zig
var host: ?pumpkin.Player = null;

fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
    if (host == null) {
        ev.player.keep();
        host = ev.player;
    }
}

fn onLeave(_: pumpkin.Server, ev: *pumpkin.EventData(.player_leave_event)) void {
    const current = host orelse return;
    if (std.meta.eql(current.getId(), ev.player.getId())) {
        current.deinit();
        host = null;
    }
}
```

Lưu trữ một id và tra cứu handle lại khi bạn cần nó thường đơn giản hơn, ví dụ UUID của người chơi cùng với `server.getPlayerByUuid`.

Một số hàm lấy quyền sở hữu của một handle bạn chuyển vào, `player.openGui(gui)` chẳng hạn. Tài liệu của chúng nói "Consumes", và handle không nên được sử dụng hoặc giải phóng sau khi gọi.

## Giữ dữ liệu

String và slice từ API sống trong một memory arena được reset sau mỗi callback. Để giữ một cái, copy nó vào bộ nhớ sống sót sau callback. `pumpkin.abi.heap` là một allocator cho việc đó:

```zig
var last_message: ?[]const u8 = null;

fn onChat(_: pumpkin.Server, ev: *pumpkin.EventData(.player_chat_event)) void {
    const copy = pumpkin.abi.heap.dupe(u8, ev.message) catch return;
    if (last_message) |old| pumpkin.abi.heap.free(old);
    last_message = copy;
}
```

Cho bộ nhớ bạn chỉ cần trong callback, sử dụng `pumpkin.abi.arena()`. Nó được reset cùng với mọi thứ khác khi callback trả về, vì vậy bạn không bao giờ tự giải phóng nó.

## Callback trong API call

Một API call có thể chạy một callback khác của plugin trước khi nó trả về. `player.openGui`, ví dụ, đầu tiên đóng màn hình người chơi đang mở, và cái đó kích hoạt `inventory_close_event` trong khi `openGui` vẫn đang chạy.

Bộ nhớ và handle vẫn chính xác khi điều này xảy ra, vì callback bên trong chỉ dọn dẹp những gì nó nhận được. Trạng thái riêng của bạn, tuy nhiên, có thể thay đổi trong cuộc gọi. Không giữ một con trỏ vào một trong các map hoặc list của chính bạn qua một API call nếu một trong các callback của bạn có thể thay đổi map hoặc list đó cùng lúc.

## Quyền sở hữu trong helper

Giữ một handle không giữ các string được trả về bởi các phương thức của nó. `player.keep()` bảo toàn tài nguyên, trong khi `player.getName()` vẫn trả về văn bản thuộc về callback. Copy string riêng nếu cần sau này. Copy một handle vào một biến Zig khác cũng không clone object server cơ bản.

| Giá trị | Lifetime cần tính đến |
| --- | --- |
| Một UUID hoặc integer trong task hoặc callback data | Được copy theo giá trị. |
| Một slice trong task data | Chỉ con trỏ và độ dài của nó được copy; nội dung của nó phải sống sót task. |
| Menu icon, prompt label và message span | Được tiêu thụ hoặc xây dựng đồng bộ; mảng stack phải vẫn hợp lệ cho đến khi call mở trả về. |
| `menu.items(player)` | Thuộc về menu; có sẵn qua callback `on_close` của nó. |
| String và slice `config.value` | Cho đến khi một giá trị đã phân tích khác được cài đặt hoặc `deinit` chạy, ngay cả khi một ghi mặc định thất bại sau khi tải. |
| Cấp phát `store.allocator(entry)` | Cho đến khi entry đó bị xóa hoặc eviction. Tra cứu lại entry của nó trong mỗi callback. |
| Body HTTP và socket callback data | Copy vào bộ nhớ sở hữu trước khi giữ chúng. |

Cho một flow menu hoặc prompt bền vững, lưu trữ UUID và dữ liệu ứng dụng thay vì callback handle. Một menu mới có thể kích hoạt close handler của menu trước đó trước khi `menu.open` trả về, vì vậy ghi lại trang mà menu mới đại diện chỉ sau khi mở nó. [Ví dụ vault](./menus#a-vault-with-pages) sử dụng thứ tự này.

Heap của plugin không được tự động reset sau callback. Giải phóng cấp phát của bạn khi chủ sở hữu của chúng xong; sử dụng `abi.arena()` cho công việc tạm thời và allocator của một store cho string thuộc về một entry đã lưu trữ. Không bao giờ deinitialize một handle sau khi chuyển nó đến một API được tài liệu hóa là tiêu thụ nó.
