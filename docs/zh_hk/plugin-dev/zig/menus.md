# 選單

`pumpkin.menu` 可以將物品欄界面變成選單。你可以在其中放置物品作為按鈕，點選按鈕就會調用你的函數。欄位預設鎖定，`free` 用於選擇行為類似箱子的欄位。

## 設定

選單透過監聽若干物品欄事件工作，因此插件必須調用一次 `menu.listen`，通常在 `onLoad` 中調用：

```zig
pub fn onLoad(ctx: pumpkin.Context) !void {
    pumpkin.menu.listen(ctx);
}
```

## 開啟選單

此插件添加了一個 `/shop` 指令，可開啟只有一個按鈕的選單：

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

`screen` 是要顯示的物品欄類型，預設為 `.generic_9x3`，即三行箱子。`.generic_9x1` 至 `.generic_9x6` 提供一至六行，`.generic_3x3` 是發射器，`.hopper` 是漏斗。`title` 由[文字片段](./text)組成。

欄位從左上角的 0 開始逐行編號，因此欄位 13 位於三行箱子的中央。`fill` 是可選的。設定後，它會填充沒有按鈕或現有物品堆棧且不是自由欄位的欄位。省略它可讓未使用的欄位保持為空。

圖示是 [`item.Spec`](./items)，因此可以是 `item.build` 能構建的任何內容：帶 `count` 的物品 ID、由文字片段組成的 `name` 和 `lore`、附魔等等。與原版自訂名稱不同，除非設定 `italic`，否則名稱和描述不會使用斜體。

> [!NOTE]
> 較舊的 Pumpkin 構建只會為 `.generic_9x1` 分配五個欄位。包含[插件 GUI 修復](https://github.com/Pumpkin-MC/Pumpkin/pull/4157)的構建會提供全部九個欄位，並正確對映玩家物品欄。測試這些選單時，請使用相容的伺服器構建。

## 處理點選

點選處理函數接收 `menu.Click`，其中包含點選的 `player`、`server`、`slot`、點選 `type`（例如 `.left`、`.right`、`.shift_left` 或 `.number_key`）以及按鈕的 `data`。

`data` 是你為每個按鈕選擇的數字。它讓多個按鈕可以共享一個處理函數，執行階段構建的選單通常就是這樣工作的，例如玩家列表或傳送點列表：

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

按鈕可以位於棧上，因為 `menu.open` 會在返回前複製所需內容。名稱儲存在獨立數組中：在迴圈內編寫的 `&.{ ... }` 會指向下一輪迴圈複用的記憶體，導致每個按鈕都顯示最後一個名稱。

輔助函數不會保留規範以重建選單。玩家可以更改自由欄位的內容，但要更改按鈕或佈局，必須使用新規範再次開啟選單。開啟選單會替換玩家目前開啟的選單。

## 自由欄位和現有物品

在 `free` 中列出欄位編號，可讓玩家將物品放入其中並取回。其他欄位保持鎖定。放置在自由欄位中的按鈕會成為其初始物品，其點選處理函數不會執行。

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

`stacks` 會在按鈕之後將現有物品句柄放入指定欄位。`open` 會消耗這些句柄；如果插件的其他部分仍擁有原始物品，請使用 `item.copy`。請將儲存的物品放在自由欄位中，以免它們替換鎖定按鈕的圖示，同時按鈕處理函數仍處於活動狀態。

`menu.items(player)` 返回選單擁有的物品欄，在 `on_close` 內也可使用。請在會話釋放前讀取它；不要對其調用 `deinit()`，也不要在選單關閉後保留它。如果內容需要在關閉後繼續存在，請將其複製到儲存的分配器中。

在含自由欄位的選單中，從玩家物品欄按住 Shift 點選以及雙擊收集都會被阻止，因此這些操作無法將物品放入鎖定欄位或收集選單按鈕。允許從自由欄位按住 Shift 點選取出物品。

> [!WARNING]
> 自由欄位不會自動儲存或返還其內容。儲存插件必須在 `on_close` 中讀取並持久化這些內容。垃圾桶範例會有意丟棄它們。儲存貴重物品前，請在你的伺服器上檢查轉移和關閉行為。

## 關閉

玩家關閉選單、另一個選單替換目前選單，以及玩家離開伺服器時，都會調用 `on_close`：

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

`menu.isOpen(player)` 表示玩家是否打開了插件的選單。

[`menu` 範例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/menu.zig)包含 `/colors` 和帶自由欄位的 `/trash` 選單。

## 帶頁面的倉庫

[倉庫範例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/vault.zig)結合了選單、設定和玩家資料。`/vault` 開啟第一頁，`/vault <page>` 開啟指定編號的頁面，從 1 開始。每頁有 45 個儲存欄位，底行鎖定用於導航。

**All pages** 會開啟選擇器，顯示每頁已佔用的欄位數量和總容量。可以直接選擇頁面，也可以使用 Previous、Next 和 Back。終界箱按鈕會在儲存目前倉庫頁面後開啟玩家的終界箱。

插件會建立 `plugins/data/example-vault/config.toml`：

```toml
pages = 5
```

將 `pages` 設定為 1 至 45，並重啟插件以應用。五頁提供 225 個欄位；45 頁提供 2,025 個欄位。降低該設定後，較高頁面上已佔用的欄位仍可存取，直到清空。現有倉庫檔案仍可繼續使用。

範例會在構建下一個檢視前以及關閉時儲存目前頁面。其 JSON 物品編碼屬於該範例，而不是 `menu` 或 `item.copy` 的一部分。[玩家資料](./player-data)介紹了儲存的儲存間隔和檔案行為。
