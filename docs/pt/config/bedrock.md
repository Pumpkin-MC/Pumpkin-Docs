# Bedrock e NetherNet

O Pumpkin inclui suporte nativo para clientes Minecraft Bedrock Edition, incluindo o transporte WebRTC/ICE do NetherNet e personalização de nomes de usuário.

## Configuração

:::code-group

```toml [pumpkin.toml]
[networking.bedrock]
enabled = true
online_mode = true
max_players = 1000
view_distance = 16
simulation_distance = 10
motd = "A blazingly fast Pumpkin server!"
username_prefix = ""
replace_username_spaces = true
chunk_caching = true

[networking.bedrock.nethernet]
enabled = true
address = "0.0.0.0:19132"
identity_key = "nethernet-key.der"
stun_servers = []
```

:::

### Opções do Bedrock

- **`enabled`**: Se conexões de clientes Bedrock Edition são aceitas (padrão: `true`).
- **`online_mode`**: Se a autenticação Xbox Live é exigida para jogadores Bedrock (padrão: `true`).
- **`max_players`**: Número máximo de jogadores Bedrock simultâneos (`0` desativa o limite, padrão: `1000`).
- **`view_distance`**: Distância máxima de renderização de chunks enviada para clientes Bedrock (padrão: `16`).
- **`simulation_distance`**: Distância máxima de simulação de ticks para jogadores Bedrock (padrão: `10`).
- **`motd`**: Mensagem do dia (MOTD) exibida na lista de servidores Bedrock.
- **`username_prefix`**: Prefixo opcional adicionado antes da gamertag do jogador Bedrock (por exemplo, `"."` ou `"*"`), evitando colisões de nomes com contas Java Edition em servidores cross-play (padrão: `""`).
- **`replace_username_spaces`**: Se os espaços nas gamertags do Bedrock são substituídos automaticamente por sublinhados `_`, garantindo que os nomes dos jogadores possam ser referenciados em comandos slash do Minecraft (padrão: `true`).
- **`chunk_caching`**: Se o cache de blobs de chunks no cliente está habilitado para economizar largura de banda de rede (padrão: `true`).

### Configurações de Transporte do NetherNet

O NetherNet é o transporte de rede moderno baseado em WebRTC/ICE do Minecraft Bedrock:

- **`enabled`**: Se os clientes podem se conectar usando o NetherNet (padrão: `true`).
- **`address`**: Endereço de socket de rede para sinalização TCP e multiplexação UDP ICE (padrão: `"0.0.0.0:19132"`).
- **`external_ip`**: Endereço IP público opcional anunciado quando o servidor estiver hospedado atrás de NAT.
- **`identity_key`**: Caminho do arquivo para a chave de identidade privada PKCS#8 P-384 retida entre reinicializações para Confiança no Primeiro Uso (TOFU - Trust On First Use) do cliente (padrão: `"nethernet-key.der"`).
- **`stun_servers`**: Lista opcional de URLs de servidores STUN para travessia NAT via ICE.
