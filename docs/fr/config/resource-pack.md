# Resource Pack

Pumpkin supports serving resource packs to Java and Bedrock clients. Resource pack options are configured under `[resource_pack.java]` and `[resource_pack.bedrock]` in `pumpkin.toml`.

## Java Resource Pack

:::code-group

```toml [pumpkin.toml]
[resource_pack.java]
enabled = false
url = ""
sha1 = ""
prompt_message = ""
force = false
```

:::

### Options

- **`enabled`**: Enable serving resource pack to Java clients.
- **`url`**: Direct download URL for the Java resource pack zip.
- **`sha1`**: SHA-1 checksum of the resource pack zip file.
- **`prompt_message`**: Message shown to players when prompted to download.
- **`force`**: Disconnect players who decline the resource pack download.

## Bedrock Resource Pack

:::code-group

```toml [pumpkin.toml]
[resource_pack.bedrock]
enabled = false
force = false
packs = []
```

:::

### Options

- **`enabled`**: Enable resource packs for Bedrock clients.
- **`force`**: Force Bedrock clients to download required packs.
- **`packs`**: Array of Bedrock resource pack definitions.
