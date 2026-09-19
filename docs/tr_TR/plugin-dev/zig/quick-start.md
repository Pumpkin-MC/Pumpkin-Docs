# Hızlı Başlangıç

Bu kılavuz, [Zig programlama dilini](https://ziglang.org/) kullanarak Pumpkin sunucu eklentileri yazmaya başlamanıza yardımcı olacaktır.

Pumpkin için Zig eklentileri, resmi [`pumpkin-api-zig`](https://github.com/Pumpkin-MC/pumpkin-api-zig) bağlamaları kullanılarak WebAssembly (Wasm) bileşenleri olarak derlenir.

---

## Ön Koşullar

Başlamadan önce aşağıdaki araçların kurulu olduğundan emin olun:

- **[Zig](https://ziglang.org/download/)**: Sürüm 0.16.0 veya üzeri.
- **[`wasm-tools`](https://github.com/bytecodealliance/wasm-tools)**: `PATH` ortam değişkeninde mevcut olmalıdır (derleme betiği tarafından WIT meta verilerini gömmek ve WebAssembly bileşenini oluşturmak için kullanılır).

---

## 1. Projeyi Kurma

Eklenti projeniz için yeni bir dizin oluşturun:

```bash
mkdir my-zig-plugin
cd my-zig-plugin
```

`pumpkin-api-zig` paketini bağımlılık olarak ekleyin:

```bash
zig fetch --save git+https://github.com/Pumpkin-MC/pumpkin-api-zig
```

Proje kökünde `build.zig` dosyasını oluşturun:

```zig [build.zig]
const std = @import("std");
const pumpkin_api = @import("pumpkin_api_zig");

pub fn build(b: *std.Build) void {
    _ = pumpkin_api.addPlugin(b, b.dependency("pumpkin_api_zig", .{}), .{
        .name = "my-zig-plugin",
        .root_source_file = b.path("src/main.zig"),
    });
}
```

---

## 2. Eklentiyi Yazma

`src` dizinini oluşturun ve kodunuzu `src/main.zig` içine ekleyin:

```zig [src/main.zig]
const std = @import("std");
const pumpkin = @import("pumpkin");

pub const std_options: std.Options = .{ .logFn = pumpkin.logFn };

const MyPlugin = struct {
    pub const metadata: pumpkin.Metadata = .{
        .name = "my-zig-plugin",
        .version = "0.1.0",
        .authors = &.{"Adınız"},
        .description = "Zig dilinde örnek bir eklenti.",
    };

    pub const events = .{
        .player_join_event = onJoin,
    };

    pub fn onLoad(_: pumpkin.Context) !void {
        std.log.info("Zig eklentisinden merhaba!", .{});
    }

    fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
        std.log.info("{s} katıldı", .{ev.player.getName()});
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

### Önemli Bileşenler:
- **`std_options`**: `pumpkin.logFn` aracılığıyla standart Zig günlüklerini (`std.log`) Pumpkin günlük sistemine yönlendirir.
- **`pub const metadata`**: Bileşen yüklendiğinde Pumpkin tarafından gerekli görülen eklenti bilgilerini (ad, sürüm, yazarlar, açıklama) tanımlar.
- **`pub const events`**: Eklenti tarafından kaydedilen olay işleyicilerini (örneğin `.player_join_event`) tanımlar.
- **`pub fn onLoad`**: Pumpkin eklentiyi başlattığında çağrılan giriş noktasıdır.
- **`pumpkin.register(MyPlugin)`**: Derleme sırasında gerekli WebAssembly bileşeni dışa aktarımlarını ve giriş noktalarını üretir.

> [!NOTE]
> API tarafından döndürülen her şey (tanıtıcılar/handles dahil), yalnızca geçerli geri arama (callback) dönene kadar geçerlidir. Bir tanıtıcıyı korumak için `keep()` işlevini çağırın ve işiniz bittiğinde `deinit()` ile serbest bırakın.

---

## 3. Eklentiyi Derleme

Eklentinizi bir WebAssembly bileşeni olarak derleyin:

```bash
zig build
```

Bu komut proje kök dizininizde `zig-out/my-zig-plugin.wasm` dosyasını oluşturacaktır.

---

## 4. Eklentiyi Çalıştırma

1. Derlenen `.wasm` dosyasını Pumpkin sunucunuzun `plugins/` dizinine kopyalayın:
   ```bash
   cp zig-out/my-zig-plugin.wasm /yol/pumpkin/plugins/
   ```
2. Pumpkin sunucusunu başlatın veya yeniden başlatın:
   ```bash
   ./pumpkin
   ```
3. Eklentinin yüklendiğini doğrulamak için sunucu günlüklerini kontrol edin:
   ```text
   [INFO] Zig eklentisinden merhaba!
   ```
