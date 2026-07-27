# Logic cơ bản

Phần này trình bày cấu trúc cơ bản của một plugin Pumpkin trong Python.

## Class Plugin

Mỗi plugin Python phải kế thừa từ class `Plugin`. Class này cung cấp cấu trúc cơ bản và các phương thức cần thiết để máy chủ tương tác với plugin của bạn.

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

## Metadata của Plugin

Phương thức `metadata` phải trả về một đối tượng `PluginMetadata`, chứa thông tin về plugin của bạn.

- `name`: Tên của plugin.
- `version`: Phiên bản của plugin.
- `authors`: Danh sách tác giả.
- `description`: Mô tả ngắn gọn về chức năng của plugin.

## Tải và Hủy tải

- `on_load`: Phương thức này được gọi khi máy chủ tải plugin của bạn. Bạn nên sử dụng phương thức này để đăng ký các sự kiện, câu lệnh và thực hiện mọi công việc khởi tạo.
- `on_unload`: Phương thức này được gọi khi máy chủ hủy tải plugin của bạn. Sử dụng phương thức này để dọn dẹp nếu cần thiết.