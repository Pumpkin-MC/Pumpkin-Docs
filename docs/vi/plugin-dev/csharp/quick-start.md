# Hướng dẫn bắt đầu nhanh

Hướng dẫn này sẽ giúp bạn bắt đầu viết các plugin cho máy chủ Pumpkin bằng C#.

## Yêu cầu tiên quyết

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt các công cụ sau:
- [.NET 10.0](https://dotnet.microsoft.com/download/dotnet/10.0) trở lên.
- [WebAssembly Workload](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/webassembly-overview): Bạn có thể cần cài đặt workload WASI:
  ```bash
  dotnet workload install wasi-experimental
  ```

## Thiết lập dự án

Đầu tiên, tạo một dự án thư viện lớp (class library) mới:

```bash
dotnet new classlib -n MyPumpkinPlugin
cd MyPumpkinPlugin
```

Tạo một tệp `NuGet.Config` tại thư mục gốc của dự án để thêm nguồn package thử nghiệm của .NET:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="dotnet-experimental" value="https://pkgs.dev.azure.com/dnceng/public/_packaging/dotnet-experimental/nuget/v3/index.json" />
  </packageSources>
</configuration>
```

Thêm Pumpkin API và WebAssembly SDK:

```bash
dotnet add package PumpkinMC.PumpkinApi
dotnet add package ByteCodeAlliance.Componentize.DotNet.Wasm.SDK --prerelease
```

Chỉnh sửa tệp `.csproj` của bạn để nhắm mục tiêu `wasi-wasm` và sử dụng .NET 10.0:

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

## Tạo plugin đầu tiên của bạn

Thay thế nội dung của `Class1.cs` (hoặc tạo một tệp mới `MyPlugin.cs`) bằng đoạn mã sau:

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

## Biên dịch plugin

Để biên dịch plugin của bạn thành một thành phần WebAssembly:

```bash
dotnet build -c Release
```

Tệp `.wasm` sau khi biên dịch sẽ nằm trong thư mục `bin/Release/net10.0/wasi-wasm/publish/`. Bạn có thể đặt tệp này vào thư mục `plugins` của máy chủ Pumpkin.