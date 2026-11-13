# 快速入門

本指南將幫助你開始使用 [D 程式語言](https://dlang.org/)編寫 Pumpkin 伺服器插件。

Pumpkin 的 D 插件使用官方 [`pumpkin-api-d`](https://github.com/Pumpkin-MC/pumpkin-api-d) 綁定編譯為 WebAssembly（Wasm）元件。

---

## 前提條件

在為 Pumpkin 構建 D 插件之前，請確保已安裝以下內容：

- **[LDC](https://github.com/ldc-developers/ldc)**：1.43 或更高版本（基於 LLVM 的 D 編譯器）。
- **`addon-wasi`**：LDC 的 WASI 目標包。
- **[DUB](https://dub.pm/)**：D 的包管理與構建工具（通常隨 LDC 一起提供）。

---

## 1. 設定項目

為插件項目建立一個新目錄，並新增 `dub.json` 設定檔案：

```bash
mkdir my-d-plugin
cd my-d-plugin
```

在項目根目錄建立 `dub.json`：

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
> WebAssembly 連結器需要 `-Xcc=-mexec-model=reactor` 標誌，以便將插件視為 reactor（公開入口點的元件），而不是具有退出點的指令列程式。

---

## 2. 編寫插件

建立一個 `source` 目錄，並將程式碼放入 `source/app.d`：

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
            ctx.witDrop; // 傳入的資源在使用後必須清理

        log(Level.info, "Hello from D plugin!".witList);
        return ok!WitString;
    }
}

mixin RegisterPlugin!MyPlugin;
```

### 關鍵要素：
- **`@GetMetadata`**：定義 Pumpkin 載入元件時請求的插件資訊（名稱、版本、作者、描述、權限）。
- **`@OnLoad`**：Pumpkin 初始化插件時調用的入口點。確保使用 `ctx.witDrop` 釋放傳入的上下文資源（`ctx`）。
- **`mixin RegisterPlugin!MyPlugin;`**：生成 Pumpkin 的 WASM 載入器所需的 WebAssembly 元件匯出和樣板程式碼。

---

## 3. 構建插件

將插件編譯為面向 `wasm32-wasip3` 的 WebAssembly 元件：

```bash
dub build -b release -a wasm32-wasip3
```

這會在項目根目錄生成 `my-d-plugin.wasm`。

---

## 4. 執行插件

1. 將編譯後的 `.wasm` 檔案複製到伺服器的 `plugins/` 目錄：
   ```bash
   cp my-d-plugin.wasm /path/to/pumpkin/plugins/
   ```
2. 啟動或重啟 Pumpkin：
   ```bash
   ./pumpkin
   ```
3. 檢查伺服器日誌，確認插件已載入：
   ```text
   [INFO] Hello from D plugin!
   ```
