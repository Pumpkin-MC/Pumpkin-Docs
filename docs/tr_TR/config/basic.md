# Temel Yapılandırma

`configuration.toml` dosyasını temsil eder

## Sunucu Adresi

Sunucunun bağlanacağı adres.

:::code-group

```toml [configuration.toml] {2}
server_address = "0.0.0.0:25565"
```

:::

## Tohum

Dünya üretimi için seed.

:::code-group

```toml [configuration.toml] {2}
seed = ""
```

:::

## Maksimum oyuncu

Sunucuda izin verilen maksimum oyuncu sayısı.

:::code-group

```toml [configuration.toml] {2}
max_players = 100000
```

:::

## Görüş mesafesi

Oyuncular için maksimum görüş mesafesi.

:::code-group

```toml [configuration.toml] {2}
view_distance = 10
```

:::

## Simülasyon mesafesi

Oyuncular için maksimum simülasyon mesafesi.

:::code-group

```toml [configuration.toml] {2}
simulation_distance = 10
```

:::

## Varsayılan zorluk

Varsayılan oyun zorluğu.

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

`/op` komutu tarafından atanan izin seviyesi.

:::code-group

```toml [configuration.toml] {2}
op_permission_level = 4
```

:::

## Nether'e izin ver

Nether boyutunun etkin olup olmadığı.

:::code-group

```toml [configuration.toml] {2}
allow_nether = true
```

:::

## Hardcore

Sunucunun hardcore modda olup olmadığı.

:::code-group

```toml [configuration.toml] {2}
hardcore = false
```

:::

## Çevrimiçi Mod

Çevrimiçi modun etkin olup olmadığı. Geçerli Minecraft hesapları gerektirir.

:::code-group

```toml [configuration.toml] {2}
online_mode = true
```

:::

## Şifreleme

Paket şifrelemesinin etkin olup olmadığı.

> [!IMPORTANT]
> Çevrimiçi mod etkinse zorunludur.

:::code-group

```toml [configuration.toml] {2}
encryption = true
```

:::

## MOTD

Günün Mesajı; durum ekranında gösterilen sunucu açıklaması.

:::code-group

```toml [configuration.toml] {2}
motd = "A Blazing fast Pumpkin Server!"
```

:::

## TPS

Sunucunun hedef tick hızı.

:::code-group

```toml [configuration.toml] {2}
tps = 20.0
```

:::

## Varsayılan oyun modu

Oyuncular için varsayılan oyun modu.

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

Oyuncuların IP adreslerini loglardan temizleyip temizlememek.

:::code-group

```toml [configuration.toml] {2}
scrub_ips = true
```

:::

## Favicon kullan

Sunucu favicon'u kullanılsın mı.

:::code-group

```toml [configuration.toml] {2}
use_favicon = true
```

:::

## Favicon yolu

Sunucu favicon'unun yolu.

:::code-group

```toml [configuration.toml] {2}
favicon_path = "icon.png"
```

:::
