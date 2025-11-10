# Proxy

Viele Server verwenden Proxys, um Verbindungen zu verwalten und Spieler auf mehrere Server zu verteilen. Pumpkin unterstützt folgende Proxy‑Protokolle:

- [Velocity](https://papermc.io/software/velocity)
- [BungeeCord](https://www.spigotmc.org/wiki/bungeecord-installation/)

> [!TIP]
> Für die meisten Netzwerke wird Velocity empfohlen. Velocity ist moderner und performanter als BungeeCord.

## Proxy konfigurieren

#### `enabled`: Boolean

Aktiviert die Proxy‑Unterstützung.

:::code-group

```toml [features.toml]{2}
[proxy]
enabled = true
```

:::

### Velocity

#### `enabled`: Boolean

Ob Velocity‑Support aktiviert ist.

:::code-group

```toml [features.toml]{2}
[proxy.velocity]
enabled = true
```

:::

#### `secret`: String

Das in Velocity konfigurierte Geheimnis.

:::code-group

```toml [features.toml]{3}
[proxy.velocity]
enabled = true
secret = "[proxy secret here]"
```

:::

### BungeeCord

#### `enabled`: Boolean

Ob BungeeCord‑Support aktiviert ist.

:::code-group

```toml [features.toml]{2}
[proxy.bungeecord]
enabled = true
```

:::

> [!CAUTION]
> BungeeCord kann nicht verifizieren, ob Spielerinformationen von deinem Proxy oder einem Angreifer stammen. Stelle sicher, dass die Firewall korrekt konfiguriert ist.

## Standardkonfiguration

Standardmäßig ist Proxy‑Support deaktiviert. Die Default‑Konfiguration:

:::code-group

```toml [features.toml]
[proxy]
enabled = false

[proxy.velocity]
enabled = false
secret = ""

[proxy.bungeecord]
enabled = false
```

:::
