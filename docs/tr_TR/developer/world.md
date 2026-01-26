# Dünya Formatları

## Region Dosya Formatı

Minecraft Beta 1.3'ten Release 1.2'ye kadar "Region dosya formatı" olarak bilinen bir Minecraft formatı kullanıldı.

Bu formatta saklanan dosyalar `.mcr` dosyalarıdır ve her biri "region" adı verilen 32x32 chunk'lık bir grubu saklar.

Daha fazla ayrıntı [Minecraft Wiki](https://minecraft.wiki/w/Region_file_format) sayfasında bulunabilir.

## Anvil Dosya Formatı

Minecraft Release 1.2'den sonra Region Dosya Formatı'nın yerini alan bu format, modern Vanilla Minecraft: Java Edition dünyalarını depolamak için kullanılır.

Bu formatta saklanan dosyalar `.mca` dosyalarıdır. Aynı region mantığını kullanmakla birlikte bir dizi değişiklik yapılmıştır. Önemli değişiklikler arasında yükseklik sınırının 256'ya, ardından 320'ye çıkarılması ve daha fazla blok ID'si sayılabilir.

Daha fazla ayrıntı [Minecraft Wiki](https://minecraft.wiki/w/Anvil_file_format) sayfasında bulunabilir.

## Linear Dosya Formatı

Daha modern bir format olan Linear region dosya formatı vardır. Disk alanından tasarruf eder ve zlib yerine zstd kütüphanesini kullanır. Bu faydalıdır çünkü zlib son derece eski ve güncelliğini yitirmiştir.

Bu formatta saklanan dosyalar `.linear` dosyalarıdır ve Overworld ve Nether'da yaklaşık %50 disk alanı tasarrufu sağlar, End'de ise %95 tasarruf sağlar.

Daha fazla ayrıntı [LinearRegionFileFormatTools](https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools) GitHub sayfasında bulunabilir.

## Slime Dosya Formatı

Anvil dosya formatının birçok zayıf yönünü gidermek için Hypixel tarafından geliştirilen Slime, zlib'i de değiştirir ve Anvil'e kıyasla alan tasarrufu sağlar. Tüm dünyayı tek bir kayıt dosyasında saklar ve bu dosyanın birden fazla örneğe yüklenmesine izin verir.

Bu formatta saklanan dosyalar `.slime` dosyalarıdır.

Daha fazla ayrıntı [Slime World Manager](https://github.com/cijaaimee/Slime-World-Manager#:~:text=Slime%20World%20Manager%20is%20a,worlds%20faster%20and%20save%20space.) GitHub sayfasında ve Hypixel için [Dev Blog #5](https://hypixel.net/threads/dev-blog-5-storing-your-skyblock-island.2190753/) yazısında bulunabilir.

## Schematic Dosya Formatı

Listelenen diğer dosya formatlarının aksine Schematic dosya formatı Minecraft dünyalarını depolamak için kullanılmaz; bunun yerine MCEdit, WorldEdit ve Schematica gibi üçüncü taraf programlarda kullanılır.

Bu formatta saklanan dosyalar `.schematic` dosyalarıdır ve NBT formatında saklanır.

Daha fazla ayrıntı [Minecraft Wiki](https://minecraft.wiki/w/Schematic_file_format) sayfasında bulunabilir.

### Dünya Üretimi

Sunucu başlarken bir kayıt olup olmadığını (yani "dünya"yı) kontrol eder.

Ardından Pumpkin dünya üretimini başlatır:

#### Kayıt Var

`AnvilChunkReader`, verilen kayıt için region dosyalarını işlemek üzere çağrılır

- Yukarıda belirtildiği gibi, region dosyaları 32x32 chunk saklar
    > Her region dosyası dünyadaki konumuna karşılık gelen koordinatlara göre adlandırılır

> r.{}.{}.mca

- Konum tablosu kayıt dosyasından okunur; bu tablo chunk koordinatlarını temsil eder
- Zaman damgası tablosu kayıt dosyasından okunur; bu tablo chunk'ın en son ne zaman değiştirildiğini temsil eder

#### Kayıt Yok

Dünya seed "0" olarak ayarlanır. Gelecekte "basic" yapılandırmasındaki değere ayarlanacaktır.

`PlainsGenerator` çağrılır; şu ana kadar yalnızca `Plains` biyomu uygulanmıştır.

- `PerlinTerrainGenerator` chunk yüksekliğini ayarlamak için çağrılır
- Taş yüksekliği chunk yüksekliğinin 5 altına ayarlanır
- Toprak yüksekliği chunk yüksekliğinin 2 altına ayarlanır
- Çimen blokları toprağın üstünde görünür
- Bedrock y = -64 seviyesine ayarlanır
- Çiçekler ve kısa otlar rastgele dağıtılır

`SuperflatGenerator` da mevcuttur, ancak şu anda çağrılamaz.

- Bedrock y = -64 seviyesine ayarlanır
- Toprak iki blok yukarıya ayarlanır
- Çimen blokları bir blok daha yukarıya ayarlanır

Bloklar yerleştirilebilir ve kırılabilir, ancak değişiklikler herhangi bir dünya formatında kaydedilemez. Anvil dünyaları şu anda salt okunurdur.
