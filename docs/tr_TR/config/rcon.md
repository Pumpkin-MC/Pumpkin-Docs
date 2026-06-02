# RCON

RCON, sunucuyu farklı bir cihazdan uzaktan yönetmenizi sağlayan bir protokoldür. Pumpkin, RCON için tam destek sunar.

## RCON'u Yapılandırma

#### `enabled`: Boolean

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon]
enabled = true
```

:::

#### `address`: String

RCON'un dinleyeceği address ve port.

:::code-group

```toml [pumpkin.toml] {3}
[networking.rcon]
enabled = true
address = "0.0.0.0:25575"
```

:::

#### `password`: String

RCON kimlik doğrulaması için kullanılacak parola.

:::code-group

```toml [pumpkin.toml] {3}
[networking.rcon]
enabled = true
password = "[your safe password here]"
```

:::

#### `max_connections`: Integer

Aynı anda izin verilen RCON bağlantı sayısı. Sınırı kaldırmak için bunu 0 yapın.

:::code-group

```toml [pumpkin.toml] {3}
[networking.rcon]
enabled = true
max_connections = 5
```

:::

### Günlükleme

#### `logged_successfully`: Boolean

Başarılı girişlerin konsola loglanıp loglanmaması ayarını değiştirir.

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
logged_successfully = true
```

:::

#### `wrong_password`: Boolean

Yanlış parola denemelerinin konsola loglanıp loglanmaması ayarını değiştirir.

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
logged_successfully = true
```

:::

#### `commands`: Boolean

RCON üzerinden çalıştırılan komutların konsola loglanıp loglanmaması ayarını değiştirir.

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
commands = true
```

:::

#### `quit`: Boolean

RCON istemcisinin çıkışının loglanıp loglanmaması ayarını değiştirir.

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
quit = true
```

:::

## Varsayılan Yapılandırma

Varsayılan olarak RCON devre dışıdır.

:::code-group

```toml [pumpkin.toml]
[networking.rcon]
enabled = false
address = "0.0.0.0:25575"
password = ""
max_connections = 0

[networking.rcon.logging]
logged_successfully = true
wrong_password = true
commands = true
quit = true
```

:::
