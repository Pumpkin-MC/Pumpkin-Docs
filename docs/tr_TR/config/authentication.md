# Kimlik Doğrulama

Sunucular, istemcinin geçerli ve ücretli bir hesapla oynadığından emin olmak için Mojang'in oturum sunucularıyla kimlik doğrulaması yapar. Pumpkin, kimlik doğrulamayı tamamen yapılandırmanıza olanak tanır.

## Kimlik Doğrulamayı Yapılandırma

> [!WARNING]
> Çoğu sunucu varsayılan kimlik doğrulama yapılandırmasını değiştirmemelidir. Bunu yapmak beklenmeyen sonuçlara yol açabilir. **Ne yaptığınızı bilmiyorsanız bu ayarları değiştirmeyin!**

#### `enabled`: Boolean

Kimlik doğrulamanın etkin olup olmadığı.

:::code-group

```toml [features.toml] {2}
[authentication]
enabled = false
```

:::

#### `prevent_proxy_connections`: Boolean

Proxy bağlantılarını engelleyip engellememe.

:::code-group

```toml [features.toml] {3}
[authentication]
enabled = true
prevent_proxy_connections = true
```

:::

#### `auth_url`: String (optional)

Kimlik doğrulama için kullanılacak URL. Belirtilmezse Mojang'in oturum sunucuları kullanılır.

##### Yer Tutucular

| Yer tutucu     | Açıklama             |
| -------------- | -------------------- |
| `{username}`   | Oyuncu kullanıcı adı |
| `{server_hash}` | Sunucunun hash'i    |

:::code-group

```toml [features.toml] {2}
[authentication]
auth_url = "[custom auth server here]"
```

:::

#### `prevent_proxy_connection_auth_url`: String (optional)

`prevent_proxy_connections` etkinse kullanılacak kimlik doğrulama URL'si. Belirtilmezse Mojang'in oturum sunucuları kullanılır.

##### Yer Tutucular

| Yer tutucu     | Açıklama                 |
| -------------- | ------------------------ |
| `{username}`   | Oyuncu kullanıcı adı     |
| `{server_hash}` | Sunucunun hash'i        |
| `{ip}`         | Oyuncunun IP adresi      |

:::code-group

```toml [features.toml] {2}
[authentication]
prevent_proxy_connection_auth_url = "[custom auth server here]"
```

:::

### Oyuncu Profili

#### `allow_banned_players`: Boolean

Mojang tarafından işaretlenen oyunculara izin ver.

:::code-group

```toml [features.toml] {2}
[authentication.player_profile]
allow_banned_players = true
```

:::

#### `allowed_actions`: String Array

`allow_banned_players` etkinse hangi eylemlere izin verileceği.

:::code-group

```toml [features.toml] {3}
[authentication.player_profile]
allow_banned_players = true
allowed_actions = ["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]
```

:::

### Dokular

#### `enabled`: Boolean

Oyuncu dokularını (örn. skin/cape) filtrelemek/doğrulamak.

:::code-group

```toml [features.toml] {2}
[authentication.textures]
enabled = true
```

:::

#### `allowed_url_schemes`: String Array

Dokular için izin verilen URL şemaları.

:::code-group

```toml [features.toml] {3}
[authentication.textures]
enabled = true
allowed_url_schemes = ["http", "https"]
```

:::

#### `allowed_url_domains`: String Array

Dokular için izin verilen URL alan adları.

:::code-group

```toml [features.toml] {3}
[authentication.textures]
enabled = true
allowed_url_domains = [".minecraft.net", ".mojang.com"]
```

:::

### Doku Türleri

#### `skin`: Boolean

Oyuncu skinlerini kullanıp kullanmama.

:::code-group

```toml [features.toml] {3}
[authentication.textures.types]
skin = true
```

:::

#### `cape`: Boolean

Oyuncu capelerini kullanıp kullanmama.

:::code-group

```toml [features.toml] {3}
[authentication.textures.types]
cape = true
```

:::

#### `elytra`: Boolean

Oyuncu elytralarını kullanıp kullanmama.

:::code-group

```toml [features.toml] {3}
[authentication.textures.types]
elytra = true
```

:::

## Varsayılan Yapılandırma

Varsayılan olarak kimlik doğrulama etkindir ve Mojang'in sunucularını kullanır. Varsayılan yapılandırma:
:::code-group

```toml [features.toml]
[authentication]
enabled = true
prevent_proxy_connections = false

[authentication.player_profile]
allow_banned_players = false
allowed_actions = ["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]

[authentication.textures]
enabled = true
allowed_url_schemes = ["http", "https"]
allowed_url_domains = [".minecraft.net", ".mojang.com"]

[authentication.textures.types]
skin = true
cape = true
elytra = true
```

:::
