# RCON

RCON を使用すると、ネットワーク接続を介して Pumpkin サーバーをリモート管理できます。`pumpkin.toml` では、設定は `[networking.rcon]` の下に配置されます。

## 設定

:::code-group

```toml [pumpkin.toml]
[networking.rcon]
enabled = false
address = "0.0.0.0:25575"
password = ""
max_connections = 10

[networking.rcon.logging]
logged_successfully = true
wrong_password = true
commands = true
quit = true
```

:::

### RCON 設定

- **`enabled`**: RCON サービスを有効にするマスタースイッチ。
- **`address`**: RCON サーバーをバインドする IP アドレスとポート。
- **`password`**: RCON クライアントの認証に必要なパスワード。
- **`max_connections`**: 許可される RCON クライアントの最大同時接続数。

### RCON ログ設定

- **`logged_successfully`**: クライアントの認証成功イベントをログに記録するかどうか。
- **`wrong_password`**: 認証失敗 (パスワード間違い) の試行をログに記録するかどうか。
- **`commands`**: RCON 経由で実行されたコマンドをログに記録するかどうか。
- **`quit`**: クライアントの切断イベントをログに記録するかどうか。
