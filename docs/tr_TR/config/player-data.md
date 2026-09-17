# Oyuncu Verileri ve Oynanış

Kalıcı oyuncu verilerini, başarımları, tarif senkronizasyonunu ve eğlenceli sezonluk özellikleri kaydetmeye yönelik ayarlar `pumpkin.toml` dosyasında yapılandırılır.

## Yapılandırma

:::code-group

```toml [pumpkin.toml]
[player_data]
save_player_data = true
save_player_cron_interval = 300

[advancement]
save_advancements = true

[recipe]
send_recipes = true

[fun]
april_fools = true
```

:::

### Oyuncu Verileri

- **`save_player_data`**: Kalıcı oyuncu verilerinin (envanter, konum, can) diske kaydedilip kaydedilmeyeceği (varsayılan: `true`).
- **`save_player_cron_interval`**: Çevrimiçi oyuncu verilerinin otomatik periyodik kayıtları arasındaki saniye cinsinden zaman aralığı (varsayılan: `300` saniye / 5 dakika).

### Başarımlar

- **`save_advancements`**: Oyuncu başarım ilerlemesinin takip edilip diske kaydedilip kaydedilmeyeceği (varsayılan: `true`).

### Tarifler

- **`send_recipes`**: Üretim (crafting) ve eritme (smelting) tariflerinin bağlı istemcilerle senkronize edilerek istemci tarafındaki tarif kitabının etkinleştirilip etkinleştirilmeyeceği (varsayılan: `true`).

### Eğlenceli Özellikler

- **`april_fools`**: Eğlenceli ve sezonluk 1 Nisan sürpriz yumurtalarının (easter eggs) ve özelliklerinin etkin olup olmadığı (varsayılan: `true`).
