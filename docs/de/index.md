# Schnellstart

**Aktueller Status:**
Vorabversion: Derzeit in Entwicklung und noch nicht für eine offizielle Veröffentlichung bereit.

## Rust

Um Pumpkin mit Rust auszuführen, stelle sicher, dass [Rust](https://www.rust-lang.org/tools/install) installiert ist.

1. **Repository klonen** und ins Verzeichnis wechseln:

```shell
git clone https://github.com/Pumpkin-MC/Pumpkin.git
cd Pumpkin
```

2. **Optional:** Wenn du möchtest, kannst du eine Vanilla‑Welt in das Verzeichnis `Pumpkin/` legen. Benenne den Welt‑Ordner einfach `world`.

3. Ausführen:

> [!NOTE]
> Der Build‑Prozess kann aufgrund starker Optimierungen für Release‑Builds eine Weile dauern.

```shell
cargo run --release
```

4. **Optional:** Wenn du die CPU‑Features deines Systems nutzen möchtest, kannst du das Rust‑Compiler‑Flag `target-cpu=native` setzen.

```shell
RUSTFLAGS='-C target-cpu=native' cargo run --release
```

## Docker

> [!IMPORTANT]
> Docker‑Support ist derzeit experimentell.

Falls noch nicht geschehen, musst du [Docker installieren](https://docs.docker.com/engine/install/). Nach der Installation kannst du den Server mit folgendem Befehl starten:

```shell
docker run --rm \
    -p <exposed_port>:25565  \
    -v <server_data_location>:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

- `<exposed_port>`: Der Port, über den du dich mit Pumpkin verbindest, z. B. `25565`.
- `<server_data_location>`: Speicherort für Server‑Konfiguration und Daten, z. B. `./data`.

### Beispiel

Um Pumpkin auf Port `25565` auszuführen und Daten im Verzeichnis `./data` zu speichern, nutze:

```shell
docker run --rm \
    -p 25565:25565 \
    -v ./data:/pumpkin \
    -it ghcr.io/pumpkin-mc/pumpkin:master
```

## Testserver

Pumpkin hat einen Testserver, der von @kralverde betrieben wird. Er läuft immer auf dem neuesten Commit des Master‑Branches von Pumpkin.

- **IP:** pumpkin.kralverde.dev

**Spezifikationen:**

- OS: Debian GNU/Linux bookworm 12.7 x86_64
- Kernel: Linux 6.1.0-21-cloud-amd64
- CPU: Intel Core (Haswell, kein TSX) (2) @ 2,40 GHz
- RAM: 4GB DIMM
