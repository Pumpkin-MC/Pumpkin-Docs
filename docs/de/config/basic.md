# Grundkonfiguration

Entspricht `configuration.toml`

## Serveradresse

Die Adresse, an die der Server gebunden wird.

:::code-group

```toml [configuration.toml] {2}
server_address = "0.0.0.0:25565"
```

:::

## Seed

Der Seed für die Weltgenerierung.

:::code-group

```toml [configuration.toml] {2}
seed = ""
```

:::

## Maximale Spielerzahl

Die maximale Anzahl an Spielern, die gleichzeitig auf dem Server erlaubt sind.

:::code-group

```toml [configuration.toml] {2}
max_players = 100000
```

:::

## Sichtweite

Die maximale Sichtweite für Spieler.

:::code-group

```toml [configuration.toml] {2}
view_distance = 10
```

:::

## Simulationsdistanz

Die maximale Simulationsdistanz für Spieler.

:::code-group

```toml [configuration.toml] {2}
simulation_distance = 10
```

:::

## Standard‑Schwierigkeitsgrad

Der standardmäßige Schwierigkeitsgrad.

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

## Operator‑Rechtelevel

Das Berechtigungslevel, das durch den Befehl `/op` vergeben wird.

:::code-group

```toml [configuration.toml] {2}
op_permission_level = 4
```

:::

## Nether erlauben

Ob die Nether‑Dimension aktiviert ist.

:::code-group

```toml [configuration.toml] {2}
allow_nether = true
```

:::

## End erlauben

Ob die End‑Dimension aktiviert ist.

:::code-group

```toml [configuration.toml] {2}
allow_end = true
```

:::

## Hardcore

Ob der Server im Hardcore‑Modus läuft.

:::code-group

```toml [configuration.toml] {2}
hardcore = false
```

:::

## Online‑Modus

Ob der Online‑Modus aktiviert ist. Erfordert gültige Minecraft‑Konten.

:::code-group

```toml [configuration.toml] {2}
online_mode = true
```

:::

## Verschlüsselung

Ob Paket‑Verschlüsselung aktiviert ist.

> [!IMPORTANT]
> Erforderlich, wenn der Online‑Modus aktiviert ist.

:::code-group

```toml [configuration.toml] {2}
encryption = true
```

:::

## MOTD

„Message of the Day“; die Server‑Beschreibung auf dem Status‑Bildschirm.

:::code-group

```toml [configuration.toml] {2}
motd = "A Blazing fast Pumpkin Server!"
```

:::

## TPS

Die Ziel‑Tickrate des Servers.

:::code-group

```toml [configuration.toml] {2}
tps = 20.0
```

:::

## Standard‑Spielmodus

Der Standard‑Spielmodus für Spieler.

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

## IP‑Bereinigung

Ob Spieler‑IP‑Adressen aus Logs entfernt werden.

:::code-group

```toml [configuration.toml] {2}
scrub_ips = true
```

:::

## Favicon verwenden

Ob ein Server‑Favicon verwendet werden soll.

:::code-group

```toml [configuration.toml] {2}
use_favicon = true
```

:::

## Favicon‑Pfad

Der Pfad zum Server‑Favicon.

:::code-group

```toml [configuration.toml] {2}
favicon_path = "icon.png"
```

:::
