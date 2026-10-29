# クイックスタート

Pumpkinプラグインは、公式の[`@pumpkinmc/pumpkin-api-ts`](https://github.com/Pumpkin-MC/pumpkin-api-ts)バインディングを使用して[TypeScript](https://www.typescriptlang.org/)で記述できます。プラグインはWebAssemblyコンポーネントにコンパイルされ、サーバーの`plugins/`フォルダーからロードされます。

## 前提条件

- [Node.js](https://nodejs.org/) (バージョン 18 以降)
- `npm`

## プロジェクトのセットアップ

```bash
mkdir my-typescript-plugin
cd my-typescript-plugin
npm init -y
npm install https://github.com/Pumpkin-MC/pumpkin-api-ts/releases/download/CI/pumpkinmc-pumpkin-api-ts-XXXXXXXX.tgz
```

`package.json` にビルドスクリプトを追加します:

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

## プラグインの作成

`src/index.ts` を作成します:

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
      authors: ["あなた"],
      description: "TypeScriptで書かれたサンプルプラグイン",
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

## ビルドと実行

```bash
npm run build
cp build/my-plugin.wasm /path/to/pumpkin/plugins/
```
