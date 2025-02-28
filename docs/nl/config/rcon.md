# RCON
RCON is een protocol waarmee je de server op afstand kunt beheren vanaf een ander apparaat. Pumpkin heeft volledige ondersteuning voor RCON.

## Configureren van RCON

#### `enabled`: Boolean

:::code-group
```toml [features.toml] {2}
[rcon]
enabled = true
```
:::

#### `address`: String
Het adres en de poort waar RCON naar moet luisteren.

:::code-group
```toml [features.toml] {3}
[rcon]
enabled = true
address = "0.0.0.0:25575"
```
:::

#### `password`: String
Het wachtwoord dat gebruikt moet worden voor RCON-authenticatie.

:::code-group
```toml [features.toml] {3}
[rcon]
enabled = true
password = "[je veilig wachtwoord hier]"
```
:::

#### `max_connections`: Integer
Het maximale aantal RCON-verbindingen dat tegelijkertijd is toegestaan. Stel in op 0 om een limiet uit te schakelen.

:::code-group
```toml [features.toml] {3}
[rcon]
enabled = true
max_connections = 5
```
:::

### Logging
#### `log_logged_successfully`: Boolean
Of succesvolle logins naar de console moeten worden gelogd of niet.

:::code-group
```toml [features.toml] {2}
[rcon.logging]
log_logged_successfully = true
```
:::

#### `log_wrong_password`: Boolean
Of verkeerde wachtwoordpogingen naar de console moeten worden gelogd of niet.

:::code-group
```toml [features.toml] {2}
[rcon.logging]
log_logged_successfully = true
```
:::

#### `log_commands`: Boolean
Of commando's uitgevoerd vanaf RCON naar de console moeten worden gelogd of niet.

:::code-group
```toml [features.toml] {2}
[rcon.logging]
log_commands = true
```
:::

#### `log_quit`: Boolean
Of het afsluiten van de RCON-client moet worden gelogd of niet.

:::code-group
```toml [features.toml] {2}
[rcon.logging]
log_quit = true
```
:::

## Standaard Configuratie
Standaard is RCON uitgeschakeld.

:::code-group
```toml [features.toml]
[rcon]
enabled = false
address = "0.0.0.0:25575"
password = ""
max_connections = 0

[rcon.logging]
log_logged_successfully = true
log_wrong_password = true
log_commands = true
log_quit = true
```
:::
