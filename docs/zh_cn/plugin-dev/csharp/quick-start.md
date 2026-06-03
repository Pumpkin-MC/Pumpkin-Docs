# 快速入门

本指南将帮助您开始使用 C# 编写 Pumpkin 服务器插件。

## 先决条件

在开始之前，请确保您已安装以下内容：
- [.NET 10.0](https://dotnet.microsoft.com/download/dotnet/10.0) 或更高版本。
- [WebAssembly 工作负载](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/webassembly-overview)：您可能需要安装 WASI 工作负载：
  ```bash
  dotnet workload install wasi-experimental
  ```

## 设置项目

首先，创建一个新的类库项目：

```bash
dotnet new classlib -n MyPumpkinPlugin
cd MyPumpkinPlugin
```

在项目根目录下创建一个 `NuGet.Config` 文件，以包含实验性的 .NET 订阅源：

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

编辑您的 `.csproj` 文件以针对 `wasi-wasm` 并使用 .NET 10.0：

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

## 创建您的第一个插件

将 `Class1.cs` 的内容（或创建一个新文件 `MyPlugin.cs`）替换为以下代码：

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
        ILoggingImports.Log(ILoggingImports.Level.Info, "C# 插件已加载！");
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
            "一个示例 C# 插件。",
            ["您的名字"],
            []
        );
    }
}
```

## 构建插件

要将插件构建为 WebAssembly 组件：

```bash
dotnet build -c Release
```

构建后的 `.wasm` 文件将位于 `bin/Release/net10.0/wasi-wasm/publish/` 目录中。您可以将此文件放置在 Pumpkin 服务器的 `plugins` 文件夹中。
