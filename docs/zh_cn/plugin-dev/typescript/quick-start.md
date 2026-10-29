# 快速入门

你可以使用官方的 [`@pumpkinmc/pumpkin-api-ts`](https://github.com/Pumpkin-MC/pumpkin-api-ts) 绑定，使用 [TypeScript](https://www.typescriptlang.org/) 编写 Pumpkin 插件。插件会被编译为 WebAssembly 组件，服务器将从 `plugins/` 目录中加载它。

## 前置要求

- [Node.js](https://nodejs.org/) (版本 18 或更高版本)
- `npm`

## 初始化项目

```bash
mkdir my-typescript-plugin
cd my-typescript-plugin
npm init -y
npm install https://github.com/Pumpkin-MC/pumpkin-api-ts/releases/download/CI/pumpkinmc-pumpkin-api-ts-XXXXXXXX.tgz
```

在 `package.json` 中添加构建脚本：

```json [package.json]
{
  "name": "my-typescript-plugin",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "build": "pumpkin-plugin-build src/index.ts build/my-plugin.wasm"
  }
}
```

## 编写插件

创建 `src/index.ts`：

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
      name: "my-typescript-plugin",
      version: "0.1.0",
      authors: ["你"],
      description: "使用 TypeScript 编写的示例插件",
      dependencies: [],
      permissions: [],
    };
  }

  onLoad(ctx: Context): void {
    super.onLoad(ctx);
    logging.log("info", "来自 TypeScript 插件的问候！");

    this.registerEvent(
      ctx,
      "player-join-event",
      (_srv, evt: PlayerJoinEventData) => {
        logging.log("info", `玩家 ${evt.player.getName()} 加入了游戏！`);
        evt.player
          .getWorld()
          .broadcastSystemMessage(
            TextComponent.text(
              `欢迎 ${evt.player.getName()} 来到服务器！`,
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

## 构建与运行

```bash
npm run build
cp build/my-plugin.wasm /path/to/pumpkin/plugins/
```
