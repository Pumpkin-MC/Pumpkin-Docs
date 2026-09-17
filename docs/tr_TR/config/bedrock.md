# Bedrock ve NetherNet

Pumpkin, NetherNet WebRTC/ICE aktarımı ve kullanıcı adı özelleştirmesi dahil olmak üzere Minecraft Bedrock Edition istemcileri için yerel destek içerir.

## Yapılandırma

:::code-group

```toml [pumpkin.toml]
[networking.bedrock]
enabled = true
online_mode = true
max_players = 1000
view_distance = 16
simulation_distance = 10
motd = "A blazingly fast Pumpkin server!"
username_prefix = ""
replace_username_spaces = true
chunk_caching = true

[networking.bedrock.nethernet]
enabled = true
address = "0.0.0.0:19132"
identity_key = "nethernet-key.der"
stun_servers = []
```

:::

### Bedrock Seçenekleri

- **`enabled`**: Bedrock Edition istemcilerinden gelen bağlantıların kabul edilip edilmeyeceği (varsayılan: `true`).
- **`online_mode`**: Bedrock oyuncuları için Xbox Live kimlik doğrulamasının zorunlu olup olmadığı (varsayılan: `true`).
- **`max_players`**: Eşzamanlı maksimum Bedrock oyuncusu sayısı (`0` sınırı devre dışı bırakır, varsayılan: `1000`).
- **`view_distance`**: Bedrock istemcilerine gönderilen maksimum chunk görüş mesafesi (varsayılan: `16`).
- **`simulation_distance`**: Bedrock oyuncuları için maksimum tick simülasyon mesafesi (varsayılan: `10`).
- **`motd`**: Bedrock sunucu listesinde görüntülenen Günün Mesajı (Message of the Day).
- **`username_prefix`**: Bedrock oyuncu etiketlerinin (gamertag) başına eklenen isteğe bağlı önek (ör. `"."` veya `"*"`), çapraz platform (cross-play) sunucularında Java Edition hesaplarıyla isim çakışmalarını önler (varsayılan: `""`).
- **`replace_username_spaces`**: Bedrock oyuncu etiketlerindeki boşlukların otomatik olarak alt çizgi `_` ile değiştirilip değiştirilmeyeceği; bu sayede oyuncu adlarının Minecraft komutlarında sorunsuzca kullanılabilmesini sağlar (varsayılan: `true`).
- **`chunk_caching`**: Ağ bant genişliğinden tasarruf etmek için istemci tarafı chunk blob önbelleğe almanın etkin olup olmadığı (varsayılan: `true`).

### NetherNet Aktarım Ayarları

NetherNet, Minecraft Bedrock'ın modern WebRTC/ICE ağ aktarım protokolüdür:

- **`enabled`**: İstemcilerin NetherNet kullanarak bağlanıp bağlanamayacağı (varsayılan: `true`).
- **`address`**: TCP sinyalleşmesi ve UDP ICE çoğullaması (multiplexing) için ağ soket adresi (varsayılan: `"0.0.0.0:19132"`).
- **`external_ip`**: Sunucu NAT arkasında barındırıldığında bildirilen isteğe bağlı genel (public) IP adresi.
- **`identity_key`**: İstemcinin İlk Kullanımda Güven (TOFU - Trust On First Use) mekanizması için yeniden başlatmalar arasında korunan PKCS#8 P-384 özel kimlik anahtarı dosyasının yolu (varsayılan: `"nethernet-key.der"`).
- **`stun_servers`**: ICE NAT geçişi için isteğe bağlı STUN sunucusu URL'leri listesi.
