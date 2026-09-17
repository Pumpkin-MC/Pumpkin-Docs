# Sunucu Bağlantıları

Minecraft istemcileri (1.21 sürümünden itibaren) duraklatma menüsünde ve oyun menülerinde tıklanabilir sunucu bağlantıları görüntüleyebilir. Standart ve özel sunucu bağlantılarını `pumpkin.toml` dosyasındaki `[server_links]` altında yapılandırabilirsiniz.

## Yapılandırma

:::code-group

```toml [pumpkin.toml]
[server_links]
enabled = true
bug_report = "https://github.com/Pumpkin-MC/Pumpkin/issues"
support = ""
status = ""
feedback = ""
community = ""
website = ""
forums = ""
news = ""
announcements = ""

[server_links.custom]
# "Store" = "https://store.example.com"
# "Discord" = "https://discord.gg/example"
```

:::

### Yapılandırma Seçenekleri

- **`enabled`**: Bağlanan istemcilere sunucu bağlantılarını iletmeyi etkinleştiren ana anahtar (varsayılan: `true`).
- **`bug_report`**: Sunucu veya proje hata takipçisine giden bağlantı (varsayılan: `"https://github.com/Pumpkin-MC/Pumpkin/issues"`).
- **`support`**: Teknik destek veya yardım masasına giden bağlantı.
- **`status`**: Sunucu çalışma durumu/kesinti sayfasına giden bağlantı.
- **`feedback`**: Oyuncu geri bildirim veya öneri sayfasına giden bağlantı.
- **`community`**: Topluluk forumları veya grubuna giden bağlantı.
- **`website`**: Resmi web sitesine giden bağlantı.
- **`forums`**: Tartışma forumlarına giden bağlantı.
- **`news`**: Sunucu blogu veya haber sayfasına giden bağlantı.
- **`announcements`**: Duyurular sayfasına giden bağlantı.

### Özel Bağlantılar

`[server_links.custom]` altında istemci menülerinde gösterilecek isteğe bağlı anahtar-değer bağlantılarını tanımlayın:

```toml
[server_links.custom]
"Store" = "https://store.example.com"
"Discord" = "https://discord.gg/example"
```
