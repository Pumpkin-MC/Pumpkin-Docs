# Query

Query protokolü, sunucunun durumu hakkında sorgu yapmak için basit bir yöntemdir. Pumpkin Query protokolünü tamamen destekler.

## Query'yi Yapılandırma

#### `enabled`: Boolean

Query protokolü isteklerini dinleyip dinlememesi.

:::code-group

```toml [features.toml] {2}
[query]
enabled = true
```

:::

#### `port`: Integer (0-65535) (optional)

Query protokolü isteklerinin dinleneceği port. Belirtilmezse sunucu portuyla aynı portu kullanır.

:::code-group

```toml [features.toml] {3}
[query]
enabled = true
port = 12345
```

:::

## Varsayılan Yapılandırma

Varsayılan olarak Query devre dışıdır. Etkinleştirilirse, açıkça belirtilmediği sürece sunucu portunda çalışır.

:::code-group

```toml [features.toml]
[query]
enabled = true
port = 25565
```

:::
