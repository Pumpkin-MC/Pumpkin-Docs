# Quick Start

Deze handleiding helpt je op weg met het schrijven van Pumpkin-serverplugins met de programmeertaal [Zig](https://ziglang.org/).

Zig-plugins voor Pumpkin worden gecompileerd naar WebAssembly-componenten (Wasm) met behulp van de officiële [`pumpkin-api-zig`](https://github.com/Pumpkin-MC/pumpkin-api-zig) bindings.

---

## Vereisten

Voordat je Zig-plugins voor Pumpkin bouwt, zorg ervoor dat het volgende is geïnstalleerd:

- **[Zig](https://ziglang.org/download/)**: Versie 0.16.0 of nieuwer.
- **[`wasm-tools`](https://github.com/bytecodealliance/wasm-tools)**: Beschikbaar in je `PATH` (gebruikt door het buildscript om WIT-metadata in te sluiten en het WebAssembly-component te genereren).

---

## 1. Het project opzetten

Maak een nieuwe map voor je pluginproject:

```bash
mkdir my-zig-plugin
cd my-zig-plugin
```

Voeg `pumpkin-api-zig` toe als afhankelijkheid:

```bash
zig fetch --save git+https://github.com/Pumpkin-MC/pumpkin-api-zig
```

Maak `build.zig` aan in de hoofdmap van het project:

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

## 2. De plugin schrijven

Maak een map `src` aan en plaats je code in `src/main.zig`:

```zig [src/main.zig]
const std = @import("std");
const pumpkin = @import("pumpkin");

pub const std_options: std.Options = .{ .logFn = pumpkin.logFn };

const MyPlugin = struct {
    pub const metadata: pumpkin.Metadata = .{
        .name = "my-zig-plugin",
        .version = "0.1.0",
        .authors = &.{"JouwNaam"},
        .description = "Een voorbeeldplugin in Zig.",
    };

    pub const events = .{
        .player_join_event = onJoin,
    };

    pub fn onLoad(_: pumpkin.Context) !void {
        std.log.info("Hallo vanuit Zig!", .{});
    }

    fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
        std.log.info("{s} is binnengekomen", .{ev.player.getName()});
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

### Belangrijke onderdelen:
- **`std_options`**: Stuurt standaard Zig-logging (`std.log`) door naar het logsysteem van Pumpkin via `pumpkin.logFn`.
- **`pub const metadata`**: Definieert plugin-metadata (naam, versie, auteurs, beschrijving) die Pumpkin nodig heeft bij het laden van het component.
- **`pub const events`**: Registreert gebeurtenis-handlers (zoals `.player_join_event`).
- **`pub fn onLoad`**: Het toegangspunt dat wordt aangeroepen wanneer Pumpkin de plugin initialiseert.
- **`pumpkin.register(MyPlugin)`**: Genereert tijdens compilatietijd de benodigde WebAssembly-componentexports en toegangspunten.

> [!NOTE]
> Alles wat de API retourneert (inclusief handles) is alleen geldig totdat de huidige callback retourneert. Roep `keep()` aan op een handle om deze te behouden, en geef deze weer vrij met `deinit()` als je klaar bent.

---

## 3. De plugin bouwen

Compileer je plugin naar een WebAssembly-component:

```bash
zig build
```

Dit genereert `zig-out/my-zig-plugin.wasm` in je projectmap.

---

## 4. De plugin uitvoeren

1. Kopieer het gecompileerde `.wasm`-bestand naar de map `plugins/` van je Pumpkin-server:
   ```bash
   cp zig-out/my-zig-plugin.wasm /pad/naar/pumpkin/plugins/
   ```
2. Start of herstart Pumpkin:
   ```bash
   ./pumpkin
   ```
3. Controleer de serverlogs om te bevestigen dat je plugin is geladen:
   ```text
   [INFO] Hallo vanuit Zig!
   ```
