# PVP

PVP 行為和戰鬥機制在 `pumpkin.toml` 的 `[pvp]` 下設定。

## 設定

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

### 設定選項

- **`enabled`**：啟用玩家對戰（PVP）。
- **`hurt_animation`**：受到攻擊時顯示受傷動畫。
- **`protect_creative`**：防止創造模式玩家受到 PVP 傷害。
- **`knockback`**：受到傷害時啟用擊退效果。
- **`swing`**：攻擊時啟用手臂揮動動畫。
