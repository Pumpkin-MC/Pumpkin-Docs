# PVP

PVP, Vanilla mekaniğinin temel bir parçasıdır; en küçük değişiklik bile oynanışı etkiler. Pumpkin, PVP'yi tamamen yapılandırmanıza olanak tanır.

## PVP'yi Yapılandırma

#### `enabled`: Boolean

PVP'nin etkin olup olmadığı.

:::code-group

```toml [features.toml] {2}
[pvp]
enabled = true
```

:::

#### `hurt_animation`: Boolean

Kırmızı hasar animasyonu ve FOV sallanmasının gösterilip gösterilmemesi.

:::code-group

```toml [features.toml] {2}
[pvp]
hurt_animation = true
```

:::

#### `protect_creative`: Boolean

Yaratıcı moddaki oyuncuların PVP'ye karşı korunup korunmaması.

:::code-group

```toml [features.toml] {2}
[pvp]
protect_creative = true
```

:::

#### `knockback`: Boolean

Saldırıların geri tepme (knockback) uygulayıp uygulamaması.

:::code-group

```toml [features.toml] {2}
[pvp]
knockback = true
```

:::

#### `swing`: Boolean

Saldırırken oyuncuların sallama animasyonu yapıp yapmaması.

:::code-group

```toml [features.toml] {2}
[pvp]
swing = true
```

:::

## Varsayılan Yapılandırma

Varsayılan olarak Vanilla davranışına uyması için tüm PVP seçenekleri etkindir.

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
