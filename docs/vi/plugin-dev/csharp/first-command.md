# Tạo Lệnh Đầu Tiên Của Bạn

Đăng ký lệnh tùy chỉnh trong Pumpkin bằng C# cung cấp một cấu trúc strongly-typed và rõ ràng.

---

## 1. Ví dụ nhanh

Dưới đây là file plugin C# hoàn chỉnh (`MyPlugin.cs`) đăng ký lệnh `/hello` với kiểm tra quyền và gửi phản hồi trở lại người chơi.

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
        // 1. Đăng ký permission node
        var perm = new IPermissionImports.Permission(
            "my_csharp_plugin:hello",
            "Allows executing the /hello command",
            IPermissionImports.PermissionDefault.Allow,
            []
        );
        IContextImports.RegisterPermission(context, perm);

        // 2. Xây dựng và đăng ký command tree
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

## 2. Xem trước trong trò chơi

Sau khi đăng ký, lệnh của bạn sẽ tự động có tính năng tự động hoàn thành phía client, kiểm tra cú pháp và tô màu trong Minecraft:

<img src="/assets/first_command_preview.png" alt="Xem trước tự động hoàn thành lệnh trong trò chơi" width="500"/>

---

## 3. Cách hoạt động

::: details Giải thích từng bước

### Bước 1: Định nghĩa Permission Node
Tạo một record `IPermissionImports.Permission` và đăng ký nó qua `IContextImports.RegisterPermission`:
```csharp
var perm = new IPermissionImports.Permission(
    "my_csharp_plugin:hello",
    "Allows executing the /hello command",
    IPermissionImports.PermissionDefault.Allow,
    []
);
IContextImports.RegisterPermission(context, perm);
```

### Bước 2: Xây dựng Command Tree
Khởi tạo lệnh của bạn với tên chính và mô tả:
```csharp
var command = ICommandImports.Command.New(["hello", "hi"], "Greets the player");
```

### Bước 3: Đăng ký và xử lý
Đăng ký lệnh với `IContextImports.RegisterCommand` và xử lý các lần thực thi bên trong `HandleCommand`:
```csharp
IContextImports.RegisterCommand(context, command, "my_csharp_plugin:hello");
```

:::

---

## Các bước tiếp theo

- Làm theo [Hướng dẫn Bắt đầu Nhanh C#](./quick-start) để cấu hình `.csproj` và build WebAssembly outputs.
