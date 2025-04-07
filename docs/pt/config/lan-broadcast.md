# Transmissão LAN

Pumpkin pode divulgar o servidor na rede para facilitar a conexão de jogadores locais ao servidor.

## Configurando a Transmissão LAN

#### `enabled`: Booleano

Se a transmissão LAN está habilitada ou não.

:::code-group

```toml [features.toml] {2}
[lan_broadcast]
enabled = true
```

:::

#### `motd`: String (opcional)

A mensagem de boas-vindas (MOTD) a ser transmitida para os clientes; usa a MOTD do servidor por padrão.

> [!CAUTION] CUIDADO
> A MOTD da transmissão LAN não suporta múltiplas linhas, cores RGB ou gradientes. O Pumpkin não verifica a MOTD antes de transmiti-la. Se a MOTD do servidor usar esses componentes, considere definir este campo para que os clientes vejam uma MOTD adequada.

:::code-group

```toml [features.toml] {3}
[lan_broadcast]
enabled = true
motd = "[sua MOTD aqui]"
```

:::

#### `port`: Inteiro (0-65535) (opcional)

A porta para a qual o servidor será vinculado. Se não especificado, será vinculado à porta 0 (qualquer porta disponível no sistema).

> [!IMPORTANT] IMPORTANTE
> O protocolo define qual porta será usada para a transmissão. Esta opção existe apenas para especificar qual porta vincular no host. Ela existe exclusivamente para que a porta seja previsível.

:::code-group

```toml [features.toml] {3}
[lan_broadcast]
enabled = true
port = 46733
```

:::

## Configuração Padrão

Por padrão, a transmissão LAN está desabilitada.

:::code-group

```toml [features.toml]
[lan_broadcast]
enabled = false
motd = "[MOTD do servidor aqui]"
port = 0
```

:::
