# Links do Servidor

Os clientes de Minecraft (desde a versão 1.21) podem exibir links clicáveis do servidor no menu de pausa e nos menus do jogo. Configure links padrão e personalizados do servidor sob `[server_links]` no `pumpkin.toml`.

## Configuração

:::code-group

```toml [pumpkin.toml]
[server_links]
enabled = true
bug_report = "https://github.com/Pumpkin-MC/Pumpkin/issues"
support = ""
status = ""
feedback = ""
community = ""
website = ""
forums = ""
news = ""
announcements = ""

[server_links.custom]
# "Store" = "https://store.example.com"
# "Discord" = "https://discord.gg/example"
```

:::

### Opções de Configuração

- **`enabled`**: Chave mestre para habilitar a transmissão de links do servidor para clientes que estão se conectando (padrão: `true`).
- **`bug_report`**: Link para o rastreador de bugs (bug tracker) do servidor ou do projeto (padrão: `"https://github.com/Pumpkin-MC/Pumpkin/issues"`).
- **`support`**: Link para suporte técnico ou central de ajuda.
- **`status`**: Link para a página de status/uptime do servidor.
- **`feedback`**: Link para a página de feedback ou sugestões dos jogadores.
- **`community`**: Link para fóruns ou grupo da comunidade.
- **`website`**: Link para o site oficial.
- **`forums`**: Link para fóruns de discussão.
- **`news`**: Link para o blog ou página de notícias do servidor.
- **`announcements`**: Link para a página de anúncios.

### Links Personalizados

Defina links arbitrários de chave-valor exibidos nos menus dos clientes em `[server_links.custom]`:

```toml
[server_links.custom]
"Store" = "https://store.example.com"
"Discord" = "https://discord.gg/example"
```
