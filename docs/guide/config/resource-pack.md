# Resource Pack

Servers can send resource packs to the client in order to change the appearance of the game on the client. Pumpkin allows you to fully configure the resource pack.

> [!TIP]
> Minify your resource pack using [PackSquash](https://packsquash.aylas.org)! This can help clients download the resource pack faster.

## `enabled`

Whether a resource pack is enabled or not.

:::code-group
```toml [features.toml]
[resource_pack]
enabled = false # Boolean
```
:::

## `resource_pack_url`

The direct download URL to the resource pack. 

> [!TIP]
> You can host the resource pack for free at [MCPacks](https://mc-packs.net).

:::code-group
```toml [features.toml]
[resource_pack]
resource_pack_url = "" # String
```
:::

## `resource_pack_sha1`

The hash of the resource pack, using the SHA1 algorithm.

> [!IMPORTANT]
> Although not required to specify, you should specify this field because the client will otherwise redownload the resource pack every time they join the server, even if there are no changes to the resource pack.

::: details How do I get the SHA1 hash of my resource pack?
::: code-group
```powershell [Windows (PowerShell)]
Get-FileHash [file] SHA1
```
```sh [Mac OS]
shasum -a 1 [file]
```
```sh [Linux]
sha1sum [file]
```
:::

:::code-group
```toml [features.toml]
[resource_pack]
resource_pack_sha1 = "" # String
```
:::

## `prompt_message`

The message to show to the user when prompted to download the resource pack.

:::code-group
```toml [features.toml]
[resource_pack]
prompt_message = "" # String
```
:::

## `force`

Whether to force the client to download the resource pack or not. If the client declines the download, they will be kicked from the server.

:::code-group
```toml [features.toml]
[resource_pack]
force = false # Boolean
```
:::
