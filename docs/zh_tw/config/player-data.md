# 玩家資料與遊戲機制

用於儲存持久化玩家資料、進度、配方同步以及趣味節日特性的設定均在 `pumpkin.toml` 中設定。

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

### 玩家資料

- **`save_player_data`**：是否將持久化玩家資料（物品欄、位置、生命值）儲存到磁碟（預設：`true`）。
- **`save_player_cron_interval`**：自動定期儲存線上玩家資料的時間間隔，以秒為單位（預設：`300` 秒 / 5 分鐘）。

### 進度

- **`save_advancements`**：是否追蹤玩家進度並將進度儲存到磁碟（預設：`true`）。

### 配方

- **`send_recipes`**：是否將合成與燒煉配方同步給已連線的用戶端，從而啟用用戶端配方書（預設：`true`）。

### 趣味特性

- **`april_fools`**：是否啟用有趣的愚人節季節性彩蛋與特性（預設：`true`）。
