# Início Rápido

Plugins para Pumpkin podem ser escritos em [TypeScript](https://www.typescriptlang.org/) usando os bindings oficiais [`@pumpkinmc/pumpkin-api-ts`](https://github.com/Pumpkin-MC/pumpkin-api-ts). O plugin é compilado em um componente WebAssembly que o servidor carrega a partir de sua pasta `plugins/`.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- `npm`

## Configuração do projeto

```bash
mkdir my-typescript-plugin
cd my-typescript-plugin
npm init -y
npm install https://github.com/Pumpkin-MC/pumpkin-api-ts/releases/download/CI/pumpkinmc-pumpkin-api-ts-XXXXXXXX.tgz
```

Adicione um script de build ao `package.json`:

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

## Escrevendo o plugin

Crie `src/index.ts`:

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
      authors: ["Você"],
      description: "Um plugin de exemplo em TypeScript",
      dependencies: [],
      permissions: [],
    };
  }

  onLoad(ctx: Context): void {
    super.onLoad(ctx);
    logging.log("info", "Olá do plugin em TypeScript!");

    this.registerEvent(
      ctx,
      "player-join-event",
      (_srv, evt: PlayerJoinEventData) => {
        logging.log("info", `Jogador ${evt.player.getName()} entrou!`);
        evt.player
          .getWorld()
          .broadcastSystemMessage(
            TextComponent.text(
              `Bem-vindo ${evt.player.getName()} ao servidor!`,
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

## Compilando e executando

```bash
npm run build
cp build/my-plugin.wasm /caminho/para/pumpkin/plugins/
```
