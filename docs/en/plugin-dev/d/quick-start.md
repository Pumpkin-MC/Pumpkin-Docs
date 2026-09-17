# Quick Start

This guide will help you get started with writing Pumpkin server plugins using the [D programming language](https://dlang.org/).

D plugins for Pumpkin compile to WebAssembly (Wasm) components using the official [`pumpkin-api-d`](https://github.com/Pumpkin-MC/pumpkin-api-d) bindings.

---

## Prerequisites

Before building D plugins for Pumpkin, ensure you have the following installed:

- **[LDC](https://github.com/ldc-developers/ldc)**: Version 1.43 or later (LLVM-based D compiler).
- **`addon-wasi`**: The WASI target package for LDC.
- **[DUB](https://dub.pm/)**: The D package and build tool (usually included with LDC).

---

## 1. Setting Up the Project

Create a new directory for your plugin project and add a `dub.json` configuration file:

```bash
mkdir my-d-plugin
cd my-d-plugin
```

Create `dub.json` in the project root:

```json [dub.json]
{
    "name": "my-d-plugin",
    "description": "A minimal Pumpkin plugin built with D.",
    "license": "proprietary",
    "authors": ["You"],
    "copyright": "Copyright © 2026, You",

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
> The flag `-Xcc=-mexec-model=reactor` is required by the WebAssembly linker so that the plugin is treated as a reactor (a component exposing entry points) rather than a command-line program with an exit point.

---

## 2. Writing the Plugin

Create a `source` directory and place your code in `source/app.d`:

```d [source/app.d]
module plugin;

import wit.pumpkin.plugin.plugin;
import wit.common;
import pumpkin.register;

struct MyPlugin {
    @GetMetadata PluginMetadata getMetadata()
    {
        immutable(WitString)[$] authors = [
            "You".witList
        ];

        return (immutable PluginMetadata(
                name: "my-d-plugin".witList,
                version_: "0.1.0".witList,
                authors: authors.witList,
                description: "An example plugin in D.".witList,
                dependencies: WitList!WitString(),
                permissions: WitList!WitString()
        )).witClone;
    }

    @OnLoad
    Result!(void, WitString) onLoad(Context ctx)
    {
        scope (exit)
            ctx.witDrop; // Incoming resources must be cleaned up after use

        log(Level.info, "Hello from D plugin!".witList);
        return ok!WitString;
    }
}

mixin RegisterPlugin!MyPlugin;
```

### Key Elements:
- **`@GetMetadata`**: Defines plugin information (name, version, authors, description, permissions) requested by Pumpkin when loading the component.
- **`@OnLoad`**: Entry point invoked when Pumpkin initializes the plugin. Ensure incoming context resources (`ctx`) are freed with `ctx.witDrop`.
- **`mixin RegisterPlugin!MyPlugin;`**: Generates the necessary WebAssembly component exports and boilerplate required by Pumpkin's WASM loader.

---

## 3. Building the Plugin

Compile your plugin into a WebAssembly component targeting `wasm32-wasip2`:

```bash
dub build -b release -a wasm32-wasip2
```

This generates `my-d-plugin.wasm` in your project root.

---

## 4. Running Your Plugin

1. Copy the compiled `.wasm` file to your server's `plugins/` directory:
   ```bash
   cp my-d-plugin.wasm /path/to/pumpkin/plugins/
   ```
2. Start or restart Pumpkin:
   ```bash
   ./pumpkin
   ```
3. Check the server logs to verify your plugin loaded:
   ```text
   [INFO] Hello from D plugin!
   ```
