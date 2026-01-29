# Hızlı Başlangıç

**Mevcut Durum:**
Ön sürüm: Şu anda geliştirme aşamasında ve resmi sürüm için henüz hazır değil.

## Ön Sürüm İkili Dosyalarını İndir

Hazır derlenmiş ikili dosyaları [Ön Sürüm İndirme Sayfası](https://pumpkinmc.org/download.html) üzerinden indirebilirsiniz.

## Kaynaktan Derleme (Rust)

Pumpkin'ı derlemek için [Rust](https://www.rust-lang.org/tools/install) yüklü olduğundan emin olun.

1. **Depoyu klonlayın** ve dizine geçin:

```shell
git clone https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
```

2. **İsteğe bağlı:** İsterseniz bir Vanilla dünyasını `Pumpkin/` dizinine koyabilirsiniz. Dünya klasörünün adını `world` yapmanız yeterlidir.

3. Çalıştırın:

> [!NOTE]
> Derleme süreci, release derlemeleri için ağır optimizasyonlar nedeniyle biraz zaman alabilir.

```shell
cargo run --release
```

4. **İsteğe bağlı:** CPU'nuzun özel özelliklerinden yararlanarak performansı maksimize etmek için `target-cpu=native` Rust derleyici bayrağını ayarlayabilirsiniz:

```shell
RUSTFLAGS='-C target-cpu=native' cargo run --release
```

> [!NOTE]
> Aynı yerel sistemde kendi barındırdığınız bir sunucuya bağlanmak için (ör. Linux'ta Prism Launcher ile Minecraft'a girip oynarken ve Pumpkin ile sunucuyu barındırırken) terminalin run-server çıktısında görünmese bile 'Çok Oyunculu' -> 'Sunucu Ekle' -> 'Sunucu Adresi' yolunu izleyerek sunucu adresi olarak "localhost:25565" kullanmanız gerekebilir.
```text
localhost:25565
```

## Docker

> [!IMPORTANT]
> Docker desteği şu anda deneyseldir.

Henüz yapmadıysanız [Docker'ı kurmanız](https://docs.docker.com/engine/install/) gerekir. Docker'ı kurduktan sonra sunucuyu başlatmak için aşağıdaki komutu çalıştırabilirsiniz:

```shell
docker run --rm \
    -p <exposed_port>:25565  \
    -v <server_data_location>:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

- `<exposed_port>`: Pumpkin'a bağlanmak için kullanmak istediğiniz port, örneğin `25565`.
- `<server_data_location>`: Sunucu yapılandırması ve verilerinin saklanacağı konum, örneğin `./data`.

### Örnek

Pumpkin'ı `25565` portunda çalıştırıp verileri `./data` adlı bir dizinde saklamak için şu komutu çalıştırın:

```shell
docker run --rm \
    -p 25565:25565 \
    -v ./data:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

## Test Sunucusu

Pumpkin'in @kralverde tarafından yönetilen bir test sunucusu vardır. Pumpkin'in master dalının en son commit'inde çalışır.

- **IP:** pumpkin.kralverde.dev

**Özellikler:**

- OS: Debian GNU/Linux bookworm 12.7 x86_64
- Çekirdek: Linux 6.1.0-21-cloud-amd64
- CPU: Intel Core (Haswell, no TSX) (2) @ 2.40 GHz
- RAM: 4GB DIMM
