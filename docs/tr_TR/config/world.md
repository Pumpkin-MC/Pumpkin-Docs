# Dünya

Pumpkin, `pumpkin.toml` dosyasındaki `[world]` altında dünya depolama formatlarının, otomatik kaydetme aralıklarının ve aydınlatma modlarının ayrıntılı olarak ayarlanmasına olanak tanır.

## Yapılandırma

:::code-group

```toml [pumpkin.toml]
[world]
lighting = "default"
autosave_ticks = 6000

[world.chunk]
type = "anvil"
write_in_place = false

[world.chunk.compression]
algorithm = "LZ4"
level = 6
```

:::

### Dünya Ayarları

- **`lighting`**: Işık motorunun yayılım hesaplama modu.
  - `"default"`: Standart Vanilla Minecraft ışık yayılımı.
  - `"full"`: Gölgeler olmaksızın her yerde tam gökyüzü ışığı.
  - `"dark"`: Her yerde tamamen karanlık aydınlatma (sıfır ışık).
- **`autosave_ticks`**: Dünyanın otomatik kaydedilmesi arasındaki sunucu tick sayısı (varsayılan: `6000`, 20 TPS'de 5 dakikaya eşdeğerdir). Bunun `0` olarak ayarlanması dünyanın otomatik kaydedilmesini devre dışı bırakır.

### Chunk Depolama Ayarları

- **`type`**: Kullanılacak chunk depolama formatı:
  - `"anvil"`: Standart Minecraft Anvil bölge dosyası formatı (`.mca`).
  - `"linear"`: Daha küçük disk alanı için hızlı sıkıştırma kullanan Linear bölge depolama formatı.
  - `"pump"`: Pumpkin'ın yerel optimize edilmiş dünya formatı.
- **`write_in_place`**: Chunk'ların boş alanları yeniden tahsis etmek yerine mevcut bölge dosyaları içinde doğrudan yerinde (in-place) yeniden yazılıp yazılmayacağı (varsayılan: `false`).
- **`compression.algorithm`**: Chunk verileri için kullanılan sıkıştırma algoritması (`"LZ4"`, `"ZLib"`, `"GZip"`, `"Custom"`).
- **`compression.level`**: Chunk depolaması için sıkıştırma düzeyi (varsayılan: `6`).
