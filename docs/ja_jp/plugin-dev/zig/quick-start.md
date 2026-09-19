# クイックスタート

このガイドでは、[Zig言語](https://ziglang.org/)を使用してPumpkinサーバープラグインを作成する手順を説明します。

Pumpkin用のZig言語プラグインは、公式の[`pumpkin-api-zig`](https://github.com/Pumpkin-MC/pumpkin-api-zig)バインディングを使用してWebAssembly (Wasm) コンポーネントにコンパイルされます。

---

## 前提条件

開始する前に、以下のツールがインストールされていることを確認してください:

- **[Zig](https://ziglang.org/download/)**: バージョン 0.16.0 以降。
- **[`wasm-tools`](https://github.com/bytecodealliance/wasm-tools)**: `PATH` に設定されていること (ビルドスクリプトがWITメタデータを埋め込み、WebAssemblyコンポーネントを生成するために使用します)。

---

## 1. プロジェクトのセットアップ

プラグインプロジェクト用の新しいディレクトリを作成します:

```bash
mkdir my-zig-plugin
cd my-zig-plugin
```

依存関係として `pumpkin-api-zig` を追加します:

```bash
zig fetch --save git+https://github.com/Pumpkin-MC/pumpkin-api-zig
```

プロジェクトルートに `build.zig` を作成します:

```zig [build.zig]
const std = @import("std");
const pumpkin_api = @import("pumpkin_api_zig");

pub fn build(b: *std.Build) void {
    _ = pumpkin_api.addPlugin(b, b.dependency("pumpkin_api_zig", .{}), .{
        .name = "my-zig-plugin",
        .root_source_file = b.path("src/main.zig"),
    });
}
```

---

## 2. プラグインの記述

`src` ディレクトリを作成し、`src/main.zig` にコードを記述します:

```zig [src/main.zig]
const std = @import("std");
const pumpkin = @import("pumpkin");

pub const std_options: std.Options = .{ .logFn = pumpkin.logFn };

const MyPlugin = struct {
    pub const metadata: pumpkin.Metadata = .{
        .name = "my-zig-plugin",
        .version = "0.1.0",
        .authors = &.{"あなたの名前"},
        .description = "Zig言語によるサンプルプラグイン。",
    };

    pub const events = .{
        .player_join_event = onJoin,
    };

    pub fn onLoad(_: pumpkin.Context) !void {
        std.log.info("Zigプラグインからこんにちは！", .{});
    }

    fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
        std.log.info("{s} が参加しました", .{ev.player.getName()});
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

### 主な要素:
- **`std_options`**: `pumpkin.logFn` を介して、標準のZigログ出力 (`std.log`) をPumpkinのログシステムに転送します。
- **`pub const metadata`**: コンポーネントの読み込み時にPumpkinが必要とするプラグイン情報 (名前、バージョン、作成者、説明) を定義します。
- **`pub const events`**: イベントハンドラー (`.player_join_event` など) を登録します。
- **`pub fn onLoad`**: Pumpkinがプラグインを初期化するときに呼び出されるエントリポイントです。
- **`pumpkin.register(MyPlugin)`**: コンパイル時に必要なWebAssemblyコンポーネントのエクスポートとエントリポイントを生成します。

> [!NOTE]
> APIが返すものはすべて (ハンドルを含む)、現在のコールバックが終了するまでのみ有効です。ハンドルを保持したい場合は `keep()` を呼び出し、不要になったら `deinit()` で解放してください。

---

## 3. プラグインのビルド

プラグインをWebAssemblyコンポーネントとしてコンパイルします:

```bash
zig build
```

プロジェクトルートの `zig-out/my-zig-plugin.wasm` に生成されます。

---

## 4. プラグインの実行

1. 生成された `.wasm` ファイルをPumpkinサーバーの `plugins/` ディレクトリにコピーします:
   ```bash
   cp zig-out/my-zig-plugin.wasm /path/to/pumpkin/plugins/
   ```
2. Pumpkinサーバーを起動または再起動します:
   ```bash
   ./pumpkin
   ```
3. サーバーログを確認して、プラグインが正常に読み込まれたことを確認します:
   ```text
   [INFO] Zigプラグインからこんにちは！
   ```
