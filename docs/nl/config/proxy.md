# Proxy
Veel servers gebruiken proxies om verbindingen te beheren en spelers over servers te verdelen. Pumpkin ondersteunt de volgende proxy-protocollen:

- [Velocity](https://papermc.io/software/velocity)
- [BungeeCord](https://www.spigotmc.org/wiki/bungeecord-installation/)

> [!TIP]
> Velocity wordt aanbevolen voor de meeste servernetwerken. Velocity is moderner en presteert beter in vergelijking met BungeeCord.

## Proxy configureren

#### `enabled`: Boolean

Schakelt ondersteuning voor proxies in.

:::code-group
```toml [features.toml]{2}
[proxy]
enabled = true
```
:::

### Velocity

#### `enabled`: Boolean

Of Velocity-ondersteuning is ingeschakeld of niet.

:::code-group
```toml [features.toml]{2}
[proxy.velocity]
enabled = true
```
:::

#### `secret`: String 

Het geheim zoals geconfigureerd in Velocity. 

:::code-group
```toml [features.toml]{3}
[proxy.velocity]
enabled = true
secret = "[proxy secret hier]"
```
:::

### BungeeCord

#### `enabled`: Boolean
Of BungeeCord-ondersteuning is ingeschakeld of niet.

:::code-group
```toml [features.toml]{2}
[proxy.bungeecord]
enabled = true
```
:::

> [!CAUTION]
> Zorg ervoor dat de firewall van de server correct is geconfigureerd, aangezien BungeeCord niet kan verifiëren of spelersinformatie van jouw proxy of een bedrieger komt.

## Standaardconfiguratie
Standaard is proxy-ondersteuning uitgeschakeld. Hier is de standaardconfiguratie:

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
