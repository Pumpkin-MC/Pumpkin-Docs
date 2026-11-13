# 基本邏輯

本節介紹 Python Pumpkin 插件的基本結構。

## 插件類

每個 Python 插件都必須繼承 `Plugin` 類。該類提供伺服器與插件互動所需的基礎結構和方法。

```python
from pumpkin_api import Plugin, PluginMetadata, context

class MyPlugin(Plugin):
    def metadata(self) -> PluginMetadata:
        # 在此處定義插件元資料
        pass

    def on_load(self, ctx: context.Context) -> None:
        # 插件載入時要執行的程式碼
        pass

    def on_unload(self, ctx: context.Context) -> None:
        # 插件卸載時要執行的程式碼
        pass
```

## 插件元資料

`metadata` 方法必須返回一個 `PluginMetadata` 物件，其中包含插件的相關資訊。

- `name`：插件的名稱。
- `version`：插件的版本。
- `authors`：作者列表。
- `description`：插件功能的簡短描述。

## 載入與卸載

- `on_load`：伺服器載入插件時調用此方法。你應使用此方法註冊事件和指令，並執行所有初始化操作。
- `on_unload`：伺服器卸載插件時調用此方法。如有必要，可使用此方法進行清理。
