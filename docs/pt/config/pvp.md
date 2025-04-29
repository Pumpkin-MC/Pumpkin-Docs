# PVP

PVP é uma parte fundamental da mecânica Vanilla, com até mesmo a menor mudança afetando a jogabilidade. Pumpkin permite que você configure completamente o PVP.

## Configurando o PVP

#### `enabled`: Booleano

Se o PVP está habilitado ou não.

:::code-group

```toml [features.toml] {2}
[pvp]
enabled = true
```

:::

#### `hurt_animation`: Booleano

Se deve exibir a animação de dano vermelho e o movimento de câmera (FOV) ou não.

:::code-group

```toml [features.toml] {2}
[pvp]
hurt_animation = true
```

:::

#### `protect_creative`: Booleano

Se deve proteger jogadores no modo criativo contra o PVP ou não.

:::code-group

```toml [features.toml] {2}
[pvp]
protect_creative = true
```

:::

#### `knockback`: Booleano

Se os ataques devem ter repulsão (knockback) ou não.

:::code-group

```toml [features.toml] {2}
[pvp]
knockback = true
```

:::

#### `swing`: Booleano

Se os jogadores devem balançar a arma ao atacar ou não.

:::code-group

```toml [features.toml] {2}
[pvp]
swing = true
```

:::

## Configuração Padrão

Por padrão, todas as opções de PVP estão habilitadas para coincidir com o comportamento Vanilla.

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
