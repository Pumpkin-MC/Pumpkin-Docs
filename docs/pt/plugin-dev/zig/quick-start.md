# Início Rápido

Este guia ajudará você a começar a criar plugins para o servidor Pumpkin utilizando a linguagem de programação [Zig](https://ziglang.org/).

Os plugins em Zig para o Pumpkin são compilados em componentes WebAssembly (Wasm) utilizando os bindings oficiais [`pumpkin-api-zig`](https://github.com/Pumpkin-MC/pumpkin-api-zig).

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

- **[Zig](https://ziglang.org/download/)**: Versão 0.16.0 ou posterior.
- **[`wasm-tools`](https://github.com/bytecodealliance/wasm-tools)**: Disponível no seu `PATH` (usado pelo script de compilação para embutir os metadados WIT e gerar o componente WebAssembly).

---

## 1. Configurando o Projeto

Crie um novo diretório para o seu projeto de plugin:

```bash
mkdir my-zig-plugin
cd my-zig-plugin
```

Adicione `pumpkin-api-zig` como dependência:

```bash
zig fetch --save git+https://github.com/Pumpkin-MC/pumpkin-api-zig
```

Crie o arquivo `build.zig` na raiz do projeto:

```zig [build.zig]
const std = @import("std");
const pumpkin_api = @import("pumpkin_api_zig");

pub fn build(b: *std.Build) void {
    _ = pumpkin_api.addPlugin(b, b.dependency("pumpkin_api_zig", .{}), .{
        .name = "my-zig-plugin",
        .root_source_file = b.path("src/main.zig"),
    });
}
```

---

## 2. Escrevendo o Plugin

Crie o diretório `src` e adicione o seu código em `src/main.zig`:

```zig [src/main.zig]
const std = @import("std");
const pumpkin = @import("pumpkin");

pub const std_options: std.Options = .{ .logFn = pumpkin.logFn };

const MyPlugin = struct {
    pub const metadata: pumpkin.Metadata = .{
        .name = "my-zig-plugin",
        .version = "0.1.0",
        .authors = &.{"SeuNome"},
        .description = "Um exemplo de plugin em Zig.",
    };

    pub const events = .{
        .player_join_event = onJoin,
    };

    pub fn onLoad(_: pumpkin.Context) !void {
        std.log.info("Olá do plugin em Zig!", .{});
    }

    fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
        std.log.info("{s} entrou", .{ev.player.getName()});
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

### Elementos Chave:
- **`std_options`**: Redireciona os logs padrão do Zig (`std.log`) para o sistema de logs do Pumpkin através de `pumpkin.logFn`.
- **`pub const metadata`**: Define os metadados do plugin (nome, versão, autores, descrição) exigidos pelo Pumpkin ao carregar o componente.
- **`pub const events`**: Registra handlers de eventos (como `.player_join_event`).
- **`pub fn onLoad`**: Ponto de entrada invocado quando o Pumpkin inicializa o plugin.
- **`pumpkin.register(MyPlugin)`**: Gera em tempo de compilação as exportações e pontos de entrada necessários para o componente WebAssembly.

> [!NOTE]
> Tudo o que a API retorna (incluindo identificadores/handles) é válido apenas até o retorno do callback atual. Chame `keep()` em um handle para mantê-lo e, em seguida, libere-o com `deinit()` quando terminar.

---

## 3. Compilando o Plugin

Compile o seu plugin como um componente WebAssembly:

```bash
zig build
```

Isso gerará o arquivo `zig-out/my-zig-plugin.wasm` na raiz do seu projeto.

---

## 4. Executando o Plugin

1. Copie o arquivo `.wasm` gerado para a pasta `plugins/` do seu servidor Pumpkin:
   ```bash
   cp zig-out/my-zig-plugin.wasm /caminho/para/pumpkin/plugins/
   ```
2. Inicie ou reinicie o servidor Pumpkin:
   ```bash
   ./pumpkin
   ```
3. Verifique os logs do servidor para confirmar o carregamento:
   ```text
   [INFO] Olá do plugin em Zig!
   ```
