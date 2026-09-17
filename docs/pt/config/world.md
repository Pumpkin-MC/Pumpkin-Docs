# Mundo

O Pumpkin permite ajustar com precisão os formatos de armazenamento do mundo, os intervalos de salvamento automático (autosave) e os modos de iluminação em `[world]` no `pumpkin.toml`.

## Configuração

:::code-group

```toml [pumpkin.toml]
[world]
lighting = "default"
autosave_ticks = 6000

[world.chunk]
type = "anvil"
write_in_place = false

[world.chunk.compression]
algorithm = "LZ4"
level = 6
```

:::

### Configurações de Mundo

- **`lighting`**: Modo de cálculo de propagação do motor de iluminação.
  - `"default"`: Propagação de luz padrão do Vanilla Minecraft.
  - `"full"`: Luz solar total em todos os lugares, sem sombras.
  - `"dark"`: Iluminação completamente escura em todos os lugares (luz zero).
- **`autosave_ticks`**: Número de ticks do servidor entre salvamentos automáticos do mundo (padrão: `6000`, equivalente a 5 minutos a 20 TPS). Definir como `0` desativa o salvamento automático do mundo.

### Configurações de Armazenamento de Chunks

- **`type`**: O formato de armazenamento de chunks a ser utilizado:
  - `"anvil"`: Formato padrão de arquivos de região Anvil do Minecraft (`.mca`).
  - `"linear"`: Formato de armazenamento de região Linear que usa compressão rápida para menor pegada de disco.
  - `"pump"`: Formato nativo otimizado de mundo do Pumpkin.
- **`write_in_place`**: Se os chunks devem ser reescritos no mesmo local dentro dos arquivos de região existentes em vez de realocar novos chunks livres (padrão: `false`).
- **`compression.algorithm`**: Algoritmo de compressão utilizado para dados de chunks (`"LZ4"`, `"ZLib"`, `"GZip"`, `"Custom"`).
- **`compression.level`**: Nível de compressão para o armazenamento de chunks (padrão: `6`).
