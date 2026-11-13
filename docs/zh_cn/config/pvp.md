# PVP

PVP 行为和战斗机制在 `pumpkin.toml` 的 `[pvp]` 下配置。

## 配置

:::code-group

```toml [pumpkin.toml]
[pvp]
enabled = true
hurt_animation = true
protect_creative = true
knockback = true
swing = true
```

:::

### 配置选项

- **`enabled`**：启用玩家对战（PVP）。
- **`hurt_animation`**：受到攻击时显示受伤动画。
- **`protect_creative`**：防止创造模式玩家受到 PVP 伤害。
- **`knockback`**：受到伤害时启用击退效果。
- **`swing`**：攻击时启用手臂挥动动画。
