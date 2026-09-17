# Paket-Begrenzer

Pumpkin verfügt über einen integrierten Paketratenbegrenzer, um den Server vor Paket-Flooding, Spam-Angriffen und clientseitigen Exploits zu schützen. Paketratenlimits können für Java Edition- und Bedrock Edition-Clients unabhängig voneinander konfiguriert werden.

## Konfiguration

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

### Konfigurationsoptionen

- **`enabled`**: Gibt an, ob der Paketratenbegrenzer für diese Client-Edition aktiviert ist (Standard: `true`).
- **`max_packet_rate`**: Maximal erlaubte eingehende Pakete pro Sekunde und Client-Verbindung (Standard: `500.0`). Setze den Wert auf `<= 0.0`, um das Ratenlimit zu deaktivieren, ohne das Begrenzungsmodul zu deaktivieren.
- **`burst_capacity`**: Token-Bucket-Burst-Kapazität für kurze Spitzen beim Paketaufkommen des Clients (Standard: `500.0`).
- **`kick_message`**: Die Trennungsnachricht, die dem Spieler angezeigt wird, wenn seine Verbindung das Paketlimit überschreitet (Standard: `"Kicked for spamming packets"`).
