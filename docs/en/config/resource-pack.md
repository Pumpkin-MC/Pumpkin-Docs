# Resource Pack

Servers can send resource packs to clients in order to change the appearance of the game on the client. Pumpkin allows you to fully configure resource packs for both Java and Bedrock editions.

> [!TIP]
> Minify your resource pack using [PackSquash](https://packsquash.aylas.org/)! This can help clients download the resource pack faster.

## Java Edition Resource Pack

#### `enabled`: Boolean

Whether a resource pack is enabled for Java clients or not.

:::code-group

```toml [pumpkin.toml] {2}
[resource_pack.java]
enabled = false
```

:::

#### `url`: String

The direct download URL to the resource pack.

> [!TIP]
> You can host the resource pack for free at [MCPacks](https://mc-packs.net/).

:::code-group

```toml [pumpkin.toml] {3}
[resource_pack.java]
enabled = true
url = "[your download URL here]"
```

:::

#### `sha1`: String

The SHA1 hash (40 characters) of the resource pack.

> [!IMPORTANT]
> Although not required to specify, you should specify this field because the client will otherwise redownload the resource pack every time they join the server, even if there are no changes.

> [!WARNING]
> Make sure to update this field if the resource pack is modified.

::: details How do I get the SHA1 hash of my resource pack?
::: code-group

```powershell [Windows (PowerShell)]
Get-FileHash [file] -Algorithm SHA1
```

```shell [Mac OS]
shasum -a 1 [file]
```

```shell [Linux]
sha1sum [file]
```

:::

:::code-group

```toml [pumpkin.toml] {3}
[resource_pack.java]
enabled = true
sha1 = "[your hash here]"
```

:::

#### `prompt_message`: String

The message to show to the user when prompted to download the resource pack.

:::code-group

```toml [pumpkin.toml] {3}
[resource_pack.java]
enabled = true
prompt_message = "[your message here]"
```

:::

#### `force`: Boolean

Whether to force the client to download the resource pack or not. If the client declines the download, they will be kicked from the server.

:::code-group

```toml [pumpkin.toml] {3}
[resource_pack.java]
enabled = true
force = false
```

:::

## Bedrock Edition Resource Pack

Bedrock Edition supports multiple resource packs.

#### `enabled`: Boolean

Whether resource packs are enabled for Bedrock clients.

:::code-group

```toml [pumpkin.toml] {2}
[resource_pack.bedrock]
enabled = false
```

:::

#### `force`: Boolean

If true, Bedrock players cannot join without accepting the packs.

:::code-group

```toml [pumpkin.toml] {2}
[resource_pack.bedrock]
force = false
```

:::

#### `packs`: Array

List of packs to be sent to the client. Each pack requires:

- `uuid`: The pack UUID
- `version`: The pack version string
- `size`: The pack size in bytes
- `download_url`: The download URL
- `content_key` (optional): Content key for encryption
- `sub_pack_name` (optional): Sub-pack name
- `content_id` (optional): Content identifier
- `has_scripts` (optional): Whether the pack has scripts
- `addon_pack` (optional): Whether it's an addon pack
- `rtx_enabled` (optional): Whether RTX is enabled

:::code-group

```toml [pumpkin.toml]
[resource_pack.bedrock]
enabled = true
force = false
packs = []
```

:::

## Default Config

By default, no resource pack is sent to clients.

:::code-group

```toml [pumpkin.toml]
[resource_pack.java]
enabled = false
url = ""
sha1 = ""
prompt_message = ""
force = false

[resource_pack.bedrock]
enabled = false
force = false
packs = []
```

:::
