# Authentication

Servers authenticate with Mojang's session servers in order to ensure the client is playing on a legitimate, paid account. Pumpkin allows you to fully configure authentication.

## Configuring Authentication

> [!WARNING]
> Most servers should not change the default authentication configuration. Doing so may have unintended consequences. **Only change these settings if you know what you are doing!**

> [!NOTE]
> Authentication settings are now per-protocol. Java and Bedrock have separate authentication configurations.

### Java

#### `enabled`: Boolean

Whether authentication is enabled or not.

:::code-group

```toml [pumpkin.toml] {2}
[networking.java.authentication]
enabled = true
```

:::

#### `connect_timeout`: Integer

The timeout in milliseconds for connecting to the authentication server.

:::code-group

```toml [pumpkin.toml] {3}
[networking.java.authentication]
enabled = true
connect_timeout = 5000
```

:::

#### `read_timeout`: Integer

The timeout in milliseconds for reading from the authentication server.

:::code-group

```toml [pumpkin.toml] {3}
[networking.java.authentication]
enabled = true
read_timeout = 5000
```

:::

#### `prevent_proxy_connections`: Boolean

Whether to block proxy connections or not.

:::code-group

```toml [pumpkin.toml] {3}
[networking.java.authentication]
enabled = true
prevent_proxy_connections = true
```

:::

### Player Profile

#### `allow_banned_players`: Boolean

Allow players flagged by Mojang.

:::code-group

```toml [pumpkin.toml] {2}
[networking.java.authentication.player_profile]
allow_banned_players = true
```

:::

#### `allowed_actions`: String Array

What actions are allowed if `allow_banned_players` is enabled.

:::code-group

```toml [pumpkin.toml] {3}
[networking.java.authentication.player_profile]
allow_banned_players = true
allowed_actions = ["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]
```

:::

### Textures

#### `enabled`: Boolean

Whether to filter/validate player textures (e.g. skins/capes).

:::code-group

```toml [pumpkin.toml] {2}
[networking.java.authentication.textures]
enabled = true
```

:::

#### `allowed_url_schemes`: String Array

Allowed URL schemes for textures.

:::code-group

```toml [pumpkin.toml] {3}
[networking.java.authentication.textures]
enabled = true
allowed_url_schemes = ["http", "https"]
```

:::

#### `allowed_url_domains`: String Array

Allowed URL domains for textures.

:::code-group

```toml [pumpkin.toml] {3}
[networking.java.authentication.textures]
enabled = true
allowed_url_domains = [".minecraft.net", ".mojang.com"]
```

:::

### Texture Types

#### `skin`: Boolean

Whether to use player skins or not.

:::code-group

```toml [pumpkin.toml] {3}
[networking.java.authentication.textures.types]
skin = true
```

:::

#### `cape`: Boolean

Whether to use player capes or not.

:::code-group

```toml [pumpkin.toml] {3}
[networking.java.authentication.textures.types]
cape = true
```

:::

#### `elytra`: Boolean

Whether to use player elytras or not.

:::code-group

```toml [pumpkin.toml] {3}
[networking.java.authentication.textures.types]
elytra = true
```

:::

### Bedrock

#### `enabled`: Boolean

Whether Bedrock authentication is enabled or not.

:::code-group

```toml [pumpkin.toml] {2}
[networking.bedrock.authentication]
enabled = true
```

:::

#### `connect_timeout`: Integer

The timeout in milliseconds for connecting to the authentication server.

:::code-group

```toml [pumpkin.toml] {3}
[networking.bedrock.authentication]
enabled = true
connect_timeout = 5000
```

:::

#### `read_timeout`: Integer

The timeout in milliseconds for reading from the authentication server.

:::code-group

```toml [pumpkin.toml] {3}
[networking.bedrock.authentication]
enabled = true
read_timeout = 5000
```

:::

## Default Config

By default, authentication is enabled and uses Mojang's servers. Here is the default config:

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

[networking.bedrock.authentication]
enabled = true
connect_timeout = 5000
read_timeout = 5000
```

:::
