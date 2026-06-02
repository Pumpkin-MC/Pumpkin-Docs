# Oyuncu Verileri

Pumpkin, oyuncu verilerinin nasıl kaydedileceğini ve yönetileceğini yapılandırmanıza olanak tanır.

## Oyuncu verilerini yapılandırma

#### `save_player_data`: Boolean

Oyuncu verilerinin (envanter, konum, istatistikler vb.) kaydedilip kaydedilmeyeceği.

:::code-group

```toml [pumpkin.toml] {2}
[player_data]
save_player_data = true
```

:::

#### `save_player_cron_interval`: Tam sayı

Otomatik oyuncu verisi kaydetme işlemleri arasındaki süre (saniye cinsinden).

:::code-group

```toml [pumpkin.toml] {2}
[player_data]
save_player_cron_interval = 300
```

:::

Varsayılan `300` saniye değeri **5 dakikaya** eşittir.

## Varsayılan yapılandırma

:::code-group

```toml [pumpkin.toml]
[player_data]
save_player_data = true
save_player_cron_interval = 300
```

:::
