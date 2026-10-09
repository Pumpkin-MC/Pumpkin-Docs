# Text

Chat messages, titles, item names and menu titles are all text components. `pumpkin.msg` builds them from struct literals, so even a message with several styles is a single expression.

## Plain and formatted text

```zig
const msg = pumpkin.msg;

player.sendSystemMessage(msg.plain("Hello!"), false);
player.sendSystemMessage(msg.fmt(.gold, "You have {d} coins.", .{coins}), false);
player.sendSystemMessage(msg.fmt(null, "Welcome back, {s}.", .{player.getName()}), false);
```

`msg.plain` makes unstyled text. `msg.fmt` takes a color, a `std.fmt` format string and its arguments. Pass `null` as the color to keep the default.

The second argument of `sendSystemMessage` puts the message above the hotbar instead of in the chat when it is `true`.

## Styled text

`msg.build` joins a list of spans into one component. Each span only sets the styles it needs:

```zig
sender.sendMessage(msg.build(&.{
    .{ .text = "[Shop] ", .color = .gold, .bold = true },
    .{ .text = "Click to open", .underlined = true, .click = .{ .run_command = "/shop" }, .hover = "Opens the shop" },
}));
```

These are the fields a span can set:

| Field | Effect |
| --- | --- |
| `text` | The text itself. |
| `translate` | A translation key such as `"block.minecraft.stone"`, shown in the player's language. It replaces `text`. |
| `color` | One of the 16 named colors: `.black`, `.dark_blue`, `.dark_green`, `.dark_aqua`, `.dark_red`, `.dark_purple`, `.gold`, `.gray`, `.dark_gray`, `.blue`, `.green`, `.aqua`, `.red`, `.light_purple`, `.yellow` and `.white`. |
| `rgb` | Any color, for example `.{ .r = 255, .g = 128, .b = 0 }`. It takes precedence over `color`. |
| `bold`, `italic`, `underlined`, `strikethrough`, `obfuscated` | `true` or `false` to turn the style on or off. |
| `click` | What a click does: `.run_command`, `.suggest_command`, `.open_url`, `.copy` to copy to the clipboard, or `.change_page` in a book. |
| `hover` | Text shown when hovering over the span. |
| `insertion` | Text inserted into the chat box when the span is shift-clicked. |
| `font` | A font from a resource pack. |

Where an API takes a single component, `msg.span` turns one span into one.

## Using components directly

Everything `msg` builds is a `pumpkin.TextComponent`. For what `msg` doesn't cover, such as translations with arguments, the generated `pumpkin.text` interface works on components directly:

```zig
const name = pumpkin.TextComponent.text(player.getName());
const joined = pumpkin.TextComponent.translate("multiplayer.player.joined", &.{name});
joined.colorNamed(.yellow);
```
