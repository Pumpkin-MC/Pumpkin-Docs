# Kimlik Doğrulama

## Neden kimlik doğrulama

Çevrimdışı hesaplar, yani bir yetkilendirme veya kimlik doğrulama sunucusuyla iletişime geçmeden oyuncu adına göre üretilen hesaplar, herhangi bir takma ada sahip olabilir. Bu da ek eklentiler olmadan, operatör izinlerine sahip olanlar da dahil olmak üzere oyuncuların başkalarını taklit edebilmesi anlamına gelir.

## Çevrimdışı sunucu

Varsayılan olarak yapılandırmada `online_mode` etkindir. Bu, kimlik doğrulamayı etkinleştirir ve çevrimdışı hesapları devre dışı bırakır. Çevrimdışı hesaplara izin vermek istiyorsanız `configuration.toml` dosyasında `online_mode` değerini devre dışı bırakabilirsiniz.

## Yggdrasil Kimlik Doğrulama nasıl çalışır

1. İstemci, başlatıcıdan bir kimlik doğrulama belirteci ve UUID alır.
2. İstemci, yükleme sırasında kimlik doğrulama belirtecini kullanarak yetkilendirme/kimlik doğrulama sunucusundan çeşitli imzalama anahtarları ve engellenen sunucu listesini gibi verileri alır.
3. İstemci sunucuya katılırken yetkilendirme/kimlik doğrulama sunucularına bir katılma isteği gönderir. Mojang sunucuları hesap yasaklıysa bu isteği reddedebilir.
4. İstemci kimliğini bir paketle sunucuya gönderir.
5. Sunucu, bu kimliğe dayanarak yetkilendirme/kimlik doğrulama sunucularına bir `hasJoined` isteği gönderir. Başarılı olursa skin gibi oyuncu bilgilerini elde eder.

## Özel Kimlik Doğrulama Sunucusu

Pumpkin özel kimlik doğrulama sunucularını destekler. `features.toml` dosyasındaki kimlik doğrulama URL'sini değiştirebilirsiniz.

### Pumpkin Kimlik Doğrulaması Nasıl Çalışır

1. **GET İsteği:** Pumpkin, belirtilen kimlik doğrulama URL'sine bir GET isteği gönderir.
2. **Durum Kodu 200:** Kimlik doğrulama başarılıysa sunucu 200 durum kodu ile yanıt verir.
3. **JSON Oyun Profilini Ayrıştırma:** Pumpkin, yanıtta dönen JSON oyun profilini ayrıştırır.

### Oyun Profili

```rust
struct GameProfile {
    id: UUID,
    name: String,
    properties: Vec<Property>,
    profile_actions: Option<Vec<ProfileAction>>, // Optional, only present when actions are applied
}
```

#### Property

```rust
struct Property {
    name: String,
    value: String, // Base64 encoded
    signature: Option<String>, // Optional, Base64 encoded
}
```

#### Profile Action

```rust
enum ProfileAction {
    FORCED_NAME_CHANGE,
    USING_BANNED_SKIN,
}
```
