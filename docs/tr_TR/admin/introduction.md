# Yönetim Genel Bakış

Pumpkin sunucu yöneticileri için **Yönetici Bölümüne** hoş geldiniz. Pumpkin; minimum kaynak tüketimiyle yüksek oyuncu sayılarını desteklemek üzere tasarlanmış, Rust ile yazılmış, yüksek performanslı ve çok iş parçacıklı (multithreaded) bir Minecraft sunucusudur.

---

## Sunucu Yöneticileri İçin Temel Özellikler

- **Gelişmiş Çoklu İş Parçacığı (Extreme Multithreading)**: Modern çok çekirdekli işlemciler için sıfırdan tasarlandı.
- **WASM Eklenti Mimarisi**: JVM ek yükü (overhead) olmaksızın Rust, Python, Kotlin, C#, Go veya C ile güvenli ve yalıtılmış (sandboxed) eklenti çalıştırma.
- **Yerel Proxy Desteği**: Velocity, BungeeCord ve modern proxy yönlendirmeleri için kutudan çıktığı haliyle yerel destek.
- **TOML Tabanlı Yapılandırma**: `pumpkin.toml` ve özelliğe özel TOML yapılandırmalarında yer alan temiz ve okunabilir yapılandırma dosyaları.

---

## Yönetici Kılavuzları ve Konuları

Aşağıdaki yönetim kılavuzlarını inceleyin:

- [Bukkit / Paper / Spigot Sunucusundan Geçiş](./migrating-from-bukkit) — Sunucu yönetimi, eklentiler, dünya depolaması ve performanstaki temel farklar.
- [Sunucu Yapılandırması](../config/introduction) — `pumpkin.toml` ayarlarının ayrıntılı açıklaması.
- [Proxy Kurulumu](../config/proxy) — BungeeCord ve Velocity oyuncu yönlendirmesini yapılandırma.
- [Komutlar ve İzinler](../config/commands) — Oyun içi yönetici (operatör) komutlarını ve izinlerini yönetme.
- [Kimlik Doğrulama](../config/authentication) — Çevrimiçi mod (online-mode), çevrimdışı mod (offline-mode) ve Yggdrasil ayarları.
- [Sorun Giderme ve Yaygın Sorunlar](../troubleshooting/common_issues) — Port bağlama, bellek ve eklenti yükleme sorunlarını çözme.
