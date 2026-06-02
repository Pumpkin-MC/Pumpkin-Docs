# Yapılandırma

Pumpkin, harici eklentilere dayanmadan sunucu davranışının çeşitli yönlerini özelleştirmenize olanak tanıyan güçlü bir yapılandırma sistemi sunar. Bu, sunucu işleyişi üzerinde esneklik ve kontrol sağlar.

## Yapılandırma Dosyası

Pumpkin tek bir yapılandırma dosyası kullanır:

- `pumpkin.toml`: temel ağ yapılandırmasından gelişmiş özelliklere kadar tüm sunucu ayarlarını içeren ana yapılandırma dosyası

Pumpkin ilk kez başlatıldığında, çalışma dizininde varsayılan değerlerle `pumpkin.toml` dosyası oluşturulur. Dosyayı ilk çalıştırmadan önce veya sonra düzenleyebilirsiniz. Eksik alanlar başlangıçta otomatik olarak varsayılan değerlerle doldurulur.

## Yapı

Yapılandırma bölümlere ayrılmıştır:

- **Üst düzey alanlar**: sürüm desteği, adresler, seed, oyuncu limitleri, zorluk ve oyun kuralları gibi temel ayarlar
- **`[logging]`**: günlük çıktısı ve biçimlendirme
- **`[resource_pack]`**: Java ve Bedrock için kaynak paketleri
- **`[world]`**: dünya üretimi, yığın depolama, aydınlatma ve otomatik kaydetme
- **`[networking]`**: kimlik doğrulama, sıkıştırma, proxy, sorgu, RCON ve LAN yayını
- **`[commands]`**: komut sistemi
- **`[chat]`**: sohbet mesajı biçimlendirme
- **`[pvp]`**: SSM kuralları ve mekanikleri
- **`[server_links]`**: istemcilere gösterilen bağlantılar
- **`[player_data]`**: oyuncu verisi kalıcılığı
- **`[fun]`**: deneysel özellikler
- **`[recipe]`**: tarif defteri yapılandırması
- **`[plugins]`**: eklenti izin ayarları

## Sunucu Sürümü

Pumpkin en son Minecraft sürümünü desteklemeyi amaçlamaktadır. Farklı bir sürüm için Pumpkin sunucusu barındırmak istiyorsanız [ViaProxy](https://github.com/ViaVersion/ViaProxy) adlı bir proje bulunmaktadır.

- Proxy bağlantılarının izin verildiğinden emin olun.
- Pumpkin ile ViaProxy arasında bir bağlantı yoktur; onların koduyla ilgili sorun bildirmeyin. Ayrıca bu üçüncü taraf bir proxy'dir ve Pumpkin bunun iyi veya kötü yönleri konusunda herhangi bir sorumluluk kabul etmez.

### Temel Özellikler

- Kapsamlı Özelleştirme: Sunucu ayarlarını, oyuncu davranışını, dünya üretimini ve daha fazlasını yapılandırın.
- Performans Optimizasyonu: Yapılandırma ayarları aracılığıyla sunucu performansını optimize edin.
- Eklentisiz Özelleştirme: Ek eklentilere ihtiyaç duymadan istenen değişiklikleri gerçekleştirin.
