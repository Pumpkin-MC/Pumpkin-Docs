# RCON

RCON é um protocolo que permite gerenciar o servidor remotamente a partir de outro dispositivo. Pumpkin oferece suporte completo para RCON.

## Configurando o RCON

#### `enabled`: Booleano

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon]
enabled = true
```

:::

#### `address`: String

O endereço e a porta que o RCON deve escutar.

:::code-group

```toml [pumpkin.toml] {3}
[networking.rcon]
enabled = true
address = "0.0.0.0:25575"
```

:::

#### `password`: String

A senha a ser usada para autenticação RCON.

:::code-group

```toml [pumpkin.toml] {3}
[networking.rcon]
enabled = true
password = "[sua senha segura aqui]"
```

:::

#### `max_connections`: Inteiro

O número máximo de conexões RCON permitidas ao mesmo tempo. Defina como 0 para desabilitar o limite.

:::code-group

```toml [pumpkin.toml] {3}
[networking.rcon]
enabled = true
max_connections = 5
```

:::

### Registro de Logs

#### `logged_successfully`: Booleano

Se os logins bem-sucedidos devem ser registrados no console ou não.

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
logged_successfully = true
```

:::

#### `wrong_password`: Booleano

Se as tentativas de senha incorreta devem ser registradas no console ou não.

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
wrong_password = true
```

:::

#### `commands`: Booleano

Se os comandos executados via RCON devem ser registrados no console ou não.

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
commands = true
```

:::

#### `quit`: Booleano

Se a saída do cliente RCON deve ser registrada ou não.

:::code-group

```toml [pumpkin.toml] {2}
[networking.rcon.logging]
quit = true
```

:::

## Configuração Padrão

Por padrão, o RCON está desabilitado.

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
