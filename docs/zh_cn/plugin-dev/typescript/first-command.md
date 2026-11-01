# 创建你的第一个命令

使用 TypeScript 在 Pumpkin 中注册和处理自定义命令，可以获得强类型且清晰的代码结构。

---

## 1. 快速示例

下面是一个完整的 TypeScript 插件文件（`src/index.ts`），它会注册一个带权限检查的 `/hello` 命令，并向玩家发送响应。

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

    // 1. 注册权限节点
    const permission: Permission = {
      node: "my_ts_plugin:hello",
      description: "Allows executing the /hello command",
      default: { tag: "allow" },
      children: [],
    };
    ctx.registerPermission(permission);

    // 2. 构建带别名的命令树
    const cmd = new Command(["hello", "hi"], "Greets the player");

    // 3. 注册命令及其处理器和权限
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

## 2. 游戏内预览

命令注册后，Minecraft 客户端会自动为其提供自动补全、语法验证和颜色高亮：

<img src="/assets/first_command_preview.png" alt="游戏内命令自动补全预览" width="500"/>

---

## 3. 工作原理

::: details 分步解析

### 步骤 1：定义权限节点
Pumpkin 中的命令需要权限节点。使用 `default: { tag: "allow" }` 注册，默认允许所有玩家执行：
```typescript
const permission: Permission = {
  node: "my_ts_plugin:hello",
  description: "Allows executing the /hello command",
  default: { tag: "allow" },
  children: [],
};
ctx.registerPermission(permission);
```

### 步骤 2：构建命令树
使用主名称、别名和描述实例化一个 `Command`：
```typescript
const cmd = new Command(["hello", "hi"], "Greets the player");
```

### 步骤 3：注册命令并处理执行
将命令树和权限节点传给 `this.registerCommand(...)`，成功执行时返回 `1`：
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

## 后续步骤

- 查看[事件](./events)，了解如何在 TypeScript 中处理玩家操作和服务器事件。
- 进一步了解[基本逻辑](./basic-logic)。
