# Sıkıştırma

Sıkıştırma, packets boyutunu azaltmak için kullanılır. Bu, sunucu tarafında bant genişliğini azaltır ve daha yavaş internet bağlantısına sahip oyunculara yardımcı olur.

## Sıkıştırmayı Yapılandırma

#### `enabled`: Boolean

packet sıkıştırmasının etkin olup olmadığını belirler.

> [!TIP]
> Sunucu bir proxy arkasındaysa sıkıştırmayı devre dışı bırakmak faydalı olabilir.

:::code-group

```toml [features.toml] {2}
[packet_compression]
enabled = true
```

:::

#### `threshold`: Integer (0-1024)

Sunucunun packet sıkıştırmayı denemeden önceki minimum packet boyutu.

> [!CAUTION]
> Bu değeri artırmak daha yavaş bağlantıya sahip oyuncuları olumsuz etkileyebilir.

:::code-group

```toml [features.toml] {2}
[packet_compression]
threshold = 256
```

:::

#### `level`: Integer (0-9)

0 ile 9 arasında bir değer: 0 sıkıştırmayı devre dışı bırakır, 1 en hızlı sıkıştırmadır (boyut pahasına), 9 ise maksimum sıkıştırmadır (hız pahasına).

:::code-group

```toml [features.toml] {2}
[packet_compression]
level = 4
```

:::

## Varsayılan yapılandırma

Varsayılan olarak sıkıştırma etkindir.

:::code-group

```toml [features.toml]
[packet_compression]
enabled = true
threshold = 256
level = 4
```

:::

