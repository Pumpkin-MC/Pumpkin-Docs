# Resource Pack
Servers kunnen resource packs naar de client sturen om het uiterlijk van het spel op de client te veranderen. Pumpkin stelt je in staat om het resource pack volledig te configureren.

> [!TIP]
> Minimaliseer je resource pack met [PackSquash](https://packsquash.aylas.org/)! Dit kan helpen om de resource pack sneller te laten downloaden door clients.

## Configureren van Resource Pack

#### `enabled`: Boolean
Of een resource pack is ingeschakeld of niet.

:::code-group
```toml [features.toml] {2}
[resource_pack]
enabled = true
```
:::

#### `resource_pack_url`: String
De directe download URL naar de resource pack.

> [!TIP]
> Je kunt de resource pack gratis hosten op [MCPacks](https://mc-packs.net/).

:::code-group
```toml [features.toml] {3}
[resource_pack]
enabled = true
resource_pack_url = "[je download URL hier]"
```
:::

#### `resource_pack_sha1`: String
De hash van de resource pack, met behulp van het SHA1-algoritme.

> [!IMPORTANT]
> Hoewel het niet verplicht is om dit veld op te geven, moet je dit veld specificeren omdat de client anders de resource pack elke keer opnieuw zal downloaden wanneer ze de server betreden, zelfs als er geen wijzigingen zijn in de resource pack.

> [!WARNING]
> Zorg ervoor dat je dit veld bijwerkt als de resource pack is gewijzigd.

::: details Hoe krijg ik de SHA1-hash van mijn resource pack?
::: code-group
```powershell [Windows (PowerShell)]
Get-FileHash [bestand] SHA1
```
```shell [Mac OS]
shasum -a 1 [bestand]
```
```shell [Linux]
sha1sum [bestand]
```
:::

:::code-group
```toml [features.toml] {3}
[resource_pack]
enabled = true
resource_pack_sha1 = "[je hash hier]"
```
:::

#### `prompt_message`: String
Het bericht dat aan de gebruiker wordt getoond wanneer gevraagd wordt om de resource pack te downloaden.

:::code-group
```toml [features.toml] {3}
[resource_pack]
enabled = true
prompt_message = "[je bericht hier]"
```
:::

#### `force`: Boolean
Of de client gedwongen moet worden om de resource pack te downloaden of niet. Als de client de download weigert, worden ze van de server gekickt.

:::code-group
```toml [features.toml] {3}
[resource_pack]
enabled = true
force = false
```
:::

## Standaard Configuratie
Standaard is de resource pack uitgeschakeld.

:::code-group
```toml [features.toml]
[resource_pack]
enabled = false
resource_pack_url = ""
resource_pack_sha1 = ""
prompt_message = ""
force = false
```
:::
