# Quick Start

Deze handleiding helpt je op weg met het schrijven van Pumpkin-serverplugins met de programmeertaal [D](https://dlang.org/).

D-plugins voor Pumpkin worden gecompileerd naar WebAssembly-componenten (Wasm) met behulp van de officiële [`pumpkin-api-d`](https://github.com/Pumpkin-MC/pumpkin-api-d) bindings.

---

## Vereisten

Voordat je D-plugins voor Pumpkin bouwt, zorg ervoor dat het volgende is geïnstalleerd:

- **[LDC](https://github.com/ldc-developers/ldc)**: Versie 1.43 of nieuwer (LLVM-gebaseerde D-compiler).
- **`addon-wasi`**: Het WASI-doelpakket voor LDC.
- **[DUB](https://dub.pm/)**: Het D-pakket- en buildbeheerprogramma (meestal inbegrepen bij LDC).

---

## 1. Het project opzetten

Maak een nieuwe map voor je pluginproject en voeg een `dub.json`-configuratiebestand toe:

```bash
mkdir my-d-plugin
cd my-d-plugin
```

Maak `dub.json` aan in de hoofdmap van het project:

```json [dub.json]
{
    "name": "my-d-plugin",
    "description": "Een minimale Pumpkin-plugin gebouwd met D.",
    "license": "proprietary",
    "authors": ["JouwNaam"],
    "copyright": "Copyright © 2026, JouwNaam",

    "dependencies": {
        "pumpkin-api-d": "~>0.1.0"
    },

    "targetType": "executable",
    "dflags": ["-Xcc=-mexec-model=reactor"],
    "buildTypes": {
        "debug": {
            "buildOptions": ["debugMode", "debugInfo"]
        },
        "release": {
            "buildOptions": ["optimize", "inline"],
            "dflags": ["-L-S"]
        }
    }
}
```

> [!NOTE]
> De vlag `-Xcc=-mexec-model=reactor` is vereist door de WebAssembly-linker zodat de plugin wordt behandeld als een reactor (een component met geëxporteerde toegangspunten) in plaats van een zelfstandig programma met een afsluitpunt.

---

## 2. De plugin schrijven

Maak een map `source` aan en plaats je code in `source/app.d`:

```d [source/app.d]
module plugin;

import wit.pumpkin.plugin.plugin;
import wit.common;
import pumpkin.register;

struct MyPlugin {
    @GetMetadata PluginMetadata getMetadata()
    {
        immutable(WitString)[$] authors = [
            "JouwNaam".witList
        ];

        return (immutable PluginMetadata(
                name: "my-d-plugin".witList,
                version_: "0.1.0".witList,
                authors: authors.witList,
                description: "Een voorbeeldplugin in D.".witList,
                dependencies: WitList!WitString(),
                permissions: WitList!WitString()
        )).witClone;
    }

    @OnLoad
    Result!(void, WitString) onLoad(Context ctx)
    {
        scope (exit)
            ctx.witDrop; // Binnenkomende bronnen moeten na gebruik worden vrijgegeven

        log(Level.info, "Hallo vanuit de D-plugin!".witList);
        return ok!WitString;
    }
}

mixin RegisterPlugin!MyPlugin;
```

---

## 3. De plugin bouwen

Compileer je plugin naar een WebAssembly-component voor `wasm32-wasip2`:

```bash
dub build -b release -a wasm32-wasip2
```

Dit genereert `my-d-plugin.wasm` in je projectmap.

---

## 4. De plugin uitvoeren

1. Kopieer het gecompileerde `.wasm`-bestand naar de map `plugins/` van je Pumpkin-server:
   ```bash
   cp my-d-plugin.wasm /pad/naar/pumpkin/plugins/
   ```
2. Start of herstart Pumpkin:
   ```bash
   ./pumpkin
   ```
3. Controleer de serverlogs om te bevestigen dat je plugin is geladen:
   ```text
   [INFO] Hallo vanuit de D-plugin!
   ```
