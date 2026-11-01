# 快速入门

本指南将帮助你开始使用 C 或 C++ 编写 Pumpkin 服务器插件。

## 前提条件

在开始之前，请确保已安装以下内容：
- [wasi-sdk](https://github.com/WebAssembly/wasi-sdk/releases)（建议使用 24 或更高版本，提供 `wasm32-wasip2-clang`）
- `curl` 和 `tar`（或手动下载工具）

## 设置项目

1. 从 [CI 发布页面](https://github.com/Pumpkin-MC/pumpkin-api-c/releases/tag/CI)下载最新版本的 C 绑定包：

```bash
# 下载并解压归档文件（将 <hash> 替换为当前提交哈希）
curl -OL https://github.com/Pumpkin-MC/pumpkin-api-c/releases/download/CI/pumpkin-api-c-<hash>.tar.xz
tar -xJvf pumpkin-api-c-<hash>.tar.xz
mv pumpkin-api-c-<hash> pumpkin-api
```

该文件夹提供 `pumpkin-api/include` 头文件和预构建的静态库 `pumpkin-api/lib/libpumpkin-api.a`。

## 创建你的第一个插件

在 `pumpkin-api` 目录旁创建一个名为 `main.c` 的文件：

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

## 构建插件

使用 `wasi-sdk` 中的 `wasm32-wasip2-clang` 将插件编译为 WebAssembly。将 `/path/to/wasi-sdk` 替换为你的实际安装路径：

```bash
/path/to/wasi-sdk/bin/wasm32-wasip2-clang -Oz \
    -Ipumpkin-api/include \
    pumpkin-api/lib/libpumpkin-api.a \
    main.c \
    -o my_plugin.wasm \
    -mexec-model=reactor
```

这会生成 `my_plugin.wasm`。将此文件放入 Pumpkin 服务器的 `plugins/` 目录，然后启动服务器。
