# Hızlı Başlangıç

Bu rehber, C# kullanarak Pumpkin sunucu eklentileri yazmaya başlamanıza yardımcı olacaktır.

## Ön Koşullar

Başlamadan önce aşağıdakilerin kurulu olduğundan emin olun:
- [.NET 10.0](https://dotnet.microsoft.com/download/dotnet/10.0) veya daha yenisi.
- [WebAssembly Workload](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/webassembly-overview): WASI workload'unu kurmanız gerekebilir:
  ```bash
  dotnet workload install wasi-experimental
  ```

## Projeyi Kurma

İlk olarak, yeni bir sınıf kütüphanesi (class library) projesi oluşturun:

```bash
dotnet new classlib -n MyPumpkinPlugin
cd MyPumpkinPlugin
```

Deneysel .NET beslemesini (feed) dahil etmek için projenizin kök dizininde bir `NuGet.Config` dosyası oluşturun:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="dotnet-experimental" value="https://pkgs.dev.azure.com/dnceng/public/_packaging/dotnet-experimental/nuget/v3/index.json" />
  </packageSources>
</configuration>
```

Pumpkin API'sini ve WebAssembly SDK'sını ekleyin:

```bash
dotnet add package PumpkinMC.PumpkinApi
dotnet add package ByteCodeAlliance.Componentize.DotNet.Wasm.SDK --prerelease
```

`.csproj` dosyanızı `wasi-wasm` hedefleyecek ve .NET 10.0 kullanacak şekilde düzenleyin:

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

## İlk Eklentinizi Oluşturma

`Class1.cs` içeriğini (veya yeni bir `MyPlugin.cs` dosyası oluşturarak) aşağıdaki kodla değiştirin:

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
        ILoggingImports.Log(ILoggingImports.Level.Info, "C# eklentisi yüklendi!");
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
            "Örnek bir C# eklentisi.",
            ["Adınız"],
            []
        );
    }
}
```

## Eklentiyi Derleme

Eklentinizi bir WebAssembly bileşeni olarak derlemek için:

```bash
dotnet build -c Release
```

Derlenmiş `.wasm` dosyası `bin/Release/net10.0/wasi-wasm/publish/` dizininde bulunacaktır. Bu dosyayı Pumpkin sunucunuzun `plugins` klasörüne yerleştirebilirsiniz.
