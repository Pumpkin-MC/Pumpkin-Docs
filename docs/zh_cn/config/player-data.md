# 玩家数据

Pumpkin 允许您配置玩家数据的保存和管理方式。

## 配置玩家数据

#### `save_player_data`: 布尔值

是否保存玩家数据（物品栏、位置、统计信息等）。

:::code-group

```toml [pumpkin.toml] {2}
[player_data]
save_player_data = true
```

:::

#### `save_player_cron_interval`: 整数

自动保存玩家数据之间的时间间隔（秒）。

:::code-group

```toml [pumpkin.toml] {2}
[player_data]
save_player_cron_interval = 300
```

:::

默认值 `300` 秒等于 **5 分钟**。

## 默认配置

:::code-group

```toml [pumpkin.toml]
[player_data]
save_player_data = true
save_player_cron_interval = 300
```

:::
