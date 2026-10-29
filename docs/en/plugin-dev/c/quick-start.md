# Quick Start

This guide will help you get started with writing Pumpkin server plugins using C or C++.

## Prerequisites

Before you start, ensure you have the following installed:
- [wasi-sdk](https://github.com/WebAssembly/wasi-sdk/releases) (version 24 or later recommended, providing `wasm32-wasip2-clang`)
- `curl` and `tar` (or manual download tool)

## Setting up the project

1. Download the latest version of the C bindings package from the [CI release](https://github.com/Pumpkin-MC/pumpkin-api-c/releases/tag/CI):

```bash
# Download and extract the archive (replace <hash> with the current commit hash)
curl -OL https://github.com/Pumpkin-MC/pumpkin-api-c/releases/download/CI/pumpkin-api-c-<hash>.tar.xz
tar -xJvf pumpkin-api-c-<hash>.tar.xz
mv pumpkin-api-c-<hash> pumpkin-api
```

This folder provides `pumpkin-api/include` headers and the prebuilt static library `pumpkin-api/lib/libpumpkin-api.a`.

## Creating your first plugin

Create a file named `main.c` alongside your `pumpkin-api` directory:

```c [main.c]
#include "pumpkin_api.h"
#include <stdio.h>

pumpkin_metadata_t get_meta(void) {
    static const char* authors[] = {"you"};
    return (pumpkin_metadata_t) {
        .name = "my-c-plugin",
        .version = "0.1.0",
        .authors = authors,
        .authors_count = 1,
        .description = "A simple C plugin for Pumpkin",
        .dependencies_count = 0,
        .permissions_count = 0
    };
}

void on_load(plugin_own_context_t ctx) {
    printf("C plugin loaded!\n");
}

REGISTER_PUMPKIN_PLUGIN(((pumpkin_plugin_t){
    .get_metadata = get_meta,
    .on_load = on_load
}))
```

## Building the plugin

Compile your plugin to WebAssembly using `wasm32-wasip2-clang` from `wasi-sdk`. Replace `/path/to/wasi-sdk` with your actual installation path:

```bash
/path/to/wasi-sdk/bin/wasm32-wasip2-clang -Oz \
    -Ipumpkin-api/include \
    pumpkin-api/lib/libpumpkin-api.a \
    main.c \
    -o my_plugin.wasm \
    -mexec-model=reactor
```

This generates `my_plugin.wasm`. Place this file into the `plugins/` directory of your Pumpkin server and start the server.
