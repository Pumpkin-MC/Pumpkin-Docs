# Ein neues Projekt erstellen

Pumpkin‑Plugins verwenden das Build‑System [Cargo](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html).

Den kompletten Code dieses Plugins findest du als [Template auf GitHub](https://github.com/vyPal/Hello-Pumpkin).

## Neue Crate initialisieren

Lege zuerst ein neues Projektverzeichnis an und führe darin aus:

```bash
cargo new <project-name> --lib
```

Dies erstellt einen Ordner mit Dateien. Die Struktur sieht so aus:

```bash
├── Cargo.toml
└── src
    └── lib.rs
```

## Crate konfigurieren

Da Pumpkin‑Plugins zur Laufzeit als dynamische Bibliotheken geladen werden, muss Cargo diese Crate entsprechend bauen.

:::code-group

```toml [Cargo.toml]
[package]
name = "hello-pumpkin"
version = "0.1.0"
edition = "2021"

[lib] // [!code ++:3]
crate-type = ["cdylib"]

[dependencies]
```

:::

Als Nächstes fügen wir Basis‑Abhängigkeiten hinzu. Da Pumpkin noch früh in der Entwicklung ist, sind die internen Crates nicht auf crates.io veröffentlicht; wir beziehen sie direkt von GitHub.

:::code-group

```toml [Cargo.toml]
[package]
name = "hello-pumpkin"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
# High‑level Typen
pumpkin = { git = "https://github.com/Pumpkin-MC/Pumpkin.git", branch = "master", package = "pumpkin" } 
# Utilities (z. B. TextComponent, Vektoren …)
pumpkin-util = { git = "https://github.com/Pumpkin-MC/Pumpkin.git", branch = "master", package = "pumpkin-util" }
# Makros für einfachere Plugin‑Entwicklung
pumpkin-api-macros = { git = "https://github.com/Pumpkin-MC/Pumpkin.git", branch = "master", package = "pumpkin-api-macros" }

# Async‑Hilfen
async-trait = "0.1"
# Async‑Runtime
tokio = "1.42"
# Logging
log = "0.4"
```

:::

Für bessere Performance und kleinere Binaries empfehlen wir Link‑Time Optimization (LTO).
Beachte, dass dies die Kompilierzeit erhöht.

:::code-group

```toml [Cargo.toml]
[profile.release] // [!code ++:2]
lto = true
```

:::
<small>Aktiviert LTO nur für Release‑Builds.</small>
