# Configuração Básica

Representa os campos de nível superior em `pumpkin.toml`. Estas são as configurações principais do servidor.

## Java Edition

Se clientes Java Edition são aceitos.

:::code-group

```toml [pumpkin.toml] {2}
java_edition = true
```

:::

## Endereço Java Edition

O endereço e porta ao qual o servidor Java Edition será vinculado.

:::code-group

```toml [pumpkin.toml] {2}
java_edition_address = "0.0.0.0:25565"
```

:::

## Bedrock Edition

Se clientes Bedrock Edition são aceitos.

:::code-group

```toml [pumpkin.toml] {2}
bedrock_edition = true
```

:::

## Endereço Bedrock Edition

O endereço e porta ao qual o servidor Bedrock Edition será vinculado.

:::code-group

```toml [pumpkin.toml] {2}
bedrock_edition_address = "0.0.0.0:19132"
```

:::

## Seed

A seed para geração do mundo.

:::code-group

```toml [pumpkin.toml] {2}
seed = ""
```

:::

## Máximo de jogadores

O número máximo de jogadores permitidos no servidor. `0` desativa o limite.

:::code-group

```toml [pumpkin.toml] {2}
max_players = 1000
```

:::

## Distância de visão

A distância de visão máxima para jogadores.

:::code-group

```toml [pumpkin.toml] {2}
view_distance = 16
```

:::

## Distância de simulação

A distância de simulação máxima para jogadores.

:::code-group

```toml [pumpkin.toml] {2}
simulation_distance = 10
```

:::

## Dificuldade padrão

A dificuldade padrão do jogo.

:::code-group

```toml [pumpkin.toml] {2}
default_difficulty = "Normal"
```

:::

```toml
Peaceful
Easy
Normal
Hard
```

## Nível de permissão de operador

O nível de permissão atribuído pelo comando `/op`.

:::code-group

```toml [pumpkin.toml] {2}
op_permission_level = 4
```

:::

## Permitir Nether

Se a dimensão Nether está habilitada.

:::code-group

```toml [pumpkin.toml] {2}
allow_nether = true
```

:::

## Permitir End

Se a dimensão End está habilitada.

:::code-group

```toml [pumpkin.toml] {2}
allow_end = true
```

:::

## Hardcore

Se o servidor está em modo hardcore.

:::code-group

```toml [pumpkin.toml] {2}
hardcore = false
```

:::

## Modo Online

Se o modo online está habilitado. Requer contas Minecraft válidas.

:::code-group

```toml [pumpkin.toml] {2}
online_mode = true
```

:::

## Criptografia

Se a criptografia de pacotes está habilitada.

> [!IMPORTANT]
> Obrigatório quando o modo online está habilitado.

:::code-group

```toml [pumpkin.toml] {2}
encryption = true
```

:::

## MOTD

Mensagem do Dia; a descrição do servidor exibida na tela de status.

:::code-group

```toml [pumpkin.toml] {2}
motd = "A blazingly fast Pumpkin server!"
```

:::

## TPS

A taxa de ticks alvo do servidor.

:::code-group

```toml [pumpkin.toml] {2}
tps = 20.0
```

:::

## Modo de jogo padrão

O modo de jogo padrão para jogadores.

:::code-group

```toml [pumpkin.toml] {2}
default_gamemode = "Survival"
```

:::

```toml
Survival
Creative
Adventure
Spectator
```

## Forçar modo de jogo

Se o servidor força o modo de jogo ao entrar.

:::code-group

```toml [pumpkin.toml] {2}
force_gamemode = false
```

:::

## Limpeza de IP

Se os endereços IP dos jogadores são removidos dos logs.

:::code-group

```toml [pumpkin.toml] {2}
scrub_ips = true
```

:::

## Usar favicon

Se um favicon do servidor é usado.

:::code-group

```toml [pumpkin.toml] {2}
use_favicon = true
```

:::

## Caminho do favicon

O caminho para o favicon do servidor.

:::code-group

```toml [pumpkin.toml] {2}
favicon_path = "icon.png"
```

:::

## Nome padrão do mundo

O nome padrão para o mundo.

:::code-group

```toml [pumpkin.toml] {2}
default_level_name = "world"
```

:::

## Permitir relatórios de chat

Se as mensagens do chat devem ser assinadas e reportáveis.

:::code-group

```toml [pumpkin.toml] {2}
allow_chat_reports = false
```

:::

## Whitelist

Se a whitelist está habilitada.

:::code-group

```toml [pumpkin.toml] {2}
white_list = false
```

:::

## Aplicar whitelist

Se jogadores que não estão na whitelist devem ser expulsos.

:::code-group

```toml [pumpkin.toml] {2}
enforce_whitelist = false
```

:::
