# 事件

事件允许您的插件响应服务器上发生的各种动作，例如玩家加入或消息发送。

## 注册事件

您可以在插件的 `on_load` 方法中使用 `self.register_event` 来注册事件处理器。

```python
def on_load(self, ctx: context.Context) -> None:
    self.register_event(ctx, event.EventType.PLAYER_JOIN_EVENT, self.on_player_join)
```

## 事件处理器

事件处理器是一个接收服务器实例和事件数据的方法，它应返回（可能经过修改后的）事件数据。

```python
def on_player_join(self, srv: server.Server, evt: event.PlayerJoinEventData) -> event.PlayerJoinEventData:
    print(f"Player {evt.player.get_name()} joined!")
    return evt
```

## 事件类型

`event.EventType` 枚举包含了所有可用的事件。一些常见的事件包括：

- `PLAYER_JOIN_EVENT`
- `PLAYER_QUIT_EVENT`
- `PLAYER_CHAT_EVENT`
