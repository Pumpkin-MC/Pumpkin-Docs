# PVP
PVP is een kernonderdeel van de vanillemechanica, waarbij zelfs de kleinste verandering de gameplay beïnvloedt. Pumpkin stelt je in staat om PVP volledig te configureren.

## PVP configureren

#### `enabled`: Boolean
Of PVP is ingeschakeld of niet.

:::code-group
```toml [features.toml] {2}
[pvp]
enabled = true
```
:::

#### `hurt_animation`: Boolean
Of de rode pijnanimatie en FOV-bobbing moeten worden weergegeven of niet.

:::code-group
```toml [features.toml] {2}
[pvp]
hurt_animation = true
```
:::

#### `protect_creative`: Boolean
Of spelers in creatieve modus beschermd moeten worden tegen PVP of niet.

:::code-group
```toml [features.toml] {2}
[pvp]
protect_creative = true
```
:::

#### `knockback`: Boolean
Of aanvallen terugslag moeten hebben of niet.

:::code-group
```toml [features.toml] {2}
[pvp]
knockback = true
```
:::

#### `swing`: Boolean
Of spelers moeten zwaaien bij het aanvallen of niet.

:::code-group
```toml [features.toml] {2}
[pvp]
swing = true
```
:::

## Standaardconfiguratie
Standaard zijn alle PVP-opties ingeschakeld om het vanillegedrag te evenaren.

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
