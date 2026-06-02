# Grundkonfiguration

Entspricht den Top-Level-Feldern in `pumpkin.toml`. Dies sind die Kerneinstellungen des Servers.

## Java Edition

Ob Java-Edition-Clients akzeptiert werden.

:::code-group

```toml [pumpkin.toml] {2}
java_edition = true
```

:::

## Java-Edition-Adresse

Die Adresse und der Port, an die der Java-Edition-Server gebunden wird.

:::code-group

```toml [pumpkin.toml] {2}
java_edition_address = "0.0.0.0:25565"
```

:::

## Bedrock Edition

Ob Bedrock-Edition-Clients akzeptiert werden.

:::code-group

```toml [pumpkin.toml] {2}
bedrock_edition = true
```

:::

## Bedrock-Edition-Adresse

Die Adresse und der Port, an die der Bedrock-Edition-Server gebunden wird.

:::code-group

```toml [pumpkin.toml] {2}
bedrock_edition_address = "0.0.0.0:19132"
```

:::

## Seed

Der Seed für die Weltgenerierung.

:::code-group

```toml [pumpkin.toml] {2}
seed = ""
```

:::

## Maximale Spielerzahl

Die maximale Anzahl an Spielern, die gleichzeitig auf dem Server erlaubt sind. Der Wert `0` deaktiviert das Limit.

:::code-group

```toml [pumpkin.toml] {2}
max_players = 1000
```

:::

## Sichtweite

Die maximale Sichtweite für Spieler.

:::code-group

```toml [pumpkin.toml] {2}
view_distance = 16
```

:::

## Simulationsdistanz

Die maximale Simulationsdistanz für Spieler.

:::code-group

```toml [pumpkin.toml] {2}
simulation_distance = 10
```

:::

## Standard-Schwierigkeitsgrad

Der standardmäßige Schwierigkeitsgrad.

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

## Operator-Rechtelevel

Das Berechtigungslevel, das durch den Befehl `/op` vergeben wird.

:::code-group

```toml [pumpkin.toml] {2}
op_permission_level = 4
```

:::

## Nether erlauben

Ob die Nether-Dimension aktiviert ist.

:::code-group

```toml [pumpkin.toml] {2}
allow_nether = true
```

:::

## End erlauben

Ob die End-Dimension aktiviert ist.

:::code-group

```toml [pumpkin.toml] {2}
allow_end = true
```

:::

## Hardcore

Ob der Server im Hardcore-Modus läuft.

:::code-group

```toml [pumpkin.toml] {2}
hardcore = false
```

:::

## Online-Modus

Ob der Online-Modus aktiviert ist. Erfordert gültige Minecraft-Konten.

:::code-group

```toml [pumpkin.toml] {2}
online_mode = true
```

:::

## Verschlüsselung

Ob Paket-Verschlüsselung aktiviert ist.

> [!IMPORTANT]
> Erforderlich, wenn der Online-Modus aktiviert ist.

:::code-group

```toml [pumpkin.toml] {2}
encryption = true
```

:::

## MOTD

„Message of the Day"; die Server-Beschreibung auf dem Status-Bildschirm.

:::code-group

```toml [pumpkin.toml] {2}
motd = "A blazingly fast Pumpkin server!"
```

:::

## TPS

Die Ziel-Tickrate des Servers.

:::code-group

```toml [pumpkin.toml] {2}
tps = 20.0
```

:::

## Standard-Spielmodus

Der Standard-Spielmodus für Spieler.

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

## Spielmodus erzwingen

Ob der Server den Spielmodus beim Betreten erzwingt.

:::code-group

```toml [pumpkin.toml] {2}
force_gamemode = false
```

:::

## IP-Bereinigung

Ob Spieler-IP-Adressen aus Logs entfernt werden.

:::code-group

```toml [pumpkin.toml] {2}
scrub_ips = true
```

:::

## Favicon verwenden

Ob ein Server-Favicon verwendet werden soll.

:::code-group

```toml [pumpkin.toml] {2}
use_favicon = true
```

:::

## Favicon-Pfad

Der Pfad zum Server-Favicon.

:::code-group

```toml [pumpkin.toml] {2}
favicon_path = "icon.png"
```

:::

## Standard-Weltname

Der Standardname für die Welt.

:::code-group

```toml [pumpkin.toml] {2}
default_level_name = "world"
```

:::

## Chat-Berichte erlauben

Ob Chat-Nachrichten signiert und meldebar sein sollen.

:::code-group

```toml [pumpkin.toml] {2}
allow_chat_reports = false
```

:::

## Whitelist

Ob die Whitelist aktiviert ist.

:::code-group

```toml [pumpkin.toml] {2}
white_list = false
```

:::

## Whitelist durchsetzen

Ob Spieler, die nicht auf der Whitelist stehen, gekickt werden sollen.

:::code-group

```toml [pumpkin.toml] {2}
enforce_whitelist = false
```

:::
