# Menu

`pumpkin.menu` biến một màn hình inventory thành một menu. Bạn đặt vật phẩm trong nó như các nút, và click một nút gọi một hàm của bạn. Slot bị khóa theo mặc định, và `free` chọn các slot hoạt động như một rương.

## Thiết lập

Menu hoạt động bằng cách lắng nghe một vài inventory event, vì vậy plugin phải gọi `menu.listen` một lần, thường trong `onLoad`:

```zig
pub fn onLoad(ctx: pumpkin.Context) !void {
    pumpkin.menu.listen(ctx);
}
```

## Mở một menu

Plugin này thêm một lệnh `/shop` mở một menu với một nút đơn:

```zig [src/main.zig]
const pumpkin = @import("pumpkin");
const cmd = pumpkin.cmd;
const menu = pumpkin.menu;
const msg = pumpkin.msg;

const MyPlugin = struct {
    pub const metadata: pumpkin.Metadata = .{
        .name = "my-zig-plugin",
        .version = "0.1.0",
    };

    pub const commands: []const cmd.Spec = &.{.{
        .names = &.{"shop"},
        .description = "Opens the shop.",
        .permission = "my-zig-plugin:command.shop",
        .run = openShop,
    }};

    pub fn onLoad(ctx: pumpkin.Context) !void {
        menu.listen(ctx);
    }

    fn openShop(sender: cmd.Sender, _: pumpkin.Server, _: cmd.Args) cmd.Result {
        const player = sender.asPlayer() orelse return cmd.fail("only players can shop");
        menu.open(player, .{
            .screen = .generic_9x3,
            .title = &.{.{ .text = "Shop", .color = .gold }},
            .buttons = &.{.{
                .slot = 13,
                .icon = .{
                    .id = "minecraft:diamond",
                    .name = &.{.{ .text = "Buy a diamond", .color = .aqua }},
                    .lore = &.{&.{.{ .text = "Costs 10 coins", .color = .gray }}},
                },
                .on_click = buy,
            }},
            .fill = .{ .id = "minecraft:gray_stained_glass_pane" },
        });
        return cmd.ok(1);
    }

    fn buy(click: menu.Click) void {
        click.player.sendSystemMessage(msg.plain("You bought a diamond."), false);
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

`screen` là loại inventory để hiển thị và mặc định là `.generic_9x3`, một rương với ba hàng. `.generic_9x1` đến `.generic_9x6` cung cấp một đến sáu hàng, `.generic_3x3` là một dispenser và `.hopper` một hopper. `title` được tạo từ [text span](./text).

Slot được đánh số từ 0 ở góc trên bên trái, đi từng hàng, vì vậy slot 13 là giữa một rương ba hàng. `fill` là tùy chọn. Khi được thiết lập, nó điền các slot không có nút hoặc stack hiện có và không tự do. Bỏ qua nó để giữ các slot không sử dụng trống.

Một icon là một [`item.Spec`](./items), vì vậy nó có thể là bất cứ thứ gì `item.build` tạo ra: một item id với một `count`, một `name` và `lore` được tạo từ text span, enchantment v.v. Không giống tên tùy chỉnh vanilla, tên và lore không nghiêng trừ khi bạn thiết lập `italic`.

> [!NOTE]
> Các build Pumpkin cũ chỉ cấp phát năm slot cho `.generic_9x1`. Các build chứa [plugin GUI fixes](https://github.com/Pumpkin-MC/Pumpkin/pull/4157) cung cấp tất cả chín slot và ánh xạ chính xác inventory người chơi. Sử dụng một build server tương thích khi kiểm tra các menu này.

## Xử lý click

Một click handler nhận một `menu.Click`, cái này có `player` đã click, `server`, `slot`, click `type` (như `.left`, `.right`, `.shift_left` hoặc `.number_key`) và `data` của nút.

`data` là một số bạn chọn mỗi nút. Nó cho phép vài nút chia sẻ một handler, cái này là cách menu được xây dựng runtime thường hoạt động, ví dụ một danh sách người chơi hoặc warp:

```zig
const colors = [_]msg.Color{ .red, .green, .aqua, .yellow };

fn openColors(player: pumpkin.Player) void {
    var names: [colors.len][1]msg.Span = undefined;
    var buttons: [colors.len]menu.Button = undefined;
    for (&buttons, &names, colors, 0..) |*button, *name, color, i| {
        name.* = .{.{ .text = @tagName(color), .color = color }};
        button.* = .{
            .slot = @intCast(10 + 2 * i),
            .icon = .{ .id = "minecraft:white_wool", .name = name },
            .on_click = pickColor,
            .data = i,
        };
    }
    menu.open(player, .{ .title = &.{.{ .text = "Pick a color" }}, .buttons = &buttons });
}

fn pickColor(click: menu.Click) void {
    const color = colors[click.data];
    click.player.sendSystemMessage(msg.fmt(color, "You picked {s}.", .{@tagName(color)}), false);
}
```

Các nút có thể sống trên stack, vì `menu.open` copy những gì nó cần trước khi nó trả về. Tên được giữ trong một mảng riêng: `&.{ ... }` được viết trong vòng lặp sẽ trỏ đến bộ nhớ mà vòng tiếp theo của vòng lặp tái sử dụng, và mọi nút sẽ hiển thị tên cuối cùng.

Helper không giữ specification để xây dựng lại một menu. Người chơi có thể thay đổi nội dung free-slot, nhưng để thay đổi các nút hoặc layout, mở lại nó với một specification mới. Mở một menu thay thế cái mà người chơi đang mở.

## Free slot và vật phẩm hiện có

Liệt kê số slot trong `free` để cho phép người chơi đặt vật phẩm ở đó và lấy lại chúng. Các slot khác vẫn bị khóa. Một nút được đặt trong một free slot trở thành vật phẩm bắt đầu của nó; handler click của nó không chạy.

```zig
menu.open(player, .{
    .title = &.{.{ .text = "Deposit" }},
    .free = &.{ 10, 11, 12 },
    .stacks = &.{.{ .slot = 10, .item = item.copy(saved_stack) }},
    .fill = .{ .id = "minecraft:gray_stained_glass_pane" },
    .on_close = readDeposit,
});

fn readDeposit(_: pumpkin.Server, player: pumpkin.Player) void {
    const slots = menu.items(player) orelse return;
    if (slots.getItem(10)) |stack| {
        std.log.info("Slot 10 contains {d} items", .{stack.getCount()});
    }
}
```

`stacks` đặt các item handle hiện có trong các slot cụ thể sau các nút. `open` tiêu thụ các handle đó; sử dụng `item.copy` nếu phần khác của plugin vẫn sở hữu bản gốc. Đặt vật phẩm đã lưu trữ trong free slot để chúng không thay thế một icon nút bị khóa trong khi vẫn giữ handler của nó hoạt động.

`menu.items(player)` trả về inventory thuộc về menu và cũng hoạt động trong `on_close`. Đọc nó trước khi session được giải phóng; không gọi `deinit()` trên nó hoặc giữ nó sau khi menu đóng. Copy nội dung vào allocator của store khi chúng cần tồn tại sau khi đóng.

Shift-click từ inventory người chơi và double-click collection bị chặn trong một menu với free slot, vì vậy chúng không thể đặt vật phẩm trong slot bị khóa hoặc thu thập các nút của nó. Shift-click ra khỏi một free slot được cho phép.

> [!WARNING]
> Free slot không tự động lưu hoặc trả về nội dung của chúng. Một plugin lưu trữ phải đọc và duy trì chúng trong `on_close`. Ví dụ trash cố tình loại bỏ chúng. Kiểm tra chuyển giao và đóng trên server của bạn trước khi lưu trữ vật phẩm giá trị.

## Đóng

`on_close` được gọi khi người chơi đóng menu, khi một menu khác thay thế nó, và khi người chơi rời server:

```zig
menu.open(player, .{
    .title = &.{.{ .text = "Settings" }},
    .buttons = &buttons,
    .on_close = saveSettings,
});

fn saveSettings(_: pumpkin.Server, player: pumpkin.Player) void {
    std.log.info("{s} closed the settings", .{player.getName()});
}
```

`menu.isOpen(player)` cho biết liệu người chơi có một trong các menu của plugin đang mở.

[Ví dụ `menu`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/menu.zig) chứa `/colors` và một menu `/trash` với free slot.

## Một vault với trang

[Ví dụ vault](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/vault.zig) kết hợp menu, cấu hình và dữ liệu người chơi. `/vault` mở trang đầu tiên, và `/vault <page>` mở một trang được đánh số, bắt đầu từ 1. Mỗi trang có 45 slot lưu trữ và một hàng dưới cùng bị khóa cho điều hướng.

**All pages** mở một selector hiển thị số lượng slot đã chiếm của mỗi trang và sức chứa tổng. Chọn một trang trực tiếp hoặc sử dụng Previous, Next và Back. Nút Ender Chest mở Ender Chest của người chơi sau khi lưu trang vault hiện tại.

Plugin tạo `plugins/data/example-vault/config.toml`:

```toml
pages = 5
```

Thiết lập `pages` từ 1 đến 45 và khởi động lại plugin để áp dụng nó. Năm trang cung cấp 225 slot; 45 trang cung cấp 2,025. Hạ cài đặt giữ các trang cao hơn đã chiếm có thể truy cập cho đến khi chúng được làm rỗng. File vault hiện có vẫn hoạt động.

Ví dụ lưu trang hiện tại trước khi xây dựng view tiếp theo và lần nữa khi nó đóng. Mã hóa vật phẩm JSON của nó thuộc về ví dụ, không phải `menu` hoặc `item.copy`. [Player Data](./player-data) giải thích khoảng thời gian lưu và hành vi file của store.
