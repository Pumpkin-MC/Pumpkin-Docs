# Logic cơ bản

Phần này bao gồm kiến trúc cốt lõi, các phương thức vòng đời và các tiện ích tích hợp sẵn có khi phát triển plugin Pumpkin bằng TypeScript.

## Cấu trúc plugin

Mọi plugin TypeScript đều kế thừa từ lớp cơ sở `Plugin` được cung cấp bởi `@pumpkinmc/pumpkin-api-ts`.

```typescript [src/index.ts]
import { Plugin, registerPlugin } from "@pumpkinmc/pumpkin-api-ts";
import { PluginMetadata } from "pumpkin:plugin/metadata@0.1.0";
import { Context } from "pumpkin:plugin/context@0.1.0";
import * as logging from "pumpkin:plugin/logging@0.1.0";

class MyPlugin extends Plugin {
  metadata(): PluginMetadata {
    return {
      name: "my-ts-plugin",
      version: "0.1.0",
      authors: ["Developer"],
      description: "Plugin structure and basic logic",
      dependencies: [],
      permissions: [],
    };
  }

  onLoad(ctx: Context): void {
    super.onLoad(ctx);
    logging.log("info", "Plugin loaded successfully!");
  }

  onUnload(ctx: Context): void {
    super.onUnload(ctx);
    logging.log("info", "Plugin unloaded. Cleaning up...");
  }
}

registerPlugin(new MyPlugin());

export * from "@pumpkinmc/pumpkin-api-ts";
```

## Các phương thức vòng đời

- **`metadata()`**: Trả về một đối tượng `PluginMetadata` với tên, phiên bản, tác giả, mô tả, phụ thuộc và quyền của plugin. Đây là phương thức mô tả thuần túy và không được gọi các import của host.
- **`onLoad(ctx: Context)`**: Được gọi sau khi đăng ký. Sử dụng phương thức này để cấu hình lệnh, sự kiện và các tác vụ ban đầu. Luôn gọi `super.onLoad(ctx)`.
- **`onUnload(ctx: Context)`**: Được gọi khi máy chủ dừng hoặc plugin được dỡ bỏ. Sử dụng phương thức này để dọn dẹp tài nguyên hoặc lưu trữ trạng thái.
- **`handleIpcMessage(sender: PluginId, message: IpcMessage)`**: Phương thức tùy chọn để xử lý các tin nhắn được gửi từ các plugin khác.

## Các phương thức hỗ trợ tích hợp sẵn

Lớp `Plugin` cung cấp các phương thức hỗ trợ trên `this` cho các tác vụ plugin phổ biến:

### Đăng ký sự kiện
```typescript
this.registerEvent(
  ctx,
  "player-join-event",
  (srv, evt) => {
    // Xử lý sự kiện
  },
  "normal", // độ ưu tiên tùy chọn: 'lowest' | 'low' | 'normal' | 'high' | 'highest'
  true,     // boolean chặn tùy chọn: true đợi kết quả handler
);
```

### Đăng ký lệnh
```typescript
this.registerCommand(
  ctx,
  command,
  (sender, srv, args) => {
    return 1;
  },
  "my_plugin.permission", // chuỗi quyền tùy chọn
);
```

### Các tác vụ đã lên lịch
```typescript
// Tác vụ trì hoãn (ticks)
this.scheduleDelayedTask(20, (srv) => {
  logging.log("info", "Executed after 20 ticks!");
});

// Tác vụ lặp lại (delayTicks, periodTicks)
this.scheduleRepeatingTask(0, 100, (srv) => {
  logging.log("info", "Executed every 5 seconds (100 ticks)!");
});
```

## Ghi log và văn bản

Pumpkin cung cấp ghi log có cấu trúc thông qua `pumpkin:plugin/logging@0.1.0` và tạo văn bản phong phú với `pumpkin:plugin/text@0.1.0`:

```typescript
import * as logging from "pumpkin:plugin/logging@0.1.0";
import { TextComponent } from "pumpkin:plugin/text@0.1.0";

// Các cấp độ log: 'trace', 'debug', 'info', 'warn', 'error'
logging.log("info", "Informational server log");
logging.log("warn", "Warning message");

// Tạo text component
const message = TextComponent.text("Hello players!");
```
