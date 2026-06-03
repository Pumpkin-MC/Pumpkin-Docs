# Snelstart

Deze gids helpt je op weg met het schrijven van Pumpkin server plugins met C#.

## Vereisten

Voordat je begint, zorg ervoor dat je het volgende hebt geïnstalleerd:
- [.NET 10.0](https://dotnet.microsoft.com/download/dotnet/10.0) of nieuwer.
- [WebAssembly Workload](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/webassembly-overview): Je moet mogelijk de WASI workload installeren:
  ```bash
  dotnet workload install wasi-experimental
  ```

## Het project opzetten

Maak eerst een nieuw class library project aan:

```bash
dotnet new classlib -n MyPumpkinPlugin
cd MyPumpkinPlugin
```

Maak een `NuGet.Config` bestand aan in de hoofdmap van je project om de experimentele .NET feed toe te voegen:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="dotnet-experimental" value="https://pkgs.dev.azure.com/dnceng/public/_packaging/dotnet-experimental/nuget/v3/index.json" />
  </packageSources>
</configuration>
```

Voeg de Pumpkin API en de WebAssembly SDK toe:

```bash
dotnet add package PumpkinMC.PumpkinApi
dotnet add package ByteCodeAlliance.Componentize.DotNet.Wasm.SDK --prerelease
```

Bewerk je `.csproj` bestand om `wasi-wasm` als doel in te stellen en .NET 10.0 te gebruiken:

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

## Je eerste plugin maken

Vervang de inhoud van `Class1.cs` (of maak een nieuw bestand `MyPlugin.cs`) door de volgende code:

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
        ILoggingImports.Log(ILoggingImports.Level.Info, "C# plugin geladen!");
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
            "Een voorbeeld C# plugin.",
            ["JouwNaam"],
            []
        );
    }
}
```

## De plugin bouwen

Om je plugin te compileren naar een WebAssembly component:

```bash
dotnet build -c Release
```

Het gecompileerde `.wasm` bestand bevindt zich in `bin/Release/net10.0/wasi-wasm/publish/`. Je kunt dit bestand in de `plugins` map van je Pumpkin server plaatsen.
