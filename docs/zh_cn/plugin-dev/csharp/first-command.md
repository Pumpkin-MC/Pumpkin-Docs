# 创建你的第一个命令

使用 C# 在 Pumpkin 中注册自定义命令，可以获得强类型且清晰的代码结构。

---

## 1. 快速示例

下面是一个完整的 C# 插件文件（`MyPlugin.cs`），它会注册一个带权限检查的 `/hello` 命令，并向玩家发送响应。

```csharp [MyPlugin.cs]
using PluginWorld;
using PluginWorld.wit.Exports.pumpkin.plugin.v0_1_0;
using PluginWorld.wit.Imports.pumpkin.plugin.v0_1_0;

namespace MyPumpkinPlugin;

public class MyPlugin : IPluginWorldExports, IMetadataExports
{
    public static void InitPlugin() { }

    public static void OnLoad(IContextImports.Context context)
    {
        // 1. 注册权限节点
        var perm = new IPermissionImports.Permission(
            "my_csharp_plugin:hello",
            "Allows executing the /hello command",
            IPermissionImports.PermissionDefault.Allow,
            []
        );
        IContextImports.RegisterPermission(context, perm);

        // 2. 构建并注册命令树
        var command = ICommandImports.Command.New(["hello", "hi"], "Greets the player");
        IContextImports.RegisterCommand(context, command, "my_csharp_plugin:hello");
    }

    public static void OnUnload(IContextImports.Context context) { }

    public static IEventImports.Event HandleEvent(uint eventId, IServerImports.Server server, IEventImports.Event @event)
    {
        return @event;
    }

    public static int HandleCommand(uint commandId, ICommandImports.CommandSender sender, IServerImports.Server server, ICommandImports.ConsumedArgs args)
    {
        ICommandImports.SendMessage(sender, "Hello from C# Plugin!");
        return 1;
    }

    public static void HandleTask(uint handlerId, IServerImports.Server server) { }

    public static IMetadataExports.PluginMetadata Metadata()
    {
        return new IMetadataExports.PluginMetadata(
            "my_csharp_plugin",
            "0.1.0",
            "My first Pumpkin C# plugin",
            ["Developer"],
            []
        );
    }
}
```

---

## 2. 游戏内预览

命令注册后，Minecraft 客户端会自动为其提供自动补全、语法验证和颜色高亮：

<img src="/assets/first_command_preview.png" alt="游戏内命令自动补全预览" width="500"/>

---

## 3. 工作原理

::: details 分步解析

### 步骤 1：定义权限节点
构造一个 `IPermissionImports.Permission` 记录，并通过 `IContextImports.RegisterPermission` 注册：
```csharp
var perm = new IPermissionImports.Permission(
    "my_csharp_plugin:hello",
    "Allows executing the /hello command",
    IPermissionImports.PermissionDefault.Allow,
    []
);
IContextImports.RegisterPermission(context, perm);
```

### 步骤 2：构建命令树
使用主名称和描述实例化命令：
```csharp
var command = ICommandImports.Command.New(["hello", "hi"], "Greets the player");
```

### 步骤 3：注册并处理
使用 `IContextImports.RegisterCommand` 注册命令，并在 `HandleCommand` 中处理传入的执行请求：
```csharp
IContextImports.RegisterCommand(context, command, "my_csharp_plugin:hello");
```

:::

---

## 后续步骤

- 按照 [C# 快速入门指南](./quick-start) 配置 `.csproj` 并构建 WebAssembly 输出。
