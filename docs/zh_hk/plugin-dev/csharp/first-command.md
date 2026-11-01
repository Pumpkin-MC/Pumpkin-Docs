# 建立你的第一個指令

使用 C# 在 Pumpkin 中註冊自訂指令，可以獲得強類型且清晰的程式碼結構。

---

## 1. 快速範例

下面是一個完整的 C# 插件檔案（`MyPlugin.cs`），它會註冊一個帶權限檢查的 `/hello` 指令，並向玩家傳送回應。

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
        // 1. 註冊權限節點
        var perm = new IPermissionImports.Permission(
            "my_csharp_plugin:hello",
            "Allows executing the /hello command",
            IPermissionImports.PermissionDefault.Allow,
            []
        );
        IContextImports.RegisterPermission(context, perm);

        // 2. 建構並註冊指令樹
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

## 2. 遊戲內預覽

指令註冊後，Minecraft 客戶端會自動為其提供自動自動完成、語法驗證和顏色高亮：

<img src="/assets/first_command_preview.png" alt="遊戲內指令自動自動完成預覽" width="500"/>

---

## 3. 工作原理

::: details 分步解析

### 步驟 1：定義權限節點
構造一個 `IPermissionImports.Permission` 記錄，並透過 `IContextImports.RegisterPermission` 註冊：
```csharp
var perm = new IPermissionImports.Permission(
    "my_csharp_plugin:hello",
    "Allows executing the /hello command",
    IPermissionImports.PermissionDefault.Allow,
    []
);
IContextImports.RegisterPermission(context, perm);
```

### 步驟 2：構建指令樹
使用主名稱和描述實例化指令：
```csharp
var command = ICommandImports.Command.New(["hello", "hi"], "Greets the player");
```

### 步驟 3：註冊並處理
使用 `IContextImports.RegisterCommand` 註冊指令，並在 `HandleCommand` 中處理傳入的執行請求：
```csharp
IContextImports.RegisterCommand(context, command, "my_csharp_plugin:hello");
```

:::

---

## 後續步驟

- 按照 [C# 快速入門指南](./quick-start) 設定 `.csproj` 並構建 WebAssembly 輸出。
