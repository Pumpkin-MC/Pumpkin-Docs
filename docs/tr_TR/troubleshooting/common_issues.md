# Yaygın Sorunlar

1. ## Kullanıcı adı doğrulanamadı

    **Sorun:** Bazı oyuncular sunucuya girişte sorun yaşadıklarını, "Failed to verify username" hatasıyla karşılaştıklarını bildirdi.

    **Neden:** Bu, kimlik doğrulama ile ve genellikle `prevent_proxy_connections` ayarıyla ilgilidir.

    **Çözüm:** `pumpkin.toml` dosyasında `prevent_proxy_connections` değerini devre dışı bırakın
 
2. ## 0.0.0.0 kullanılarak sunucuya bağlanılamıyor

    **Sorun:** Sunucuyu kendi bilgisayarında çalıştıran oyuncular, `0.0.0.0` veya `0.0.0.0:25565` girdiklerinde bağlanamıyor (örneğin "Connection refused" hatası alıyor).

    **Neden:** `pumpkin.toml` dosyasında `0.0.0.0`, Pumpkin'in tüm yerel ağ arayüzlerini dinlemesini sağlar. Bu, sunucu için bir dinleme (bind) adresidir; Minecraft istemcisinin bağlanabileceği geçerli bir hedef adres değildir.

    **Çözüm:**
    - **Aynı bilgisayardan** bağlanıyorsanız Minecraft istemcisinde `localhost` veya `127.0.0.1` yazın.
    - **Aynı yerel ağdaki (LAN) başka bir cihazdan** bağlanıyorsanız sunucu bilgisayarının yerel IP adresini (örn. `192.168.x.x`) kullanın.
    - **İnternet üzerinden** bağlanıyorsanız diğer oyuncular genel (public) IP adresinizi veya alan adınızı kullanmalıdır (modeminizden bağlantı noktası yönlendirmesi - port forwarding yapılmış olmalıdır).
