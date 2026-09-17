# サーバーリンク (Server Links)

Minecraft クライアント (1.21 以降) では、ポーズメニューやゲームメニュー内にクリック可能なサーバーリンクを表示できます。標準リンクおよびカスタムサーバーリンクは、`pumpkin.toml` 内の `[server_links]` で設定します。

## 設定

:::code-group

```toml [pumpkin.toml]
[server_links]
enabled = true
bug_report = "https://github.com/Pumpkin-MC/Pumpkin/issues"
support = ""
status = ""
feedback = ""
community = ""
website = ""
forums = ""
news = ""
announcements = ""

[server_links.custom]
# "Store" = "https://store.example.com"
# "Discord" = "https://discord.gg/example"
```

:::

### 設定オプション

- **`enabled`**: 接続中のクライアントへのサーバーリンクの配信を有効にするマスタースイッチ (デフォルト: `true`)。
- **`bug_report`**: サーバーまたはプロジェクトのバグトラッカーへのリンク (デフォルト: `"https://github.com/Pumpkin-MC/Pumpkin/issues"`)。
- **`support`**: テクニカルサポートまたはヘルプデスクへのリンク。
- **`status`**: サーバーの稼働状況 / ステータスページへのリンク。
- **`feedback`**: プレイヤーのフィードバックまたは提案ページへのリンク。
- **`community`**: コミュニティフォーラムまたはグループへのリンク。
- **`website`**: 公式ウェブサイトへのリンク。
- **`forums`**: ディスカッションフォーラムへのリンク。
- **`news`**: サーバーブログまたはニュースページへのリンク。
- **`announcements`**: お知らせページへのリンク。

### カスタムリンク

`[server_links.custom]` の下に、クライアントメニューに表示する任意のキーと値のリンクを定義できます:

```toml
[server_links.custom]
"Store" = "https://store.example.com"
"Discord" = "https://discord.gg/example"
```
