# クイックスタート

このガイドでは、[D言語](https://dlang.org/)を使用してPumpkinサーバープラグインを作成する手順を説明します。

Pumpkin用のD言語プラグインは、公式の[`pumpkin-api-d`](https://github.com/Pumpkin-MC/pumpkin-api-d)バインディングを使用してWebAssembly (Wasm) コンポーネントにコンパイルされます。

---

## 前提条件

開始する前に、以下のツールがインストールされていることを確認してください:

- **[LDC](https://github.com/ldc-developers/ldc)**: バージョン 1.43 以降 (LLVMベースのD言語コンパイラ)。
- **`addon-wasi`**: LDC用のWASIターゲットパッケージ。
- **[DUB](https://dub.pm/)**: D言語のパッケージおよびビルド管理ツール (通常LDCに含まれています)。

---

## 1. プロジェクトのセットアップ

プラグインプロジェクト用の新しいディレクトリを作成し、`dub.json`設定ファイルを追加します:

```bash
mkdir my-d-plugin
cd my-d-plugin
```

プロジェクトルートに `dub.json` を作成します:

```json [dub.json]
{
    "name": "my-d-plugin",
    "description": "D言語で構築された最小限のPumpkinプラグイン。",
    "license": "proprietary",
    "authors": ["あなたの名前"],
    "copyright": "Copyright © 2026, あなたの名前",

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
> `-Xcc=-mexec-model=reactor` フラグは、WebAssemblyリンカーによってプラグインがコマンドライン実行プログラムではなくエントリポイントを公開するコンポーネント（リアクター）として扱われるために必要です。

---

## 2. プラグインの記述

`source` ディレクトリを作成し、`source/app.d` にコードを記述します:

```d [source/app.d]
module plugin;

import wit.pumpkin.plugin.plugin;
import wit.common;
import pumpkin.register;

struct MyPlugin {
    @GetMetadata PluginMetadata getMetadata()
    {
        immutable(WitString)[$] authors = [
            "あなたの名前".witList
        ];

        return (immutable PluginMetadata(
                name: "my-d-plugin".witList,
                version_: "0.1.0".witList,
                authors: authors.witList,
                description: "D言語によるサンプルプラグイン。".witList,
                dependencies: WitList!WitString(),
                permissions: WitList!WitString()
        )).witClone;
    }

    @OnLoad
    Result!(void, WitString) onLoad(Context ctx)
    {
        scope (exit)
            ctx.witDrop; // 受信したリソースは使用後に解放する必要があります

        log(Level.info, "D言語プラグインからこんにちは！".witList);
        return ok!WitString;
    }
}

mixin RegisterPlugin!MyPlugin;
```

---

## 3. プラグインのビルド

`wasm32-wasip2` をターゲットとしてWebAssemblyコンポーネントをビルドします:

```bash
dub build -b release -a wasm32-wasip2
```

プロジェクトルートに `my-d-plugin.wasm` が生成されます。

---

## 4. プラグインの実行

1. 生成された `.wasm` ファイルをPumpkinサーバーの `plugins/` ディレクトリにコピーします:
   ```bash
   cp my-d-plugin.wasm /path/to/pumpkin/plugins/
   ```
2. Pumpkinサーバーを起動または再起動します:
   ```bash
   ./pumpkin
   ```
3. サーバーログを確認して、プラグインが正常に読み込まれたことを確認します:
   ```text
   [INFO] D言語プラグインからこんにちは！
   ```
