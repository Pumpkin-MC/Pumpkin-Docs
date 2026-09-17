# Events

Events allow your plugin to respond to actions occurring on the server, such as players joining or messages being sent.

## Registering an Event

You can register an event handler in the `on_load` method of your plugin using `self.register_event`.

```python
def on_load(self, ctx: context.Context) -> None:
    self.register_event(ctx, event.EventType.PLAYER_JOIN_EVENT, self.on_player_join)
```

## Event Handlers

An event handler is a method that receives the server instance and the event data. It should return the (possibly modified) event data.

```python
def on_player_join(self, srv: server.Server, evt: event.PlayerJoinEventData) -> event.PlayerJoinEventData:
    print(f"Player {evt.player.get_name()} joined!")
    return evt
```

## Event Types

The `event.EventType` enum contains all available events. Some common events include:

- `PLAYER_JOIN_EVENT`
- `PLAYER_QUIT_EVENT`
- `PLAYER_CHAT_EVENT`
