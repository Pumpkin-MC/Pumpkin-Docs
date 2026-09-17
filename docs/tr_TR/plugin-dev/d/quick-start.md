# Hızlı Başlangıç

Bu kılavuz, [D programlama dilini](https://dlang.org/) kullanarak Pumpkin sunucu eklentileri yazmaya başlamanıza yardımcı olacaktır.

Pumpkin için D eklentileri, resmi [`pumpkin-api-d`](https://github.com/Pumpkin-MC/pumpkin-api-d) bağlamaları kullanılarak WebAssembly (Wasm) bileşenleri olarak derlenir.

---

## Ön Koşullar

Başlamadan önce aşağıdaki araçların kurulu olduğundan emin olun:

- **[LDC](https://github.com/ldc-developers/ldc)**: Sürüm 1.43 veya üzeri (LLVM tabanlı D derleyicisi).
- **`addon-wasi`**: LDC için WASI hedef paketi.
- **[DUB](https://dub.pm/)**: D paket ve derleme aracı (genellikle LDC ile birlikte gelir).

---

## 1. Projeyi Kurma

Eklenti projeniz için yeni bir dizin oluşturun ve bir `dub.json` yapılandırma dosyası ekleyin:

```bash
mkdir my-d-plugin
cd my-d-plugin
```

Proje kökünde `dub.json` dosyasını oluşturun:

```json [dub.json]
{
    "name": "my-d-plugin",
    "description": "D ile geliştirilmiş minimal bir Pumpkin eklentisi.",
    "license": "proprietary",
    "authors": ["Adınız"],
    "copyright": "Copyright © 2026, Adınız",

    "dependencies": {
        "pumpkin-api-d": "~>0.1.0"
    },

    "targetType": "executable",
    "dflags": ["-Xcc=-mexec-model=reactor"],
    "buildTypes": {
        "debug": {
            "buildOptions": ["debugMode", "debugInfo"]
        },
        "release": {
            "buildOptions": ["optimize", "inline"],
            "dflags": ["-L-S"]
        }
    }
}
```

> [!NOTE]
> `-Xcc=-mexec-model=reactor` bayrağı, eklentinin bir CLI yürütülebilir programı yerine giriş noktaları dışa aktaran bir bileşen (reaktör) olarak bağlanması için WebAssembly bağlayıcısı tarafından zorunlu kılınmıştır.

---

## 2. Eklentiyi Yazma

`source` dizinini oluşturun ve kodunuzu `source/app.d` içine ekleyin:

```d [source/app.d]
module plugin;

import wit.pumpkin.plugin.plugin;
import wit.common;
import pumpkin.register;

struct MyPlugin {
    @GetMetadata PluginMetadata getMetadata()
    {
        immutable(WitString)[$] authors = [
            "Adınız".witList
        ];

        return (immutable PluginMetadata(
                name: "my-d-plugin".witList,
                version_: "0.1.0".witList,
                authors: authors.witList,
                description: "D dilinde örnek bir eklenti.".witList,
                dependencies: WitList!WitString(),
                permissions: WitList!WitString()
        )).witClone;
    }

    @OnLoad
    Result!(void, WitString) onLoad(Context ctx)
    {
        scope (exit)
            ctx.witDrop; // Gelen kaynaklar kullanıldıktan sonra serbest bırakılmalıdır

        log(Level.info, "D eklentisinden merhaba!".witList);
        return ok!WitString;
    }
}

mixin RegisterPlugin!MyPlugin;
```

---

## 3. Eklentiyi Derleme

Eklentinizi `wasm32-wasip2` mimarisini hedefleyen bir WebAssembly bileşeni olarak derleyin:

```bash
dub build -b release -a wasm32-wasip2
```

Bu komut proje kök dizininizde `my-d-plugin.wasm` dosyasını oluşturacaktır.

---

## 4. Eklentiyi Çalıştırma

1. Derlenen `.wasm` dosyasını Pumpkin sunucunuzun `plugins/` dizinine kopyalayın:
   ```bash
   cp my-d-plugin.wasm /yol/pumpkin/plugins/
   ```
2. Pumpkin sunucusunu başlatın veya yeniden başlatın:
   ```bash
   ./pumpkin
   ```
3. Eklentinin yüklendiğini doğrulamak için sunucu günlüklerini kontrol edin:
   ```text
   [INFO] D eklentisinden merhaba!
   ```
