# Bedrock と NetherNet

Pumpkin は、NetherNet WebRTC/ICE トランスポートやユーザー名のカスタマイズを含め、Minecraft 統合版 (Bedrock Edition) クライアントをネイティブでサポートしています。

## 設定

:::code-group

```toml [pumpkin.toml]
[networking.bedrock]
enabled = true
online_mode = true
max_players = 1000
view_distance = 16
simulation_distance = 10
motd = "A blazingly fast Pumpkin server!"
username_prefix = ""
replace_username_spaces = true
chunk_caching = true

[networking.bedrock.nethernet]
enabled = true
address = "0.0.0.0:19132"
identity_key = "nethernet-key.der"
stun_servers = []
```

:::

### Bedrock オプション

- **`enabled`**: 統合版 (Bedrock Edition) クライアントからの接続を受け入れるかどうか (デフォルト: `true`)。
- **`online_mode`**: Bedrock プレイヤーに対して Xbox Live 認証を強制するかどうか (デフォルト: `true`)。
- **`max_players`**: 同時接続可能な Bedrock プレイヤーの最大数 (`0` で無制限、デフォルト: `1000`)。
- **`view_distance`**: Bedrock クライアントに送信される最大チャンク描画距離 (デフォルト: `16`)。
- **`simulation_distance`**: Bedrock プレイヤーの最大シミュレーション距離 (デフォルト: `10`)。
- **`motd`**: Bedrock サーバーリストに表示される MOTD (Message of the Day)。
- **`username_prefix`**: Bedrock プレイヤーのゲーマータグの先頭に付加する任意のプレフィックス (例: `"."` または `"*"` など)。クロスプレイサーバーでの Java 版アカウントとの名前衝突を防止します (デフォルト: `""`)。
- **`replace_username_spaces`**: Bedrock ゲーマータグ内のスペースをアンダースコア `_` に自動置換するかどうか。Minecraft のスラッシュコマンドでプレイヤー名を指定できるようにします (デフォルト: `true`)。
- **`chunk_caching`**: ネットワーク帯域を節約するために、クライアント側のチャンク blob キャッシュを有効にするかどうか (デフォルト: `true`)。

### NetherNet トランスポート設定

NetherNet は、Minecraft Bedrock の最新の WebRTC/ICE ネットワーキングトランスポートです:

- **`enabled`**: クライアントが NetherNet を使用して接続できるかどうか (デフォルト: `true`)。
- **`address`**: TCP シグナリングおよび UDP ICE 多重化用のネットワークソケットアドレス (デフォルト: `"0.0.0.0:19132"`)。
- **`external_ip`**: サーバーが NAT 配下でホストされている場合に通知する任意のパブリック IP アドレス。
- **`identity_key`**: クライアントの TOFU (Trust On First Use) のために再起動間でも保持される PKCS#8 P-384 秘密 ID キーファイルへのパス (デフォルト: `"nethernet-key.der"`)。
- **`stun_servers`**: ICE NAT トラバーサル用の STUN サーバー URL の任意のリスト。
