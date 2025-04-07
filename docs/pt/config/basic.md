# Configuração Básica

Representando `configuration.toml`

## Endereço do Servidor

O endereço para vincular o servidor.

:::code-group

```toml [configuration.toml] {2}
server_address = "0.0.0.0:25565"
```

:::

## Seed

A seed para a geração do mundo.

:::code-group

```toml [configuration.toml] {2}
seed = ""
```

:::

## Limite de Jogadores

O número máximo de jogadores permitidos no servidor.

:::code-group

```toml [configuration.toml] {2}
max_players = 100000
```

:::

## Distância de Visão

A distância máxima de visão para os jogadores.

:::code-group

```toml [configuration.toml] {2}
view_distance = 10
```

:::

## Distância de Simulação

A distância máxima de simulação para os jogadores.

:::code-group

```toml [configuration.toml] {2}
simulation_distance = 10
```

:::

## Dificuldade Padrão

A dificuldade padrão do jogo.

:::code-group

```toml [configuration.toml] {2}
default_difficulty = "Normal"
```

:::

```toml
Peaceful
Easy
Normal
Hard
```

## Nível de Permissão de Operação

O nível de permissão atribuído pelo comando `/op`.

:::code-group

```toml [configuration.toml] {2}
op_permission_level = 4
```

:::

## Permitir Nether

Se a dimensão Nether está habilitada.

:::code-group

```toml [configuration.toml] {2}
allow_nether = true
```

:::

## Hardcore

Se o servidor está no modo hardcore.

:::code-group

```toml [configuration.toml] {2}
hardcore = false
```

:::

## Modo Online

Se o modo online está habilitado. Requer contas válidas do Minecraft.

:::code-group

```toml [configuration.toml] {2}
online_mode = true
```

:::

## Criptografia

Se a criptografia de pacotes está habilitada.

> [!IMPORTANTE]
> Requerido quando o modo online está habilitado.

:::code-group

```toml [configuration.toml] {2}
encryption = true
```

:::

## MOTD

Mensagem do Dia; a descrição do servidor exibida na tela de status.

:::code-group

```toml [configuration.toml] {2}
motd = "A Blazing fast Pumpkin Server!"
```

:::

## TPS

A taxa de tique (tick rate) alvo do servidor.

:::code-group

```toml [configuration.toml] {2}
tps = 20.0
```

:::

## Modo de Jogo Padrão

O modo de jogo padrão para os jogadores.

:::code-group

```toml [configuration.toml] {2}
default_gamemode = "Survival"
```

:::

```toml
Undefined
Survival
Creative
Adventure
Spectator
```

## Limpeza de IPs

Se os endereços IP dos jogadores devem ser removidos dos logs.

:::code-group

```toml [configuration.toml] {2}
scrub_ips = true
```

:::

## Usar Favicon

Se o servidor deve usar um favicon ou não.

:::code-group

```toml [configuration.toml] {2}
use_favicon = true
```

:::

## Caminho do Favicon

O caminho para o favicon do servidor.

:::code-group

```toml [configuration.toml] {2}
favicon_path = "icon.png"
```

:::
