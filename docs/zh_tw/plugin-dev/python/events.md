# 事件

事件讓插件能夠回應伺服器上發生的操作，例如玩家加入或傳送訊息。

## 註冊事件

你可以在插件的 `on_load` 方法中使用 `self.register_event` 註冊事件處理器。

```python
def on_load(self, ctx: context.Context) -> None:
    self.register_event(ctx, event.EventType.PLAYER_JOIN_EVENT, self.on_player_join)
```

## 事件處理器

事件處理器是接收伺服器實例和事件資料的方法。它應返回（可能經過修改的）事件資料。

```python
def on_player_join(self, srv: server.Server, evt: event.PlayerJoinEventData) -> event.PlayerJoinEventData:
    print(f"Player {evt.player.get_name()} joined!")
    return evt
```

## 事件型別

`event.EventType` 列舉包含所有可用事件。一些常見事件包括：

- `PLAYER_JOIN_EVENT`
- `PLAYER_QUIT_EVENT`
- `PLAYER_CHAT_EVENT`
