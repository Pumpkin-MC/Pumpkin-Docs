# LAN Broadcast
Pumpkin kan de server over het netwerk uitzenden om het voor lokale spelers gemakkelijker te maken om verbinding te maken met de server.

## LAN Broadcast configureren

#### `enabled`: Boolean
Of LAN Broadcast is ingeschakeld of niet.

:::code-group
```toml [features.toml] {2}
[lan_broadcast]
enabled = true
```
:::

#### `motd`: String (optioneel)
De MOTD om uit te zenden naar clients. Zal standaard de MOTD van de server gebruiken.

> [!CAUTION]
> LAN broadcast MOTD ondersteunt geen meerdere regels, RGB-kleuren of kleurverlopen. Pumpkin verifieert de MOTD niet voordat deze wordt uitgezonden. Als de server-MOTD deze componenten gebruikt, overweeg dan om dit veld in te vullen zodat clients een juiste MOTD zien.

:::code-group
```toml [features.toml] {3}
[lan_broadcast]
enabled = true
motd = "[jouw MOTD hier]"
```
:::

#### `port`: Integer (0-65535) (optioneel)
Op welke poort moet worden gebonden. Als dit niet is opgegeven, wordt poort 0 (elke beschikbare poort op het systeem) gebruikt.

> [!IMPORTANT]
> Het protocol definieert naar welke poort moet worden uitgezonden. Deze optie bestaat alleen om op te geven op welke poort moet worden gebonden op de host. Deze optie bestaat puur zodat de poort voorspelbaar kan zijn.

:::code-group
```toml [features.toml] {3}
[lan_broadcast]
enabled = true
port = 46733
```
:::

## Standaardconfiguratie
Standaard is LAN broadcast uitgeschakeld.

:::code-group
```toml [features.toml]
[lan_broadcast]
enabled = false
motd = "[server MOTD hier]"
port = 0
```
:::
