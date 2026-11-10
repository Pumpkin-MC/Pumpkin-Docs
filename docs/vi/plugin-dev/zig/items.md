# Vật phẩm

`pumpkin.item` xây dựng item stack từ struct literal, nhận diện vật phẩm của chính plugin sau đó, và cấp vật phẩm cho người chơi hoặc lấy chúng đi.

## Xây dựng một vật phẩm

```zig
const item = pumpkin.item;

const sword = item.build(.{
    .id = "minecraft:diamond_sword",
    .name = &.{.{ .text = "Excalibur", .color = .gold, .bold = true }},
    .lore = &.{
        &.{.{ .text = "Drawn from the stone", .color = .gray }},
        &.{.{ .text = "Right click to heal", .color = .yellow }},
    },
    .enchants = &.{.{ .sharpness, 5 }},
    .modifiers = &.{.{ .attribute = .attack_damage, .amount = 10 }},
    .unbreakable = true,
    .rarity = .epic,
    .data = &.{.{ .key = "id", .value = .{ .string = "excalibur" } }},
});
_ = item.give(player, sword);
```

Chỉ `id` là bắt buộc. Đây là các trường của `item.Spec`:

| Trường | Thiết lập |
| --- | --- |
| `id`, `count` | Vật phẩm và có bao nhiêu. `count` là 1 trừ khi bạn thiết lập. |
| `name` | Tên, được tạo từ [text span](./text). Không giống tên tùy chỉnh vanilla, nó không nghiêng trừ khi bạn thiết lập `italic`. |
| `lore` | Các dòng dưới tên, một danh sách span mỗi dòng. |
| `italic` | Kiểu mặc định cho tên và lore, `false` trừ khi được thiết lập. Một kiểu rõ ràng trên một span được ưu tiên. |
| `enchants` | Enchantment và cấp của chúng, như `.{ .sharpness, 5 }`. |
| `custom_enchants` | Enchantment từ data pack, theo id. |
| `modifiers` | Attribute modifier. `operation` là `.add` và `slot` là `.main_hand` trừ khi bạn thiết lập. Thiết lập `id` khi vài modifier ảnh hưởng cùng attribute. |
| `unbreakable` | Liệu vật phẩm có không bao giờ mất độ bền. |
| `glint` | Làm vật phẩm lấp lánh như thể nó được enchant. |
| `rarity` | `.common`, `.uncommon`, `.rare` hoặc `.epic`, cái này màu tên. |
| `max_stack_size` | Bao nhiêu vừa trong một slot. |
| `max_damage`, `damage` | Độ bền của vật phẩm, và bao nhiêu đã được sử dụng. |
| `custom_model_data` | Một số mà resource pack sử dụng để chọn model. |
| `data` | Các giá trị plugin lưu trữ trên vật phẩm, xem bên dưới. |

Menu icon cũng là `item.Spec`, vì vậy một nút [menu](./menus) có thể hiển thị bất cứ thứ gì `build` tạo ra. Một modifier không có `id` sử dụng `<plugin>:<attribute>`; modifier với cùng id thay thế nhau.

## Nhận diện vật phẩm của bạn

Các giá trị trong `data` được lưu trữ trên vật phẩm dưới tên plugin, vì vậy chúng không xung đột với plugin khác. Chúng có thể là string, integer, float hoặc boolean, và ở lại trên vật phẩm bất kể nó đi đâu. Chúng là cách một plugin phân biệt vật phẩm của mình với các vật phẩm vanilla có cùng id:

```zig
fn onInteract(_: pumpkin.Server, ev: *pumpkin.EventData(.player_interact_event)) void {
    if (ev.action != .right_click_air and ev.action != .right_click_block) return;
    const held = item.held(ev.player) orelse return;
    if (!item.is(held, "id", "excalibur")) return;
    ev.player.setHealth(ev.player.getMaxHealth());
}
```

`item.held(player)` trả về vật phẩm trong tay chính của người chơi. `item.is(stack, key, value)` kiểm tra một giá trị string, `item.get(stack, key)` trả về bất kỳ giá trị đã lưu trữ nào như một `item.Value`, và `item.set(stack, key, value)` lưu trữ một cái.

`item.setIn(stack, namespace, key, value)` và `item.getIn(stack, namespace, key)` sử dụng một namespace rõ ràng thay vì tên plugin. Sử dụng chúng cho dữ liệu được chia sẻ với plugin khác.

## Thay đổi một vật phẩm

`item.edit` nhận cùng loại literal như `build`, nhưng chỉ thay đổi các trường bạn đưa cho nó và giữ mọi thứ khác:

```zig
fn upgrade(sender: cmd.Sender, _: pumpkin.Server, _: cmd.Args) cmd.Result {
    const player = sender.asPlayer() orelse return cmd.fail("only players can upgrade a sword");
    const sword = item.held(player) orelse return cmd.fail("hold Excalibur to upgrade it");
    if (!item.is(sword, "id", "excalibur")) return cmd.fail("hold Excalibur to upgrade it");
    const level = item.enchantLevel(sword, .sharpness);
    item.edit(sword, .{ .enchants = &.{.{ .sharpness, level + 1 }} });
    item.setHeld(player, sword);
    return cmd.ok(1);
}
```

Một vật phẩm được lấy từ inventory là một bản sao, vì vậy sau khi thay đổi nó, đặt lại nó. `item.editHeld(player, changes)` làm cả hai cho vật phẩm trong tay chính.

`edit` có vài trường `build` không có. `lore` thay thế toàn bộ lore và `add_lore` thêm dòng sau nó. Một enchantment với level 0 bị xóa. `remove_modifiers` xóa các modifier của các attribute đã cho, và `remove_data` các giá trị đã lưu trữ với các key đã cho. `.damage = 0` sửa chữa vật phẩm.

Để đọc một vật phẩm, `item.enchantLevel` và `item.customEnchantLevel` trả về cấp của một enchantment, hoặc 0 nếu không có. `item.damage` trả về bao nhiêu độ bền đã được sử dụng. `item.maxDamage` trả về độ bền được thiết lập với `max_damage`, và `null` cho vật phẩm giữ độ bền mặc định.

## Cấp phát và thu hồi

```zig
const left = item.give(player, item.build(.{ .id = "minecraft:bread", .count = 100 }));
if (left > 0) sender.sendMessage(msg.fmt(.yellow, "{d} bread didn't fit.", .{left}));

if (!item.take(player, .{ .id = "minecraft:bread" }, 5)) return cmd.fail("you need 5 bread");
```

`item.give` đặt vật phẩm vào inventory của người chơi theo cùng thứ tự như `/give` của vanilla: nó đầu tiên đầy các stack của cùng vật phẩm trong tay chính, tay phụ và phần còn lại của inventory, sau đó điền vào các slot trống, hotbar trước. Số lượng trên kích thước stack được trải ra trên vài slot. Nó tiêu thụ stack được cung cấp và trả về bao nhiêu vật phẩm không vừa. Kết quả đó là một đếm, không phải một item handle; phần thừa không được thả hoặc trả về như stack. Giữ một bản sao độc lập khi plugin của bạn cần trả về phần thừa.

`item.room(player, stack)` đếm sức chứa khớp trong inventory và offhand. Trong 0.2.0 nó cũng đếm một offhand trống, trong khi `give` chỉ đầy một offhand khớp đã chiếm. Kết quả của nó do đó có thể ước lượng quá cao những gì `give` sẽ chèn; nó không phải là đảm bảo một giao dịch hoàn chỉnh sẽ vừa.

`item.take(player, match, amount)` lấy vật phẩm theo cùng thứ tự như `/clear` của vanilla. Nếu người chơi có ít hơn `amount`, nó không lấy gì và trả về `false`, vì vậy nó không thể để lại một giao dịch một nửa. `item.count(player, match)` đếm vật phẩm khớp, và `item.has(player, match, amount)` kiểm tra ít nhất `amount` của chúng.

`match` chọn vật phẩm hoặc theo id, như `.{ .id = "minecraft:bread" }`, hoặc theo một giá trị đã lưu trữ, như `.{ .data = .{ .key = "id", .value = .{ .string = "excalibur" } } }`. Id có thể được viết có hoặc không có namespace `minecraft:`.

## Sử dụng item API trực tiếp

`build` trả về một `pumpkin.item.ItemStack`, item handle của plugin API. Các phương thức của nó, như `getRegistryKey`, `getCount`, `getEnchantments` và `getLore`, hoạt động trên stack từ bất cứ đâu, bao gồm sự kiện và inventory.

`item.copy(stack)` tạo một bản sao, bảo tồn tên tùy chỉnh, lore và attribute modifier qua API được gõ của chúng. `item.canStack(a, b)` kiểm tra liệu hai stack có item id và component khớp. Không hàm nào lưu trữ vật phẩm trong một file.

[Ví dụ `items`](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/items.zig) đặt tất cả cái này cùng nhau: một thanh kiếm nó nhận diện và nâng cấp, bánh mì trải ra trên vài slot, và một giao dịch.

## Định dạng và chia sẻ dữ liệu vật phẩm

Thiết lập `italic` trên spec cho mặc định tên và lore, và sử dụng span style cho ghi đè riêng lẻ. Cung cấp cho modifier các ID riêng biệt khi hai bonus ảnh hưởng cùng attribute:

```zig
const sword = item.build(.{
    .id = "minecraft:diamond_sword",
    .italic = true,
    .name = &.{.{ .text = "Excalibur", .italic = false, .color = .gold }},
    .modifiers = &.{
        .{ .attribute = .attack_damage, .id = "my-zig-plugin:base_damage", .amount = 5 },
        .{ .attribute = .attack_damage, .id = "my-zig-plugin:bonus_damage", .amount = 2 },
    },
});
item.setIn(sword, "shared", "owner", .{ .string = player.getName() });
const owner = item.getIn(sword, "shared", "owner");
```

`remove_modifiers` trong `item.edit` xóa mọi modifier cho attribute được yêu cầu, bao gồm ID được viết bởi plugin khác. ID rõ ràng ngăn collision thay thế khi thêm modifier; chúng không thu hẹp operation xóa đó.

Để chỉnh sửa một bản sao mà không thay đổi cái khác, gọi `item.copy(original)`, chỉnh sửa stack đã trả về và đặt bản sao đó vào inventory đích. Copy một giá trị handle Zig một mình không tạo một stack mới. [Handles and Memory](./memory) bao gồm quyền sở hữu tài nguyên và handle được tiêu thụ.
