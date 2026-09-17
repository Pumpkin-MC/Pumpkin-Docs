# Geçiş Genel Bakış ve Mimarisi

**Bukkit / Spigot / Paper** eklenti geliştirmeden Pumpkin'a geçiş yapmak; Java merkezli nesne yönelimli bir modelden derlenmiş, çok dilli bir **WebAssembly (WASM)** bileşen modeline geçişi ifade eder.

---

Aşağıdaki tablo, geleneksel Bukkit/Paper paradigmasını Pumpkin'ın modern WebAssembly mimarisiyle karşılaştırmaktadır:

| Kavram | Bukkit / Spigot / Paper | Pumpkin |
| :--- | :--- | :--- |
| **Dil Desteği** | Java / Kotlin / Scala (JVM) | Rust, Python, Kotlin, C#, Go, C |
| **İkili Dosya Çıktısı** | `.jar` Java Arşivi | `.wasm` WebAssembly Bileşeni |
| **Eklenti Tanımlayıcısı** | `plugin.yml` dosyası | Programatik `PluginMetadata` yapısı (struct) |
| **Yaşam Döngüsü Kancaları** | `onEnable()` / `onDisable()` | `on_load(context)` / `on_unload(context)` |
| **Güvenlik ve Yalıtım** | Kısıtlamasız JVM Yansıması (Reflection) | Yalıtılmış (sandboxed) WASM yetenek modeli |
| **Eşzamanlılık** | Tek iş parçacıklı tick döngüsü (`BukkitScheduler`) | Async çalışma zamanı ile çok iş parçacıklı yerel yürütüm |

---

## Ayrıntılı Geçiş Konuları

Başlıca eklenti alt sistemlerini taşımaya yönelik özel kılavuzları inceleyin:

- [Komutları Taşıma](./commands) — `getCommand().setExecutor()` ve `plugin.yml` yapısından Brigadier komut ağaçlarına geçiş.
- [Olayları Taşıma](./events) — `@EventHandler` ve `Listener` arayüzlerini Pumpkin'ın bloklayan ve bloklamayan olay sistemiyle değiştirme.
- [Envanterleri ve GUI'leri Taşıma](./inventories) — `Bukkit.createInventory()` yaklaşımından Pumpkin konteyner ve pencere işleyicilerine geçiş.
- [Yapılandırma ve Verileri Taşıma](./configuration) — `getConfig()` / `config.yml` yapısını yerel TOML, JSON veya özel depolama ile değiştirme.
