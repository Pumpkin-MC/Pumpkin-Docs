# 聊天與反洗版資訊

Pumpkin 在 `pumpkin.toml` 的 `[chat]` 設定項下提供了可自訂的遊戲內聊天格式以及內建的反洗版資訊（Anti-Spam）保護。

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

### 聊天設定

- **`format`**：聊天訊息格式字符串（預設：`"<{DISPLAYNAME}> {MESSAGE}"`）。
  - `{DISPLAYNAME}`：玩家顯示名稱。
  - `{MESSAGE}`：聊天訊息文字。
  > [!NOTE]
  > 當啟用了安全聊天檢舉（`allow_chat_reports = true`）時，自訂聊天格式將不會生效。

### 反洗版資訊保護

Pumpkin 實現了漏桶演算法垃圾資訊計數器，以防止刷屏玩家和機器人泛洪攻擊伺服器：

- **`enabled`**：是否啟用反洗版資訊保護（預設：`true`）。
- **`spam_threshold`**：踢出玩家的垃圾資訊計數器閾值（以 tick 為單位，預設：`200` tick）。
- **`message_cost`**：每傳送一條聊天訊息或指令時，玩家垃圾資訊計數器增加的數值（預設：`20` tick）。
- **`decay_per_tick`**：伺服器每 tick 從玩家垃圾資訊計數器中衰減扣除的數值（預設：`1` tick）。
- **`ops_bypass`**：伺服器管理員（OP）是否繞過反洗版資訊檢查（預設：`true`）。
