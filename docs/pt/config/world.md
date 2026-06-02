# Mundo

O Pumpkin permite configurar geração de mundo, armazenamento de chunks, iluminação e salvamento automático.

## Iluminação

#### `lighting`: Enum

Controla o cálculo de iluminação durante a geração de chunks.

:::code-group

```toml [pumpkin.toml] {2}
[world]
lighting = "default"
```

:::

```toml
default
full
dark
```

## Salvamento automático

#### `autosave_ticks`: Inteiro

O intervalo entre salvamentos automáticos do mundo, medido em ticks do servidor. Defina como `0` para desativar.

:::code-group

```toml [pumpkin.toml] {2}
[world]
autosave_ticks = 0
```

:::

## Tipo de Mundo

#### `level_type`: String

O gerador de mundo a ser usado. O prefixo `minecraft:` é opcional.

:::code-group

```toml [pumpkin.toml] {2}
[world]
level_type = "minecraft:normal"
```

:::

```toml
minecraft:normal
minecraft:flat
```

Valores desconhecidos retornam à geração normal.

## Configurações do Gerador

#### `generator_settings`: String

Configurações específicas do gerador. Um valor vazio seleciona a predefinição **Classic Flat**.

:::code-group

```toml [pumpkin.toml] {2}
[world]
generator_settings = ""
```

:::

## Superflat

Defina `level_type = "flat"` para gerar um mundo superflat jogável com camadas horizontais fixas, um único bioma e sem ruído de terreno.

### Formato da predefinição

A string `generator_settings` segue o formato Vanilla:

```
layers;biome
```

#### Camadas

Uma lista separada por vírgulas de camadas de blocos, ordenada de **baixo para cima**. Cada entrada é:

- `minecraft:block_name` — uma única camada
- `count*minecraft:block_name` — múltiplas camadas empilhadas (ex: `3*minecraft:stone`)

#### Bioma

A parte após o ponto e vírgula define o bioma do mundo (ex: `minecraft:plains`, `minecraft:desert`).

### Predefinição Classic Flat

Quando `generator_settings` está vazio:

```
minecraft:bedrock,2*minecraft:dirt,minecraft:grass_block;minecraft:plains
```

## Armazenamento de Chunks

#### `type`: Enum

O formato de armazenamento de chunks controla como os dados dos chunks são salvos no disco.

:::code-group

```toml [pumpkin.toml] {2}
[world.chunk]
type = "pump"
```

:::

```toml
pump
anvil
linear
```
