# 菜单

`pumpkin.menu` 可以将物品栏界面变成菜单。你可以在其中放置物品作为按钮，点击按钮就会调用你的函数。槽位默认锁定，`free` 用于选择行为类似箱子的槽位。

## 设置

菜单通过监听若干物品栏事件工作，因此插件必须调用一次 `menu.listen`，通常在 `onLoad` 中调用：

```zig
pub fn onLoad(ctx: pumpkin.Context) !void {
    pumpkin.menu.listen(ctx);
}
```

## 打开菜单

此插件添加了一个 `/shop` 命令，可打开只有一个按钮的菜单：

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

`screen` 是要显示的物品栏类型，默认为 `.generic_9x3`，即三行箱子。`.generic_9x1` 至 `.generic_9x6` 提供一至六行，`.generic_3x3` 是发射器，`.hopper` 是漏斗。`title` 由[文本片段](./text)组成。

槽位从左上角的 0 开始逐行编号，因此槽位 13 位于三行箱子的中央。`fill` 是可选的。设置后，它会填充没有按钮或现有物品堆叠且不是自由槽位的槽位。省略它可让未使用的槽位保持为空。

图标是 [`item.Spec`](./items)，因此可以是 `item.build` 能构建的任何内容：带 `count` 的物品 ID、由文本片段组成的 `name` 和 `lore`、附魔等等。与原版自定义名称不同，除非设置 `italic`，否则名称和描述不会使用斜体。

> [!NOTE]
> 较旧的 Pumpkin 构建只会为 `.generic_9x1` 分配五个槽位。包含[插件 GUI 修复](https://github.com/Pumpkin-MC/Pumpkin/pull/4157)的构建会提供全部九个槽位，并正确映射玩家物品栏。测试这些菜单时，请使用兼容的服务器构建。

## 处理点击

点击处理函数接收 `menu.Click`，其中包含点击的 `player`、`server`、`slot`、点击 `type`（例如 `.left`、`.right`、`.shift_left` 或 `.number_key`）以及按钮的 `data`。

`data` 是你为每个按钮选择的数字。它让多个按钮可以共享一个处理函数，运行时构建的菜单通常就是这样工作的，例如玩家列表或传送点列表：

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

按钮可以位于栈上，因为 `menu.open` 会在返回前复制所需内容。名称保存在独立数组中：在循环内编写的 `&.{ ... }` 会指向下一轮循环复用的内存，导致每个按钮都显示最后一个名称。

辅助函数不会保留规范以重建菜单。玩家可以更改自由槽位的内容，但要更改按钮或布局，必须使用新规范再次打开菜单。打开菜单会替换玩家当前打开的菜单。

## 自由槽位和现有物品

在 `free` 中列出槽位编号，可让玩家将物品放入其中并取回。其他槽位保持锁定。放置在自由槽位中的按钮会成为其初始物品，其点击处理函数不会运行。

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

`stacks` 会在按钮之后将现有物品句柄放入指定槽位。`open` 会消耗这些句柄；如果插件的其他部分仍拥有原始物品，请使用 `item.copy`。请将存储的物品放在自由槽位中，以免它们替换锁定按钮的图标，同时按钮处理函数仍处于活动状态。

`menu.items(player)` 返回菜单拥有的物品栏，在 `on_close` 内也可使用。请在会话释放前读取它；不要对其调用 `deinit()`，也不要在菜单关闭后保留它。如果内容需要在关闭后继续存在，请将其复制到存储的分配器中。

在含自由槽位的菜单中，从玩家物品栏按住 Shift 点击以及双击收集都会被阻止，因此这些操作无法将物品放入锁定槽位或收集菜单按钮。允许从自由槽位按住 Shift 点击取出物品。

> [!WARNING]
> 自由槽位不会自动保存或返还其内容。存储插件必须在 `on_close` 中读取并持久化这些内容。垃圾桶示例会有意丢弃它们。存储贵重物品前，请在你的服务器上检查转移和关闭行为。

## 关闭

玩家关闭菜单、另一个菜单替换当前菜单，以及玩家离开服务器时，都会调用 `on_close`：

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

`menu.isOpen(player)` 表示玩家是否打开了插件的菜单。

[`menu` 示例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/menu.zig)包含 `/colors` 和带自由槽位的 `/trash` 菜单。

## 带页面的仓库

[仓库示例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/vault.zig)结合了菜单、配置和玩家数据。`/vault` 打开第一页，`/vault <page>` 打开指定编号的页面，从 1 开始。每页有 45 个存储槽位，底行锁定用于导航。

**All pages** 会打开选择器，显示每页已占用的槽位数量和总容量。可以直接选择页面，也可以使用 Previous、Next 和 Back。末影箱按钮会在保存当前仓库页面后打开玩家的末影箱。

插件会创建 `plugins/data/example-vault/config.toml`：

```toml
pages = 5
```

将 `pages` 设置为 1 至 45，并重启插件以应用。五页提供 225 个槽位；45 页提供 2,025 个槽位。降低该设置后，较高页面上已占用的槽位仍可访问，直到清空。现有仓库文件仍可继续使用。

示例会在构建下一个视图前以及关闭时保存当前页面。其 JSON 物品编码属于该示例，而不是 `menu` 或 `item.copy` 的一部分。[玩家数据](./player-data)介绍了存储的保存间隔和文件行为。
