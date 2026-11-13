# Bắt đầu nhanh

Hướng dẫn này sẽ giúp bạn bắt đầu viết plugin cho Pumpkin server bằng [ngôn ngữ D](https://dlang.org/).

Các plugin D cho Pumpkin được biên dịch thành các thành phần WebAssembly (Wasm) sử dụng các binding chính thức [`pumpkin-api-d`](https://github.com/Pumpkin-MC/pumpkin-api-d).

---

## Yêu cầu trước

Trước khi xây dựng plugin D cho Pumpkin, hãy đảm bảo bạn đã cài đặt các công cụ sau:

- **[LDC](https://github.com/ldc-developers/ldc)**: Phiên bản 1.43 trở lên (trình biên dịch D dựa trên LLVM).
- **`addon-wasi`**: Gói mục tiêu WASI cho LDC.
- **[DUB](https://dub.pm/)**: Công cụ quản lý gói và xây dựng D (thường đi kèm với LDC).

---

## 1. Thiết lập dự án

Tạo một thư mục mới cho dự án plugin của bạn và thêm file cấu hình `dub.json`:

```bash
mkdir my-d-plugin
cd my-d-plugin
```

Tạo `dub.json` trong thư mục gốc của dự án:

```json [dub.json]
{
    "name": "my-d-plugin",
    "description": "A minimal Pumpkin plugin built with D.",
    "license": "proprietary",
    "authors": ["You"],
    "copyright": "Copyright © 2026, You",

    "dependencies": {
        "pumpkin-api-d": "~>0.1.0"
    },

    "targetType": "executable",
    "dflags": ["-Xcc=-mexec-model=reactor"],
    "buildTypes": {
        "debug": {
            "buildOptions": ["debugMode", "debugInfo"]
        },
        "release": {
            "buildOptions": ["optimize", "inline"],
            "dflags": ["-L-S"]
        }
    }
}
```

> [!NOTE]
> Cờ `-Xcc=-mexec-model=reactor` được yêu cầu bởi trình liên kết WebAssembly để plugin được xử lý như một reactor (thành phần tiết lộ các điểm đầu vào) thay vì một chương trình dòng lệnh với điểm thoát.

---

## 2. Viết Plugin

Tạo thư mục `source` và đặt code của bạn trong `source/app.d`:

```d [source/app.d]
module plugin;

import wit.pumpkin.plugin.plugin;
import wit.common;
import pumpkin.register;

struct MyPlugin {
    @GetMetadata PluginMetadata getMetadata()
    {
        immutable(WitString)[$] authors = [
            "You".witList
        ];

        return (immutable PluginMetadata(
                name: "my-d-plugin".witList,
                version_: "0.1.0".witList,
                authors: authors.witList,
                description: "An example plugin in D.".witList,
                dependencies: WitList!WitString(),
                permissions: WitList!WitString()
        )).witClone;
    }

    @OnLoad
    Result!(void, WitString) onLoad(Context ctx)
    {
        scope (exit)
            ctx.witDrop; // Incoming resources must be cleaned up after use

        log(Level.info, "Hello from D plugin!".witList);
        return ok!WitString;
    }
}

mixin RegisterPlugin!MyPlugin;
```

### Các thành phần chính:
- **`@GetMetadata`**: Định nghĩa thông tin plugin (tên, phiên bản, tác giả, mô tả, quyền hạn) được Pumpkin yêu cầu khi tải thành phần.
- **`@OnLoad`**: Điểm đầu vào được gọi khi Pumpkin khởi tạo plugin. Đảm bảo các tài nguyên context đến (`ctx`) được giải phóng bằng `ctx.witDrop`.
- **`mixin RegisterPlugin!MyPlugin;`**: Tạo ra các xuất khẩu thành phần WebAssembly cần thiết và mã chuẩn bị được yêu cầu bởi trình tải WASM của Pumpkin.

---

## 3. Biên dịch Plugin

Biên dịch plugin của bạn thành một thành phần WebAssembly nhắm tới `wasm32-wasip2`:

```bash
dub build -b release -a wasm32-wasip2
```

Lệnh này tạo file `my-d-plugin.wasm` trong thư mục gốc dự án của bạn.

---

## 4. Chạy Plugin của bạn

1. Sao chép file `.wasm` đã biên dịch vào thư mục `plugins/` của server:
   ```bash
   cp my-d-plugin.wasm /path/to/pumpkin/plugins/
   ```
2. Khởi động hoặc khởi động lại Pumpkin:
   ```bash
   ./pumpkin
   ```
3. Kiểm tra nhật ký server để xác minh plugin của bạn đã được tải:
   ```text
   [INFO] Hello from D plugin!
   ```
