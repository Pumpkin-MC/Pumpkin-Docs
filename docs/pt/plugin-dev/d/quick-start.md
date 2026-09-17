# Início Rápido

Este guia ajudará você a começar a criar plugins para o servidor Pumpkin utilizando a linguagem de programação [D](https://dlang.org/).

Os plugins em D para o Pumpkin são compilados em componentes WebAssembly (Wasm) utilizando os bindings oficiais [`pumpkin-api-d`](https://github.com/Pumpkin-MC/pumpkin-api-d).

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

- **[LDC](https://github.com/ldc-developers/ldc)**: Versão 1.43 ou posterior (compilador D baseado em LLVM).
- **`addon-wasi`**: O pacote de destino WASI para o LDC.
- **[DUB](https://dub.pm/)**: O gerenciador de pacotes e compilação de D (geralmente incluso no LDC).

---

## 1. Configurando o Projeto

Crie um novo diretório para o seu projeto de plugin e adicione o arquivo de configuração `dub.json`:

```bash
mkdir my-d-plugin
cd my-d-plugin
```

Crie o arquivo `dub.json` na raiz do projeto:

```json [dub.json]
{
    "name": "my-d-plugin",
    "description": "Um plugin mínimo para o Pumpkin feito em D.",
    "license": "proprietary",
    "authors": ["SeuNome"],
    "copyright": "Copyright © 2026, SeuNome",

    "dependencies": {
        "pumpkin-api-d": "~>0.1.0"
    },

    "targetType": "executable",
    "dflags": ["-Xcc=-mexec-model=reactor"],
    "buildTypes": {
        "debug": {
            "buildOptions": ["debugMode", "debugInfo"]
        },
        "release": {
            "buildOptions": ["optimize", "inline"],
            "dflags": ["-L-S"]
        }
    }
}
```

> [!NOTE]
> A flag `-Xcc=-mexec-model=reactor` é exigida pelo linker do WebAssembly para que o plugin seja tratado como um reator (um componente que expõe pontos de entrada) em vez de um programa executável com ponto de saída imediato.

---

## 2. Escrevendo o Plugin

Crie o diretório `source` e adicione o seu código em `source/app.d`:

```d [source/app.d]
module plugin;

import wit.pumpkin.plugin.plugin;
import wit.common;
import pumpkin.register;

struct MyPlugin {
    @GetMetadata PluginMetadata getMetadata()
    {
        immutable(WitString)[$] authors = [
            "SeuNome".witList
        ];

        return (immutable PluginMetadata(
                name: "my-d-plugin".witList,
                version_: "0.1.0".witList,
                authors: authors.witList,
                description: "Um exemplo de plugin em D.".witList,
                dependencies: WitList!WitString(),
                permissions: WitList!WitString()
        )).witClone;
    }

    @OnLoad
    Result!(void, WitString) onLoad(Context ctx)
    {
        scope (exit)
            ctx.witDrop; // Recursos de entrada devem ser liberados após o uso

        log(Level.info, "Olá do plugin em D!".witList);
        return ok!WitString;
    }
}

mixin RegisterPlugin!MyPlugin;
```

---

## 3. Compilando o Plugin

Compile o seu plugin como um componente WebAssembly com o alvo `wasm32-wasip2`:

```bash
dub build -b release -a wasm32-wasip2
```

Isso gerará o arquivo `my-d-plugin.wasm` na raiz do seu projeto.

---

## 4. Executando o Plugin

1. Copie o arquivo `.wasm` gerado para a pasta `plugins/` do seu servidor Pumpkin:
   ```bash
   cp my-d-plugin.wasm /caminho/para/pumpkin/plugins/
   ```
2. Inicie ou reinicie o servidor Pumpkin:
   ```bash
   ./pumpkin
   ```
3. Verifique os logs do servidor para confirmar o carregamento:
   ```text
   [INFO] Olá do plugin em D!
   ```
