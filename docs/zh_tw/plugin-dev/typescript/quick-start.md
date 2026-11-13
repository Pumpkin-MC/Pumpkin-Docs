# 快速入門

你可以使用官方的 [`@pumpkinmc/pumpkin-api-ts`](https://github.com/Pumpkin-MC/pumpkin-api-ts) 綁定，以 [TypeScript](https://www.typescriptlang.org/) 編寫 Pumpkin 插件。插件會編譯為 WebAssembly 元件，由伺服器從其 `plugins/` 目錄載入。

## 前提條件

在開始之前，請確保已安裝：
- [Node.js](https://nodejs.org/)（建議使用 18 或更高版本）
- `npm`（隨 Node.js 一起提供）

## 設定專案

1. 為插件建立一個新目錄，並初始化 Node.js 專案：

```bash
mkdir my-typescript-plugin
cd my-typescript-plugin
npm init -y
```

2. 從 [CI 釋出頁面](https://github.com/Pumpkin-MC/pumpkin-api-ts/releases/tag/CI)安裝 Pumpkin TypeScript 綁定：

```bash
npm install https://github.com/Pumpkin-MC/pumpkin-api-ts/releases/download/CI/pumpkinmc-pumpkin-api-ts-XXXXXXXX.tgz
```

> [!TIP]
> 你也可以從 [GitHub Releases](https://github.com/Pumpkin-MC/pumpkin-api-ts/releases) 頁面下載最新的 `.tgz` 歸檔檔案，然後執行 `npm install ./pumpkinmc-pumpkin-api-ts-*.tgz`。

3. 在 `package.json` 中新增建構指令碼：

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

`pumpkin-plugin-build` 工具使用 `esbuild` 打包你的 TypeScript 原始碼，並將 JavaScript 包元件化為 WebAssembly 元件。

## 編寫插件

建立 `src/index.ts` 作為插件入口點：

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

### 關鍵要素

- **`Plugin` 類**：繼承 `Plugin` 並實現 `metadata()` 方法。
- **`metadata()`**：返回插件資訊（`name`、`version`、`authors`、`description`、`dependencies` 和 `permissions`）。
- **`onLoad(ctx)`**：Pumpkin 載入插件時呼叫。始終呼叫 `super.onLoad(ctx)` 以註冊待處理的處理器。
- **`registerPlugin(...)`**：向執行階段註冊你的插件實例。
- **`export * from "@pumpkinmc/pumpkin-api-ts"`**：重新匯出所需的 WASI 元件符號，以滿足 WIT world 約定。

## 建構並執行

將插件編譯為 WebAssembly 元件：

```bash
npm run build
```

這會生成 `build/my-plugin.wasm`。將此檔案複製到 Pumpkin 伺服器的 `plugins/` 資料夾，然後啟動伺服器：

```bash
cp build/my-plugin.wasm /path/to/pumpkin/plugins/
```

伺服器啟動時，你將在主控台看到 TypeScript 插件已載入：

```text
[INFO] Hello from TypeScript plugin!
```
