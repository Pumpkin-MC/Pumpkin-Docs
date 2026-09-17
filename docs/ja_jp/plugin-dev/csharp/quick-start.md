# Quick Start

This guide will help you get started with writing Pumpkin server plugins using C#.

## Prerequisites

Before you start, ensure you have the following installed:
- [.NET 10.0](https://dotnet.microsoft.com/download/dotnet/10.0) or later.
- [WebAssembly Workload](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/webassembly-overview): You may need to install the WASI workload:
  ```bash
  dotnet workload install wasi-experimental
  ```

## Setting up the project

First, create a new class library project:

```bash
dotnet new classlib -n MyPumpkinPlugin
cd MyPumpkinPlugin
```

Create a `NuGet.Config` file in your project root to include the experimental .NET feed:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="dotnet-experimental" value="https://pkgs.dev.azure.com/dnceng/public/_packaging/dotnet-experimental/nuget/v3/index.json" />
  </packageSources>
</configuration>
```

Add the Pumpkin API and the WebAssembly SDK:

```bash
dotnet add package PumpkinMC.PumpkinApi
dotnet add package ByteCodeAlliance.Componentize.DotNet.Wasm.SDK --prerelease
```

Edit your `.csproj` file to target `wasi-wasm` and use .NET 10.0:

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

## Creating your first plugin

Replace the content of `Class1.cs` (or create a new file `MyPlugin.cs`) with the following code:

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

## Building the plugin

To build your plugin into a WebAssembly component:

```bash
dotnet build -c Release
```

The compiled `.wasm` file will be located in `bin/Release/net10.0/wasi-wasm/publish/`. You can place this file in the `plugins` folder of your Pumpkin server.
