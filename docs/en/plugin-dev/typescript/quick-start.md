# Quick Start

Pumpkin plugins can be written in [TypeScript](https://www.typescriptlang.org/) using the official [`@pumpkinmc/pumpkin-api-ts`](https://github.com/Pumpkin-MC/pumpkin-api-ts) bindings. A plugin compiles to a WebAssembly component that the server loads from its `plugins/` directory.

## Prerequisites

Before getting started, make sure you have installed:
- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- `npm` (bundled with Node.js)

## Setting up a project

1. Create a new directory for your plugin and initialize a Node.js project:

```bash
mkdir my-typescript-plugin
cd my-typescript-plugin
npm init -y
```

2. Install the Pumpkin TypeScript bindings from the [CI release](https://github.com/Pumpkin-MC/pumpkin-api-ts/releases/tag/CI):

```bash
npm install https://github.com/Pumpkin-MC/pumpkin-api-ts/releases/download/CI/pumpkinmc-pumpkin-api-ts-XXXXXXXX.tgz
```

> [!TIP]
> You can also download the latest `.tgz` archive from the [GitHub Releases](https://github.com/Pumpkin-MC/pumpkin-api-ts/releases) page and run `npm install ./pumpkinmc-pumpkin-api-ts-*.tgz`.

3. Add a build script to your `package.json`:

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

The `pumpkin-plugin-build` tool bundles your TypeScript source code using `esbuild` and componentizes the JavaScript bundle into a WebAssembly component.

## Writing the plugin

Create `src/index.ts` with your plugin entry point:

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

### Key Elements

- **`Plugin` Class**: Extend `Plugin` and implement the `metadata()` method.
- **`metadata()`**: Returns plugin information (`name`, `version`, `authors`, `description`, `dependencies`, and `permissions`).
- **`onLoad(ctx)`**: Called when the plugin is loaded by Pumpkin. Always call `super.onLoad(ctx)` to register pending handlers.
- **`registerPlugin(...)`**: Registers your plugin instance with the runtime.
- **`export * from "@pumpkinmc/pumpkin-api-ts"`**: Re-exports required WASI component symbols to satisfy the WIT world contract.

## Building and running

Compile the plugin into a WebAssembly component:

```bash
npm run build
```

This generates `build/my-plugin.wasm`. Copy this file into your Pumpkin server's `plugins/` folder and start the server:

```bash
cp build/my-plugin.wasm /path/to/pumpkin/plugins/
```

When the server starts, you will see your TypeScript plugin loaded in the console:

```text
[INFO] Hello from TypeScript plugin!
```
