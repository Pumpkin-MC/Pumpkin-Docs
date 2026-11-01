# 事件

事件讓 TypeScript 插件能夠回應伺服器上發生的操作，例如玩家加入、離開或聊天。

## 註冊事件

你可以在插件的 `onLoad` 方法中使用 `this.registerEvent` 註冊事件處理器。

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

        // 自訂歡迎訊息
        evt.joinMessage = TextComponent.text(`Welcome ${evt.player.getName()} to the server!`);
        return evt;
      },
    );
  }
}

registerPlugin(new EventPlugin());

export * from "@pumpkinmc/pumpkin-api-ts";
```

## 事件處理器

事件處理器是一個回呼函式，接收 `Server` 例項和帶型別的事件資料：

```typescript
(server: Server, eventData: T) => T | void
```

- 當處理器處於阻塞模式時，返回事件資料會將修改應用回伺服器。
- 要取消支援取消的事件，請設定 `evt.cancelled = true`。

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

## 優先順序和阻塞

`this.registerEvent` 接受可選的優先順序和阻塞引數：

```typescript
this.registerEvent(ctx, eventType, handler, priority, blocking);
```

- **`priority`**：`'lowest' | 'low' | 'normal' | 'high' | 'highest'`。確定相對於其他插件處理器的執行順序（預設值：`'normal'`）。
- **`blocking`**：為 `true`（預設值）時，伺服器會等待你的處理器，並應用從事件返回的修改。為 `false` 時，處理器執行不會阻塞伺服器管線，返回的更改會被忽略。

## 常見事件型別

`EventType` 下可用的常見事件包括：

- `'player-join-event'`
- `'player-leave-event'`
- `'player-chat-event'`
- `'player-move-event'`
- `'player-teleport-event'`
- `'block-break-event'`
- `'block-place-event'`
- `'server-list-ping-event'`
