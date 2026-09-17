# プレイヤーデータとゲームプレイ

永続的なプレイヤーデータの保存、進捗 (Advancements)、レシピの同期、および季節ごとの楽しい機能に関する設定は、`pumpkin.toml` で設定します。

## 設定

:::code-group

```toml [pumpkin.toml]
[player_data]
save_player_data = true
save_player_cron_interval = 300

[advancement]
save_advancements = true

[recipe]
send_recipes = true

[fun]
april_fools = true
```

:::

### プレイヤーデータ

- **`save_player_data`**: 永続的なプレイヤーデータ (インベントリ、位置、体力など) をディスクに保存するかどうか (デフォルト: `true`)。
- **`save_player_cron_interval`**: オンラインプレイヤーデータの自動定期保存を行う間隔 (秒単位、デフォルト: `300` 秒 / 5 分)。

### 進捗 (Advancements)

- **`save_advancements`**: プレイヤーの進捗状況を追跡し、ディスクに保存するかどうか (デフォルト: `true`)。

### レシピ

- **`send_recipes`**: クラフトや精錬のレシピを接続中のクライアントと同期し、クライアント側のレシピ本を有効にするかどうか (デフォルト: `true`)。

### お楽しみ機能

- **`april_fools`**: エイプリルフールのイースターエッグや季節限定の楽しい機能を有効にするかどうか (デフォルト: `true`)。
