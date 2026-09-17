# Eklentiler

Pumpkin, yetenek tabanlı (capability-based) güvenliğe sahip bir WebAssembly (WASM) eklenti çalışma zamanı sunar. Eklenti davranışı, imza doğrulaması ve izinler `pumpkin.toml` dosyasındaki `[plugins]` altında yapılandırılır.

## Yapılandırma

:::code-group

```toml [pumpkin.toml]
[plugins]
enabled = true
hot_reload = false
ask_permission_confirmation = true
allow_unsigned = true
allowed_permissions = []
blocked_permissions = []
inherit_env = false
loopback_only = false
verify_signatures = true

# Optional per-plugin overrides
[plugins.overrides.my_plugin]
enabled = true
allow_unsigned = true
max_memory_mb = 128
allowed_permissions = ["fs:read:data"]
blocked_permissions = ["network:outbound"]
loopback_only = true

[plugins.overrides.my_plugin.environment]
API_KEY = "example_secret"
```

:::

### Genel Eklenti Ayarları

- **`enabled`**: Eklenti çalışma zamanını etkinleştiren veya devre dışı bırakan ana anahtar (varsayılan: `true`).
- **`hot_reload`**: `plugins/` dizinini izler ve çalışma zamanında değiştirilen eklentileri otomatik olarak yeniden yükler (varsayılan: `false`).
- **`ask_permission_confirmation`**: Bir eklenti onaylanmamış yetenekler/izinler istediğinde sunucu konsolunda onay istemi görüntüler (varsayılan: `true`).
- **`allow_unsigned`**: İmzasız WASM eklentilerinin yüklenmesine izin verir (varsayılan: `true`).
- **`allowed_permissions`**: Etkileşimli konsol istemlerini atlayarak tüm eklentiler için genel olarak önceden onaylanmış izinlerin listesi (varsayılan: `[]`).
- **`blocked_permissions`**: Tüm eklentiler için genel olarak engellenen izinlerin listesi (varsayılan: `[]`).
- **`inherit_env`**: Ana makine ortam değişkenlerinin varsayılan olarak eklenti WASI yalıtım alanlarına (sandbox) aktarılıp aktarılmayacağı (varsayılan: `false`).
- **`loopback_only`**: Eklentilerden giden ağ bağlantılarının yalnızca `127.0.0.1` / localhost ile sınırlandırılıp sınırlandırılmayacağı (varsayılan: `false`).
- **`max_memory_mb`**: (İsteğe bağlı) Eklenti örneği başına megabayt (MB) cinsinden genel maksimum bellek sınırı.
- **`verify_signatures`**: Pumpkin'ın yüklemeden önce WASM eklentilerindeki şifreleme imzalarını doğrulayıp doğrulamayacağı (varsayılan: `true`).

### Eklenti Başına Geçersiz Kılmalar

`[plugins.overrides.<eklenti_adı>]` altında belirli eklentiler için izinleri ve ortam değişkenlerini ayrıntılı olarak yapılandırın:

- **`enabled`**: Bu eklentiyi etkinleştirir veya devre dışı bırakır (varsayılan: `true`).
- **`allow_unsigned`**: Bu eklentinin imzasız çalışıp çalışamayacağını geçersiz kılar (`true`/`false`).
- **`max_memory_mb`**: Özellikle bu eklenti için ayrılan MB cinsinden maksimum bellek sınırı.
- **`allowed_permissions`**: Bu eklenti için önceden onaylanmış izinler.
- **`blocked_permissions`**: Bu eklenti için açıkça engellenmiş izinler.
- **`loopback_only`**: Bu eklenti için geri döngü (loopback) ağ kısıtlamasını geçersiz kılar.
- **`environment`**: Doğrudan eklentinin WASI ortamına aktarılan özel ortam değişkenleri tablosu.
