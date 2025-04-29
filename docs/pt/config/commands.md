# Comandos

Pumpkin suporta comandos Vanilla e permite configurar onde eles podem ser executados.

## Configurando Comandos

#### `use_console`: Booleano

Se os comandos do console são aceitos ou não.

:::code-group

```toml [features.toml] {2}
[commands]
use_console = false
```

:::

#### `log_console`: Booleano

Se os comandos dos jogadores devem ser registrados no console ou não.

:::code-group

```toml [features.toml] {2}
[commands]
log_console = false
```

:::

## Nível de permissão de operação

O nível de permissão padrão para todos os jogadores.

:::code-group

```toml [configuration.toml] {2}
default_op_level = 0
```

:::

## Configuração Padrão

Por padrão, Pumpkin permitirá comandos da console e registrará todos os comandos executados pelos jogadores.

:::code-group

```toml [features.toml]
[commands]
use_console = true
log_console = true
default_op_level = 0
```

:::
