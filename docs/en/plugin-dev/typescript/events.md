# Events

Events allow your TypeScript plugin to respond to actions occurring on the server, such as players joining, leaving, or chatting.

## Registering an Event

You can register an event handler inside the `onLoad` method of your plugin using `this.registerEvent`.

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

        // Custom welcome message
        evt.joinMessage = TextComponent.text(`Welcome ${evt.player.getName()} to the server!`);
        return evt;
      },
    );
  }
}

registerPlugin(new EventPlugin());

export * from "@pumpkinmc/pumpkin-api-ts";
```

## Event Handlers

An event handler is a callback function that receives the `Server` instance and the typed event data:

```typescript
(server: Server, eventData: T) => T | void
```

- When the handler is blocking, returning the event data applies modifications back to the server.
- To cancel an event that supports cancellation, set `evt.cancelled = true`.

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

## Priorities and Blocking

`this.registerEvent` takes optional priority and blocking parameters:

```typescript
this.registerEvent(ctx, eventType, handler, priority, blocking);
```

- **`priority`**: `'lowest' | 'low' | 'normal' | 'high' | 'highest'`. Determines execution order relative to other plugin handlers (default: `'normal'`).
- **`blocking`**: When `true` (default), the server waits for your handler and applies modifications returned from the event. When `false`, the handler executes without blocking the server pipeline, and returned changes are ignored.

## Common Event Types

Common events available under `EventType` include:

- `'player-join-event'`
- `'player-leave-event'`
- `'player-chat-event'`
- `'player-move-event'`
- `'player-teleport-event'`
- `'block-break-event'`
- `'block-place-event'`
- `'server-list-ping-event'`
