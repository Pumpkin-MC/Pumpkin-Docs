# Bắt đầu nhanh

Hướng dẫn này sẽ giúp bạn bắt đầu viết các plugin cho máy chủ Pumpkin bằng ngôn ngữ C.

## Yêu cầu tiên quyết

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt các công cụ sau:
- [wasi-sdk](https://github.com/WebAssembly/wasi-sdk/releases) (để biên dịch C sang WASI)
- `git` (để clone API)

## Thiết lập dự án

Đầu tiên, hãy clone kho lưu trữ Pumpkin C API cùng với các submodule:

```bash
git clone --recursive https://github.com/Pumpkin-MC/pumpkin-api-c.git
cd pumpkin-api-c
```

## Tạo plugin đầu tiên của bạn

Tạo một tập tin có tên `main.c` ở thư mục gốc của kho lưu trữ và thêm nội dung sau:

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
        .description = "A simple C plugin for Pumpkin",
        .dependencies_count = 0
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

## Biên dịch plugin

Để biên dịch plugin của bạn thành một thành phần WebAssembly, hãy sử dụng trình biên dịch `clang` từ bản cài đặt `wasi-sdk` của bạn. 

Thay thế `/path/to/wasi-sdk` bằng đường dẫn thực tế đến WASI SDK của bạn.

```bash
/path/to/wasi-sdk/bin/clang -O3 \
    -Iinclude -Isrc/gen \
    src/gen/plugin.c src/pumpkin_api.c main.c \
    -o my_plugin.wasm \
    -mexec-model=reactor
```

Thao tác này sẽ tạo ra một tập tin `my_plugin.wasm` mà bạn có thể đặt vào thư mục `plugins` của máy chủ Pumpkin.