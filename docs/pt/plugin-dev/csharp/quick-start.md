# Início Rápido

Este guia ajudará você a começar a escrever plugins para o servidor Pumpkin usando C#.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:
- [.NET 10.0](https://dotnet.microsoft.com/download/dotnet/10.0) ou superior.
- [WebAssembly Workload](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/webassembly-overview): Você pode precisar instalar o workload WASI:
  ```bash
  dotnet workload install wasi-experimental
  ```

## Configurando o projeto

Primeiro, crie um novo projeto de biblioteca de classes:

```bash
dotnet new classlib -n MyPumpkinPlugin
cd MyPumpkinPlugin
```

Crie um arquivo `NuGet.Config` na raiz do seu projeto para incluir o feed experimental do .NET:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="dotnet-experimental" value="https://pkgs.dev.azure.com/dnceng/public/_packaging/dotnet-experimental/nuget/v3/index.json" />
  </packageSources>
</configuration>
```

Adicione a API do Pumpkin e o SDK do WebAssembly:

```bash
dotnet add package PumpkinMC.PumpkinApi
dotnet add package ByteCodeAlliance.Componentize.DotNet.Wasm.SDK --prerelease
```

Edite seu arquivo `.csproj` para visar `wasi-wasm` e usar o .NET 10.0:

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

## Criando seu primeiro plugin

Substitua o conteúdo de `Class1.cs` (ou crie um novo arquivo `MyPlugin.cs`) pelo seguinte código:

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
        ILoggingImports.Log(ILoggingImports.Level.Info, "Plugin C# carregado!");
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
            "Um exemplo de plugin C#.",
            ["SeuNome"],
            []
        );
    }
}
```

## Compilando o plugin

Para compilar seu plugin em um componente WebAssembly:

```bash
dotnet build -c Release
```

O arquivo `.wasm` compilado estará localizado em `bin/Release/net10.0/wasi-wasm/publish/`. Você pode colocar este arquivo na pasta `plugins` do seu servidor Pumpkin.
