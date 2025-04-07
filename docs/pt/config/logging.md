# Registro de Logs

Pumpkin permite personalizar o que você deseja registrar em seus logs.

## Configurando o Registro de Logs

#### `enabled`: Booleano

Se o registro de logs está habilitado ou não.

:::code-group

```toml [features.toml] {2}
[logging]
enabled = true
```

:::

#### `level`: Enum

O nível de verbosidade do log. Os valores possíveis são:

-   Off (Desligado)
-   Error (Erro)
-   Warn (Aviso)
-   Info (Informação)
-   Debug (Depuração)
-   Trace (Rastreamento)

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
level = "Debug"
```

:::

#### `env`: Booleano

Se deve permitir escolher o nível de log configurando a variável de ambiente `RUST_LOG` ou não.

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
env = true
```

:::

#### `threads`: Booleano

Se deve exibir as threads nas mensagens de log ou não.

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
threads = false
```

:::

#### `color`: Booleano

Se deve imprimir no console com cores ou não.

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
color = false
```

:::

#### `timestamp`: Booleano

Se deve imprimir a data e hora na mensagem ou não.

:::code-group

```toml [features.toml] {3}
[logging]
enabled = true
timestamp = false
```

:::

## Configuração Padrão

Por padrão, o registro de logs está habilitado no nível `Info` e imprimirá com cores, threads e data/hora.

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
