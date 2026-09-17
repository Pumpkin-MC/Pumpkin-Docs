# プラグイン

Pumpkin は、ケーパビリティベースのセキュリティを備えた WebAssembly (WASM) プラグインランタイムを提供します。プラグインの挙動、署名検証、権限は `pumpkin.toml` 内の `[plugins]` で設定します。

## 設定

:::code-group

```toml [pumpkin.toml]
[plugins]
enabled = true
hot_reload = false
ask_permission_confirmation = true
allow_unsigned = true
allowed_permissions = []
blocked_permissions = []
inherit_env = false
loopback_only = false
verify_signatures = true

# 任意のプラグインごとのオーバーライド
[plugins.overrides.my_plugin]
enabled = true
allow_unsigned = true
max_memory_mb = 128
allowed_permissions = ["fs:read:data"]
blocked_permissions = ["network:outbound"]
loopback_only = true

[plugins.overrides.my_plugin.environment]
API_KEY = "example_secret"
```

:::

### グローバルプラグイン設定

- **`enabled`**: プラグインランタイムを有効または無効にするマスタースイッチ (デフォルト: `true`)。
- **`hot_reload`**: `plugins/` ディレクトリを監視し、実行時に変更されたプラグインを自動的に再読み込みするかどうか (デフォルト: `false`)。
- **`ask_permission_confirmation`**: プラグインが未承認のケーパビリティ/権限を要求した際に、サーバーコンソールで確認を求めるかどうか (デフォルト: `true`)。
- **`allow_unsigned`**: 署名されていない WASM プラグインの読み込みを許可するかどうか (デフォルト: `true`)。
- **`allowed_permissions`**: すべてのプラグインに対してグローバルに事前承認され、対話型コンソールプロンプトをバイパスする権限のリスト (デフォルト: `[]`)。
- **`blocked_permissions`**: すべてのプラグインに対してグローバルに拒否される権限のリスト (デフォルト: `[]`)。
- **`inherit_env`**: ホストの環境変数をデフォルトでプラグインの WASI サンドボックスに継承するかどうか (デフォルト: `false`)。
- **`loopback_only`**: プラグインからのアウトバウンドネットワーク接続を `127.0.0.1` / localhost のみに制限するかどうか (デフォルト: `false`)。
- **`max_memory_mb`**: (任意) プラグインインスタンスごとのグローバル最大メモリ制限 (MB 単位)。
- **`verify_signatures`**: 読み込み前に Pumpkin が WASM プラグインの暗号署名を検証するかどうか (デフォルト: `true`)。

### プラグインごとのオーバーライド

`[plugins.overrides.<plugin_name>]` を使用して、特定のプラグインの権限や環境変数を細かく調整できます:

- **`enabled`**: この特定のプラグインを有効または無効にする (デフォルト: `true`)。
- **`allow_unsigned`**: この特定のプラグインが署名なしで実行できるかどうかをオーバーライド (`true`/`false`)。
- **`max_memory_mb`**: このプラグイン専用に割り当てられる最大メモリ制限 (MB 単位)。
- **`allowed_permissions`**: このプラグインに対して事前承認された権限。
- **`blocked_permissions`**: このプラグインに対して明示的にブロックされた権限。
- **`loopback_only`**: このプラグインのループバックネットワーク制限をオーバーライド。
- **`environment`**: プラグインの WASI 環境に直接渡されるカスタム環境変数のテーブル。
