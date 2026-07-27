# Sự kiện

Sự kiện cho phép plugin của bạn phản hồi lại các hành động xảy ra trên máy chủ, chẳng hạn như khi người chơi tham gia hoặc tin nhắn được gửi đi.

## Đăng ký một Sự kiện

Bạn có thể đăng ký trình xử lý sự kiện trong phương thức `on_load` của plugin bằng cách sử dụng `self.register_event`.

```python
def on_load(self, ctx: context.Context) -> None:
    self.register_event(ctx, event.EventType.PLAYER_JOIN_EVENT, self.on_player_join)
```

## Trình xử lý Sự kiện

Trình xử lý sự kiện (event handler) là một phương thức nhận instance của máy chủ và dữ liệu sự kiện. Phương thức này nên trả về dữ liệu sự kiện (có thể đã được chỉnh sửa).

```python
def on_player_join(self, srv: server.Server, evt: event.PlayerJoinEventData) -> event.PlayerJoinEventData:
    print(f"Player {evt.player.get_name()} joined!")
    return evt
```

## Các loại Sự kiện

Enum `event.EventType` chứa tất cả các sự kiện hiện có. Một số sự kiện phổ biến bao gồm:

- `PLAYER_JOIN_EVENT`
- `PLAYER_QUIT_EVENT`
- `PLAYER_CHAT_EVENT`