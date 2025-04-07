# Proxy

Muitos servidores utilizam proxies para gerenciar conexões e distribuir jogadores entre servidores. Pumpkin suporta os seguintes protocolos de proxy:

-   [Velocity](https://papermc.io/software/velocity)
-   [BungeeCord](https://www.spigotmc.org/wiki/bungeecord-installation/)

> [!TIP] DICA
> Velocity é recomendado para a maioria das redes de servidores. Velocity é moderno e mais eficiente em comparação ao BungeeCord.

## Configurando Proxy

#### `enabled`: Booleano

Habilita o suporte para proxies.

:::code-group

```toml [features.toml]{2}
[proxy]
enabled = true
```

:::

### Velocity

#### `enabled`: Booleano

Se o suporte ao Velocity está habilitado ou não.

:::code-group

```toml [features.toml]{2}
[proxy.velocity]
enabled = true
```

:::

#### `secret`: String

O segredo configurado no Velocity.

:::code-group

```toml [features.toml]{3}
[proxy.velocity]
enabled = true
secret = "[segredo do proxy aqui]"
```

:::

### BungeeCord

#### `enabled`: Booleano

Se o suporte ao BungeeCord está habilitado ou não.

:::code-group

```toml [features.toml]{2}
[proxy.bungeecord]
enabled = true
```

:::

> [!CAUTION] CUIDADO
> BungeeCord não consegue verificar se as informações do jogador são provenientes do seu proxy ou de um impostor. Certifique-se de que o firewall do servidor esteja configurado corretamente.

## Configuração Padrão

Por padrão, o suporte a proxies está desativado. Aqui está a configuração padrão:

:::code-group

```toml [features.toml]
[proxy]
enabled = false

[proxy.velocity]
enabled = false
secret = ""

[proxy.bungeecord]
enabled = false
```

:::
