# Hızlı Başlangıç

Pumpkin eklentileri resmi [`@pumpkinmc/pumpkin-api-ts`](https://github.com/Pumpkin-MC/pumpkin-api-ts) bağlayıcıları kullanılarak [TypeScript](https://www.typescriptlang.org/) ile yazılabilir. Eklenti, sunucunun `plugins/` klasöründen yüklediği bir WebAssembly bileşeni olarak derlenir.

## Gereksinimler

- [Node.js](https://nodejs.org/) (sürüm 18 veya üzeri)
- `npm`

## Projeyi ayarlama

```bash
mkdir my-typescript-plugin
cd my-typescript-plugin
npm init -y
npm install https://github.com/Pumpkin-MC/pumpkin-api-ts/releases/download/CI/pumpkinmc-pumpkin-api-ts-XXXXXXXX.tgz
```

`package.json` dosyasına bir derleme betiği ekleyin:

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

## Eklentiyi yazma

`src/index.ts` oluşturun:

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
      authors: ["Sen"],
      description: "TypeScript ile yazılmış örnek eklenti",
      dependencies: [],
      permissions: [],
    };
  }

  onLoad(ctx: Context): void {
    super.onLoad(ctx);
    logging.log("info", "TypeScript eklentisinden merhaba!");

    this.registerEvent(
      ctx,
      "player-join-event",
      (_srv, evt: PlayerJoinEventData) => {
        logging.log("info", `${evt.player.getName()} sunucuya katıldı!`);
        evt.player
          .getWorld()
          .broadcastSystemMessage(
            TextComponent.text(
              `Sunucuya hoş geldin ${evt.player.getName()}!`,
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

## Derleme ve çalıştırma

```bash
npm run build
cp build/my-plugin.wasm /dosya/yolu/pumpkin/plugins/
```
