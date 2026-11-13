# 快速入門

本指南將幫助你開始使用 C 或 C++ 編寫 Pumpkin 伺服器插件。

## 前提條件

在開始之前，請確保已安裝以下內容：
- [wasi-sdk](https://github.com/WebAssembly/wasi-sdk/releases)（建議使用 31 或更高版本，提供 `wasm32-wasip3-clang`）
- `curl` 和 `tar`（或手動下載工具）

## 設定專案

1. 從 [CI 釋出頁面](https://github.com/Pumpkin-MC/pumpkin-api-c/releases/tag/CI)下載最新版本的 C 綁定包：

```bash
# 下載並解壓歸檔檔案（將 <hash> 替換為目前提交雜湊）
curl -OL https://github.com/Pumpkin-MC/pumpkin-api-c/releases/download/CI/pumpkin-api-c-<hash>.tar.xz
tar -xJvf pumpkin-api-c-<hash>.tar.xz
mv pumpkin-api-c-<hash> pumpkin-api
```

該資料夾提供 `pumpkin-api/include` 標頭檔案和預建構的靜態庫 `pumpkin-api/lib/libpumpkin-api.a`。

## 建立你的第一個插件

在 `pumpkin-api` 目錄旁建立一個名為 `main.c` 的檔案：

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

## 建構插件

使用 `wasi-sdk` 中的 `wasm32-wasip3-clang` 將插件編譯為 WebAssembly。將 `/path/to/wasi-sdk` 替換為你的實際安裝路徑：

```bash
/path/to/wasi-sdk/bin/wasm32-wasip3-clang -Oz \
    -Ipumpkin-api/include \
    pumpkin-api/lib/libpumpkin-api.a \
    main.c \
    -o my_plugin.wasm \
    -mexec-model=reactor
```

這會生成 `my_plugin.wasm`。將此檔案放入 Pumpkin 伺服器的 `plugins/` 目錄，然後啟動伺服器。
