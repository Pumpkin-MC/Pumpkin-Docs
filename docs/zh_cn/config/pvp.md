# PVP
PVP 是原版机制的核心部分，即使是最小的变化也会影响游戏玩法。Pumpkin 允许你完全配置 PVP。

## 配置 PVP

#### `enabled`: 布尔值
是否启用 PVP。

:::code-group
```toml [features.toml] {2}
[pvp]
enabled = true
```
:::

#### `hurt_animation`: 布尔值
是否显示红色受伤动画和 FOV 摇晃。

:::code-group
```toml [features.toml] {2}
[pvp]
hurt_animation = true
```
:::

#### `protect_creative`: 布尔值
是否保护创造模式下的玩家免受 PVP 伤害。

:::code-group
```toml [features.toml] {2}
[pvp]
protect_creative = true
```
:::

#### `knockback`: 布尔值
攻击是否应该有击退效果。

:::code-group
```toml [features.toml] {2}
[pvp]
knockback = true
```
:::

#### `swing`: 布尔值
玩家攻击时是否应该有挥动动作。

:::code-group
```toml [features.toml] {2}
[pvp]
swing = true
```
:::

## 默认配置
默认情况下，所有 PVP 选项都启用，以匹配原版行为。

:::code-group
```toml [features.toml]
[pvp]
enabled = true
hurt_animation = true
protect_creative = true
knockback = true
swing = true
```
::: 