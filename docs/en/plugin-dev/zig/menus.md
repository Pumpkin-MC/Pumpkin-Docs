# Menus

`pumpkin.menu` turns an inventory screen into a menu. You place items in it as buttons, and clicking a button calls a function of yours. Slots are locked by default, and `free` selects the slots that work like a chest.

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

`screen` is the kind of inventory to show and defaults to `.generic_9x3`, a chest with three rows. `.generic_9x1` through `.generic_9x6` give one to six rows, `.generic_3x3` is a dispenser and `.hopper` a hopper. The `title` is made of [text spans](./text).

Slots are numbered from 0 in the top left corner, going row by row, so slot 13 is the middle of a three row chest. `fill` is optional. When set, it fills slots that have no button or existing stack and are not free. Leave it out to keep unused slots empty.

An icon is an [`item.Spec`](./items), so it can be anything `item.build` makes: an item id with a `count`, a `name` and `lore` made of text spans, enchantments and so on. Unlike vanilla custom names, names and lore aren't italic unless you set `italic`.

> [!NOTE]
> Older Pumpkin builds allocate only five slots for `.generic_9x1`. Builds containing the [plugin GUI fixes](https://github.com/Pumpkin-MC/Pumpkin/pull/4157) provide all nine slots and correctly map the player inventory. Use a compatible server build when testing these menus.

## Handling clicks

A click handler receives a `menu.Click`, which has the `player` who clicked, the `server`, the `slot`, the click `type` (such as `.left`, `.right`, `.shift_left` or `.number_key`) and the button's `data`.

`data` is a number you choose per button. It lets several buttons share one handler, which is how menus built at runtime usually work, for example a list of players or warps:

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

The buttons can live on the stack, because `menu.open` copies what it needs before it returns. The names are kept in an array of their own: `&.{ ... }` written inside the loop would point to memory that the next round of the loop reuses, and every button would show the last name.

The helper does not retain the specification to rebuild a menu. Players can change free-slot contents, but to change the buttons or layout, open it again with a new specification. Opening a menu replaces the one the player has open.

## Free slots and existing items

List slot numbers in `free` to let players put items there and take them back. Other slots stay locked. A button placed in a free slot becomes its starting item; its click handler does not run.

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

`stacks` places existing item handles in specific slots after the buttons. `open` consumes those handles; use `item.copy` if another part of your plugin still owns the original. Put stored items in free slots so they do not replace a locked button icon while leaving its handler active.

`menu.items(player)` returns the menu-owned inventory and also works inside `on_close`. Read it before the session is released; do not call `deinit()` on it or keep it after the menu closes. Copy the contents into your store's allocator when they need to survive closing.

Shift-clicking from the player's inventory and double-click collection are blocked in a menu with free slots, so they cannot place items in locked slots or collect its buttons. Shift-clicking out of a free slot is allowed.

> [!WARNING]
> Free slots do not save or return their contents automatically. A storage plugin must read and persist them in `on_close`. The trash example intentionally discards them. Check transfers and closing on your server before storing valuable items.

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

[The `menu` example](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/menu.zig) contains `/colors` and a `/trash` menu with free slots.

## A vault with pages

The [vault example](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/vault.zig) combines menus, configuration and player data. `/vault` opens the first page, and `/vault <page>` opens a numbered page, starting at 1. Each page has 45 storage slots and a locked bottom row for navigation.

**All pages** opens a selector showing each page's occupied-slot count and the total capacity. Select a page directly or use Previous, Next and Back. The Ender Chest button opens the player's Ender Chest after saving the current vault page.

The plugin creates `plugins/data/example-vault/config.toml`:

```toml
pages = 5
```

Set `pages` from 1 to 45 and restart the plugin to apply it. Five pages provide 225 slots; 45 pages provide 2,025. Lowering the setting keeps occupied higher pages accessible until they are emptied. Existing vault files keep working.

The example saves the current page before building the next view and again when it closes. Its JSON item encoding belongs to the example, not to `menu` or `item.copy`. [Player Data](./player-data) explains the store's save interval and file behavior.
