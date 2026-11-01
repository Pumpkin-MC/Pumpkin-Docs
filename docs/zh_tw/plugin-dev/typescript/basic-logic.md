# 基本邏輯

本節介紹使用 TypeScript 開發 Pumpkin 插件時可用的核心架構、生命週期方法和內建實用工具。

## 插件結構

每個 TypeScript 插件都繼承自 `@pumpkinmc/pumpkin-api-ts` 提供的 `Plugin` 基類。

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

## 生命週期方法

- **`metadata()`**：返回包含插件名稱、版本、作者、描述、依賴項和權限的 `PluginMetadata` 物件。這是純描述方法，不得呼叫主機匯入。
- **`onLoad(ctx: Context)`**：在註冊後呼叫。使用此方法設定指令、事件和初始任務。始終呼叫 `super.onLoad(ctx)`。
- **`onUnload(ctx: Context)`**：在伺服器停止或插件解除安裝時呼叫。使用此方法清理資源或持久化狀態。
- **`handleIpcMessage(sender: PluginId, message: IpcMessage)`**：用於處理其他插件傳送訊息的可選方法。

## 內建輔助方法

`Plugin` 類在 `this` 上提供用於常見插件任務的輔助方法：

### 事件註冊
```typescript
this.registerEvent(
  ctx,
  "player-join-event",
  (srv, evt) => {
    // 處理事件
  },
  "normal", // 可選優先順序：'lowest' | 'low' | 'normal' | 'high' | 'highest'
  true,     // 可選阻塞布林值：true 會等待處理器結果
);
```

### 指令註冊
```typescript
this.registerCommand(
  ctx,
  command,
  (sender, srv, args) => {
    return 1;
  },
  "my_plugin.permission", // 可選權限字串
);
```

### 計劃任務
```typescript
// 延遲任務（tick）
this.scheduleDelayedTask(20, (srv) => {
  logging.log("info", "Executed after 20 ticks!");
});

// 重複任務（delayTicks、periodTicks）
this.scheduleRepeatingTask(0, 100, (srv) => {
  logging.log("info", "Executed every 5 seconds (100 ticks)!");
});
```

## 日誌和文字

Pumpkin 透過 `pumpkin:plugin/logging@0.1.0` 提供結構化日誌，並透過 `pumpkin:plugin/text@0.1.0` 建立富文字：

```typescript
import * as logging from "pumpkin:plugin/logging@0.1.0";
import { TextComponent } from "pumpkin:plugin/text@0.1.0";

// 日誌級別：'trace'、'debug'、'info'、'warn'、'error'
logging.log("info", "Informational server log");
logging.log("warn", "Warning message");

// 建立文字元件
const message = TextComponent.text("Hello players!");
```
