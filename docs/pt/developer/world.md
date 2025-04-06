### World Formats

#### Region File Format

Minecraft Beta 1.3 to Release 1.2 used a Minecraft format known as the "Region file format".

The files stored in this format are `.mcr` files, each storing a group of 32x32 chunks called a region.

More details can be found on the [Minecraft Wiki](https://minecraft.wiki/w/Region_file_format).

#### Anvil File Format

Replacing the Region File Format after Minecraft Release 1.2, this is the file format used to store modern Vanilla Minecraft: Java Edition worlds.

The files stored in this format are `.mca` files. While using the same region logic, there were a number of changes. The notable changes include an increase
to a 256 height limit, then to 320, as well as a higher number of block IDs.

More details can be found on the [Minecraft Wiki](https://minecraft.wiki/w/Anvil_file_format).

#### Linear File Format

There is a more modern file format known as the Linear region file format. It saves on disk space and uses the zstd library instead of zlib. This is beneficial as zlib is extremely old and
outdated.

The files stored in this format are `.linear` files, and it saves about 50% of disk space in the Overworld and the Nether, and saves 95% in the End.

More details can be found at the GitHub page for [LinearRegionFileFormatTools](https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools).

#### Slime File Format

Developed by Hypixel to fix many of the pitfalls of the Anvil file format, Slime also replaces zlib and saves space compared to Anvil. It saves the entire world in a single save
file, and allows that file to be loaded into multiple instances.

The files stored in this format are `.slime` files.

More details can be found on the GitHub page for [Slime World Manager](https://github.com/cijaaimee/Slime-World-Manager#:~:text=Slime%20World%20Manager%20is%20a,worlds%20faster%20and%20save%20space.), as well as on [Dev Blog #5](https://hypixel.net/threads/dev-blog-5-storing-your-skyblock-island.2190753/) for Hypixel.

#### Schematic File Format

Unlike the other file formats listed, the Schematic File Format is not used for storing Minecraft worlds, but instead used within 3rd party programs such as MCEdit, WorldEdit, and Schematica.

The files stored in this format are `.schematic` files, and are stored in the NBT format.

More details can be found on the [Minecraft Wiki](https://minecraft.wiki/w/Schematic_file_format)

### World Generation

When the server is starting up, it checks if there is a save present, also known as the "world".

Pumpkin then calls for world generation:

#### Save Present

`AnvilChunkReader` is called to process the region files for the given save

-   As stated above, region files store 32x32 chunks
    > Each region file is named corresponding to coordinates of where it is in the world

> r.{}.{}.mca

-   The location table is read from the save file, representing the chunk coordinates
-   The timestamp table is read from the save file, representing the last time the chunk was modified

#### No Save Present

The world seed is set to "0". In the future it will be set to the value in the "basic" configuration.

`PlainsGenerator` is called, as so far `Plains` is the only biome that has been implemented.

-   `PerlinTerrainGenerator` is called to set chunk height
-   Stone height is set 5 below chunk height
-   Dirt height is set to 2 below chunk height
-   Grass blocks appear at the top of dirt
-   Bedrock is set at y = -64
-   Flowers and short grass are scattered about randomly

`SuperflatGenerator` is also available, but is not currently callable.

-   Bedrock is set at y = -64
-   Dirt is set two blocks up
-   Grass blocks are set one more block up

Blocks are able to be placed and broken, but changes are not able to be saved in any world format. Anvil worlds are currently read only.
