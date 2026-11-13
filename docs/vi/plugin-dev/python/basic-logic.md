# Logic Cơ Bản

Phần này bao gồm cấu trúc cơ bản của một plugin Pumpkin bằng Python.

## Lớp Plugin

Mọi plugin Python phải kế thừa từ lớp `Plugin`. Lớp này cung cấp cấu trúc và phương thức cơ bản cần thiết để máy chủ tương tác với plugin của bạn.

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

## Thông tin Plugin

Phương thức `metadata` phải trả về một đối tượng `PluginMetadata`, chứa thông tin về plugin của bạn.

- `name`: Tên của plugin.
- `version`: Phiên bản của plugin.
- `authors`: Danh sách các tác giả.
- `description`: Mô tả ngắn về những gì plugin làm.

## Tải và gỡ bỏ

- `on_load`: Phương thức này được gọi khi máy chủ tải plugin của bạn. Bạn nên sử dụng phương thức này để đăng ký sự kiện, lệnh và thực hiện bất kỳ khởi tạo nào.
- `on_unload`: Phương thức này được gọi khi máy chủ gỡ bỏ plugin của bạn. Sử dụng phương thức này để dọn dẹp nếu cần thiết.
