# Hızlı Başlangıç

Bu kılavuz, C kullanarak Pumpkin sunucu eklentileri yazmaya başlamanıza yardımcı olacaktır.

## Önkoşullar

Başlamadan önce şunların kurulu olduğundan emin olun:
- [wasi-sdk](https://github.com/WebAssembly/wasi-sdk/releases) (C'yi WASI'ye derlemek için)
- `git` (API'yi klonlamak için)

## Projeyi kurma

İlk olarak, Pumpkin C API deposunu alt modüllerle birlikte klonlayın:

```bash
git clone --recursive https://github.com/Pumpkin-MC/pumpkin-api-c.git
cd pumpkin-api-c
```

## İlk eklentinizi oluşturma

Deponun kök dizininde `main.c` adında bir dosya oluşturun ve aşağıdaki içeriği ekleyin:

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
        .description = "Pumpkin için basit bir C eklentisi",
        .dependencies_count = 0
    };
}

void on_load(plugin_own_context_t ctx) {
    printf("C eklentisi yüklendi!\n");
}

REGISTER_PUMPKIN_PLUGIN(((pumpkin_plugin_t){
    .get_metadata = get_meta,
    .on_load = on_load
}))
```

## Eklentiyi derleme

Eklentinizi bir WebAssembly bileşeni olarak derlemek için `wasi-sdk` kurulumunuzdaki `clang` derleyicisini kullanın. 

`/path/to/wasi-sdk` kısmını WASI SDK'nızın gerçek yoluyla değiştirin.

```bash
/path/to/wasi-sdk/bin/clang -O3 \
    -Iinclude -Isrc/gen \
    src/gen/plugin.c src/pumpkin_api.c main.c \
    -o my_plugin.wasm \
    -mexec-model=reactor
```

Bu, Pumpkin sunucunuzun `plugins` klasörüne yerleştirebileceğiniz bir `my_plugin.wasm` dosyası oluşturacaktır.
