# Mobilde Pumpkin Geliştirme

Mobil kullanıcıysanız ve kaynak kodu düzenlemek istiyorsanız bunu yapabilirsiniz!
(Bu sayfa Android'de Helix kullanılarak yazıldı.)

Öncelikle bir terminal uygulamasına ihtiyacımız var.
Kararlı ve açık kaynak olduğu için [Termux](https://github.com/termux/termux-app/releases) öneriyoruz.
Cihazınızın mimarisine uygun apk dosyasını indirip Termux'u kurun.

Bundan sonra bazı komutlar çalıştırmanız gerekiyor. Basitliği nedeniyle Helix kullanıyoruz.

```bash
  pkg update && pkg upgrade
  pkg install build-essential git rust rust-analyzer taplo helix helix-grammar nodejs
```

Eğer katkıda bulunmak istiyorsanız GitHub yazılımını kurmanız gerekir.

```bash
  pkg install gh
```

Ayrıca bash'e göre daha kullanıcı dostu olduğu için fish shell kurmanızı öneriyoruz.

```bash
  pkg install fish
  chsh -s fish
```

Şimdi temel araçları kurduğunuza göre bazı ayarlar yapmamız gerekiyor.
Katkıda bulunmak istiyorsanız GitHub'a giriş yapmanız gerekir.

```bash
  gh auth login
```

Ayrıca git'i yapılandırın: düzenleyiciyi vim yapın, kimlik bilgilerinizi düzenleyin vb.

Bundan sonra Pumpkin deposunu klonlamanız gerekir. (Bundan önce `mkdir proj` ile bir proje dizini oluşturabilirsiniz; faydalıdır.)

```bash
  git clone https://github.com/Pumpkin-MC/Pumpkin.git
```

Katkıda bulunmak istiyorsanız depomuzu fork'layın ve GitHub'da `Pumpkin-MC` kısmını kullanıcı adınızla değiştirin.

Kurulum tamam! Keyfini çıkarın :)

## SSS

### Metin düzenleyiciyi nasıl kullanırım?

`hx <path>` yazın.

### Proje içinde nasıl gezinirim?

`ls`, `cd` ve diğer komutları kullanabilirsiniz.
Ayrıca başlangıçta dizininizi gezmek için `hx <dir>` de kullanabilirsiniz.

### Düzenleyicide nasıl yazı yazarım?

Normal moddaysanız `i` tuşuna basın.

### EDITÖRDEN NASIL ÇIKILIR????

Esc tuşuna basın, ardından kaydetmek istemiyorsanız `:q!`, kaydetmek istiyorsanız `:wq` yazın.

### Bu düzenleyiciyi nasıl kullanacağımı nereden öğrenebilirim?

`hx --tutor` çalıştırın veya resmi web sitelerine gidin.

### Neden VS Code kullanmıyoruz?

1) VS Code kurmak zordur ve web üzerinde sınırlı işlevsellikle çalışır.
2) rust-analyzer üzerinde çalışmaz. Bir emülatör yardımcı olabilir, ancak bu da derlemeyi yavaşlatır.
3) VS Code ile fareye sahip olmak oldukça arzu edilirken, Helix'te sadece klavye yeterlidir.
4) VS Code bazı cihazlarda takılıyor.

### Yazmak neden bu kadar zor?

Ucuz bir bluetooth klavye alın ve ne kadar kolaylaştığını görün.
