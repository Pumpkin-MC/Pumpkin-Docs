# 物品

`pumpkin.item` 可以透過結構常值建構物品堆疊，在之後識別插件自己的物品，並向玩家給予或收取物品。

## 建構物品

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

只有 `id` 是必需的。`item.Spec` 的欄位如下：

| 欄位 | 設定內容 |
| --- | --- |
| `id`、`count` | 物品及其數量。除非另行設定，否則 `count` 為 1。 |
| `name` | 由[文字片段](./text)組成的名稱。與原版自訂名稱不同，除非設定 `italic`，否則不會使用斜體。 |
| `lore` | 名稱下方的描述行，每行是一組片段。 |
| `italic` | 名稱和描述的預設樣式，除非設定，否則為 `false`。片段上顯式指定的樣式優先。 |
| `enchants` | 附魔及其等級，例如 `.{ .sharpness, 5 }`。 |
| `custom_enchants` | 按 ID 指定的資料包附魔。 |
| `modifiers` | 屬性修飾符。除非另行設定，否則 `operation` 為 `.add`，`slot` 為 `.main_hand`。當多個修飾符影響同一屬性時，請設定 `id`。 |
| `unbreakable` | 物品是否永不損失耐久度。 |
| `glint` | 讓物品像被附魔一樣閃爍。 |
| `rarity` | `.common`、`.uncommon`、`.rare` 或 `.epic`，用於確定名稱顏色。 |
| `max_stack_size` | 一個欄位可以容納的數量。 |
| `max_damage`、`damage` | 物品的耐久度，以及已消耗的耐久度。 |
| `custom_model_data` | 資源包用來選擇模型的數字。 |
| `data` | 插件儲存在物品上的值，見下文。 |

選單圖示也是 `item.Spec`，因此[選單](./menus)按鈕可以顯示 `build` 能建構的任何內容。沒有 `id` 的修飾符會使用 `<plugin>:<attribute>`；ID 相同的修飾符會相互替換。

## 識別自己的物品

`data` 中的值會以插件的名稱為名稱空間儲存在物品上，因此不會與其他插件衝突。它們可以是字串、整數、浮點數或布林值，並且無論物品到哪裡都會保留。插件正是藉此將自己的物品與 ID 相同的原版物品區分開來：

```zig
fn onInteract(_: pumpkin.Server, ev: *pumpkin.EventData(.player_interact_event)) void {
    if (ev.action != .right_click_air and ev.action != .right_click_block) return;
    const held = item.held(ev.player) orelse return;
    if (!item.is(held, "id", "excalibur")) return;
    ev.player.setHealth(ev.player.getMaxHealth());
}
```

`item.held(player)` 返回玩家主手中的物品。`item.is(stack, key, value)` 檢查字串值，`item.get(stack, key)` 以 `item.Value` 形式返回任意儲存值，`item.set(stack, key, value)` 則儲存一個值。

`item.setIn(stack, namespace, key, value)` 和 `item.getIn(stack, namespace, key)` 使用顯式名稱空間，而不是插件名稱。可用它們處理與其他插件共享的資料。

## 修改物品

`item.edit` 接受與 `build` 相同型別的常值，但只修改給出的欄位，保留其他所有內容：

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

從物品欄取出的物品是副本，因此修改後要將其放回去。`item.editHeld(player, changes)` 會為主手中的物品完成這兩步。

`edit` 有一些 `build` 沒有的欄位。`lore` 替換整段描述，`add_lore` 在其後追加行。等級為 0 的附魔會被移除。`remove_modifiers` 移除指定屬性的修飾符，`remove_data` 移除指定鍵的儲存值。`.damage = 0` 會修復物品。

讀取物品時，`item.enchantLevel` 和 `item.customEnchantLevel` 返回附魔等級，沒有該附魔時返回 0。`item.damage` 返回已消耗的耐久度。`item.maxDamage` 返回透過 `max_damage` 設定的耐久度；對於保留預設耐久度的物品，則返回 `null`。

## 給予和收取

```zig
const left = item.give(player, item.build(.{ .id = "minecraft:bread", .count = 100 }));
if (left > 0) sender.sendMessage(msg.fmt(.yellow, "{d} bread didn't fit.", .{left}));

if (!item.take(player, .{ .id = "minecraft:bread" }, 5)) return cmd.fail("you need 5 bread");
```

`item.give` 按與原版 `/give` 相同的順序將物品放入玩家物品欄：先補充主手、副手和物品欄其餘位置中相同物品的堆疊，再填充空欄位，快捷欄優先。超過堆疊上限的數量會分散到多個欄位。它會消耗提供的物品堆疊，並返回無法放入的物品數量。該結果是數量，而不是物品控制代碼；剩餘物品不會掉落，也不會作為物品堆疊返回。如果插件需要返還剩餘物品，請保留獨立的副本。

`item.room(player, stack)` 計算物品欄和副手中可放入匹配物品的容量。在 0.2.0 中，它也會將空的副手計入，而 `give` 只會補充已佔用且物品匹配的副手堆疊。因此，其結果可能高估 `give` 實際能放入的數量，不能保證一筆完整交易所需的物品都能容納。

`item.take(player, match, amount)` 按與原版 `/clear` 相同的順序收取物品。如果玩家擁有的數量少於 `amount`，它不會收取任何物品並返回 `false`，因此不會讓交易只完成一半。`item.count(player, match)` 計算匹配物品的數量，`item.has(player, match, amount)` 檢查是否至少有 `amount` 個。

`match` 可以按 ID 選擇物品，如 `.{ .id = "minecraft:bread" }`，也可以按儲存值選擇，如 `.{ .data = .{ .key = "id", .value = .{ .string = "excalibur" } } }`。ID 可以帶 `minecraft:` 名稱空間，也可以不帶。

## 直接使用物品 API

`build` 返回 `pumpkin.item.ItemStack`，即插件 API 的物品控制代碼。它的方法（例如 `getRegistryKey`、`getCount`、`getEnchantments` 和 `getLore`）可用於來自任何位置的物品堆疊，包括事件和物品欄。

`item.copy(stack)` 建立副本，並透過其型別化 API 保留自訂名稱、描述和屬性修飾符。`item.canStack(a, b)` 檢查兩個物品堆疊的物品 ID 和元件是否匹配。這兩個函式都不會將物品儲存到檔案中。

[`items` 範例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/items.zig)綜合運用了上述所有功能：一把可以識別和升級的劍、分散到多個欄位的麵包，以及一筆交易。

## 設定物品資料樣式與共享物品資料

在規範上設定 `italic`，為名稱和描述指定預設值，並使用片段樣式進行單獨覆蓋。當兩個加成影響同一屬性時，請為修飾符指定不同的 ID：

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

`item.edit` 中的 `remove_modifiers` 會移除所請求屬性的每個修飾符，包括其他插件寫入的 ID。顯式 ID 可避免新增修飾符時發生替換衝突，但不會縮小該移除操作的範圍。

若要編輯一個副本而不影響另一個，請呼叫 `item.copy(original)`，編輯返回的物品堆疊，再將該副本放入目標物品欄。僅複製 Zig 控制代碼值並不會建立新的物品堆疊。[控制代碼與記憶體](./memory)介紹了資源所有權和已消耗的控制代碼。
