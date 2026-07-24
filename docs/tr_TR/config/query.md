# Query

Query protokolü, sunucunun durumu hakkında sorgu yapmak için basit bir yöntemdir. Pumpkin Query protokolünü tamamen
destekler.

## Query'yi Yapılandırma

#### `enabled`: Boolean

Query protokolü isteklerini dinleyip dinlememesi.

:::code-group

```toml [pumpkin.toml] {2}
[networking.query]
enabled = true
```

:::

#### `port`: Integer (0-65535) (optional)

Query protokolü isteklerinin dinleneceği port. Belirtilmezse sunucu portuyla aynı portu kullanır.

:::code-group

```toml [pumpkin.toml] {3}
[networking.query]
enabled = true
address = "0.0.0.0:12345"
```

:::

## Varsayılan Yapılandırma

Varsayılan olarak Query devre dışıdır. Etkinleştirilirse, açıkça belirtilmediği sürece sunucu portunda çalışır.

:::code-group

```toml [pumpkin.toml]
[networking.query]
enabled = true
address = "0.0.0.0:25565"
```

:::
