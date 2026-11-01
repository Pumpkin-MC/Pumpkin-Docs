# 事件

事件让 TypeScript 插件能够响应服务器上发生的操作，例如玩家加入、离开或聊天。

## 注册事件

你可以在插件的 `onLoad` 方法中使用 `this.registerEvent` 注册事件处理器。

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

        // 自定义欢迎消息
        evt.joinMessage = TextComponent.text(`Welcome ${evt.player.getName()} to the server!`);
        return evt;
      },
    );
  }
}

registerPlugin(new EventPlugin());

export * from "@pumpkinmc/pumpkin-api-ts";
```

## 事件处理器

事件处理器是一个回调函数，接收 `Server` 实例和带类型的事件数据：

```typescript
(server: Server, eventData: T) => T | void
```

- 当处理器处于阻塞模式时，返回事件数据会将修改应用回服务器。
- 要取消支持取消的事件，请设置 `evt.cancelled = true`。

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

## 优先级和阻塞

`this.registerEvent` 接受可选的优先级和阻塞参数：

```typescript
this.registerEvent(ctx, eventType, handler, priority, blocking);
```

- **`priority`**：`'lowest' | 'low' | 'normal' | 'high' | 'highest'`。确定相对于其他插件处理器的执行顺序（默认值：`'normal'`）。
- **`blocking`**：为 `true`（默认值）时，服务器会等待你的处理器，并应用从事件返回的修改。为 `false` 时，处理器执行不会阻塞服务器管线，返回的更改会被忽略。

## 常见事件类型

`EventType` 下可用的常见事件包括：

- `'player-join-event'`
- `'player-leave-event'`
- `'player-chat-event'`
- `'player-move-event'`
- `'player-teleport-event'`
- `'block-break-event'`
- `'block-place-event'`
- `'server-list-ping-event'`
