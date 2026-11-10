# Khởi Động Nhanh

Hướng dẫn này sẽ giúp bạn bắt đầu viết plugin cho máy chủ Pumpkin sử dụng C hoặc C++.

## Yêu cầu trước

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt các thứ sau:
- [wasi-sdk](https://github.com/WebAssembly/wasi-sdk/releases) (phiên bản 24 trở lên được khuyến nghị, cung cấp `wasm32-wasip2-clang`)
- `curl` và `tar` (hoặc công cụ tải thủ công)

## Thiết lập dự án

1. Tải xuống phiên bản mới nhất của gói C bindings từ [CI release](https://github.com/Pumpkin-MC/pumpkin-api-c/releases/tag/CI):

```bash
# Tải xuống và giải nén tệp lưu trữ (thay thế <hash> bằng commit hash hiện tại)
curl -OL https://github.com/Pumpkin-MC/pumpkin-api-c/releases/download/CI/pumpkin-api-c-<hash>.tar.xz
tar -xJvf pumpkin-api-c-<hash>.tar.xz
mv pumpkin-api-c-<hash> pumpkin-api
```

Thư mục này cung cấp các header `pumpkin-api/include` và thư viện tĩnh đã được build sẵn `pumpkin-api/lib/libpumpkin-api.a`.

## Tạo plugin đầu tiên của bạn

Tạo một tệp có tên `main.c` bên cạnh thư mục `pumpkin-api` của bạn:

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

## Build plugin

Biên dịch plugin của bạn thành WebAssembly sử dụng `wasm32-wasip2-clang` từ `wasi-sdk`. Thay thế `/path/to/wasi-sdk` bằng đường dẫn cài đặt thực tế của bạn:

```bash
/path/to/wasi-sdk/bin/wasm32-wasip2-clang -Oz \
    -Ipumpkin-api/include \
    pumpkin-api/lib/libpumpkin-api.a \
    main.c \
    -o my_plugin.wasm \
    -mexec-model=reactor
```

Lệnh này tạo ra `my_plugin.wasm`. Đặt tệp này vào thư mục `plugins/` của máy chủ Pumpkin và khởi động máy chủ.
