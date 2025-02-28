# Basisconfiguratie

Vertegenwoordigt `configuration.toml`

## Serveradres

Het adres om de server aan te binden.

:::code-group
```toml [configuration.toml] {2}
server_address = "0.0.0.0:25565"
```
:::

## Seed

De seed voor wereldgeneratie.

:::code-group
```toml [configuration.toml] {2}
seed = ""
```
:::

## Maximaal aantal spelers

Het maximale aantal spelers dat op de server is toegestaan.

:::code-group
```toml [configuration.toml] {2}
max_players = 100000
```
:::

## Zichtafstand

De maximale zichtafstand voor spelers.

:::code-group
```toml [configuration.toml] {2}
view_distance = 10
```
:::

## Simulatieafstand

De maximale simulatieafstand voor spelers.

:::code-group
```toml [configuration.toml] {2}
simulation_distance = 10
```
:::

## Standaard moeilijkheidsgraad

De standaard moeilijkheidsgraad van het spel.

:::code-group
```toml [configuration.toml] {2}
default_difficulty = "Normal"
```
:::


```toml
Peaceful
Easy
Normal
Hard
```

## Operationeel permissieniveau

Het op-niveau dat wordt toegewezen door het `/op`-commando.

:::code-group
```toml [configuration.toml] {2}
op_permission_level = 4
```
:::

## Nether toestaan

Of de Nether-dimensie is ingeschakeld.

:::code-group
```toml [configuration.toml] {2}
allow_nether = true
```
:::

## Hardcore

Of de server in hardcore modus is.

:::code-group
```toml [configuration.toml] {2}
hardcore = false
```
:::

## Online modus

Of de online modus is ingeschakeld. Vereist geldige Minecraft-accounts.

:::code-group
```toml [configuration.toml] {2}
online_mode = true
```
:::

## Encryptie

Of pakketversleuteling is ingeschakeld.

> [!IMPORTANT]
> Vereist wanneer de online modus is ingeschakeld.

:::code-group
```toml [configuration.toml] {2}
encryption = true
```
:::

## Motd

De beschrijving van de server die wordt weergegeven op het status scherm.

:::code-group
```toml [configuration.toml] {2}
motd = "A Blazing fast Pumpkin Server!"
```
:::

## TPS

De doel-tickrate van de server.

:::code-group
```toml [configuration.toml] {2}
tps = 20.0
```
:::

## Standaard spelmodus

De standaard spelmodus voor spelers.

:::code-group
```toml [configuration.toml] {2}
default_gamemode = "Survival"
```
:::

```toml
Undefined
Survival
Creative
Adventure
Spectator
```

## IP-scrubbing

Of spelers-IP's uit logs moeten worden verwijderd.

:::code-group
```toml [configuration.toml] {2}
scrub_ips = true
```
:::

## Favicon gebruiken

Of een server-favicon moet worden gebruikt of niet.

:::code-group
```toml [configuration.toml] {2}
use_favicon = true
```
:::

## Favicon-pad

Het pad naar de favicon van de server.

:::code-group
```toml [configuration.toml] {2}
favicon_path = "icon.png"
```
:::
