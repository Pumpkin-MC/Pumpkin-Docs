# Dünya

Pumpkin, dünya üretimi, yığın depolama, aydınlatma ve otomatik kaydetmeyi yapılandırmanıza olanak tanır.

## Aydınlatma

#### `lighting`: Enum

Yığın üretimi sırasında aydınlatma hesaplamasını kontrol eder.

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

## Otomatik Kaydetme

#### `autosave_ticks`: Tam sayı

Sunucu tick'leri cinsinden otomatik dünya kaydetme işlemleri arasındaki süre. Devre dışı bırakmak için `0` olarak ayarlayın.

:::code-group

```toml [pumpkin.toml] {2}
[world]
autosave_ticks = 0
```

:::

## Dünya Tipi

#### `level_type`: Dize

Kullanılacak dünya oluşturucu. `minecraft:` öneki isteğe bağlıdır.

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

Bilinmeyen değerler normal üretime geri döner.

## Oluşturucu Ayarları

#### `generator_settings`: Dize

Oluşturucuya özgü ayarlar. Boş bir değer **Classic Flat** ön ayarını seçer.

:::code-group

```toml [pumpkin.toml] {2}
[world]
generator_settings = ""
```

:::

## Superflat

Sabit yatay katmanlara, tek bir biyoma ve arazi gürültüsüne sahip oynanabilir bir superflat dünya oluşturmak için `level_type = "flat"` ayarını kullanın.

### Ön ayar formatı

`generator_settings` dizgesi Vanilla formatını takip eder:

```
layers;biome
```

#### Katmanlar

**Aşağıdan yukarıya** sıralanmış blok katmanlarının virgülle ayrılmış listesi. Her giriş:

- `minecraft:block_name` — tek bir katman
- `count*minecraft:block_name` — birden fazla yığılmış katman (örn. `3*minecraft:stone`)

#### Biyom

Noktalı virgülden sonraki kısım dünya biyomunu ayarlar (örn. `minecraft:plains`, `minecraft:desert`).

### Classic Flat ön ayarı

`generator_settings` boş olduğunda:

```
minecraft:bedrock,2*minecraft:dirt,minecraft:grass_block;minecraft:plains
```

## Yığın Depolama

#### `type`: Enum

Yığın depolama formatı, yığın verilerinin diske nasıl kaydedileceğini kontrol eder.

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
