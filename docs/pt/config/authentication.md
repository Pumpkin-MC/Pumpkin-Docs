# Autenticação

Servidores autenticam com os servidores de sessão da Mojang para garantir que o cliente esteja jogando em uma conta legítima e paga. O Pumpkin permite configurar a autenticação de forma completa.

## Configurando a Autenticação

> [!WARNING] AVISO
> A maioria dos servidores não deve alterar a configuração padrão de autenticação. Fazer isso pode ter consequências indesejadas. **Altere essas configurações somente se souber o que está fazendo!**

#### `enabled`: Booleano

Define se a autenticação está habilitada ou não.

:::code-group

```toml [features.toml] {2}
[authentication]
enabled = false
```

:::

#### `prevent_proxy_connections`: Booleano

Define se deve bloquear conexões de proxy ou não.

:::code-group

```toml [features.toml] {3}
[authentication]
enabled = true
prevent_proxy_connections = true
```

:::

#### `auth_url`: String (opcional)

A URL para autenticar. Usa os servidores de sessão da Mojang para autenticação se não for especificada.

##### Argumentos

| Argumento       | Descrição                  |
| --------------- | -------------------------- |
| `{username}`    | Nome de usuário do jogador |
| `{server_hash}` | Hash do servidor           |

:::code-group

```toml [features.toml] {2}
[authentication]
auth_url = "[servidor de autenticação personalizado aqui]"
```

:::

#### `prevent_proxy_connection_auth_url`: String (opcional)

A URL para autenticar quando `prevent_proxy_connections` está habilitado. Usa os servidores de sessão da Mojang para autenticação se não for especificada.

##### Argumentos

| Argumento       | Descrição                  |
| --------------- | -------------------------- |
| `{username}`    | Nome de usuário do jogador |
| `{server_hash}` | Hash do servidor           |
| `{ip}`          | Endereço IP do jogador     |

:::code-group

```toml [features.toml] {2}
[authentication]
prevent_proxy_connection_auth_url = "[servidor de autenticação personalizado aqui]"
```

:::

### Perfil do Jogador

#### `allow_banned_players`: Booleano

Permitir jogadores banidos pela Mojang.

:::code-group

```toml [features.toml] {2}
[authentication.player_profile]
allow_banned_players = true
```

:::

#### `allowed_actions`: Array de Strings

Quais ações são permitidas se `allow_banned_players` estiver habilitado.

:::code-group

```toml [features.toml] {3}
[authentication.player_profile]
allow_banned_players = true
allowed_actions = ["FORCED_NAME_CHANGE", "USING_BANNED_SKIN"]
```

:::

### Texturas

#### `enabled`: Booleano

Define se as texturas dos jogadores (por exemplo, skins/capas) devem ser filtradas/validadas.

:::code-group

```toml [features.toml] {2}
[authentication.textures]
enabled = true
```

:::

#### `allowed_url_schemes`: Array de Strings

Esquemas URL permitidos para texturas.

:::code-group

```toml [features.toml] {3}
[authentication.textures]
enabled = true
allowed_url_schemes = ["http", "https"]
```

:::

#### `allowed_url_domains`: Array de Strings

Domínios URL permitidos para texturas.

:::code-group

```toml [features.toml] {3}
[authentication.textures]
enabled = true
allowed_url_domains = [".minecraft.net", ".mojang.com"]
```

:::

### Tipos de Texturas

#### `skin`: Booleano

Define se deve usar skins dos jogadores ou não.

:::code-group

```toml [features.toml] {3}
[authentication.textures.types]
skin = true
```

:::

#### `cape`: Booleano

Define se deve usar capas dos jogadores ou não.

:::code-group

```toml [features.toml] {3}
[authentication.textures.types]
cape = true
```

:::

#### `elytra`: Booleano

Define se deve usar elytras dos jogadores ou não.

:::code-group

```toml [features.toml] {3}
[authentication.textures.types]
elytra = true
```

:::

## Configuração Padrão

Por padrão, a autenticação está habilitada e usa os servidores da Mojang. Aqui está a configuração padrão:
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
