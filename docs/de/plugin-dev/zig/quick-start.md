# Schnellstart

Dieser Leitfaden hilft dir beim Einstieg in die Entwicklung von Pumpkin-Server-Plugins mit der Programmiersprache [Zig](https://ziglang.org/).

Zig-Plugins für Pumpkin werden mithilfe der offiziellen Bindings [`pumpkin-api-zig`](https://github.com/Pumpkin-MC/pumpkin-api-zig) als WebAssembly-Komponenten (Wasm) kompiliert.

---

## Voraussetzungen

Bevor du Zig-Plugins für Pumpkin erstellst, stelle sicher, dass folgende Software installiert ist:

- **[Zig](https://ziglang.org/download/)**: Version 0.16.0 oder neuer.
- **[`wasm-tools`](https://github.com/bytecodealliance/wasm-tools)**: In deinem `PATH` verfügbar (wird vom Build-Skript verwendet, um WIT-Metadaten einzubinden und die WebAssembly-Komponente zu erstellen).

---

## 1. Projekt einrichten

Erstelle ein neues Verzeichnis für dein Plugin-Projekt:

```bash
mkdir my-zig-plugin
cd my-zig-plugin
```

Füge `pumpkin-api-zig` als Abhängigkeit hinzu:

```bash
zig fetch --save git+https://github.com/Pumpkin-MC/pumpkin-api-zig
```

Erstelle die `build.zig` im Projektstammverzeichnis:

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

## 2. Das Plugin schreiben

Erstelle ein `src`-Verzeichnis und lege deinen Code in `src/main.zig` ab:

```zig [src/main.zig]
const std = @import("std");
const pumpkin = @import("pumpkin");

pub const std_options: std.Options = .{ .logFn = pumpkin.logFn };

const MyPlugin = struct {
    pub const metadata: pumpkin.Metadata = .{
        .name = "my-zig-plugin",
        .version = "0.1.0",
        .authors = &.{"DeinName"},
        .description = "Ein Beispiel-Plugin in Zig.",
    };

    pub const events = .{
        .player_join_event = onJoin,
    };

    pub fn onLoad(_: pumpkin.Context) !void {
        std.log.info("Hallo von Zig!", .{});
    }

    fn onJoin(_: pumpkin.Server, ev: *pumpkin.EventData(.player_join_event)) void {
        std.log.info("{s} ist beigetreten", .{ev.player.getName()});
    }
};

comptime {
    pumpkin.register(MyPlugin);
}
```

### Wichtige Elemente:
- **`std_options`**: Leitet das Standard-Zig-Logging (`std.log`) über `pumpkin.logFn` an das Logging-System von Pumpkin weiter.
- **`pub const metadata`**: Definiert Plugin-Metadaten (Name, Version, Autoren, Beschreibung), die von Pumpkin beim Laden der Komponente benötigt werden.
- **`pub const events`**: Registriert Event-Handler (wie `.player_join_event`).
- **`pub fn onLoad`**: Einstiegspunkt, der aufgerufen wird, wenn Pumpkin das Plugin initialisiert.
- **`pumpkin.register(MyPlugin)`**: Generiert zur Compile-Zeit die erforderlichen WebAssembly-Komponenten-Exporte und Einstiegspunkte.

> [!NOTE]
> Alles, was die API zurückgibt (einschließlich Handles), ist nur bis zur Rückkehr des aktuellen Callbacks gültig. Rufe `keep()` für ein Handle auf, um es zu behalten, und gib es anschließend mit `deinit()` frei.

---

## 3. Plugin kompilieren

Kompiliere dein Plugin zu einer WebAssembly-Komponente:

```bash
zig build
```

Dadurch wird `zig-out/my-zig-plugin.wasm` im Projektverzeichnis erzeugt.

---

## 4. Plugin ausführen

1. Kopiere die kompilierte `.wasm`-Datei in das `plugins/`-Verzeichnis deines Pumpkin-Servers:
   ```bash
   cp zig-out/my-zig-plugin.wasm /pfad/zu/pumpkin/plugins/
   ```
2. Starte oder starte den Pumpkin-Server neu:
   ```bash
   ./pumpkin
   ```
3. Prüfe die Server-Logs auf die Erfolgsmeldung:
   ```text
   [INFO] Hallo von Zig!
   ```
