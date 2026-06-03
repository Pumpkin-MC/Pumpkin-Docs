# Schnellstart

Diese Anleitung hilft dir beim Einstieg in die Entwicklung von Pumpkin-Server-Plugins mit C#.

## Voraussetzungen

Bevor du beginnst, stelle sicher, dass du Folgendes installiert hast:
- [.NET 10.0](https://dotnet.microsoft.com/download/dotnet/10.0) oder neuer.
- [WebAssembly Workload](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/webassembly-overview): Möglicherweise musst du die WASI-Workload installieren:
  ```bash
  dotnet workload install wasi-experimental
  ```

## Projekt einrichten

Erstelle zunächst ein neues Klassenbibliotheksprojekt:

```bash
dotnet new classlib -n MyPumpkinPlugin
cd MyPumpkinPlugin
```

Erstelle eine `NuGet.Config`-Datei im Stammverzeichnis deines Projekts, um den experimentellen .NET-Feed einzubinden:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="dotnet-experimental" value="https://pkgs.dev.azure.com/dnceng/public/_packaging/dotnet-experimental/nuget/v3/index.json" />
  </packageSources>
</configuration>
```

Füge die Pumpkin API und das WebAssembly SDK hinzu:

```bash
dotnet add package PumpkinMC.PumpkinApi
dotnet add package ByteCodeAlliance.Componentize.DotNet.Wasm.SDK --prerelease
```

Bearbeite deine `.csproj`-Datei, um `wasi-wasm` als Ziel festzulegen und .NET 10.0 zu verwenden:

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

## Erstellen deines ersten Plugins

Ersetze den Inhalt von `Class1.cs` (oder erstelle eine neue Datei `MyPlugin.cs`) durch den folgenden Code:

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
        ILoggingImports.Log(ILoggingImports.Level.Info, "C# Plugin geladen!");
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
            "Ein Beispiel-C#-Plugin.",
            ["DeinName"],
            []
        );
    }
}
```

## Plugin bauen

Um dein Plugin in eine WebAssembly-Komponente zu kompilieren:

```bash
dotnet build -c Release
```

Die kompilierte `.wasm`-Datei befindet sich in `bin/Release/net10.0/wasi-wasm/publish/`. Du kannst diese Datei in den `plugins`-Ordner deines Pumpkin-Servers legen.
