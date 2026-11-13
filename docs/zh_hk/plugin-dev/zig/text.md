# 文字

聊天訊息、標題、物品名稱和選單標題都是文字符件。`pumpkin.msg` 透過結構常值構建文字符件，因此即使一條訊息包含多種樣式，也只需一個表示式。

## 純文字和格式化文字

```zig
const msg = pumpkin.msg;

player.sendSystemMessage(msg.plain("Hello!"), false);
player.sendSystemMessage(msg.fmt(.gold, "You have {d} coins.", .{coins}), false);
player.sendSystemMessage(msg.fmt(null, "Welcome back, {s}.", .{player.getName()}), false);
```

`msg.plain` 建立不帶樣式的文字。`msg.fmt` 接受顏色、`std.fmt` 格式字符串及其參數。將顏色傳為 `null` 可保留預設顏色。

`sendSystemMessage` 的第二個參數為 `true` 時，會將訊息顯示在快捷欄上方，而不是聊天中。

## 帶樣式的文字

`msg.build` 將一組文字片段連線成一個元件。每個片段只設置自己需要的樣式：

```zig
sender.sendMessage(msg.build(&.{
    .{ .text = "[Shop] ", .color = .gold, .bold = true },
    .{ .text = "Click to open", .underlined = true, .click = .{ .run_command = "/shop" }, .hover = "Opens the shop" },
}));
```

文字片段可以設定以下欄位：

| 欄位 | 效果 |
| --- | --- |
| `text` | 文字本身。 |
| `translate` | 翻譯鍵，例如 `"block.minecraft.stone"`，會以玩家的語言顯示。它會取代 `text`。 |
| `color` | 16 種命名顏色之一：`.black`、`.dark_blue`、`.dark_green`、`.dark_aqua`、`.dark_red`、`.dark_purple`、`.gold`、`.gray`、`.dark_gray`、`.blue`、`.green`、`.aqua`、`.red`、`.light_purple`、`.yellow` 和 `.white`。 |
| `rgb` | 任意顏色，例如 `.{ .r = 255, .g = 128, .b = 0 }`。它優先於 `color`。 |
| `bold`、`italic`、`underlined`、`strikethrough`、`obfuscated` | 用 `true` 或 `false` 開啟或關閉樣式。 |
| `click` | 點選時的行為：`.run_command`、`.suggest_command`、`.open_url`、複製到剪貼簿的 `.copy`，或書本中的 `.change_page`。 |
| `hover` | 滑鼠懸停在片段上時顯示的文字。 |
| `insertion` | 按住 Shift 點選片段時插入聊天輸入框的文字。 |
| `font` | 來自資源包的字體。 |

當 API 只接受單個元件時，可以用 `msg.span` 將一個片段轉換為元件。

## 直接使用元件

`msg` 構建的所有內容都是 `pumpkin.TextComponent`。對於 `msg` 未涵蓋的功能，例如帶參數的翻譯，生成的 `pumpkin.text` 界面可以直接操作元件：

```zig
const name = pumpkin.TextComponent.text(player.getName());
const joined = pumpkin.TextComponent.translate("multiplayer.player.joined", &.{name});
joined.colorNamed(.yellow);
```

[`hello` 範例](https://github.com/Pumpkin-MC/pumpkin-api-zig/blob/v0.2.0/examples/hello.zig)構建了一條帶樣式的加入訊息。

## 物品、選單和提示中的樣式

省略的樣式為 `null`，表示交由父元件決定。將樣式顯式設定為 `false` 會將其關閉。透過 `item.Spec` 構建的物品和選單圖示，其名稱和描述預設不使用斜體；可以設定規範的 `italic` 欄位來更改這一預設值，或在特定片段上覆蓋它：

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

[提示](./prompts)在問題、驗證訊息和選項標籤中使用相同的片段。選項會提供自己的指令點選行為；其標籤的顏色、樣式和懸停文字仍會保留。

`Span.hover` 是純文字。若需要帶樣式的懸停文字，請直接構建元件並調用 `component.hoverShowText(msg.build(spans))`。`.click = .{ .copy = "text" }` 行為會將文字複製到玩家的剪貼簿；它不會克隆元件。

`TextComponent.toJson()` 返回在目前回調期間有效的 JSON 文字，`TextComponent.fromJson(json)` 返回 `.ok` 元件或 `.err` 訊息。若要在另一個回調中保留序列化文字，請先將其複製到[自有記憶體](./memory)中。
