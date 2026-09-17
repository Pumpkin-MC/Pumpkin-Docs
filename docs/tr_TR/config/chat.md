# Sohbet ve Anti-Spam

Pumpkin, `pumpkin.toml` dosyasındaki `[chat]` altında özelleştirilebilir oyun içi sohbet biçimlendirmesi ve yerleşik anti-spam koruması sağlar.

## Yapılandırma

:::code-group

```toml [pumpkin.toml]
[chat]
format = "<{DISPLAYNAME}> {MESSAGE}"

[chat.anti_spam]
enabled = true
spam_threshold = 200
message_cost = 20
decay_per_tick = 1
ops_bypass = true
```

:::

### Sohbet Ayarları

- **`format`**: Sohbet mesajı biçim dizesi (varsayılan: `"<{DISPLAYNAME}> {MESSAGE}"`).
  - `{DISPLAYNAME}`: Oyuncunun görünen adı.
  - `{MESSAGE}`: Sohbet mesajı metni.
  > [!NOTE]
  > Güvenli sohbet raporlama (`allow_chat_reports = true`) etkinleştirildiğinde özel sohbet biçimlendirmesi uygulanmaz.

### Anti-Spam Koruması

Pumpkin, sunucuyu spam yapan oyunculardan ve bot akınlarından korumak için sızdıran kova (leaky-bucket) tabanlı bir spam sayacı uygular:

- **`enabled`**: Anti-spam korumasının etkin olup olmadığı (varsayılan: `true`).
- **`spam_threshold`**: Bir oyuncunun sunucudan atılmasına (kick) neden olacak tick cinsinden spam sayacı eşiği (varsayılan: `200` tick).
- **`message_cost`**: Gönderilen her sohbet mesajı veya komut için oyuncunun spam sayacına eklenen miktar (varsayılan: `20` tick).
- **`decay_per_tick`**: Her sunucu tick'inde oyuncunun spam sayacından düşülen miktar (varsayılan: `1` tick).
- **`ops_bypass`**: Sunucu operatörlerinin anti-spam kontrollerini atlayıp atlamayacağı (varsayılan: `true`).
