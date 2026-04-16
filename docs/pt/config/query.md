# Query

O protocolo Query é uma maneira simples de consultar o status do servidor. Pumpkin oferece suporte total para o protocolo Query.

## Configurando o Query

#### `enabled`: Booleano

Se deve ouvir ou não as requisições do protocolo Query.

:::code-group

```toml [features.toml] {2}
[query]
enabled = true
```

:::

#### `port`: Inteiro (0-65535) (opcional)

A porta em que o servidor deve ouvir as requisições do protocolo Query. Se não especificado, será utilizada a mesma porta do servidor.

:::code-group

```toml [features.toml] {3}
[query]
enabled = true
port = 12345
```

:::

## Configuração Padrão

Por padrão, o Query está desabilitado. Ele será executado na porta do servidor se habilitado, a menos que especificado explicitamente.

:::code-group

```toml [features.toml]
[query]
enabled = true
port = 25565
```

:::
