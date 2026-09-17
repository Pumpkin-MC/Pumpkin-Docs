# Schnellstart

Dieser Leitfaden hilft dir beim Einstieg in die Entwicklung von Pumpkin-Server-Plugins mit der Programmiersprache [D](https://dlang.org/).

D-Plugins für Pumpkin werden mithilfe der offiziellen Bindings [`pumpkin-api-d`](https://github.com/Pumpkin-MC/pumpkin-api-d) als WebAssembly-Komponenten (Wasm) kompiliert.

---

## Voraussetzungen

Bevor du D-Plugins für Pumpkin erstellst, stelle sicher, dass folgende Software installiert ist:

- **[LDC](https://github.com/ldc-developers/ldc)**: Version 1.43 oder neuer (LLVM-basierter D-Compiler).
- **`addon-wasi`**: Das WASI-Zielpaket für LDC.
- **[DUB](https://dub.pm/)**: Der D-Paket- und Build-Manager (in der Regel in LDC enthalten).

---

## 1. Projekt einrichten

Erstelle ein neues Verzeichnis für dein Plugin-Projekt und lege eine `dub.json`-Konfigurationsdatei an:

```bash
mkdir my-d-plugin
cd my-d-plugin
```

Erstelle die `dub.json` im Projektstammverzeichnis:

```json [dub.json]
{
    "name": "my-d-plugin",
    "description": "Ein minimales Pumpkin-Plugin in D.",
    "license": "proprietary",
    "authors": ["DeinName"],
    "copyright": "Copyright © 2026, DeinName",

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
> Das Flag `-Xcc=-mexec-model=reactor` wird vom WebAssembly-Linker benötigt, damit das Plugin als Reaktor (eine Komponente mit exportierten Einstiegspunkten) anstelle eines eigenständigen CLI-Programms mit Beendigungspunkt behandelt wird.

---

## 2. Das Plugin schreiben

Erstelle ein `source`-Verzeichnis und lege deinen Code in `source/app.d` ab:

```d [source/app.d]
module plugin;

import wit.pumpkin.plugin.plugin;
import wit.common;
import pumpkin.register;

struct MyPlugin {
    @GetMetadata PluginMetadata getMetadata()
    {
        immutable(WitString)[$] authors = [
            "DeinName".witList
        ];

        return (immutable PluginMetadata(
                name: "my-d-plugin".witList,
                version_: "0.1.0".witList,
                authors: authors.witList,
                description: "Ein Beispiel-Plugin in D.".witList,
                dependencies: WitList!WitString(),
                permissions: WitList!WitString()
        )).witClone;
    }

    @OnLoad
    Result!(void, WitString) onLoad(Context ctx)
    {
        scope (exit)
            ctx.witDrop; // Eingehende Ressourcen müssen nach der Nutzung freigegeben werden

        log(Level.info, "Hallo vom D-Plugin!".witList);
        return ok!WitString;
    }
}

mixin RegisterPlugin!MyPlugin;
```

---

## 3. Plugin kompilieren

Kompiliere dein Plugin zu einer WebAssembly-Komponente mit dem Ziel `wasm32-wasip2`:

```bash
dub build -b release -a wasm32-wasip2
```

Dadurch wird `my-d-plugin.wasm` im Projektstammverzeichnis erzeugt.

---

## 4. Plugin ausführen

1. Kopiere die kompilierte `.wasm`-Datei in das `plugins/`-Verzeichnis deines Pumpkin-Servers:
   ```bash
   cp my-d-plugin.wasm /pfad/zu/pumpkin/plugins/
   ```
2. Starte oder starte den Pumpkin-Server neu:
   ```bash
   ./pumpkin
   ```
3. Prüfe die Server-Logs auf die Erfolgsmeldung:
   ```text
   [INFO] Hallo vom D-Plugin!
   ```
