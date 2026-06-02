# 世界

Pumpkin 允许您配置世界生成、区块存储、光照和自动保存。

## 光照

#### `lighting`: 枚举

控制区块生成期间的光照计算策略。

:::code-group

```toml [pumpkin.toml] {2}
[world]
lighting = "default"
```

:::

```toml
default
full
dark
```

## 自动保存

#### `autosave_ticks`: 整数

自动保存世界之间的间隔，以服务器 tick 为单位。设置为 `0` 以禁用自动保存。

:::code-group

```toml [pumpkin.toml] {2}
[world]
autosave_ticks = 0
```

:::

## 世界类型

#### `level_type`: 字符串

要使用的世界生成器。`minecraft:` 前缀是可选的。

:::code-group

```toml [pumpkin.toml] {2}
[world]
level_type = "minecraft:normal"
```

:::

```toml
minecraft:normal
minecraft:flat
```

未知值将回退到正常生成。

## 生成器设置

#### `generator_settings`: 字符串

生成器特定的设置。空值选择 **Classic Flat** 预设。

:::code-group

```toml [pumpkin.toml] {2}
[world]
generator_settings = ""
```

:::

## 超平坦（Superflat）

设置 `level_type = "flat"` 可生成可玩的超平坦世界，具有固定的水平层、单一生物群系，没有地形噪声。

### 预设格式

`generator_settings` 字符串遵循 Vanilla 格式：

```
layers;biome
```

#### 层

**从下到上**排列的方块层列表，以逗号分隔。每个条目：

- `minecraft:block_name` — 单层
- `count*minecraft:block_name` — 多层堆叠（例如 `3*minecraft:stone`）

#### 生物群系

分号之后的部分设置世界生物群系（例如 `minecraft:plains`、`minecraft:desert`）。

### Classic Flat 预设

当 `generator_settings` 为空时：

```
minecraft:bedrock,2*minecraft:dirt,minecraft:grass_block;minecraft:plains
```

## 区块存储

#### `type`: 枚举

区块存储格式控制区块数据如何保存到磁盘。

:::code-group

```toml [pumpkin.toml] {2}
[world.chunk]
type = "pump"
```

:::

```toml
pump
anvil
linear
```
