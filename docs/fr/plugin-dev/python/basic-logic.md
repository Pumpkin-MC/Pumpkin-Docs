# Basic Logic

This section covers the basic structure of a Pumpkin plugin in Python.

## Plugin Class

Every Python plugin must inherit from the `Plugin` class. This class provides the base structure and methods needed for the server to interact with your plugin.

```python
from pumpkin_api import Plugin, PluginMetadata, context

class MyPlugin(Plugin):
    def metadata(self) -> PluginMetadata:
        # Define plugin metadata here
        pass

    def on_load(self, ctx: context.Context) -> None:
        # Code to run when the plugin is loaded
        pass

    def on_unload(self, ctx: context.Context) -> None:
        # Code to run when the plugin is unloaded
        pass
```

## Plugin Metadata

The `metadata` method must return a `PluginMetadata` object, which contains information about your plugin.

- `name`: The name of your plugin.
- `version`: The version of your plugin.
- `authors`: A list of authors.
- `description`: A short description of what your plugin does.

## Loading and Unloading

- `on_load`: This method is called when the server loads your plugin. You should use this to register events, commands, and perform any initialization.
- `on_unload`: This method is called when the server unloads your plugin. Use this for cleanup if necessary.
