# Komutlar

Pumpkin, Vanilla komutlarını destekler ve bunların nereden çalıştırılabileceğini yapılandırmanıza izin verir.

## Komutları Yapılandırma

#### `use_console`: Boolean

Konsoldan gelen komutların kabul edilip edilmemesi.

:::code-group

```toml [features.toml] {2}
[commands]
use_console = false
```

:::

#### `log_console`: Boolean

Oyunculardan gelen komutların konsola loglanıp loglanmaması.

:::code-group

```toml [features.toml] {2}
[commands]
log_console = false
```

:::

## Operatör izin seviyesi

Tüm oyuncular için varsayılan izin seviyesi.

:::code-group

```toml [configuration.toml] {2}
default_op_level = 0
```

:::

## Varsayılan Yapılandırma

Varsayılan olarak Pumpkin konsoldan komutlara izin verir ve oyuncuların çalıştırdığı tüm komutları loglar.

:::code-group

```toml [features.toml]
[commands]
use_console = true
log_console = true
default_op_level = 0
```

:::
