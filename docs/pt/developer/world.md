### Formatos de Mundo

#### Formato de Arquivo de Região

Do Minecraft Beta 1.3 até o Release 1.2, era utilizado um formato de Minecraft conhecido como "Formato de Arquivo de Região".

Os arquivos armazenados nesse formato são arquivos `.mcr`, cada um armazenando um grupo de 32x32 chunks, chamado de região.

Mais detalhes podem ser encontrados na [Minecraft Wiki](https://minecraft.wiki/w/Region_file_format).

#### Formato de Arquivo Anvil

Substituindo o Formato de Arquivo de Região após o Minecraft Release 1.2, este é o formato de arquivo usado para armazenar mundos modernos do Minecraft: Java Edition.

Os arquivos armazenados nesse formato são arquivos `.mca`. Embora utilize a mesma lógica de regiões, houve várias mudanças. As mudanças notáveis incluem o aumento do limite de altura para 256, depois para 320, assim como um maior número de IDs de blocos.

Mais detalhes podem ser encontrados na [Minecraft Wiki](https://minecraft.wiki/w/Anvil_file_format).

#### Formato de Arquivo Linear

Existe um formato de arquivo mais moderno conhecido como Formato de Arquivo de Região Linear. Ele economiza espaço em disco e usa a biblioteca zstd em vez de zlib. Isso é benéfico, pois o zlib é extremamente antigo e desatualizado.

Os arquivos armazenados nesse formato são arquivos `.linear`, e eles economizam cerca de 50% de espaço em disco no Overworld e no Nether, e 95% no End.

Mais detalhes podem ser encontrados na página do GitHub para [LinearRegionFileFormatTools](https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools).

#### Formato de Arquivo Slime

Desenvolvido pela Hypixel para corrigir muitos dos problemas do formato de arquivo Anvil, o Slime também substitui o zlib e economiza espaço em comparação com o Anvil. Ele salva o mundo inteiro em um único arquivo de salvamento e permite que esse arquivo seja carregado em várias instâncias.

Os arquivos armazenados nesse formato são arquivos `.slime`.

Mais detalhes podem ser encontrados na página do GitHub para [Slime World Manager](https://github.com/cijaaimee/Slime-World-Manager#:~:text=Slime%20World%20Manager%20is%20a,worlds%20faster%20and%20save%20space.), assim como no [Dev Blog #5](https://hypixel.net/threads/dev-blog-5-storing-your-skyblock-island.2190753/) da Hypixel.

#### Formato de Arquivo Schematic

Diferentemente dos outros formatos de arquivo listados, o Formato de Arquivo Schematic não é usado para armazenar mundos do Minecraft, mas sim dentro de programas de terceiros, como MCEdit, WorldEdit e Schematica.

Os arquivos armazenados nesse formato são arquivos `.schematic`, e são armazenados no formato NBT.

Mais detalhes podem ser encontrados na [Minecraft Wiki](https://minecraft.wiki/w/Schematic_file_format).

### Geração de Mundo

Quando o servidor está iniciando, ele verifica se há um salvamento presente, também conhecido como "mundo".

Pumpkin então chama a geração do mundo:

#### Salvamento Presente

`AnvilChunkReader` é chamado para processar os arquivos de região para o salvamento dado.

-   Como mencionado acima, os arquivos de região armazenam chunks de 32x32.
    > Cada arquivo de região é nomeado de acordo com as coordenadas de onde ele está no mundo.

> r.{}.{}.mca

-   A tabela de localização é lida a partir do arquivo de salvamento, representando as coordenadas do chunk.
-   A tabela de timestamp é lida a partir do arquivo de salvamento, representando a última vez que o chunk foi modificado.

#### Sem Salvamento Presente

A semente do mundo é definida como "0". No futuro, ela será definida para o valor na configuração "básica".

`PlainsGenerator` é chamado, já que até agora `Plains` é o único bioma implementado.

-   `PerlinTerrainGenerator` é chamado para definir a altura do chunk.
-   A altura da pedra é definida 5 blocos abaixo da altura do chunk.
-   A altura da terra é definida 2 blocos abaixo da altura do chunk.
-   Blocos de grama aparecem no topo da terra.
-   Bedrock é definido em y = -64.
-   Flores e grama curta são espalhadas aleatoriamente.

`SuperflatGenerator` também está disponível, mas não é atualmente chamável.

-   Bedrocks é definido em y = -64.
-   A terra é definida dois blocos para cima.
-   Os blocos de grama são definidos um bloco a mais para cima.

Os blocos podem ser colocados e quebrados, mas as mudanças não podem ser salvas em nenhum formato de mundo. Mundos do formato Anvil são atualmente apenas leitura.
