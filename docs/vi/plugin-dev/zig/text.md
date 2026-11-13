# Văn bản

Tin nhắn chat, tiêu đề, tên vật phẩm và tiêu đề menu đều là text component. `pumpkin.msg` xây dựng chúng từ struct literal, vì vậy ngay cả một tin nhắn với vài style cũng là một biểu thức đơn.

## Văn bản đơn giản và được định dạng

```zig
const msg = pumpkin.msg;

player.sendSystemMessage(msg.plain("Hello!"), false);
player.sendSystemMessage(msg.fmt(.gold, "You have {d} coins.", .{coins}), false);
player.sendSystemMessage(msg.fmt(null, "Welcome back, {s}.", .{player.getName()}), false);
```

`msg.plain` tạo văn bản không style. `msg.fmt` nhận một màu, một chuỗi định dạng `std.fmt` và các đối số của nó. Chuyển `null` như màu để giữ mặc định.

Đối số thứ hai của `sendSystemMessage` đặt tin nhắn phía trên hotbar thay vì trong chat khi nó là `true`.

## Văn bản được định dạng

`msg.build` joins một danh sách các span thành một component. Mỗi span chỉ thiết lập các style mà nó cần:

```zig
sender.sendMessage(msg.build(&.{
    .{ .text = "[Shop] ", .color = .gold, .bold = true },
    .{ .text = "Click to open", .underlined = true, .click = .{ .run_command = "/shop" }, .hover = "Opens the shop" },
}));
```

Đây là các trường một span có thể thiết lập:

| Trường | Hiệu quả |
| --- | --- |
| `text` | Chính văn bản. |
| `translate` | Một translation key như `"block.minecraft.stone"`, được hiển thị trong ngôn ngữ của người chơi. Nó thay thế `text`. |
| `color` | Một trong 16 màu được đặt tên: `.black`, `.dark_blue`, `.dark_green`, `.dark_aqua`, `.dark_red`, `.dark_purple`, `.gold`, `.gray`, `.dark_gray`, `.blue`, `.green`, `.aqua`, `.red`, `.light_purple`, `.yellow` và `.white`. |
| `rgb` | Bất kỳ màu nào, ví dụ `.{ .r = 255, .g = 128, .b = 0 }`. Nó được ưu tiên hơn `color`. |
| `bold`, `italic`, `underlined`, `strikethrough`, `obfuscated` | `true` hoặc `false` để bật hoặc tắt style. |
| `click` | Cái gì một click làm: `.run_command`, `.suggest_command`, `.open_url`, `.copy` để copy vào clipboard, hoặc `.change_page` trong một sách. |
| `hover` | Văn bản được hiển thị khi rê qua span. |
| `insertion` | Văn bản được chèn vào hộp chat khi span được shift-click. |
| `font` | Một font từ một resource pack. |

Ở đâu một API nhận một component đơn, `msg.span` biến một span thành một.

## Sử dụng component trực tiếp

Mọi thứ `msg` xây dựng là một `pumpkin.TextComponent`. Cho những gì `msg` không bao gồm, như dịch với đối số, interface `pumpkin.text` được tạo hoạt động trên component trực tiếp:

```zig
const name = pumpkin.TextComponent.text(player.getName());
const joined = pumpkin.TextComponent.translate("multiplayer.player.joined", &.{name});
joined.colorNamed(.yellow);
```

[Ví dụ `hello`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/hello.zig) xây dựng một join message được định dạng.

## Style trong item, menu và prompt

Một style bị bỏ qua là `null`, có nghĩa là nó được để cho component cha quyết định. Thiết lập một style thành `false` rõ ràng tắt nó. Item và menu icon được xây dựng qua `item.Spec` mặc định tên và lore không nghiêng; thiết lập trường `italic` của spec để thay đổi mặc định đó, hoặc ghi đè nó trên một span cụ thể:

```zig
const label = item.build(.{
    .id = "minecraft:name_tag",
    .italic = true,
    .name = &.{
        .{ .text = "Vault " },
        .{ .text = "1", .italic = false, .color = .gold },
    },
});
```

[Prompt](./prompts) sử dụng cùng span cho câu hỏi, tin nhắn xác thực và label lựa chọn. Một lựa chọn cung cấp action click lệnh riêng của nó; màu, style và hover text từ label của nó vẫn còn.

`Span.hover` là văn bản đơn giản. Cho một hover được định dạng, xây dựng component trực tiếp và gọi `component.hoverShowText(msg.build(spans))`. Một action `.click = .{ .copy = "text" }` copy văn bản vào clipboard của người chơi; nó không clone component.

`TextComponent.toJson()` trả về JSON text hợp lệ cho callback hiện tại, và `TextComponent.fromJson(json)` trả về một component `.ok` hoặc một thông báo `.err`. Copy văn bản đã tuần tự hóa vào [owned memory](./memory) trước khi giữ nó cho callback khác.
