# Compressão

Compressão é utilizada para reduzir o tamanho dos pacotes. Isso é benéfico para reduzir a largura de banda do lado do servidor e também para ajudar jogadores com conexões de internet mais lentas.

## Configurando a compressão

#### `enabled`: Booleano

Se a compressão de pacotes está habilitada ou não.

> [!TIP] DICA
> Pode ser benéfico desabilitar a compressão se o servidor estiver atrás de um proxy.

:::code-group

```toml [pumpkin.toml] {2}
[networking.java_compression]
enabled = true
```

:::

#### `threshold`: Inteiro (0-1024)

O tamanho mínimo do pacote antes que o servidor tente comprimir o pacote.

> [!CAUTION] CUIDADO
> Aumentar este valor pode prejudicar jogadores com conexões mais lentas.

:::code-group

```toml [pumpkin.toml] {2}
[networking.java_compression]
threshold = 256
```

:::

#### `level`: Inteiro (0-9)

Um valor entre 0 e 9: 0 para desabilitar a compressão, 1 sendo a compressão mais rápida (à custa do tamanho), e 9 sendo a compressão máxima (à custa da velocidade).

:::code-group

```toml [pumpkin.toml] {2}
[networking.java_compression]
level = 4
```

:::

## Configuração Padrão

Por padrão, a compressão está habilitada.

:::code-group

```toml [pumpkin.toml]
[networking.java_compression]
enabled = true
threshold = 256
level = 4
```

:::
