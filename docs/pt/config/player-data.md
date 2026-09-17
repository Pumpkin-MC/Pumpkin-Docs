# Dados do Jogador e Jogabilidade

As configurações para salvar dados persistentes dos jogadores, conquistas (advancements), sincronização de receitas e recursos sazonais divertidos são definidas no `pumpkin.toml`.

## Configuração

:::code-group

```toml [pumpkin.toml]
[player_data]
save_player_data = true
save_player_cron_interval = 300

[advancement]
save_advancements = true

[recipe]
send_recipes = true

[fun]
april_fools = true
```

:::

### Dados do Jogador

- **`save_player_data`**: Se os dados persistentes dos jogadores (inventário, localização, vida) são salvos em disco (padrão: `true`).
- **`save_player_cron_interval`**: Intervalo de tempo em segundos entre salvamentos periódicos automáticos dos dados de jogadores online (padrão: `300` segundos / 5 minutos).

### Conquistas (Advancements)

- **`save_advancements`**: Se o progresso de conquistas dos jogadores é monitorado e salvo em disco (padrão: `true`).

### Receitas

- **`send_recipes`**: Se as receitas de criação (crafting) e fundição são sincronizadas com os clientes conectados, habilitando o livro de receitas no cliente (padrão: `true`).

### Recursos Divertidos

- **`april_fools`**: Se os easter eggs e recursos sazonais do Dia da Mentira (1º de abril) estão ativados (padrão: `true`).
