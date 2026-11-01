# 文本

聊天消息、标题、物品名称和菜单标题都是文本组件。`pumpkin.msg` 通过结构体字面量构建文本组件，因此即使一条消息包含多种样式，也只需一个表达式。

## 纯文本和格式化文本

```zig
const msg = pumpkin.msg;

player.sendSystemMessage(msg.plain("Hello!"), false);
player.sendSystemMessage(msg.fmt(.gold, "You have {d} coins.", .{coins}), false);
player.sendSystemMessage(msg.fmt(null, "Welcome back, {s}.", .{player.getName()}), false);
```

`msg.plain` 创建不带样式的文本。`msg.fmt` 接受颜色、`std.fmt` 格式字符串及其参数。将颜色传为 `null` 可保留默认颜色。

`sendSystemMessage` 的第二个参数为 `true` 时，会将消息显示在快捷栏上方，而不是聊天中。

## 带样式的文本

`msg.build` 将一组文本片段连接成一个组件。每个片段只设置自己需要的样式：

```zig
sender.sendMessage(msg.build(&.{
    .{ .text = "[Shop] ", .color = .gold, .bold = true },
    .{ .text = "Click to open", .underlined = true, .click = .{ .run_command = "/shop" }, .hover = "Opens the shop" },
}));
```

文本片段可以设置以下字段：

| 字段 | 效果 |
| --- | --- |
| `text` | 文本本身。 |
| `translate` | 翻译键，例如 `"block.minecraft.stone"`，会以玩家的语言显示。它会取代 `text`。 |
| `color` | 16 种命名颜色之一：`.black`、`.dark_blue`、`.dark_green`、`.dark_aqua`、`.dark_red`、`.dark_purple`、`.gold`、`.gray`、`.dark_gray`、`.blue`、`.green`、`.aqua`、`.red`、`.light_purple`、`.yellow` 和 `.white`。 |
| `rgb` | 任意颜色，例如 `.{ .r = 255, .g = 128, .b = 0 }`。它优先于 `color`。 |
| `bold`、`italic`、`underlined`、`strikethrough`、`obfuscated` | 用 `true` 或 `false` 开启或关闭样式。 |
| `click` | 点击时的行为：`.run_command`、`.suggest_command`、`.open_url`、复制到剪贴板的 `.copy`，或书本中的 `.change_page`。 |
| `hover` | 鼠标悬停在片段上时显示的文本。 |
| `insertion` | 按住 Shift 点击片段时插入聊天输入框的文本。 |
| `font` | 来自资源包的字体。 |

当 API 只接受单个组件时，可以用 `msg.span` 将一个片段转换为组件。

## 直接使用组件

`msg` 构建的所有内容都是 `pumpkin.TextComponent`。对于 `msg` 未涵盖的功能，例如带参数的翻译，生成的 `pumpkin.text` 接口可以直接操作组件：

```zig
const name = pumpkin.TextComponent.text(player.getName());
const joined = pumpkin.TextComponent.translate("multiplayer.player.joined", &.{name});
joined.colorNamed(.yellow);
```

[`hello` 示例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/hello.zig)构建了一条带样式的加入消息。

## 物品、菜单和提示中的样式

省略的样式为 `null`，表示交由父组件决定。将样式显式设置为 `false` 会将其关闭。通过 `item.Spec` 构建的物品和菜单图标，其名称和描述默认不使用斜体；可以设置规范的 `italic` 字段来更改这一默认值，或在特定片段上覆盖它：

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

[提示](./prompts)在问题、验证消息和选项标签中使用相同的片段。选项会提供自己的命令点击行为；其标签的颜色、样式和悬停文本仍会保留。

`Span.hover` 是纯文本。若需要带样式的悬停文本，请直接构建组件并调用 `component.hoverShowText(msg.build(spans))`。`.click = .{ .copy = "text" }` 行为会将文本复制到玩家的剪贴板；它不会克隆组件。

`TextComponent.toJson()` 返回在当前回调期间有效的 JSON 文本，`TextComponent.fromJson(json)` 返回 `.ok` 组件或 `.err` 消息。若要在另一个回调中保留序列化文本，请先将其复制到[自有内存](./memory)中。
