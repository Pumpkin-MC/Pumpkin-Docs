# LAN Broadcast

Pumpkin kann den Server im lokalen Netzwerk bewerben, damit sich Spieler einfacher verbinden können.

## LAN Broadcast konfigurieren

#### `enabled`: Boolean

Ob LAN Broadcast aktiviert ist.

:::code-group

```toml [features.toml] {2}
[lan_broadcast]
enabled = true
```

:::

#### `motd`: String (optional)

Die MOTD, die an Clients gesendet wird; standardmäßig die Server‑MOTD.

> [!CAUTION]
> Die LAN‑MOTD unterstützt keine Mehrzeiligkeit, RGB‑Farben oder Farbverläufe. Pumpkin validiert die MOTD nicht vor dem Senden. Falls deine Server‑MOTD solche Elemente nutzt, definiere dieses Feld manuell, damit Clients einen korrekten Text sehen.

:::code-group

```toml [features.toml] {3}
[lan_broadcast]
enabled = true
motd = "[your MOTD here]"
```

:::

#### `port`: Integer (0‑65535) (optional)

Port, an den gebunden wird. Wenn nicht angegeben, Port 0 (beliebiger freier Port).

> [!IMPORTANT]
> Das Protokoll definiert, an welchen Port die Broadcast‑Pakete gehen. Diese Option bestimmt nur den lokalen Bind‑Port und dient der Vorhersehbarkeit.

:::code-group

```toml [features.toml] {3}
[lan_broadcast]
enabled = true
port = 46733
```

:::

## Standardkonfiguration

Standardmäßig ist LAN Broadcast deaktiviert.

:::code-group

```toml [features.toml]
[lan_broadcast]
enabled = false
motd = "[server MOTD here]"
port = 0
```

:::
