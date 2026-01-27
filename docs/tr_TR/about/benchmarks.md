# Kıyaslamalar

Burada, yaygın Minecraft sunucu yazılımları Pumpkin ile karşılaştırılıyor.

> [!CAUTION]
> **Bu karşılaştırma adil değil.** Pumpkin şu anda diğer sunuculara göre çok daha az özelliğe sahip, bu da daha az kaynak kullandığı izlenimi verebilir.
> Ayrıca diğer sunucuların yıllardır optimizasyon yaptığını da göz önünde bulundurmak gerekir.
> Tüm Vanilla mantığını yeniden yazmak zorunda olmayan Vanilla fork'ları, yalnızca optimizasyonlara odaklanabilir.

![9 Minecraft oyun penceresini gösteren bir ekran görüntüsü](https://github.com/user-attachments/assets/e08fbb00-42fe-4479-a03b-11bb6886c91a)

## Özellikler

### Teknik

#### Yazılım

- Dağıtım: Manjaro Linux
- Mimari: x86_64 (64-bit)
- Çekirdek Sürümü: 6.11.3-arch1-1

#### Donanım

- Anakart: MAG B650 TOMAHAWK WIFI
- CPU: AMD Ryzen 7600X 6-Core
- RAM: Corsair 2x16GB DDR5 6000Mhz
- Depolama: Samsung 990 PRO 1TB PCIe 4.0 M.2 SSD
- Soğutma: be quiet Dark Rock Elite

#### Rust

- Araç zinciri: stable-x86_64-unknown-linux-gnu (1.81.0)
- Rust Derleyicisi: rustc 1.81.0 (eeb90cda1 2024-09-04)

#### Java

- JDK Sürümü: OpenJDK 23 64-Bit 2024-09-17
- JRE Sürümü: OpenJDK Runtime Environment (build 23+37)
- Sağlayıcı: Oracle

#### Oyun

- Minecraft sürümü: 1.21.1
- Görüş mesafesi: 10
- Simülasyon mesafesi: 10
- Çevrimiçi mod: false
- RCON: false

<sub><sup>Premium olmayan hesaplarla daha kolay test için çevrimiçi mod devre dışı bırakıldı.</sup></sub>

> [!NOTE]
> Tüm testler daha doğru sonuçlar için birden fazla kez çalıştırıldı.
> Oyuncular doğduklarında hareket etmedi. Yalnızca ilk 8 chunk yüklendi.
> Tüm sunucular kendi arazi üretimini kullandı. Önceden dünya yüklenmedi.

> [!IMPORTANT]
> `CPU Max`, başlangıçtaki chunk'lar yüklendiği için genellikle tek oyuncuda daha yüksektir.

## Pumpkin

Derleme: [8febc50](https://github.com/Snowiiii/Pumpkin/commit/8febc5035d5611558c13505b7724e6ca284e0ada)

Derleme argümanları: `--release`

Çalıştırma argümanları:

**Dosya Boyutu:** <FmtNum :n=12.3 />MB

**Başlatma süresi:** <FmtNum :n=8 />ms

**Kapanma süresi:** <FmtNum :n=0 />ms

| Oyuncular | RAM                   | CPU Boşta        | CPU Maksimum           |
| ------- | --------------------- | ---------------- | ------------------ |
| 0       | <FmtNum :n=392.2 />KB | <FmtNum :n=0 />% | <FmtNum :n=0 />%   |
| 1       | <FmtNum :n=24.9 />MB  | <FmtNum :n=0 />% | <FmtNum :n=4 />%   |
| 2       | <FmtNum :n=25.1 />MB  | <FmtNum :n=0 />% | <FmtNum :n=0.6 />% |
| 5       | <FmtNum :n=26 />MB    | <FmtNum :n=0 />% | <FmtNum :n=1 />%   |
| 10      | <FmtNum :n=27.1 />MB  | <FmtNum :n=0 />% | <FmtNum :n=1.5 />% |

<sub><sup>Pumpkin, zaten yüklenmiş chunk'ları önbelleğe alır; bu da oyuncu verileri dışında ek RAM kullanımı olmaması ve minimum CPU kullanımı anlamına gelir.</sup></sub>

### Derleme süresi

Sıfırdan derleme:

**Debug:** <FmtNum :n=10.35 />sec
**Release:** <FmtNum :n=38.40 />sec

Yeniden derleme (pumpkin crate):

**Debug:** <FmtNum :n=1.82 />sec
**Release:** <FmtNum :n=28.68 />sec

## Vanilla

Sürüm: [1.21.1](https://piston-data.mojang.com/v1/objects/59353fb40c36d304f2035d51e7d6e6baa98dc05c/server.jar)

Derleme argümanları:

Çalıştırma argümanları: `nogui`

**Dosya Boyutu:** <FmtNum :n=51.6 />MB

**Başlatma süresi:** <FmtNum :n=7 />sec

**Kapanma süresi:** <FmtNum :n=4 />sec

| Oyuncular | RAM                   | CPU Boşta                               | CPU Maksimum           |
| ------- | --------------------- | ---------------------------------------- | ------------------ |
| 0       | <FmtNum n="860" />MB  | <FmtNum n="0.1" /> - <FmtNum n="0.3" />% | <FmtNum n="51" />% |
| 1       | <FmtNum n="1.5" />GB  | <FmtNum n="0.9" /> - <FmtNum n="1" />%   | <FmtNum n="41" />% |
| 2       | <FmtNum n="1.6" />GB  | <FmtNum n="1" /> - <FmtNum n="1.1" />%   | <FmtNum n="10" />% |
| 5       | <FmtNum n="1.8" />GB  | <FmtNum n="2" />%                        | <FmtNum n="20" />% |
| 10      | <FmtNum n="2.2" />GB  | <FmtNum n="4" />%                        | <FmtNum n="24" />% |

## Paper

Derleme: [122](https://api.papermc.io/v2/projects/paper/versions/1.21.1/builds/122/downloads/paper-1.21.1-122.jar)

Derleme argümanları:

Çalıştırma argümanları: `nogui`

**Dosya Boyutu:** <FmtNum :n=49.4 />MB

**Başlatma süresi:** <FmtNum :n=7 />sec

**Kapanma süresi:** <FmtNum :n=3 />sec

| Oyuncular | RAM                 | CPU Boşta                               | CPU Maksimum           |
| ------- | ------------------- | -------------------------------------- | ----------------- |
| 0       | <FmtNum :n=1.1 />GB | <FmtNum :n=0.2 /> - <FmtNum :n=0.3 />% | <FmtNum :n=36 />% |
| 1       | <FmtNum :n=1.7 />GB | <FmtNum :n=0.9 /> - <FmtNum :n=1.0 />% | <FmtNum :n=47 />% |
| 2       | <FmtNum :n=1.8 />GB | <FmtNum :n=1 /> - <FmtNum :n=1.1 />%   | <FmtNum :n=10 />% |
| 5       | <FmtNum :n=1.9 />GB | <FmtNum :n=1.5 />%                     | <FmtNum :n=15 />% |
| 10      | <FmtNum :n=2 />GB   | <FmtNum :n=3 />%                       | <FmtNum :n=20 />% |

## Purpur

Derleme: [2324](https://api.purpurmc.org/v2/purpur/1.21.1/2324/download)

Derleme argümanları:

Çalıştırma argümanları: `nogui`

**Dosya Boyutu:** <FmtNum :n=53.1 />MB

**Başlatma süresi:** <FmtNum :n=8 />sec

**Kapanma süresi:** <FmtNum :n=4 />sec

| Oyuncular | RAM                 | CPU Boşta                               | CPU Maksimum           |
| ------- | ------------------- | -------------------------------------- | ----------------- |
| 0       | <FmtNum :n=1.4 />GB | <FmtNum :n=0.2 /> - <FmtNum :n=0.3 />% | <FmtNum :n=25 />% |
| 1       | <FmtNum :n=1.6 />GB | <FmtNum :n=0.7 /> - <FmtNum :n=1.0 />% | <FmtNum :n=35 />% |
| 2       | <FmtNum :n=1.7 />GB | <FmtNum :n=1.1 /> - <FmtNum :n=1.3 />% | <FmtNum :n=9 />%  |
| 5       | <FmtNum :n=1.9 />GB | <FmtNum :n=1.6 />%                     | <FmtNum :n=20 />% |
| 10      | <FmtNum :n=2.2 />GB | <FmtNum :n=2 /> - <FmtNum :n=2.5 />%   | <FmtNum :n=26 />% |

## Minestom

Commit: [0ca1dda2fe](https://github.com/Minestom/Minestom/commit/0ca1dda2fe11390a1b89a228bbe7bf78fefc73e1)

Derleme argümanları:

Çalıştırma argümanları:

**Dil:** Kıyaslamalar Kotlin 2.0.0 ile çalıştırıldı (Minestom'un kendisi Java ile yazılmıştır)

**Dosya Boyutu:** <FmtNum :n=2.8 />MB (Kütüphane)

**Başlatma süresi:** <FmtNum :n=310 />ms

**Kapanma süresi:** <FmtNum :n=0 />ms

<sub>[Örnek kod şuradan kullanıldı](https://minestom.net/docs/setup/your-first-server)</sub>

| Oyuncular | RAM                 | CPU Boşta                               | CPU Maksimum          |
| ------- | ------------------- | -------------------------------------- | ---------------- |
| 0       | <FmtNum :n=228 />MB | <FmtNum :n=0.1 /> - <FmtNum :n=0.3 />% | <FmtNum :n=1 />% |
| 1       | <FmtNum :n=365 />MB | <FmtNum :n=0.9 /> - <FmtNum :n=1.0 />% | <FmtNum :n=5 />% |
| 2       | <FmtNum :n=371 />MB | <FmtNum :n=1 /> - <FmtNum :n=1.1 />%   | <FmtNum :n=4 />% |
| 5       | <FmtNum :n=390 />MB | <FmtNum :n=1.0 />%                     | <FmtNum :n=6 />% |
| 10      | <FmtNum :n=421 />MB | <FmtNum :n=3 />%                       | <FmtNum :n=9 />% |

Kıyaslama tarihi: <FmtDateTime :d="new Date('2024-10-15T16:34Z')" />
