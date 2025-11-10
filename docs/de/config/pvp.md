# PVP

PVP ist ein Kernbestandteil der Vanilla‑Mechaniken; selbst kleine Änderungen beeinflussen das Gameplay. Pumpkin erlaubt dir, PVP vollständig zu konfigurieren.

## PVP konfigurieren

#### `enabled`: Boolean

Ob PVP aktiviert ist.

:::code-group

```toml [features.toml] {2}
[pvp]
enabled = true
```

:::

#### `hurt_animation`: Boolean

Ob die rote Treffer‑Animation und FOV‑Bobbing angezeigt werden.

:::code-group

```toml [features.toml] {2}
[pvp]
hurt_animation = true
```

:::

#### `protect_creative`: Boolean

Ob Spieler im Kreativmodus vor PVP geschützt werden.

:::code-group

```toml [features.toml] {2}
[pvp]
protect_creative = true
```

:::

#### `knockback`: Boolean

Ob Angriffe Rückstoß haben.

:::code-group

```toml [features.toml] {2}
[pvp]
knockback = true
```

:::

#### `swing`: Boolean

Ob Spieler beim Angriff die Arm‑Schwung‑Animation ausführen.

:::code-group

```toml [features.toml] {2}
[pvp]
swing = true
```

:::

## Standardkonfiguration

Standardmäßig sind alle PVP‑Optionen aktiviert, um das Vanilla‑Verhalten abzubilden.

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
