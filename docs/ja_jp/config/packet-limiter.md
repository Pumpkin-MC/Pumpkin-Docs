# パケットリミッター

Pumpkin には、パケットフラッド攻撃、スパム攻撃、クライアント側の悪用 (エクスプロイト) からサーバーを保護するための組み込みパケットレートリミッターが搭載されています。パケットレート制限は、Java Edition クライアントと Bedrock Edition クライアントで個別に設定できます。

## 設定

:::code-group

```toml [pumpkin.toml]
[networking.java.packet_limiter]
enabled = true
max_packet_rate = 500.0
burst_capacity = 500.0
kick_message = "Kicked for spamming packets"

[networking.bedrock.packet_limiter]
enabled = true
max_packet_rate = 500.0
burst_capacity = 500.0
kick_message = "Kicked for spamming packets"
```

:::

### 設定オプション

- **`enabled`**: このクライアントエディションでパケットレートリミッターを有効にするかどうか (デフォルト: `true`)。
- **`max_packet_rate`**: クライアント接続ごとに 1 秒あたりに許可される受信パケットの最大数 (デフォルト: `500.0`)。リミッターモジュール自体を無効化せずにレート制限のみを無効にするには、`<= 0.0` に設定します。
- **`burst_capacity`**: クライアントパケットの一時的なスパイクを許容するトークンバケットのバースト許容量 (デフォルト: `500.0`)。
- **`kick_message`**: パケット制限を超過した際にプレイヤーに表示される切断メッセージ (デフォルト: `"Kicked for spamming packets"`)。
