# Sunucu Barındırıcıları İçin Kılavuz

Bu kılavuz, Minecraft barındırma sağlayıcılarının ve oyun paneli bakımcılarının (Pterodactyl, Pelican, PufferPanel, Crafty ve özel konteyner platformları) Pumpkin sunucularını entegre edip çalıştırmak için bilmesi gereken her şeyi kapsar.

---

## 1. Kurulum ve Dosya Düzeni Farkları (Java Sunucuları ve Pumpkin)

Vanilla, Spigot veya Paper şablonlarını taşıyan barındırma panelleri aşağıdaki kurulum farklarını göz önünde bulundurmalıdır:

| Özellik | Vanilla / Paper / Spigot | Pumpkin |
| :--- | :--- | :--- |
| **EULA Kontrolü (`eula.txt`)** | Başlamadan önce `eula.txt` içinde `eula=true` gerekir | **Gerekmez** (GPL lisanslı uygulama; ilk çalıştırmada hemen açılır) |
| **Yapılandırma Dosyası** | `server.properties`, `spigot.yml`, `config/paper-global.yml` | Çalışma dizininde tek bir `pumpkin.toml` (ilk açılışta otomatik oluşturulur) |
| **Sunucu Simgesi** | `server-icon.png` | `icon.png` (veya `pumpkin.toml` içindeki `favicon_path` ile özel yol) |
| **Günlük Dosyası Yolu** | `logs/latest.log` | Kök dizinde `latest.log` (`[logging] file` ile yapılandırılabilir) |
| **Varsayılan Chunk Biçimi** | Vanilla Anvil (`.mca`) | Yerel `.pump` biçimi (`[world.chunk] type = "pump"`, ya da `"anvil"` / `"linear"`) |
| **Eklenti Biçimi ve Dizini** | `plugins/` içinde `.jar` dosyaları | `plugins/` içinde `.wasm` WebAssembly bileşenleri (isteğe bağlı PatchBukkit ile `.jar`) |
| **Eklenti Pazarı** | Hangar / Modrinth / SpigotMC | [Pumpkin Marketplace](https://market.pumpkinmc.org) (yerleşik Ed25519 imza doğrulaması) |
| **Uzaktan Yönetim** | Eski TCP RCON / MSMP | Yalnızca WebSocket [MSMP](/config/management) (`[networking.management]`; eski TCP RCON desteklenmez) |

### Dünya Biçimi ve Sunucu Yazılımı Değiştirme
Pumpkin varsayılan olarak chunk'ları yerel `.pump` biçiminde kaydeder (`[world.chunk] type = "pump"`). Paneliniz bir **Dünya İçe/Dışa Aktarıcı** sunuyorsa ya da kullanıcıların aynı dünya klasöründe Paper/Vanilla ile Pumpkin arasında geçiş yapmasına izin veriyorsa, standart `.mca` bölge dosyalarının kullanılması için `pumpkin.toml` içinde chunk biçimini `"anvil"` yapın:

```toml
[world.chunk]
type = "anvil"
```

### Bedrock Kimlik Anahtarlarını Kalıcı Hale Getirme
Bedrock / NetherNet etkinleştirildiğinde Pumpkin, istemcilerin İlk Kullanımda Güven (TOFU) kimlik doğrulaması için `nethernet-key.der` dosyasını (`[networking.bedrock.nethernet] identity_key` ile yapılandırılır) oluşturur. Geri dönen Bedrock istemcilerinin reddedilmemesi için bu dosyanın konteyner yeniden oluşturmalarında sunucunun veri biriminde kalıcı olduğundan emin olun.

---

## 2. Çalışma Zamanı ve İkili Dosya Dağıtımı

### JVM Gerekmez
Pumpkin, Rust ile derlenmiş bağımsız bir yerel yürütülebilir dosyadır (Linux/macOS'ta `pumpkin`, Windows'ta `pumpkin.exe`):
- **Minimal Temel İmajlar**: Kullanıcı isteğe bağlı [PatchBukkit](./migrating-from-bukkit#bukkit-eklenti-uyumlulugu-patchbukkit) uyumluluk katmanını açıkça kurmadığı sürece konteynerinizde Java Çalışma Zamanı (JRE/JDK) gerekmez. Minimal Linux imajları (`debian:bookworm-slim` veya `ghcr.io/pumpkin-mc/pumpkin:master` gibi) doğrudan çalışır.
- **Önceden Derlenmiş İkili Dosyalar**: `x86_64` ve `aarch64` için resmi ikili dosyalar (Linux, Windows, macOS) [GitHub Releases](https://github.com/Pumpkin-MC/Pumpkin/releases) ve [İndirme Sayfası](https://pumpkinmc.org/download) üzerinde yayımlanır.
- **Doğrudan Başlatma**: Sunucunun çalışma dizininde doğrudan `./pumpkin` komutunu çalıştırın. JVM bayrakları (`-Xms`, `-Xmx`, `-XX:+UseG1GC`, `-jar` veya `--nogui`) **geçirmeyin**; ikili dosya bilinmeyen bayrakları reddeder.

---

## 3. Süreç Yaşam Döngüsü ve Konsol Entegrasyonu

| Yaşam Döngüsü Kancası | Beklenen Davranış / Değer |
| :--- | :--- |
| **Çalışma Dizini** | `pumpkin.toml`, `world/`, `plugins/` ve `latest.log` dosyalarını `cwd` içinde okur ve yazar. |
| **İlk Açılış Yapılandırması** | Yoksa varsayılan bir `pumpkin.toml` otomatik oluşturur. |
| **Başlangıç Hazırlık Günlüğü** | `Server is now running` |
| **Düzgün Kapatma** | `stdin`'e `stop\n` yazın ya da `SIGINT` / `SIGTERM` gönderin. |
| **Tanılama Komutları** | `tps` ve `tick query` (TPS, MSPT ve P50/P95/P99 tick yüzdeliklerini raporlar). |

### Etkileşimsiz Konsol (`stdin` / `stdout` Boruları)
Sunucu sürecine tam bir sözde terminal (PTY) yerine standart borularla bağlanan paneller için, konsol komutlarını açık bırakırken `pumpkin.toml` içinde etkileşimli `rustyline` TTY satır düzenlemesini kapatın:

```toml
[commands]
use_console = true
use_tty = false

[logging]
enabled = true
color = true # Panelinizin günlük görüntüleyicisi ANSI kaçış kodlarını desteklemiyorsa false yapın
```

### Ortam Değişkenleri
- **`RUST_LOG`**: `pumpkin.toml` dosyasını değiştirmeden `[logging] level` ayarını geçersiz kılar (ör. `RUST_LOG=debug` veya `RUST_LOG=info`).
- **`RAYON_NUM_THREADS`**: Pumpkin'in Rayon paralel hesaplama havuzunun açtığı işçi iş parçacığı sayısını geçersiz kılar (`/proc/cpuinfo` dosyasının tüm ana makine çekirdeklerini gösterdiği paylaşımlı konteyner ortamlarında yararlıdır).

### Gözetimsiz Eklenti İzin İstemleri
Varsayılan olarak `[plugins]` altındaki `ask_permission_confirmation = true`, bir WebAssembly eklentisi onaylanmamış yetenekler istediğinde sunucu konsolunda sorar. Başsız barındırma ortamlarında kullanıcıların başlangıç sırasında web konsolundan girdi gönderebildiğinden emin olun ya da `pumpkin.toml` içinde `ask_permission_confirmation` ve `allowed_permissions` ayarlarının yapılandırılmasına izin verin (bkz. [Eklenti Yapılandırması](../config/plugins)).

---

## 4. Port Tahsisi, Vekiller ve Dışa Giden Ağ

Pumpkin tüm dinleyicileri ve vekil kiplerini `server.properties` yerine `pumpkin.toml` içinde yapılandırır.

> [!IMPORTANT]
> **Tek Portlu Paylaşımlı Düğümler:** Pumpkin varsayılan olarak **hem** Java Sürümünü (`25565`) **hem de** NetherNet üzerinden Bedrock Sürümünü (`19132`) etkinleştirir. Bir konteynere yalnızca tek bir port atanan paylaşımlı düğümlerde, paneliniz `[networking.bedrock.nethernet]` için ikinci bir port ayırmaz ya da `[networking.bedrock] enabled = false` yapmazsa birden fazla örnek `19132` portunda çakışır.

```toml
[networking.java]
enabled = true
address = "0.0.0.0:25565"
max_players = 1000

[networking.bedrock]
enabled = true # Bedrock portu ayrılmadıysa false yapın

[networking.bedrock.nethernet]
enabled = true
address = "0.0.0.0:19132"
external_ip = "" # İsteğe bağlı: NAT arkasında çalışırken düğümün genel IP'sini yazın

[networking.query]
enabled = false
address = "0.0.0.0:25565"

[networking.management]
enabled = false
address = "127.0.0.1:25585"
secret = ""
```

### Durum İzleme ve Uzaktan Yönetim (Eski RCON Yok)
- **Eski TCP RCON Yok**: Pumpkin eski TCP RCON'u desteklemez. Paneller komutları `stdin` üzerinden göndermeli ya da `[networking.management]` altındaki WebSocket tabanlı [Minecraft Sunucu Yönetim Protokolü (MSMP)](/config/management) kullanılmalıdır.
- **Sunucu Listesi Ping ve Query**: Standart TCP durum pingleri Java adresinde çalışır; UDP [GameSpy4 Query](../config/query) `[networking.query]` altında etkinleştirilebilir.

### Vekil Ağları (Velocity, BungeeCord, Vine)
Paneliniz vekil kurulumlarını otomatikleştiriyorsa (Velocity modern yönlendirme, BungeeCord/BungeeGuard veya Vine gibi), tüm vekil ayarları ayrı `spigot.yml` veya `paper-global.yml` dosyaları yerine `pumpkin.toml` içindeki `[networking.proxy]` altında bulunur (bkz. [Vekil Yapılandırması](../config/proxy)).

### Dışa Giden HTTPS Uç Noktaları
Konteyner güvenlik duvarı kurallarının şu adreslere dışa giden HTTPS'e (`443`) izin verdiğinden emin olun:
- **Mojang / Xbox Live Kimlik Doğrulaması**: Çevrimiçi kip oturum ve doku doğrulaması için.
- **Pumpkin Marketplace (`https://market.pumpkinmc.org`)**: İmzalı pazar WASM eklentileri doğrulanırken (`[plugins] verify_signatures = true`) başlangıçta ve isteğe bağlı anonim kalp atışları için (`[telemetry] enabled = true`, bkz. [Telemetri Yapılandırması](/config/telemetry)) kullanılır.

---

## 5. Kaynak Sınırları ve Boyutlandırma

- **Bellek Sınırlama**: Yerel Rust ikili dosyaları sabit bir JVM yığını (`-Xms` / `-Xmx`) olmadan işletim sistemi belleğini dinamik olarak ayırıp serbest bıraktığı için bellek sınırlarını konteyner veya işletim sistemi düzeyinde uygulayın (Docker `--memory`, `cgroup` sınırları veya systemd `MemoryMax`). Eklenti başına WASM belleği de `[plugins]` altındaki `max_memory_mb` ile sınırlanabilir.
- **CPU ve İş Parçacıkları**: Pumpkin asenkron ağ G/Ç için Tokio, paralel chunk üretimi, aydınlatma ve varlık tick'leri için Rayon kullanır. Paylaşımlı ana makinelerde çok çekirdek kullanımını denetlemek için standart konteyner CPU kısıtlarını (`--cpus`, `cpuset-cpus` veya `RAYON_NUM_THREADS`) kullanın.
- **Temel Ayak İzi**: Pumpkin yaklaşık 10 ms'de açılır, boşta yaklaşık 60 MiB RAM kullanır ve 1,5–2 GiB RAM içinde yüzlerce eşzamanlı oyuncuya hizmet verir (katman başına CPU ve bellek profilleri için [Kıyaslamalar](/about/benchmarks) sayfasına bakın).

---

## 6. Pterodactyl / Pelican Egg Referansı

Pumpkin için bir Pterodactyl veya Pelican egg'i oluştururken şu yapılandırma ayrıştırıcısı ve süreç ayarlarını kullanın:

:::code-group

```json [Süreç Yapılandırması]
{
  "startup": {
    "done": "Server is now running"
  },
  "stop": "stop",
  "configs": {
    "pumpkin.toml": {
      "parser": "file",
      "find": {
        "[networking.java]": "[networking.java]\nenabled = true\naddress = \"0.0.0.0:{{server.build.default.port}}\"",
        "use_tty = true": "use_tty = false"
      }
    }
  }
}
```

:::
