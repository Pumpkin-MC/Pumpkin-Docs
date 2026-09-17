# チャットとスパム対策

Pumpkin では、`pumpkin.toml` 内の `[chat]` セクションで、ゲーム内チャットのフォーマットのカスタマイズや組み込みのスパム対策機能を提供しています。

## 設定

:::code-group

```toml [pumpkin.toml]
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"

[chat.anti_spam]
enabled = true
spam_threshold = 200
message_cost = 20
decay_per_tick = 1
ops_bypass = true
```

:::

### チャット設定

- **`format`**: チャットメッセージのフォーマット文字列 (デフォルト: `"<{DISPLAYNAME}> {MESSAGE}"`)。
  - `{DISPLAYNAME}`: プレイヤーの表示名。
  - `{MESSAGE}`: チャットメッセージの本文。
  > [!NOTE]
  > 安全なチャット通報機能 (`allow_chat_reports = true`) が有効になっている場合、カスタムチャットフォーマットは適用されません。

### スパム対策 (Anti-Spam)

Pumpkin はリーキーバケット (leaky-bucket) 方式のスパムカウンターを実装しており、スパム行為を行うプレイヤーや bot の大量接続からサーバーを保護します:

- **`enabled`**: スパム対策を有効にするかどうか (デフォルト: `true`)。
- **`spam_threshold`**: プレイヤーがキックされるスパムカウンターのしきい値 (単位: ティック、デフォルト: `200` ティック)。
- **`message_cost`**: チャットメッセージまたはコマンドが送信されるたびにプレイヤーのスパムカウンターに追加される量 (デフォルト: `20` ティック)。
- **`decay_per_tick`**: サーバーの 1 ティックごとにプレイヤーのスパムカウンターから減少する量 (デフォルト: `1` ティック)。
- **`ops_bypass`**: サーバーオペレーターがスパムチェックをバイパスできるかどうか (デフォルト: `true`)。
