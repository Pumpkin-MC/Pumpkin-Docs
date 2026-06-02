# Dados do Jogador

O Pumpkin permite configurar como os dados dos jogadores são salvos e gerenciados.

## Configurando os dados do jogador

#### `save_player_data`: Boolean

Se os dados do jogador (inventário, posição, estatísticas etc.) são salvos.

:::code-group

```toml [pumpkin.toml] {2}
[player_data]
save_player_data = true
```

:::

#### `save_player_cron_interval`: Inteiro

O intervalo em segundos entre salvamentos automáticos dos dados do jogador.

:::code-group

```toml [pumpkin.toml] {2}
[player_data]
save_player_cron_interval = 300
```

:::

O valor padrão de `300` segundos equivale a **5 minutos**.

## Configuração padrão

:::code-group

```toml [pumpkin.toml]
[player_data]
save_player_data = true
save_player_cron_interval = 300
```

:::
