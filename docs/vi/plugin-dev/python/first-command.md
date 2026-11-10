# Tạo Lệnh Đầu Tiên

Việc đăng ký và xử lý các lệnh tùy chỉnh trong Pumpkin bằng Python được thiết kế đơn giản và dễ hiểu.

---

## 1. Ví dụ nhanh

Đây là một plugin Python hoàn chỉnh và tối giản (`main.py`) đăng ký lệnh `/hello` với kiểm tra quyền và gửi phản hồi lại cho người chơi.

```python [main.py]
from pumpkin_api import (
    Plugin, PluginMetadata, register_plugin,
    permission, command, context, server
)

class HelloCommand:
    def handle(self, sender: command.CommandSender, srv: server.Server, args: command.ConsumedArgs) -> int:
        sender.send_message("Hello from Python Plugin!")
        return 1

class MyPlugin(Plugin):
    def metadata(self) -> PluginMetadata:
        return PluginMetadata(
            name="my_python_plugin",
            version="0.1.0",
            authors=["Developer"],
            description="My first Pumpkin Python plugin"
        )

    def on_load(self, ctx: context.Context) -> None:
        # 1. Register permission node
        ctx.register_permission(permission.Permission(
            node="my_python_plugin:hello",
            description="Allows executing the /hello command",
            default=permission.PermissionDefault.ALLOW,
            children=[]
        ))

        # 2. Build the command tree with aliases & executor
        cmd = command.Command(["hello", "hi"], "Greets the player")
        cmd.execute(HelloCommand())

        # 3. Register the command
        ctx.register_command(cmd, "my_python_plugin:hello")

register_plugin(MyPlugin)
```

---

## 2. Xem trước trong game

Sau khi đăng ký, lệnh của bạn sẽ tự động có tính năng tự động hoàn thành ở phía client, xác thực cú pháp và tô màu trong Minecraft:

<img src="/assets/first_command_preview.png" alt="Xem trước tự động hoàn thành lệnh trong game" width="500"/>

---

## 3. Cách hoạt động

::: details Phân tích từng bước

### Bước 1: Định nghĩa quyền
Các lệnh trong Pumpkin yêu cầu một node quyền. Đăng ký nó với `permission.PermissionDefault.ALLOW` để cho phép thực thi theo mặc định:

```python
ctx.register_permission(permission.Permission(
    node="my_python_plugin:hello",
    description="Allows executing the /hello command",
    default=permission.PermissionDefault.ALLOW,
    children=[]
))
```

### Bước 2: Xây dựng cây lệnh
Tạo một instance `command.Command` với tên chính và các bí danh, sau đó gắn handler của bạn với `.execute(...)`:

```python
cmd = command.Command(["hello", "hi"], "Greets the player")
cmd.execute(HelloCommand())
```

### Bước 3: Đăng ký với Context
Truyền cây lệnh và chuỗi node quyền cho `ctx.register_command`:

```python
ctx.register_command(cmd, "my_python_plugin:hello")
```

:::

---

## Các bước tiếp theo

- Xem [Sự kiện](./events) để xử lý hành động của người chơi và sự kiện máy chủ bằng Python.
- Tìm hiểu thêm về [Logic cơ bản](./basic-logic).
