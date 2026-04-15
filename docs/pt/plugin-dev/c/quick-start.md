# Início Rápido

Este guia ajudará você a começar a escrever plugins para o servidor Pumpkin usando C.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:
- [wasi-sdk](https://github.com/WebAssembly/wasi-sdk/releases) (para compilar C para WASI)
- `git` (para clonar a API)

## Configurando o projeto

Primeiro, clone o repositório da API C do Pumpkin com submódulos:

```bash
git clone --recursive https://github.com/Pumpkin-MC/pumpkin-api-c.git
cd pumpkin-api-c
```

## Criando seu primeiro plugin

Crie um arquivo chamado `main.c` na raiz do repositório e adicione o seguinte conteúdo:

```c
#include "pumpkin_api.h"
#include <stdio.h>

pumpkin_metadata_t get_meta(void) {
    static const char* authors[] = {"you"};
    return (pumpkin_metadata_t) {
        .name = "my-c-plugin",
        .version = "0.1.0",
        .authors = authors,
        .authors_count = 1,
        .description = "Um plugin C simples para o Pumpkin",
        .dependencies_count = 0
    };
}

void on_load(plugin_own_context_t ctx) {
    printf("Plugin C carregado!\n");
}

REGISTER_PUMPKIN_PLUGIN(((pumpkin_plugin_t){
    .get_metadata = get_meta,
    .on_load = on_load
}))
```

## Compilando o plugin

Para compilar seu plugin em um componente WebAssembly, use o compilador `clang` da sua instalação do `wasi-sdk`. 

Substitua `/path/to/wasi-sdk` pelo caminho real do seu WASI SDK.

```bash
/path/to/wasi-sdk/bin/clang -O3 \
    -Iinclude -Isrc/gen \
    src/gen/plugin.c src/pumpkin_api.c main.c \
    -o my_plugin.wasm \
    -mexec-model=reactor
```

Isso gerará um arquivo `my_plugin.wasm` que você pode colocar na pasta `plugins` do seu servidor Pumpkin.
