# Configuração

O Pumpkin oferece um sistema de configuração robusto que permite personalizar diversos aspectos do comportamento do servidor sem depender de plugins externos. Isso proporciona flexibilidade e controle sobre a operação do servidor.

## Arquivo de Configuração

O Pumpkin utiliza um único arquivo de configuração:

- `pumpkin.toml`: o arquivo de configuração principal contendo todas as definições do servidor, desde configurações básicas de rede até recursos avançados

Quando o Pumpkin é iniciado pela primeira vez, ele gera o arquivo `pumpkin.toml` com valores padrão no diretório de trabalho. Você pode editá-lo antes ou depois da primeira execução. Campos ausentes são preenchidos automaticamente com valores padrão na inicialização.

## Estrutura

A configuração é organizada em seções:

- **Campos de nível superior**: configurações principais como suporte a edições, endereços, seed, limites de jogadores, dificuldade e regras de jogo
- **`[logging]`**: saída e formatação de logs
- **`[resource_pack]`**: pacotes de recursos para Java e Bedrock
- **`[world]`**: geração de mundo, armazenamento de chunks, iluminação e salvamento automático
- **`[networking]`**: autenticação, compressão, proxy, query, RCON e broadcast LAN
- **`[commands]`**: sistema de comandos
- **`[chat]`**: formatação de mensagens do chat
- **`[pvp]`**: regras e mecânicas de PVP
- **`[server_links]`**: links exibidos aos clientes
- **`[player_data]`**: persistência de dados do jogador
- **`[fun]`**: recursos experimentais
- **`[recipe]`**: configuração do livro de receitas
- **`[plugins]`**: configurações de permissão de plugins

## Versão do Servidor

O Pumpkin tem como objetivo suportar a versão mais recente do Minecraft. Se você deseja hospedar um servidor Pumpkin para qualquer outra versão, existe um projeto chamado [ViaProxy](https://github.com/ViaVersion/ViaProxy).

- Certifique-se de permitir conexões proxy.
- O Pumpkin e o ViaProxy não têm nenhuma conexão; não envie issues relacionadas ao código deles. Além disso, este é um proxy de terceiros e o Pumpkin não se responsabiliza por seus aspectos positivos ou negativos.

### Principais Recursos

- Personalização Extensiva: Configure definições do servidor, comportamento do jogador, geração de mundo e mais.
- Otimização de Desempenho: Otimize o desempenho do servidor por meio de ajustes de configuração.
- Personalização sem Plugins: Alcance as alterações desejadas sem a necessidade de plugins adicionais.
