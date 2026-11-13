# 快速入门

本指南将帮助您开始使用 Python 编写 Pumpkin 服务器插件。

## 安装

首先，您需要安装 `pumpkin-api-py` 库：

```bash
pip install pumpkin-api-py
```

## 创建您的第一个插件

创建一个名为 `main.py` 的文件，并添加以下内容：

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
        
        # 注册事件处理器
        self.register_event(ctx, event.EventType.PLAYER_JOIN_EVENT, self.on_player_join)

    def on_player_join(self, srv: server.Server, evt: event.PlayerJoinEventData) -> event.PlayerJoinEventData:
        print(f"Player {evt.player.get_name()} joined!")
        return evt

register_plugin(MyPlugin)
```

## 构建插件

使用提供的构建工具将插件构建为 WebAssembly 组件：

```bash
pumpkin-plugin-build main -o my_plugin.wasm
```

这将生成一个 `my_plugin.wasm` 文件，您可以将其放入 Pumpkin 服务器的 `plugins` 文件夹中。
