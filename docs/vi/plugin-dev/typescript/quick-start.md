# Khởi động nhanh

Plugin Pumpkin có thể được viết bằng [TypeScript](https://www.typescriptlang.org/) sử dụng các binding chính thức [`@pumpkinmc/pumpkin-api-ts`](https://github.com/Pumpkin-MC/pumpkin-api-ts). Một plugin được biên dịch thành một WebAssembly component mà máy chủ tải từ thư mục `plugins/` của nó.

## Yêu cầu trước

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt:
- [Node.js](https://nodejs.org/) (phiên bản 18 trở lên được khuyến nghị)
- `npm` ( đi kèm với Node.js)

## Thiết lập dự án

1. Tạo một thư mục mới cho plugin của bạn và khởi tạo một dự án Node.js:

```bash
mkdir my-typescript-plugin
cd my-typescript-plugin
npm init -y
```

2. Cài đặt binding TypeScript Pumpkin từ [bản phát hành CI](https://github.com/Pumpkin-MC/pumpkin-api-ts/releases/tag/CI):

```bash
npm install https://github.com/Pumpkin-MC/pumpkin-api-ts/releases/download/CI/pumpkinmc-pumpkin-api-ts-XXXXXXXX.tgz
```

> [!MẸO]
> Bạn cũng có thể tải xuống tệp `.tgz` mới nhất từ trang [GitHub Releases](https://github.com/Pumpkin-MC/pumpkin-api-ts/releases) và chạy `npm install ./pumpkinmc-pumpkin-api-ts-*.tgz`.

3. Thêm script build vào `package.json` của bạn:

```json [package.json]
{
  "name": "my-typescript-plugin",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "build": "pumpkin-plugin-build src/index.ts build/my-plugin.wasm"
  },
  "dependencies": {
    "@pumpkinmc/pumpkin-api-ts": "..."
  }
}
```

Công cụ `pumpkin-plugin-build` đóng gói mã nguồn TypeScript của bạn bằng `esbuild` và chuyển đổi JavaScript bundle thành một WebAssembly component.

## Viết plugin

Tạo `src/index.ts` với điểm nhập plugin của bạn:

```typescript [src/index.ts]
import { Plugin, registerPlugin } from "@pumpkinmc/pumpkin-api-ts";
import { PluginMetadata } from "pumpkin:plugin/metadata@0.1.0";
import { Context } from "pumpkin:plugin/context@0.1.0";
import { TextComponent } from "pumpkin:plugin/text@0.1.0";
import * as logging from "pumpkin:plugin/logging@0.1.0";
import { PlayerJoinEventData } from "pumpkin:plugin/event@0.1.0";

class MyPlugin extends Plugin {
  metadata(): PluginMetadata {
    return {
      name: "My TypeScript Plugin",
      version: "0.1.0",
      authors: ["You"],
      description: "A sample plugin written in TypeScript",
      dependencies: [],
      permissions: [],
    };
  }

  onLoad(ctx: Context): void {
    super.onLoad(ctx);
    logging.log("info", "Hello from TypeScript plugin!");

    this.registerEvent(
      ctx,
      "player-join-event",
      (_srv, evt: PlayerJoinEventData) => {
        logging.log("info", `Player ${evt.player.getName()} joined!`);

        evt.player
          .getWorld()
          .broadcastSystemMessage(
            TextComponent.text(
              `Welcome ${evt.player.getName()} to the server!`,
            ),
            false,
          );
      },
    );
  }
}

registerPlugin(new MyPlugin());

export * from "@pumpkinmc/pumpkin-api-ts";
```

### Các yếu tố chính

- **Lớp `Plugin`**: Kế thừa `Plugin` và triển khai phương thức `metadata()`.
- **`metadata()`**: Trả về thông tin plugin (`name`, `version`, `authors`, `description`, `dependencies`, và `permissions`).
- **`onLoad(ctx)`**: Được gọi khi plugin được tải bởi Pumpkin. Luôn gọi `super.onLoad(ctx)` để đăng ký các handler đang chờ.
- **`registerPlugin(...)`**: Đăng ký instance plugin của bạn với runtime.
- **`export * from "@pumpkinmc/pumpkin-api-ts"`**: Re-export các symbol WASI component cần thiết để thỏa mãn hợp đồng WIT world.

## Biên dịch và chạy

Biên dịch plugin thành một WebAssembly component:

```bash
npm run build
```

Thao tác này tạo ra `build/my-plugin.wasm`. Sao chép tệp này vào thư mục `plugins/` của máy chủ Pumpkin và khởi động máy chủ:

```bash
cp build/my-plugin.wasm /path/to/pumpkin/plugins/
```

Khi máy chủ khởi động, bạn sẽ thấy plugin TypeScript của mình được tải trong console:

```text
[INFO] Hello from TypeScript plugin!
```
