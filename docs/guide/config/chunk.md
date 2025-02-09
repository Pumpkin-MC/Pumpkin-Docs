# Chunk Formats

Pumpkin currently support 2 types of chunk formats:
- [Anvil](https://minecraft.wiki/w/Anvil_file_format)
- [Linear](https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools) (RECOMMENDED)

## `compression.algorithm`

The chunk compression algorithm (only works with the Anvil chunk format).

:::code-group
```toml [features.toml]
[chunk.compression]
algorithm = "LZ4" # Enum (GZip, ZLib, LZ4, Custom)
```
:::

## `compression.level`

0 to disable compression, 1 being the fastest compression (at the cost of size), and 9 being maximum compression (at the cost of speed).

:::code-group
```toml [features.toml]
[packet_compression]
level = 6 # Integer (0-9)
```
:::

## `format`

The chunk format that will be used for the worlds.

:::code-group
```toml [features.toml]
[format]
level = "Anvil" # Enum (Anvil, Linear)
```
:::
