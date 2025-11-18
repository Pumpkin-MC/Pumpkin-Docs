# Kompression

Kompression reduziert die Größe von Paketen. Das spart Bandbreite auf Serverseite und hilft Spielern mit langsameren Verbindungen.

## Kompression konfigurieren

#### `enabled`: Boolean

Ob Paketkompression aktiviert ist oder nicht.

> [!TIP]
> Wenn der Server hinter einem Proxy läuft, kann es vorteilhaft sein, Kompression zu deaktivieren.

:::code-group

```toml [features.toml] {2}
[packet_compression]
enabled = true
```

:::

#### `threshold`: Integer (0‑1024)

Minimale Paketgröße, bei der der Server versucht, das Paket zu komprimieren.

> [!CAUTION]
> Ein höherer Wert kann Spielern mit langsamer Verbindung schaden.

:::code-group

```toml [features.toml] {2}
[packet_compression]
threshold = 256
```

:::

#### `level`: Integer (0‑9)

Wert zwischen 0 und 9: 0 deaktiviert die Kompression, 1 ist die schnellste (weniger Kompression), 9 ist maximale Kompression (langsamer).

:::code-group

```toml [features.toml] {2}
[packet_compression]
level = 4
```

:::

## Standardkonfiguration

Standardmäßig ist Kompression aktiviert.

:::code-group

```toml [features.toml]
[packet_compression]
enabled = true
threshold = 256
level = 4
```

:::
