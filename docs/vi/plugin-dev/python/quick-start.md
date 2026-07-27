# Bắt đầu nhanh

Hướng dẫn này sẽ giúp bạn bắt đầu viết các plugin cho máy chủ Pumpkin bằng Python.

## Cài đặt

Trước tiên, bạn cần cài đặt thư viện `pumpkin-api-py`:

```bash
pip install pumpkin-api-py
```

## Tạo plugin đầu tiên của bạn

Tạo một tệp có tên `main.py` và thêm nội dung sau:

```python
from pumpkin_api import (
    Plugin, PluginMetadata, register_plugin, 
    server, event, command, text, context
)

class MyPlugin(Plugin):
    def metadata(self) -> PluginMetadata:
        return PluginMetadata(
            name="my-plugin",
            version="0.1.0",
            authors=["you"],
            description="An example plugin."
        )

    def on_load(self, ctx: context.Context) -> None:
        print("Python plugin loaded!")
        
        # Register an event handler
        self.register_event(ctx, event.EventType.PLAYER_JOIN_EVENT, self.on_player_join)

    def on_player_join(self, srv: server.Server, evt: event.PlayerJoinEventData) -> event.PlayerJoinEventData:
        print(f"Player {evt.player.get_name()} joined!")
        return evt

register_plugin(MyPlugin)
```

## Biên dịch plugin

Biên dịch plugin của bạn thành một thành phần WebAssembly bằng công cụ build được cung cấp:

```bash
pumpkin-api-build main -o my_plugin.wasm
```

Lệnh này sẽ tạo ra tệp `my_plugin.wasm` mà bạn có thể đặt vào thư mục `plugins` trên máy chủ Pumpkin của mình.