# 创建您的第一个命令

在 Pumpkin 中使用 Python 注册和处理自定义命令的设计简单直观且富有表现力。

---

## 1. 快速示例

下面是一个完整的最小 Python 插件（`main.py`），它注册一个带有权限检查的 `/hello` 命令，并向玩家发送响应。

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
        # 1. 注册权限节点
        ctx.register_permission(permission.Permission(
            node="my_python_plugin:hello",
            description="Allows executing the /hello command",
            default=permission.PermissionDefault.ALLOW,
            children=[]
        ))

        # 2. 构建带有别名和执行器的命令树
        cmd = command.Command(["hello", "hi"], "Greets the player")
        cmd.execute(HelloCommand())

        # 3. 注册命令
        ctx.register_command(cmd, "my_python_plugin:hello")

register_plugin(MyPlugin)
```

---

## 2. 游戏内预览

注册后，您的命令会自动在 Minecraft 中获得客户端自动补全、语法验证和颜色高亮功能：

<img src="/assets/first_command_preview.png" alt="游戏内命令自动补全预览" width="500"/>

---

## 3. 工作原理

::: details 分步解析

### 第 1 步：定义权限
Pumpkin 中的命令需要权限节点。使用 `permission.PermissionDefault.ALLOW` 注册该节点，可默认允许执行命令：
```python
ctx.register_permission(permission.Permission(
    node="my_python_plugin:hello",
    description="Allows executing the /hello command",
    default=permission.PermissionDefault.ALLOW,
    children=[]
))
```

### 第 2 步：构建命令树
创建一个带有主名称和别名的 `command.Command` 实例，然后通过 `.execute(...)` 附加处理器：
```python
cmd = command.Command(["hello", "hi"], "Greets the player")
cmd.execute(HelloCommand())
```

### 第 3 步：通过 Context 注册
将命令树和权限节点字符串传递给 `ctx.register_command`：
```python
ctx.register_command(cmd, "my_python_plugin:hello")
```

:::

---

## 后续步骤

- 查看[事件](./events)，了解如何在 Python 中处理玩家操作和服务器事件。
- 进一步了解[基本逻辑](./basic-logic)。
