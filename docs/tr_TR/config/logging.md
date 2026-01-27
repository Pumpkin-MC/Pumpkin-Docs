# Günlükleme

Pumpkin, loglarınızda ne görmek istediğinizi özelleştirmenize izin verir.

## Günlüklemeyi Yapılandırma

#### `enabled`: Boolean

Günlüklemenin etkin olup olmadığını ayarlar.

:::code-group

```toml [features.toml] {2}
[logging]
enabled = true
```

:::

#### `level`: Enum

Günlük ayrıntı seviyesi. Olası değerler:

- Off
- Error
- Warn
- Info
- Debug
- Trace

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
level = "Debug"
```

:::

#### `env`: Boolean

`RUST_LOG` ortam değişkeniyle log seviyesini seçmeye izin verilip verilmeme davranışını değiştirir.

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
env = true
```

:::

#### `threads`: Boolean

Log mesajında iş parçacıklarının yazdırılıp yazdırılmamasını düzenler.

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
threads = false
```

:::

#### `color`: Boolean

Konsola renkli yazdırılıp yazdırılmamasını düzenler.

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
color = false
```

:::

#### `timestamp`: Boolean

Mesajda zaman damgasının yazdırılıp yazdırılmama davranışını değiştirir.

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
timestamp = false
```

:::

## Varsayılan Yapılandırma

Varsayılan olarak günlükleme `Info` seviyesinde etkindir ve renk, iş parçacığı ve zaman damgalarıyla yazdırır.

:::code-group

```toml [features.toml]
[logging]
enabled = true
level = "Info"
env = false
threads = true
color = true
timestamp = true
```

:::
