# Items

`pumpkin.item` builds item stacks from struct literals, recognizes the plugin's own items later, and gives items to players or takes them away.

## Building an item

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

Only `id` is required. These are the fields of `item.Spec`:

| Field | Sets |
| --- | --- |
| `id`, `count` | The item and how many there are. `count` is 1 unless you set it. |
| `name` | The name, made of [text spans](./text). Unlike vanilla custom names, it isn't italic unless you set `italic`. |
| `lore` | The lines under the name, one list of spans per line, also not italic. |
| `enchants` | Enchantments and their levels, such as `.{ .sharpness, 5 }`. |
| `custom_enchants` | Enchantments from data packs, by id. |
| `modifiers` | Attribute modifiers. `operation` is `.add` and `slot` is `.main_hand` unless you set them. |
| `unbreakable` | Whether the item never loses durability. |
| `glint` | Makes the item shimmer as if it were enchanted. |
| `rarity` | `.common`, `.uncommon`, `.rare` or `.epic`, which colors the name. |
| `max_stack_size` | How many fit in one slot. |
| `max_damage`, `damage` | The item's durability, and how much of it is used up. |
| `custom_model_data` | A number a resource pack uses to pick a model. |
| `data` | Values the plugin stores on the item, see below. |

Menu icons are `item.Spec`s too, so a [menu](./menus) button can show anything `build` makes.

## Recognizing your items

Values in `data` are stored on the item under the plugin's name, so they can't clash with other plugins. They can be strings, integers, floats or booleans, and stay on the item wherever it goes. They are how a plugin tells its own items apart from vanilla ones with the same id:

```zig
fn onInteract(_: pumpkin.Server, ev: *pumpkin.EventData(.player_interact_event)) void {
    const held = item.held(ev.player) orelse return;
    if (!item.is(held, "id", "excalibur")) return;
    ev.player.setHealth(ev.player.getMaxHealth());
}
```

`item.held(player)` returns the item in the player's main hand. `item.is(stack, key, value)` checks for a string value, `item.get(stack, key)` returns any stored value as an `item.Value`, and `item.set(stack, key, value)` stores one.

## Changing an item

`item.edit` takes the same kind of literal as `build`, but only changes the fields you give it and keeps everything else:

```zig
fn upgrade(sender: cmd.Sender, _: pumpkin.Server, _: cmd.Args) cmd.Result {
    const player = sender.asPlayer() orelse return cmd.fail("only players can upgrade a sword");
    const sword = item.held(player) orelse return cmd.fail("hold the sword to upgrade it");
    const level = item.enchantLevel(sword, .sharpness);
    item.edit(sword, .{ .enchants = &.{.{ .sharpness, level + 1 }} });
    item.setHeld(player, sword);
    return cmd.ok(1);
}
```

An item taken from an inventory is a copy, so after changing it, put it back. `item.editHeld(player, changes)` does both for the item in the main hand.

`edit` has a few fields `build` doesn't. `lore` replaces the whole lore and `add_lore` adds lines after it. An enchantment with level 0 is removed. `remove_modifiers` removes the modifiers of the given attributes, and `remove_data` the stored values with the given keys. `.damage = 0` repairs the item.

To read an item, `item.enchantLevel` and `item.customEnchantLevel` return the level of an enchantment, or 0 without it. `item.damage` returns how much durability is used up. `item.maxDamage` returns the durability set with `max_damage`, and `null` for items that keep their default durability.

## Giving and taking

```zig
const left = item.give(player, item.build(.{ .id = "minecraft:bread", .count = 100 }));
if (left > 0) sender.sendMessage(msg.fmt(.yellow, "{d} bread didn't fit.", .{left}));

if (!item.take(player, .{ .id = "minecraft:bread" }, 5)) return cmd.fail("you need 5 bread");
```

`item.give` puts items in the player's inventory in the same order as vanilla's `/give`: it first tops up stacks of the same item in the main hand, the off hand and the rest of the inventory, then fills empty slots, hotbar first. Counts above the stack size are spread over several slots. It returns how many items didn't fit. Those aren't dropped on the ground, so check the result when they matter.

`item.take(player, match, amount)` takes items in the same order as vanilla's `/clear`. If the player has fewer than `amount`, it takes nothing and returns `false`, so it can't leave a trade half done. `item.count(player, match)` counts the matching items, and `item.has(player, match, amount)` checks for at least `amount` of them.

The `match` selects items either by id, as `.{ .id = "minecraft:bread" }`, or by a stored value, as `.{ .data = .{ .key = "id", .value = .{ .string = "excalibur" } } }`. Ids can be written with or without the `minecraft:` namespace.

## Using the item API directly

`build` returns a `pumpkin.item.ItemStack`, the item handle of the plugin API. Its methods, such as `getRegistryKey`, `getCount`, `getEnchantments` and `getLore`, work on stacks from anywhere, including events and inventories.

[The `items` example](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.1.0/examples/items.zig) puts all of this together: a sword it recognizes and upgrades, bread spread over several slots, and a trade.
