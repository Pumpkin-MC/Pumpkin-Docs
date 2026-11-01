# 快速入门

你可以使用官方的 [`@pumpkinmc/pumpkin-api-ts`](https://github.com/Pumpkin-MC/pumpkin-api-ts) 绑定，以 [TypeScript](https://www.typescriptlang.org/) 编写 Pumpkin 插件。插件会编译为 WebAssembly 组件，由服务器从其 `plugins/` 目录加载。

## 前提条件

在开始之前，请确保已安装：
- [Node.js](https://nodejs.org/)（建议使用 18 或更高版本）
- `npm`（随 Node.js 一起提供）

## 设置项目

1. 为插件创建一个新目录，并初始化 Node.js 项目：

```bash
mkdir my-typescript-plugin
cd my-typescript-plugin
npm init -y
```

2. 从 [CI 发布页面](https://github.com/Pumpkin-MC/pumpkin-api-ts/releases/tag/CI)安装 Pumpkin TypeScript 绑定：

```bash
npm install https://github.com/Pumpkin-MC/pumpkin-api-ts/releases/download/CI/pumpkinmc-pumpkin-api-ts-XXXXXXXX.tgz
```

> [!TIP]
> 你也可以从 [GitHub Releases](https://github.com/Pumpkin-MC/pumpkin-api-ts/releases) 页面下载最新的 `.tgz` 归档文件，然后运行 `npm install ./pumpkinmc-pumpkin-api-ts-*.tgz`。

3. 在 `package.json` 中添加构建脚本：

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

`pumpkin-plugin-build` 工具使用 `esbuild` 打包你的 TypeScript 源代码，并将 JavaScript 包组件化为 WebAssembly 组件。

## 编写插件

创建 `src/index.ts` 作为插件入口点：

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

### 关键要素

- **`Plugin` 类**：继承 `Plugin` 并实现 `metadata()` 方法。
- **`metadata()`**：返回插件信息（`name`、`version`、`authors`、`description`、`dependencies` 和 `permissions`）。
- **`onLoad(ctx)`**：Pumpkin 加载插件时调用。始终调用 `super.onLoad(ctx)` 以注册待处理的处理器。
- **`registerPlugin(...)`**：向运行时注册你的插件实例。
- **`export * from "@pumpkinmc/pumpkin-api-ts"`**：重新导出所需的 WASI 组件符号，以满足 WIT world 约定。

## 构建并运行

将插件编译为 WebAssembly 组件：

```bash
npm run build
```

这会生成 `build/my-plugin.wasm`。将此文件复制到 Pumpkin 服务器的 `plugins/` 文件夹，然后启动服务器：

```bash
cp build/my-plugin.wasm /path/to/pumpkin/plugins/
```

服务器启动时，你将在控制台看到 TypeScript 插件已加载：

```text
[INFO] Hello from TypeScript plugin!
```
