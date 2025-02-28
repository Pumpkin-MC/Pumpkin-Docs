# Compressie
Compressie wordt gebruikt om de grootte van pakketten te verkleinen. Dit is gunstig om de bandbreedte aan de serverzijde te verminderen en ook om spelers met langzamere internetverbindingen te helpen.

## Compressie configureren

#### `enabled`: Boolean
Of pakketcompressie is ingeschakeld of niet.

> [!TIP]
> Het kan voordelig zijn om compressie uit te schakelen als de server achter een proxy staat.

:::code-group
```toml [features.toml] {2}
[packet_compression]
enabled = true
```
:::

#### `threshold`: Integer (0-1024)

De minimale pakketgrootte voordat de server probeert het pakket te comprimeren.

> [!CAUTION]
> Het verhogen van deze waarde kan spelers met langzamere verbindingen schaden.

:::code-group
```toml [features.toml] {2}
[packet_compression]
threshold = 256
```
:::

#### `level`: Integer (0-9)

Een waarde tussen 0 en 9: 0 om compressie uit te schakelen, 1 is de snelste compressie (ten koste van de grootte), en 9 is maximale compressie (ten koste van de snelheid).

:::code-group
```toml [features.toml] {2}
[packet_compression]
level = 4
```
:::

## Standaardconfiguratie

Standaard is compressie ingeschakeld.

:::code-group
```toml [features.toml]
[packet_compression]
enabled = true
threshold = 256
level = 4
```
:::
