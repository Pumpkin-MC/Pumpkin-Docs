# Sự kiện

Server kích hoạt một sự kiện cho hầu hết những gì xảy ra trong game: một người chơi tham gia, chat, phá khối, chết. Một plugin có thể lắng nghe bất kỳ cái nào trong số đó, xem sự kiện, thay đổi nó, hoặc hủy nó.

## Lắng nghe sự kiện

Các sự kiện được liệt kê trong `pub const events`, với tên sự kiện ở bên trái và handler ở bên phải:

```zig [src/main.zig]
const std = @import("std");
const pumpkin = @import("pumpkin");

const MyPlugin = struct {
    pub const metadata: pumpkin.Metadata = .{
        .name = "my-zig-plugin",
        .version = "0.1.0",
    };

    pub const events = .{
        .player_join_event = onJoin,
        .player_chat_event = onChat,
        .block_break_event = onBreak,
    };

    fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
        std.log.info("{s} joined", .{ev.player.getName()});
    }

    fn onChat(_: pumpkin.Server, ev: *pumpkin.EventData(.player_chat_event)) void {
        if (std.mem.indexOf(u8, ev.message, "spoiler") != null) ev.cancelled = true;
    }

    fn onBreak(_: pumpkin.Server, ev: *pumpkin.EventData(.block_break_event)) void {
        ev.should_drop = false;
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

Mỗi handler nhận server và một con trỏ đến sự kiện. `pumpkin.EventData(.player_chat_event)` là kiểu dữ liệu của sự kiện đó, vì vậy compiler biết trường nào nó có, và một tên sự kiện viết sai không compile. Các sự kiện và trường của chúng được tạo vào `pumpkin.event`, và completion trên `pumpkin.EventData(.` là một cách nhanh để xem qua chúng.

## Thay đổi và hủy sự kiện

Vì handler nhận sự kiện qua con trỏ, bất cứ thứ gì nó thay đổi được chuyển ngược lại server. Hầu hết sự kiện có một trường `cancelled`. Thiết lập nó ngăn sự kiện xảy ra: tin nhắn chat ở trên không bao giờ được gửi, và một block break bị hủy để khối lại nơi nó đã từng ở. Các trường khác hoạt động theo cách tương tự. Handler `onBreak` ở trên cho phép khối bị phá nhưng ngăn nó thả bất cứ thứ gì, và `player_join_event` có một `join_message` bạn có thể thay thế.

## Độ ưu tiên và chặn

Một handler có thể được cung cấp option bằng cách ghép nối nó với `pumpkin.EventOptions`:

```zig
pub const events = .{
    .player_chat_event = .{ onChat, pumpkin.EventOptions{ .priority = .high } },
    .player_join_event = .{ onJoin, pumpkin.EventOptions{ .blocking = false } },
};
```

`priority` là một trong `.highest`, `.high`, `.normal`, `.low` và `.lowest`, với `.normal` là mặc định.

`blocking` quyết định liệu server có đợi handler. Theo mặc định thì có, cái này cho phép handler thay đổi hoặc hủy sự kiện. Một handler non-blocking không giữ server chờ, nhưng bất kỳ thay đổi nào nó thực hiện đều bị loại bỏ, vì vậy nó chỉ phù hợp với handler chỉ quan sát, như logging hoặc thống kê.

## Đăng ký handler tại runtime

Các handler trong `pub const events` được đăng ký trước khi `onLoad` chạy. Để đăng ký một cái sau, hoặc chỉ dưới một số điều kiện, gọi `pumpkin.on` với context của plugin:

```zig
pub fn onLoad(ctx: pumpkin.Context) !void {
    pumpkin.on(ctx, .player_death_event, onDeath, .{});
}

fn onDeath(_: pumpkin.Server, ev: *pumpkin.EventData(.player_death_event)) void {
    std.log.info("{s} died", .{ev.player.getName()});
}
```

Đối số cuối cùng nhận cùng `EventOptions`.

[Ví dụ `hello`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/hello.zig) lắng nghe sự kiện và thay đổi tin nhắn tham gia.

## Sự kiện được sử dụng bởi helper

Khởi tạo helper trong `onLoad` cũng như khai báo sự kiện riêng của bạn:

```zig
pub fn onLoad(ctx: pumpkin.Context) !void {
    pumpkin.menu.listen(ctx);
    try pumpkin.prompt.listen(ctx, .{});
}
```

`menu.listen` xử lý inventory click, menu close và người chơi rời đi. `prompt.listen` xử lý chat và rời đi, và đăng ký lệnh đằng sau các lựa chọn có thể click. Chúng không thay thế handler trong `pub const events`. Giữ chat handler của prompt blocking để câu trả lời bị capture có thể bị hủy trước khi broadcast; một handler non-blocking không thể làm cho câu trả lời riêng tư.

Giá trị sự kiện vẫn có [callback lifetimes](./memory). Copy văn bản bạn giữ, và chuyển UUID của người chơi đến một [task](./scheduling) thay vì lưu trữ con trỏ sự kiện hoặc handle `Player` của nó.
