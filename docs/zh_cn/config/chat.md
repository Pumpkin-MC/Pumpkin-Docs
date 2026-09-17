# 聊天与反垃圾信息

Pumpkin 在 `pumpkin.toml` 的 `[chat]` 配置项下提供了可自定义的游戏内聊天格式以及内置的反垃圾信息（Anti-Spam）保护。

## 配置

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

### 聊天设置

- **`format`**：聊天消息格式字符串（默认：`"<{DISPLAYNAME}> {MESSAGE}"`）。
  - `{DISPLAYNAME}`：玩家显示名称。
  - `{MESSAGE}`：聊天消息文本。
  > [!NOTE]
  > 当启用了安全聊天举报（`allow_chat_reports = true`）时，自定义聊天格式将不会生效。

### 反垃圾信息保护

Pumpkin 实现了漏桶算法垃圾信息计数器，以防止刷屏玩家和机器人泛洪攻击服务器：

- **`enabled`**：是否启用反垃圾信息保护（默认：`true`）。
- **`spam_threshold`**：踢出玩家的垃圾信息计数器阈值（以 Tick 为单位，默认：`200` Tick）。
- **`message_cost`**：每发送一条聊天消息或命令时，玩家垃圾信息计数器增加的数值（默认：`20` Tick）。
- **`decay_per_tick`**：服务器每 Tick 从玩家垃圾信息计数器中衰减扣除的数值（默认：`1` Tick）。
- **`ops_bypass`**：服务器管理员（OP）是否绕过反垃圾信息检查（默认：`true`）。
