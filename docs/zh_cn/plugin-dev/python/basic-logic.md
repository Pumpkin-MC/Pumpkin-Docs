# 基本逻辑

本节介绍 Python Pumpkin 插件的基本结构。

## 插件类

每个 Python 插件都必须继承 `Plugin` 类。该类提供服务器与插件交互所需的基础结构和方法。

```python
from pumpkin_api import Plugin, PluginMetadata, context

class MyPlugin(Plugin):
    def metadata(self) -> PluginMetadata:
        # 在此处定义插件元数据
        pass

    def on_load(self, ctx: context.Context) -> None:
        # 插件加载时要运行的代码
        pass

    def on_unload(self, ctx: context.Context) -> None:
        # 插件卸载时要运行的代码
        pass
```

## 插件元数据

`metadata` 方法必须返回一个 `PluginMetadata` 对象，其中包含插件的相关信息。

- `name`：插件的名称。
- `version`：插件的版本。
- `authors`：作者列表。
- `description`：插件功能的简短描述。

## 加载与卸载

- `on_load`：服务器加载插件时调用此方法。您应使用此方法注册事件和命令，并执行所有初始化操作。
- `on_unload`：服务器卸载插件时调用此方法。如有必要，可使用此方法进行清理。
