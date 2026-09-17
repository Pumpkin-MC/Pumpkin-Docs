# Wereld

Pumpkin maakt het mogelijk om formaten voor wereldopslag, intervallen voor automatisch opslaan en verlichtingsmodi fijn af te stemmen onder `[world]` in `pumpkin.toml`.

## Configuratie

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

### Wereldinstellingen

- **`lighting`**: Berekeningsmodus voor de propagatie van de verlichtingsengine.
  - `"default"`: Standaard vanille Minecraft-lichtpropagatie.
  - `"full"`: Overal volledig hemellicht zonder schaduwen.
  - `"dark"`: Overal volledige duisternis (nul licht).
- **`autosave_ticks`**: Aantal serverticks tussen automatische wereldopslagen (standaard: `6000`, wat gelijkstaat aan 5 minuten bij 20 TPS). Dit instellen op `0` schakelt automatisch opslaan van de wereld uit.

### Chunk-opslaginstellingen

- **`type`**: Het te gebruiken formaat voor chunk-opslag:
  - `"anvil"`: Standaard Minecraft Anvil-regiobestandsformaat (`.mca`).
  - `"linear"`: Linear-regio-opslagformaat dat snelle compressie gebruikt voor minder schijfgebruik.
  - `"pump"`: Pumpkin's eigen geoptimaliseerde wereldformaat.
- **`write_in_place`**: Of chunks ter plekke moeten worden herschreven binnen bestaande regiobestanden in plaats van vrije chunks opnieuw toe te wijzen (standaard: `false`).
- **`compression.algorithm`**: Compressie-algoritme dat wordt gebruikt voor chunkgegevens (`"LZ4"`, `"ZLib"`, `"GZip"`, `"Custom"`).
- **`compression.level`**: Compressieniveau voor chunk-opslag (standaard: `6`).
