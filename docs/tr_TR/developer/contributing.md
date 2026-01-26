# Pumpkin'e Katkıda Bulunma

Pumpkin'e katkıda bulunmak istemenizden memnuniyet duyuyoruz! Bu belge, hata raporları, özellik önerileri ve kod değişiklikleri göndermek için yönergeleri açıklar.

## Başlarken

Başlamak için en kolay yol [Discord sunucumuzda](https://discord.gg/wT8XjrjKkf) yardım istemektir.

## Nasıl Katkıda Bulunulur

Pumpkin'e katkıda bulunmanın birkaç yolu vardır:

### Hata Bildirme

  Bir hata ile karşılaşırsanız, önce sorun takip sisteminde mevcut bir kayıt olup olmadığını arayın.

  Aynı sorunu bulamazsanız, yeni bir kayıt açın.

  Şablonu takip edin ve mümkünse yeniden üretme adımlarıyla birlikte hatanın net bir açıklamasını sağlayın.
  Ekran görüntüleri, loglar veya kod parçacıkları da yardımcı olabilir.

### Özellik Önerme

  Pumpkin'i nasıl iyileştirebileceğinize dair bir fikriniz mi var? Düşüncelerinizi sorun takip sisteminde bir kayıt açarak paylaşın.

  Önerilen özelliği, faydaları ve olası uygulama detaylarıyla birlikte ayrıntılı şekilde açıklayın.

### Koda Katkıda Bulunma

  Koda katkıda bulunmaya başlamak için GitHub'da depoyu fork'layın

1. Öncelikle, yoksa bir GitHub hesabı oluşturun

2. Pumpkin'in resmi [GitHub Organizasyonu](https://github.com/Pumpkin-MC) sayfasına gidin ve Fork'a tıklayın

> Bir fork oluşturmak, artık Pumpkin kaynak kodunun kendi kopyanıza sahip olduğunuz anlamına gelir (bu, telif hakkının size geçtiği anlamına gelmez).

  Artık düzenleyebileceğiniz bir kopyaya sahip olduğunuz için bazı araçlara ihtiyacınız olacak.
3. İşletim sisteminiz için [git](https://git-scm.com/downloads) yükleyin

- Git'e başlamak için [Getting started with Git](https://docs.github.com/en/get-started/getting-started-with-git) sayfasını ziyaret edin

- İsteğe bağlı: GitHub ile etkileşim için grafik bir araç istiyorsanız [GitHub-Desktop](https://desktop.github.com/download/) kurun

> GitHub Desktop, komut satırına alışık değilseniz daha kolay olabilir, ancak herkes için uygun değildir

- GitHub Desktop ile başlamak için [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/overview/getting-started-with-github-desktop) sayfasını ziyaret edin

- Koda katkıda bulunmak istiyorsanız [rust-lang.org](https://www.rust-lang.org/) üzerinden Rust kurun.

- Dokümantasyona katkıda bulunmak istiyorsanız [NodeJS](https://nodejs.org/en) kurun.

### Minecraft kodunu decompile etme

Pumpkin'de çalışırken resmi Minecraft istemcisine büyük ölçüde dayanır ve mevcut sunucu mantığını kullanırız. Sıklıkla Minecraft'ın resmi koduna başvururuz.
Minecraft'ı decompile etmenin en kolay yolu Fabric Yarn kullanmaktır. Aşağıdaki komutları çalıştırmadan önce Gradle'ın kurulu olduğundan emin olun:

```shell
git clone https://github.com/FabricMC/yarn.git
cd yarn
./gradlew decompileVineflower
```

Decompile işleminden sonra kaynak kodu `build/namedSrc` içinde bulabilirsiniz.

### Ek Bilgiler

Mevcut sorunlar ve pull request'ler üzerinde yorum yaparak düşüncelerinizi paylaşmanızı ve geri bildirim sağlamanızı teşvik ediyoruz.

Sorularınızı sorun takip sisteminde sorabilir veya yardıma ihtiyaç duyarsanız proje geliştiricileriyle iletişime geçebilirsiniz.

Büyük bir katkı göndermeden önce bir issue ya da discussion açmayı veya yaklaşımınızı konuşmak için Discord'umuzda bizimle iletişime geçmeyi düşünün.
