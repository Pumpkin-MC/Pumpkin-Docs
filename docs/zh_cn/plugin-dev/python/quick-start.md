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
            name="我的插件",
            version="0.1.0",
            authors=["you"],
            description="一个示例插件。"
        )

    def on_load(self, ctx: context.Context) -> None:
        print("Python 插件已加载！")
        
        # 注册一个事件处理器
        self.register_event(ctx, event.EventType.PLAYER_JOIN_EVENT, self.on_player_join)

    def on_player_join(self, srv: server.Server, evt: event.PlayerJoinEventData) -> event.PlayerJoinEventData:
        print(f"玩家 {evt.player.get_name()} 加入了游戏！")
        return evt

register_plugin(MyPlugin)
```

## 构建插件

使用提供的构建工具将您的插件构建成一个 WebAssembly 组件：

```bash
pumpkin-api-build main -o my_plugin.wasm
```

这将生成一个 `my_plugin.wasm` 文件，您可以将其放置在 Pumpkin 服务器的 `plugins` 文件夹中。
