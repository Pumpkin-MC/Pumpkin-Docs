# プロキシ

Pumpkin はネットワークサーバー構成向けのプロキシプロトコルをサポートしています。Velocity および BungeeCord のサポートは、`pumpkin.toml` 内の `[networking.proxy]` で設定します。

## 設定

:::code-group

```toml [pumpkin.toml]
[networking.proxy]
enabled = false

[networking.proxy.velocity]
enabled = false
secret = ""

[networking.proxy.bungeecord]
enabled = false
secret = ""
```

:::

### 設定オプション

- **`[networking.proxy].enabled`**: プロキシサポートを有効にするマスタースイッチ。
- **`[networking.proxy.velocity].enabled`**: Velocity の modern 転送プロトコルを有効化。
- **`[networking.proxy.velocity].secret`**: Velocity プロキシ設定と一致する転送シークレット。
- **`[networking.proxy.bungeecord].enabled`**: BungeeCord のプレイヤー情報転送プロトコルを有効化。
- **`[networking.proxy.bungeecord].secret`**: BungeeGuard (`bungeeguard-token`) を介して BungeeCord プロキシからの接続を認証するための任意の共有シークレット。設定すると、受信接続はこのトークンを提供する必要があり、プレイヤーがプロキシをバイパスして直接接続するのを防ぎます。
