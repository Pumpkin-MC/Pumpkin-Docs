# PVP

PVP (プレイヤー対プレイヤーの戦闘) の挙動と戦闘メカニクスは、`pumpkin.toml` 内の `[pvp]` で設定します。

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

### 設定オプション

- **`enabled`**: プレイヤー同士の戦闘 (PVP) を有効化。
- **`hurt_animation`**: 攻撃を受けた際の被ダメージアニメーションを表示。
- **`protect_creative`**: クリエイティブモードのプレイヤーが PVP ダメージを受けるのを防止。
- **`knockback`**: ダメージを受けた際のノックバック効果を有効化。
- **`swing`**: 攻撃時の腕を振るアニメーションを有効化。
