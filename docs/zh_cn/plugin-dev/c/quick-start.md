# 快速入门

本指南将帮助您开始使用 C 语言编写 Pumpkin 服务器插件。

## 前提条件

在开始之前，请确保您已安装以下内容：
- [wasi-sdk](https://github.com/WebAssembly/wasi-sdk/releases) (用于将 C 编译为 WASI)
- `git` (用于克隆 API)

## 设置项目

首先，克隆带有子模块的 Pumpkin C API 存储库：

```bash
git clone --recursive https://github.com/Pumpkin-MC/pumpkin-api-c.git
cd pumpkin-api-c
```

## 创建您的第一个插件

在存储库根目录下创建一个名为 `main.c` 的文件，并添加以下内容：

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
        .description = "一个简单的 Pumpkin C 插件",
        .dependencies_count = 0
    };
}

void on_load(plugin_own_context_t ctx) {
    printf("C 插件已加载！\n");
}

REGISTER_PUMPKIN_PLUGIN(((pumpkin_plugin_t){
    .get_metadata = get_meta,
    .on_load = on_load
}))
```

## 构建插件

要将插件构建为 WebAssembly 组件，请使用 `wasi-sdk` 安装中的 `clang` 编译器。 

将 `/path/to/wasi-sdk` 替换为 WASI SDK 的实际路径。

```bash
/path/to/wasi-sdk/bin/clang -O3 \
    -Iinclude -Isrc/gen \
    src/gen/plugin.c src/pumpkin_api.c main.c \
    -o my_plugin.wasm \
    -mexec-model=reactor
```

这将生成一个 `my_plugin.wasm` 文件，您可以将其放在 Pumpkin 服务器的 `plugins` 文件夹中。
