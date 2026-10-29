# Snelle Start

Pumpkin-plugins kunnen worden geschreven in [TypeScript](https://www.typescriptlang.org/) met behulp van de officiële [`@pumpkinmc/pumpkin-api-ts`](https://github.com/Pumpkin-MC/pumpkin-api-ts) bindings. Een plugin wordt gecompileerd naar een WebAssembly-component die de server laadt vanuit de map `plugins/`.

## Vereisten

- [Node.js](https://nodejs.org/) (versie 18 of nieuwer)
- `npm`

## Project instellen

```bash
mkdir my-typescript-plugin
cd my-typescript-plugin
npm init -y
npm install https://github.com/Pumpkin-MC/pumpkin-api-ts/releases/download/CI/pumpkinmc-pumpkin-api-ts-XXXXXXXX.tgz
```

Voeg een build-script toe aan `package.json`:

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

## Plugin schrijven

Maak `src/index.ts`:

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
      authors: ["Jij"],
      description: "Een voorbeeldplugin geschreven in TypeScript",
      dependencies: [],
      permissions: [],
    };
  }

  onLoad(ctx: Context): void {
    super.onLoad(ctx);
    logging.log("info", "Hallo vanuit TypeScript plugin!");

    this.registerEvent(
      ctx,
      "player-join-event",
      (_srv, evt: PlayerJoinEventData) => {
        logging.log("info", `Speler ${evt.player.getName()} is binnengekomen!`);
        evt.player
          .getWorld()
          .broadcastSystemMessage(
            TextComponent.text(
              `Welkom ${evt.player.getName()} op de server!`,
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

## Bouwen en uitvoeren

```bash
npm run build
cp build/my-plugin.wasm /pad/naar/pumpkin/plugins/
```
