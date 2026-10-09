# Menus

`pumpkin.menu` turns an inventory screen into a menu. You place items in it as buttons, and clicking a button calls a function of yours. Players can't take items out of a menu or put their own items in.

## Setting up

Menus work by listening to a few inventory events, so the plugin has to call `menu.listen` once, usually in `onLoad`:

```zig
pub fn onLoad(ctx: pumpkin.Context) !void {
    pumpkin.menu.listen(ctx);
}
```

## Opening a menu

This plugin adds a `/shop` command that opens a menu with a single button:

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

`screen` is the kind of inventory to show and defaults to `.generic_9x3`, a chest with three rows. `.generic_9x2` through `.generic_9x6` give two to six rows, `.generic_3x3` is a dispenser and `.hopper` a hopper. The `title` is made of [text spans](./text).

Slots are numbered from 0 in the top left corner, going row by row, so slot 13 is the middle of a three row chest. `fill` puts an item in every slot that has no button, which is usually a glass pane as a background.

An icon is an item id with an optional `count`, `name` and `lore`. The name and every lore line are lists of text spans. Unlike vanilla custom names, they aren't italic unless you set `italic`.

> [!NOTE]
> The server currently gives `.generic_9x1` menus 5 slots instead of 9, so the last four slots of a one row menu don't work. Use `.generic_9x2` or bigger until that is fixed.

## Handling clicks

A click handler receives a `menu.Click`, which has the `player` who clicked, the `server`, the `slot`, the click `type` (such as `.left`, `.right`, `.shift_left` or `.number_key`) and the button's `data`.

`data` is a number you choose per button. It lets several buttons share one handler, which is how menus built at runtime usually work, for example a list of players or warps:

```zig
const colors = [_]msg.Color{ .red, .green, .aqua, .yellow };

fn openColors(player: pumpkin.Player) void {
    var buttons: [colors.len]menu.Button = undefined;
    for (&buttons, colors, 0..) |*button, color, i| button.* = .{
        .slot = @intCast(10 + 2 * i),
        .icon = .{ .id = "minecraft:white_wool", .name = &.{.{ .text = @tagName(color), .color = color }} },
        .on_click = pickColor,
        .data = i,
    };
    menu.open(player, .{ .title = &.{.{ .text = "Pick a color" }}, .buttons = &buttons });
}

fn pickColor(click: menu.Click) void {
    const color = colors[click.data];
    click.player.sendSystemMessage(msg.fmt(color, "You picked {s}.", .{@tagName(color)}), false);
}
```

The buttons can live on the stack, because `menu.open` copies what it needs before it returns.

A menu doesn't change after it has been opened. To show something different, open it again with new buttons. Opening a menu replaces the one the player has open.

## Closing

`on_close` is called when the player closes the menu, when another menu replaces it, and when the player leaves the server:

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

`menu.isOpen(player)` tells whether a player has one of the plugin's menus open.
