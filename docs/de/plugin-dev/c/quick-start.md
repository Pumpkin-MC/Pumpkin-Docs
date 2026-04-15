# Schnellstart

Dieser Leitfaden hilft dir beim Einstieg in das Schreiben von Pumpkin-Server-Plugins mit C.

## Voraussetzungen

Bevor du beginnst, stelle sicher, dass du Folgendes installiert hast:
- [wasi-sdk](https://github.com/WebAssembly/wasi-sdk/releases) (zum Kompilieren von C nach WASI)
- `git` (um die API zu klonen)

## Projekt einrichten

Klone zuerst das Pumpkin C API Repository mit Submodulen:

```bash
git clone --recursive https://github.com/Pumpkin-MC/pumpkin-api-c.git
cd pumpkin-api-c
```

## Dein erstes Plugin erstellen

Erstelle eine Datei namens `main.c` im Stammverzeichnis des Repositories und füge den folgenden Inhalt hinzu:

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
        .description = "Ein einfaches C-Plugin für Pumpkin",
        .dependencies_count = 0
    };
}

void on_load(plugin_own_context_t ctx) {
    printf("C-Plugin geladen!\n");
}

REGISTER_PUMPKIN_PLUGIN(((pumpkin_plugin_t){
    .get_metadata = get_meta,
    .on_load = on_load
}))
```

## Plugin bauen

Um dein Plugin in eine WebAssembly-Komponente zu bauen, verwende den `clang`-Compiler aus deiner `wasi-sdk`-Installation. 

Ersetze `/path/to/wasi-sdk` durch den tatsächlichen Pfad zu deinem WASI SDK.

```bash
/path/to/wasi-sdk/bin/clang -O3 \
    -Iinclude -Isrc/gen \
    src/gen/plugin.c src/pumpkin_api.c main.c \
    -o my_plugin.wasm \
    -mexec-model=reactor
```

Dies generiert eine `my_plugin.wasm`-Datei, die du im `plugins`-Ordner deines Pumpkin-Servers ablegen kannst.
