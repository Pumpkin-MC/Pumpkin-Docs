# 物品

`pumpkin.item` 可以通过结构体字面量构建物品堆叠，在之后识别插件自己的物品，并向玩家给予或收取物品。

## 构建物品

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

只有 `id` 是必需的。`item.Spec` 的字段如下：

| 字段 | 设置内容 |
| --- | --- |
| `id`、`count` | 物品及其数量。除非另行设置，否则 `count` 为 1。 |
| `name` | 由[文本片段](./text)组成的名称。与原版自定义名称不同，除非设置 `italic`，否则不会使用斜体。 |
| `lore` | 名称下方的描述行，每行是一组片段。 |
| `italic` | 名称和描述的默认样式，除非设置，否则为 `false`。片段上显式指定的样式优先。 |
| `enchants` | 附魔及其等级，例如 `.{ .sharpness, 5 }`。 |
| `custom_enchants` | 按 ID 指定的数据包附魔。 |
| `modifiers` | 属性修饰符。除非另行设置，否则 `operation` 为 `.add`，`slot` 为 `.main_hand`。当多个修饰符影响同一属性时，请设置 `id`。 |
| `unbreakable` | 物品是否永不损失耐久度。 |
| `glint` | 让物品像被附魔一样闪烁。 |
| `rarity` | `.common`、`.uncommon`、`.rare` 或 `.epic`，用于确定名称颜色。 |
| `max_stack_size` | 一个槽位可以容纳的数量。 |
| `max_damage`、`damage` | 物品的耐久度，以及已消耗的耐久度。 |
| `custom_model_data` | 资源包用来选择模型的数字。 |
| `data` | 插件存储在物品上的值，见下文。 |

菜单图标也是 `item.Spec`，因此[菜单](./menus)按钮可以显示 `build` 能构建的任何内容。没有 `id` 的修饰符会使用 `<plugin>:<attribute>`；ID 相同的修饰符会相互替换。

## 识别自己的物品

`data` 中的值会以插件的名称为命名空间存储在物品上，因此不会与其他插件冲突。它们可以是字符串、整数、浮点数或布尔值，并且无论物品到哪里都会保留。插件正是借此将自己的物品与 ID 相同的原版物品区分开来：

```zig
fn onInteract(_: pumpkin.Server, ev: *pumpkin.EventData(.player_interact_event)) void {
    if (ev.action != .right_click_air and ev.action != .right_click_block) return;
    const held = item.held(ev.player) orelse return;
    if (!item.is(held, "id", "excalibur")) return;
    ev.player.setHealth(ev.player.getMaxHealth());
}
```

`item.held(player)` 返回玩家主手中的物品。`item.is(stack, key, value)` 检查字符串值，`item.get(stack, key)` 以 `item.Value` 形式返回任意存储值，`item.set(stack, key, value)` 则存储一个值。

`item.setIn(stack, namespace, key, value)` 和 `item.getIn(stack, namespace, key)` 使用显式命名空间，而不是插件名称。可用它们处理与其他插件共享的数据。

## 修改物品

`item.edit` 接受与 `build` 相同类型的字面量，但只修改给出的字段，保留其他所有内容：

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

从物品栏取出的物品是副本，因此修改后要将其放回去。`item.editHeld(player, changes)` 会为主手中的物品完成这两步。

`edit` 有一些 `build` 没有的字段。`lore` 替换整段描述，`add_lore` 在其后追加行。等级为 0 的附魔会被移除。`remove_modifiers` 移除指定属性的修饰符，`remove_data` 移除指定键的存储值。`.damage = 0` 会修复物品。

读取物品时，`item.enchantLevel` 和 `item.customEnchantLevel` 返回附魔等级，没有该附魔时返回 0。`item.damage` 返回已消耗的耐久度。`item.maxDamage` 返回通过 `max_damage` 设置的耐久度；对于保留默认耐久度的物品，则返回 `null`。

## 给予和收取

```zig
const left = item.give(player, item.build(.{ .id = "minecraft:bread", .count = 100 }));
if (left > 0) sender.sendMessage(msg.fmt(.yellow, "{d} bread didn't fit.", .{left}));

if (!item.take(player, .{ .id = "minecraft:bread" }, 5)) return cmd.fail("you need 5 bread");
```

`item.give` 按与原版 `/give` 相同的顺序将物品放入玩家物品栏：先补充主手、副手和物品栏其余位置中相同物品的堆叠，再填充空槽位，快捷栏优先。超过堆叠上限的数量会分散到多个槽位。它会消耗提供的物品堆叠，并返回无法放入的物品数量。该结果是数量，而不是物品句柄；剩余物品不会掉落，也不会作为物品堆叠返回。如果插件需要返还剩余物品，请保留独立的副本。

`item.room(player, stack)` 计算物品栏和副手中可放入匹配物品的容量。在 0.2.0 中，它也会将空的副手计入，而 `give` 只会补充已占用且物品匹配的副手堆叠。因此，其结果可能高估 `give` 实际能放入的数量，不能保证一笔完整交易所需的物品都能容纳。

`item.take(player, match, amount)` 按与原版 `/clear` 相同的顺序收取物品。如果玩家拥有的数量少于 `amount`，它不会收取任何物品并返回 `false`，因此不会让交易只完成一半。`item.count(player, match)` 计算匹配物品的数量，`item.has(player, match, amount)` 检查是否至少有 `amount` 个。

`match` 可以按 ID 选择物品，如 `.{ .id = "minecraft:bread" }`，也可以按存储值选择，如 `.{ .data = .{ .key = "id", .value = .{ .string = "excalibur" } } }`。ID 可以带 `minecraft:` 命名空间，也可以不带。

## 直接使用物品 API

`build` 返回 `pumpkin.item.ItemStack`，即插件 API 的物品句柄。它的方法（例如 `getRegistryKey`、`getCount`、`getEnchantments` 和 `getLore`）可用于来自任何位置的物品堆叠，包括事件和物品栏。

`item.copy(stack)` 创建副本，并通过其类型化 API 保留自定义名称、描述和属性修饰符。`item.canStack(a, b)` 检查两个物品堆叠的物品 ID 和组件是否匹配。这两个函数都不会将物品存储到文件中。

[`items` 示例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/items.zig)综合运用了上述所有功能：一把可以识别和升级的剑、分散到多个槽位的面包，以及一笔交易。

## 设置物品数据样式与共享物品数据

在规范上设置 `italic`，为名称和描述指定默认值，并使用片段样式进行单独覆盖。当两个加成影响同一属性时，请为修饰符指定不同的 ID：

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

`item.edit` 中的 `remove_modifiers` 会移除所请求属性的每个修饰符，包括其他插件写入的 ID。显式 ID 可避免添加修饰符时发生替换冲突，但不会缩小该移除操作的范围。

若要编辑一个副本而不影响另一个，请调用 `item.copy(original)`，编辑返回的物品堆叠，再将该副本放入目标物品栏。仅复制 Zig 句柄值并不会创建新的物品堆叠。[句柄与内存](./memory)介绍了资源所有权和已消耗的句柄。
