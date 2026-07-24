# Query

Het query-protocol is een eenvoudige manier om de server te vragen naar zijn status. Pumpkin ondersteunt het
query-protocol volledig.

## Query configureren

#### `enabled`: Boolean

Of er geluisterd moet worden naar query-protocolverzoeken of niet.

:::code-group

```toml [pumpkin.toml] {2}
[networking.query]
enabled = true
```

:::

#### `port`: Integer (0-65535) (optioneel)

Op welke poort er geluisterd moet worden naar query-protocolverzoeken. Als dit niet is opgegeven, wordt dezelfde poort
als de server gebruikt.

:::code-group

```toml [pumpkin.toml] {3}
[networking.query]
enabled = true
address = "0.0.0.0:12345"
```

:::

## Standaardconfiguratie

Standaard is query uitgeschakeld. Het zal op de serverpoort draaien als het is ingeschakeld, tenzij expliciet opgegeven.

:::code-group

```toml [pumpkin.toml]
[networking.query]
enabled = true
address = "0.0.0.0:25565"
```

:::
