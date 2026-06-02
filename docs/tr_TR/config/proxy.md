# Proxy

Birçok sunucu, bağlantıları yönetmek ve oyuncuları sunucular arasında dağıtmak için proxy kullanır. Pumpkin aşağıdaki proxy protokollerini destekler:

- [Velocity](https://papermc.io/software/velocity)
- [BungeeCord](https://www.spigotmc.org/wiki/bungeecord-installation/)

> [!TIP]
> Velocity, çoğu sunucu ağı için önerilir. Velocity, BungeeCord'a kıyasla daha modern ve daha performanslıdır.

## Proxy'yi Yapılandırma

#### `enabled`: Boolean

Proxy desteğini etkinleştirir.

:::code-group

```toml [pumpkin.toml]{2}
[networking.proxy]
enabled = true
```

:::

### Velocity

#### `enabled`: Boolean

Velocity desteğinin etkin olup olmadığı davranışını değiştirir.

:::code-group

```toml [pumpkin.toml]{2}
[networking.proxy.velocity]
enabled = true
```

:::

#### `secret`: String

Velocity'de yapılandırılan gizli anahtar.

:::code-group

```toml [pumpkin.toml]{3}
[networking.proxy.velocity]
enabled = true
secret = "[proxy secret here]"
```

:::

### BungeeCord

#### `enabled`: Boolean

BungeeCord desteğinin etkin olup olmadığı ayarını değiştirir.

:::code-group

```toml [pumpkin.toml]{2}
[networking.proxy.bungeecord]
enabled = true
```

:::

> [!CAUTION]
> BungeeCord, oyuncu bilgilerinin proxy'nizden mi yoksa bir sahtekârdan mı geldiğini doğrulayamaz. Sunucunun güvenlik duvarının doğru yapılandırıldığından emin olun.

## Varsayılan Yapılandırma

Varsayılan olarak proxy desteği devre dışıdır. Varsayılan yapılandırma şöyledir:

:::code-group

```toml [pumpkin.toml]
[networking.proxy]
enabled = false

[networking.proxy.velocity]
enabled = false
secret = ""

[networking.proxy.bungeecord]
enabled = false
```

:::
