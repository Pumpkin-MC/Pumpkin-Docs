# Authentication

Pumpkin verifies accounts with Mojang's session servers to ensure players use legitimate accounts. Authentication settings are configured under `[networking.java.authentication]` and `[networking.bedrock.authentication]` in `pumpkin.toml`.

## Java Edition Authentication

:::code-group

```toml [pumpkin.toml]
[networking.java.authentication]
enabled = true
connect_timeout = 5000
read_timeout = 5000
prevent_proxy_connections = false

[networking.java.authentication.player_profile]
allow_banned_players = false
allowed_actions = ["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]

[networking.java.authentication.textures]
enabled = true
allowed_url_schemes = ["http", "https"]
allowed_url_domains = [".minecraft.net", ".mojang.com"]

[networking.java.authentication.textures.types]
skin = true
cape = true
elytra = true
```

:::

### Configuration Options

- **`enabled`**: Enables online authentication for Java clients.
- **`connect_timeout`**: Connection timeout in milliseconds when contacting auth servers.
- **`read_timeout`**: Read timeout in milliseconds when contacting auth servers.
- **`prevent_proxy_connections`**: Block proxy/VPN connections during authentication.

### Player Profile Settings

- **`allow_banned_players`**: Allow players flagged/banned by Mojang to connect.
- **`allowed_actions`**: Allowed actions when banned players connect (`"FORCED_NAME_CHANGE"`, `"USING_BANNED_SKIN"`).

### Textures Settings

- **`enabled`**: Enables player texture validation (skins, capes, elytras).
- **`allowed_url_schemes`**: URL schemes permitted for texture downloads (`["http", "https"]`).
- **`allowed_url_domains`**: Domains permitted for texture downloads (`[".minecraft.net", ".mojang.com"]`).
- **`types.skin`**: Enable custom skins.
- **`types.cape`**: Enable capes.
- **`types.elytra`**: Enable elytra textures.

## Bedrock Edition Authentication

:::code-group

```toml [pumpkin.toml]
[networking.bedrock.authentication]
enabled = true
connect_timeout = 5000
read_timeout = 5000
```

:::
