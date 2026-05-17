# 基础逻辑

本节介绍了 Python 中 Pumpkin 插件的基本结构。

## 插件类（Class）

每个 Python 插件都必须继承自 `Plugin` 类。该类提供了服务器与你的插件进行交互所需的基础结构和相关方法。

```python
from pumpkin_api import Plugin, PluginMetadata, context

class MyPlugin(Plugin):
    def metadata(self) -> PluginMetadata:
        # 在此处定义插件元数据。
        pass

    def on_load(self, ctx: context.Context) -> None:
        # 插件加载时运行的代码。
        pass

    def on_unload(self, ctx: context.Context) -> None:
        # 插件卸载时运行的代码。
        pass
```

## 插件元数据

`metadata` 方法必须返回一个 `PluginMetadata` 对象，其中包含有关您插件的信息。

- `name`: 您的插件名称。
- `version`: 您的插件版本。
- `authors`: 作者列表。
- `description`: 关于您插件功能的简短描述。

## 加载与卸载

- `on_load`: 当服务器加载您的插件时调用此方法。您应在此处注册事件、命令，并执行任何初始化操作。
- `on_unload`: 当服务器卸载您的插件时调用此方法。如有必要，请在此处进行清理工作。
