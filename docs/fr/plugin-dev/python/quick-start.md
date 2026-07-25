# Quick Start

This guide will help you get started with writing Pumpkin server plugins using Python.

## Installation

First, you need to install the `pumpkin-api-py` library:

```bash
pip install pumpkin-api-py
```

## Creating your first plugin

Create a file named `main.py` and add the following content:

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

## Building the plugin

Build your plugin into a WebAssembly component using the provided build tool:

```bash
pumpkin-api-build main -o my_plugin.wasm
```

This will generate a `my_plugin.wasm` file that you can place in the `plugins` folder of your Pumpkin server.
