# LAN Yayını

Pumpkin, yerel oyuncuların sunucuya daha kolay bağlanabilmesi için sunucuyu ağ üzerinden duyurabilir.

## LAN Yayınını Yapılandırma

#### `enabled`: Boolean

LAN yayınının etkin olup olmadığını düzenler.

:::code-group

```toml [features.toml] {2}
[lan_broadcast]
enabled = true
```

:::

#### `motd`: String (optional)

Yayınlanacak MOTD; varsayılan olarak sunucunun MOTD'si kullanılır.

> [!CAUTION]
> LAN yayını MOTD'si çok satırı, RGB renkleri veya gradyanları desteklemez. Pumpkin, MOTD'yi yayınlamadan önce doğrulamaz. Sunucu MOTD'si bu bileşenleri kullanıyorsa, istemcilerin düzgün bir MOTD görmesi için bu alanı tanımlamayı düşünün.

:::code-group

```toml [features.toml] {3}
[lan_broadcast]
enabled = true
motd = "[your MOTD here]"
```

:::

#### `port`: Integer (0-65535) (optional)

Bağlanılacak port. Belirtilmezse port 0'a (sistemdeki herhangi bir kullanılabilir port) bağlanır.

> [!IMPORTANT]
> Protokol, hangi porta yayın yapılacağını tanımlar. Bu seçenek yalnızca ana makinede hangi porta bağlanılacağını belirtmek içindir. Bu seçenek sadece portun öngörülebilir olabilmesi için vardır.

:::code-group

```toml [features.toml] {3}
[lan_broadcast]
enabled = true
port = 46733
```

:::

## Varsayılan Yapılandırma

Varsayılan olarak LAN yayını devre dışıdır.

:::code-group

```toml [features.toml]
[lan_broadcast]
enabled = false
motd = "[server MOTD here]"
port = 0
```

:::
