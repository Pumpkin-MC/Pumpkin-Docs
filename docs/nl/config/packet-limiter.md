# Packet-limiter

Pumpkin bevat een ingebouwde packet-rate-limiter om de server te beschermen tegen packet flooding, spam-aanvallen en client-side exploits. Packet-snelheidslimieten kunnen onafhankelijk worden geconfigureerd voor Java Edition- en Bedrock Edition-clients.

## Configuratie

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

### Configuratie-opties

- **`enabled`**: Of de packet-rate-limiter is ingeschakeld voor deze clientversie (standaard: `true`).
- **`max_packet_rate`**: Maximaal toegestane inkomende pakketten per seconde per clientverbinding (standaard: `500.0`). Stel in op `<= 0.0` om de snelheidslimiet uit te schakelen zonder de limiter-module uit te schakelen.
- **`burst_capacity`**: Token-bucket burst-capaciteit voor korte pieken in clientpakketten (standaard: `500.0`).
- **`kick_message`**: Het bericht bij verbreking van de verbinding dat aan de speler wordt getoond wanneer diens verbinding de packetlimiet overschrijdt (standaard: `"Kicked for spamming packets"`).
