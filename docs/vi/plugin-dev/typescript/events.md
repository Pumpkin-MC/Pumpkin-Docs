# Sự kiện

Sự kiện cho phép plugin TypeScript của bạn phản hồi các hành động xảy ra trên máy chủ, chẳng hạn như người chơi tham gia, rời đi hoặc trò chuyện.

## Đăng ký một sự kiện

Bạn có thể đăng ký một event handler bên trong phương thức `onLoad` của plugin bằng `this.registerEvent`.

```typescript
import { Plugin, registerPlugin } from "@pumpkinmc/pumpkin-api-ts";
import { Context } from "pumpkin:plugin/context@0.1.0";
import { PlayerJoinEventData } from "pumpkin:plugin/event@0.1.0";
import { TextComponent } from "pumpkin:plugin/text@0.1.0";
import * as logging from "pumpkin:plugin/logging@0.1.0";

class EventPlugin extends Plugin {
  metadata() {
    return {
      name: "event-plugin",
      version: "0.1.0",
      authors: ["Developer"],
      description: "Event handling example",
      dependencies: [],
      permissions: [],
    };
  }

  onLoad(ctx: Context): void {
    super.onLoad(ctx);

    this.registerEvent(
      ctx,
      "player-join-event",
      (_server, evt: PlayerJoinEventData) => {
        logging.log("info", `Player ${evt.player.getName()} joined!`);

        // Thông điệp chào mừng tùy chỉnh
        evt.joinMessage = TextComponent.text(`Welcome ${evt.player.getName()} to the server!`);
        return evt;
      },
    );
  }
}

registerPlugin(new EventPlugin());

export * from "@pumpkinmc/pumpkin-api-ts";
```

## Các event handler

Một event handler là một hàm callback nhận instance `Server` và dữ liệu sự kiện được định kiểu:

```typescript
(server: Server, eventData: T) => T | void
```

- Khi handler đang chặn, việc trả về dữ liệu sự kiện sẽ áp dụng các sửa đổi trở lại máy chủ.
- Để hủy một sự kiện hỗ trợ hủy, hãy đặt `evt.cancelled = true`.

```typescript
import { PlayerChatEventData } from "pumpkin:plugin/event@0.1.0";

this.registerEvent(
  ctx,
  "player-chat-event",
  (_server, evt: PlayerChatEventData) => {
    if (evt.message.startsWith("!badword")) {
      evt.cancelled = true;
      evt.player.sendMessage(TextComponent.text("That phrase is not allowed!"));
    }
    return evt;
  },
);
```

## Độ ưu tiên và chặn

`this.registerEvent` nhận các tham số tùy chọn về độ ưu tiên và chặn:

```typescript
this.registerEvent(ctx, eventType, handler, priority, blocking);
```

- **`priority`**: `'lowest' | 'low' | 'normal' | 'high' | 'highest'`. Xác định thứ tự thực thi so với các handler plugin khác (mặc định: `'normal'`).
- **`blocking`**: Khi `true` (mặc định), máy chủ chờ handler của bạn và áp dụng các sửa đổi được trả về từ sự kiện. Khi `false`, handler thực thi mà không chặn pipeline của máy chủ và các thay đổi được trả về bị bỏ qua.

## Các loại sự kiện phổ biến

Các sự kiện phổ biến có sẵn dưới `EventType` bao gồm:

- `'player-join-event'`
- `'player-leave-event'`
- `'player-chat-event'`
- `'player-move-event'`
- `'player-teleport-event'`
- `'block-break-event'`
- `'block-place-event'`
- `'server-list-ping-event'`
