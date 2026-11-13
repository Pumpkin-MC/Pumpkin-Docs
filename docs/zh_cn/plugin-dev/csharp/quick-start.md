# 快速入门

本指南将帮助你开始使用 C# 编写 Pumpkin 服务器插件。

## 前提条件

在开始之前，请确保已安装以下内容：
- [.NET 10.0](https://dotnet.microsoft.com/download/dotnet/10.0) 或更高版本。
- [WebAssembly 工作负载](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/webassembly-overview)：你可能需要安装 WASI 工作负载：
  ```bash
  dotnet workload install wasi-experimental
  ```

## 设置项目

首先，创建一个新的类库项目：

```bash
dotnet new classlib -n MyPumpkinPlugin
cd MyPumpkinPlugin
```

在项目根目录创建一个 `NuGet.Config` 文件，以添加实验性的 .NET 源：

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="dotnet-experimental" value="https://pkgs.dev.azure.com/dnceng/public/_packaging/dotnet-experimental/nuget/v3/index.json" />
  </packageSources>
</configuration>
```

添加 Pumpkin API 和 WebAssembly SDK：

```bash
dotnet add package PumpkinMC.PumpkinApi
dotnet add package ByteCodeAlliance.Componentize.DotNet.Wasm.SDK --prerelease
```

编辑 `.csproj` 文件，将目标设为 `wasi-wasm` 并使用 .NET 10.0：

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <RuntimeIdentifier>wasi-wasm</RuntimeIdentifier>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="ByteCodeAlliance.Componentize.DotNet.Wasm.SDK" Version="*-*" />
    <PackageReference Include="PumpkinMC.PumpkinApi" Version="*" />
  </ItemGroup>

</Project>
```

## 创建你的第一个插件

将 `Class1.cs` 的内容替换为以下代码（或创建一个新文件 `MyPlugin.cs`）：

```csharp
using PluginWorld;
using PluginWorld.wit.Exports.pumpkin.plugin.v0_1_0;
using PluginWorld.wit.Imports.pumpkin.plugin.v0_1_0;

namespace MyPumpkinPlugin;

public class MyPlugin : IPluginWorldExports, IMetadataExports
{
    public static void InitPlugin() { }

    public static void OnLoad(IContextImports.Context context)
    {
        ILoggingImports.Log(ILoggingImports.Level.Info, "C# plugin loaded!");
    }

    public static void OnUnload(IContextImports.Context context) { }

    public static IEventImports.Event HandleEvent(uint eventId, IServerImports.Server server, IEventImports.Event @event)
    {
        return @event;
    }

    public static int HandleCommand(uint commandId, ICommandImports.CommandSender sender, IServerImports.Server server, ICommandImports.ConsumedArgs args)
    {
        return 0;
    }

    public static void HandleTask(uint handlerId, IServerImports.Server server) { }

    public static IMetadataExports.PluginMetadata Metadata()
    {
        return new IMetadataExports.PluginMetadata(
            "my-csharp-plugin",
            "0.1.0",
            "An example C# plugin.",
            ["YourName"],
            []
        );
    }
}
```

## 构建插件

将插件构建为 WebAssembly 组件：

```bash
dotnet build -c Release
```

编译后的 `.wasm` 文件将位于 `bin/Release/net10.0/wasi-wasm/publish/`。你可以将此文件放入 Pumpkin 服务器的 `plugins` 文件夹。
