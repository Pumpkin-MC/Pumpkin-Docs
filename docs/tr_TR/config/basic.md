# Temel Yapılandırma

`pumpkin.toml` içindeki üst düzey alanları temsil eder. Bunlar sunucunun temel ayarlarıdır.

## Java Edition

Java Edition istemcilerinin kabul edilip edilmeyeceği.

:::code-group

```toml [pumpkin.toml] {2}
java_edition = true
```

:::

## Java Edition Adresi

Java Edition sunucusunun bağlanacağı adres ve port.

:::code-group

```toml [pumpkin.toml] {2}
java_edition_address = "0.0.0.0:25565"
```

:::

## Bedrock Edition

Bedrock Edition istemcilerinin kabul edilip edilmeyeceği.

:::code-group

```toml [pumpkin.toml] {2}
bedrock_edition = true
```

:::

## Bedrock Edition Adresi

Bedrock Edition sunucusunun bağlanacağı adres ve port.

:::code-group

```toml [pumpkin.toml] {2}
bedrock_edition_address = "0.0.0.0:19132"
```

:::

## Seed

Dünya üretimi için kullanılan seed.

:::code-group

```toml [pumpkin.toml] {2}
seed = ""
```

:::

## Maksimum oyuncu

Sunucuda aynı anda bulunabilecek maksimum oyuncu sayısı. `0` limiti devre dışı bırakır.

:::code-group

```toml [pumpkin.toml] {2}
max_players = 1000
```

:::

## Görüş mesafesi

Oyuncular için maksimum görüş mesafesi.

:::code-group

```toml [pumpkin.toml] {2}
view_distance = 16
```

:::

## Simülasyon mesafesi

Oyuncular için maksimum simülasyon mesafesi.

:::code-group

```toml [pumpkin.toml] {2}
simulation_distance = 10
```

:::

## Varsayılan zorluk

Varsayılan oyun zorluğu.

:::code-group

```toml [pumpkin.toml] {2}
default_difficulty = "Normal"
```

:::

```toml
Peaceful
Easy
Normal
Hard
```

## Operatör yetki seviyesi

`/op` komutu tarafından atanan yetki seviyesi.

:::code-group

```toml [pumpkin.toml] {2}
op_permission_level = 4
```

:::

## Nether'e izin ver

Nether boyutunun etkin olup olmadığı.

:::code-group

```toml [pumpkin.toml] {2}
allow_nether = true
```

:::

## End'e izin ver

End boyutunun etkin olup olmadığı.

:::code-group

```toml [pumpkin.toml] {2}
allow_end = true
```

:::

## Hardcore

Sunucunun hardcore modunda çalışıp çalışmadığı.

:::code-group

```toml [pumpkin.toml] {2}
hardcore = false
```

:::

## Çevrimiçi Mod

Çevrimiçi modun etkin olup olmadığı. Geçerli Minecraft hesapları gerektirir.

:::code-group

```toml [pumpkin.toml] {2}
online_mode = true
```

:::

## Şifreleme

Paket şifrelemenin etkin olup olmadığı.

> [!IMPORTANT]
> Çevrimiçi mod etkin olduğunda gereklidir.

:::code-group

```toml [pumpkin.toml] {2}
encryption = true
```

:::

## MOTD

Günün Mesajı; durum ekranında görüntülenen sunucu açıklaması.

:::code-group

```toml [pumpkin.toml] {2}
motd = "A blazingly fast Pumpkin server!"
```

:::

## TPS

Sunucunun hedef tick oranı.

:::code-group

```toml [pumpkin.toml] {2}
tps = 20.0
```

:::

## Varsayılan oyun modu

Oyuncular için varsayılan oyun modu.

:::code-group

```toml [pumpkin.toml] {2}
default_gamemode = "Survival"
```

:::

```toml
Survival
Creative
Adventure
Spectator
```

## Oyun modunu zorla

Sunucunun girişte oyun modunu zorlayıp zorlamadığı.

:::code-group

```toml [pumpkin.toml] {2}
force_gamemode = false
```

:::

## IP Temizleme

Oyuncu IP adreslerinin loglardan silinip silinmeyeceği.

:::code-group

```toml [pumpkin.toml] {2}
scrub_ips = true
```

:::

## Favicon kullan

Sunucu faviconunun kullanılıp kullanılmayacağı.

:::code-group

```toml [pumpkin.toml] {2}
use_favicon = true
```

:::

## Favicon yolu

Sunucu faviconunun dosya yolu.

:::code-group

```toml [pumpkin.toml] {2}
favicon_path = "icon.png"
```

:::

## Varsayılan dünya adı

Dünya için varsayılan ad.

:::code-group

```toml [pumpkin.toml] {2}
default_level_name = "world"
```

:::

## Sohbet raporlarına izin ver

Sohbet mesajlarının imzalanıp raporlanabilir olup olmayacağı.

:::code-group

```toml [pumpkin.toml] {2}
allow_chat_reports = false
```

:::

## Whitelist

Whitelist'in etkin olup olmadığı.

:::code-group

```toml [pumpkin.toml] {2}
white_list = false
```

:::

## Whitelist'i uygula

Whitelist'te olmayan oyuncuların atılıp atılmayacağı.

:::code-group

```toml [pumpkin.toml] {2}
enforce_whitelist = false
```

:::
