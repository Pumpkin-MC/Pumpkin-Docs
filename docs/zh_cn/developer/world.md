### 世界格式

#### 区域文件格式（Region File Format）

Minecraft Beta 1.3 到 Release 1.2 使用一种被称为"区域文件格式"的 Minecraft 格式。

这种格式存储的文件是 `.mcr` 文件，每个文件存储一组 32x32 的区块，称为一个区域。

更多详情可以在 [Minecraft Wiki](https://minecraft.wiki/w/Region_file_format) 上找到。

#### Anvil 文件格式（Anvil File Format）

在 Minecraft Release 1.2 之后取代区域文件格式，这是用于存储现代原版 Minecraft：Java 版世界的文件格式。

这种格式存储的文件是 `.mca` 文件。虽然使用相同的区域逻辑，但有一些变化。值得注意的变化包括将高度限制增加到 256，然后到 320，以及更多的方块 ID。

更多详情可以在 [Minecraft Wiki](https://minecraft.wiki/w/Anvil_file_format) 上找到。

#### 线性文件格式（Linear File Format）

有一种更现代的文件格式，称为线性区域文件格式。它节省磁盘空间，并使用 zstd 库而不是 zlib。这是有益的，因为 zlib 非常老旧和过时。

这种格式存储的文件是 `.linear` 文件，在主世界和下界可以节省约 50% 的磁盘空间，在末地可以节省 95%。

更多详情可以在 [LinearRegionFileFormatTools](https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools) 的 GitHub 页面上找到。

#### Slime 文件格式（Slime File Format）

由 Hypixel 开发，用于修复 Anvil 文件格式文件格式的许多缺陷，Slime 也替换了 zlib 并与 Anvil 文件格式相比节省空间。它将整个世界保存在单个保存文件中，并允许该文件加载到多个实例中。

这种格式存储的文件是 `.slime` 文件。

更多详情可以在 [Slime World Manager](https://github.com/cijaaimee/Slime-World-Manager#:~:text=Slime%20World%20Manager%20is%20a,worlds%20faster%20and%20save%20space.) 的 GitHub 页面上以及 Hypixel 的 [Dev Blog #5](https://hypixel.net/threads/dev-blog-5-storing-your-skyblock-island.2190753/) 上找到。

#### 原理图文件格式（Schematic File Format）

与列出的其他文件格式不同，原理图文件格式不用于存储 Minecraft 世界，而是用于第三方程序，如 MCEdit、WorldEdit 和 Schematica。

这种格式存储的文件是 `.schematic` 文件，并以 NBT 格式存储。

更多详情可以在 [Minecraft Wiki](https://minecraft.wiki/w/Schematic_file_format) 上找到。

### 世界生成

当服务器启动时，它会检查是否存在保存，也称为"世界"。

然后 Pumpkin 调用世界生成：

#### 存在保存时

调用 `AnvilChunkReader` 处理给定保存的区域文件

- 如上所述，区域文件存储 32x32 个区块
    > 每个区域文件的命名对应于其在世界中的坐标

> r.{}.{}.mca

- 从保存文件中读取位置表，表示区块坐标
- 从保存文件中读取时间戳表，表示区块最后修改的时间

#### 目前没有实现存档的保存

世界种子目前固定设置为"0"。将来它会与"基本"配置中的值同步。

调用 `PlainsGenerator`，因为到目前为止 `Plains`（平原）是唯一实现的生物群系。

- 调用 `PerlinTerrainGenerator` 设置区块高度
- 石头高度设置为区块高度下方 5 格
- 泥土高度设置为区块高度下方 2 格
- 草方块出现在泥土顶部
- 基岩设置在y轴-64的高度
- 花和矮草丛随机散布

`SuperflatGenerator`（超平坦生成器）也可用，但目前无法调用。

- 基岩设置在y轴-64的高度
- 泥土设置在基岩上方2层
- 草方块在泥土上方1层

可以放置和破坏方块，但无法将更改保存在任何世界格式中。Anvil 的存档文件目前是只读的。
