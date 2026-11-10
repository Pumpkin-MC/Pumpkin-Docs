# Tạo lệnh đầu tiên của bạn

Đăng ký và xử lý các lệnh tùy chỉnh trong Pumpkin bằng TypeScript cung cấp một cấu trúc mạnh mẽ về kiểu và sạch sẽ.

---

## 1. Ví dụ nhanh

Dưới đây là một tệp plugin TypeScript hoàn chỉnh (`src/index.ts`) đăng ký lệnh `/hello` với kiểm tra quyền và gửi phản hồi lại cho người chơi.

```typescript [src/index.ts]
import { Plugin, registerPlugin } from "@pumpkinmc/pumpkin-api-ts";
import { PluginMetadata } from "pumpkin:plugin/metadata@0.1.0";
import { Context } from "pumpkin:plugin/context@0.1.0";
import { Command } from "pumpkin:plugin/command@0.1.0";
import { Permission } from "pumpkin:plugin/permission@0.1.0";
import { TextComponent } from "pumpkin:plugin/text@0.1.0";

class HelloPlugin extends Plugin {
  metadata(): PluginMetadata {
    return {
      name: "my_ts_plugin",
      version: "0.1.0",
      authors: ["Developer"],
      description: "My first Pumpkin TypeScript plugin",
      dependencies: [],
      permissions: [],
    };
  }

  onLoad(ctx: Context): void {
    super.onLoad(ctx);

    // 1. Đăng ký node quyền
    const permission: Permission = {
      node: "my_ts_plugin:hello",
      description: "Allows executing the /hello command",
      default: { tag: "allow" },
      children: [],
    };
    ctx.registerPermission(permission);

    // 2. Xây dựng cây lệnh với alias
    const cmd = new Command(["hello", "hi"], "Greets the player");

    // 3. Đăng ký lệnh với handler và quyền
    this.registerCommand(
      ctx,
      cmd,
      (sender, _server, _args) => {
        sender.sendMessage(TextComponent.text("Hello from TypeScript Plugin!"));
        return 1;
      },
      "my_ts_plugin:hello",
    );
  }
}

registerPlugin(new HelloPlugin());

export * from "@pumpkinmc/pumpkin-api-ts";
```

---

## 2. Xem trước trong game

Sau khi đăng ký, lệnh của bạn sẽ tự động có tính năng tự động hoàn thành phía client, xác thực cú pháp và tô màu trong Minecraft:

<img src="/assets/first_command_preview.png" alt="Xem trước tự động hoàn thành lệnh trong game" width="500"/>

---

## 3. Cách hoạt động

::: details Phân tích từng bước

### Bước 1: Định nghĩa node quyền
Các lệnh trong Pumpkin yêu cầu một node quyền. Đăng ký nó với `default: { tag: "allow" }` để cho phép thực thi mặc định cho tất cả người chơi:
```typescript
const permission: Permission = {
  node: "my_ts_plugin:hello",
  description: "Allows executing the /hello command",
  default: { tag: "allow" },
  children: [],
};
ctx.registerPermission(permission);
```

### Bước 2: Xây dựng cây lệnh
Khởi tạo `Command` với tên chính, alias và mô tả:
```typescript
const cmd = new Command(["hello", "hi"], "Greets the player");
```

### Bước 3: Đăng ký lệnh và xử lý thực thi
Truyền cây lệnh và node quyền cho `this.registerCommand(...)`, trả về `1` để thực thi thành công:
```typescript
this.registerCommand(
  ctx,
  cmd,
  (sender, server, args) => {
    sender.sendMessage(TextComponent.text("Hello from TypeScript Plugin!"));
    return 1;
  },
  "my_ts_plugin:hello",
);
```

:::

---

## Các bước tiếp theo

- Xem [Sự kiện](./events) để xử lý các hành động của người chơi và sự kiện máy chủ trong TypeScript.
- Tìm hiểu thêm về [Logic cơ bản](./basic-logic).
