# Temel Yapılandırma

`configuration.toml` dosyasını temsil eder

## Sunucu Adresi

Sunucunun bağlanacağı address.

:::code-group

```toml [configuration.toml] {2}
server_address = "0.0.0.0:25565"
```

:::

## Seed

Dünya üretimi için gereklidir.

:::code-group

```toml [configuration.toml] {2}
seed = ""
```

:::

## Maksimum oyuncu

Sunucuda izin verilen maksimum oyuncu sayısını değiştirir.

:::code-group

```toml [configuration.toml] {2}
max_players = 100000
```

:::

## Görüş mesafesi

Oyuncular için maksimum görüş mesafesini değiştirir.

:::code-group

```toml [configuration.toml] {2}
view_distance = 10
```

:::

## Simülasyon mesafesi

Oyuncular için maksimum simülasyon mesafesini değiştirir.

:::code-group

```toml [configuration.toml] {2}
simulation_distance = 10
```

:::

## Varsayılan zorluk

Varsayılan oyun zorluğu değiştirir.

:::code-group

```toml [configuration.toml] {2}
default_difficulty = "Normal"
```

:::

```toml
Peaceful
Easy
Normal
Hard
```

## Operatör izin seviyesi

`/op` komutu tarafından atanan izin seviyesini değiştirir.

:::code-group

```toml [configuration.toml] {2}
op_permission_level = 4
```

:::

## Nether'e izin ver

Nether boyutunu aktif/deaktif etmek için kullanılır.

:::code-group

```toml [configuration.toml] {2}
allow_nether = true
```

:::

## Hardcore

Sunucunun hardcore modda olup olmadığını düzenler.

:::code-group

```toml [configuration.toml] {2}
hardcore = false
```

:::

## Çevrimiçi Mod

Çevrimiçi modun etkin olup olmadığını belirler. Geçerli Minecraft hesapları gerektirir.

:::code-group

```toml [configuration.toml] {2}
online_mode = true
```

:::

## Şifreleme

Packet şifrelemesinin etkin olup olmadığını düzenler.

> [!IMPORTANT]
> Çevrimiçi mod etkinse zorunludur.

:::code-group

```toml [configuration.toml] {2}
encryption = true
```

:::

## MOTD

Günün Mesajı; durum ekranında gösterilen sunucu açıklamasını düzenler.

:::code-group

```toml [configuration.toml] {2}
motd = "A Blazing fast Pumpkin Server!"
```

:::

## TPS

Sunucunun hedef tick hızını belirtir.

:::code-group

```toml [configuration.toml] {2}
tps = 20.0
```

:::

## Varsayılan oyun modu

Oyuncular için varsayılan oyun modunu değiştirir.

:::code-group

```toml [configuration.toml] {2}
default_gamemode = "Survival"
```

:::

```toml
Undefined
Survival
Creative
Adventure
Spectator
```

## IP Temizleme

Oyuncuların IP adreslerini loglardan temizleyip temizlememek için gerekli bir ayar.

:::code-group

```toml [configuration.toml] {2}
scrub_ips = true
```

:::

## Favicon kullan

Sunucu favicon'unu aktifleştirmeye yarayan bir ayar.

:::code-group

```toml [configuration.toml] {2}
use_favicon = true
```

:::

## Favicon yolu

Sunucu favicon'unun yolunu belirtir.

:::code-group

```toml [configuration.toml] {2}
favicon_path = "icon.png"
```

:::

