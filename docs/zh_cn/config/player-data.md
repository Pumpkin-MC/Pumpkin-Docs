# 玩家数据与游戏机制

用于保存持久化玩家数据、进度、配方同步以及趣味节日特性的设置均在 `pumpkin.toml` 中配置。

## 配置

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

### 玩家数据

- **`save_player_data`**：是否将持久化玩家数据（物品栏、位置、生命值）保存到磁盘（默认：`true`）。
- **`save_player_cron_interval`**：自动定期保存在线玩家数据的时间间隔，以秒为单位（默认：`300` 秒 / 5 分钟）。

### 进度

- **`save_advancements`**：是否追踪玩家进度并将进度保存到磁盘（默认：`true`）。

### 配方

- **`send_recipes`**：是否将合成与烧炼配方同步给已连接的客户端，从而启用客户端配方书（默认：`true`）。

### 趣味特性

- **`april_fools`**：是否启用有趣的愚人节季节性彩蛋与特性（默认：`true`）。
