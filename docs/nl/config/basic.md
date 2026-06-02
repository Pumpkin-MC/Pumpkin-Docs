# Basisconfiguratie

Vertegenwoordigt de top-level velden in `pumpkin.toml`. Dit zijn de kerninstellingen van de server.

## Java Edition

Of Java Edition-clients worden geaccepteerd.

:::code-group

```toml [pumpkin.toml] {2}
java_edition = true
```

:::

## Java Edition-adres

Het adres en de poort waaraan de Java Edition-server wordt gebonden.

:::code-group

```toml [pumpkin.toml] {2}
java_edition_address = "0.0.0.0:25565"
```

:::

## Bedrock Edition

Of Bedrock Edition-clients worden geaccepteerd.

:::code-group

```toml [pumpkin.toml] {2}
bedrock_edition = true
```

:::

## Bedrock Edition-adres

Het adres en de poort waaraan de Bedrock Edition-server wordt gebonden.

:::code-group

```toml [pumpkin.toml] {2}
bedrock_edition_address = "0.0.0.0:19132"
```

:::

## Seed

De seed voor de wereldgeneratie.

:::code-group

```toml [pumpkin.toml] {2}
seed = ""
```

:::

## Maximale spelers

Het maximum aantal spelers dat tegelijkertijd op de server is toegestaan. `0` schakelt de limiet uit.

:::code-group

```toml [pumpkin.toml] {2}
max_players = 1000
```

:::

## Weergaveafstand

De maximale weergaveafstand voor spelers.

:::code-group

```toml [pumpkin.toml] {2}
view_distance = 16
```

:::

## Simulatieafstand

De maximale simulatieafstand voor spelers.

:::code-group

```toml [pumpkin.toml] {2}
simulation_distance = 10
```

:::

## Standaardmoeilijkheidsgraad

De standaard moeilijkheidsgraad.

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

## Operator-rechtniveau

Het rechtenniveau dat wordt toegekend door het `/op`-commando.

:::code-group

```toml [pumpkin.toml] {2}
op_permission_level = 4
```

:::

## Nether toestaan

Of de Nether-dimensie is ingeschakeld.

:::code-group

```toml [pumpkin.toml] {2}
allow_nether = true
```

:::

## End toestaan

Of de End-dimensie is ingeschakeld.

:::code-group

```toml [pumpkin.toml] {2}
allow_end = true
```

:::

## Hardcore

Of de server in hardcore-modus draait.

:::code-group

```toml [pumpkin.toml] {2}
hardcore = false
```

:::

## Online-modus

Of de online-modus is ingeschakeld. Vereist geldige Minecraft-accounts.

:::code-group

```toml [pumpkin.toml] {2}
online_mode = true
```

:::

## Versleuteling

Of packetversleuteling is ingeschakeld.

> [!IMPORTANT]
> Vereist wanneer de online-modus is ingeschakeld.

:::code-group

```toml [pumpkin.toml] {2}
encryption = true
```

:::

## MOTD

Message of the Day; de serverbeschrijving op het statusscherm.

:::code-group

```toml [pumpkin.toml] {2}
motd = "A blazingly fast Pumpkin server!"
```

:::

## TPS

De doel-tickrate van de server.

:::code-group

```toml [pumpkin.toml] {2}
tps = 20.0
```

:::

## Standaard-spelmodus

De standaard spelmodus voor spelers.

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

## Spelmodus afdwingen

Of de server de spelmodus afdwingt bij het joinen.

:::code-group

```toml [pumpkin.toml] {2}
force_gamemode = false
```

:::

## IP-opschonening

Of speler-IP-adressen uit logs worden verwijderd.

:::code-group

```toml [pumpkin.toml] {2}
scrub_ips = true
```

:::

## Favicon gebruiken

Of een server-favicon wordt gebruikt.

:::code-group

```toml [pumpkin.toml] {2}
use_favicon = true
```

:::

## Favicon-pad

Het pad naar het server-favicon.

:::code-group

```toml [pumpkin.toml] {2}
favicon_path = "icon.png"
```

:::

## Standaard-wereldnaam

De standaard naam voor de wereld.

:::code-group

```toml [pumpkin.toml] {2}
default_level_name = "world"
```

:::

## Chat-rapportages toestaan

Of chatberichten ondertekend en rapporteerbaar moeten zijn.

:::code-group

```toml [pumpkin.toml] {2}
allow_chat_reports = false
```

:::

## Whitelist

Of de whitelist is ingeschakeld.

:::code-group

```toml [pumpkin.toml] {2}
white_list = false
```

:::

## Whitelist afdwingen

Of spelers die niet op de whitelist staan worden gekickt.

:::code-group

```toml [pumpkin.toml] {2}
enforce_whitelist = false
```

:::
