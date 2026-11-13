# 基本逻辑

本节介绍使用 TypeScript 开发 Pumpkin 插件时可用的核心架构、生命周期方法和内置实用工具。

## 插件结构

每个 TypeScript 插件都继承自 `@pumpkinmc/pumpkin-api-ts` 提供的 `Plugin` 基类。

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

## 生命周期方法

- **`metadata()`**：返回包含插件名称、版本、作者、描述、依赖项和权限的 `PluginMetadata` 对象。这是纯描述方法，不得调用宿主导入。
- **`onLoad(ctx: Context)`**：在注册后调用。使用此方法配置命令、事件和初始任务。始终调用 `super.onLoad(ctx)`。
- **`onUnload(ctx: Context)`**：在服务器停止或插件卸载时调用。使用此方法清理资源或持久化状态。
- **`handleIpcMessage(sender: PluginId, message: IpcMessage)`**：用于处理其他插件发送消息的可选方法。

## 内置辅助方法

`Plugin` 类在 `this` 上提供用于常见插件任务的辅助方法：

### 事件注册
```typescript
this.registerEvent(
  ctx,
  "player-join-event",
  (srv, evt) => {
    // 处理事件
  },
  "normal", // 可选优先级：'lowest' | 'low' | 'normal' | 'high' | 'highest'
  true,     // 可选阻塞布尔值：true 会等待处理器结果
);
```

### 命令注册
```typescript
this.registerCommand(
  ctx,
  command,
  (sender, srv, args) => {
    return 1;
  },
  "my_plugin.permission", // 可选权限字符串
);
```

### 计划任务
```typescript
// 延迟任务（tick）
this.scheduleDelayedTask(20, (srv) => {
  logging.log("info", "Executed after 20 ticks!");
});

// 重复任务（delayTicks、periodTicks）
this.scheduleRepeatingTask(0, 100, (srv) => {
  logging.log("info", "Executed every 5 seconds (100 ticks)!");
});
```

## 日志和文本

Pumpkin 通过 `pumpkin:plugin/logging@0.1.0` 提供结构化日志，并通过 `pumpkin:plugin/text@0.1.0` 创建富文本：

```typescript
import * as logging from "pumpkin:plugin/logging@0.1.0";
import { TextComponent } from "pumpkin:plugin/text@0.1.0";

// 日志级别：'trace'、'debug'、'info'、'warn'、'error'
logging.log("info", "Informational server log");
logging.log("warn", "Warning message");

// 创建文本组件
const message = TextComponent.text("Hello players!");
```
