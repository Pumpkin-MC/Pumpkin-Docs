# RCON

RCON, sunucuyu farklı bir cihazdan uzaktan yönetmenizi sağlayan bir protokoldür. Pumpkin, RCON için tam destek sunar.

## RCON'u Yapılandırma

#### `enabled`: Boolean

:::code-group

```toml [features.toml] {2}
[rcon]
enabled = true
```

:::

#### `address`: String

RCON'un dinleyeceği address ve port.

:::code-group

```toml [features.toml] {3}
[rcon]
enabled = true
address = "0.0.0.0:25575"
```

:::

#### `password`: String

RCON kimlik doğrulaması için kullanılacak parola.

:::code-group

```toml [features.toml] {3}
[rcon]
enabled = true
password = "[your safe password here]"
```

:::

#### `max_connections`: Integer

Aynı anda izin verilen RCON bağlantı sayısı. Sınırı kaldırmak için bunu 0 yapın.

:::code-group

```toml [features.toml] {3}
[rcon]
enabled = true
max_connections = 5
```

:::

### Günlükleme

#### `log_logged_successfully`: Boolean

Başarılı girişlerin konsola loglanıp loglanmaması ayarını değiştirir.

:::code-group

```toml [features.toml] {2}
[rcon.logging]
log_logged_successfully = true
```

:::

#### `log_wrong_password`: Boolean

Yanlış parola denemelerinin konsola loglanıp loglanmaması ayarını değiştirir.

:::code-group

```toml [features.toml] {2}
[rcon.logging]
log_logged_successfully = true
```

:::

#### `log_commands`: Boolean

RCON üzerinden çalıştırılan komutların konsola loglanıp loglanmaması ayarını değiştirir.

:::code-group

```toml [features.toml] {2}
[rcon.logging]
log_commands = true
```

:::

#### `log_quit`: Boolean

RCON istemcisinin çıkışının loglanıp loglanmaması ayarını değiştirir.

:::code-group

```toml [features.toml] {2}
[rcon.logging]
log_quit = true
```

:::

## Varsayılan Yapılandırma

Varsayılan olarak RCON devre dışıdır.

:::code-group

```toml [features.toml]
[rcon]
enabled = false
address = "0.0.0.0:25575"
password = ""
max_connections = 0

[rcon.logging]
log_logged_successfully = true
log_wrong_password = true
log_commands = true
log_quit = true
```

:::
