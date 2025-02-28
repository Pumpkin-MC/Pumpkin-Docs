# Commando's
Pumpkin ondersteunt vanillecommando's en stelt je in staat om te configureren waar ze kunnen worden uitgevoerd.

## Commando's configureren
#### `use_console`: Boolean
Of commando's vanaf de console worden geaccepteerd of niet.

:::code-group
```toml [features.toml] {2}
[commands]
use_console = false
```
:::

#### `log_console`: Boolean
Of commando's van spelers in de console moeten worden gelogd of niet.

:::code-group
```toml [features.toml] {2}
[commands]
log_console = false
```
:::

## Operationeel permissieniveau

Het standaard permissieniveau voor alle spelers.

:::code-group
```toml [configuration.toml] {2}
default_op_level = 0
```
:::

## Standaardconfiguratie
Standaard staat Pumpkin commando's vanaf de console toe en logt alle commando's die door spelers worden uitgevoerd.

:::code-group
```toml [features.toml]
[commands]
use_console = true
log_console = true
default_op_level = 0
```
:::
