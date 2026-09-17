# コマンド

Pumpkin は Minecraft コマンドをサポートしており、`pumpkin.toml` 内でコンソール、TTY、権限の挙動を設定できます。

## 設定

:::code-group

```toml [pumpkin.toml]
[commands]
use_console = true
use_tty = true
log_console = true
broadcast_console_to_ops = true
default_op_level = 0

# 任意のコマンドごとのオーバーライド
[commands.overrides.gamemode]
permission_level = 4

[commands.overrides.tp]
enabled = false
```

:::

### 設定オプション

- **`use_console`**: コンソールからのコマンド入力を受け付けるかどうか。
- **`use_tty`**: 対話型コンソール入力のために TTY サポート (rustyline) を有効にするかどうか。
- **`log_console`**: プレイヤーが実行したコマンドをコンソールに記録するかどうか。
- **`broadcast_console_to_ops`**: コンソールおよび RCON のコマンド出力をオンラインのオペレーターにブロードキャストするかどうか (バニラの `broadcast-console-to-ops` と同等)。
- **`default_op_level`**: 非オペレーターに割り当てられる OP 権限レベル (0〜4、デフォルト: `0`)。

## コマンドオーバーライド

`[commands.overrides.<command>]` を使用して、個々のコマンドの権限をカスタマイズしたり、完全に無効化したりできます。キーには先頭のスラッシュを除いたコマンド名を指定します (例: `gamemode`, `tp`)。

### オーバーライドオプション

- **`enabled`**: コマンドが有効かどうか (デフォルト: `true`)。`false` に設定すると、コマンドは完全に非表示になります。実行できず、`/help` にも表示されず、タブ補完にも現れません。実行を試みたプレイヤーには不明なコマンドのメッセージが表示されます。
- **`permission_level`**: コマンドの実行に必要な最小権限レベル:
  - `0`: 誰でも使用可能。
  - `2`: 通常のオペレーター (一般的なチートコマンド、例: `/gamemode`)。
  - `3`: 管理者 (モデレーションコマンド、例: `/kick`, `/ban`)。
  - `4`: サーバーオーナー (サーバー全体の管理、例: `/stop`, `/op`)。

コマンドのデフォルトの権限レベルを維持する場合は、`permission_level` を省略してください。
