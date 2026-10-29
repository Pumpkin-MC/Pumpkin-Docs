# Quick Start

Pumpkin-Plugins können in [TypeScript](https://www.typescriptlang.org/) mit den offiziellen [`@pumpkinmc/pumpkin-api-ts`](https://github.com/Pumpkin-MC/pumpkin-api-ts)-Bindings geschrieben werden. Ein Plugin wird in eine WebAssembly-Komponente kompiliert, die der Server aus dem `plugins/`-Ordner lädt.

## Voraussetzungen

Stelle sicher, dass Folgendes installiert ist:
- [Node.js](https://nodejs.org/) (Version 18 oder neuer)
- `npm`

## Projekt einrichten

1. Erstelle ein Projektverzeichnis und initialisiere es:

```bash
mkdir my-typescript-plugin
cd my-typescript-plugin
npm init -y
```

2. Installiere die Pumpkin TypeScript Bindings:

```bash
npm install https://github.com/Pumpkin-MC/pumpkin-api-ts/releases/download/CI/pumpkinmc-pumpkin-api-ts-XXXXXXXX.tgz
```

3. Füge ein Build-Skript in `package.json` hinzu:

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

## Plugin schreiben

Erstelle `src/index.ts`:

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
      authors: ["Du"],
      description: "Ein Beispiel-Plugin in TypeScript",
      dependencies: [],
      permissions: [],
    };
  }

  onLoad(ctx: Context): void {
    super.onLoad(ctx);
    logging.log("info", "Hallo aus dem TypeScript Plugin!");

    this.registerEvent(
      ctx,
      "player-join-event",
      (_srv, evt: PlayerJoinEventData) => {
        logging.log("info", `Spieler ${evt.player.getName()} ist beigetreten!`);
        evt.player
          .getWorld()
          .broadcastSystemMessage(
            TextComponent.text(
              `Willkommen ${evt.player.getName()} auf dem Server!`,
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

## Kompilieren und Ausführen

```bash
npm run build
cp build/my-plugin.wasm /pfad/zu/pumpkin/plugins/
```
