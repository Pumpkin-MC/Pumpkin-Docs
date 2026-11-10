# Sự kiện

Sự kiện cho phép plugin của bạn phản hồi các hành động xảy ra trên máy chủ, chẳng hạn như người chơi tham gia hoặc tin nhắn được gửi.

## Đăng ký sự kiện

Bạn có thể đăng ký một trình xử lý sự kiện trong phương thức `on_load` của plugin bằng `self.register_event`.

```python
def on_load(self, ctx: context.Context) -> None:
    self.register_event(ctx, event.EventType.PLAYER_JOIN_EVENT, self.on_player_join)
```

## Trình xử lý sự kiện

Trình xử lý sự kiện là một phương thức nhận instance máy chủ và dữ liệu sự kiện. Nó sẽ trả về dữ liệu sự kiện (có thể đã được sửa đổi).

```python
def on_player_join(self, srv: server.Server, evt: event.PlayerJoinEventData) -> event.PlayerJoinEventData:
    print(f"Player {evt.player.get_name()} joined!")
    return evt
```

## Các loại sự kiện

Enum `event.EventType` chứa tất cả các sự kiện có sẵn. Một số sự kiện phổ biến bao gồm:

- `PLAYER_JOIN_EVENT`
- `PLAYER_QUIT_EVENT`
- `PLAYER_CHAT_EVENT`
