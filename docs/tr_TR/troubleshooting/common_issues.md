# Yaygın Sorunlar

1. ## Kullanıcı adı doğrulanamadı

    **Sorun:** Bazı oyuncular sunucuya girişte sorun yaşadıklarını, "Failed to verify username" hatasıyla karşılaştıklarını bildirdi.

    **Neden:** Bu, kimlik doğrulama ile ve genellikle `prevent_proxy_connections` ayarıyla ilgilidir.

    **Çözüm:** `features.toml` dosyasında `prevent_proxy_connections` değerini devre dışı bırakın
