# Snelstart

Deze handleiding helpt je op weg bij het schrijven van Pumpkin server plugins met C.

## Vereisten

Zorg ervoor dat je het volgende hebt geïnstalleerd voordat je begint:
- [wasi-sdk](https://github.com/WebAssembly/wasi-sdk/releases) (voor het compileren van C naar WASI)
- `git` (om de API te klonen)

## Project opzetten

Kloon eerst de Pumpkin C API repository met submodules:

```bash
git clone --recursive https://github.com/Pumpkin-MC/pumpkin-api-c.git
cd pumpkin-api-c
```

## Je eerste plugin maken

Maak een bestand genaamd `main.c` aan in de hoofdmap van de repository en voeg de volgende inhoud toe:

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
        .description = "Een eenvoudige C-plugin voor Pumpkin",
        .dependencies_count = 0
    };
}

void on_load(plugin_own_context_t ctx) {
    printf("C-plugin geladen!\n");
}

REGISTER_PUMPKIN_PLUGIN(((pumpkin_plugin_t){
    .get_metadata = get_meta,
    .on_load = on_load
}))
```

## De plugin bouwen

Gebruik de `clang`-compiler van je `wasi-sdk`-installatie om je plugin naar een WebAssembly-component te bouwen. 

Vervang `/path/to/wasi-sdk` door het daadwerkelijke pad naar je WASI SDK.

```bash
/path/to/wasi-sdk/bin/clang -O3 \
    -Iinclude -Isrc/gen \
    src/gen/plugin.c src/pumpkin_api.c main.c \
    -o my_plugin.wasm \
    -mexec-model=reactor
```

Dit genereert een `my_plugin.wasm`-bestand dat je in de `plugins`-map van je Pumpkin-server kunt plaatsen.
