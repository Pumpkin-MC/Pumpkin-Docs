# Paket Sınırlayıcı

Pumpkin; sunucuyu paket taşması (packet flooding), spam saldırıları ve istemci tarafı açıklardan korumak için yerleşik bir paket oranı sınırlayıcısına sahiptir. Paket oranı sınırları, Java Edition ve Bedrock Edition istemcileri için bağımsız olarak yapılandırılabilir.

## Yapılandırma

:::code-group

```toml [pumpkin.toml]
[networking.java.packet_limiter]
enabled = true
max_packet_rate = 500.0
burst_capacity = 500.0
kick_message = "Kicked for spamming packets"

[networking.bedrock.packet_limiter]
enabled = true
max_packet_rate = 500.0
burst_capacity = 500.0
kick_message = "Kicked for spamming packets"
```

:::

### Yapılandırma Seçenekleri

- **`enabled`**: Bu istemci sürümü için paket oranı sınırlayıcısının etkin olup olmadığı (varsayılan: `true`).
- **`max_packet_rate`**: İstemci bağlantısı başına saniyede izin verilen maksimum gelen paket sayısı (varsayılan: `500.0`). Sınırlayıcı modülünü devre dışı bırakmadan hız sınırını kapatmak için `<= 0.0` olarak ayarlayın.
- **`burst_capacity`**: İstemci paketlerindeki kısa süreli ani artışlar için belirteç kovası (token bucket) ani yük kapasitesi (varsayılan: `500.0`).
- **`kick_message`**: Bağlantısı paket sınırını aştığında oyuncuya gösterilecek bağlantı kesme mesajı (varsayılan: `"Kicked for spamming packets"`).
