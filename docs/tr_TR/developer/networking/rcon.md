# RCON (Uzak Konsol)

## RCON nedir

RCON (Remote Console), Valve tarafından yöneticilerin oyun sunucularını uzaktan kontrol edip yönetebilmesi için tasarlanmış bir protokoldür. Telefon veya ayrı bir bilgisayar gibi farklı bir konumdan sunucuda komut çalıştırmanın bir yolunu sağlar.

## Neden RCON

- **Kolaylık:** İnternet bağlantısı olan her yerden sunucunuzu yönetin.
- **Esneklik:** Sunucunun bulunduğu yerde fiziksel olarak bulunmadan komut çalıştırın.
- **Verimlilik:** Görevleri otomatikleştirin ve sunucu yönetimini sadeleştirin.

## SSH vs RCON

### SSH

- İstemci ile sunucu arasında iletilen veriyi korumak için güçlü şifreleme sunar.
- Esas olarak güvenli uzaktan oturum açma ve uzak bir makinede komut çalıştırma için tasarlanmıştır.
- Linux/Unix sistemlerini yönetmek, ağ yapılandırmak ve betik çalıştırmak için yaygın olarak kullanılır.
- Uzak sistemle etkileşim kurup çeşitli komutları çalıştırabileceğiniz kabuk benzeri bir ortam sağlar.

### RCON

- Oyun sunucularının uzaktan yönetimi için özel olarak tasarlanmıştır; sunucu ayarlarını ve işlemlerini kontrol etmenizi sağlar.
- Genellikle SSH'den daha az güvenlidir; çoğu zaman düz metin parolalara dayanır.
- Esas olarak oyun sunucusu yöneticileri tarafından kullanılır.
- Sınırlı sayıda oyuna özel komut sunar.

### packets

RCON, birkaç packet oluşan çok basit bir protokoldür. Bir RCON packet şu şekildedir:

| Alan | Açıklama                                                |
| ---- | ------------------------------------------------------- |
| ID   | Kimlik doğrulamanın başarısız veya başarılı olup olmadığını belirtmek için kullanılır |
| Type | packet türünü tanımlar                                   |
| Body | Bir mesaj (String); örn. bir komut veya parola           |

#### Sunucuya giden packets <sub><sub>(İstemci→Sunucu)</sub></sub>

| Type | packet       |
| ---- | ----------- |
| 2    | Auth        |
| 3    | ExecCommand |

#### İstemciye giden packets <sub><sub>(Sunucu→İstemci)</sub></sub>

| Type | packet        |
| ---- | ------------ |
| 2    | AuthResponse |
| 0    | Output       |

### RCON Nasıl Çalışır

1. **Kimlik Doğrulama:**

   - RCON istemcisi istenen parola ile bir kimlik doğrulama packet gönderir.
   - Sunucu parolayı doğrular ve bir kimlik doğrulama yanıtı packet gönderir.
   - Başarılıysa, yanıt packet istemcinin gönderdiğiyle aynı ID'yi içerir. Başarısızsa ID -1 olur.

2. **Komut Çalıştırma:**

   - Kimliği doğrulanan istemci artık komut çalıştırma packets gönderebilir; her packet çalıştırılacak komutu içerir.
   - Sunucu komutu işler ve sonuç veya hata mesajlarını içeren bir çıktı packet gönderir.

