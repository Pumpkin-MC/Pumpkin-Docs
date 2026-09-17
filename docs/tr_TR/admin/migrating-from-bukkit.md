# Bukkit / Spigot / Paper'dan Pumpkin'a Geçiş

Bu kılavuz, bir sunucuyu Bukkit, Spigot veya Paper'dan Pumpkin'a taşırken dikkate alınması gereken mimari ve yapılandırma farklılıklarını kapsar.

---

## 1. Mimari Farklılıklar

| Boyut | Bukkit / Spigot / Paper | Pumpkin |
| :--- | :--- | :--- |
| **Çalışma Zamanı Ortamı** | Java Sanal Makinesi (Java 17/21+ gerektirir) | Yerel yürütülebilir dosya (derlenmiş Rust, Java gerektirmez) |
| **Başlatma Komutu** | `java [flags] -jar server.jar` | `./pumpkin` |
| **Tick Döngüsü** | Asenkron iş parçacığı aktarımıyla tek iş parçacıklı tick döngüsü | CPU çekirdekleri arasında çok iş parçacıklı tick yürütümü |
| **Eklenti Biçimi** | Bukkit API hedefli Java bayt kodu (`.jar`) | WebAssembly (`.wasm`) veya PatchBukkit ile `.jar` |
| **Eklenti Dilleri** | Java, Kotlin, Scala | Rust, Python, Kotlin, C#, Go, C |
| **Yapılandırma** | `server.properties`, `paper.yml`, `spigot.yml` | `pumpkin.toml` (TOML biçimi) |
| **Bellek Yönetimi** | JVM Çöp Toplama (Garbage Collection) | Yerel işletim sistemi bellek tahsisi |

---

## 2. Eklentiler ve Uzantılar

### WebAssembly Eklentileri
Pumpkin'ın birincil eklenti biçimi WebAssembly (`.wasm`)'dir:
- **Yalıtım**: Eklentiler yalıtılmış bir WebAssembly çalışma zamanında çalışır.
- **Dil Desteği**: Eklentiler Rust, Python, Go, C#, C veya Kotlin dillerinden WASM'a derlenebilir.
- **Özel Eklentiler**: Özel Bukkit eklentilerinizi uyarlamak için [Geliştirici Geçiş Kılavuzu](../plugin-dev/migrating-from-bukkit/index) belgesine bakın.

### Bukkit Eklenti Uyumluluğu: PatchBukkit
Mevcut Bukkit/Spigot `.jar` eklentilerine ihtiyaç duyan sunucular için **PatchBukkit** projesi bir uyumluluk katmanı sağlar:
- **Mimari**: PatchBukkit, Pumpkin içine bir JVM gömer, Bukkit API'sinin parçalarını yeniden uygular ve çağrıları JNI ve FFI aracılığıyla Pumpkin'a iletir.
- **Eklenti Konumu**: Uyumlu `.jar` eklentileri `patchbukkit/patchbukkit-plugins/` dizinine yerleştirilir.
- **Durum ve Kısıtlamalar**: PatchBukkit aktif geliştirme aşamasındadır. Standart Bukkit API çağrıları desteklenir; dahili NMS (`net.minecraft.server`) sınıflarına, CraftBukkit dahili bileşenlerine veya bayt kodu manipülasyonuna dayanan eklentiler düzgün çalışmayabilir.
- **Java Gereksinimi**: PatchBukkit çalıştırmak, gömülü JVM'yi yürütmek için ana sistemde bir Java çalışma zamanı (JRE/JDK) bulunmasını gerektirir.

---

## 3. Yapılandırma ve Özellikler

Pumpkin, `server.properties` ve YAML dosyaları yerine TOML yapılandırma dosyalarını kullanır:

| Paper / Spigot (`server.properties`) | Pumpkin (`pumpkin.toml`) |
| :--- | :--- |
| `server-port=25565` | `server_address = "0.0.0.0:25565"` |
| `motd=...` | `motd = "A Pumpkin Server"` |
| `max-players=20` | `max_players = 20` |
| `online-mode=true` | `online_mode = true` |
| `view-distance=10` | `view_distance = 10` |
| `simulation-distance=8` | `simulation_distance = 8` |

---

## 4. Dünya ve Veri Depolama

- **Biçim Uyumluluğu**: Pumpkin, standart Anvil chunk biçimini (`.mca` dosyaları) okur.
- **Dizin Düzeni**: Mevcut Paper/Spigot kurulumlarından dünyaları kopyalarken boyut dizinlerinin (`world`, `world_nether`, `world_the_end`) Pumpkin'ın beklediği düzenle eşleştiğinden emin olun.
- **En Son Dünya ve Datapack Biçimi Zorunluluğu**: En azından şimdilik Pumpkin, yalnızca desteklenen Minecraft sürümünün en son dünya ve datapack biçimini destekler. Eski dünya biçimleri veya eski datapack sürümleri çalışma zamanında otomatik olarak dönüştürülmez.
  - **Dünyaları İstemcide Güncelleme**: Eski bir dünyayı taşıyorsanız Pumpkin'a yüklemeden önce güncelleyin. Mevcut bir dünyayı doğrudan resmi Minecraft istemcisinde güncelleyebilirsiniz: İstemciyi eşleşen en son sürümde açın, **Tek Oyunculu** menüsüne gidin, dünyayı seçin, **Düzenle**'ye tıklayın ve **Dünyayı İyileştir** (Optimize World) seçeneğini seçin. Alternatif olarak dünyayı en son sürümdeki bir vanilla sunucusunda bir kez açıp kaydedebilirsiniz.
  - **Datapack'ler**: `world/datapacks` içinde bulunan tüm datapack'lerin hedef sürümün beklediği biçime güncellendiğinden emin olun.

---

## 5. Başlatma ve JVM Bayrakları

### Java Kurulumu Gerekmez
Saf Pumpkin bağımsız bir yerel ikili dosyadır. Sunucuyu çalıştırmak için işletim sisteminizde veya konteynerinizde Java çalışma zamanına (JRE/JDK) ihtiyacınız yoktur.

### Başlatma Komutları
Paper ve Spigot sunucuları genellikle bellek tahsisi ve çöp toplama ayarlarına yönelik başlatma komut dosyaları (Aikar's Flags gibi) kullanır:

:::code-group

```bash [Paper (JVM)]
# Aikar's Flags içeren tipik Paper başlatma komutu:
java -Xms10G -Xmx10G \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -XX:G1NewSizePercent=30 \
  -XX:G1MaxNewSizePercent=40 \
  -XX:G1HeapRegionSize=8M \
  -XX:G1ReservePercent=20 \
  -XX:G1HeapWastePercent=5 \
  -XX:G1MixedGCCountTarget=4 \
  -XX:InitiatingHeapOccupancyPercent=15 \
  -XX:G1MixedGCLiveThresholdPercent=90 \
  -XX:G1RSetUpdatingPauseTimePercent=5 \
  -XX:SurvivorRatio=32 \
  -XX:+PerfDisableSharedMem \
  -XX:MaxTenuringThreshold=1 \
  -Dusing.aikars.flags=https://mcflags.emc.gs \
  -Daikars.new.flags=true \
  -jar paper.jar --nogui
```

```bash [Pumpkin (Yerel)]
# Linux / macOS:
./pumpkin

# Windows:
./pumpkin.exe

# Docker:
docker run -p 25565:25565 -v ./data:/data pumpkinmc/pumpkin:latest
```

:::

### Bellek Farklılıkları
- **Çöp Toplayıcı Yoktur**: Pumpkin Rust dilinde yazılmıştır ve derleme zamanında deterministik bellek yönetimi (RAII) kullanır. Çalışma zamanı çöp toplayıcısı veya GC duraklama optimizasyonu bulunmaz.
- **Sabit Yığın Tahsisi Yoktur**: `-Xms` ve `-Xmx` gibi bayraklar yerel ikili dosyalarda bulunmaz. Bellek, chunk'lar ve varlıklar yüklendikçe işletim sisteminden dinamik olarak ayrılır ve kaldırıldıklarında iade edilir.
- **JVM Bayrakları Geçerli Değildir**: Çöp toplama stratejilerini, nesil boyutlandırmalarını veya JVM iç mekanizmalarını ayarlayan bayraklara gerek yoktur ve bunlar programa iletilemez.

---

## Yönetici Kontrol Listesi

1. [ ] Mevcut sunucu verilerinizi ve dünya dosyalarınızı yedekleyin, dünyanın ve datapack'lerin en son biçime güncellendiğinden emin olun (örn. istemcide "Optimize World" kullanarak).
2. [ ] `server.properties` ayarlarını `pumpkin.toml` dosyasına aktarın.
3. [ ] Gerekli eklentileri belirleyin ve WebAssembly (`.wasm`) karşılıklarını arayın veya [PatchBukkit](#bukkit-eklenti-uyumlulugu-patchbukkit) ile test edin.
4. [ ] Bir ağ kullanıyorsanız `pumpkin.toml` dosyasında proxy ayarlarını (`Velocity` / `BungeeCord`) yapılandırın.
5. [ ] Başlatma betiklerinizi JVM argümanları olmadan doğrudan `./pumpkin` çalıştıracak şekilde güncelleyin.
6. [ ] Sunucuyu başlatın, bağlantıları ve günlükleri kontrol edin.
