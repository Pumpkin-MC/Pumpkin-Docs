# Limitador de Pacotes

O Pumpkin possui um limitador de taxa de pacotes integrado para proteger o servidor contra inundações de pacotes (packet flooding), ataques de spam e exploits do lado do cliente. Os limites de taxa de pacotes podem ser configurados independentemente para clientes Java Edition e Bedrock Edition.

## Configuração

:::code-group

```toml [pumpkin.toml]
[networking.java.packet_limiter]
enabled = true
max_packet_rate = 500.0
burst_capacity = 500.0
kick_message = "Kicked for spamming packets"

[networking.bedrock.packet_limiter]
enabled = true
max_packet_rate = 500.0
burst_capacity = 500.0
kick_message = "Kicked for spamming packets"
```

:::

### Opções de Configuração

- **`enabled`**: Se o limitador de taxa de pacotes está habilitado para esta edição de cliente (padrão: `true`).
- **`max_packet_rate`**: Taxa máxima permitida de pacotes recebidos por segundo por conexão de cliente (padrão: `500.0`). Defina como `<= 0.0` para desativar o limite de taxa sem desativar o módulo do limitador.
- **`burst_capacity`**: Capacidade de tolerância de surto (burst) do token bucket para picos breves de pacotes do cliente (padrão: `500.0`).
- **`kick_message`**: A mensagem de desconexão exibida ao jogador quando sua conexão ultrapassar o limite de pacotes (padrão: `"Kicked for spamming packets"`).
