# Authenticatie

Servers authentiseren met de sessieservers van Mojang om ervoor te zorgen dat de client op een legitiem, betaald account speelt. Pumpkin stelt je in staat om authenticatie volledig te configureren.

## Authenticatie configureren

> [!WARNING]
> Meeste servers zouden de standaard authenticatieconfiguratie niet moeten wijzigen. Dit kan onbedoelde gevolgen hebben. **Wijzig deze instellingen alleen als je weet wat je doet!**

#### `enabled`: Boolean

Of authenticatie is ingeschakeld of niet.

:::code-group
```toml [features.toml] {2}
[authentication]
enabled = false
```
:::

#### `prevent_proxy_connections`: Boolean

Of proxyverbindingen moeten worden geblokkeerd of niet.

:::code-group
```toml [features.toml] {3}
[authentication]
enabled = true
prevent_proxy_connections = true
```
:::

#### `auth_url`: String (optioneel)
De URL om te authenticeren. Gebruikt de sessieservers van Mojang om te authenticeren als niet gespecificeerd.

##### Plaatsvervangers
| Plaatsvervanger | Beschrijving          |
| --------------- | --------------------- |
| `{username}`    | Speler gebruikersnaam |
| `{server_hash}` | Hash van de server    |

:::code-group
```toml [features.toml] {2}
[authentication]
auth_url = "[aangepaste auth server hier]"
```
:::

#### `prevent_proxy_connection_auth_url`: String (optioneel)
De URL om te authenticeren als `prevent_proxy_connections` is ingeschakeld. Gebruikt de sessieservers van Mojang om te authenticeren als niet gespecificeerd.

##### Plaatsvervangers
| Plaatsvervanger | Beschrijving              |
| --------------- | ------------------------- |
| `{username}`    | Speler gebruikersnaam     |
| `{server_hash}` | Hash van de server        |
| `{ip}`          | IP-adres van de speler    |

:::code-group
```toml [features.toml] {2}
[authentication]
prevent_proxy_connection_auth_url = "[aangepaste auth server hier]"
```
:::

### Spelerprofiel

#### `allow_banned_players`: Boolean
Sta spelers toe die door Mojang zijn gemarkeerd.

:::code-group
```toml [features.toml] {2}
[authentication.player_profile]
allow_banned_players = true
```
:::

#### `allowed_actions`: String Array
Welke acties zijn toegestaan als `allow_banned_players` is ingeschakeld.

:::code-group
```toml [features.toml] {3}
[authentication.player_profile]
allow_banned_players = true
allowed_actions = ["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]
```
:::

### Texturen

#### `enabled`: Boolean
Of spelertexturen (bijv. Skins/Capes) moeten worden gefilterd/gevalideerd.

:::code-group
```toml [features.toml] {2}
[authentication.textures]
enabled = true
```
:::

#### `allowed_url_schemes`: String Array
Toegestane URL-schema's voor texturen.

:::code-group
```toml [features.toml] {3}
[authentication.textures]
enabled = true
allowed_url_schemes = ["http", "https"]
```
:::

#### `allowed_url_domains`: String Array
Toegestane URL-domeinen voor texturen.

:::code-group
```toml [features.toml] {3}
[authentication.textures]
enabled = true
allowed_url_domains = [".minecraft.net", ".mojang.com"]
```
:::

### Textuurtypen

#### `skin`: Boolean
Of speler skins moeten worden gebruikt of niet.

:::code-group
```toml [features.toml] {3}
[authentication.textures.types]
skin = true
```
:::

#### `cape`: Boolean
Of speler capes moeten worden gebruikt of niet.

:::code-group
```toml [features.toml] {3}
[authentication.textures.types]
cape = true
```
:::

#### `elytra`: Boolean
Of speler elytra's moeten worden gebruikt of niet.

:::code-group
```toml [features.toml] {3}
[authentication.textures.types]
elytra = true
```
:::

## Standaardconfiguratie
Standaard is authenticatie ingeschakeld en worden de servers van Mojang gebruikt. Hier is de standaardconfiguratie:
:::code-group
```toml [features.toml]
[authentication]
enabled = true
prevent_proxy_connections = false

[authentication.player_profile]
allow_banned_players = false
allowed_actions = ["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]

[authentication.textures]
enabled = true
allowed_url_schemes = ["http", "https"]
allowed_url_domains = [".minecraft.net", ".mojang.com"]

[authentication.textures.types]
skin = true
cape = true
elytra = true
```
:::
